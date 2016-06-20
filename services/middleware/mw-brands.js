var Brands  = require('../models/brand');
var async = require('async');
var User = require('../models/user');



module.exports = {
    //GET CATEGORY TREE
    getBrandInfo: function (req, res, next) {
        var path = req.url.split('/');
        var selectedBrandName = path[path.length-1];
        //selectedBrandName = selectedBrandName.replace('%20',' ');
        var x=selectedBrandName.split('%20').join(' ');
        console.log('the brand is', x)
        Brands.findOne({name: x},{'key':1, 'name': 1}, function (err, brand) {
            console.log(brand)
            if(err) callback(err);
            if(brand !=null){
                    res.locals.brand =brand;
                    res.locals.exposeName = 'brand';
                    res.locals.exposeValue = brand;
            }
            next();
        });
    },
    //GET BREAD CRUMBS & CHILDREN
    getRelatedBrands: function (req, res, next) {

    },
    //USER RELATED MIDDLEWARE
    getUserBrands:function  (req, res , next) {
        if(req.user !== null && typeof req.user !== 'undefined'){
            var user = req.user;
            var brands = [];
            async.each(user.brands, function (brand, callback) {

                Brands.findOne({ '_id': brand }, function (err, brandFound) {
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

        }
        else next();

    },
    addUserBrands:function  (req, res , next) {
        var user = req.user;
        var brands = [];

        if(req.body.hasOwnProperty('brandsList')){

            var brandList = req.body.brandsList;
            if(brandList.length > 0 ){
                async.each(brandList, function (brand, callback) {
                    Brands.findOne({ key: brand.key }, function (err, brandFound) {
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
                    Brands.findOne({ key: brand.key }, function (err, brandFound) {
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
