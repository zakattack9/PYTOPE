from enum import Enum
from pprint import pp

from flask import Flask
import flask_socketio

from file_manager.testrunner.testRunner import RunTests
from file_manager.file_manager_module.FileManager import DOCKERFILES_DIR, find_file, TEST_FILES_DIR, TEST_JSON_DIR, TEST_RESULTS_DIR, \
	TEST_SCHEMA
from unittest_file_writer.UnittestFileWriter import parse_and_write_tests

"""
Events:
	Received from Front-End:
		'send_backend'			- Back-End receiving file from Front-End
		'download_frontend'		- Back-End sending file to Front-End
									afterwards, Back-End should emit:
									'frontend_download' or 'file_dne'
		'backend_request_file'	- Back-End requesting a file from the Front-End  (why?)
	Sent to Front-End:
		'frontend_download'		- Back-End finished sending file to Front-End
		'file_dne'				- Back-End could not find the file requested by the Front-End
"""

ADDRESS = 'http://127.0.0.1:5000/'


class ServerState(Enum):
	IDLE			= 0
	WRITING_TESTS	= 1
	RUNNING_TESTS	= 2


app = Flask(__name__)
socketio = flask_socketio.SocketIO(app, cors_allowed_origins="*", binary=True)

state = ServerState.IDLE


@app.route("/")
def members():
	return {"members": ["Member1", "Member2"]}


@socketio.on('connect')
def file_transfers():
	print('\tClient Connected')
	# handle_backend_file_request()
	# handle_frontend_file_send()
	...


@socketio.on('send_backend')
def socketFrontendUploadFile(filename, data):
	# receive from front-end
	try:
		path = find_file(filename)
	except Exception as e:
		# TODO - notify front-end?
		print(e.args)
		return
	with open(path, 'wb') as f:
		f.write(data)
	# run_backend()


def run_backend():
	global state
	if state is ServerState.IDLE:
		# TODO - check if we have all the files
		state = ServerState.WRITING_TESTS
		test_writer = parse_and_write_tests(TEST_SCHEMA, TEST_JSON_DIR, DOCKERFILES_DIR, TEST_FILES_DIR)
		state = ServerState.RUNNING_TESTS
		RunTests(TEST_FILES_DIR, TEST_RESULTS_DIR)
		state = ServerState.IDLE
	else:
		# TODO - what to do if already running?
		...


@socketio.on('download_frontend')
def socketFrontendDownloadFile(filename):
	global state
	if state is ServerState.IDLE:
		try:
			path = find_file(filename)
			# TODO - load results and send to front-end
			with open(path, 'rb') as f:
				data = f.read()
		except:
			flask_socketio.emit('file_dne', filename)
			return
		flask_socketio.emit('frontend_download', data)
	else:
		# TODO - results not ready yet
		flask_socketio.emit(...)


@socketio.on('frontend_received_file')
def handle_frontend_file_acknowledge(file):
	# print the data that was received from the frontend
	print('Received by backend from frontend:')
	print(file)


# request a file from the frontend
def handle_backend_file_request():
	# TODO - why would back-end request a file?
	flask_socketio.emit('backend_request_file')


# send a file to the frontend
def handle_frontend_file_send():
	# file = open('test.txt', 'w+')
	# file.write('member_3member_4member_5')
	# file.close()
	# with open('test.txt', 'rb') as file:
	#    file_data = file.read()
	flask_socketio.emit('frontend_receive_file', 'lol')


# receive data from frontend
@socketio.on('backend_receive_file')
def handle_backend_file_receive(data):
	print('Sent from frontend to backend:')
	print(data)


@socketio.on('frontend_received_file')
def handle_frontend_file_acknowledge(file):
	# print the file that was sent to the frontend
	print('Sent from backend to frontend:')
	print(file)


def main(print_updates=True):
	app.secret_key = 'super secret key'
	app.config['SESSION_TYPE'] = 'filesystem'
	if print_updates:
		pp(app.config)
		print('Server listening at ' + ADDRESS)
	socketio.run(app)


if __name__ == "__main__":
	main()
