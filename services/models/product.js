var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Article  = require('./article');
var Product = mongoose.Schema({
    ean            : String    ,
    mpn            : String    ,
    name           : String    ,
    description    : String    ,
    productUrl     : String    ,

    available      : Boolean   ,
    genders        : [String]  , // To Index
    ageGroups      : [String]  ,
    category       : {type: mongoose.Schema.Types.ObjectId, ref:'Category'},

    brand          : {type: mongoose.Schema.Types.ObjectId, ref:'Brand'},
    brandVerified  : Boolean   ,

    attributes     : [{name: String, value: String}],

    season         :  String   ,
    seasonYear     :  String   ,
    activationDate :  String   , // To Index
    updateDate     :  { type: Date, default: Date.now },
    addDate        :  { type: Date, default: Date.now },
    additionalInfos: [String] ,

    color          : String    ,
    otherColors    : [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
    sizes          : [String]  ,

    picture        : {type: mongoose.Schema.Types.ObjectId, ref:'Picture'},
    mainPicture    : { smallUrl: String, mediumUrl: String,  largeUrl: String, zoomUrl: String}   ,
    auxPictures    : [{smallUrl: String, mediumUrl: String,  largeUrl: String, zoomUrl: String}]  ,

    price          :{currency: String, value: Number, formatted: String},
    originalPrice  :{currency: String, value: Number, formatted: String},
    sale           : Boolean,
    discount       : Number,

    articles       : {type: mongoose.Schema.Types.ObjectId, ref:'Article'},
    rating         :  String,
    navigate       :  Boolean
})


Product.plugin(deepPopulate);

module.exports = mongoose.model('Product', Product ,'products');