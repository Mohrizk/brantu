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
    [ '/signup-popup', 'post', [
        function(req, res, next) {
            req.session.signupPopup = true;
            req.session.save()
            res.send('fuck');
            res.end()
        }]
    ],
    /********SEARCH************/
    [
        ['/search', '/s%C3%B6k', '/s%C3%B6k/:department', '/search/:department']
        ,'get',
        [
        categories.getCategoryTree,
        categories.getDepartment,
        products.getForSearch,
        products.getAlgoliaProducts,
        function(req, res, next) {
            res.render('navigation')
        } ]
    ],

    /*********MAIN PAGE******************************************/
    [ '/', 'get', [function(req, res, next) {
        if(typeof req.session.favDepartment !== 'undefined'){
            res.redirect(req.session.favDepartment);
        }
        else res.redirect('/kvinna/');
    } ]
    ],


/*********View Product***************************/

    [ '/b%C3%A4sta-pris-f%C3%B6r/:name', 'get',[
        categories.getCategoryTree,
        categories.getDepartment,
        products.getProductIDfromName,
        products.getProductByID,
        products.checkProductIsFavoured,
        //products.getSimilarProductsFromSameBrand,
        //products.GetLowerPriceCategoryProducts,
        //products.GetSimilarCategoryProducts,
        function(req, res, next) {
            res.render('product', {
                title                   : 'Lägsta priset för '+req.product.name + ' - altid bästa pris inom mode med Brantu',
                description             : req.product.description+ ' hitta det på lägsta priset i Brantu',
                product                     : req.product,
                //sameBrandProducts           : req.sameBrandProducts,
                //LowerPriceCategoryProducts  : req.LowerPriceCategoryProducts ,
                //sameCategoryProducts        : req.sameCategoryProducts,
                style                       : req.style,
                category                    : req.category,
                brand                       : req.brand
            })
        } ]],
 /*********BRAND****************/

    [ ['/brand/:name', '/m%C3%A4rken/:name', '/:department/m%C3%A4rken/:name',  '/:department/brand/:name'], 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        products.getForBrands,
        products.getAlgoliaProducts,
        function(req, res, next) {
            res.render('navigation')
        } ]
    ],

/********************NAVIGATE******************/

    [ ['/:department/:category','/:department/:category/:style'], 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        products.getForCategories,
        products.getAlgoliaProducts,
        function(req, res, next) {
            res.render('navigation')
        } ]
    ],



/*********INFORMATION & CONTACT PAGES *************************************/
    [ '/contact-us', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Kontakt oss - Brantu";
            res.render('contact-us');
        }]
    ],
    [ '/about-us', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Om oss - Brantu";
            res.render('about-us');
        }]
    ],
    [ '/faq', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "FAQ - Brantu";
            res.render('faq');
        }]
    ],
    [ '/privacy-policy', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Privacy policy - Brantu";
            res.render('privacy')
        }
    ]
    ],
    [ '/terms-and-conditions', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Terms and conditions - Brantu";
            res.render('terms')
        }
    ]
    ],
    [ '/join-shop', 'get', [
        
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.locals.title = "Join our tribe";
        res.render('join-shop');
    }]
    ],

    [ '/cookie-policy', 'get', [
        
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.locals.title = "Cookie Policy - Brantu";
            res.render('cookie');
        }]
    ],
    [ '/cookie-policy', 'post', [
        function(req, res, next) {
            req.session.cookieConcession = true;
            req.session.save()
            console.log('COOKIE POLICY',req.session.cookieConcession)
            res.status(200);
            res.end();
        }]
    ],

    [ ["/kvinna", "/man", '/:department/upptack-nya-favoriter'], 'get', [
        session.addFavouriteDepartment,
        categories.getCategoryTree,
        categories.getDepartment,
        products.getCompare,
        feed.getFeed,
        function(req, res, next) {
            if( res.locals.selectedDepartment == null || typeof res.locals.selectedDepartment == 'undefined')
                return res.redirect('/kvinna');
            var department = shared.helper.mapDepartment(res.locals.selectedDepartment);
            res.locals.title =  "Brantu | "+"Jämför och hitta det bästa priset inom mode |" + res.locals.selectedDepartment;
            res.locals.description = 'Brantu är Sveriges bästa prisjämförelsajt inom mode! Med oss hittar du både relaterade produkter och stilar till det bästa priset. Använd brantu när du ska köpa dina kläder eller skor online...';
            res.render('landing');

        } ]
    ],
/*********Internationalization *******************/
    [ '/en', 'get', [ function(req, res, next) {
        res.cookie('brantuLang', 'en');
        res.redirect('/');
    }]
    ],
    [ '/sv', 'get', [ function(req, res, next) {
        res.cookie('brantuLang', 'sv');
        res.redirect('/');
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
