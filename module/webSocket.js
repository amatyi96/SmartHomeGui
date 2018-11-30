var Sensor = require('./sensors');
var Stomp = require('stompjs');
var client = Stomp.overWS('ws://localhost:8080/iot');

module.exports = {
  setIO: function(io) {
    client.connect('', '', function() {
      Sensor.getAllSensor( (err, sensor) => {
        sensor.forEach( element => {
          client.subscribe('/sensor' + element.mqttLink, function(message) {
            io.emit(element.mqttLink, message.body.toString());
          });
        });
      });
      
      // Chart teszt!
      client.subscribe('/sensor/teszt', function(message) {
        io.emit('tesztChart', JSON.parse(message.body));
        console.log("Emit: " + JSON.parse(message.body));
      });

      io.on('connection', function(socket) {
          client.send('/gui/teszt', {}, '');
          console.log("afasfasf");
      });    
    });
  }
}