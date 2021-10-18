from flask import Flask, render_template, request
from flask_socketio import SocketIO, send
import json, os
from room import *

# ================================================================ #

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins = "*")

current_path = os.path.dirname(__file__)
setting_path = os.path.join(current_path, "setting.json")

setting = dict()
with open(setting_path, 'r') as f:
    setting = json.load(f)

server_name = setting["server_name"]
max_room = setting["max_room"]
host_address = setting["host_address"]
port = setting["port"]
admins = setting["admins"]

# ================================================================ #

@app.route('/')
def main():
    return render_template("./main.html",
        server = {"name" : server_name},
        room = {"list" : room_list, "name" : room_list.keys()}
    )

# ================================================================ #

@app.route('/admin_login')
def admin_login():
    return render_template("./admin_login.html")

@app.route('/admin', methods = ['GET', 'POST'])
def admin():
    try:
        id = request.form['ID']
        pw = request.form['PW']

        if id in admins.keys():
            if pw == admins[id]:
                return render_template("./admin.html",
                    room = {"list" : room_list, "name" : room_list.keys()}
                )
        return "<script>alert('Error')</script>"

    except:
        return "<script>alert('Error')</script>"

# ================================================================ #

if __name__ == '__main__':
    socketio.run(app, host = host_address, port = port, debug = True)

# ================================================================ #