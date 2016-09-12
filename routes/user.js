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
/*********REGISTER***************************/
    // Sign up Passport
    ['/signupUser','post',[function(req, res, next) {
        req.body.role = 'user'
        passport.authenticate('local-signup',function(err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                var string = encodeURIComponent(info.message);
                return res.redirect('/signup?response=' + string);
            }
            req.logIn(user, function(err) {
                console.log('USER LOGGED IN', user)
                email.sendSignupConfirmation(user.local.email,function(){
                    res.redirect('/');
                })
            })
        })(req, res, next)
    }]
    ],
    //signUp page
    [ '/signup', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            var passedVariable = req.query.response;
            res.render('register', { errorMessage: passedVariable});
        }]
    ],



/*********LOGIN***************************/
    //LOCAL
    [ '/loginUser', 'post', [ function(req, res, next) {
        passport.authenticate('local-login',function(err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                var string = encodeURIComponent(info.message);
                return res.redirect('/login?response=' + string);
            }
            req.logIn(user, function(err) { res.redirect('/');})
        })(req, res, next)
    }]
    ],
    // LOGIN PAGE
    [ '/login', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            var passedVariable = req.query.response;
            res.locals.title = "Login to Brantu";
            res.render('login', { errorMessage: passedVariable});
        }]
    ],
    // LOGIN PAGE
    [ '/forget', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            var forgetError = req.query.forgetError;
            var valid = req.query.valid;
            res.locals.title = "Login - forgot password";
            if(valid == 'true') res.locals.valid =true
            res.render('forgot', {forgetMessage: forgetError});
        }]
    ],
    [ '/forget', 'post', [
        user.forgotPassword,
        function(req, res, next) {
            res.locals.title = "Login to Brantu";
            return res.redirect('/forget?valid='+req.valid+'&forgetError='+req.forgetError);
        }]
    ],
    [ '/reset/:token', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        user.findUserToken,
        function(req, res, next) {
            res.render('reset', {
                user: req.user
            });
        }]
    ],
    [ '/reset/:token', 'post', [
        user.findUserToken,
        user.resetPassword,
        function(req, res, next) {
            res.redirect('/');
        }]
    ],
    //FACEBOOK
    [ '/auth/facebook', 'get', [
        passport.authenticate('facebook',{ scope : 'email' })
    ]
    ],

    [ '/auth/facebook/callback', 'get', [ function(req, res, next) {
        passport.authenticate('facebook',function(err, user, info) {
            if (err) { return next(err) }
            if (!user) { return res.send(info.message) }
            req.logIn(user, function(err) { res.redirect('/');})
        })(req, res, next);
    }
    ]
    ],

/*********LOGOUT***************************/
    [ '/logout', 'get', [ function(req, res, next) {
        req.logout();
        res.redirect('/');
    } ]
    ],
    /*********Settings***************************/
    //SETTINGS: START
    ['/settings', 'get', [
        
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.redirect('/settings/brands');
    } ]
    ],
    //SETTINGS: BRANDS
    ['/settings/brands', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        brands.getUserBrands,
        function(req, res, next) {
        if (req.user) {
            res.locals.userBrands = req.userBrands;
            res.render('settings', {
                    settingsPartial: function() {
                        return "settings-brands";
                    }
                });
        } else res.redirect('/login')
    } ]
    ],

    //ADD USER BRANDS
    ['/settings/addBrands','post',[brands.addUserBrands, function(req, res, next) {
        res.contentType('application/json');
        var data = JSON.stringify('/settings/brands')
        res.header('Content-Length', data.length);
        res.end(data);
      }]
    ],
    //REMOVE USER BRANDS
    ['/settings/removeBrands','post',[brands.removeUserBrands, function(req, res, next) {
        res.contentType('application/json');
        var data = JSON.stringify('/settings/brands')
        res.header('Content-Length', data.length);
        res.end(data);
    }]
    ],
    //SETTINGS: SIZES   FUTURE
    [ '/settings/sizes', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        if (req.user) {
            // logged in
            res.render('settings', {
                    settingsPartial: function() {
                        return "settings-sizes";
                    }
                }
            );
        }
            else res.redirect('/login')
    } ]
    ],
    //SETTINGS:NOTIFICATION   FUTURE
    [ '/settings/notifications', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        if (req.user) {
            // logged in
            res.render('settings', {
                    settingsPartial: function() {
                        return "settings-notifications";
                    }
                });
        } else res.redirect('/login')
    } ]
    ],
    //SETTINGS:ACCOUNT
    [ '/settings/account/:status', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        console.log('The param request is ', req.param('status'));
        if (req.user) {
            res.render('settings', {
                    settingsPartial: function() {
                        return "settings-account";
                    }, accountStatus: req.params.status
                });
        }
        else res.redirect('/login')
    } ]
    ],
    [ '/settings/change/name', 'get', [
        user.changeName,
        function(req, res, next) {
            res.redirect('/settings/account/name-changed')
        }]
    ],
    [ '/settings/change/password', 'get', [
        user.changePassword,
        function(req, res, next) {
            res.redirect('/settings/account/'+res.locals.PassMatch)}
    ]
    ],
    /*********Newsletter******************************************/
    [ '/newsletter-signup', 'get', [function(req, res, next) {
        newsletter.add(req.query.email,function(err, emailSaved) {
            if (err) res.send(err);
            else
                res.send(emailSaved);
        })
    } ]
    ],
    /********* Saving Session ********/
    [ '/favourite-products', 'get', [

        products.getFavouriteProducts,
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
            res.render('favourite-products');
        } ]
    ],
    [ '/favourite-product/add', 'post', [
        session.addFavouriteProduct,
        function( req, res, next) {
            res.send(req.session.favProducts.length+'');
        }
    ]
    ],
    [ '/favourite-product/remove', 'post', [
        session.removeFavouriteProduct,
        function( req, res, next) {
            res.send(req.session.favProducts.length+'');
        }
    ]
    ],
    /*********Favourite Products******************************************/
    [ '/newsletter', 'get', [
        newsletter.sendWeeklyTrial,
        function(req, res, next) {
            res.render('newsletter',{layout: false})
        }]
    ],

    [ '/add-viewed-product-session', 'post', [
        session.addViewedProduct,
        function( req, res, next) {
        res.send('cool')
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