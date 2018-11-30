var socket = io();

var chart = new Chartist.Line('.ct-chart', {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: []
});

var items = [];
socket.on('tesztChart', function(data) {
  items = data;
  var newData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [data] 
  }
  chart.update(newData);
});

socket.on('/temp', function(data) {
  console.log(data);
  items.push(data);
  var newData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [items] 
  }
  chart.update(newData);
});

socket.emit('tesztUpdate');