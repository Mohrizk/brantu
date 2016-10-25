var renderHelper = {
    mapGender   :function (string){
        var str = string.toLowerCase()
        var women = ['kvinna','women','female']
        var men = ['men','man','male']
        for(var w in women){
            if(women[w] === str) return 'female'
        }
        for(var m in men){
            if(men[m] === str) return 'male'
        }

    },
    encodeDepartment   :function (string){
        if(typeof string == 'undefined') return null;
        var str = string.toLowerCase()
        var women = ['kvinna','women','female']
        var men = ['men','man','male']
        for(var w in women){
            if(women[w] === str) return 'WOMEN'
        }
        for(var m in men){
            if(men[m] === str) return 'MEN'
        }

    },
    decodeDepartment: function (gender, lang){
        if(typeof gender == 'undefined' || typeof lang == 'undefined') return null;
        if(gender == 'WOMEN'){
            switch (lang){
                case 'sv': return 'kvinna';
            }
        }
        else if(gender == 'MEN'){
            switch (lang){
                case 'sv': return 'man';
            }
        }

    },

    breadCrumbToUrl: function(array){
        //console.log(array)
        var path=''
        for(var i = 0; i<2;i++) {
            if(typeof array[i] !== 'undefined' && array[i] !==null)
                path += '/' + renderHelper.urlFriendly(array[i].name);
        }
        path+= '/';
        if(array.length> 2) {
            array = array.splice(2, array.length-1);
            var temp = ''
            for (var p = 0; p < array.length; p++) {
                if (p < array.length - 1)temp += renderHelper.urlFriendly(array[p].name) + '.';
                else temp += renderHelper.urlFriendly(array[p].name);
            }
            path += temp+'/';
        }
        //console.log(path)
        return path;
    },
    urlFriendly:function (string, leaveDot){
        var newString = string.toLowerCase()
            .replace(/[\/\*\+\-\?\=\)\(\}\{\<\>_]/g," ")
            .replace(/(?:\')/g,"")
            .replace(/(?:\ \ )/g," ");

        if(typeof leaveDot !== 'undefined'){
            return newString.replace(/(?:\ )/g,"-").replace(/(?:\&)/g,"˜");
        }
        else{
            return newString.replace(/\./g, " ").replace(/(?:\ )/g,"-").replace(/(?:\&)/g,"˜");
        }
    },
    decodeUrlFriendly:function (string){
        return string.replace(/(?:\-)/g,' ').replace(/\˜/g,"&")
    },

    //ENCODE THE STATE TO URL
    stateToUrlCategory:function(helper, currentState){
        var theState =  helper.getState(['query', 'attribute:*']);
        var path ='', query='';
        if (typeof theState["hierarchicalFacetsRefinements"] == 'undefined')  return '';
        if (typeof theState["hierarchicalFacetsRefinements"]['products'] == 'undefined') return '';
        var pathArray = theState["hierarchicalFacetsRefinements"]['products'][0].split(' > ')
        for(var i = 0; i<2;i++) {
            if(typeof pathArray[i] !== 'undefined' && pathArray[i] !==null)
                path += '/' + renderHelper.urlFriendly(pathArray[i]);
        }
        path+= '/';
        if(pathArray.length> 2) {
            pathArray = pathArray.splice(2, pathArray.length-1);
            var temp = ''
            for (var p = 0; p < pathArray.length; p++) {
                if (p < pathArray.length - 1)temp += renderHelper.urlFriendly(pathArray[p]) + '.';
                else temp += renderHelper.urlFriendly(pathArray[p]);
            }
            path += temp+'/';
        }
        query = renderHelper.stateToUrlQuery(helper, currentState)
        if(query !== '') path+= '?'+query;
        return path;
    },
    stateToUrlBrand:function(helper, currentState){
        var theState =  helper.getState(['query', 'attribute:*']);
        var path ='', query='';
        if (typeof theState["disjunctiveFacetsRefinements"] == 'undefined')  return '';
        if (typeof theState["disjunctiveFacetsRefinements"]['brand.name'] == 'undefined') return '';
        path+='/märken/'+ renderHelper.urlFriendly(theState["disjunctiveFacetsRefinements"]['brand.name'][0]) +'/'
        query = renderHelper.stateToUrlQuery(helper, currentState)
        if(query !== '') path+= '?'+query;
        return path;
    },
    stateToUrlSearch:function(helper, currentState){
        var query = renderHelper.stateToUrlQuery(helper, currentState);
        var path ='/sök/';
        if(query !== '') path+= '?'+query;
        return path;
    },
    stateToUrlQuery:function(helper, currentState){
        var uri = '';
        var object =  helper.getState(['query', 'attribute:*']);
        if(typeof object.query !== 'undefined' && object.query!== '' && currentState.search) uri+= 'q='+object.query;
        if (typeof object.hierarchicalFacetsRefinements !== 'undefined' && !currentState.category) {
            if (typeof object.hierarchicalFacetsRefinements['products'] !== 'undefined') {
                var newString = object.hierarchicalFacetsRefinements['products'][0].split(' > ').join('.');
                uri+= '&category='+renderHelper.urlFriendly(newString,true);
            }
        }

        if (typeof object.disjunctiveFacetsRefinements !== 'undefined') {
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('discount')) {
                for (var c in object.disjunctiveFacetsRefinements.discount)
                    uri+= '&discount='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements.discount[c]);

            }
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('brand.name') && !currentState.brand) {
                for (var c in object.disjunctiveFacetsRefinements['brand.name'])
                    uri+= '&brand='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["brand.name"][c]);
            }
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('style')) {
                for (var c in object.disjunctiveFacetsRefinements['style'])
                    uri+= '&style='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["style"][c]);
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('fit')) {
                for (var c in object.disjunctiveFacetsRefinements['fit'])
                    uri+= '&fit='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["fit"][c]);

            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('material')) {
                for (var c in object.disjunctiveFacetsRefinements['material'])
                    uri+= '&material='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["material"][c]);

            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('color')) {
                for (var c in object.disjunctiveFacetsRefinements.color)
                    uri+= '&color='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["color"][c]);
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('shops')) {
                for (var c in object.disjunctiveFacetsRefinements['shops'])
                    uri+= '&shop='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["shops"][c]);
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('sizes')) {
                for (var c in object.disjunctiveFacetsRefinements.sizes)
                    uri+= '&size='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["sizes"][c]);
            }
        }

        if (typeof object.numericRefinements !== 'undefined') {
            if (object.numericRefinements['price.value'] !== 'undefined') {
                var o = object.numericRefinements['price.value'];
                if(typeof o['>']!=='undefined') uri+= '&priceFrom='+ o['>'][0];
                if(typeof o['<']!=='undefined') uri+= '&priceTo='+ o['<'][0];
            }
        }

        if (typeof object['facetsRefinements'] !== 'undefined') {
            if (typeof object['facetsRefinements']['sale'] !== 'undefined') {
                uri+= '&sale='+ renderHelper.urlFriendly(object.facetsRefinements["sale"][0]);
            }

            if (typeof object['facetsRefinements']['compare'] !== 'undefined') {

                uri+= '&compare='+ renderHelper.urlFriendly(object.facetsRefinements["compare"][0]);
            }
        }
        //CHECK SORT
        var index = helper.getIndex();
        uri+= renderHelper.mapSorting(index, 'toUrl')
        //Page
        if(helper.getPage() > 0)uri+= '&page='+helper.getPage();
        return uri;
    },

    //DECODE THE URL TO STATE
    urlToStateCategory:function(url, helper){
        helper.clearRefinements().setQuery('');
        var splitted = url.split('?'), href = splitted[0], query = splitted[1];
        if(href.charAt(0) =='/')href = href.slice(1, href.length);
        if(href.charAt(href.length-1) =='/') href = href.slice(0, href.length-1);
        var path = href.split('/'), currentState, type, category;
        currentState= {brand: false, category:true, search:false}
        type  = "category";

        category = path[0]+' > '+path[1];
        if(path[2] !== null && typeof path[2] !== 'undefined'){
            var styles =  path[2].split('.').join(' > ');
            category += ' > '+styles;
        }
        category = renderHelper.decodeUrlFriendly(decodeURI(category))
        helper.toggleRefinement('products', category);
        renderHelper.urlToStateQuery(query, helper)
        return {currentState : currentState, type: type}
    },
    urlToStateBrand:function(url, helper){
        helper.clearRefinements().setQuery('');
        var splitted = url.split('?'), href = splitted[0], query = splitted[1];
        if(href.charAt(0) =='/')href = href.slice(1, href.length);
        if(href.charAt(href.length-1) =='/') href = href.slice(0, href.length-1).toLowerCase();
        var path = href.split('/'), currentState, type, category;
        currentState= {brand: true, category:false, search:false};
        type = "brand";
        helper.addDisjunctiveFacetRefinement('brand.name', renderHelper.decodeUrlFriendly(path[path.length-1]));

        if(path.length >2){
            helper.toggleRefinement('products', renderHelper.decodeUrlFriendly(path[0]));
        }
        renderHelper.urlToStateQuery(query, helper)
        return {currentState : currentState, type: type}

    },
    urlToStateSearch:function(url, helper){
        helper.clearRefinements().setQuery('');
        var splitted = url.split('?'), href = splitted[0], query = splitted[1];
        if(href.charAt(0) =='/')href = href.slice(1, href.length);
        if(href.charAt(href.length-1) =='/') href = href.slice(0, href.length-1);
        var path = href.split('/'), currentState, type, category;
        currentState= {brand: false, category:false, search:true}
        type  = "search"
        if(path.length >1){
            helper.toggleRefinement('products', renderHelper.decodeUrlFriendly(path[1]));
        }
        renderHelper.urlToStateQuery(query, helper)
        return {currentState : currentState, type: type}
    },
    urlToStateQuery:function(query, helper){
        //LETS CHECK THE QUERY
        if(typeof query !=='undefined')
        {
            var querySplit  = query.split('&');
            querySplit.forEach(function(q){
                var qSplit = q.split('='), qName = qSplit[0], qValue = qSplit[1];
                switch (qName){
                    case 'q':
                        if(qValue!=='')
                            helper.setQuery(qValue);
                        break;
                    case 'brand':
                        helper.addDisjunctiveFacetRefinement('brand.name', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'style':
                        helper.addDisjunctiveFacetRefinement('style', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'fit':
                        helper.addDisjunctiveFacetRefinement('fit', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'material':
                        helper.addDisjunctiveFacetRefinement('material', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'size':
                        helper.addDisjunctiveFacetRefinement('sizes', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'discount':
                        helper.addDisjunctiveFacetRefinement('discount', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'color':
                        helper.addDisjunctiveFacetRefinement('color', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'shop':
                        helper.addDisjunctiveFacetRefinement('shops', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'sale':
                        helper.addFacetRefinement('sale', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'compare':
                        helper.addFacetRefinement('compare', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'priceFrom':
                        helper.addNumericRefinement('price.value','>', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'priceTo':
                        helper.addNumericRefinement('price.value','<', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'page':
                        helper.setPage(renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'sort':
                        helper.setIndex(renderHelper.mapSorting(qValue, 'fromUrl'));
                        break;
                    case 'category':
                        var categoryValue = renderHelper.decodeUrlFriendly(qValue).split('.').join(' > ')
                        helper.clearRefinements('products').toggleRefinement('products', categoryValue);
                        break;
                }
            })
        }
    },


    mapSorting:function(value, indicator){
        var returned;
        if(indicator == 'fromUrl'){
            switch(value){
                case 'high_price':
                    returned =  'test_products_high_price';
                    break;
                case 'discount':
                    returned = 'test_products_discount';
                    break;
                default:
                    returned = 'test_products';
                    break;
            }
        }
        else{
            if(indicator == 'toUrl'){
                switch(value){
                    case 'test_products_high_price':
                        returned = '&sort=high_price';
                        break;
                    case  'test_products_discount':
                        returned = '&sort=discount';
                        break;
                    case  'test_products':
                        returned = '';
                        break;
                    default:
                        returned = '';
                        break;
                }
            }
        }
        return returned;
    },
    getSortingOptions:function(currentIndex){
        var sort = [
             {
                 "name": "Pris lågt-högt",
                 "value": "test_products",
                 "isRefined": false
             },
             {
                 "name": "Pris högt-lågt",
                 "value": "test_products_high_price",
                 "isRefined": false
             },
             {
                 "name": "Högst rea",
                 "value": "test_products_discount",
                 "isRefined": false
             }
         ];
        for(var x in sort){
            if(currentIndex == sort[x].value){
                sort[x].isRefined = true;
            }
        }
        return sort;
    },

    mapColor: function (array, values) {
        var x = [];
        for (var a in array) {
            for (var b in values) {
                if (array[a].name == values[b].displayName.toLowerCase()) {
                    array[a].hex = values[b].hex;
                    x.push(array[a]);
                }
            }
        }
        return x;
    },
    mapWithout: function (array, values) {
        var x = [];
        for (var a in array) {
            for (var b in values) {
                if (array[a].name !== values[b]) {
                    x.push(array[a]);
                }

            }
        }

        return x;
    },
    categoryRefinement: function (categoryContent, breadcrumb, headerText) {
        var breadcrumbHref = [], returnArray = [], data = categoryContent[0].data;
        var maxB =0, maxC= 0;
        for (var b = 0; b < breadcrumb.length + 1; b++) {
            var c = 0, isRefined = false;
            if (data != null) {
                while (!isRefined) {
                    if (data[c].isRefined) {
                         maxB= b, maxC=0;
                        if (b < breadcrumb.length && data[c].data != null) breadcrumbHref.push({
                            name: data[c].name,
                            path: data[c].path,
                            count: data[c].count
                        })
                        if (data[c].data == null) {
                            returnArray = data.map(function (da) {
                                if (data[c].name == da.name)   da.class = 'sbold text-spaced active';
                                else   da.class = '';
                                return da;
                            })
                            data = null;
                            isRefined = true;
                        }
                        else {
                            returnArray.length = 0;
                            data = data[c].data;
                            isRefined = true;
                        }
                    }
                    else {
                        if (data.length - 1 <= c) isRefined = true
                        returnArray.push({name: data[c].name, path: data[c].path, count: data[c].count})
                        c++;
                    }
                }
            }
        }
        if(maxB ==0 && maxC==0){
            //remove duplicates
            var uniqueArray = [];
            for(var r in returnArray){
                var isFound = false;
                for(var u in uniqueArray){
                    if(uniqueArray[u].name == returnArray[r].name){ isFound = true;}
                }
                if(!isFound)uniqueArray.push(returnArray[r]);
            }
            returnArray=uniqueArray;
        }
        return {childCategories: returnArray, breadCrumb: breadcrumbHref, header: headerText}
    },

    removeFilterTag: function (type, facet, value, helper) {
        switch (type) {
            case 'disjunctive':
                helper.removeDisjunctiveFacetRefinement(facet, value);
                break;
            case 'facet':
                helper.removeFacetRefinement(facet, value);
                break;
            case 'numeric':
                helper.removeNumericRefinement(facet);
                break;
        }
    },
    pagination: function (content) {
        var nbHits = content.nbHits;
        var currentPage= content.page, totalPages = content.nbPages;
        var rObject = {
            paginate : true,
            currentPage: currentPage,
            totalPages: totalPages,
            hasNext: false,
            hasPrevious: false,
            showFirst: true,
            showLast: true,
            bufferAfter: 2,
            bufferBefore: 2,
            pages: []
        };
        var cClass = 'sbold bg-black text-purple-glow';
        if(nbHits != 0 ){
            if (currentPage < totalPages - 1) rObject.hasNext = true;
            if (currentPage != 0) rObject.hasPrevious = true;
            if(totalPages > 5) {
                if (currentPage == 0) {
                    rObject.bufferBefore = 0;
                    rObject.bufferAfter = 4;
                    rObject.showFirst = false;
                } else if (currentPage == 1) {
                    rObject.bufferBefore = 1;
                    rObject.bufferAfter = 3;
                    rObject.showFirst = false;
                }
                else if (currentPage == 2) {
                    rObject.showFirst = false;
                }
                else if (currentPage == (totalPages - 2)) {
                    rObject.bufferBefore = 3;
                    rObject.bufferAfter = 1;
                    rObject.showLast = false;
                } else if (currentPage == (totalPages - 1)) {
                    rObject.bufferBefore = 4;
                    rObject.bufferAfter = 0;
                    rObject.showLast = false;
                } else if (currentPage == (totalPages - 3)) {
                    rObject.showLast = false;
                }

                for(var x=0; x<rObject.bufferBefore; x++) rObject.pages.push({thePage:currentPage - rObject.bufferBefore + (x), class:''});
                rObject.pages.push({thePage:currentPage, class: cClass})
                for(var c=0; c<rObject.bufferAfter; c++) rObject.pages.push({thePage:currentPage + (c + 1), class:''});
            }
            else {
                for(var c=0; c<totalPages; c++){
                    if(c == currentPage) rObject.pages.push({thePage:c, class:cClass});
                    else rObject.pages.push({thePage:c, class:''});
                    rObject.showFirst = false;
                    rObject.showLast = false;
                }
            }
        }
        else{
            rObject.paginate = false;
        }
        return rObject;
    },
    setTitle: function(currentState){
        var avafacets = helper.getState(['query','attribute:*']);
        if(typeof avafacets.hierarchicalFacetsRefinements !== 'undefined')
            if(typeof avafacets.hierarchicalFacetsRefinements.products !== 'undefined'){
                var splitted = avafacets.hierarchicalFacetsRefinements.products[0].split(' > ');
                if(currentState.category)$(document).prop('title', splitted[0]+' - '+splitted[splitted.length-1]);
                else {
                    if(currentState.search){ $(document).prop('title', 'Search - '+avafacets.query);}
                    else if(currentState.brand){
                        if(typeof avafacets.disjunctiveFacetsRefinements !== 'undefined')
                            if(typeof avafacets.disjunctiveFacetsRefinements['brand.name'] !== 'undefined'){
                                $(document).prop('title', 'Brand - '+avafacets.disjunctiveFacetsRefinements['brand.name'])
                            }
                    }


                }
            }
    },

    getWelcomeMessage: function(helper,currentState,breadcrumb, content, suggestedBrands){
        var rObject = {}
        /*if(breadcrumb.length > 2){
            rObject.style= content.getFacetValues('style');
        }*/

        if(currentState.brand){
            rObject.search = false;
            rObject.name = renderHelper.getBrandName(helper);
            rObject.department = breadcrumb[0];
            if( breadcrumb.length-1 !== 0) rObject.subCategory = breadcrumb[breadcrumb.length-1];
            rObject.closeSearch=false;
        }

        else if(currentState.search){
                rObject.search = true;
                rObject.department = breadcrumb[0]
                rObject.name = HEADERTEXT.search.header;
                rObject.nbHits = HEADERTEXT.search.found +' <font class="bold text-purple-glow"> '+content.nbHits+' </font> '+HEADERTEXT.search.product ;
                rObject.query = content.query;
                rObject.closeSearch=true;
                rObject.suggestedBrands = suggestedBrands;
                if(suggestedBrands!==null && typeof suggestedBrands !== 'undefined')
                    rObject.nbBrandHits = HEADERTEXT.search.found +' <font class="bold text-purple-glow"> '+suggestedBrands.length+' </font> '+HEADERTEXT.search.brand ;
        }

        else if(currentState.category){
            rObject.search = false;
            rObject.name =breadcrumb[breadcrumb.length-1];
            rObject.closeSearch=false;
        }


        return rObject;
    },
    getBrandName:function(helper ){
        var state = helper.getState(['attribute:*']);
            if (typeof state['disjunctiveFacetsRefinements'] !== 'undefined') {
                if (state['disjunctiveFacetsRefinements']['brand.name']) {
                    return state['disjunctiveFacetsRefinements']['brand.name'];
                }
            }
    },
    getAllRefinements: function (object, header, currentState) {
        var rObject = {
            hierarchicalFacets: [],
            numericFacets: [],
            facets: []
        };

        if (object.hasOwnProperty('hierarchicalFacetsRefinements') && typeof object.hierarchicalFacetsRefinements !== 'undefined') {
            if (object.hierarchicalFacetsRefinements.hasOwnProperty('products')) {
                var x = object.hierarchicalFacetsRefinements.products[0].split(' > ')
                rObject.hierarchicalFacets.push({
                    text: x[x.length - 1],
                    type: 'hierarchical',
                    value: x[x.length - 1],
                    facet: 'products'
                })
            }
        }
        if (object.hasOwnProperty('disjunctiveFacetsRefinements') && typeof object.disjunctiveFacetsRefinements !== 'undefined') {
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('discount')) {
                for (var c in object.disjunctiveFacetsRefinements.discount)
                    rObject.facets.push({
                        text: header.disjunctionFacets.discount.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements.discount[c],
                        facet: 'discount'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('brand.name') && !currentState.brand) {
                for (var c in object.disjunctiveFacetsRefinements['brand.name'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.brand.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['brand.name'][c],
                        facet: 'brand.name'
                    })
            }
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('style')) {
                for (var c in object.disjunctiveFacetsRefinements['style'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.style.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['style'][c],
                        facet: 'style'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('fit')) {
                for (var c in object.disjunctiveFacetsRefinements['fit'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.fit.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['fit'][c],
                        facet: 'fit'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('material')) {
                for (var c in object.disjunctiveFacetsRefinements['material'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.material.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['material'][c],
                        facet: 'material'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('color')) {
                for (var c in object.disjunctiveFacetsRefinements.color)
                    rObject.facets.push({
                        text: header.disjunctionFacets.color.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements.color[c],
                        facet: 'color'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('shops')) {
                for (var c in object.disjunctiveFacetsRefinements['shops'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.shop.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['shops'][c],
                        facet: 'shops'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('sizes')) {
                for (var c in object.disjunctiveFacetsRefinements.sizes)
                    rObject.facets.push({
                        text: header.disjunctionFacets.size.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements.sizes[c],
                        facet: 'sizes'
                    })
            }
        }
        if (object.hasOwnProperty('numericRefinements')) {
            if (object.numericRefinements.hasOwnProperty('price.value')) {
                var o = object.numericRefinements['price.value'];
                var from = o['>'][0];
                var to = o['<'][0];
                var temp = {
                    text: header.facets.price.filter,
                    type: 'numeric',
                    value: ' ' + from + ' - ' + to,
                    facet: 'price.value'
                }
                rObject.numericFacets.push(temp)
            }
        }

        if (object.hasOwnProperty('facetsRefinements')) {
            if (object.facetsRefinements.hasOwnProperty('sale')) {
                var temp = {
                    text: header.facets.sale.filter,
                    type: 'facet',
                    value: object.facetsRefinements.sale,
                    facet: 'sale'
                }
                rObject.facets.push(temp)
            }
            if (object.facetsRefinements.hasOwnProperty('compare')) {
                var temp = {
                    text: header.facets.compare.filter,
                    type: 'facet',
                    value: object.facetsRefinements.compare,
                    facet: 'compare'
                }
                rObject.facets.push(temp)
            }
        }
        return rObject;
    },
    getAllFacetValues:function( object,helper, content, currentState, currentBrandDDHits, COLORS, HEADERTEXT, departmentVerified){
        var breadCrumb = [];
        var temp =  helper.getState(['query', 'attribute:*']);
        if(typeof temp.hierarchicalFacetsRefinements !== 'undefined')
                  breadCrumb=helper.getHierarchicalFacetBreadcrumb('products')


        object.price = content.getFacetStats('price.value')
        object.welcome = renderHelper.getWelcomeMessage(helper,currentState,breadCrumb, content, currentBrandDDHits);
        object.sale = {content:renderHelper.mapWithout(content.getFacetValues('sale'),['false']), header: HEADERTEXT.facets.sale.header};
        object.compare = {content:renderHelper.mapWithout(content.getFacetValues('compare'),['false']), header: HEADERTEXT.facets.compare.header};



        object.discounts={content: renderHelper.mapWithout(content.getFacetValues('discount'), ['0']), header: HEADERTEXT.disjunctionFacets.discount.header};
        object.sizes= {content: content.getFacetValues('sizes', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.size.header};

        object.style= {content: content.getFacetValues('style', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.style.header};
        object.fit= {content: content.getFacetValues('fit', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.fit.header};
        object.material= {content: content.getFacetValues('material', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.material.header};


        object.shops= {content: content.getFacetValues('shops', {sortBy: ['name:asc']}),header:   HEADERTEXT.disjunctionFacets.shop.header};
        object.paginate = renderHelper.pagination(content);
        object.sort = {content: renderHelper.getSortingOptions(helper.getIndex()), header: HEADERTEXT.sort.header};

        object.category = renderHelper.categoryRefinement(content.hierarchicalFacets, breadCrumb, HEADERTEXT.hierarchicalFacets.header);
        object.products = content.hits;

        object.colors = {header: HEADERTEXT.disjunctionFacets.color.header , content: renderHelper.mapColor(content.getFacetValues('color', {sortBy: ['name:asc']}),COLORS)};

        object.tags = renderHelper.getAllRefinements(helper.getState(['attribute:*']), HEADERTEXT, currentState);
        if(!currentState.brand){
            object.brands={ content: content.getFacetValues('brand.name', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.brand.header}
        }
        else{
                object.brands={header: HEADERTEXT.disjunctionFacets.brand.header}
        };
        //return object
    }
};
var COLORS = [
    {
        "key": "black",
        "displayName": "Svart",
        'hex':'#000000'
    },
    {
        "key": "brown",
        "displayName": "Brun",
        'hex':'#471413'
    },
    {
        "key": "beige",
        "displayName": "Beige",
        'hex':'#F5F5DC'
    },
    {
        "key": "gray",
        "displayName": "Grå",
        hex:'#919096'
    },
    {
        "key": "white",
        "displayName": "Vit",
        hex:'#ffffff'
    },
    {
        "key": "blue",
        "displayName": "Blå",
        hex:'#6f6fff'
    },
    {
        "key": "petrol",
        "displayName": "Petrol",
        hex:"#f2f7ce"

    },
    {
        "key": "turquoise",
        "displayName": "Turkos",
        hex:'#19e7ef'
    },
    {
        "key": "green",
        "displayName": "Grön",
        'hex':'#008000'
    },
    {
        "key": "olive",
        "displayName": "Oliv",
        'hex':'#008000'
    },
    {
        "key": "yellow",
        "displayName": "Gul",
        'hex':'#ffff00'
    },
    {
        "key": "orange",
        "displayName": "Orange",
        'hex':'#ff7f00'
    },
    {
        "key": "red",
        "displayName": "Röd",
        'hex':'#f41414'
    },
    {
        "key": "pink",
        "displayName": "Rosa",
        'hex':'#FFC0CB'
    },
    {
        "key": "purple",
        "displayName": "Lila",
        'hex':'#800080'
    },
    {
        "key": "gold",
        "displayName": "Guld",
        'hex':'#FFD700'
    },
    {
        "key": "silver",
        "displayName": "Silver",
        'hex':'#C0C0C0'
    },
    {
        "key": "multicolored",
        "displayName": "Flerfärgad",
        'hex':'#FFC0CB'
    }
];
var HEADERTEXT = {
    sort: {header:"sortera"},
    hierarchicalFacets: { header: "Kategorier"},
    disjunctionFacets: {
        color:{header: "Färger", filter:"färg"},
        brand:{header: "Märken", filter:"märken"},
        style:{header: "Styles", filter:"style"},
        material:{header: "Material", filter:"material"},
        fit:{header: "Fit", filter:"fit"},

        shop:{header:"Butiker", filter:"butik"},
        size:{header:"Storlekar", filter:"Storlek"},
        discount:{header:"Rea%", filter:"Rea"}
    },
    facets:{
        sale: {header: "Bara Rea", filter:"Bara Rea"},
        compare: {header: "Bara jämför", filter:"Bara jämför"},
        price:{header: "Pris"   , filter:"pris"}
    },
    search:{
        header:"Sökresultat",
        found: "vi hittade",
        product:"styles",
        brand:"brands"
    },
    autoComplete:{
        productPreview:{brand: "Märken", shop:"Butik"},
        productList:{ findBetterPriceButton:"find better prices"}
    },
    newsletter:{
        responseSuccess:{
            success:{
                body:"Thank you for submitting you email",
                addAnother:"Add another email"
            }
        },
        responseFail:{
            fail:{
                body:"Sorry we couldnt add",
                addAnother:"Add another email"
            }
        },
        addForm:{
            form:{
                body:"Add a new email"
            }
        }
    }
}
if (typeof window !== "undefined") {

}
//SERVER
else {
    module.exports = {helper:renderHelper, translation:HEADERTEXT, colors:COLORS}
}