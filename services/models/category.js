var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
mongoosePaginate.paginate.options = {
    lean:  true,
    limit: 20
};
var Category = mongoose.Schema({
    key                   :  {type: String, required: true},
    name                  :  {type: String, required: true} ,           // Human Name of the category
    parentKey             :  {type: String, required: true},
    childKeys             :  [String],
    type                  :  String ,           // Url Name of the category
    outlet                :  Boolean, //(boolean, optional): Containing articles are from last seasons ,
    hidden                :  Boolean,  //(boolean, optional): The category is hidden and not shown on the Zalando web shop ,
    targetGroup           :  String, //  (string): The target group of the articles from this category = ['ALL', 'WOMEN', 'MEN', 'KIDS'],
    suggestedFilters      :  [String] //(Array[string]): list of filter names that are reasonable to use within this category
})
Category.plugin(mongoosePaginate);
module.exports = mongoose.model('Category', Category, 'categories');