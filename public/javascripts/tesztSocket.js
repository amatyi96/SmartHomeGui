var socket = io();

$.get( 'http://localhost:3000/api/getAllSensor', function( data ) {
    data.forEach( element => {
        socket.on(element.mqttLink, function(data) {
            var temp = document.getElementById(element.mqttLink);
            temp.textContent = data;   
        });   
    });
});