from argparse import ArgumentParser
from pathlib import Path
from typing import Optional

from server.unittest_file_writer.UnittestFileWriter import parse_and_write_tests


class Files:
	root:				Path
	dockerfiles_dir:	Path
	test_files_dir:		Path
	test_schema:		Path
	test_json_dir:		Path

	def __init__(self, root: Optional[Path] = None, dockerfiles_dir: Optional[Path] = None, test_files_dir: Optional[Path] = None, test_schema: Optional[Path] = None, test_json_dir: Optional[Path] = None):
		self.root = root if root is not None else Path.home() / 'UTFW'
		self.dockerfiles_dir = dockerfiles_dir if dockerfiles_dir is not None else self.root / 'dockerfiles'
		self.test_files_dir = test_files_dir if test_files_dir is not None else self.root / 'tests'
		self.test_schema = test_schema if test_schema is not None else self.root / 'schemas' / 'TestDesigns.schema.json'
		self.test_json_dir = test_json_dir if test_json_dir is not None else self.root / 'test_json'


def get_arg_parser(root: Optional[Path] = None):
	files = Files(root)
	parser = ArgumentParser(description='Generate Python Unittest Files')
	parser.add_argument('dockerfiles-dir', type=Path, help='The directory containing the Dockerfiles.', default=files.dockerfiles_dir)
	parser.add_argument('test-files-dir', type=Path, help='The directory to write the tests to.', default=files.test_files_dir)
	parser.add_argument('test-schema', type=Path, help='The test schema file.', default=files.test_schema)
	parser.add_argument('test-json-dir', type=Path, help='The JSON file describing the tests (or a directory containing json files).', default=files.test_json_dir)
	return parser


def main():
	args = get_arg_parser().parse_args()
	return parse_and_write_tests(args.dockerfiles_dir, args.test_files_dir, args.test_schema, args.test_json_dir)


if __name__ == '__main__':
	main()
