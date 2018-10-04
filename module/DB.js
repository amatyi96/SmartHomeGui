const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

module.exports = class DB {
    getAll() {
        return new Promise( (resolve, reject) => {
            MongoClient.connect(url, (err, db) =>{
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        }).then( (db) => {
            return new Promise( (resolve, reject) => {
                var collection = db.db("SmartHomeGui").collection("students");

                collection.find({}).toArray( (err, items) => {
                    if (err) {
                        reject(err);
                    } else {
                        //console.log(items);
                        resolve(items);
                    }
                });
            });
        });
    }
}