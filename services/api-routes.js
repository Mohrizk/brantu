var express     = require('express');
var router      = express.Router();
var passport    = require('passport');


/********** Middleware******/
var categories = require('./middleware/mw-categories');
var brands = require('./middleware/mw-brands');
var products = require('./middleware/mw-products');
var newsletter = require('./middleware/mw-newsletter');
var session = require('./middleware/mw-session');
var user = require('./middleware/mw-users');
var feed = require('./middleware/mw-feed');

/**************************************************************
 *******************BEGINING ROUTES***************************
 ***************************************************************/
var routes = [
    [ '/api/getProductByID/:id', 'get', [
        products.getProductByID,
        products.checkProductIsFavoured,
        function( req, res, next) {
            console.log('FÅÅÅÅÅÅÅÅÅÅ')
            console.log(req.product)
            res.send({product:req.product});
        }]
    ],
    [ '/api/getSimilarProducts/:id', 'get', [
        products.getProductByID,
        products.getSimilarProductsFromSameBrand,
        products.GetLowerPriceCategoryProducts,
        products.GetSimilarCategoryProducts,
        function( req, res, next) {
            res.send({
                    sameBrandProducts           :req.sameBrandProducts,
                    LowerPriceCategoryProducts  :req.LowerPriceCategoryProducts ,
                    sameCategoryProducts        : req.sameCategoryProducts,
                    style                       : req.style,
                    category                    : req.category,
                    brand                       : req.brand,
                    _id                       : req._id
                });
        }]
    ],
    [ '/api/getFeed/:page', 'get', [
        categories.getDepartment,
        feed.getFeed,
        function( req, res, next) {
            res.send(res.locals.feed);
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
