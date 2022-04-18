import importlib
from inspect import isfunction, getmembers, isclass, ismethod
import logging
import unittest
from pathlib import Path

from flask import Flask
from flask_socketio import SocketIO, emit

from unittest_file_writer import UnittestFileWriter

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", binary=True)

logger = logging.getLogger()

@app.route("/")
def members():
    return {"members": ["Member1", "Member2"]}

@socketio.on('connect')
def file_transfers():
    test_runner()

def test_runner():
    p1 = Path('../schemas')   #test_json
    p2 = Path('../docker')   #dockerfiles
    p3 = Path('../schemas')          #test_files
    test = UnittestFileWriter.parse_and_write_tests(p1, p2, p3)
    for file in test.test_files:
        logging.basicConfig(level=logging.DEBUG)

        importlib.invalidate_caches()
        module = importlib.import_module(file.class_name)
        #test_class = getmembers(module, isclass)
        #functions = getmembers(test_class, isfunction)
        #print(test_class)
        #functions = []
        #for obj in inspect.getmembers(module):
        #    print()
        #    if inspect.ismethod(obj):
        #        functions.add(obj)

        test_suite = unittest.TestLoader().loadTestsFromModule(module)
        output, result = unittest.TextTestRunner(verbosity=2, stdout=output).run(test_suite)
        logger.debug(result)
        print(output)
        #emit('test_result')

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
    test_runner()
    pass
if __name__ == "__main__":
    socketio.run(app)
