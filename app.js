var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mqttSocket = require('./module/MqttSocket');

//Csatlakozás az adatbázishoz!
mongoose.connect('mongodb://localhost:27017/SmartHomeGui', { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log("Nem sikerült csatlakozni az adatbázishoz!");
  } else {
    console.log("Sikeres csatlakozás az adatbázishoz!");
  }
});

// Modellek beimportálása
var Rooms = require('./module/rooms');
var Sensors = require('./module/sensors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var mqttClient = new mqttSocket();
mqttClient.connect(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middleware a szobák nevének a sidebar-ban történő megjelenítéshez.
 */
app.use( (req, res, next) => {
  var roomsNameList = Rooms.getAll();
  var result = [];

  roomsNameList.then( (rooms) => {
    for( var i in rooms) {
      result.push(rooms[i]);
    }

    res.locals.roomsName = result;

    next();
  }).catch( (err) => {
    console.error("Valami nincs rendben: " + err);
  });
});

app.get('/tesztSocket', (req, res) => {
  mqttClient.sendMessage('Szia! °C');
});

/**
 * API
 * Szoba hozzáadása az adatbázishoz.
 */
app.post('/api/insertRoom', (req, res) => {
  Rooms.insertRoom(req.body.name, (err, room) => {
    //Error kezelés is kéne!
    
    res.redirect('/');
  });
});

app.post('/api/updateRoom', (req, res) => {
  Rooms.updateRoomName(req.body.room_id, req.body.name, (err, room) => {
    //Error kezelés is kéne!
    res.redirect('/' + req.body.room_id);
  });
});

// Szoba lekérdezése ID alapján
app.get('/api/getRoomByID/:id', (req, res) => {
  Rooms.getRoomByID(req.params.id, (err, data) => {
    //Error kezelés is kéne!
    res.send(data);
  });
});

// Szoba törlése ID alapján
app.get('/api/deleteRoom/:id', (req, res) => {
  Rooms.deleteRoomById(req.params.id, (err, data) => {
    //Error kezelés is kéne!

    Sensors.deleteSensorByRoomId(req.params.id, (err, data) => {
      //Error kezelés is kéne!
      res.send("/");
    });
  });  
});

// Szenzor beszúrása az adatbázisba!
app.post('/api/insertSensor', (req, res) => {
  Sensors.insertSensor(req.body.room_id, req.body.sensorName, req.body.selectedIcon, req.body.selectedDuty, (err, room) => {
    //Error kezelés is kéne!
    res.redirect('/' + req.body.room_id);
  });
});

// Szenzorok lekérdezése az adatbázisból ID alapján!
app.get('/api/getSensorByID/:id', (req, res) => {
  Sensors.getAllSensorsbyId(req.params.id, function(err, data) {
    //Error kezelés is kéne!

    res.send(data);
  });
});

// Szenzorok adatainak módosítása!
app.post('/api/updateSensor/:id', (req, res) => {
  Sensors.updateSensor(req.params.id, req.body.sensorName, req.body.selectedIcon, req.body.functionRadioButton, function(err, data) {
    res.redirect('/' + req.body.room_id);
  });
});

// Szenzor kártya módosítása. (Méret és pozició)!
app.post('/api/updateSensorCard', (req, res) => {
  var updateData = JSON.parse(req.body.data);
  for( var i  = 0; i < updateData.length; i++) {
    Sensors.updateSensorCard(updateData[i].id, updateData[i].x, updateData[i].y, updateData[i].width, updateData[i].height, function(err, data) {
      console.log("Sikeres kérés!");      
    });
  }
});

// Szenzorok törlése
app.post('/api/deleteSensor/:id', (req, res) => {
  Sensors.deleteSensorById(req.params.id, function(err, data) {
    //Error kezelés is kéne!
    
    res.redirect('/' + req.body.room_id);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app: app,
  server: server
}
