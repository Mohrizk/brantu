var Outfits  = require('../models/outfit');
var Product  = require('../models/product');
var https = require('https');
var request = require('request')
var FormData = require('form-data');
var config  = require('../../config/auth.js');
var fs = require('fs')
var FB = require('fb');


module.exports = {
    facebook:{
        getAccessToken:function(req,res,next){
            //GET MANUAL ACCESS TOKEN GO TO https://developers.facebook.com/tools/explorer/
            FB.api('oauth/access_token', {
                client_id: config.development.facebookAuth.clientID,
                client_secret: config.development.facebookAuth.clientSecret,
                grant_type: 'fb_exchange_token',
                fb_exchange_token: config.development.facebookAuth.accessToken
            }, function (res) {
                if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }
                var accessToken = res.access_token;
                var expires = res.expires ? res.expires : 0;
                console.log('ACCESS TOKE FOREVER', accessToken)
                config.development.facebookAuth.accessToken = res.access_token;
                FB.setAccessToken(res.access_token);
                next();
            });
        },
        publishPost:function(req, res, next){
            FB.setAccessToken(config.development.facebookAuth.accessToken);
            var body = 'My first post using facebook-node-sdk';
            FB.api(config.development.facebookAuth.pageID+'/feed', 'post', { message: body }, function (res) {
                if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }
                console.log('Post Id: ' + res.id);
                next()
            });
        },
        deletePost:function(req, res, next){
            FB.setAccessToken(config.development.facebookAuth.accessToken);
            console.log(req.params.id)
            var postId = req.params.id ;
            FB.api(postId, 'delete', function (res) {
                    if(!res || res.error) {
                        console.log(!res ? 'error occurred' : res.error);
                        return;
                    }
                    console.log('Post was deleted');
                    next();
            });
        },
        publishPriceCard:function(req, res, next){
            if(!req.priceCardCreated){
                return next();
            }
            if(!req.pictureCreated){
                req.message = 'error: problem with facebook upload, please consult admin ';
                return next();
            }

            console.log('https://graph.facebook.com/'+config.development.facebookAuth.pageID+'/photos?access_token=' + config.development.facebookAuth.accessToken)
            var form = new FormData(); //Create multipart form
            form.append("file", fs.createReadStream('./public/images/pricecard.jpg'));
            form.append("message", req.priceCard.description)
            //form.append("feed_targeting", ""+{genders:[mapGenderSocial(req.priceCard.gender ,'facebook')]}+"");
            form.append("published", "false")
            form.append("scheduled_publish_time",Math.floor(req.priceCard.startDate/ 1000))
            var options = {
                method: 'post',
                host: 'graph.facebook.com',
                path: '/'+config.development.facebookAuth.pageID+'/photos?access_token='+config.development.facebookAuth.accessToken,
                headers: form.getHeaders(),
            }
            var request = https.request(options, function (response){
                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    var parsed = JSON.parse(body);
                    console.log( body);
                    if(body=='' || parsed.error) {
                        req.message = 'error: facebook Upload '+parsed.error;
                        return next();
                    }
                    console.log( parsed);
                    req.priceCard.socialMediaIds.facebook = parsed.id;
                    req.priceCard.save(function(err){
                        return next();
                    });
                });
            });

            form.pipe(request);
            request.on('error', function (error) {
                console.log(error);
                req.message = 'error: problem with facebook upload, please consult admin ';
                return next();
            });
        },
        readPublishedPost:function(req, res, next){
            FB.setAccessToken(config.development.facebookAuth.accessToken);
            var body = 'My first post using facebook-node-sdk';
            FB.api('me/feed', 'post', { message: body }, function (res) {
                if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }
                console.log('Post Id: ' + res.id);
                next()
            });
        },
        readUnpublishedPost:function(req, res, next){
            FB.setAccessToken(config.development.facebookAuth.accessToken);
            var body = 'My first post using facebook-node-sdk';
            FB.api('me/feed', 'post', { message: body }, function (res) {
                if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }
                console.log('Post Id: ' + res.id);
                next()
            });
        },
    }
}



function mapGenderSocial( string,media){
    if(string.match(/kvinna/i) || string.match(/female/i)){
        switch (media){
            case 'facebook':
                return 2;
        }
    }
    else if(string.match(/man/i) || string.match(/men/i)|| string.match(/male/i)){
        switch (media){
            case 'facebook':
                return 1;
        }
    }
}


