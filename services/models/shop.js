var mongoose = require('mongoose');

var Shop = mongoose.Schema({
    name  : String,
    shopUrl : String,
    logoUrl : String ,
    logoLargeUrl : String,
    commission  : Number,
    shipping    : [
        {
            country  :    String,
            standard :    {value:Number,   currency:String, delivery: String},
            express  :    {value:Number,   currency:String, delivery:String},
            return   :    {free: Boolean, period:String},
            freeStandard: {value:Number, currency:String}
        }
    ]   ,
    network: String,
    programID: String
})

module.exports = mongoose.model('Shop', Shop, 'shops');