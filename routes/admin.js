var express     = require('express');
var router      = express.Router();
var passport    = require('passport');


/********** Middleware******/
var categories = require('../services/middleware/mw-categories');
var brands = require('../services/middleware/mw-brands');
var products = require('../services/middleware/mw-products');
var newsletter = require('../services/middleware/mw-newsletter');
var feed = require('../services/middleware/mw-feed');
var session = require('../services/middleware/mw-session');
var email = require('../services/middleware/mw-email');
var socialMedia = require('../services/middleware/mw-socialmedia');
var user = require('../services/middleware/mw-users');

/**************************************************************
 *******************BEGINING ROUTES***************************
 ***************************************************************/
var routes = [
/********* Email ********/
    [ '/email/sendConfirmation', 'get', [ function( req, res, next) {
        email.sendSignupConfirmation('rizk@brantu.com',function(){
            res.send('cool')
        })
    }]
    ],
    [ '/fb/get-page-token', 'get', [
        socialMedia.facebook.getAccessToken,
        //socialMedia.fbPost,
        function( req, res, next) {
            // do something with req.use
        }]
    ],
    [ '/fb/publish/post', 'get', [
        socialMedia.facebook.publishPost,
        function( req, res, next) {
                    // do something with req.use
    }]
    ],
    [ '/fb/delete/post/:id', 'get', [
        socialMedia.facebook.deletePost,
        function( req, res, next) {
            // do something with req.use
        }]
    ],
    /*[ '/fb/publish/image', 'get', [
        feed.getFeed,
        feed.renderPriceCard,
        socialMedia.facebook.publishImage,
        function( req, res, next) {
            // do something with req.use
        }]
    ],*/
    [ '/fb/delete/image/:id', 'get', [
        function( req, res, next) {
            // do something with req.use
        }]
    ],

/********* Create Outfit ********/
    [ '/admin/create-price-card', 'get', [ function( req, res, next) {
        res.render('feedForm',{valid:req.query.valid, message:req.query.message});
    }]
    ],
    [ '/admin/create-price-card', 'post', [
        feed.createPriceCard,
        feed.renderPriceCard,
        socialMedia.facebook.publishPriceCard,
        function( req, res, next) {
        var response = 'valid='+req.priceCardCreated
        var message = 'message='+req.message
        res.redirect('/admin/create-price-card?'+response+'&'+message)
    }]
    ],

 /********* Newsletter ********/
    [ '/newsletter/confirm-open/:department/:id', 'get', [ function( req, res, next) {
        var department = req.params.department;
        var id = req.params.id;

        var buf = new Buffer([
            0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
            0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
            0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
            0x02, 0x44, 0x01, 0x00, 0x3b]);
        res.writeHead('200', {'Content-Type': 'image/png'});
        res.end(buf,'binary');
    }]
    ],

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
