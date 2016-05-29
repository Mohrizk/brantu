var mongoose = require('mongoose');

var Brand = mongoose.Schema({
    key : String,
    name  : String,
    shopUrl : String,
    logoUrl : String ,
    logoLargeUrl : String,
    brandFamily  :{
        key: String,
        name: String,
        shopUrl: String
    }
})
module.exports = mongoose.model('Brand', Brand, 'brands');