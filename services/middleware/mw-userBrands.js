/**
 * Created by mohamedrizk on 13/05/16.
 */
var Brand  = require('../models/brand');
var User = require('../models/user');
var async = require('async');


module.exports ={

    getUserBrands:function  (req, res , next) {
                    var user = req.user;
                    var brands = [];

                    async.each(user.brands, function (brand, callback) {

                        Brand.findOne({ '_id': brand }, function (err, brandFound) {
                            if(brandFound!=null){
                                brands.push(brandFound);
                            }
                            callback();
                        })
                    }, function (err) {
                        if (err) { next(err)}

                        req.userBrands = brands;

                        next();
                    });
    },

    addUserBrands:function  (req, res , next) {
        var user = req.user;
        var brands = [];

        if(req.body.hasOwnProperty('brandsList')){

             var brandList = req.body.brandsList;
             if(brandList.length > 0 ){
                 async.each(brandList, function (brand, callback) {
                     Brand.findOne({ key: brand.key }, function (err, brandFound) {
                         if(brand!=null){
                             brands.push({_id: brandFound._id, ref: 'Brand'});
                         }
                         callback();
                     })
                 }, function (err) {
                     if (err) {next(err)}

                     User.findOne({ _id: user._id}, function(err, user){
                         if (err) { return next(err); }
                         brands.forEach(function(aBrandtoAdd){
                             user.brands.push(aBrandtoAdd);
                         })
                         user.save(function(err) {

                             if (err) {return next(err); }
                             next();
                         });
                     });

                 });
             }
         }
        else{
             next()
         }
    },

    removeUserBrands:function  (req, res , next) {
        var user = req.user;
        var brands = [];

        if(req.body.hasOwnProperty('brandsList')){

            var brandList = req.body.brandsList;
            if(brandList.length > 0 ){
                async.each(brandList, function (brand, callback) {
                    Brand.findOne({ key: brand.key }, function (err, brandFound) {
                        if(brand!=null){
                            brands.push({_id: brandFound._id, ref: 'Brand'});
                        }
                        callback();
                    })
                }, function (err) {
                    if (err) {next(err)}

                    User.findOne({ _id: user._id}, function(err, user){

                        if (err) { return next(err);}

                        for (var j = 0; j < brands.length; j++) {
                            for (var i = 0; i < user.brands.length; i++) {
                                var userBrand = user.brands[i];
                                var brandRemove = brands[j]._id;
                                if (JSON.stringify(userBrand) === JSON.stringify(brandRemove)){

                                    user.brands.splice(i, 1);
                                    break;
                                }
                                else{

                                }
                            }
                        }
                        user.save(function(err) {
                            if (err) {return next(err); }
                            next();
                        });
                    });

                });
            }
        }
        else{
            next()
        }
    }
}