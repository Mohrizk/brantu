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
/*********SHOP***************************/
    [ '/', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        feed.getFeed,
        function(req, res, next) {
            res.render('blog', {
                title                      : 'snyggaste '+req.outfit.categoryName+' - ' +req.outfit.name+' | Brantu',
                description                : req.outfit.description+' - ' +req.outfit.name,
                outfit                     : req.outfit,
                blogProductsLink             : req.blogProductsLink,
            })
        } ]
    ],
    [ '/:name', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        feed.getOutfit,
        products.getForBlog,
        products.getAlgoliaProducts,
        function(req, res, next) {
            res.render('blog', {
                title                      : 'snyggaste '+req.outfit.categoryName+' - ' +req.outfit.name+' | Brantu',
                description                : req.outfit.description+' - ' +req.outfit.name,
                outfit                     : req.outfit,
                blogProductsLink             : req.blogProductsLink,
            })
        } ]
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
