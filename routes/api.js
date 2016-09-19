var express     = require('express');
var router      = express.Router();
var passport    = require('passport');
var async       = require('async');


/********** Middleware******/
var categories = require('../services/middleware/mw-categories');
var brands = require('../services/middleware/mw-brands');
var products = require('../services/middleware/mw-products');
var newsletter = require('../services/middleware/mw-newsletter');
var session = require('../services/middleware/mw-session');
var user = require('../services/middleware/mw-users');
var feed = require('../services/middleware/mw-feed');

/**************************************************************
 *******************BEGINING ROUTES***************************
 ***************************************************************/
var routes = [
    [ '/getProductByID/:id', 'get', [
        products.getProductByID,
        products.checkProductIsFavoured,
        function( req, res, next) {
            console.log(req.product)
            res.send({product:req.product});
        }]],
    [ '/getSimilarProducts/:id', 'get', [
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
        }]],
    [ '/getFeed/:page', 'get', [
        categories.getDepartment,
        feed.getFeed,
        function( req, res, next) {
            res.send(res.locals.feed);
        }]],

    [ '/home', 'get', [
        function(req, res, next) {
            hbs.render('views/partials/home.hbs', {
                    precompiled: true
                })
                .then(function (template) {
                    res.send(template);
                    res.end();
                })
        } ]],
    [ '/nav/:department', 'get', [
        categories.getDepartment,
        categories.getCategoryTree,
        function(req, res, next) {
            hbs.render('views/partials/nav/nav.hbs',
                {selectedDepartment: res.locals.selectedDepartment,
                 categoryTree:   res.locals.categoryTree},
                {precompiled: true})
                .then(function (template) {

                    res.send(template);
                    res.end();
                })
        } ]],
    [ '/:department', 'get', [
        categories.getDepartment,
        products.getCompare,
        feed.getFeed,
        function(req, res, next) {
            console.log('PARAMS ',req.params , res.locals.selectedDepartment);
            hbs.render('views/partials/department.hbs',
                {
                    selectedDepartment: res.locals.selectedDepartment,
                    compareClothes: res.locals.compareClothes,
                    feed: res.locals.feed
                },
                {
                    precompiled: true
                })
                .then(function (template) {
                    res.send(template);
                    res.end();
                })
        } ]],
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
