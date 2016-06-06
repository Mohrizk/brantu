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
    hierarchicalFacets: { header: ''},
    disjunctionFacets: {
        color:{header: 'Välj  färgen', filter:'färg'},
        brand:{header: 'Välj  märken', filter:'märken'},
        shop:{header:'Välj  butiken', filter:'butik'},
        size:{header:'Välj  Storlekar', filter:'Storlek'},
        discount:{header:'Rea%', filter:'Rea'}
    },
    facets:{
        sale:{header: 'Bara Rea', filter:'Bara Rea'},
        price:{header: 'Pris'   , filter:'pris'},
    }
}

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
    '<li><a class="medium all-caps" value="{{path}}">{{name}}<span>{{count}}</span></a></li>'+
    '{{/each}}'+
    '</ul>'+
    '</div>'
)

var listFacetTemplate = Handlebars.compile(
    '{{#if content}}'+
    '<div class="refinement">'+
    '<h5>'+
    '<span class="bg-white text-left all-caps ">{{header}}</span>'+
    '</h5>'+
    '<div id="listContainer">'+
    '<ul class="list" style="max-height: 100px; overflow: scroll;">'+
    '{{#each content}}'+
    '{{#if isRefined}}<div><input class="input" type="checkbox" value="{{this.name}}" id="{{this.name}}_{{this.count}}" checked/> <label class="label" for="{{this.name}}_{{this.count}}"><span class="name">{{this.name}}</span> <span class="count">{{this.count}}</span></label></div>'+
    '{{else}}		  <div><input class="input" type="checkbox" value="{{this.name}}" id="{{this.name}}_{{this.count}}"/> <label class="label" for="{{this.name}}_{{this.count}}"><span class="name">{{this.name}}</span><span class="count">{{this.count}}</span></label></div>'+
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
    '<button class="btn btn-tag btn-tag-dark btn-tag-rounded" value="{{value}}" facet="{{facet}} type="{{type}}"> {{text}}: {{value}}</button>'+
    '</div>'+
    '{{/each}}'+

    '{{#each numericFacets}}'+
    '<div class="inline p-r-5">'+
    '<button class="btn btn-tag"><a class="medium all-caps" value="{{path}}">{{name}}<span>{{count}}</span></a></button>'+
    '</div>'+
    '{{/each}}'+
    '</div>'
)

/*****Render Color LIST*******/
var productHelper = {
    mapColor: function (array, values) {
    var x = [];
    for(var a in array)
    {
        for(var b in values){
            if(array[a].name == values[b].displayName) {
                array[a].hex = values[b].hex;
                x.push(array[a]);
            }

        }
    }
    return x;
},
    mapWithout: function (array, values) {
    var x = [];

    for(var a in array)
    {
        for(var b in values){
            if(array[a].name !== values[b]) {
                x.push(array[a]);
            }

        }
    }

    return x;
},
    categoryRefinement: function (categoryContent, breadcrumb){
        console.log(' c c ',categoryContent)
    var breadcrumbHref = [], returnArray=[], data = categoryContent[0].data;
    for (var b=0; b < breadcrumb.length + 1 ; b++){
        var c = 0, isRefined = false;
        while(!isRefined){
            if(data[c].isRefined){
                if(b < breadcrumb.length) breadcrumbHref.push({name: data[c].name, path: data[c].path, count:data[c].count})
                returnArray.length = 0;
                data = data[c].data;
                isRefined= true;
            }
            else{
                if(data.length - 1 <= c) isRefined = true
                returnArray.push({name: data[c].name, path: data[c].path , count:data[c].count})
                c++;
            }
        }
    }
    return {childCategories: returnArray, breadCrumb: breadcrumbHref}
},
    getAllRefinements: function(object, header){
        var rObject={
            hierarchicalFacets: [],
            numericFacets:[],
            facets:[]
        };

        if(object.hasOwnProperty('hierarchicalFacetsRefinements')){
            if(object.hierarchicalFacetsRefinements.hasOwnProperty('products')){
                var x = object.hierarchicalFacetsRefinements.products[0].split(' > ')
                rObject.hierarchicalFacets.push({text: x[x.length-1], type: 'hierarchical', value: x[x.length-1], facet: 'products'})
            }
        }
        if(object.hasOwnProperty('disjunctiveFacetsRefinements')){
            if(object.disjunctiveFacetsRefinements.hasOwnProperty('discount')){
                for(var c in object.disjunctiveFacetsRefinements.discount)
                    rObject.facets.push({text: header.disjunctionFacets.discount.filter ,type: 'disjunctive', value: object.disjunctiveFacetsRefinements.discount[c], facet: 'discount'})
            }

            if(object.disjunctiveFacetsRefinements.hasOwnProperty('brand.name')){
                for(var c in object.disjunctiveFacetsRefinements['brand.name'])
                    rObject.facets.push({text: header.disjunctionFacets.brand.filter ,type: 'disjunctive', value: object.disjunctiveFacetsRefinements['brand.name'][c], facet: 'brand.name'})
            }

            if(object.disjunctiveFacetsRefinements.hasOwnProperty('color')){
                for(var c in object.disjunctiveFacetsRefinements.color)
                    rObject.facets.push({text: header.disjunctionFacets.color.filter ,type: 'disjunctive', value: object.disjunctiveFacetsRefinements.color[c], facet: 'color'})
            }

            if(object.disjunctiveFacetsRefinements.hasOwnProperty('shop.name')){
                for(var c in object.disjunctiveFacetsRefinements['shop.name'])
                    rObject.facets.push({text: header.disjunctionFacets.shop.filter  ,type: 'disjunctive', value: object.disjunctiveFacetsRefinements['shop.name'][c], facet: 'shop.name'})
            }

            if(object.disjunctiveFacetsRefinements.hasOwnProperty('sizes')){
                for(var c in object.disjunctiveFacetsRefinements.sizes)
                    rObject.facets.push({text: header.disjunctionFacets.size.filter  ,type: 'disjunctive', value: object.disjunctiveFacetsRefinements.sizes[c], facet: 'sizes'})
            }
        }
        if(object.hasOwnProperty('numericRefinements')){
            if(object.numericRefinements.hasOwnProperty('price.value')){
                var o= object.numericRefinements['price.value'];
                var from = o['>'][0];
                var to  =    o['<'][0];
                var temp = {text: header.facets.price.filter, type: 'numeric', value: 'min: '+from+' max: '+to , facet: 'price.value'}
                rObject.numericFacets.push(temp)
            }
        }

        if(object.hasOwnProperty('facetsRefinements')){
            if(object.facetsRefinements.hasOwnProperty('sale')){
                var temp = {text: header.facets.sale.filter ,type: 'facet', value: object.hierarchicalFacetsRefinements.sale, facet: 'sale'}
                rObject.facets.push(temp)

            }
        }
        console.log('heyyyy ',object)
        return rObject;
    }
}


function guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
