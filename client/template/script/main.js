

window.onload = function() {
    $.getJSON("./data/server_list.json", function(json){
        for (let i = 0; i < json.lengh; i++) {
            $("select#server_list")
            .append(
                `<option value = "http://${json[i].host}:${json[i].port}">
                    ${json[i].name}
                </option>`
            )
        }
    })
}