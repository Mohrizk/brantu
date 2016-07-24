
var mongoose = require('mongoose');
var Product  = require('./product');

var marketingNewsletter = mongoose.Schema({
    createDate:  { type: Date, default: Date.now },

    users     :{
        male:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
        female: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
    },

    outfits   :{
        female:[{type: mongoose.Schema.Types.ObjectId, ref:'Outfit'}],
        male:[{type: mongoose.Schema.Types.ObjectId, ref:'Outfit'}],
                },

    totalSent    : Number,
    rebound      :Number,
    opened    : { female: Number, male:Number},

    unsubscribe  : Number
})

marketingNewsletter.methods.getSent = function() {
    return this.outfits['female'].length + this.outfits['male'].length;
};

module.exports = mongoose.model('marketingNewsletter', marketingNewsletter, 'marketing-newsletter');