import importlib
from inspect import isfunction, getmembers, isclass, ismethod
import logging
import unittest
from pathlib import Path

from flask import Flask
from flask_socketio import SocketIO, emit

from temp import runner

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", binary=True)

logger = logging.getLogger()

@app.route("/")
def members():
    return {"members": ["Member1", "Member2"]}

@socketio.on('connect')
def connect():
    test_runner()

def test_runner():
    json = runner()
    print(json)
    emit('test_finished', json)

# request a file from the frontend
def handle_backend_file_request():
    emit('backend_request_file')

# receive data from frontend
@socketio.on('backend_receive_file')
def handle_backend_file_receive(data):
    print('Sent from frontend to backend:')
    print(data)

# send a file to the frontend
def handle_frontend_file_send():
    file = open('test.txt', 'w+')
    file.write('member_3member_4member_5')
    file.close()
    with open('test.txt', 'rb') as file:
        file_data = file.read()
    emit('frontend_receive_file', file_data)

# print the data that was sent to the frontend
@socketio.on('frontend_received_file')
def handle_frontend_file_acknowledge(file):
    print('Sent from backend to frontend:')
    print(file)

# Package Mapper: Create Test
#
@socketio.on('create_test')
def create_test():
    pass

@socketio.on('run_tests')
def run_tests():
    pass
if __name__ == "__main__":
    socketio.run(app)
