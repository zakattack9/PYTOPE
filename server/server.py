from pathlib import Path
from pprint import pp

from flask import Flask
from flask_socketio import emit, SocketIO

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

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", binary=True)


@app.route("/")
def members():
	return {"members": ["Member1", "Member2"]}


@socketio.on('connect')
def file_transfers():
	print('\tClient Connected')


# handle_backend_file_request()
# handle_frontend_file_send()


@socketio.on('send_backend')
def socketFrontendUploadFile(filename, data):
	# receive from front-end
	with open(filename, 'wb') as f:
		f.write(data)
	# TODO - give file to file manager
	# TODO - call UnittestFileWriter (with info from file manager)
	# TODO - call TestRunner
	# TODO - store results
	...


@socketio.on('download_frontend')
def socketFrontendDownloadFile(filename):
	# <send to front-end>
	path = Path(filename)
	try:
		# TODO - load results and send to front-end
		with path.open('rb') as f:
			data = f.read()
	except:
		emit('file_dne', filename)
		return
	emit('frontend_download', data)


@socketio.on('frontend_received_file')
def handle_frontend_file_acknowledge(file):
	# print the data that was received from the frontend
	print('Received by backend from frontend:')
	print(file)


# request a file from the frontend
def handle_backend_file_request():
	# TODO - why would back-end request a file?
	emit('backend_request_file')


# send a file to the frontend
def handle_frontend_file_send():
	# file = open('test.txt', 'w+')
	# file.write('member_3member_4member_5')
	# file.close()
	# with open('test.txt', 'rb') as file:
	#    file_data = file.read()
	emit('frontend_receive_file', 'lol')


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
