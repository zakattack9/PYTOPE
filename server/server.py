from enum import Enum
from pprint import pp
from time import sleep
from pathlib import Path

import re
import flask_socketio
from flask import Flask, send_file
from flask_cors import CORS
from zipfile import ZipFile


from file_manager.file_manager_module import FileManager
from unittest_file_writer.UnittestFileWriter import parse_and_write_tests
from unittest_runner.TestRunner import run_tests



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
	RECEIVING_FILE	= 1
	RECEIVED_FILE	= 2
	WRITING_TESTS	= 3
	RUNNING_TESTS	= 4


#from temp import runner
#from test_runner import runner

app = Flask(__name__)
socketio = flask_socketio.SocketIO(app, cors_allowed_origins="*", binary=True)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

state = ServerState.IDLE


#logger = logging.getLogger()

@app.route("/")
def members():
	return {"members": ["Member1", "Member2"]}

@app.route("/get-export/<zip_type>", methods=['GET'])
def export(zip_type):
	print(zip_type)
	if zip_type == 'unittests':
		contents = export_zip(0)
	elif zip_type == 'configs':
		contents = export_zip(1)
	else:
		return "NO SUCH FILE: " + zip_type
	return contents

def export_zip(zip_type):
	print("BACKEND: export_zip()")
	path = "../server/"
	if zip_type == 0:
		zip_name = 'unittests'
		FileManager.zip_folder(FileManager.TEST_FILES_DIR, zip_name)
	elif zip_type == 1:
		zip_name = 'configs'
		FileManager.zip_folder(FileManager.CONFIGS_DIR, zip_name)
	print(path)
	path += zip_name + '.zip'
	return send_file(path)

@socketio.on('connect')
def file_transfers():
	print('\tClient Connected')

@socketio.on('send_backend')
def socketFrontendUploadFile(filename, data):
	# receive from front-end
	global state
	if state not in (ServerState.IDLE, ServerState.RECEIVING_FILE, ServerState.RECEIVED_FILE):
		print(f"Server received file while in state '{state}'...")
		return
	state = ServerState.RECEIVING_FILE
	try:
		path = FileManager.find_file(filename)
	except Exception as e:
		print(e.args)
		return
	print(f"Writing file '{path}' with data {data}")
	with open(path, 'wb') as f:
		f.write(data)
	state = ServerState.RECEIVED_FILE
	

@socketio.on('send_json')
def socketFrontEndUploadJSON(filename, data):
	# receive from front-end
	global state
	if state not in (ServerState.IDLE, ServerState.RECEIVING_FILE, ServerState.RECEIVED_FILE):
		print(f"Server received file while in state '{state}'...")
		return
	state = ServerState.RECEIVING_FILE
	try:
		path = FileManager.find_file(filename)
	except Exception as e:
		print(e.args)
		return
	print(f"Writing file '{path}' with data {data}")
	with open(path, 'w') as f:
		f.write(data)
	state = ServerState.RECEIVED_FILE

@socketio.on('run_tests')
def run_backend():
	global state
	json_data = ''
	if state is ServerState.RECEIVING_FILE:
		sleep(0.5)
	if state is ServerState.RECEIVED_FILE:
		# FileManager.clear_dir(FileManager.TEST_RESULTS_DIR)
		state = ServerState.WRITING_TESTS
		test_writer = parse_and_write_tests(FileManager.TEST_SCHEMA, FileManager.TEST_JSON_DIR, FileManager.DOCKERFILES_DIR, FileManager.TEST_FILES_DIR)
		state = ServerState.RUNNING_TESTS
		json_data = run_tests(FileManager.TEST_FILES_DIR, FileManager.TEST_FILES_PACKAGE, FileManager.TEST_RESULTS_DIR, FileManager.TEST_RUNNER_LOG)
		print('JSON_Data: ' + json_data)
	state = ServerState.IDLE
	# FileManager.clear_dir(FileManager.TEST_FILES_DIR)
	# FileManager.clear_dir(FileManager.TEST_JSON_DIR)

	if json_data != '':
		flask_socketio.emit('test_finished', json_data)
	else:
		flask_socketio.emit('no_tests_found')


@socketio.on('frontend_received_file')
def handle_frontend_file_acknowledge(file):
	# print the data that was received from the frontend
	print('Received by backend from frontend:')
	print(file)

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


# Package Mapper: Create Test
#
@socketio.on('create_test')
def create_test():
    pass

if __name__ == "__main__":
	main()
