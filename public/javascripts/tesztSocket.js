var socket = io();

socket.on("temp", function(data) {
    var temp = document.getElementById('temp');
    temp.textContent = data;
});