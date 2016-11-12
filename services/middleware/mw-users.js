/**
 * Created by mohamedrizk on 22/06/16.
 */
var async = require('async');
var User = require('../models/user');
var Product = require('../models/product');
var Shop = require('../models/shop');
var Article = require('../models/article');



 var users = {
    getNewsletterList:function(department, callback){
        if(department == null || typeof department == 'undefined') return callback();
        var gender = require('./mw-categories').mapGender(department);
        User.find({
            //newsletter:true,
            $or: [ { "local.gender": gender } , { "facebook.gender": gender }]
        }).lean().exec(function(err, list){
            console.log('query', list.length)
            if(list.length == 0) return callback();
            var newList = list.filter(function(user){
                if(user.local.email || user.facebook.email) return true;
                else return false;
            }).map(function(user){
                user.email = (user.local.email!==null || typeof user.local.email!== 'undefined'? user.local.email: user.facebook.email)
                return  {email:user.email, id:user._id};
            })
            callback(newList);
        })
    },
    changeName: function (req, res, next) {
        console.log('So current user', req.user._id)
        console.log('SO we are sending',req.body, req.query);
        User.findOne({_id: req.user._id}, function (err, user) {
            if(err) return next(err);
            else {
                if(user !=null){
                    if(typeof user.local.name !=='undefined' && user.local.name !==null)
                        user.local.name = req.query.name;
                    else if (typeof user.facebook.name !=='undefined' && user.facebook.name !==null)
                        user.facebook.name = req.query.name;
                    user.save(function(){
                         next();
                    })
                } else next();
            }

        });
    },
    changePassword: function (req, res, next) {
        console.log('Saving new password', req.query.oldPassword);
        console.log('Saving new password', req.query.newPassword);
        User.findOne({_id: req.user._id}, function (err, user) {
            if(err) next(err);
            else {
                if(user !=null){
                    if(user.validPassword(req.query.oldPassword)){
                        user.local.password = user.generateHash(req.query.newPassword);
                        user.save(function(){
                            res.locals.PassMatch = 'password-changed';
                            next();
                        })
                    }
                    else {
                        console.log('old passowrd dont match')
                        res.locals.PassMatch = 'password-dont-match';
                        next();
                    }
                }
                else {
                    res.locals.PassMatch = 'user-not-signed-in';
                    next();
                }
            }

        });
    },
    forgotPassword:function (req, res, next) {
        console.log( req.query);
        console.log( req.body);
        User.findOne({"local.email" : req.body.email}, function (err, user) {

            if(err) return next(err);
            if (user == null){
                req.valid = false;
                req.forgetError = true;
                return next();
            }
            user.createToken(function(){
                console.log(user.local)
                require('./mw-email').sendTokenLink(
                    user.local.email,
                    'http://'+req.headers.host+'/reset/'+user.resetPasswordToken,
                    function(){
                        req.valid = true;
                        req.forgetError = false;
                        return next();
                    })
            })

        });
    },
    findUserToken:function(req,res,next){
        console.log(req.params.token)
        User.findOne({ "resetPasswordToken": req.params.token, "resetPasswordExpires": { $gt: Date.now() } }, function(err, user) {
            console.log(user)
            if (!user) {
                return res.redirect('/forget');
            }
            res.locals.userToken = req.params.token;
            req.user = user
            next();
        });
    },
    resetPassword:function(req,res,next){
        req.user.local.password =  req.user.generateHash(req.body.password);
        req.user.resetPasswordToken = undefined;
        req.user.resetPasswordExpires = undefined;

        req.user.save(function(err) {
            req.logIn(req.user, function(err) {
                next()
            });
        });
    },
    /*
    * FAVOURITE PRODUCTS
    **/
    getFavouriteProducts: function(req, res, next){
        if(req.user == null || typeof req.user == 'undefined')
            return next();
        console.log('USER ', req.user)
        var query = { "_id": { $in: req.user.products }}
        Product.find(query).lean().exec(function(err, productList){
            if(err) return next(err);
            res.locals.productsList = productList
            next();
        });
    },
    addFavouriteProduct: function(req, res, next){
        if(req.user == null || typeof req.user == 'undefined')
            return next();

        User.findById(req.user._id).exec(function(err,user){
            if(err) return next(err);
            if(user == 'null') return next();
            var found = false;
            for(var f in user.products)
                if(user.products[f] == req.body._id)
                    found = true;
            if(!found)user.products.push(req.body._id);
            user.save(function(){
                res.locals.nbFavProducts = user.products.length;
                next();
            })
        });
    },
    removeFavouriteProduct: function(req, res, next){
        if(req.user == null || typeof req.user == 'undefined')
            return next();

        User.findById(req.user._id).exec(function(err,user){
            if(err) return next(err);
            if(user == 'null') return next();

            user.products = user.products.filter(function(id){
                console.log(id,req.body._id)
                return id.toString() !== req.body._id;
            });
            user.save(function(){
                res.locals.nbFavProducts = user.products.length;
                next()
            })
        });
    },
    /*
     * FAVOURITE BRANDS
     **/
    //USER RELATED MIDDLEWARE
    getFavouriteBrands:function  (req, res , next) {
        if(req.user == null || typeof req.user == 'undefined')
            return next();
        req.userBrands = req.user.brands;
        next();
    },
    addFavouriteBrands:function  (req, res , next) {
        if(typeof req.body.brandList == 'undefined') return  next();
        var brandList = req.body.brandList;

        console.log('Brandlist ',brandList );

        User.findOne({ _id: req.user._id}, function(err, user){
            if (err) {return next(err);}
            console.log('sup');
            for(var b in brandList){
                if(brandList[b].id !== '' &&  brandList[b].id !==null  && typeof  brandList[b].id !== 'undefined')
                        user.brands.push(brandList[b].id);
            }
            console.log('we reach here', user.brands)
            user.save(function(err) {
                console.log(err)
                if (err) {return next(err); }
                return next();
            });
        });
    },
    removeFavouriteBrands:function  (req, res , next) {
        var user = req.user;
        if(typeof req.body.brandList == 'undefined') return next();
        var brandList = req.body.brandList;
        console.log(brandList);
        if(brandList.length == 0 ) return next();
        User.findOne({ _id: user._id}, function(err, user){
            if (err) { return next(err);}
            for (var j in brandList) {
                for (var i in user.brands) {
                    if (user.brands[i].toString() === brandList[j].id.toString()){
                        user.brands.splice(i, 1);
                        break;
                    }
                }
            }
            user.save(function(err){
                if (err) {return next(err);}
                next();
            });
        });
    },


    /*
     * CART
     cart  :  [{
                product : {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
                shops   :[{
                    shop    : {type: mongoose.Schema.Types.ObjectId, ref:'Shop'},
                    units   : [{
                        article : String, //THE ID OF THE Article
                        shop : String,
                        unit    : String, //THE ID OF THE UNIT
                        size    : [String],
                        nbUnits : Number
                    }]
                }]
            }]
    */
    cartProductChecker:function(cart, values, action){
        /***CHeck if product exisits***/
        var found = false;
        cart.forEach(function(c, i){
            if(c.product == values.product){
                found = true;
                if(action == 'add'){
                    if(empty(c.shops))
                        c.shops = [];
                    users.cartShopChecker(c.shops,values, action);
                }


            }
        });

        if(!found){
            if(action == 'add'){
                var newCart= {
                    product: values.product,
                    shops:[]
                };
                users.cartShopChecker(newCart.shops,values, action);
                cart.push(newCart);
            }

        }
    },
    cartShopChecker:function(shops, values, action){
         var found = false;
         shops.forEach(function(s, i){
             if(s.shop == values.shop){
                 found = true;
                 if(action == 'add') {
                     users.cartUnitChecker(s.units, values, action);
                 }
             }
         });
         if(!found){
             if(action == 'add') {
                 var newShop = {
                     shop: values.shop,
                     units: []
                 };
                 users.cartUnitChecker(newShop.units, values, action);
                 shops.push(newShop);
             }
         }
     },
    cartUnitChecker:function(units, values, action){
         var found = false;
         units.forEach(function(u, i){
             if(u.unit == values.unit){
                 found = true;
                 if(action == 'add'){
                     if(empty(u.nbUnits))
                         u.nbUnits = 1;
                     else{
                         u.nbUnits ++;
                     }
                     if(empty(u.size))
                         u.size = [];
                     if(u.size.indexOf(values.size) == -1){
                         u.size.push(values.size);
                     }
                 }
             }
         });

         if(!found){
             if(action == 'add'){
                 var newUnits= {
                     article: values.article,
                     shop: values.shop,
                     unit: values.unit,
                     nbUnits : 1
                 };
                 if(!empty(values.size))newUnits.size = [values.size];
                 else newUnits.size = [];
                 units.push(newUnits);
             }
         }
     },
    addToCart:function  (req, res , next) {

        console.log('<<<<<<ADDING>>>>>>>>')
        var product = req.params.productId;
        var article = req.params.articleId;
        if(empty(product)) return next();
        var shop = req.params.shopId;
        var unit = req.params.unitId;
        var body = req.body;
        var size;
        var nbUnits;
        body.forEach(function(a){
            if(a.name == 'size')
                size = a.value;
            if(a.name == 'nbUnits')
                nbUnits = a.value;
        });

        var cartValue = {};
        if(!empty(shop))cartValue.product = product;
        if(!empty(article))cartValue.article = article;
        if(!empty(shop))cartValue.shop = shop;
        if(!empty(unit))cartValue.unit = unit;
        if(!empty(size))cartValue.size = size;
        console.log(cartValue)

        if(!empty(req.user)){
            User.findOne({ _id: req.user._id}, function(err, user){
                if (err) {
                    return next(err);
                }
                if(empty(user.cart)){
                    user.cart = [];
                }
                users.cartProductChecker(user.cart, cartValue, 'add');
                user.save(function(err){
                    if (err) {return next(err);}
                    next();
                });
            });
       }
       else{
            if(empty(req.session.cart)){
                req.session.cart = [];
            }
            users.cartProductChecker(req.session.cart, cartValue, 'add');
            console.log(req.session.cart, '===>');
            next();
       }
    },
    getCart:function(req,res,next){
        var temp = (!empty(req.user)? req.user.cart : req.session.cart);
        var cart = [];
         temp.forEach(function(s){
             cart.push(_.clone(s, true));
         });
        var options = 'brand category otherColors articles articles.shops.shop';
        async.each(cart,function(c, callback){
            Product.findOne({_id: c.product}).deepPopulate(options).lean()
                .exec(function(err, p){
                    if(empty(p)){
                        return callback();
                    }
                    c.product = p;
                    async.each(c.shops, function(s, callback){
                        Shop.findOne({_id: s.shop}).lean()
                            .exec(function(err, shop){
                                if(empty(shop)){
                                    return callback();
                                }
                                s.shop = shop;
                                s.shop.standardShippingCost =  s.shop.shipping[0].standard.value;
                                s.shop.standardShippingTime =  s.shop.shipping[0].standard.delivery;
                                s.shop.freeAfter = s.shop.shipping[0].freeStandard.value;
                                s.shop.freeReturn = s.shop.shipping[0].return.free;
                                s.shop.returnPeriod = s.shop.shipping[0].return.period;

                                async.each(s.units, function(u, callback){
                                    Article.findOne({"_id": u.article})
                                        .lean().exec(function(err, article){
                                            if(empty(article)){
                                                return callback();
                                            }
                                            article.shops.forEach(function(as){
                                                if(as.shop == u.shop) {
                                                    as.units.forEach(function(su){
                                                        if(su._id == u.unit)
                                                            u.newUnit = su;
                                                    });
                                                }
                                            });
                                            if(!empty(u.newUnit.sizes)){
                                                u.newUnit.sizes =  u.newUnit.sizes.map(function(size){
                                                    var found = false;
                                                    if(u.size.indexOf(size) > -1)
                                                        found = true;
                                                    return {value: size, selected: found}
                                                });
                                            }
                                            return callback();
                                        });
                            }, function(err){ return callback()});

                    });
                }, function(err){ return callback()});
                });
        }, function(err){
            var calcShops = [];
            cart.forEach(function(o){
                o.shops.forEach(function(y){
                    var index; var found = false;
                    calcShops.forEach(function(cs, i){
                        if(cs.id == y.shop._id.toString()){
                            found = true;
                            index = i;
                        }
                    });
                    if(!found) {
                        var s = {
                           id : y.shop._id,
                           freeAfter: y.shop.freeAfter,
                           isItFree: (y.shop.freeAfter == 0),
                           totalPriceBefore: 0
                        };
                        calcShops.push(s);
                        index = calcShops.length-1;
                    }
                    y.units.forEach(function(f){
                        calcShops[index].totalPriceBefore  = calcShops[index].totalPriceBefore + f.newUnit.price.value;
                        calcShops[index].isItFree = ( calcShops[index].totalPriceBefore > calcShops[index].freeAfter);
                        if(empty(o.totalPrice)) o.totalPrice = 0;
                        o.totalPrice = o.totalPrice + f.newUnit.price.value;
                        o.totalPriceCurrency = f.newUnit.price.currency;
                    });

                    y.shop.isItFree = calcShops[index].isItFree;
                });
            });
            var totalCartPrice = 0, totalCartPriceCurrency = '';
            cart.forEach(function(o){
                totalCartPrice = totalCartPrice + o.totalPrice;
                totalCartPriceCurrency =  o.totalPriceCurrency;
            });
            req.userCart = cart;
            req.totalCartPrice = {price: totalCartPrice ,currency: totalCartPriceCurrency};
            next();
        });

    }
};
module.exports = users;