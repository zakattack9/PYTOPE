from pathlib import Path
from typing import Any, Dict, MutableSequence, Optional

from schemas.schema_validation.SchemaValidator import PathOrJSON, SchemaValidator
from server.unittest_file_writer.FileFinderWrapper import FileFinder, FileFinderWrapper, new_file_finder_wrapper
from server.unittest_file_writer.TestFile import TestFile


"""
UnittestFileWriter is the main interface for the module.

The parse_and_write_tests method is the primary method, designed to perform the necessary functions.

A FileFinder can be:
	- the path to a directory (files will be found/placed inside it)
	or
	- a function (inputs file's name, outputs file's path)

(FileFinder isn't a class, it's simply a union of the compatible types (Path | str | Callable))
"""


# Primary Method
def parse_and_write_tests(test_json_files: Path, dockerfiles: FileFinder, test_files: FileFinder):
	"""
	Parses the given JSON file(s) and writes the generated tests to the test_files_dir.
	:param test_json_files:	The JSON file that will be parsed to create tests.  (If a directory is given, it will recursively parse all '.json' files in it)
	:param dockerfiles:		The directory containing the dockerfiles (or a function that finds a dockerfile (path), given the name of the dockerfile).
	:param test_files:		The directory to write the generated test files to (or a function that outputs a file path, given the name of the test file).
	:return:	The UnittestFileWriter (for information about what tests were written) (this can be ignored).
	"""
	test_writer = UnittestFileWriter(dockerfiles, test_files)
	test_writer.parse_json_files(test_json_files)
	test_writer.write_all()
	return test_writer


class UnittestFileWriter:
	TEST_SCHEMA_PATH = Path(__file__).parent.parent.parent / 'schemas' / 'schema_validation' / 'TestDesigns.schema.json'

	dockerfiles_wrapper:	FileFinderWrapper
	test_files_wrapper:		FileFinderWrapper
	test_validator:			SchemaValidator
	test_files:				MutableSequence[TestFile]

	def __init__(self, dockerfiles_ff: FileFinder, test_files_ff: FileFinder, test_schema: PathOrJSON = TEST_SCHEMA_PATH, test_files: Optional[MutableSequence[TestFile]] = None):
		self.dockerfiles_wrapper = new_file_finder_wrapper(dockerfiles_ff)
		self.test_files_wrapper = new_file_finder_wrapper(test_files_ff)
		self.test_validator = SchemaValidator(test_schema)
		self.test_files = test_files if test_files is not None else []

	def parse_json_files(self, test_design_json_file: Path):
		# if a directory is given, recurse
		if test_design_json_file.is_dir():
			for file in test_design_json_file.iterdir():
				if file.suffix.lower() == '.json':
					self.parse_json_files(file)
		else:
			try:
				self.parse_json(self.test_validator.validate(test_design_json_file))
			except Exception as err:
				print(err)

	def parse_json(self, test_design_json: Dict[str, Dict[str, Any]]):
		tests = test_design_json['tests']
		for name, image in test_design_json['docker_images'].items():
			self.add_dockerfile(self.dockerfiles_wrapper.find_file(name))
			for test in image['tests']:
				self.add_test(test, tests[test])

	def write_all(self):
		for test_file in self.test_files:
			test_file.write_to_file()

	def add_dockerfile(self, dockerfile_path: Path, add_non_test_methods=True):
		self.test_files.append(TestFile(self.test_files_wrapper.find_file(dockerfile_path.with_suffix('.py').name), dockerfile_path, add_non_test_methods))

	def add_test(self, test_name: str, test_json: dict):
		self.get_current_test_file().add_test(test_name, test_json)

	def get_current_test_file(self):
		return self.test_files[-1]
