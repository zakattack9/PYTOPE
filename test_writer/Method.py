from abc import ABC, abstractmethod
from itertools import chain
from typing import Iterable, Sequence

from test_writer.LineSequence import LineSequence
from test_writer.Util import indent


class Method(LineSequence, ABC):
	decoration_lines:	Sequence[str]
	name:				str
	parameters:			str
	deco_header_sep:	Sequence[str]
	header_body_sep:	Sequence[str]

	def __init__(self, name: str, parameters='', decoration_lines: Sequence[str] = (), deco_header_sep=(), header_body_sep=()):
		self.name = name
		self.parameters = parameters
		self.decoration_lines = decoration_lines
		self.deco_header_sep = deco_header_sep
		self.header_body_sep = header_body_sep

	@abstractmethod
	def count_body_lines(self) -> int:
		pass

	@abstractmethod
	def get_body_lines(self) -> Iterable[str]:
		pass

	def get_parameter_str(self):
		return f"({self.parameters}):"

	def get_header(self) -> str:
		return self.name + self.get_parameter_str()

	def get_lines(self) -> Iterable[str]:
		return chain(self.decoration_lines, self.deco_header_sep, (self.get_header(),), self.header_body_sep, indent(self.get_body_lines()))

	def __len__(self):
		return len(self.decoration_lines) + len(self.deco_header_sep) + 1 + len(self.header_body_sep) + self.count_body_lines()
