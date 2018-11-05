var mqtt = require('mqtt');

module.exports = class MqttSocket {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://80.211.181.235';
    this.username = '';
    this.password = '';
  }

  connect(io) {
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });
    this.mqttClient = mqtt.connect(this.host);

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('mytopic', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
      io.emit("temp", message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish('mytopic', message);
  }
}