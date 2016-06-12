var Categories  = require('../models/category');
var async = require('async');
var options = ['kvinna', 'man'];




module.exports = {
    //GET CATEGORY TREE
    getCategoryTree: function (req, res, next) {
        var listOfCategories = new Array();

        async.each(options, function(category, callback) {

            async.waterfall([

                function(callback){

                    Categories.findOne({key: category},{'key':1, 'name': 1}, function (err, mainCategory) {
                        if(err) callback(err);
                        else callback(null, mainCategory);
                    });

                },

                function(mainCategory, callback){
                    if(mainCategory != null){
                        Categories.find({"parentKey": mainCategory.key}, {'key': 1, 'name': 1},{sort:{name: 1}}, function (err, categorylist) {
                            if(err) callback(err);
                            else callback(null, mainCategory, categorylist);

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
                            Categories.find({parentKey: category.key}, {key: 1, name: 1},{sort:{name: 1}},function (err, subcategory) {
                                if (err) {callback(err);}
                                else {
                                    if (subcategory != null) {
                                        temp.push({'category': category, 'subCategory': subcategory});
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
        var name = req.url.substring(1);

        Categories.findOne({'name': name}, function(err, category) {

            if (err) next(err);
            else{
                if (category != null) {
                    res.locals.selectedDepartmentName = category.name;
                    res.locals.selectedDepartmentKey = category.key;
                    res.locals.selectedDepartment = category;
                }
                next();

            }

        });
    },
    //GET BREAD CRUMBS & CHILDREN
    getBreadcrumbAndChildren: function (req, res, next) {
        var splitUrl = req.url.split('/');
        var key = splitUrl [splitUrl.length - 1];
        var count = 0;

        var theCategory ={};
        var breadcrumb= new Array();
        var condition;

        async.series([
            // GET THE REQUESTED information of the category
            function (callback){
                Categories.findOne({'key': key}, function(err, category) {

                    if (err) return callback(err);
                    else{
                        if (category != null) {
                            theCategory = category;
                            //breadcrumb.push(category);
                            condition = category;

                        }
                        return callback();

                    }

                });
            }
            ,
            // GET THE BEDCRUMBS
            function(callback){
                async.whilst(
                        //COndition
                        function () {
                            //console.log(condition)
                            if(condition != null){
                                if(options.indexOf(condition.key) == -1)
                                    return true;
                                else
                                    return  false;

                            }
                            else{
                                return false;
                            }
                        },
                        function (callback) {
                            Categories.findOne({'key': condition.parentKey}, function(err, parentCategory) {
                                count ++;
                                if (err) return callback(err);
                                else{
                                    if (parentCategory != null) {

                                        condition= parentCategory;
                                        breadcrumb.push({name : parentCategory.name, key:parentCategory.key});
                                    }
                                    return callback();

                                }

                            });
                    },
                    function (err) {
                        //req.breadcrumb = breadcrumb;
                        callback();
                    }
                );
            },
            // Lets get the children ;)
            function (callback){
                Categories.find({'key':{$in: theCategory.childKeys}}, function(err, categories) {

                    if (err) return callback(err);
                    else{
                        if (categories != null) {
                            req.children = categories;
                        }
                        return callback();

                    }

                });
            }
        ], function (error){
                console.log(breadcrumb);
                if(req.children != null) res.locals.children = req.children;
                if(theCategory != null) {
                    res.locals.category = theCategory;
                    res.locals.exposeName  = "category";
                    res.locals.exposeValue = theCategory;
                }

                if(breadcrumb !=null) {
                    res.locals.breadcrumb = breadcrumb.reverse();
                    if(breadcrumb.length != 0){
                             res.locals.selectedDepartmentName =  res.locals.breadcrumb [0].name;
                             res.locals.selectedDepartmentKey =  res.locals.breadcrumb [0].key;
                             res.locals.selectedDepartment =  res.locals.breadcrumb [0];
                    }
                    else{
                        res.locals.selectedDepartmentName =  theCategory.name;
                        res.locals.selectedDepartmentKey = theCategory.key;
                        res.locals.selectedDepartment = theCategory;
                    }

                }
                next();
        });
    }
}
