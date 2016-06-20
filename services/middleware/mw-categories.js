var Categories  = require('../models/category');
var async = require('async');
var options = ['kvinna', 'man'];

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
                        Categories.find({"parentKey": mainCategory.key}, {'key': 1, 'name': 1, breadcrumb: 1},{sort:{name: 1}}, function (err, categorylist) {
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
                            Categories.find({parentKey: category.key}, {key: 1, name: 1, breadcrumb: 1},{sort:{name: 1}},function (err, subcategory) {
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
       console.log(req.url)
        var split = req.url.split('/');
        var key = split[1];
        Categories.findOne({'key': key}, function(err, category) {
            if (err) next(err);
            else{
                if (category != null) {
                    res.locals.selectedDepartment = category;
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

                    Categories.findOne({'key': favKey}, function(err, categoryFav) {
                        if (err) return callback(err);
                        if (categoryFav != null)
                            res.locals.selectedDepartment = categoryFav;
                            //breadcrumb.push(category);
                        next();
                    })
                }

            }

        });
    },
    //GET BREAD CRUMBS & CHILDREN
    getBreadcrumbAndChildren: function (req, res, next) {
        var splitUrl = req.url.split('/');
        var key = splitUrl [splitUrl.length - 1];
        var count = 0;
        var theCategory ={};
        /*var breadcrumb= new Array();
        var condition;*/
        async.series([
            // GET THE REQUESTED information of the category
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

            // GET THE BEDCRUMBS
            /*function(callback){
                async.whilst(

                        function () {

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

                        callback();
                    }
                );
            },
            Lets get the children ;)
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
            }*/
        ], function (error){

                //if(req.children != null) res.locals.children = req.children;
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

                /*if(breadcrumb !=null) {
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

                }*/
                next();
        });
    }
}
