var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
    lean:  true,
    limit: 20
};

var Product = mongoose.Schema({
    productId      : String    ,
    modelId        : String    ,
    name           : String    ,
    shop           : {type: mongoose.Schema.Types.ObjectId, ref:'Shop'}    ,
    shopUrl        : String    ,
    color          : String    ,
    available      : Boolean   ,

    genders        : [String]  , // To Index
    ageGroups      : [String]  ,

    categoryKeys   : [String]  , // To Index
    categories     : {lvl0: String, lvl1: String,lvl2: String, lvl3: String, lvl4: String},
    brand          : {type: mongoose.Schema.Types.ObjectId, ref:'Brand'},

    shippingCosts  : String    ,
    DeliveryTime   : String    ,

    //****ATTRIBUTES*****//
    attributes     : [{name: String, value: [String]}],

    season         :  String   ,
    seasonYear     :  String   ,
    activationDate :  String   , // To Index
    additionalInfos: [String]  ,

    mainPicture    : { smallUrl: String, mediumUrl: String,  largeUrl: String}   ,
    auxPictures    : [{smallUrl: String, mediumUrl: String,  largeUrl: String}]  ,

    price          :{currency: String, value: Number, formatted: String},
    originalPrice  :{currency: String, value: Number, formatted: String},
    sale           : Boolean,

    sizes          : [String],
    units          : [{ sku : String, size: String}], // To Index
    rating         :  String
})
Product.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', Product ,'products');