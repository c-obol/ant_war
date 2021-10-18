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
    var host = $("input#host").val();
    var port = $("input#port").val();

    var url = `http://${host}:${port}`;
    var socket = io.connect(url);

    $("html").html(`
        <title>antwar</title>
        <FONT face = "Arial Narrow">
            <center>
                <p>connecting...</p>
            </center>
        </FONT>
    `);

    socket.on('connect', function(){if (!server_check) {return}});

    var load_count = 0;
    var loading = setInterval(function () {
        if (load_count >= 20) {
            alert("Fail");

            socket.disconnect();
            clearInterval(loading);

            location.reload();
        }
        if (socket.connected) {
            window.location.href = url;
            clearInterval(loading);
        }
        load_count++;
    }, 250);
}