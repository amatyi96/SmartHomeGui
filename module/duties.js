/**
 * Funkció model!
 */
const mongoose = require('mongoose');

/**
 * Schema létrehozása mongoose segítségével, ami leír egy modelt!
 */
var dutySchema = mongoose.Schema({
    sensor_id: String,
    dutyName: String,
    inputLinks: Array,
    outputLinks: Array
});

/**
 * Model létrehozása!
 */
var duties = mongoose.model('duties', dutySchema);

module.exports = {
    /**
     * Funkció beszúrása az adatbázisba!
     * @param {String} sensor_id Szenzor ID
     * @param {String} dutyName Funkció neve
     * @param {Array} inputLinks Kimeneti linkek tömbje
     * @param {Array} outputLinks Bemeneti linkek tömbje
     * @param {*} callback 
     */
    insertDuty: function(sensor_id, dutyName, inputLinks, outputLinks, callback) {
        var newDuty = new duties({
            sensor_id: sensor_id,
            dutyName: dutyName,
            inputLinks: inputLinks,
            outputLinks: outputLinks
        });

        newDuty.save(callback);
    },

    /**
     * Visszaadja az összes funkciót
     * @param {*} callback 
     */
    getAllDuties: function(callback) {
        duties.find({}, callback);
    },

    /**
     * Lekérdezi az adott szenzor funkcióit
     * @param {String} sensor_id Szenzor ID
     * @param {*} callback 
     */
    getAllDutiesBySensorID: function(sensor_id, callback) {
        duties.find({sensor_id: sensor_id}, callback);
    },

    /**
     * Lekérdezi az adatbázisból az összes színválasztót
     * @param {*} callback 
     */
    getAllColorPicker: function(callback) {
        duties.find({dutyName: 'colorPicker'}, callback);
    }
}