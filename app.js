var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose')

const expressLayout = require("express-ejs-layouts")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var route = require('./routes/index');
const dotenv = require("dotenv")
dotenv.config()


var app = express();
console.log(process.env.ACCESS_TOKEN_SECRET)
// database setup

mongoose.connect("mongodb://localhost/express-app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log(`db connected`)
})

// view engine setup
app.use(expressLayout)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','./layout')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))

route(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
