var Categories  = require('../models/category');
var async = require('async');
var options = [];
var shared = require('../../public/javascripts/helper');


var lvl1_cancelOut = ['Premium', 'Sport &amp; träning', 'Outlet']
var lvl2_cancelOut = [
    {lvl0:'Kvinna', lvl1:'Kläder',lvl2:['Sportkläder']},
    {lvl0:'Kvinna', lvl1:'Accessoarer',lvl2:['Paraplyer']},
    {lvl0:'Kvinna', lvl1:'Skor',lvl2:['Outdoorskor','Skotillbehör', 'Slip-ins & clogs', 'Snörskor', 'Sportskor']},
    {lvl0:'Kvinna', lvl1:'Outlet',lvl2:['Premium', 'Skönhet','Sport &amp; träning']},
    {lvl0:'Kvinna', lvl1:'Skönhet',lvl2:['Mamma', 'Spa']},
    {lvl0:'Kvinna', lvl1:'Sport &amp; träning',lvl2:[ 'Ryggsäckar', 'Utrustning','Väskor']},

    {lvl0:'Man', lvl1:'Accessoarer',lvl2:[ 'Hörlurar']},
    {lvl0:'Man', lvl1:'Outlet',lvl2:[ 'Skönhet']},
    {lvl0:'Man', lvl1:'Skönhet',lvl2:[ 'Dofter','Kroppen', 'Solprodukter']},
    {lvl0:'Man', lvl1:'Kläder',lvl2:[ 'Träningskläder']},
    {lvl0:'Man', lvl1:'Skor',lvl2:[ 'cc.3519.name', 'TOFFLOR & INNESKOR','Outdoorskor', 'Skotillbehör', 'Tofflor & inneskor', 'Tofflor &amp; inneskor','Solprodukter']},

]
category= {
    departments :{
        sv: ['kvinna', 'man']
    } ,
    getSitemapCategories: function (req, res, next)  {
        Categories.find({}).lean().cache('300000s').exec( function(err, categories) {
            if (err) return next(err);
            if (categories.length == 0) return next();
            req.categoryList = categories.filter(function(category){
                if(typeof category.numOfProducts == 'undefined') return false;
                if(category.numOfProducts > 0
                    && category.name.toLowerCase()!=='kvinna'
                    && category.name.toLowerCase()!=='man')
                    return true;
                else false;
            }).map(function(category){
                return category.url = shared.helper.breadCrumbToUrl(category.breadcrumb);
            })
            //console.log(req.categoryList);
            next()
        });
    },
    getCategoryTree: function (req, res, next) {
        var listOfCategories = [];
        async.each( category['departments'][res.locals.LANG] , function(category, callback) {
            async.waterfall([
                function(callback){
                    Categories.findOne({key: category}, {'key':1, 'name': 1, breadcrumb: 1}).lean().cache('300000s').exec(function (err, mainCategory) {
                        if(err) callback(err);
                        else {
                            callback(null, mainCategory)
                        };
                    });
                },
                function(mainCategory, callback){
                    if(mainCategory != null){
                        Categories.find({"parentKey": mainCategory.key},
                            {'key': 1, 'name': 1, breadcrumb: 1},{sort:{name: 1}}).lean().cache('300000s').exec( function (err, categorylist) {
                            if(err) callback(err);
                            else{
                                var categorylist = categorylist.filter(function(item)
                                    {
                                        return lvl1_cancelOut.indexOf(item.name) == -1;
                                    })
                                    .map(function(item){
                                        item.url = shared.helper.breadCrumbToUrl(item.breadcrumb)
                                        return item;
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
                    var temp = [];
                    if(categorylist != null){
                        async.eachSeries(categorylist, function (category, callback) {
                            Categories.find({parentKey: category.key}, {key: 1, name: 1, breadcrumb: 1},{sort:{name: 1}}).lean().cache('300000s').exec(function (err, subcategory) {
                                if (err) {callback(err);}
                                else {
                                    if (subcategory != null) {
                                        var index = -1;
                                        for (var c in lvl2_cancelOut){
                                            if(category.name === lvl2_cancelOut[c].lvl1 && lvl2_cancelOut[c].lvl0 === category.breadcrumb[0].name){
                                                index = c;
                                            }
                                        }
                                        var subCategory;
                                        if(index > -1){
                                            subCategory = subcategory.filter(function(item) {
                                                return lvl2_cancelOut[index].lvl2.indexOf(item.name) == -1;
                                            });
                                        }
                                        else subCategory= subcategory;

                                        subCategory = subCategory.map(function(item){
                                            //for(var v in item.breadcrumb) console.log(item.breadcrumb[v].name);
                                            item.url = shared.helper.breadCrumbToUrl(item.breadcrumb)
                                            //console.log(item.url)
                                            return item;
                                        });
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
                callback();
            });
        }, function(err) {
            /*var sortedCategoryList = [];
             category['departments'].forEach(function(option){
             listOfCategories.forEach(function(category){
             if(category.department.key == option)
             sortedCategoryList.push(category);
             })
             })*/
            listOfCategories.sort(function(a,b){
                var A = a.department.key;
                var B = b.department.key;
                if (A < B){
                    return -1;
                }else if (A > B){
                    return  1;
                }else{
                    return 0;
                }
            })
            res.locals.categoryTree = listOfCategories;
            next()

        })

    },
    getDepartment: function(req, res, next){
        if(typeof req.params.department !=='undefined'){
            res.locals.selectedDepartment = req.params.department;
        }
        else{
            if(req.url.split('/')[1].match(/(?:kvinna|man)/i)){
                res.locals.selectedDepartment = req.url.split('/')[1].toLowerCase();
            }
            else{
                if(req.session.favDepartment !== null && typeof req.session.favDepartment !== 'undefined')
                {    res.locals.selectedDepartment = req.session.favDepartment.replace( /(?:\/)/g,"");}
                else {
                    res.locals.selectedDepartment = null;
                }
            }
        }

        next()
    }
}
module.exports = category;