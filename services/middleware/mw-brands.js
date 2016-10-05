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
    checkBrandIsFavoured:function(req,res,next){
        if(!req.user) return next();
        if(req.product !== null){
            var found = false;
            for(var f in req.user.brands)
                if(req.user.brands[f]._id.toString() == req.product.brand._id.toString())
                    found= true;

            req.product.brand.isFavored = found;
            console.log('USER BRAND VS PRODUCT BRAND');
            console.log('BRAND IS ', req.product.brand.name , found);
            console.log(req.user.brands );
            if(typeof req.brand !== 'undefined')
                req.brand.isFavored = found;
        }
        next();
    }
};
