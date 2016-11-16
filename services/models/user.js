var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}
var mongoosePaginate = require('mongoose-paginate');

var User = mongoose.Schema({
        local: {
               email    : String,
               name     : String,
               password : String,
        },
        facebook: {
               id       : String,
               token    : String,
               email    : String,
               name     : String,
               picture  : String,
               age      : String
        },
        resetPasswordToken     : String,
        resetPasswordExpires   : Date,
        chromeId               : [String],
        safariId               : [String],
        role                   :  String,
        newsletter             :  Boolean,
        createDate             :  { type: Date, default: Date.now },
        brands                 :  [{type: mongoose.Schema.Types.ObjectId, ref:'Brand'}],
        products               :  [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
        viewedProducts         :  [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
        cart                   :  [{
                             product : {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
                             shops   :[{
                                 shop    : {type: mongoose.Schema.Types.ObjectId, ref:'Shop'},
                                 units   : [{
                                     color   : String,
                                     size    : [String],
                                     nbUnits :  Number
                                 }]
                             }]
                       }]
});

User.plugin(mongoosePaginate);
// methods =====================
// generating a hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.createToken = function(callback) {
    var user = this;
    crypto.randomBytes(20, function(err, buf) {
        user.resetPasswordToken =  buf.toString('hex');
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save(function(err) {
            callback()
        });
    });
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User, 'users');
