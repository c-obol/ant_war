from flask import Flask
from flask_socketio import SocketIO, send
import json, os
from room_class import room

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins = "*")

current_path = os.path.dirname(__file__)
setting_path = os.path.join(current_path, "setting.json")

setting = dict()
with open(setting_path, 'r') as f:
    setting = json.load(f)

max_room = setting["max_room"]
host_address = setting["host_address"]
port = setting["port"]

online_player = []

@socketio.on('message')
def request(message):
    pass

if __name__ == '__main__':
    socketio.run(app, port = port)