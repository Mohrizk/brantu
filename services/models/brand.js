var mongoose = require('mongoose');
var Shop  = require('./shop');
var Brand = mongoose.Schema({
    key : String,
    name  : String,
    shopUrl : String,
    logoUrl : String ,
    logoLargeUrl : String,
    brandFamily  : {key: String ,name: String,shopUrl: String},
    motherBrand:{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
    type: String,//EITHER BRAND OR BRAND FAMILY
    shops: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shop'}],
    numOfProducts: Number,
    genders: [String],
    brandVerified: Boolean, //We need to verify if the added brand before displaying it
    alias: [String] //Aliases of the brand name that we check before creating a new brand
})
module.exports = mongoose.model('Brand', Brand, 'brands');