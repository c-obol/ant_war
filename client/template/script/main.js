var servers = {}
var id, pw
var host, port
var sock

function login() {
    load_server_list()
    var index = $("select#server_list option:selected").val()
    if (index == "set") {
        alert("Please select the server again.")
        return
    }
    host = servers.list[index].host
    port = servers.list[index].port
    var id = $("input#ID").val()
    var pw = $("input#PW").val()

    var domain = `http://${host}:${port}`

    var message = {
        "type" : "login",
        "profile" : {
            "id" : id,
            "pw" : pw
        }
    }
    sock = io.connect(domain)
    var server_check = true
    if (server_check){
        sock.on('connect', function() {
            sock.send(message)
        })
        sock.io.on('error', function (err) {
            alert("The server is not run smoothly.")
            sock.disconnect()
            return
        })
        servers = false
    }

    sock.on('message', function (message) {
        if (message.access_code == pw) {
            if (message.type == "please_join") {
                alert("Unregisted ID : Please register first.")
                sock.disconnect()
                return
            }
            else if (message.type == "mistake_pw") {
                alert("Please check the PW again.")
                sock.disconnect()
                return
            }
            else if (message.type == "correct") {
                sock.disconnect()

                var current_directory = __dirname
                var folder_list =  current_directory.split('/')
                folder_list.pop()

                var before_directory = ""
                for (let i = 0; i < folder_list.length; i++) {
                    before_directory += (folder_list[i] + '/')
                }

                var join_html_path = before_directory + "wait.html"
                location.href = join_html_path
                return
            }
        }
    })
}

function load_server_list() {
    $.getJSON("./data/server_list.json", function(json) {
        servers = json
        for (let i = 0; i < servers.lengh; i++) {
            $("select#server_list")
            .append(
                `<option value = "${i}">
                    ${servers.list[i].name}
                </option>`
            )
        }
    })
}

window.onload = function () {
    load_server_list()
}