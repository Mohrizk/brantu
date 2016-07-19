var Categories  = require('../models/category');
var async = require('async');
var options = ['kvinna', 'man'];
var algoliasearch = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');

var lvl1_cancelOut = ['Premium']
var lvl2_cancelOut = [{lvl0:'Kvinna', lvl1:'Kläder',lvl2:['Underkläder']}]

module.exports = {
    //GET CATEGORY TREE
    getCategoryTree: function (req, res, next) {
        var listOfCategories = new Array();

        async.each(options, function(category, callback) {

            async.waterfall([

                function(callback){

                    Categories.findOne({key: category},{'key':1, 'name': 1, breadcrumb: 1}, function (err, mainCategory) {
                        if(err) callback(err);
                        else callback(null, mainCategory);
                    });

                },

                function(mainCategory, callback){
                    if(mainCategory != null){
                        Categories.find({"parentKey": mainCategory.key}, {'key': 1, 'name': 1, breadcrumb: 1},{sort:{name: 1}}).cache().exec( function (err, categorylist) {
                            if(err) callback(err);
                            else{
                                var categorylist = categorylist.filter(function(item)
                                {
                                    return item.name.indexOf(lvl1_cancelOut) == -1;
                                });
                                callback(null, mainCategory, categorylist);
                            }

                        })
                    }
                    else {
                        callback(null, null, null);
                    }
                },

                function(mainCategory, categorylist,  callback){
                    var temp = new Array();
                    if(categorylist != null){
                        async.each(categorylist, function (category, callback) {
                            Categories.find({parentKey: category.key}, {key: 1, name: 1, breadcrumb: 1},{sort:{name: 1}}).cache().exec(function (err, subcategory) {
                                if (err) {callback(err);}
                                else {
                                    if (subcategory != null) {
                                        var index = -1;
                                        for (var c in lvl2_cancelOut){
                                            if(category.name == lvl2_cancelOut[c].lvl1) index = c;
                                        }
                                        var subCategory;
                                        if(index > -1) subCategory= subcategory.filter(function(item) {
                                            return item.name.indexOf(lvl2_cancelOut[index].lvl2) == -1;
                                        });
                                        else subCategory= subcategory
                                        temp.push({'category': category, 'subCategory': subCategory});
                                    }
                                    callback();
                                }

                            });

                        }, function (err) {

                            if (err) {callback(err)}
                            else{
                                listOfCategories.push({department: mainCategory, categories: temp});
                                temp = new Array();
                                callback(null, temp);
                            }

                        });

                    }
                    else callback();


                }
            ], function (err, result) {
                // result now equals 'done'
                callback();
            });

        }, function(err) {
            var sortedCategoryList = [];

            options.forEach(function(option){
                listOfCategories.forEach(function(category){
                    if(category.department.key == option)
                        sortedCategoryList.push(category);
                })
            })

            res.locals.categoryTree = sortedCategoryList;
            next()

        })

    },
    //GET CATEGORY TREE

    getDepartment: function(req, res, next){
        var split = req.url.split('/');
        var key = split[1];

        Categories.findOne({'key': key}).cache().exec( function(err, category) {
            if (err) next(err);
            else{
                if (category != null) {
                    res.locals.selectedDepartment = category.name;
                    next();
                }
                else {
                    var favKey;
                    if(typeof req.session.favDepartment !== 'undefined'){
                        var splitFav = req.session.favDepartment.split('/');
                        favKey = splitFav[1];
                    }
                    else
                       favKey = 'kvinna'


                    Categories.findOne({'key': favKey}).cache().exec( function(err, categoryFav) {
                        if (err) return callback(err);
                        if (categoryFav != null)
                            res.locals.selectedDepartment = categoryFav.name;
                            //breadcrumb.push(category);
                        else res.locals.selectedDepartment = 'kvinna';



                        next();
                    })
                }

            }

        });
    },


    getCategoryUrl_old: function (req, res, next) {
        console.log(req.url);
        console.log(req.query.color);
        var splitUrl = req.url.split('/');
        var key = splitUrl [splitUrl.length - 1];
        var count = 0;
        var theCategory ={};
        /*var breadcrumb= new Array();
        var condition;*/
        async.series([
            function (callback){
                Categories.findOne({'key': key}, function(err, category) {
                    if (err) return callback(err);
                    else{
                        if (category != null)
                            theCategory = category;
                            //breadcrumb.push(category);
                            return callback();
                    }

                });
            }
        ], function (error){
             if(theCategory != null) {
                    res.locals.category = theCategory;
                    res.locals.exposeName  = "category";
                    res.locals.exposeValue = theCategory;
                    res.locals.title = theCategory.name;
                    if(theCategory.breadcrumb != null){
                        console.log('WHY IT DOESNT')
                        if(theCategory.breadcrumb.length > 0)
                            res.locals.selectedDepartment = {name:theCategory.breadcrumb[0].name, key:theCategory.breadcrumb[0].key};
                    }
                }

                next();
        });
    }
}
