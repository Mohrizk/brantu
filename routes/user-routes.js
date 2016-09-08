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

    [ '/signup-popup', 'post', [
        function(req, res, next) {
            req.session.signupPopup = true;
            req.session.save()
            res.status(200);
            res.end()
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
    /*********Favourite Products******************************************/
    [ '/favourite-products', 'get', [
        
        products.getFavouriteProducts,
        categories.getCategoryTree,
        categories.getDepartment,
        function(req, res, next) {
        res.render('favourite-products');
    } ]
    ],
/****************JOBS****************/
    [ '/jobs', 'get', [
        job.getAll,
        function( req, res, next) {
            res.render('careers', {
                title:'Career Portal | Brantu',
                description: 'Job openings in brantu team | marketing, development and technology'
            })
        }]
    ],

    [ '/jobs/:name', 'get', [
        job.getJob,
        function( req, res, next) {
            res.render('job',
            {
                title                      : res.locals.job.name + ' - '+ res.locals.job.location +' | Brantu',
                description                : 'Brantu is currently hiring a '+ res.locals.job.name + ', '+res.locals.job.type +' to join the team at our office in '+ res.locals.job.location,
            })
        }]
    ],


/*********SHOP***************************/
    [ '/blog/', 'get', [
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
    [ '/blog/:name', 'get', [
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
    ],
/********SEARCH************/
    [
        ['/search', '/s%C3%B6k', '/s%C3%B6k/:department', '/search/:department']
        , 'get',
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


    [ '/newsletter', 'get', [
        newsletter.sendWeeklyTrial,
        function(req, res, next) {
            res.render('newsletter',{layout: false})
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
    ],

/********* Saving Session ********/
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
    [ '/add-viewed-product-session', 'post', [
        session.addViewedProduct,
        function( req, res, next) {
        res.send('cool')
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