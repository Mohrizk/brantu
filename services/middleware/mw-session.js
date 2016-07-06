module.exports ={
    addFavouriteDepartment: function(req, res, next){
            req.session.favDepartment = req.url
        next();
    },
    addFavouriteProduct: function(req, res, next){
        if(req.session.favProducts != null){
            var found = false;
            for(var f in req.session.favProducts)
                if(req.session.favProducts[f] == req.body._id)
                    found = true;
            if(!found)req.session.favProducts.push(req.body._id)
        }
        else
            req.session.favProducts = [req.body._id]
        next();
    },
    removeFavouriteProduct: function(req, res, next){
        if(req.session.favProducts != null){
            req.session.favProducts = req.session.favProducts.filter(function(_id){
                    return _id !== req.body._id;
            })
        }
        next();
    },
    addViewedProduct: function(req, res, next){
        if(req.session.viewedProducts != null )
            req.session.viewedProducts.push(req.body._id)
        else
            req.session.viewedProducts = [req.body._id]
        next();
    }
}