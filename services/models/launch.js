var mongoose = require('mongoose');


var Launch = mongoose.Schema({
    email          : String
});

module.exports = mongoose.model('Launch', Launch ,'launch');