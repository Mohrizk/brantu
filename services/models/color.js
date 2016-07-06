var mongoose = require('mongoose');

var Color = mongoose.Schema({
    key : String,
    displayName  : String,
    hex : String,
    alias : [String]
})
module.exports = mongoose.model('Color', Color, 'colors');