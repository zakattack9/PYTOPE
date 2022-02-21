from pathlib import Path
from typing import Any, Dict, MutableSequence, Optional

from test_writer.TestFile import TestFile


# TODO - use file path config

FILE_MANAGER_ROOT	= Path.home().parents[-1]
DOCKERFILES_DIR 	= FILE_MANAGER_ROOT / 'DockerFiles'
TESTS_DIR			= FILE_MANAGER_ROOT / 'Tests'
TEST_FILES_DIR		= TESTS_DIR / 'Python Unittests'


class UnittestFileWriter:
	test_files_dir:		Path
	dockerfiles_dir:	Path
	test_files:			MutableSequence[TestFile]

	def __init__(self, test_files_dir=TEST_FILES_DIR, dockerfiles_dir=DOCKERFILES_DIR, test_files: Optional[MutableSequence[TestFile]] = None):
		self.test_files_dir = test_files_dir
		self.dockerfiles_dir = dockerfiles_dir
		self.test_files = test_files if test_files is not None else []

	#
	# Primary Methods
	# ------------------------------------------------------------------
	def add_all(self, test_design_json: Dict[str, Dict[str, Any]]):
		tests = test_design_json['tests']
		for name, image in test_design_json['docker_images'].items():
			self.add_dockerfile(self.dockerfiles_dir / name)
			for test in image['tests']:
				self.add_test(test, tests[test])

	def write_all(self):
		for test_file in self.test_files:
			test_file.write_to_file()
	# ------------------------------------------------------------------
	#
	#

	def add_dockerfile(self, dockerfile_path: Path, add_non_test_methods=True):
		self.test_files.append(TestFile(self.test_files_dir / dockerfile_path.with_suffix('.py').name, dockerfile_path, add_non_test_methods))

	def add_test(self, test_name: str, test_json: dict):
		self.get_current_test_file().add_test(test_name, test_json)

	def get_current_test_file(self):
		return self.test_files[-1]
