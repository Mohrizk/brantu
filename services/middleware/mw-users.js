/**
 * Created by mohamedrizk on 22/06/16.
 */
var async = require('async');
var User = require('../models/user');
var Products = require('../models/product');

module.exports = {
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
        Products.find(query).lean().exec(function(err, productList){
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
    }
};
