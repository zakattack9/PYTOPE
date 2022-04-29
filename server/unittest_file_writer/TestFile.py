from itertools import chain
from pathlib import Path
from typing import MutableSequence, Optional, Sequence

from .LineSequence import LineSequence
from .Method import Method
from .MultiMethod import MultiMethod
from .NonTestMethods import SetUpClassMethod, SetUpMethod, TearDownClassMethod, TearDownMethod
from .OutputTestMethod import OutputTestMethod, OutputType
from .Util import indent

_IMPORT_LINES	= ('from docker import from_env', 'from unittest import TestCase')
_SUPER_CLASSES	= ('TestCase',)


class TestFile(LineSequence):
	test_file_path:		Path
	dockerfile_path:	Path
	import_lines:		Sequence[str]
	class_name:			str
	super_classes:		Sequence[str]
	methods:			MutableSequence[Method]
	import_header_sep:	Sequence[str]
	header_body_sep:	Sequence[str]
	method_sep:			Sequence[str]

	def __init__(self, test_file_path: Path, dockerfile_path: Path, add_non_test_methods=True, import_lines: Sequence[str] = _IMPORT_LINES, class_name: Optional[str] = None, super_classes: Sequence[str] = _SUPER_CLASSES, methods: Optional[MutableSequence[Method]] = None, import_header_sep=('', ''), header_body_sep=(), method_sep=('',)):
		self.test_file_path = test_file_path
		self.dockerfile_path = dockerfile_path
		self.import_lines = import_lines
		self.class_name = class_name if class_name is not None else test_file_path.stem
		self.super_classes = super_classes
		self.methods = methods if methods is not None else []
		self.import_header_sep = import_header_sep
		self.header_body_sep = header_body_sep
		self.method_sep = method_sep
		if add_non_test_methods:
			self.add_non_test_methods()

	def add_test(self, test_name: str, test_json: dict):
		name = self.format_test_name(test_name)
		new_methods = []
		block: dict
		for index, block in enumerate(test_json['test_blocks']):
			if block['block_type'] == 'RUN':
				sub_name = self._format_sub_test_name(test_name, index)
				cmd = block['command']
				output_type = OutputType[block['command_output_assertion']]
				output_regex = block['regex'] if output_type == OutputType.VERIFY_REGEX else None
				new_methods.append(OutputTestMethod(name=sub_name, cmd=cmd, output_type=output_type, output_regex=output_regex, test_index=index))
		self.methods.append(MultiMethod(name=name, parameters='self', methods=new_methods))

	def add_non_test_methods(self):
		# This should usually be automatically called by the constructor.
		self._add_setup_class_method()
		self._add_tear_down_class_method()
		self._add_setup_method()
		self._add_tear_down_method()

	def format_test_name(self, test_name: str):
		# this method allows the test name format to easily be changed
		return f'{test_name}'

	def find_method(self, name: str):
		index = 0
		for method in self.methods:
			if method.name == name:
				return method, index
			index += 1
		raise KeyError(f"Method with name {repr(name)} not found.")

	def find_test(self, test_name: str):
		return self.find_method(self.format_test_name(test_name))

	def get_method(self, name: str):
		return self.find_method(name)[0]

	def get_test(self, test_name: str):
		return self.get_method(self.format_test_name(test_name))

	def remove_method(self, name: str):
		method, index = self.find_method(name)
		del self.methods[index]
		return method

	def remove_test(self, test_name: str):
		return self.remove_method(self.format_test_name(test_name))

	def get_header(self):
		return f"class {self.class_name}({', '.join(self.super_classes)}):"

	def get_methods_lines(self):
		return chain.from_iterable(chain(method.get_lines(), self.method_sep) for method in self.methods)

	def get_lines(self):
		return chain(self.import_lines, self.import_header_sep, [self.get_header()], self.header_body_sep, indent(self.get_methods_lines()))

	def write_to_file(self):
		with self.test_file_path.open('wt') as f:
			self.write_lines(f)

	def _format_sub_test_name(self, test_name: str, test_number: int):
		return f'{test_name}_{test_number}'

	def _add_setup_class_method(self):
		self.methods.append(SetUpClassMethod(self.dockerfile_path))

	def _add_tear_down_class_method(self):
		self.methods.append(TearDownClassMethod())

	def _add_setup_method(self):
		self.methods.append(SetUpMethod())

	def _add_tear_down_method(self):
		self.methods.append(TearDownMethod())

	def __len__(self):
		return len(self.import_lines) + len(self.import_header_sep) + 1 + len(self.header_body_sep) + sum(len(method) for method in self.methods) + (len(self.method_sep) * len(self.methods))
