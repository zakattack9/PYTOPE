from flask import Flask
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def members():
    return {"members": ["Member1", "Member2"]}

# emit event example
@socketio.on('connect')
def test_connect():
    #while True:
        #emit("hello", "hello")
        #time.sleep(1)
        emit("test", "success")

#when not responding to something from a client, can send messages to client using syntax below
def sendHello():
    socketio.emit("hello", "hello")

def sendWorld():
    socketio.emit("hello", "world")

# receive event example
@socketio.on("USER_ONLINE")
def handle_my_custom_event(arg):
    print(arg)
    while True:
        sendHello()
        time.sleep(2)
        sendWorld()
        time.sleep(2)

if __name__ == "__main__":
    socketio.run(app)