from flask import Flask
from flask_socketio import SocketIO, send
import json, os

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins = "*")

current_path = os.path.dirname(__file__)
setting_path = os.path.join(current_path, "setting.json")
user_path = os.path.join(current_path, "user.json")

setting = dict()
with open(setting_path, 'r') as f:
    setting = json.load(f)

max_room = setting["max_room"]
host_address = setting["host_address"]
port = setting["port"]

user_list = dict()
with open(user_path, 'r') as f:
    user_list = json.load(f)

online_player = []

@socketio.on('message')
def request(message):
    if message["type"] == "login":
        send_type = ["correct", "please_join", "mistake_pw"]
        send_message = dict()
        send_message["access_code"] = message["profile"]["pw"]

        if not (message["profile"]["id"] in user_list.keys()):
            send_message["type"] = send_type[1]

        elif user_list[message["profile"]["id"]]["pw"] != message["profile"]["pw"]:
            send_message["type"] = send_type[2]

        elif user_list[message["profile"]["id"]]["pw"] == message["profile"]["pw"]:
            send_message["type"] = send_type[0]
            print("[CONNECT] - ", end = "")
            print(message["profile"]["id"])

        send(send_message, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, port = port)