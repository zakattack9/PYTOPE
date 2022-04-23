import shutil
from pathlib import Path


def _get_root():
	"""
	:return:  The first parent directory (or cwd) that contains a directory named 'server'.
	"""
	path = Path.cwd()
	found = False
	while path.name:
		for p in path.iterdir():
			if p.name == 'server' and p.is_dir():
				found = True
				break
		if found:
			break
		path = path.parent
	return path


FILE_MANAGER_NAME		= 'FileManager.py'
INIT_NAME				= '__init__.py'
HIERARCHY_NAME			= 'hierarchy'


ROOT					= _get_root()
SERVER_DIR				= ROOT / 'server'
MANAGER_DIR				= SERVER_DIR / 'file_manager'
MODULE_DIR				= MANAGER_DIR / 'file_manager_module'
HIERARCHY_DIR			= MODULE_DIR / 'hierarchy'
CONFIGS_DIR				= HIERARCHY_DIR / 'configs'
FILE_PATH_CONFIG		= CONFIGS_DIR / 'file_path_config'
PACKAGE_MAPPING_CONFIG	= CONFIGS_DIR / 'package_mapping_config'
TEST_DESIGNS_CONFIG		= CONFIGS_DIR / 'test_designs_config'
DOCKERFILES_DIR			= HIERARCHY_DIR / 'Dockerfiles'
TESTS_DIR				= HIERARCHY_DIR / 'tests'
TEST_JSON_DIR			= TESTS_DIR / 'test_json'
TEST_FILES_DIR			= TESTS_DIR / 'python_unittests'
TEST_RESULTS_DIR		= TESTS_DIR / 'test_results'
TEST_SCHEMA				= ROOT / 'schemas' / 'TestDesigns.schema.json'


def find_file(filename):
	filename_path = Path(filename)
	if len(filename_path.parts) < 1:
		raise ValueError(f"File-Name '{filename}' has no parts to it (empty).")
	elif len(filename_path.parts) > 1:
		raise ValueError(f"File-Name '{filename}' contains a directory (only names are allowed).")
	# break filename into stem, suffix, and (combined) name
	stem = filename_path.stem.lower()
	suffix = filename_path.suffix.lower()
	name = filename_path.name.lower()
	path = None
	if name == 'dockerfile':
		path = DOCKERFILES_DIR
	elif suffix == '.json':
		path = TEST_JSON_DIR
	elif suffix == '.py':
		path = TEST_FILES_DIR
	elif suffix == '.py_output':
		path = TEST_RESULTS_DIR
	elif suffix == '.cfg':
		if stem.startswith('fp'):
			path = FILE_PATH_CONFIG
		elif stem.startswith('pm'):
			path = PACKAGE_MAPPING_CONFIG
		elif stem.startswith('td'):
			path = TEST_DESIGNS_CONFIG
	if path:
		return path / filename
	raise ValueError(f"File '{filename}' could not be found/placed.")


def zip_folder():
	shutil.make_archive('output', 'zip', str(HIERARCHY_DIR))


def sort_hierarchy():
	for file in MODULE_DIR.iterdir():
		if file.name not in (FILE_MANAGER_NAME, INIT_NAME, HIERARCHY_NAME):
			file.rename(find_file(file))
