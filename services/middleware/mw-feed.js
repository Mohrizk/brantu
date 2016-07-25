var Outfits  = require('../models/outfit');
var Product  = require('../models/product');
var webshot = require('webshot');
var helper = {
    populateStyleProduct: function (body, callback){
    if(body.styleProduct !== null && body.styleProduct !== ''){
        Product.findOne({_id: body.styleProduct}).populate({path:'brand'}).exec(function(err, product){

            if(err) return callback(err)
            if(product== null) return callback(null,null)
            console.log('Here bitches', product.name)
            return callback(null,product);
        })
    }
},
    populatePriceProduct: function (body, callback){
    if(body.priceProduct !== null && body.priceProduct !== ''){
        Product.findOne({_id: body.priceProduct}).populate({path:'brand'}).exec(function(err, product){
            if(err) return callback(err)
            if(product== null) return callback(null,null)
            console.log('Here bitches', product.name)
            return callback(null,product);
        })
    }
}
}

module.exports = {
    createPriceCard:function(req, res, next){
        var body = req.body;
        if((body.styleProduct == null || body.styleProduct == '') &&
            (body.styleImage == null || body.styleImage == '')){
             req.priceCardCreated = false;
             req.message = 'error:Please add a Style Product Image or Style Product Id';
             return next();
        }

        if((body.styleProduct !== null || body.styleProduct !== '') &&
            (body.priceProduct == null || body.priceProduct == '')&&
            body.styleProduct == body.priceProduct){
            req.priceCardCreated = false;
            req.message = 'error:make sure';
            return next();
        }


        if((body.priceProduct == null || body.priceProduct == '') &&
            (body.priceImage == null || body.priceImage == '')){
            req.priceCardCreated = false;
            req.message = 'error:Please add a Style Product Image or Style Product Id';
            return next();
        }

        if((body.styleProduct !== null || body.styleProduct !== '') &&
            (body.priceProduct == null || body.priceProduct == '') &&  (body.priceProduct == body.styleProduct)){
            req.priceCardCreated = false;
            req.message = 'error:Make sure that Style Product is not that same as the price product';
            return next();
        }

        var  day = body.startDate.split('-')
        var time = body.startTime.split(':')
        var startDate = new Date(body.startDate+' '+body.startTime)
        var now = new Date()
        if(startDate < now){
            req.priceCardCreated = false;
            req.message = 'error:Make sure the time is not now';

            return next();
        }
        helper.populateStyleProduct(body,function( err,styleProduct){
            helper.populatePriceProduct(body,function(err,  priceProduct){
                   body.currency = priceProduct.price.currency;
                if(priceProduct !== null){
                    if(body.priceImage == null || body.priceImage == ''){
                        body.priceImage = priceProduct.mainPicture.largeUrl;
                    }
                    if(body.pricePrice == null || body.pricePrice == ''){
                        body.pricePrice = priceProduct.price.value;
                    }
                    if(body.styleBrand == null || body.priceBrand == ''){
                        body.priceBrand = priceProduct.brand.name;
                    }
                    body.priceUrl = priceProduct.productUrl;

                }
                if(styleProduct !== null){
                    if(body.styleImage == null || body.styleImage == ''){
                        body.styleImage = styleProduct.mainPicture.largeUrl;
                    }
                    if(body.stylePrice == null || body.stylePrice == ''){
                        body.stylePrice = styleProduct.price.value;
                    }
                    if(body.styleBrand == null || body.styleBrand == ''){
                        body.styleBrand = styleProduct.brand.name;
                    }
                    body.styleUrl = priceProduct.styleUrl;

                }


                if(body.stylePrice !== null &&  body.pricePrice !== null ) {
                    if(body.stylePrice > body.pricePrice){
                        body.saving = {value: (body.stylePrice-body.pricePrice)+' '+ body.currency, discount: Math.round(((body.stylePrice - body.pricePrice)/ body.stylePrice)*100)+''}
                        body.stylePrice = body.stylePrice +''+body.currency;
                        body.pricePrice = body.pricePrice +''+body.currency;
                    }
                    else {
                        req.priceCardCreated = false;
                        req.message = 'error: make sure price product have lower price than style product';
                        return next();

                    }
                }
                console.log('Body', body)
                var outfit = new Outfits(body);
                outfit.startDate = new Date(startDate);
                outfit.save(function(err){
                        if(err) return next(err)
                        req.priceCardCreated = true;
                        req.message = 'Thank you for creating the outfit';
                        Outfits.populate(outfit , [{path:'styleProduct', populate:{path:'brand'}}, {path:'priceProduct', populate:{path:'brand'}}],function(err, populatedOutfit){
                            console.log(populatedOutfit)
                            req.priceCard = populatedOutfit;
                            next()
                        })

                    })
                })
        })
    },
    renderPriceCard:function(req, res, next){
        if(!req.priceCardCreated){
            req.pictureCreated = false;
            return next();
        }
        hbs.render("./views/server-side-templates/price-card.hbs", {priceCard:req.priceCard})
            .then(function (template) {
                    webshot(template, './public/images/pricecard.jpg',
                        {siteType:'html', streamType:'jpg', quality:100},
                        function(err) {
                            if(err){
                                console.log('ERROR',err)
                                req.message = 'error: problem with creating photo '+req.priceCard._id;
                                req.pictureCreated = false;
                                return next(err)
                            }
                            console.log('Picture Rendered')
                            req.pictureCreated = true;
                            return next()
                    });
            })
            .catch(next);
    },
    getFeed:function(req,res,next){

        var page;
        if(typeof req.params.page !== 'undefined'){page =  req.params.page;}
        else{ page = 1;}
        var now = new Date();

        var query = {
            gender   : require('./mw-categories').mapGender(res.locals.selectedDepartment),
            startDate: {"$lt":now}
        }
        var options = {
            populate: [{path:'styleProduct', populate:{path:'brand'}}, {path:'priceProduct', populate:{path:'brand'}}],
            sort:     { startDate: -1 },
            lean:     true,
            page:      page,
            limit:     5
        };

        Outfits.paginate(query, options).then(function(result) {
            res.locals.feed = result;
            console.log(result.docs.length)
            next();
        });

    },
    getNewsletter:function(department, callback){
        var now = new Date();
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        var query = {
            gender   : category.mapGender(department),
            startDate: {"$lt":now, $gt: oneWeekAgo}
        }
        var options = {
            populate: [{path:'styleProduct', populate:{path:'brand'}}, {path:'priceProduct', populate:{path:'brand'}}],
            sort:     { startDate: -1 },
            lean:     true,
            limit:     12
        };
        Outfits.paginate(query, options).then(function(result) {
            callback(result.docs)
        });
    },
}

