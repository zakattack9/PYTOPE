from time import sleep

import flask_socketio

import FlaskServer


def test_import():
	# import from front-end
	# TODO
	FlaskServer.socketFrontendUploadFile('Test1.json', b'<json data>')


def test_export():
	# export to front-end
	# TODO
	FlaskServer.socketFrontendDownloadFile('Test1.json')


def emit(event, *args):
	print(f"Event '{event}'")
	print(f"\twith args: {args}")


def main():
	flask_socketio.emit = emit  # re-define emit
	test_import()
	sleep(1)
	test_export()


if __name__ == '__main__':
	main()
