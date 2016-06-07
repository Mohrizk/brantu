

var welcomeTemplate = Handlebars.compile(
    '{{#if search}}' +
    '<div class="pull-right closeSearch"><i class="pg-close_line fa-2x"></i></div>' +
    '<h3 class="all-caps text-spaced text-center font-GothamMedium">{{#if department}}{{department}}/{{/if}} {{name}} "{{query}}"</h3>' +
    '<h5 class="all-caps text-spaced text-center font-GothamMedium">{{{nbHits}}}</h5>' +
    '{{else}}' +
    '{{debug name}}' +
    '<h1 class="all-caps text-spaced text-center font-GothamMedium">{{name}} </h1>' +
    '{{/if}}'
)


var productTemplate = Handlebars.compile(
    '{{#each this}}'+
    '<li  class="item offer" index="{{@index}}" productId="{{{this.brantuId}}}">'+
    '<img class="preview-image" src="{{{this.mainPicture.largeUrl}}}" alt="{{name}}" index="{{@index}}" productId="{{this.productId}}"/>'+
    '<span class="item-brand sbold">{{{this.brand.name}}}</span>'+
    '<span class="item-name medium">{{{this.targetGroup}}}</span>'+
    '{{#if sale}}'+
    '<span class="original-price discounted">{{{this.originalPrice.formatted}}}</span>'+
    '<span class="discounted-price">{{{this.price.formatted}}}</span>'+
    '<span class="discounted-percentage">{{{this.discount}}}%</span>'+
    '{{else}}'+
    '<span class="original-price">{{{this.originalPrice.formatted}}}</span>'+
    '{{/if}}'+
    '<ol class="small-options">'+
    '<li class="delete"><a href="#"><i class=" pg-close_line"> </i></a></li>'+
    '<li class="like"> <a href="#"><i class="  fa  fa-heart-o"></i></a></li>'+
    '<li class="cart"> <a href="#"><i class="fa fa-share-alt"></i></a></li>'+
    '</ol>'+
    '<div class="main-options">'+
    '<a><button class="btn  btn-info GoStore">Go to store</button></a>'+
    '<button class="btn btn-info moreInfo" index="{{@index }}" productId="{{{this.productId}}}">More Info</button>'+
    '</div>'+
    '</li>'+
    '{{/each}}'
);





