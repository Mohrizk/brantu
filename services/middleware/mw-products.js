var Products  = require('../models/product');
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
var AgoliaInstance   = algoliasearchHelper(client, 'test_products',
    {
        hitsPerPage: 50,
        hierarchicalFacets: [{
            name: 'products',
            attributes: ['category.lvl0', 'category.lvl1', 'category.lvl2', 'category.lvl3', 'category.lvl4', 'category.lvl5'],
            sortBy: ['count:desc', 'name:asc']
        }],
        facets:[  'sale', 'price.value', 'compare'],
        disjunctiveFacets:['color','brand.name','sizes', 'shops', 'discount' , 'style', 'fit', 'material']
    });
var shared = require('../../public/javascripts/helper');






operations = {
    categories:{
        sv:['kläder', 'skor', 'accessoarer']
    },
    //API FOR GETTING PRODUCT
    getCompare:function(req,res,next){
        helper.getCompare(req, res.locals.selectedDepartment, operations.categories, function(err, clothes, shoes, accessory){
            res.locals.compareClothes = clothes
            res.locals.compareShoes = shoes
            res.locals.compareAcessories = accessory
            next();
        })
    },
    getProductIDfromName:function(req, res,next){
        var string =  req.params.name;
        var splited = string.split('-');
        req.params.id= splited[splited.length-1];
        next()

    },
    getProductByID  :function(req, res, next){
        var _id = req.params.id;
        helper.getProduct(req, _id, function(product){
            if(empty(product)) return next();
            req.product = product;

            var country = (!empty(req.params.country)? req.params.country:'se');

            if(!empty(product.articles)) req.product.nbShops = product.articles.shops.length;
            req.product.colorVariation = false;

            if(!empty(req.product.articles)){
                for(var x in req.product.articles.shops){
                    console.log(req.product.articles._id);

                    if(req.product.articles.shops[x].units.length > 1){
                        req.product.articles.shops[x].colorVariation = true;
                        req.product.articles.shops[x].sizeVariation = true;
                        req.product.colorVariation = true;
                    }
                    req.product.articles.shops[x].units.forEach(function(u){
                        u.country.forEach(function(c){
                            if(c.name == country){
                                u.price = c.price;
                                u.originalPrice = c.originalPrice;
                                u.currency = c.currency;
                                u.discount = c.discount;
                                u.sizes = c.sizes;
                                u.inStock = c.inStock;
                            }
                        });
                    });

                    req.product.articles.shops[x].bestDiscount = 0;
                    for (var y in req.product.articles.shops[x].units){
                        if(req.product.articles.shops[x].units[y].discount > req.product.articles.shops[x].bestDiscount){
                            req.product.articles.shops[x].bestDiscount = req.product.articles.shops[x].units[y].discount;
                        }
                    }

                }
            }

            req.product.articles.shops.sort(function(a,b){
                //GET LOWER PRICE PER UNIT
                console.log(a.price, b.price)
                return a.price - b.price;
            });


            req.brand = product.brand;
            req._id = product._id;
            for(var a in product.attributes){
                if( product.attributes[a].name == 'style'|| product.attributes[a].name == 'Style')
                    req.style = product.attributes[a].value;
            }
            req.category = product.category;
            if(product.genders.length !== 0){
                res.locals.selectedDepartment = shared.helper.decodeDepartment(product.genders[0], res.locals.LANG);
            }
            next();
        })
    },
    getSimilarProductsFromSameBrand:function(req,res,next){
            var foundProduct = req.product;
            helper.getSimilarProductsFromSameBrand(foundProduct, function(err,filtered){
                if(err) return next(err);
                if(typeof filtered == 'undefined') return next();
                //var sorted = sortbyNearestDescription(req.product, filtered)
                req.sameBrandProducts = helper.calculateSaving(req.product, filtered);
                req.sameBrandProductsInsight = (req.sameBrandProducts.length > 0);
                next();
            })
    },
    GetLowerPriceCategoryProducts:function(req,res,next) {
        var foundProduct = req.product;
        helper.GetLowerPriceCategoryProducts(foundProduct,function(err,filtered){
            if(err) return next(err);
            if(typeof filtered == 'undefined') return next();
            //var sort= sortbyNearestDescription(req.product, filtered)
            req.LowerPriceCategoryProducts = helper.calculateSaving(req.product, filtered);
            req.sameCategoryProductsInsight = (req.LowerPriceCategoryProducts.length > 0);
            next();
        });
    },
    GetSimilarCategoryProducts:function(req,res,next){
        var foundProduct = req.product;
        helper.GetSimilarCategoryProducts(req, foundProduct,function(err,filtered){
            if(err) return next(err);
            if(typeof filtered == 'undefined') return next();
            //req.sameCategoryProducts = sortbyNearestDescription(req.product, filtered)
            req.sameCategoryProducts = helper.calculateSaving(req.product,filtered);
            next();
        })
    },
    checkProductIsFavoured :function(req, res, next){
        if(req.product == null || !req.user) return next();
            var found = false;
            for(var f in req.user.products)
                if(req.user.products[f].toString() == req.product._id.toString())
                    found= true;
            req.product.isFavored = found;
        next();
    },

    getForBlog:function(req, res, next){
        if(typeof req.outfit == 'undefined') return next();

        var url_parts = url.parse(req.outfit.categoryLink, true);
        var href = decodeURI(url_parts.pathname).replace(/\//g,' ');
        var search = ['search', 'sök']
        var brand = ['brand', 'märken']

        if(href.match(/(?:search|sök)/g)){
            req.currentState  = shared.helper.urlToStateSearch(decodeURI(url_parts.path), AgoliaInstance);
            res.locals.TYPE = 'search';
        }
        else if(href.match(/(?:märken|brand)/g)){
            req.currentState  = shared.helper.urlToStateBrand(decodeURI(url_parts.path), AgoliaInstance);
            res.locals.TYPE = 'brand';
        }
        else {
            req.currentState  = shared.helper.urlToStateCategory(decodeURI(url_parts.path), AgoliaInstance);
            res.locals.TYPE = 'category';
        }
        next();
    },
    getForBrands:function(req, res, next){
        var url_parts = url.parse(req.url, true);
        req.currentState  = shared.helper.urlToStateBrand(decodeURI(url_parts.href), AgoliaInstance);
        res.locals.TYPE = 'brand';

        next();
    },
    getForCategories:function(req, res, next){
        var url_parts = url.parse(req.url, true);
        req.currentState  = shared.helper.urlToStateCategory(decodeURI(url_parts.href), AgoliaInstance);
        res.locals.TYPE = 'category';
        next();
    },
    getForSearch:function(req, res, next){
        var url_parts = url.parse(req.url, true);
        req.currentState  = shared.helper.urlToStateSearch(decodeURI(url_parts.href), AgoliaInstance);
        res.locals.TYPE = 'search';
        next();
    },
    getAlgoliaProducts:function(req, res, next){
        if(typeof req.currentState =='undefined') return next();
        AgoliaInstance.search();
        AgoliaInstance.once('result', function(content){
            shared.helper.getAllFacetValues(
                res.locals,
                AgoliaInstance,
                content,
                req.currentState.currentState,
                null,
                shared.colors,
                shared.translation,
                true);
            return next();
        }).on('error',function(err){
            return next(err);
        })
    }
};

var helper = {
    getProductUrl:function(product){
        return '/bästa-pris-för/'+ shared.helper.urlFriendly(product.name)+'-'+product._id;
    },
    getCompare:function(req, department, categoryOptions,callback){
        var options = 'brand category articles articles.shops.shop';
        var clothArray = [], shoesArray = [], accessoryArray;
        Article.find({"shops":{"$not":{"$size":1}}}, {_id: 1}).exec(function(err, docs){
            var ids = docs.map(function(doc) { return doc._id;});
            Products.find({"articles":{$in: ids}, "genders": shared.helper.encodeDepartment(department)})
                .deepPopulate(options)
                .limit(30).lean()
                .exec(function(err, products){
                if(err) return callback(err);
                if(products.length == 0 ) return callback()
                /**
                 * FILTER AND MAP PRODUCTS
                 * */
                //loop through found products
                for(var x in products){
                    if(typeof products[x].category.breadcrumb[1] !== 'undefined'){
                        var found = false, currentProduct = products[x];
                        /**
                         * REMOVE OTHER COLORS
                         * */
                        //loop through our current array
                        for(var y in clothArray){
                           var arrayProduct = clothArray[y];
                            //loop through otherColors
                            for(var z in arrayProduct.otherColors){
                                if(arrayProduct.otherColors[z].toString() === currentProduct['_id'].toString()){
                                    found = true;
                                }
                            }
                        }
                        if(!found){
                            /**
                             *
                             *CALCULATE PRICE SAVING and sort by highest saving
                             * */
                            for(var a in currentProduct.articles.shops){
                                // GET LOWEST PRICE IN EACH SHOP
                                var lowestPriceShop, highestPriceShop;
                                for(var b in currentProduct.articles.shops[a].units){
                                    var unit = currentProduct.articles.shops[a].units[b];
                                    if(b == 0){
                                        lowestPriceShop = unit.price.value;
                                        highestPriceShop = unit.price.value;
                                    }
                                    else{
                                        if( unit.price.value < lowestPriceShop){
                                            lowestPriceShop = unit.price.value;
                                        }
                                        else if( unit.price.value > highestPriceShop){
                                            highestPriceShop = unit.price.value
                                        }
                                    }
                                }
                                if(a == 0){
                                    currentProduct.lowestPrice = lowestPriceShop;
                                    currentProduct.HighestPrice = highestPriceShop;
                                }
                                else{
                                    if(lowestPriceShop  < currentProduct.lowestPrice){
                                        currentProduct.lowestPrice = lowestPriceShop;
                                    }
                                    else if(highestPriceShop  > currentProduct.HighestPrice){
                                        currentProduct.HighestPrice = highestPriceShop;
                                    }
                                }
                            }
                            currentProduct.saving = Math.round(((currentProduct.HighestPrice - currentProduct.lowestPrice)/currentProduct.HighestPrice )*100)
                            clothArray.push(currentProduct);
                        }
                    }
                }

                clothArray.sort(function(a,b){
                        return b.saving - a.saving;
                });
                var returnArray = [];
                for(var i = 0; i< 6;i++){
                returnArray.push(clothArray[i]);
                }
                return callback(null, returnArray, shoesArray, accessoryArray);
            });
        });

    },
    getProduct: function(req,id, callback){
        console.log('Sup1')
        var options = 'brand category otherColors articles articles.shops.shop';
        Products.findOne({"_id":id}).deepPopulate(options).lean().exec(function(err, product){

                if(err) return callback(err);
                if(empty(product)) return callback();

                helper.getLowestPrice(product);
                //helper.getShippingReturn(product, req);

                var selectedColor, selectedIndex= 0 ;
                if(!empty(req.query.color)){
                    product.available.forEach(function(color, index){
                        if(color.color == query.color){
                            product.selectedColor = color.color;
                            selectedIndex = index;
                            product.color = color.color;
                            product.colorTags = color.colorTags;
                            product.pictures = color.pictures;
                        }
                    });
                }
                else{
                    product.selectedColor = product.available[0].color;
                    product.color = product.available[0].color;
                    product.colorTags = product.available[0].colorTags;
                    product.pictures = product.available[0].pictures;
                }

                var country = (!empty(req.params.country)? req.params.country:'se');
                product.available.forEach(function(color, index){
                    if(selectedIndex == index){
                        var found = false;
                       color.country.forEach(function(c){
                           console.log(c.name)
                           if(c.name == country){
                               found = true;
                               product.sizes = c.sizes;
                               product.price   = c.price;
                               product.originalPrice = c.originalPrice;
                               product.currency    = c.currency;
                               product.discount= c.discount;
                           }
                       });
                    }
                });
                callback(product);
        });
    },

    getSimilarProductsFromSameBrand:function(foundProduct,callback){
        var query = {   "brand": foundProduct.brand,
            "category": foundProduct.category,
            "price.value":
            {   $gt: Math.round(foundProduct.price.value * 0.2),
                $lte:Math.round(foundProduct.price.value * 1.3)
            }
        };
        helper.addAttributesQuery(foundProduct, query);
        Products.find(query).sort( { "price.value": 1 }).lean().exec(function(err, products){
                if(err) return callback(err);
                if(products.length == 0) return callback();
                var filtered= products.filter(function(product){
                    if (foundProduct._id.toString() == product._id.toString()) return false;
                    for (var o in foundProduct.otherColors){
                        if (product._id.toString() == foundProduct.otherColors[o].toString());
                            return false;
                    }
                    return true;
                }).map(function(product){
                    product.url = helper.getProductUrl(product);
                    return product;
                });
             callback(null,filtered)
        });
    },
    GetLowerPriceCategoryProducts:function(foundProduct,callback){
        var query =    {    "color": new RegExp( '.*' + foundProduct.color  +'.*', 'i'),
            "category": foundProduct.category._id,
            "price.value":
            {
                $lt:Math.round(foundProduct.price.value * 1)
            }
        };
        helper.addAttributesQuery(foundProduct, query);
        Products.find(query).sort( { "price.value": 1 }).lean().exec(function(err, products){
                if(err) return callback(err);
                if(products.length == 0) return callback();
                var filtered = products.filter(function(product){
                    if (foundProduct._id.toString() !== product._id.toString()  &&  foundProduct.brand.toString() !== product.brand.toString()){
                        return true;
                    }
                }).map(function(product){
                    product.url = helper.getProductUrl(product);
                    return product;
                });
            callback(null,filtered)
        })
    },

    GetSimilarCategoryProducts: function (req, foundProduct, callback) {
        var query =    {"color": new RegExp( '.*' + foundProduct.color  +'.*', 'i'),
            "category": foundProduct.category,
            "price.value":
            {
                $lte:Math.round(foundProduct.price.value * 2.5)
            }
        };
        helper.addAttributesQuery(foundProduct, query);
        Products.find(query).sort( { "price.value": 1 }).lean().exec(function(err, products){
                if(err) return callback(err);
                if(products.length == 0) callback();
                var filtered = products.filter(function(product){
                    if (foundProduct._id.toString() == product._id.toString()) return false;
                    for (var j in req.LowerPriceCategoryProducts)
                        if(req.LowerPriceCategoryProducts[j]._id.toString() == product._id.toString())  return false;
                    for (var k in req.sameBrandProducts)
                        if(req.sameBrandProducts[k]._id.toString() == product._id.toString())  return false;
                    return true;
                }).map(function(product){
                    product.url = helper.getProductUrl(product);
                    return product;
                });;
            callback(null,filtered);
        })
    },

    addAttributesQuery:function(foundProduct, query){
        if(foundProduct.attributes.length!==0){
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
                if(product.articles.shops[s].units[u].price <  lowest.price){
                    lowest = product.articles.shops[s].units[u];
                }
            }
        }
        product.articles.shops[s].lowest = lowest;
    }
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
    //console.log(product.articles.shops);
},
    getCountryFromLanguage:function(req){
        //console.log(req.i18n.getLocale())
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
        //for(var x in products) console.log(products[x]._id, products[x].levenshtein)
        return products;
    }
};

module.exports = operations;
