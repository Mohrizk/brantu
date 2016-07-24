var mongoose = require('mongoose');


var Newsletter = mongoose.Schema({
    email          : String    ,
    valid          : Boolean   ,
    available      : Boolean   ,
    user           : {type: mongoose.Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('Newsletter', Newsletter ,'newsletters');