var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Article  = require('./article');
/***
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
});

***/
var Product = mongoose.Schema({
      id              : {
          type: String,
          'default': shortid.generate

      },
      status          : String     , //can be online/offline/pending-review

      name            : String     ,
      shops           : [{type: mongoose.Schema.Types.ObjectId, ref:'Shop'}],
      alias           : [String]   ,

      source          :  String,
      sourceLink      :  String,

      description     : {
          sv: String,
          en: String
      },
      productUrl      :  String    ,
      genders         : [String]   , // To Index
      ageGroups       : [String]   ,
      category        : [{type: mongoose.Schema.Types.ObjectId, ref:'Category'}],

      brand           : {type: mongoose.Schema.Types.ObjectId, ref:'Brand'},
      attributes      : [{_id: false,name: String, value: String}],

      seasonYear      : String     ,
      updateDate      : { type: Date, default: Date.now },
      addDate         : { type: Date, default: Date.now },
      additionalInfos : [String]   ,

      available:[
          {
              _id            : false,
              ean            : String    ,
              color          : { type:String, lowercase:true}   ,
              colorTags      : [String]  ,  //IF THE COLOR IS "MULTICOLOR"
              pictures       : [{smallUrl: String, mediumUrl: String,  largeUrl: String, zoomUrl: String, online:Boolean}],
              country        : [
                  {
                      _id            :  false,
                      name           :  String,
                      sizes          :  [{ type:String, lowercase:true}  ],
                      price          :  Number,
                      originalPrice  :  Number,
                      currency       :  String,
                      discount       :  Number
                  }
              ]
          }
      ],
      reviews         : [{
          author      :   { type:String, lowercase: true }  ,
          review      :   [{ _id:false , lang: String, value:String}],
          date        :   Date,
          online      :   Boolean, //ONLINE OR OFFLINE
      }],
      rating          :   Number,
      articles        :  {type: mongoose.Schema.Types.ObjectId, ref:'Article'},
      levels        :    {type: mongoose.Schema.Types.Mixed}

  });
/**********
 *CREATED FROM CATEGORY BREADCRUMB
 * levels:     {
*    sv:{
*          lvl0: "kvinna",
*          lvl1: "kvinna > kläder"
*          lvl3: "kvinna > kläder > jackor"
*    }
* }
 *
 * ********/
Product.plugin(deepPopulate);
module.exports = mongoose.model('Product', Product ,'products_new');