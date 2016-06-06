var mongoose = require('mongoose');

var Shop = mongoose.Schema({
    name  : String,
    shopUrl : String,
    logoUrl : String ,
    logoLargeUrl : String,
    commission  : Number,
    shippingCosts  : String    ,
    DeliveryTime   : String    ,
    network: String,
    programID: String
})

module.exports = mongoose.model('Shop', Shop, 'shops');