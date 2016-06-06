var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
    lean:  true,
    limit: 20
};

var Product = mongoose.Schema({

    brantuId       : String    ,
    productId      : String    ,
    modelId        : String    ,
    name           : String    ,
    description    : String    ,
    productUrl     : String    ,
    color          : String    ,
    shop           : {type: mongoose.Schema.Types.ObjectId, ref:'Shop'}    ,

    available      : Boolean   ,

    genders        : [String]  , // To Index
    ageGroups      : [String]  ,

    category     : {type: mongoose.Schema.Types.ObjectId, ref:'Category'},

    brand          : {type: mongoose.Schema.Types.ObjectId, ref:'Brand'},
    brandVerified   : Boolean   ,

    //****ATTRIBUTES*****//
    attributes     : [{name: String, value: [String]}],

    season         :  String   ,
    seasonYear     :  String   ,
    activationDate :  String   , // To Index
    updateDate     : {year: Number, month: Number, day: Number},
    addDate        : {year: Number, month: Number, day: Number},
    additionalInfos: [String],

    picture        : {type: mongoose.Schema.Types.ObjectId, ref:'Picture'},
    mainPicture    : { smallUrl: String, mediumUrl: String,  largeUrl: String, zoomUrl: String}   ,
    auxPictures    : [{smallUrl: String, mediumUrl: String,  largeUrl: String, zoomUrl: String}]  ,
    imageLocations : [Number],

    price          :{currency: String, value: Number, formatted: String},
    originalPrice  :{currency: String, value: Number, formatted: String},
    sale           : Boolean,

    sizes          : [String],

    units          : [{ sku : String, size: String}], // To Index
    rating         :  String
})
Product.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', Product ,'products');