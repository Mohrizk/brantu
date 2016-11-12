var mongoose = require('mongoose');
var shopCategoryPages = mongoose.Schema({

	name: String,
	content: {}
});
module.exports = mongoose.model('shopCategoryPages', shopCategoryPages, 'shop_category_pages');