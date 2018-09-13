const express = require('express'); //import express 
const bodyParser = require('body-parser');
const config = require('../../firebase.config.json');
const firebase = require('firebase');


const app = express();
app.use(bodyParser.json());

firebase.initializeApp(config);

const restAPIMountPath = '/api';

//Set route to account functions.
app.use(restAPIMountPath + '/accounts', require('./account/accountController'));


//start server on port: 8080
var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("server listening at http://%s:%s", host, port);
});