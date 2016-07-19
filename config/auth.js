// config/auth.js

// expose our config directly to our application using module.exports


module.exports = {

    'development':      {   'facebookAuth' : {
                            'pageID'        : '1017561558316747',//PAGE ID
                            'clientID'      : '1692583477684792', //APP ID
                            'clientSecret'  : '7c20ed474d1daaa40bf61b8f31a725a5', //APP SECRET
                            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
                            'accessToken'   : 'EAAYDZAUzwqjgBAGIedte0YrQWbh2QKYZCxuWIMtld3ZC2KNxOuUoEtD6KStwNc85BuOYDYnvGffL81EUeGgaPBvAcy4Uhk6dng4AdhHJmZAa1Q5SJA3RWRd1GKxy9Y43IpZB9v6csn6vIdZBVGska7DPkxpkSgGrk8FuNDns5qsQZDZD'
                            }
    },
    'production':      {   'facebookAuth' : {
                            'pageID'        : '1017561558316747',
                            'clientID'      : '1692583477684792', // your App ID
                            'clientSecret'  : '7c20ed474d1daaa40bf61b8f31a725a5', // your App Secret
                            'callbackURL'   : 'http://www.brantu.com/auth/facebook/callback',
                            'accessToken'   : 'EAAYDZAUzwqjgBAGIedte0YrQWbh2QKYZCxuWIMtld3ZC2KNxOuUoEtD6KStwNc85BuOYDYnvGffL81EUeGgaPBvAcy4Uhk6dng4AdhHJmZAa1Q5SJA3RWRd1GKxy9Y43IpZB9v6csn6vIdZBVGska7DPkxpkSgGrk8FuNDns5qsQZDZD'
                            }
    }
};
