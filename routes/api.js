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
    [ '/blog/:name', 'get', [
        feed.getOutfit,
        products.getForBlog,
        products.getAlgoliaProducts,
        function(req, res, next) {
            hbs.render('views/partials/blog/Outfit.hbs', {
                outfit                       : req.outfit,
                blogProductsLink             : req.blogProductsLink,
                user:req.user
            },
                {precompiled: true})
                .then(function (template) {
                    hbs.render('views/partials/product/productNavigation_Back.hbs', {
                            blogProductsLink             : req.blogProductsLink,
                            price                        : res.locals.price,
                            welcome                      : res.locals.welcome,
                            sale                         : res.locals.sale,
                            compare                      : res.locals.compare,
                            discounts                    : res.locals.discounts,
                            sizes                        : res.locals.sizes,
                            style                        : res.locals.style,
                            fit                          : res.locals.fit,
                            material                     : res.locals.material,
                            shops                        : res.locals.shops,
                            paginate                     : res.locals.paginate,
                            category                     : res.locals.category,
                            products                     : res.locals.products,
                            colors                       : res.locals.colors,
                            tags                         : res.locals.tags,
                            brands                       : res.locals.brands
                        },
                        {precompiled: true})
                        .then(function (template2) {
                            res.send(template + '<div>'+template2+'</div>');
                            res.end();
                        })
                });
        } ]],

    [ '/favourite-products', 'get', [
        user.getFavouriteProducts,
        function(req, res, next) {
            console.log(res.locals.productsList);
            hbs.render('views/partials/product/favourite-products.hbs',
                {
                    productsList: res.locals.productsList,
                    nbFavProducts: res.locals.nbFavProducts,
                    user:req.user,
                },
                {
                    precompiled: true
                })
                .then(function (template) {
                    res.send(template);
                    res.end();
                })
        } ]],

    [ '/getProductByID/:id', 'get', [
        products.getProductByID,
        products.checkProductIsFavoured,
        brands.checkBrandIsFavoured,
        function( req, res, next) {
            console.log(req.product.brand.isFavored)
            res.send({product:req.product, user:req.user});
        }]],

    [ '/getSimilarProducts/:id', 'get', [
        products.getProductByID,
        //products.getSimilarProductsFromSameBrand,
        //products.GetLowerPriceCategoryProducts,
        //products.GetSimilarCategoryProducts,
        function( req, res, next) {
            res.send({
                    user:req.user,
                    sameBrandProducts           :req.sameBrandProducts,
                    sameBrandProductsInsight    :req.sameBrandProductsInsight,
                    LowerPriceCategoryProducts   :req.LowerPriceCategoryProducts ,
                    sameCategoryProductsInsight  :req.sameCategoryProductsInsight ,
                    sameCategoryProducts         : req.sameCategoryProducts,
                    style                       : req.style,
                    category                    : req.category,
                    brand                       : req.brand,
                    _id                         : req._id
                });
        }]],

    [ '/getFeed/:department/:page', 'get', [
        categories.getDepartment,
        feed.getFeed,
        function( req, res, next) {
            res.send(res.locals.feed);
        }]],

    [ '/home', 'get', [
        function(req, res, next) {
            hbs.render('views/partials/home/n_home.hbs', {
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
                {
                    user:req.user,
                    selectedDepartment: res.locals.selectedDepartment,
                    categoryTree:   res.locals.categoryTree,
                    nbFavProducts: res.locals.nbFavProducts,
                    user: res.locals.user
                },
                {precompiled: true})
                .then(function(nav){
                    res.send({nav: nav});
                    res.end();
                });

        } ]],

    [ '/:department', 'get', [
        categories.getDepartment,
        //products.getCompare,
        feed.getFeed,
        function(req, res, next) {
            hbs.render('views/partials/home/n_department.hbs',
                {
                    user:req.user,
                    selectedDepartment: res.locals.selectedDepartment,
                    //compareClothes: res.locals.compareClothes,
                    feed: res.locals.feed
                },
                {
                    precompiled: true
                })
                .then(function (template) {
                    res.send(template);
                    res.end();
                })
        } ]]
];

routes.forEach(function(arr){
   // console.log(arr[1]);
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
