/**
 * Szenzor model!
 */
const mongoose = require('mongoose');

/**
 * Schema létrehozása mongoose segítségével, ami leír egy modelt!
 */
var sensorSchema = mongoose.Schema({
    room_id: String,
    name: String,
    icon: String,
    duty: String,
    position: {
        x: { type: String, default: 0 },
        y: { type: String, default: 0 },
        width: { type: String, default: 3 },
        height: { type: String, default: 3 }
    }
});

/**
 * Model létrehozása!
 */
var sensors = mongoose.model('sensors', sensorSchema);

/*var room = new rooms({ name: 'Előszoba' });
room.save().then(() => console.log(room.name));*/

module.exports = {
    /**
     * Lekérdezi az adatbázisból a modellünk összes elemét!
     */
    /*getAll: function() {
        var result =  rooms.find({}).exec();
        return result;
    },*/

    /**
     * Beszúr az adatbázisba egy új szenzort!
     * @param {*} room_id Aktuális szoba ID-ja
     * @param {*} name Szenzor neve
     * @param {*} icon Szenzor ikonja
     * @param {*} duty Funkcionalitása
     * @param {*} callback 
     */
    insertSensor: function(room_id, name, icon, duty, callback) {
        var newSensor = new sensors({
            room_id: room_id,
            name: name,
            icon: icon,
            duty: duty,
        });

        newSensor.save(callback);
    },

    getAllSensorsbyRoomId: function(roomId, callback) {
        sensors.find({ room_id: roomId }, callback);       
    },

    getAllSensorsbyId: function(id, callback) {
        sensors.findOne({ _id: id }, callback);
    },

    updateSensor: function(id, name, icon, duty, callback) {
        sensors.updateOne({ _id: id }, { $set: { name: name, icon: icon, duty, duty}}, callback);
    },

    updateSensorCard: function(id, x, y, width, height, callback) {
        sensors.updateOne({ _id: id}, { $set: { position: { x: x, y: y, width: width, height: height}}}, callback);
    },

    deleteSensorById: function(id, callback) {
        sensors.deleteOne({ _id: id}, callback);
    },

    deleteSensorByRoomId: function(id, callback) {
        sensors.deleteMany({ room_id: id}, callback);
    }
}