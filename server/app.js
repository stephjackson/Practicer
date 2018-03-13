//NPM package includes
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');

//Contains passport auth configuration
require('./configs/passport-config');

//Hooks into database
mongoose.connect('mongodb://localhost/practicer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session middleware.
app.use(session({
  secret: "A secret to be changed later.",
  resave: true,
  saveUninitialized: true
}));

//Passport setup.
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,                 // allow other domains to send cookies
    origin: ["http://localhost:4200"]  // these are the domains that are allowed
  })
);

//Route info
var index = require("./routes/index");
app.use("/", index);

var authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

var listRoutes = require('./routes/list-routes')
app.use('/api/lists', listRoutes);

var itemRoutes = require('./routes/item-routes')
app.use('/', itemRoutes);

app.use((req, res, next) => {
  // If no routes match, send them the Angular HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
