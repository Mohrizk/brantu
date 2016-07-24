var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate');
var User = mongoose.Schema({
        local: {
               email    : String,
               name     : String,
               password : String

        },
        facebook: {
               id       : String,
               token    : String,
               email    : String,
               name     : String,
               picture  : String,
               age      : String
        },
        newsletter:  Boolean,
        createDate:  { type: Date, default: Date.now },
        brands:[{type: mongoose.Schema.Types.ObjectId, ref:'Brand'}]
})
User.plugin(mongoosePaginate);
// methods =====================
// generating a hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', User, 'users');
