var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Product  = require('./product');
var Outfit = mongoose.Schema({
    startDate : Date,
    createDate:  { type: Date, default: Date.now },
    creator: String,

    styleProduct: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    styleImage:String,
    stylePrice:String,
    styleBrand:String,
    styleUrl:String,

    priceProduct: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    priceImage:String,
    pricePrice:String,
    priceBrand:String,
    priceUrl:String,

    saving:{ value:String, discount: Number},
    socialMediaIds:{facebook:String, instagram:String},

    name  : String,
    description : String,
    categoryLink : String ,
    categoryName : String ,
    gender: String,
    type:String
})
Outfit.plugin(mongoosePaginate);
module.exports = mongoose.model('Outfit', Outfit, 'outfits');