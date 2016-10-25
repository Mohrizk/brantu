const Promise = global.Promise || require('promise');
var robots = require('robots.txt');
const compression = require('compression');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const async = require("async");
const exphbs = require('express-handlebars');//HTML TEMPLATING
const S = require('string'); S.extendPrototype();
shortid = require('shortid');
const mongoose = require('mongoose');//FOR Database
mongoose.Promise = require('bluebird');
require('mongoose-cache').install(mongoose, {
    max:50,
    maxAge:1000*60*2
});
const paginate = require('express-paginate');//Pagination

const User     = require('./services/models/user');
const passport = require('passport');
const ConnectRoles = require('connect-roles');

const i18n = require('i18n-2');//Internationalization
const express = require('express');
const app = express();
app.use(compression());


//CONNECT DB
if (app.get('env') === 'development') mongoose.connect(require('./config/database.js').local);
else mongoose.connect(require('./config/database.js').remote);

app.use(robots(__dirname + '/robots.txt'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*******************BEGINING Session**********************/
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore(
        { mongooseConnection: mongoose.connection ,
        ttl: 14 * 24 * 60 * 60 // = 14 days
             })
}));
/************* Internationalization Config*******/

i18n.expressBind(app, {
    // setup some locales - other locales default to en silently
    locales: ['sv'],
    defaultLocale: 'sv',
    // change the cookie name from 'lang' to 'locale'
    cookieName: 'brantuLang'
});
app.use(function(req, res, next) {
    res.locals.LANG = req.i18n.getLocale();
    //req.i18n.setLocaleFromCookie();

    next();
});
/********view engine setup****/
// Register `hbs` as our view engine using its bound `engine()` function.
// Set html in app.engine and app.set so express knows what extension to look for.
hbs = exphbs.create({
        defaultLayout: 'single',
        extname: '.hbs',
        i18n: i18n,
        helpers: require("./public/javascripts/hb-helper.js").helpers,
        partialsDir: [
            'views/partials/',
            'views/partials/nav/',
            'views/partials/information/',
            'views/partials/jobs/',
            'views/partials/settings/',
            'views/partials/product/',
            'views/partials/blog/',
            'views/partials/home/',
            'views/shared-templates/'
        ]
    })
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
// Middleware to expose the app's shared templates to the cliet-side of the app§ for pages which need them.
app.use(function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.getTemplates('views/shared-templates/', {
            //cache      : app.enabled('view cache'),
            precompiled: false
        })
        .then(function (templates) {
            // RegExp to remove the ".handlebars" extension from the template names.
            var extRegex = new RegExp(hbs.extname + '$');
            // Creates an array of templates which are exposed via
            // `res.locals.templates`.
            templates = Object.keys(templates).map(function (name) {
                return {
                    name    : name.replace(extRegex, ''),
                    template: templates[name]
                };
            });

            // Exposes the templates during view rendering.
            //console.log('template Length', templates)
            if (templates.length) {
                res.locals.templates = templates;
            }
            setImmediate(next);
        })
        .catch(next);
})
app.set('views', path.join(__dirname, 'views'));

/**************************************************************
*******************BEGINING AUTHENTICATION**********************
***************************************************************/
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

/************* ROUTES *******/
app.set('json spaces', 2);//ONLY DEVELOPMENT

var sessionMW = require('./services/middleware/mw-session');
app.use(
    sessionMW.cookieConcession,
    sessionMW.signupPopup,
    function(req, res, next){
    if(req.user){
        res.locals.nbFavProducts = req.user.products.length;
        res.locals.user = req.user;
    }
    res.locals.url= req.url;
    next();
});

/***
 * ROUTES
 * ****/

app.use('/jobs'  ,require('./routes/jobs'));
app.use('/blog'  , require('./routes/blog'));
app.use(require('./routes/sitemap'));
app.use(require('./routes/admin'));
app.use(require('./routes/user'));
app.use('/api'   ,require('./routes/api'));
app.use(require('./routes/index'));


//SCHEDULE NEWSLETTER
//require('./services/middleware/mw-newsletter').sendWeekly(function(){});



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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


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
