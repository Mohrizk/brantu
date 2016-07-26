var Products  = require('../models/product');
var Brands  = require('../models/brand');
var Categories  = require('../models/category');
var Article  = require('../models/article');
var Shops  = require('../models/shop');
var Colors  = require('../models/color');

var async = require('async');
var Levenshtein = require('levenshtein');
var url = require('url');
var algoliasearch = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');

var client   = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var AgoliaInstance   = algoliasearchHelper(client, 'products_2',
    {
        hitsPerPage: 30,
        hierarchicalFacets: [{
            name: 'products',
            attributes: ['category.lvl0', 'category.lvl1', 'category.lvl2', 'category.lvl3', 'category.lvl4', 'category.lvl5'],
            sortBy: ['count:desc', 'name:asc']
        }],
        facets:[  'sale', 'price.value'],
        disjunctiveFacets:['color','brand.name','sizes', 'shops', 'discount' , 'style', 'fit', 'material']
    });
var sharedHelpers = require('../../public/javascripts/shared-helper');

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





operations = {
    //API FOR GETTING PRODUCT
    getProductByID  :function(req, res, next){
        var _id = req.params.id;
        var options = 'brand category otherColors articles articles.shops.shop';
        Products.findOne({"_id":_id}).deepPopulate(options).exec( function(err, product){
            if(err) return next(err);
            if(product == null) return next();
            var x= product.toObject();
            helper.getLowestPrice(x);
            helper.getShippingReturn(x, req)
            req.product = x;
            //req.productCategoryPath = x.category.get
            req.brand = x.brand;
            req._id = x._id;
            for(var a in x.attributes){
                if( x.attributes[a].name == 'style'|| x.attributes[a].name == 'Style')
                    req.style = x.attributes[a].value;
            }
            req.category = x.category;
            return next();
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
        helper.addAttributesQuery(foundProduct, query);
        Products.find(query).sort( { "price.value": 1 }).lean().exec(function(err, products){
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
            //var sorted = sortbyNearestDescription(req.product, filtered)
            req.sameBrandProducts = helper.calculateSaving(req.product, filtered)
            next();
        })
    },

    GetLowerPriceCategoryProducts:function(req,res,next){
        var foundProduct = req.product;
        console.log('-----------------------')
        console.log(foundProduct.category)
        var query =    {    "color": new RegExp( '.*' + foundProduct.color  +'.*', 'i'),
                            "category": foundProduct.category._id,
                            "price.value":
                            {
                                $lt:Math.round(foundProduct.price.value * 1)
                            }
                        };
        helper.addAttributesQuery(foundProduct, query);
        Products.find(query).sort( { "price.value": 1 }).lean().exec(function(err, products){
            console.log('relatedProducts',products.length)
            if(err) return next(err);
            if(products.length == 0) return next();
             var filtered = products.filter(function(product){
                if (foundProduct._id.toString() !== product._id.toString()  &&  foundProduct.brand.toString() !== product.brand.toString()){
                    return true;
                }
            });
            //var sort= sortbyNearestDescription(req.product, filtered)
            req.LowerPriceCategoryProducts = helper.calculateSaving(req.product,filtered);
            next();
        })

    },

    GetSimilarCategoryProducts:function(req,res,next){
        var foundProduct = req.product;
        var query =    {    "color": new RegExp( '.*' + foundProduct.color  +'.*', 'i'),
            "category": foundProduct.category,
            "price.value":
            {
                $lte:Math.round(foundProduct.price.value * 2.5)
            }
        };
        helper.addAttributesQuery(foundProduct, query);
        Products.find(query).sort( { "price.value": 1 }).lean().exec(function(err, products){
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
            //req.sameCategoryProducts = sortbyNearestDescription(req.product, filtered)
            req.sameCategoryProducts = helper.calculateSaving(req.product,filtered);
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
        for(var f in req.session.favProducts){
            if(req.session.favProducts[f]==''){
                req.session.favProducts.splice(f, 1);
            }
        }

        if(typeof req.session.favProducts !== 'undefined'){
            var query = { "_id": { $in: req.session.favProducts }}
            Products.find(query, function(err, productList){
                if(err) return next(err);
                res.locals.productsList = productList
                next();
            })
        }
        else {
            res.locals.favouriteProductsList = [];
            next()
        }
    },

    getAlgoliaProducts:function(req, res, next){
        console.log(req.url)
        var url_parts = url.parse(req.url, true);
        var currentState;

        if(url_parts.pathname.indexOf('explore') > -1)  {
            currentState= {brand: false, category:true, search:false}
            res.locals.TYPE  = "category"
            res.locals.title = url_parts.query['hFR[products][0]']
        }
        else if(url_parts.pathname.indexOf('brand') > -1){
            currentState= {brand: true, category:false, search:false}
            res.locals.TYPE  = "brand"
            res.locals.title = 'brand - '+req.params.name;
        }
        else if(url_parts.pathname.indexOf('search') > -1){
            currentState= {brand: false, category:false, search:true}
            res.locals.TYPE  = "search"
            res.locals.title = 'search - '+url_parts.query['q'];
        }
        if(typeof url_parts.query['hFR[products][0]'] !== 'undefined')
            res.locals.selectedDepartment = url_parts.query['hFR[products][0]'].split(' > ')[0];

        var tb = url_parts.search;
        if(tb.indexOf('hFR[products][0]')==-1){
            tb = tb + 'q=&hFR[products][0]='
        }
        var queryString = tb.split('?');
        console.log(queryString)
        console.log('-----------')
        sharedHelpers.helper.urlToState(
            AgoliaInstance,
            queryString[queryString.length-1],
            currentState,
            req.params.name
        )
        AgoliaInstance.search()
        AgoliaInstance.once('result', function(content){
            console.log('Hits',content.hits.length)
            console.log('2 start')
            sharedHelpers.helper.getAllFacetValues(
                res.locals,
                AgoliaInstance,
                content,
                currentState,
                null,
                sharedHelpers.colors,
                sharedHelpers.translation,
                true);

            console.log('2 end')
            console.log(res.locals.welcome)
            next()
        }).on('error',function(err){
            return next(err);
        })
    }
}

var helper = {
    addAttributesQuery:function(foundProduct, query){
        if(foundProduct.attributes.length!==0){
            console.log('ATTRIBUTES FOUND', foundProduct.attributes)
            var values = []
            for(var a in foundProduct.attributes){
                values.push(foundProduct.attributes[a].value);
            }
            query['attributes.value'] ={ "$in": values};
        }
    },
    calculateSaving: function (item, products){
    for(var p in products){

        products[p].saving = (item.price.value - products[p].price.value) +' '+item.price.currency ;
        products[p].isItSaving = (item.price.value - products[p].price.value > 0? true :false);
        products[p].savingPercentage = Math.round(((item.price.value - products[p].price.value)/ item.price.value)*100);
    }
    return products;
},
    getLowestPrice:function(product){
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
},
    getShippingReturn:function (product, req){
    var country = helper.getCountryFromLanguage(req);
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
},
    getCountryFromLanguage:function(req){
    console.log(req.i18n.getLocale())
    switch(req.i18n.getLocale()){
        case 'sv':
            return 'sweden';
        default:
            return 'sweden';

    }
},
    sortbyNearestDescription: function (item, products){
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

}

module.exports = operations;
