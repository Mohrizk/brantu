const Promise = global.Promise || require('promise');
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

const mongoose = require('mongoose');//FOR Database
var cacheOpts = {
    max:50,
    maxAge:1000*60*2
};
require('mongoose-cache').install(mongoose, cacheOpts)
const paginate = require('express-paginate');//Pagination

const User     = require('./services/models/user');
const passport = require('passport');
const ConnectRoles = require('connect-roles');

const i18n = require('i18n-2');//Internationalization
//FOR ROUTES
const userRoutes = require('./services/user-routes');
const apiRoutes = require('./services/api-routes');
const adminRoutes = require('./services/admin-routes');

const express = require('express');
const app = express();//INITIATE A

//CONNECT DB
if (app.get('env') === 'development') mongoose.connect(require('./config/database.js').remote);
else mongoose.connect(require('./config/database.js').remote);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
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
    locales: ['en', 'sv'],
    defaultLocale: 'sv',
    // change the cookie name from 'lang' to 'locale'
    cookieName: 'brantuLang'
});
app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
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
    if(typeof req.session.favProducts !== "undefined"){ res.locals.nbFavProducts = req.session.favProducts.length;}
        res.locals.url= req.url;
    res.locals.user = req.user;
    if(req.user){
        User
            .findOne({ _id: req.user._id })
            .populate('brands')
            .exec(function (err, user) {
                if (err) return handleError(err);
                if(user== null) return next();
                res.locals.user.brands = user.brands;
            });
    }

    next();
});
app.use(adminRoutes);
app.use(apiRoutes);
app.use(userRoutes);





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
