var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require("async");
var exphbs = require('express-handlebars');//HTML TEMPLATING
var mongoose = require('mongoose');//FOR Database

var User     = require('./services/models/user');
var passport = require('passport');
var routes = require('./services/routes');//FOR ROUTES
var paginate = require('express-paginate');//Pagination
var i18n = require('i18n-2');//Internationalization

var app = express();//INITIATE A

//CONNECT DB
if (app.get('env') === 'development')
    mongoose.connect(require('./config/database.js').remote);
else
    mongoose.connect(process.env.MONGOLAB_URI ||require('./config/database.js').remote);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/********view engine setup****/
// Register `hbs` as our view engine using its bound `engine()` function.
// Set html in app.engine and app.set so express knows what extension to look for.
app.engine('.hbs', exphbs({
        defaultLayout: 'single',
        extname: '.hbs',
        helpers: require("./public/javascripts/hb-helper.js").helpers
    })
)
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public

/**************************************************************
*******************BEGINING AUTHENTICATION**********************
***************************************************************/
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport);

/************* Internationalization Config*******/

i18n.expressBind(app, {
  // setup some locales - other locales default to en silently
  locales: ['en', 'sv'],
  defaultLocale: 'sv',
  // change the cookie name from 'lang' to 'locale'
  cookieName: 'brantuLang'
});

app.use(function(req, res, next) {
  req.i18n.setLocaleFromCookie();
  next();
});

/************* ROUTES *******/
app.set('json spaces', 2);//ONLY DEVELOPMENT
app.use(paginate.middleware(10, 50));

app.use(function(req, res, next){
    res.locals.user = req.user;
    if(req.user){
        User
            .findOne({ _id: req.user._id })
            .populate('brands')
            .exec(function (err, user) {
                if (err) return handleError(err);
                res.locals.user.brands = user.brands;
            });
    }
    next();
});
app.use(routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('Error handler.......')
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
