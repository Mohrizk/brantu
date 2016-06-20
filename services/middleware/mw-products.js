var Products  = require('../models/product');
var Brands  = require('../models/brand');
var Categories  = require('../models/category');
var Shops  = require('../models/shop');
var async = require('async');




module.exports = {
    //API FOR GETTING PRODUCT
    getProductByProductID:function(req, res, next){
        var split = req.url.split('/');
        console.log(split);
        var productId = split[split.length-1];
        console.log(productId)
        Products
            .findOne({"productId":productId})
            .populate('brand')
            .populate('category')
            .populate('shop')
            .exec( function(err, product){
            if(err) return next(err)
            req.product = product._doc;
            next();
        })
    },
    checkProductIsFavoured:function(req, res, next){
        if(req.product !== null && typeof req.session.favProducts !=='undefined'){
            var found = false;
            for(var f in req.session.favProducts)
                if(req.session.favProducts[f] == req.product.productId)
                    found= true;
            req.product.isFavored = found;
        }
        next();
    },
    //GET CATEGORY TREE
    getFavouriteProducts: function (req, res, next) {
        if(typeof req.session.favProducts !== 'undefined'){
            var query = { "productId": { $in: req.session.favProducts }}
            Products.find(query, function(err, productList){
                if(err) return next(err);
                console.log(productList);
                res.locals.productsList = productList
                next();
            })
        }
        else {
            res.locals.favouriteProductsList = [];
            next()
        }
    },

    //GET BREAD CRUMBS & CHILDREN
    getSimilarProducts: function (req, res, next) {

    }
}
