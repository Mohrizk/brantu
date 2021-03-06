// config/passport.js

// load all the things we need
//var User       = require('../services/models/user');

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../services/models/user');

var configAuthIn = require('./auth');
if(process.env.NODE_ENV =='production'){
    var configAuth = configAuthIn.production;
}
else{
    var configAuth = configAuthIn.development;
}

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findOne({_id:id})
            .populate('brands', { name: 1, key: 1, _id:1}).exec(function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            console.log('alright then!-------', email, password)
            // asynchronous User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                // find a user whose email is the same as the forms email we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, {message: 'invalid email or password' });
                    } else {
                        var newUser = new User();
                        console.log(req.body);
                        //newUser.local.gender   = req.body.gender;
                        newUser.gender   = req.body.gender;
                        newUser.local.email   = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.chromeId = (!empty(newUser.chromeId)? newUser.chromeId: []);
                        newUser.safariId = (!empty(newUser.safariId)? newUser.safariId: []);
                        if(!empty(req.params.extension) && !empty(req.params.userId)){
                            switch(req.params.extension){
                                case 'chrome':
                                    newUser.chromeId.push(req.params.userId);
                                    newUser.chromeOnBoardDate = Date.now();
                                    newUser.chromeOnBoardVersion = req.params.version;
                                    break;
                                case 'safari':
                                    newUser.safariId.push(req.params.userId);
                                    newUser.safariOnBoardDate = Date.now();
                                    newUser.safariOnBoardVersion = req.params.version;
                                    break;
                            }
                        }
                        if(!req.body.role) newUser.role = req.body.role;
                        newUser.newsletter = true;
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            })
        }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {

                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {message:'nouser'}); // req.flash is the way to set flashdata using connect-flash
                // if the user is found but the password is wrong

                if (!user.validPassword(password))
                    return done(null, false, {message:'nopass'}); // create the loginMessage and save it to session as flashdata


                if(!empty(req.params.extention) && !empty(req.params.userId)){
                    switch(req.params.extention){
                        case 'chrome':
                            (user.chromeId.indexOf(req.params.userId) == -1?
                                user.chromeId.push(req.params.userId): false);
                        case 'safari':
                            extentionId =  user.chromeId;
                            (user.safariId.indexOf(req.params.userId) == -1?
                                user.safariId.push(req.params.userId): false);
                    }
                }

                user.save(function(err){
                    return done(null, user);
                });
                // all is well, return successful user
            });

        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
            // pull in our services id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL

        },
        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {
            // asynchronous
            console.log(token, refreshToken);
            process.nextTick(function() {
                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        console.log('User already signed up', user);
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();
                        console.log(profile);
                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                        newUser.facebook.picture =  profile.picture;
                        newUser.facebook.gender =  profile.gender;
                        newUser.facebook.email = profile.email;
                        newUser.newsletter = true;
                        //newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

};
