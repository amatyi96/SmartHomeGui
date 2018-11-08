var socket = io();

socket.on("temp", function(data) {
    var temp = document.getElementById('temp');
    temp.textContent = data;
});

socket.on("hum", function(data) {
    var hum = document.getElementById('hum');
    hum.textContent = data;
});