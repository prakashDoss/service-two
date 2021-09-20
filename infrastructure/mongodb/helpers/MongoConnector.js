const mongoose = require('mongoose');
const mongodb = require('../../../configuration/mongodb');
const credentials = mongodb.getCredentials(process.env.NODE_ENV);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// const connectionString = `${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.databsase}`;
const connectionString = `${credentials.host}:${credentials.port}/${credentials.databsase}`;
mongoose.connect(`${connectionString}`, options);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {    
    applog.log.info({MONGO_CONNETION_STATUS:'Mongoose default connection opened'});
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    applog.log.info({MONGO_CONNETION_ERROR:err});
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    applog.log.info({MONGO_CONNETION_STATUS:`Mongoose default connection disconnected :${connectionString}`});    
});