var jawBoneTemplate = Handlebars.compile(
    '<div class="jawBone">'+
    '<div class="mainWrapper">'+
    '<div class="selectedItemImageWrapper">'+
    '<div class="selectedItemImageColoumn frame" id="selectedItemImages" numOfImages="{{numOfImages}}">'+
    '<ol class="slidee">'+
    '<li><img imageorder ="0" src="{{mainPicture.largeUrl}}" /></li>'+
    '{{#each auxPictures}}'+
    '<li><img imageorder ="{{indexPlusConstant @index 1}}" src="{{largeUrl}}" /></li>'+
    '{{/each}}'+
    '</ol>'+
    '</div>'+
    '<div class="selectedItemPictureContainer">'+
    '<div class="selectedItemZoomPicture">'+
    '<div class="prev-item"><i class="  pg-arrow_left_line_alt"></i></div> <div class="next-item"><i class=" pg-arrow_lright_line_alt"></i></div>'+
    ' <img imageorder = "0" src="{{mainPicture.largeUrl}}"/>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="selectedItemDescriptionContainer">'+
    '<div class="selectedItemHeader">'+
    '<div class="headerWrapper">'+
    '{{#if brand.logoUrl}}<div><img src="{{brand.logoUrl}}"/></div>{{/if}}'+
    '<h2 class="selectedItemBrand">{{brand.name}}</h2>'+
    '<h5 class="selectedItemName">{{name}}</h5>'+
    '</div>'+
    '<div class="priceLocation">'+
    '{{#if sale}}'+
    '<span class="original-price discounted">{{originalPrice.formatted}}</span>'+
    '<span class="discounted-price">{{{price.formatted}}}</span>'+
    '<span class="discounted-percentage">{{{discount}}}%</span>'+
    '{{else}}'+
    '<span class="original-price">{{{originalPrice.formatted}}}</span>'+
    '{{/if}}'+
    '</div>'+
    '</div>'+
    '<div class="selectedItemActions">'+
    '<button class="btn  btn-info"> Go To Shop</button>'+
    '</div>'+
    '<div class="selectedItemDetail">'+
    '<div class="panel">'+
    '<ul class="nav nav-tabs nav-tabs-simple hidden-xs"  data-init-reponsive-tabs="collapse">'+
    '<li class="active"><a href="#tabDetails"  data-toggle="tab" aria-expanded="true">Description</a></li>'+
    '{{#if reviews}}<li class=""><a href="#tabReviews"data-toggle="tab" aria-expanded="false">Review</a></li>{{/if}}'+
    '</ul>'+
    '<div class="tab-content hidden-xs">'+
    '<div class="tab-pane active" id="tabDetails">'+
    '<div class="row column-seperation">'+
    '<div class="col-md-5"></div>'+
    '<div class="col-md-7">'+'<ol class="selectedItemDetailList">{{description}}</ol></div>'+
    '</div>'+
    '</div>'+
    '<div class="tab-pane" id="tabReviews">{{>loading}}</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="recommendedProducts">'+
    '</div>'+
    '<ol class="selectedItemSave">'+
    '<li ><div class="delete"><i class=" pg-close_line"> </i></div></li>'+
    '<li> <div class="like"><i class="  fa  fa-heart-o"></i></div></li>'+
    '</ol>'+
    '</div>'
);


var categoryFacetTemplate = Handlebars.compile(
    '<div class="refinement">'+
    '<div class="breadcrumb">'+
    '{{#each breadCrumb}}'+
    '{{#if @first}}<li><a class="bold" value="{{path}}" style="margin-left: 0 !important;">{{name}}</a></li>'+
    '{{else}}<li><a class="bold" value="{{path}}">{{name}}</a></li>'+
    '{{/if}}'+
    '{{/each}}'+
    '</div>'+
    '<ul class="categoryList no-style">'+
    '{{#each childCategories}}'+
    '<li><a class="medium all-caps {{class}}" value="{{path}}">{{name}}<span>{{count}}</span></a></li>'+
    '{{/each}}'+
    '</ul>'+
    '</div>'
)

var listFacetTemplate = Handlebars.compile(
    '{{#if content}}'+
    '<div class="">'+
    '<h5>'+
    '<span class="bg-white text-left all-caps ">{{header}}</span>'+
    '</h5>'+
    '<div id="listContainer">'+
    '<ul class="list" style="max-height: 160px; overflow: scroll;">'+
    '{{#each content}}' +
    '{{#if (idGenerator this)}}{{/if}}'+
    '{{#if isRefined}}<div><input class="input" type="checkbox" value="{{this.name}}" id="{{this.theID}}" checked/> <label class="label" for="{{this.theID}}"><span class="name">{{this.name}}</span> <span class="count">{{this.count}}</span></label></div>'+
    '{{else}}		  <div><input class="input" type="checkbox" value="{{this.name}}" id="{{this.theID}}"/> <label class="label" for="{{this.theID}}"><span class="name">{{this.name}}</span><span class="count">{{this.count}}</span></label></div>'+
    '{{/if}}'+
    '{{/each}}'+
    '</ul>'+
    '</div>'+
    '</div>'+
    '{{/if}}'
)

var onlySaleBoxFacetTemplate = Handlebars.compile(
    '{{#if content}}'+
    '{{#each content}}'+
    '{{#if isRefined}}<div class="checkbox  checkbox-circle"><input type="checkbox" name="checkbox" value="{{name}}"  id="{{name}}" checked/> <label for="{{name}}"><span>{{../header}}</span></label></div>'+
    '{{else}}<div class="checkbox  checkbox-circle"><input type="checkbox" name="checkbox" value="{{name}}" id="{{name}}" /> <label for="{{name}}"><span>{{../header}}</span></label></div>'+
    '{{/if}}'+
    '{{/each}}'+
    '{{/if}}'

)

