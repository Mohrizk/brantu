var Products  = require('../models/product');
var Brands  = require('../models/brand');
var Categories  = require('../models/category');
var Article  = require('../models/article');
var Shops  = require('../models/shop');
var Colors  = require('../models/color');
var async = require('async');
var Levenshtein = require('levenshtein');
//HELPER FUNCTIONS
function getHex(product, callback){
    var color = product.color;
    var colorReg = new RegExp( '.*' + color +'.*', 'i');
    Colors.findOne({displayName: colorReg}, function(err, colorFound){
        if(err) return callback(err)
        product.color = {};
        if(colorFound != null){
           // console.log('COLOR Found', colorFound)
            product.color.name = colorFound.displayName;
            product.color.hex = colorFound.hex;
            return callback()
        }
        product.color.name = color;
        //console.log('COLOR', product.color.name, product.color.hex)
        callback()
    })
}
function getLowestPrice(product){
    for (var s in product.articles.shops){
        var lowest;
        for(var u in product.articles.shops[s].units){
          if(u == 0){
              lowest = product.articles.shops[s].units[u];
          }
          else{
              if(product.articles.shops[s].units[u].price.value <  lowest.price.value){
                  lowest = product.articles.shops[s].units[u];
              }
          }
        }
        product.articles.shops[s].lowest = lowest;
    }
    console.log(product.articles.shops);
}
function getCountryFromLanguage(req){
    console.log(req.i18n.getLocale())
    switch(req.i18n.getLocale()){
        case 'sv':
            return 'sweden';
        default:
            return 'sweden';

    }
}
function getShippingReturn(product, req){
    var country = getCountryFromLanguage(req);
    for (var s in product.articles.shops){
        var location = 0;
        for(var x in product.articles.shops[s].shop.shipping){
          if( product.articles.shops[s].shop.shipping[x].country == country)
          location = x;
        }
        var easy = product.articles.shops[s].shop.shipping[location];
        product.articles.shops[s].shop.standardShippingCost =  easy.standard.value +' '+easy.standard.currency;
        product.articles.shops[s].shop.standardShippingTime =  easy.standard.delivery;
        product.articles.shops[s].shop.freeAfter = easy.freeStandard.value +' '+easy.freeStandard.currency;
        product.articles.shops[s].shop.freeReturn = easy.return.free;
        product.articles.shops[s].shop.returnPeriod = easy.return.period;
    }
    console.log(product.articles.shops);
}
function sortbyNearestDescription(item, products){
    for(var p in products){
        var l = new Levenshtein( products[p].description, item.description)
        products[p].levenshtein = l.distance
    }
    products.sort(function(a, b) {
        return a.levenshtein - b.levenshtein;
    });
    for(var x in products) console.log(products[x]._id, products[x].levenshtein)
    return products;
}
function calculateSaving(item, products){
    for(var p in products){
         products[p].saving = (item.price.value - products[p].price.value) +' '+item.price.currency ;
         products[p].savingPercentage = Math.round(((item.price.value - products[p].price.value)/ item.price.value)*100);
        }
    return products;
}

operations = {
    //API FOR GETTING PRODUCT
    getProductByID  :function(req, res, next){
        var split = req.url.split('/');
        var _id = split[split.length-1];
        console.log(_id)
        var options = 'brand category otherColors articles articles.shops.shop';
        Products.findOne({"_id":_id}).deepPopulate(options).exec( function(err, product){
            if(err) return next(err);
            if(product == null) return next();
            var x= product.toObject();
                getLowestPrice(x);
                getShippingReturn(x, req)
                req.product = x;
                return next();
            })
    },

    getUnpopulatedProductByID  :function(req, res, next){
        var split = req.url.split('/');
        var _id = split[split.length-1];
        Products.findOne({"_id":_id}).exec( function(err, product){
            if(err) return next(err);
            if(product == null) return next();
            req.product = product.toObject();
            Products.populate(product, [{path:'brand'}, {path:'category'}], function(err, newProduct){
                req.brand = newProduct.brand;
                req.category = newProduct.category;
                return next();
            })


        })
    },

    getSimilarProductsFromSameBrand:function(req,res,next){
       var foundProduct = req.product;
        var query = {   "brand": foundProduct.brand,
                        "category": foundProduct.category,
                        "price.value":
                        {   $gt: Math.round(foundProduct.price.value * 0.2),
                             $lte:Math.round(foundProduct.price.value * 1.3)
                        }
                    };
        Products.find(query).lean().exec(function(err, products){
            if(err) return next(err);
            if(products.length == 0) return next();
            var filtered= products.filter(function(product){
                if (foundProduct._id.toString() == product._id.toString()) return false;
                for (var o in foundProduct.otherColors){
                    if (product._id.toString() == foundProduct.otherColors[o].toString())
                    return false;
                }
                return true;
            })
            var sorted = sortbyNearestDescription(req.product, filtered)
            req.sameBrandProducts = calculateSaving(req.product, sorted)
            next();
        })
    },

    GetLowerPriceCategoryProducts:function(req,res,next){
        var foundProduct = req.product;
        var query =    {    "color": new RegExp( '.*' + foundProduct.color  +'.*', 'i'),
                            "category": foundProduct.category,
                            "price.value":
                            {
                                $lte:Math.round(foundProduct.price.value * 1)
                            }
                        };
        Products.find(query).lean().exec(function(err, products){
            if(err) return next(err);
            if(products.length == 0) return next();
             var filtered = products.filter(function(product){
                if (foundProduct._id.toString() !== product._id.toString()  &&  foundProduct.brand.toString() !== product.brand.toString()){
                    return true;
                }
            });
            var sort= sortbyNearestDescription(req.product, filtered)
            req.LowerPriceCategoryProducts = calculateSaving(req.product,sort);
            next();
        })

    },

    GetSimilarCategoryProducts:function(req,res,next){
        var foundProduct = req.product;
        var query =    {    "color": new RegExp( '.*' + foundProduct.color  +'.*', 'i'),
            "category": foundProduct.category,
            "price.value":
            {
                $lte:Math.round(foundProduct.price.value * 3)
            }
        };
        Products.find(query).sort( { "price.value": -1 }).lean().exec(function(err, products){
            if(err) return next(err);
            if(products.length == 0) return next();
            var filtered = products.filter(function(product){

                if (foundProduct._id.toString() == product._id.toString()) return false;
                for (var j in req.LowerPriceCategoryProducts)
                    if(req.LowerPriceCategoryProducts[j]._id.toString() == product._id.toString())  return false
                for (var k in req.sameBrandProducts)
                    if(req.sameBrandProducts[k]._id.toString() == product._id.toString())  return false

                    return true;
            });
            req.sameCategoryProducts = sortbyNearestDescription(req.product, filtered)
            console.log(req.sameCategoryProducts.length)
            next();
        })

    },

    checkProductIsFavoured :function(req, res, next){
        if(req.product !== null && typeof req.session.favProducts !=='undefined'){
            var found = false;
            for(var f in req.session.favProducts)
                if(req.session.favProducts[f] == req.product._id)
                    found= true;
            req.product.isFavored = found;
        }
        next();
    },

    getFavouriteProducts   : function (req, res, next) {
        if(typeof req.session.favProducts !== 'undefined'){
            var query = { "_id": { $in: req.session.favProducts }}
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
    }
}

helper={

}

module.exports = operations;
