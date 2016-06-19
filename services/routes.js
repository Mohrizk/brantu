var express     = require('express');
var router      = express.Router();
var passport    = require('passport');


/********** Middleware******/
var categories = require('./middleware/mw-categories');
var brands = require('./middleware/mw-brands');
var userBrands = require('./middleware/mw-userBrands');
var newsletter = require('./middleware/mw-newsletter');
var session = require('./middleware/mw-session');
var email = require('./middleware/mw-email');


/**************************************************************
*******************BEGINING ROUTES***************************
***************************************************************/
var routes = [
  /*********REGISTER***************************/
    // Sign up Passport
      ['/signupUser','post',[function(req, res, next) {
        passport.authenticate('local-signup',function(err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                var string = encodeURIComponent(info.message);
                return res.redirect('/sigup?response=' + string);
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
    /*********Privacy***************************/
    [ '/privacy', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.render('privacy')
    }
    ]
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
        userBrands.getUserBrands,
        function(req, res, next) {
        if (req.user) {
            res.locals.userBrands = req.userBrands;
            res.render('settings', {
                    settingsPartial: function() {
                        return "settings-brands";
                    }
                }
            );
        }
    } ]
    ],

    //ADD USER BRANDS
    ['/settings/addBrands','post',[userBrands.addUserBrands, function(req, res, next) {
        res.contentType('application/json');
        var data = JSON.stringify('/settings/brands')
        res.header('Content-Length', data.length);
        res.end(data);
      }]
    ],
    //REMOVE USER BRANDS
    ['/settings/removeBrands','post',[userBrands.removeUserBrands, function(req, res, next) {
        res.contentType('application/json');
        var data = JSON.stringify('/settings/brands')
        res.header('Content-Length', data.length);
        res.end(data);
    }]
    ],
    //SETTINGS: SIZES
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
    } ]
    ],
    //SETTINGS:NOTIFICATION
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
                }
            );
        } else {
            // not logged in
        }
    } ]
    ],

    [ '/settings/account', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        if (req.user) {
            res.render('settings', {
                    settingsPartial: function() {
                        return "settings-account";
                    }
                }
            );
            // logged in
        }

    } ]
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
    /*********MAIN PAGE******************************************/
    [ '/', 'get', [function(req, res, next) {
        if(typeof req.session.favDepartment !== 'undefined'){
            res.redirect(req.session.favDepartment);
        }
        else res.redirect('/kvinna');
    } ]
    ],
    [ '/kvinna', 'get', [session.addFavouriteDepartment,function(req, res, next) {
        res.redirect('/kvinna/upptack-nya-favoriter');
    } ]
    ],

    [ '/kvinna/upptack-nya-favoriter', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        console.log(req.i18n.getLocale());
        res.locals.title = res.locals.selectedDepartment.name+ "/ Get Inspired";
        res.render('women');
    } ]
    ],
    [ '/man', 'get', [session.addFavouriteDepartment,function(req, res, next) {
        res.redirect('/man/upptack-nya-favoriter');
    } ]
    ],

    [ '/man/upptack-nya-favoriter', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.locals.title =  res.locals.selectedDepartment.name +"/ Get Inspired";
        res.render('men');
    } ]
    ],

  /*********SHOP***************************/
    [ '/explore/*', 'get', [
        categories.getCategoryTree,
        categories.getBreadcrumbAndChildren,
        function(req, res, next) {
        res.render('category')
      } ]
    ],

    [ '/brand/*', 'get', [
        categories.getCategoryTree,
        brands.getBrandInfo,
        function(req, res, next) {
        if(res.locals.brand != null)
            res.render('brand')
        else
            res.redirect('/error')
    } ]
    ],

    [ '/your-shop', 'get', [
        categories.getCategoryTree,
        categories.getDepartment ,
        function(req, res, next) {
        res.locals.title = "Bringing Brands to You";
        res.render('shop')
    } ]
    ],

/*********ABOUT - CHARITY/SHOP *************************************/
    [ '/join-charity', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
      res.locals.title = "Join our tribe";
      res.render('join-charity');
        }]
    ],
    [ '/join-shop', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.locals.title = "Join our tribe";
        res.render('join-shop');
    }]
    ],

    [ '/cashback-to-society', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.locals.title = "Join our tribe";
        res.render('cashback-to-society');
        }]
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
    ],
/*********Error ***************************************************/
    [ '/error', 'get', [
        categories.getCategoryTree,
        categories.getDepartment,
        function( req, res, next) {
            res.status( 500);
            res.render('error')
        }
        ]
    ],
/********* Saving Session ********/
    [ '/add-favourite-product-session', 'post', [
        session.addFavouriteProduct,
        function( req, res, next) {
         res.send(req.session.favProducts.length+'');
        }
     ]
    ],
    [ '/add-viewed-product-session', 'post', [
        session.addViewedProduct,
        function( req, res, next) {
        res.send('cool')
    }
    ]
    ],
/********* Email ********/
    [ '/email/sendConfirmation', 'get', [ function( req, res, next) {
        email.sendSignupConfirmation('rizk@brantu.com',function(){
            res.send('cool')
        })
    }
    ]
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
