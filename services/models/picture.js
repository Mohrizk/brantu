var mongoose = require('mongoose');


var Picture = mongoose.Schema({
    brantuId       : String    ,
    productId      : String    ,
    shop           : {type: mongoose.Schema.Types.ObjectId, ref:'Shop'}  ,
    mainPicture    : { smallUrl: String, mediumUrl: String,  largeUrl: String, zoomUrl: String}   ,
    auxPictures    : [{smallUrl: String, mediumUrl: String,  largeUrl: String, zoomUrl: String}]  ,
    imageLocations : [Number]
})

module.exports = mongoose.model('Picture', Picture ,'pictures');