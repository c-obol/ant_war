window.onload = function() {
    $.getJSON("./data/server_list.json", function(json){
        for (let i = 0; i < json.length; i++) {
            $("select#server_list")
            .append(
                `<option value = "${json[i].host}:${json[i].port}">
                    ${json[i].name}
                </option>`
            );
        }
    })

    $("select#server_list").change(function() {
        var val = $("select#server_list option:selected").val();
        $("input#host").val(val.split(':')[0]);
        $("input#port").val(val.split(':')[1]);
    })
}

function connect_server() {
    var name = $("input#name").val();

    var host = $("input#host").val();
    var port = $("input#port").val();

    if (name == "" || host == "" || port == "") {
        alert("please check input values.");
        return;
    }
    if (name.indexOf(' ') != -1) {
        alert("Name can't include space.");
        return;
    }

    var url = `https://${host}:${port}`;
    var socket = io.connect(url);

    var server_check = true
    if (server_check){
        socket.on('connect', function() {
        })
        socket.io.on('error', function (err) {
            alert("The server is not run smoothly.");
            socket.disconnect();
            return;
        })
        servers = false;
    }
}