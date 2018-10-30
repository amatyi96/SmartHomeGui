var express = require('express');
var router = express.Router();

// Modellek beimportálása
//var Rooms = require('./module/rooms');
var Sensors = require('../module/sensors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * ID alapján lesz a szobáknak külön oldala!
 */
router.get('/:id', function(req, res, next) {
  Sensors.getAllSensorsbyRoomId(req.params.id, function(err, sensors) {
    //Hiba kezelés is kéne!
    res.render('index', {
      title: 'SmartHomeGui',
      room_id: req.params.id,
      sensors: sensors
    });
  });
});

module.exports = router;
