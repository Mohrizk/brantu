module.exports ={
    cookieConcession:function(req, res, next){
        //console.log('IN the session the cookie concession is ', req.session.cookieConcession)
        if(typeof req.session.cookieConcession =='undefined'){
            //req.session.cookieConcession = false
            res.locals.cookieConcession = false;
            return next()
        }

        req.session.cookieConcession = true;
        res.locals.cookieConcession = true;
        //console.log('',res.locals.cookieConcession)
        next()
    },
    signupPopup:function(req, res, next){
      //  console.log('IN the session the Sign Up concession is ', req.session.signupPopup)
        if(typeof req.session.signupPopup =='undefined'){
            res.locals.signupPopup = false;
            return next()
        }

        req.session.signupPopup = true;
        res.locals.signupPopup = true;
       // console.log('',res.locals.signupPopup)
        next()
    },

    addFavouriteDepartment: function(req, res, next){
        req.session.favDepartment = req.url
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