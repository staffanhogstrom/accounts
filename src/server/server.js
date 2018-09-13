const express = require('express'); //import express 
const bodyParser = require('body-parser');
const config = require('../../firebase.config.json');
const firebase = require('firebase');
const expressValidator = require('express-validator');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(cookieParser());

firebase.initializeApp(config);

const restAPIMountPath = '/api';

//Set route to auth functions.
app.use(restAPIMountPath + '/authenticate', require('./session/sessionController'));

//Set route to account functions.
app.use(restAPIMountPath + '/accounts', require('./account/accountController'));

app.use(express.static(path.join(__dirname, '../../dist')));

//start server on port: 8080
var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    /* eslint-disable-next-line no-console */
    console.log('server listening at http://%s:%s', host, port);
});