var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const { engine } =require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require("express-session")
var logger = require('morgan');
const flash = require("connect-flash")
var route = require('./routes/index');
const dotenv = require("dotenv")
const isAuth = require("./middlewares/auth")
dotenv.config()


var app = express();

// database setup

mongoose.connect("mongodb://localhost/express-app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log(`db connected`)
})
app.use(cookieParser("SecretCookie"));
// app.use(session({
//   secret: 'SecretSession',
//   cookie: {maxAge : 60000},
//   resave : true,
//   saveUninitialized : true
// }))
app.use(flash())

// view engine setup
app.engine('.hbs', engine({extname: '.hbs',
  helpers: {
    eqCategory : function(v1 , v2 ) {
      return v1 === v2
    },
    sum : (v1 , v2)=>{
      return v1 + v2
    }
  },
 defaultLayout : 'admin_layout'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(methodOverride('_method'))


app.get('*', isAuth.checkAuthentication);

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
