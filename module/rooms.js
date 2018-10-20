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
    }
}