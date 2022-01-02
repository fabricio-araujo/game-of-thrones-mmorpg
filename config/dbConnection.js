//import mongodb
var mongo = require('mongodb');

var connMongoDB = function() {
    var db = new mongo.Db(
        'got', //db name
        new mongo.Server( //server connection: expected as an 3 params object
            'localhost', //a string with the server address where the db is
            27017, //the connection port
            {} //an object with server config options
        ),
        {} // additional db config
    );
    return db;
}

//exports a function to be used by the consign autoloader
module.exports = function() {
    return connMongoDB;
}