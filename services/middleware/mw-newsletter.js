var async = require('async')
var fs  = require('fs');
var schedule = require('node-schedule');

var Newsletters  = require('../models/newsletters');
var marketingNewsletter  = require('../models/marketing-newsletter');
var User  = require('../models/user');

var feed       = require('./mw-feed');
var user       = require('./mw-users');
var categories = require('./mw-categories');
var email      = require('./mw-email');

newsletter= {
    //GET CATEGORY TREE
    add: function (email, callback){
        //Check if user have email
        var query = { $or: [ { "local.email": /.*email.*/i }, { "facebook.email": /.*email.*/i } ] }
        User.findOne(query, function(err, existingUser){
            if(err) callback(err)
            else{
                var newEmail;
                if(existingUser != null)
                    newEmail= new Newsletters({ email: email,  available:true,  user: {_id: existingUser.category , ref: 'User'}})
                else
                    newEmail= new Newsletters({ email: email,   available:true})
                var caseSensativeEmail =  new RegExp( '^' + email+'$', 'i');
                Newsletters.findOne({email: caseSensativeEmail}, function(err, existingEmail){
                    if(err) callback(err)
                    else{
                        if(existingEmail != null){
                            existingEmail.available = true;
                            existingEmail.save(function(){callback(null, false)});
                        }
                        else{
                            newEmail.save(function(){
                                callback(null, true);
                            })
                        }
                    }
                })
            }
        })
    },
    sendWeeklyTrial:function(req,res,next) {
        async.eachSeries(newsletterDepartments,function(department, callback){
                feed.getNewsletter(department,function(docs){
                    res.locals.priceCards = docs;
                    next()
                })
        }
        ,function(err){
        })
    },
    sendWeekly:function() {
        var totalEmails = 0, newNewsletter = new marketingNewsletter();
        var rule = new schedule.RecurrenceRule();
        rule.minute = new schedule.Range(0, 59, 1);
        schedule.scheduleJob(rule, function () {
            async.eachSeries(categories.departments,function(department, callback){
                    feed.getNewsletter(department,function(docs){
                        if(docs.length < 3) return callback();
                        newNewsletter.outfits[categories.mapGender(department)] = docs.map(function(outfit){
                            return {_id:outfit._id, ref:'Outfit'}
                        })
                        newNewsletter.save(function(err){
                            newsletter.render({priceCards:docs, department: require('./mw-categories').mapGender(department), id:newNewsletter._id}, function(rendered){
                                user.getNewsletterList(department,function(list){
                                    newNewsletter.users[categories.mapGender(department)]  = list.map(function(l){
                                        return {_id: l.id, ref:'User'};
                                    })
                                    console.log(newNewsletter.users)
                                    totalEmails += list.length;
                                    email.sendNewsLetters(list, rendered, function(response){
                                        callback();
                                    })
                                })
                            })
                        })
                    })
                }
                ,function(err){
                    newNewsletter.save();
                })
        });
    },
    render:function(docs, callback){
        hbs.render("./views/server-side-templates/newsletter.hbs",{priceCards:docs})
            .then(function (rendered) {
                callback(rendered)
            })
            .catch(function(err){ console.log(err)});
    }
}

module.exports = newsletter;