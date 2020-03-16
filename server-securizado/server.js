const express = require('express');
 path = require('path'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 cors = require('cors');

const users = require('./routes/users');
const cars = require('./routes/cars');
expressjwt = require('express-jwt');

const app = express();

const jwtCheck = expressjwt({
    secret: 'mysupersecretkey',
});

// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/users', jwtCheck, users);
app.use('/api/cars', jwtCheck, cars);


app.set('port', process.env.PORT || 3050);
app.listen(app.get('port'));


console.log('Listening on port: ' + app.get('port'));

module.exports = app;
