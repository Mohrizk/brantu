var mongoose = require('mongoose');
var Shop  = require('./shop');
/*var Article = mongoose.Schema({
    shops:[
        {
            shop     : {type: mongoose.Schema.Types.ObjectId, ref:'Shop'},
            units    :[{
                sku            :  String  ,
                color          :  String  ,
                articleUrl     :  String  ,

                price      :    {currency: String, value: Number, formatted: String},
                originalPrice  :{currency: String, value: Number, formatted: String},
                sale           : Boolean,
                discount       : Number,

                sizes          : [String],
                quantity       :  Number,
                updateDate     : { type: Date, default: Date.now },
                addDate        : { type: Date, default: Date.now }
            }]
        }
    ]
})*/

var Article = mongoose.Schema({
       shops:[{
                  shop     : {type: mongoose.Schema.Types.ObjectId, ref:'Shop'},
                  units    :[{

                      //autDiscovered
                      //true: means that weather it was discovered by the crawler or product sheet and initially was placed in Queue
                      //false: it was manually added
                      autoDiscovered: Boolean,

                      //SHOP GIVEN NAME | COLOR | BRAND | CATEGORY | CATEGORY PATH | SKU
                      shopName          :  String  ,
                      shopCategory      :  String  ,
                      shopCategoryPath  :  String  ,

                      shopBrand         :  String  ,

                      sku               :  String  ,

                      //Mapped color
                      color             :  String  ,
                      colorTags         :  [String]   ,
                      shopPictures      :  [ String]  ,

                      country        : [{
                          name            :  {type:String , required: true}   ,
                          inStock         : Boolean,

                          shopDescription :  String  , // A unit Can have a different descriptions per country
                          shopColor       :  String  ,

                          pjUrl           :  {type:String , required: false} ,
                          webUrl          :  {type:String , required: false} , //NEEDED FOR SCRAP
                          articleUrl      :  {type:String , required: false}   , //PAYING LINK (IN case if we dont have a

                          // paying customer, webLink = articleLink
                          price           :  {type:Number , required: true} ,
                          originalPrice   :  Number,
                          currency        :  {type:String , required: true} ,

                          discount        :  Number,
                          sizes           :  [String],
                          quantity        :  Number,
                          rating          :  Number,
                          reviews         :  [{
                              _id         :   false,
                              author      :   String,
                              review      :   String,
                              date        :   Date
                          }]
                      }],

                      //SHOP GIVEN NAME| CATEGORY | CATEGORY PATH | SKU
                      updateDate     : { type: Date, default: Date.now },
                      addDate        : { type: Date, default: Date.now },
                      //the  date that the product has been discovered
                      discoverDate        : { type: Date, default: Date.now }
                  }]
              }
          ]
      });
module.exports = mongoose.model('Article', Article, 'articles_new');