var colorFacetTemplate = Handlebars.compile(
    '{{#if content}}'+
    '<h5>'+
    '<span class=" bg-white all-caps ">{{header}}</span>'+
    '</h5>'+
    '<div class="colorList">'+
    '{{#each content}}'+
    '{{#if isRefined}}<input type="checkbox" name="color" value="{{name}}"   id="{{name}}_{{hex}}" checked/><label for="{{name}}_{{hex}}"  style="background-color:{{hex}}; "><span class="name">{{name}}</span></label>'+
    '{{else}}         <input type="checkbox" name="color" value="{{name}}"   id="{{name}}_{{hex}}"        /><label for="{{name}}_{{hex}}"  style="background-color:{{hex}}; "><span class="name">{{name}}</span></label>'+
    '{{/if}}'+
    '{{/each}}'+
    '</div>'+
    '{{/if}}'
)


var filterTagsTemplate = Handlebars.compile(
    '<div class="container padding-1v">'+
    '{{#each facets}}'+
    '<div class="inline p-r-5">'+
    '<button class="btn btn-tag btn-tag-rounded" style="border:1px solid #ddd;" value="{{value}}" facet="{{facet}}" type="{{type}}"> <font class="sbold">{{text}}: </font>{{value}}<i class="pg-close_line p-l-5"></i></button>'+
    '</div>'+
    '{{/each}}'+

    '{{#each numericFacets}}'+
    '<div class="inline p-r-5">'+
    '<button class="btn btn-tag  btn-tag-rounded" style="border:1px solid #ddd;"  facet="{{facet}}" type="{{type}}"> <font class="sbold">{{text}}: </font> {{value}} <i class="pg-close_line p-l-5"></i></button>'+
    '</div>'+
    '{{/each}}'+
    '</div>'
)

var pagingTemplate = Handlebars.compile(
    '<div class="clearfix">' +
    '<div class="pull-right bg-master-light btn-rounded p-r-10 p-l-10">' +
    '{{#if hasPrevious}}' +
    '<a class="inline p-r-5 page v-align-middle"  value="{{indexMinusConstant currentPage 1}}"><i class="fa-2x pg-arrow_left_line_alt"></i></a>'+
    '{{/if}}'+
    '{{#if showFirst}}' +
    '<div class="inline"><a class="sbold page"  value="0"> 1</a> ... </div>'+
    '{{/if}}' +
    '{{#each pages}}' +
    '<a class="inline page {{class}}  sbold padding-1v"  value="{{thePage}}">{{indexPlusConstant thePage 1}}</a>' +
    '{{/each}}' +
    '{{#if showLast}}' +
    '<div class="inline">... <a class="sbold page"  value="{{indexMinusConstant totalPages 1}}"> {{totalPages}}</a></div>'+
    '{{/if}}'+
    '{{#if hasNext}}' +
    '<a class="inline p-l-5 page v-align-middle" value="{{indexPlusConstant currentPage 1}}"><i class="fa-2x pg-arrow_lright_line_alt "></i></a>'+
    '{{/if}}'+
    '</div>' +
    '</div>'
);

//AUTOCOMEPLETE
var ACTemplateProduct = Handlebars.compile(
    '<a class="dark" href="{{{shopUrl}}}"><div class="productsAC m-b-5 text-left">'+
    '<div><img src="{{{mainPicture.smallUrl}}}" width="40" height="auto"/></div>'+
    '<div class="b-b b-grey" style="font-size:12px;"> ' +
    '<div class="brand bold">{{{ brand.name}}}</div>' +
    '<div class="name medium">{{{ _highlightResult.name.value }}}</div>' +
    '<div class="price medium inline">{{{ price.formatted}}}</div>' +
    '</div></div></a>'
);


