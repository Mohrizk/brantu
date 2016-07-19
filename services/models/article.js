var mongoose = require('mongoose');
var Shop  = require('./shop');
var Article = mongoose.Schema({
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
})
module.exports = mongoose.model('Article', Article, 'articles');