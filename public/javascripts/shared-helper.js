var renderHelper = {
    urlToState:function (helper,stringQuery, currentState,brandName, query){
        helper.clearRefinements();
        helper.setStateFromQueryString(stringQuery);
        //IF CATEGORY HAS ' & '
        var tempPage=  helper.getPage();
        if(stringQuery.indexOf(' & ') >-1){
            var array= stringQuery.split('hFR[products][0]=');
            var array2 =array[1].split('&');
            var path = array2[0]+'&'+array2[1];
            helper.clearRefinements('products')
            helper.toggleRefinement('products', path);
        }



        //IF BRAND

        if(currentState.brand && brandName !== null && typeof brandName !== 'undefined'){
            helper.addDisjunctiveFacetRefinement('brand.name', brandName);
        }
        helper.setPage(tempPage);
    },
    mapColor: function (array, values) {
        var x = [];
        for (var a in array) {
            for (var b in values) {
                if (array[a].name == values[b].displayName) {
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
                                if (data[c].name == da.name)   da.class = 'sbold text-spaced';
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
        var cClass = 'sbold text-pink-darker';
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
                if(!currentState.search)$(document).prop('title', splitted[0]+' - '+splitted[splitted.length-1]);
                else $(document).prop('title', 'Search - '+avafacets.query)
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
                rObject.nbHits = HEADERTEXT.search.found +' <font class="bold text-pink-dark"> '+content.nbHits+' </font> '+HEADERTEXT.search.product ;
                rObject.query = content.query;
                rObject.closeSearch=true;
                rObject.suggestedBrands = suggestedBrands;
                if(suggestedBrands!==null && typeof suggestedBrands !== 'undefined')
                    rObject.nbBrandHits = HEADERTEXT.search.found +' <font class="bold text-pink-dark"> '+suggestedBrands.length+' </font> '+HEADERTEXT.search.brand ;
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
        }
        return rObject;
    },
    getAllFacetValues:function( object,helper, content, currentState, currentBrandDDHits, COLORS, HEADERTEXT, departmentVerified){
        //console.log(currentState)
        var breadCrumb = [];
        if(departmentVerified) breadCrumb=helper.getHierarchicalFacetBreadcrumb('products')

        object.price = content.getFacetStats('price.value')
        console.log( object.price)
        object.welcome = renderHelper.getWelcomeMessage(helper,currentState,breadCrumb, content, currentBrandDDHits);
        object.sale = {content:renderHelper.mapWithout(content.getFacetValues('sale'),['false']), header: HEADERTEXT.facets.sale.header};
        object.discounts={content: renderHelper.mapWithout(content.getFacetValues('discount'), ['0']), header: HEADERTEXT.disjunctionFacets.discount.header};
        object.sizes= {content: content.getFacetValues('sizes'), header: HEADERTEXT.disjunctionFacets.size.header};

        object.style= {content: content.getFacetValues('style'), header: HEADERTEXT.disjunctionFacets.style.header};
        console.log('style', object.style)

        object.shops= {content: content.getFacetValues('shops'),header:   HEADERTEXT.disjunctionFacets.shop.header};
        object.paginate = renderHelper.pagination(content);

        object.category = renderHelper.categoryRefinement(content.hierarchicalFacets, breadCrumb, HEADERTEXT.hierarchicalFacets.header);
        object.products = content.hits;
        object.colors = {header: HEADERTEXT.disjunctionFacets.color.header , content: renderHelper.mapColor(content.getFacetValues('color'),COLORS)}
        object.tags = renderHelper.getAllRefinements(helper.getState(['attribute:*']), HEADERTEXT, currentState);
        if(!currentState.brand){
            object.brands={ content: content.getFacetValues('brand.name'), header: HEADERTEXT.disjunctionFacets.brand.header}
        }
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
        hex:"#10627a"

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
        'hex':'#008000'
    },
    {
        "key": "orange",
        "displayName": "Orange",
        'hex':'#008000'
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
]
var HEADERTEXT = {
    hierarchicalFacets: { header: "Kategorier"},
    disjunctionFacets: {
        color:{header: "Färger", filter:"färg"},
        brand:{header: "Märken", filter:"märken"},
        style:{header: "Styles", filter:"style"},
        shop:{header:"Butiker", filter:"butik"},
        size:{header:"Storlekar", filter:"Storlek"},
        discount:{header:"Rea%", filter:"Rea"}
    },
    facets:{
        sale: {header: "Bara Rea", filter:"Bara Rea"},
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