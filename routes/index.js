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
var shared = require('../public/javascripts/helper');

/**************************************************************
*******************BEGINING ROUTES***************************
***************************************************************/

var routes = [
    [ '/', 'get', [
        categories.getCategoryTree,
        function(req, res, next) {
            /* if(typeof req.session.favDepartment !== 'undefined'){
            res.redirect(req.session.favDepartment);
        }
        else{*/
            res.render('general', {
                title :  req.i18n.__("home title"),
                description : req.i18n.__("home description"),
                generalPartial: function() {
                    return "n_home";
                }
            });
    } ]],
    [ '/signup-popup', 'post', [
        function(req, res, next) {
            req.session.signupPopup = true;
            req.session.save()
            res.send('tutorial pop up');
            res.end()
        }]],
    /********SEARCH************/
    [['/search', '/s%C3%B6k', '/s%C3%B6k/:department', '/search/:department'],
        'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        products.getForSearch,
        products.getAlgoliaProducts,
        function(req, res, next) {
            res.render('general', {
                generalPartial: function() {
                    return "productNavigation_Back";
                }
            });
        }
        ]],

/*********View Product***************************/
    [ '/b%C3%A4sta-pris-f%C3%B6r/:name', 'get',[
        categories.getCategoryTree,
        products.getProductIDfromName,
        products.getProductByID,
        products.checkProductIsFavoured,
        brands.checkBrandIsFavoured,
        function(req, res, next) {
            res.render('product', {
                title                   : 'Lägsta priset för '+req.product.name + ' - altid bästa pris inom mode med Brantu',
                description             : req.product.description+ ' hitta det på lägsta priset i Brantu',
                product                     : req.product,
                style                       : req.style,
                category                    : req.category,
                brand                       : req.brand
            })
        } ]],

/*********BRAND****************/
    [ ['/brand/:name', '/m%C3%A4rken/:name', '/:department/m%C3%A4rken/:name',  '/:department/brand/:name'], 'get', [
        categories.getDepartment,
        categories.getCategoryTree,
        products.getForBrands,
        products.getAlgoliaProducts,
        function(req, res, next) {
            res.render('general', {
                generalPartial: function() {
                    return "productNavigation_Back";
                }
            });
        } ]],

/*********INFORMATION & CONTACT PAGES *************************************/
    [ '/contact-us', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Kontakt oss - Brantu";
            res.render('information', {
                generalPartial: function() {
                    return "contact-us";
                }
            });
        }]],
    [ '/about-us', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Om oss - Brantu";
            res.render('information', {
                generalPartial: function() {
                    return "about-us";
                }
            });
        }]],
    [ '/how-it-works', 'get', [
        categories.getDepartment,
        categories.getCategoryTree,
        function(req, res, next) {
            res.locals.title = "Om oss - Brantu";
            res.render('features', {
                generalPartial: function() {
                    return "how-it-works";
                }
            });
        }]],
    [ '/faq', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "FAQ - Brantu";
            res.render('information', {
                generalPartial: function() {
                    return "faq";
                }
            });
        }]],
    [ '/privacy-policy', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Privacy policy - Brantu";
            res.render('information', {
                generalPartial: function() {
                    return "privacy-policy";
                }
            });
        }
    ]],
    [ '/terms-and-conditions', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Terms and conditions - Brantu";
            res.render('information', {
                generalPartial: function() {
                    return "terms-and-conditions";
                }
            });
        }
    ]],
    [ '/cookie-policy', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Cookie Policy - Brantu";
            res.render('information', {
                generalPartial: function() {
                    return "cookie-policy";
                }
            });
        }]],

    [ '/join-shop', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.locals.title = "Join our tribe";
            res.render('general', {
                generalPartial: function() {
                    return "join-shop";
                }
            });
    }]],
    [ '/cookie-policy', 'post', [
        function(req, res, next) {
            req.session.cookieConcession = true;
            req.session.save()
            console.log('COOKIE POLICY',req.session.cookieConcession)
            res.status(200);
            res.end();
        }]],
/*********MAIN PAGE******************************************/
    [ ["/shop/:shop/:department"], 'get', [
        function(req,res,next){
            if(HELPER.helper.checkShop(res.locals.LANG, req.params.shop)&&
               HELPER.helper.checkGender(res.locals.LANG, req.params.department)
            ){
                next();
            }
            else res.redirect(res.locals.COUNTRY+'/'+res.locals.LANG+'/error');
        },
        session.addFavouriteDepartment,
        categories.getDepartment,
        categories.getCategoryTree,
        //products.getCompare,
        //feed.getFeed,
        feed.getShopCategoryPages,
        function(req, res, next) {
            //var department = shared.helper.encodeDepartment(res.locals.selectedDepartment);
            res.render('general', {

                title :  res.locals.selectedDepartment + " | Jämför och hitta det bästa priset inom mode | Brantu",
                description :
                'Brantu är Sveriges bästa prisjämförelsajt inom mode! ' +
                'Med oss hittar du både relaterade produkter och stilar till det bästa priset. ' +
                'Använd brantu när du ska köpa dina kläder eller skor online...',
                page: req.page,
                generalPartial: function() {
                    return "n_department";
                }
            });
        } ]],
    [ ['/:department','/:department/:category','/:department/:category/:style'], 'get', [
        categories.getDepartment,
        categories.getCategoryTree,
        products.getForCategories,
        products.getAlgoliaProducts,
        function(req, res, next) {
            res.render('general', {
                generalPartial: function() {
                    return "productNavigation_Back";
                }
            });
        } ]],
    [ ["/error"], 'get', [
        function(req,res,next){
            var err = new Error('Not Found');
            err.status = 404;
            res.render('error', {
                message: err.message,
                error: err
            });
        }]],
/*********Internationalization *******************/
    [ '/en', 'get', [ function(req, res, next) {
        res.cookie('brantuLang', 'en');
        res.redirect('/');
    }]],
    [ '/sv', 'get', [ function(req, res, next) {
        res.cookie('brantuLang', 'sv');
        res.redirect('/');
    }]]
];

routes.forEach(function(arr){
   //console.log(arr[1]);
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
