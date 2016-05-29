var Brands  = require('../models/brand');
var async = require('async');




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

    }
}
