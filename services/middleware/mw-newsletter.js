var Newsletters  = require('../models/newsletters');
var User  = require('../models/user');
module.exports = {
    //GET CATEGORY TREE
    add: function (email, callback) {
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
    }
}