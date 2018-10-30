/**
 * Szenor model!
 * Csatlakozás az adatbázishoz.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SmartHomeGui');

/**
 * Schema létrehozása mongoose segítségével, ami leír egy modelt!
 */
var sensorSchema = mongoose.Schema({
    room_id: String,
    name: String,
    icon: String,
    duty: String
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
    }

}