from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def members():
    return {"members": ["Member1", "Member2"]}

# emit event example
@socketio.on('connect')
def test_connect():
    emit("hello", "world")

# receive event example
@socketio.on("USER_ONLINE")
def handle_my_custom_event(arg):
    print(arg)

if __name__ == "__main__":
    socketio.run(app)