var ACTemplateBrand = Handlebars.compile('<a class="dark" href="/brand/{{{name}}}"><div class="brandsAC text-left">' +
    '<div>{{#logoUrl}}<img src="{{logoUrl}}" width="40" height="auto"/>{{/logoUrl}}</div>'+
    '<div class="b-b b-grey p-l-10"><div class="name medium"><span class="">{{{ _highlightResult.name.value }}}</span></div></div>' +
    '</div></a>');
/*****Render Color LIST*******/
var productHelper;
productHelper = {
    getWelcomeMessage: function(breadcrumb, content, isSearch){
        var rObject = {}
        console.log(breadcrumb);
        if(isSearch){
            rObject.search = true;
            rObject.department = breadcrumb[0]
            rObject.name = HEADERTEXT.search.header;
            rObject.nbHits = HEADERTEXT.search.found +' <font class="bold text-pink-dark"> '+content.nbHits+' </font> '+HEADERTEXT.search.product ;
            rObject.query = content.query;
            rObject.closeSearch=true;
        }
        else{
            rObject.search = false;
            rObject.name =breadcrumb[breadcrumb.length-1];
            rObject.closeSearch=false;
        }
        return rObject;
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
    categoryRefinement: function (categoryContent, breadcrumb) {
        var breadcrumbHref = [], returnArray = [], data = categoryContent[0].data;
        for (var b = 0; b < breadcrumb.length + 1; b++) {
            var c = 0, isRefined = false;
            if (data != null) {
                while (!isRefined) {
                    if (data[c].isRefined) {
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
        return {childCategories: returnArray, breadCrumb: breadcrumbHref}
    },
    getAllRefinements: function (object, header) {
        var rObject = {
            hierarchicalFacets: [],
            numericFacets: [],
            facets: []
        };

        if (object.hasOwnProperty('hierarchicalFacetsRefinements')) {
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
        if (object.hasOwnProperty('disjunctiveFacetsRefinements')) {
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('discount')) {
                for (var c in object.disjunctiveFacetsRefinements.discount)
                    rObject.facets.push({
                        text: header.disjunctionFacets.discount.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements.discount[c],
                        facet: 'discount'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('brand.name')) {
                for (var c in object.disjunctiveFacetsRefinements['brand.name'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.brand.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['brand.name'][c],
                        facet: 'brand.name'
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

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('shop.name')) {
                for (var c in object.disjunctiveFacetsRefinements['shop.name'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.shop.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['shop.name'][c],
                        facet: 'shop.name'
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
    removeFilterTag: function (type, facet, value, helper) {
        switch (type) {
            case 'disjunctive':
                helper.removeDisjunctiveFacetRefinement(facet, value).search();
                break;
            case 'facet':
                helper.removeFacetRefinement(facet, value).search();
                break;
            case 'numeric':
                helper.removeNumericRefinement(facet).search();
                break;
        }
    },
    pagination: function (currentPage, totalPages) {
        var rObject = {
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
        return rObject;
    },
    openDDViewProductInfo: function (mainContainer, productList, jawboneLocation, jawboneContainer, content, paginate) {
        if (productList.hasClass("vertical")) {
            productList.toggleClass('horizontal').toggleClass('vertical');
            mainContainer.addClass('noFilter');
            paginate.addClass('hide');
        }
        jawboneLocation.addClass("open");
        $('html, body').animate({scrollTop: productList.offset().top - 100}, 1, $.bez([.5, 0, .1, 1]));
        jawboneContainer.html(jawBoneTemplate(content));
        productList.addClass("jbMode");

    },
    closeDDViewProductInfo: function (mainContainer, productList, jawboneContent, paginate) {
        paginate.removeClass('hide');
        productList.removeClass("jbMode");
        productList.removeClass('horizontal').addClass('vertical');
        mainContainer.removeClass('noFilter');
        jawboneContent.removeClass("open");

    }

};


function guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
