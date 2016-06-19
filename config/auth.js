// config/auth.js

// expose our config directly to our application using module.exports


module.exports = {

    'development':      {   'facebookAuth' : {
                            'clientID'      : '1692583477684792', // your App ID
                            'clientSecret'  : '7c20ed474d1daaa40bf61b8f31a725a5', // your App Secret
                            'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
                                }
    },
    'production':      {   'facebookAuth' : {
                            'clientID'      : '1692583477684792', // your App ID
                            'clientSecret'  : '7c20ed474d1daaa40bf61b8f31a725a5', // your App Secret
                            'callbackURL'   : 'http://www.brantu.com/auth/facebook/callback'
                            }
    }
};
