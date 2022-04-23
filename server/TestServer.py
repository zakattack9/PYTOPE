from pathlib import Path
from time import sleep

import flask_socketio

import FlaskServer
from file_manager.file_manager_module import FileManager

TESTING_DIR = FileManager.SERVER_DIR / 'zz_testing'


def _import(path: Path):
	with path.open('rb') as f:
		data = f.read()
	FlaskServer.socketFrontendUploadFile(path.name, data)


def test_import():
	# import from front-end
	for path in TESTING_DIR.iterdir():
		_import(path)


def test_export():
	# export to front-end
	for path in TESTING_DIR.iterdir():
		FlaskServer.socketFrontendDownloadFile(path.name)


def cleanup():
	FileManager.clear_temp_dirs()


def emit(event, *args):
	print(f"Event '{event}'")
	print(f"\twith args: {args}")


def main():
	flask_socketio.emit = emit  # re-define emit
	test_import()
	sleep(1)
	test_export()
	sleep(1)
	input('Done.  Press enter to cleanup and exit...')
	cleanup()


if __name__ == '__main__':
	main()
