const mongoose = require('mongoose');

let dbURI = process.env.DB_URI;

mongoose.connect(dbURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;