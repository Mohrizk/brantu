module.exports ={
    addFavouriteDepartment: function(req, res, next){
            req.session.favDepartment = req.url
        next();
    },
    addFavouriteProduct: function(req, res, next){
        console.log(req.body)
        if(req.session.favProducts != null){
            var found = false;
            for(var f in req.session.favProducts)
                if(req.session.favProducts[f] == req.body.productId)
                    found = true;
            if(!found)req.session.favProducts.push(req.body.productId)
        }
        else
            req.session.favProducts = [req.body.productId]
        next();
    },
    removeFavouriteProduct: function(req, res, next){
        console.log(req.body)
        if(req.session.favProducts != null){
            req.session.favProducts = req.session.favProducts.filter(function(productId){
                    return productId !== req.body.productId;
            })
        }
        next();
    },
    addViewedProduct: function(req, res, next){
        console.log(req.body)
        if(req.session.viewedProducts != null )
            req.session.viewedProducts.push(req.body.productId)
        else
            req.session.viewedProducts = [req.body.productId]
        next();
    }
}