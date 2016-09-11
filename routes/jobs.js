var express     = require('express');
var router      = express.Router();
var passport    = require('passport');


/********** Middleware******/
var categories = require('../services/middleware/mw-categories');
var brands = require('../services/middleware/mw-brands');
var products = require('../services/middleware/mw-products');
var newsletter = require('../services/middleware/mw-newsletter');
var session = require('../services/middleware/mw-session');
var feed = require('../services/middleware/mw-feed');
var email = require('../services/middleware/mw-email');
var user = require('../services/middleware/mw-users');
var job = require('../services/middleware/mw-jobs');

var shared = require('../public/javascripts/helper');

/**************************************************************
*******************BEGINING ROUTES***************************
***************************************************************/
var routes = [
/****************JOBS****************/
    [ '/', 'get', [
        job.getAll,
        function( req, res, next) {
            res.render('careers', {
                title:'Career Portal | Brantu',
                description: 'Job openings in brantu team | marketing, development and technology'
            })
        }]
    ],

    [ '/:name', 'get', [
        job.getJob,
        function( req, res, next) {
            res.render('job',
            {
                title                      : res.locals.job.name + ' - '+ res.locals.job.location +' | Brantu',
                description                : 'Brantu is currently hiring a '+ res.locals.job.name + ', '+res.locals.job.type +' to join the team at our office in '+ res.locals.job.location,
            })
        }]
    ]
];


routes.forEach(function(arr){
  console.log(arr[1]);
   router[arr[1]](arr[0], arr[2]);
});
/**************************************************************
*******************END ROUTES***************************
***************************************************************/
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;
