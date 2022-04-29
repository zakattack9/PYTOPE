from os import sep
from pathlib import Path
from shutil import make_archive, rmtree
import shutil

_FILE_MANAGER_NAME		= 'FileManager.py'
_INIT_NAME				= '__init__.py'
_HIERARCHY_NAME			= 'hierarchy'
_SERVER_DIR_NAME		= 'server'


def _get_root():
	"""
	:return:  The first parent directory (or cwd) that contains a directory named 'server'.
	"""
	path = Path.cwd()
	found = False
	while path.name:
		for p in path.iterdir():
			if p.name == _SERVER_DIR_NAME and p.is_dir():
				found = True
				break
		if found:
			break
		path = path.parent
	return path


ROOT						= _get_root()
SERVER_DIR					= ROOT / _SERVER_DIR_NAME
MANAGER_DIR					= SERVER_DIR / 'file_manager'
MODULE_DIR					= MANAGER_DIR / 'file_manager_module'
HIERARCHY_DIR				= MODULE_DIR / 'hierarchy'
CONFIGS_DIR					= HIERARCHY_DIR / 'configs'
FILE_PATH_CONFIG_DIR		= CONFIGS_DIR / 'file_path_config'
PACKAGE_MAPPING_CONFIG_DIR	= CONFIGS_DIR / 'package_mapping_config'
TEST_DESIGNS_CONFIG_DIR		= CONFIGS_DIR / 'test_designs_config'
DOCKERFILES_DIR				= HIERARCHY_DIR / 'Dockerfiles'
TESTS_DIR					= HIERARCHY_DIR / 'tests'
TEST_JSON_DIR				= TESTS_DIR / 'test_json'
TEST_FILES_DIR				= TESTS_DIR / 'python_unittests'
TEST_RESULTS_DIR			= TESTS_DIR / 'test_results'
LOGS_DIR					= SERVER_DIR / 'logs'
TEST_RUNNER_LOG				= LOGS_DIR / 'debug_test_log'
SCHEMA_DIR					= ROOT / 'schemas'
TEST_SCHEMA					= SCHEMA_DIR / 'TestDesigns.schema.json'


"""
Directories that contain files that:
	- are received from the front-end
	- are generated
	- contain output from running tests
	- contain logs
"""
TEMP_DIRS = (DOCKERFILES_DIR, TEST_JSON_DIR, TEST_FILES_DIR, TEST_RESULTS_DIR, FILE_PATH_CONFIG_DIR, PACKAGE_MAPPING_CONFIG_DIR, TEST_DESIGNS_CONFIG_DIR, LOGS_DIR)


""" Needed for the TestRunner to import unit-tests """
TEST_FILES_PACKAGE = str(TEST_FILES_DIR.relative_to(SERVER_DIR)).replace(sep, '.')



def find_file(filename):
	filename_path = Path(filename)
	if len(filename_path.parts) < 1:
		raise ValueError(f"File-Name '{filename}' has no parts to it (empty).")
	elif len(filename_path.parts) > 1:
		raise ValueError(f"File-Name '{filename}' contains a directory (only names are allowed).")
	stem = filename_path.stem.lower()
	if not stem:
		raise ValueError(f"File-Name '{filename}' only contains a suffix (names without a stem are not allowed).")
	suffix = filename_path.suffix.lower()
	path = None
	if not suffix:
		path = DOCKERFILES_DIR
	elif suffix == '.json':
		path = TEST_JSON_DIR
	elif suffix == '.py':
		path = TEST_FILES_DIR
	elif suffix == '.py_output':
		path = TEST_RESULTS_DIR
	elif suffix == '.cfg':
		if stem.startswith('fp'):
			path = FILE_PATH_CONFIG_DIR
		elif stem.startswith('pm'):
			path = PACKAGE_MAPPING_CONFIG_DIR
		elif stem.startswith('td'):
			path = TEST_DESIGNS_CONFIG_DIR
	if not path:
		raise ValueError(f"File '{filename}' could not be found/placed.")
	return path / filename


def clear_dir(dir_path: Path):
	for path in dir_path.iterdir():
		if path.name != '.gitkeep' and path.name != '__pycache__':
			try:
				path.unlink()
			except IsADirectoryError:
				rmtree(path)


def clear_temp_dirs():
	for dir_path in TEMP_DIRS:
		clear_dir(dir_path)


def zip_folder(dir_path: Path, zip_name):
	shutil.make_archive(zip_name, 'zip', str(dir_path))



def sort_hierarchy():
	for file in MODULE_DIR.iterdir():
		if file.name not in (_FILE_MANAGER_NAME, _INIT_NAME, _HIERARCHY_NAME):
			file.rename(find_file(file))
