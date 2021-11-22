from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", binary=True)

@app.route("/")
def members():
    return {"members": ["Member1", "Member2"]}

@socketio.on('connect')
def file_transfers():
    handle_backend_file_request()
    handle_frontend_file_send()

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

if __name__ == "__main__":
    socketio.run(app)