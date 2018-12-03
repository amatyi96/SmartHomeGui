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
    nameDisplay: { type: Boolean, default: false },
    position: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: 3 },
        height: { type: Number, default: 3 }
    },
    position_2col_active: { type: Boolean, default: false },
    position_2col: {
        x: { type: Number, default: 0},
        y: { type: Number, default: 0},
        width: { type: Number, default: 6},
        height: { type: Number, default: 3}
    },
    position_3col_active: { type: Boolean, default: false },
    position_3col: {
        x: { type: Number, default: 0},
        y: { type: Number, default: 0},
        width: { type: Number, default: 4},
        height: { type: Number, default: 3}
    }
});

/**
 * Model létrehozása!
 */
var sensors = mongoose.model('sensors', sensorSchema);

module.exports = {
    /**
     * Beszúr az adatbázisba egy új szenzort!
     * @param {String} room_id Aktuális szoba ID-ja
     * @param {String} name Szenzor neve
     * @param {Boolean} nameDisplay Megjelenjen-e a szenzor neve
     * @param {*} icon Szenzor ikonja
     * @param {*} callback 
     */
    insertSensor: function(room_id, name, nameDisplay,  icon, callback) {
        var newSensor = new sensors({
            room_id: room_id,
            name: name,
            nameDisplay: nameDisplay,
            icon: icon
        });

        newSensor.save(callback);
    },

    getAllSensor: function(callback) {
        sensors.find({}, callback);
    },

    getAllSensorsbyRoomId: function(roomId, callback) {
        sensors.find({ room_id: roomId }, null, {sort: {'position.x': 1, 'position.y': 1}}, callback);       
    },

    getSensorsbyId: function(id, callback) {
        sensors.findOne({ _id: id }, callback);
    },

    updateSensor: function(id, name, nameDisplay, icon, callback) {
        sensors.updateOne({ _id: id }, { $set: { name: name, nameDisplay: nameDisplay, icon: icon}}, callback);
    },

    /**
     * 
     * @param {String} window_mode A böngésző ablak mérete
     * @param {String} id Sensor ID
     * @param {Number} x Sensor kártya x koordinátája
     * @param {Number} y Sensor kártya x koordinátája
     * @param {Number} width Sensor kártya szélessége
     * @param {Number} height Sensor kártya magassága
     * @param {*} callback 
     */
    updateSensorCard: function(window_mode, id, x, y, width, height, callback) {
        if(window_mode == "3columns") {
            console.log("3columns");
            sensors.updateOne({ _id: id}, { $set: { position_3col: { x: x, y: y, width: width, height: height}, position_3col_active: true }}, callback);
        } else if(window_mode == "2columns") {
            sensors.updateOne({ _id: id}, { $set: { position_2col: { x: x, y: y, width: width, height: height}, position_2col_active: true }}, callback);   
        } else {
            sensors.updateOne({ _id: id}, { $set: { position: { x: x, y: y, width: width, height: height}}}, callback);
        }
    },

    deleteSensorById: function(id, callback) {
        sensors.deleteOne({ _id: id}, callback);
    },

    deleteSensorByRoomId: function(id, callback) {
        sensors.deleteMany({ room_id: id}, callback);
    }
}