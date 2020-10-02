var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let myport = 3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thecms', { useNewUrlParser: true, useUnifiedTopology: true });
console.log(`connect to db`)

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.listen(myport, () => {
    console.log("runned on ", myport, " port");
})

module.exports = app;
