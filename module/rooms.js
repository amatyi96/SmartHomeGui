/**
 * Szoba model!
 * Csatlakozás az adatbázishoz.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SmartHomeGui');

/**
 * Schema létrehozása mongoose segítségével, ami leír egy modelt!
 */
var roomsSchema = mongoose.Schema({
    name: String
});

/**
 * Model létrehozása!
 */
var rooms = mongoose.model('rooms', roomsSchema);

/*var room = new rooms({ name: 'Előszoba' });
room.save().then(() => console.log(room.name));*/

module.exports = {
    /**
     * Lekérdezi az adatbázisból a modellünk összes elemét!
     */
    getAll: function() {
        var result =  rooms.find({}).exec();
        return result;
    },

    /**
     * Beszúr az adatbázisba egy új szobát!
     * @param {String} Szoba neve
     * @param {*} callback
     */
    insertRoom: function(name, callback) {
        var newRoom = new rooms({
            name: name
        });

        newRoom.save(callback);
    },

    /**
     * ID alapján lekéri az adatbázisból egy szoba adatait!
     * @param {String} id A kért szoba ID-ja 
     * @param {*} callback 
     */
    getRoomByID: function(id, callback) {
        rooms.findOne({ _id: id}, callback);
    },

    updateRoomName: function(id, name, callback) {
        rooms.updateOne({ _id: id}, { $set: { name: name }}, callback);
    },

    deleteRoomById: function(id, callback) {
        rooms.deleteOne({ _id: id}, callback);
    }
}