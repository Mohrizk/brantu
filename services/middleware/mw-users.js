/**
 * Created by mohamedrizk on 22/06/16.
 */
var async = require('async');
var User = require('../models/user');

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
    }
}
