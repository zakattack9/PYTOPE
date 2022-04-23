import os
from pathlib import Path
from time import sleep

import flask_socketio

import FlaskServer


def test_import():
	# import from front-end
	# TODO
	FlaskServer.socketFrontendUploadFile('test1', b'test1')


def test_export():
	# export to front-end
	# TODO
	FlaskServer.socketFrontendDownloadFile('test1')


def emit(*args):
	event = args[0]
	out = f"Event '{event}'"
	if len(args) > 1:
		filename = args[1]
		out += f" with File Name '{filename}'"
		if len(args) > 2:
			data = args[2]
			out += f" and Data '{data.decode()}'"
	print(out)


def main():
	print('cwd: ' + os.getcwd())
	flask_socketio.emit = emit
	test_import()
	sleep(3)
	test_export()


if __name__ == '__main__':
	main()
