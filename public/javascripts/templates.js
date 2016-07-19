
var productEngineTemplate_text= '<div class="">' +
    '<div class="navigationWrapper">' +
    '<div class="welcome">' +
    '</div>' +
    '<div class="resultContainer row" id="productEngine">' +
    '<div class="facetPane" id="mainFacetPane">' +
    '<div class="facetContainer " id="mainFacetContainer">' +
    '<div class="facetWrapper padding-1v" style="">' +
    '<div class="facet-header">' +
    '</div>' +
    '<div class="facets" id="primaryFacets">' +
    ' <div class="category"></div>' +
    ' <div class="price">' +
    '<h5>' +
    '<span class="bg-white text-left all-caps bold">Pris</span>' +
    '</h5>' +
    '<div id="pricerange"></div>' +
    '<div class="sale refinement"></div>' +
    '<div class="discounts refinement"></div>' +
    '</div>' +
    '<div class="sizes refinement" ></div>' +
    '<div class="brands refinement" ></div>' +
    '<div class="colors refinement" ></div>' +
    '<div class="shops refinement" ></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="productPane">' +
    '<div class="productPreview">' +
    '<div class="row">' +
    '<div class="filterTags col-xs-7"></div>' +
    '<div class="col-xs"><div class="paginate hidden-xs"></div></div>' +
    '</div>' +
    '<ol class="itemList vertical">' +
    '</ol>' +
    '<div class="paginate"></div>' +
    '</div>' +
    '</div>' +
    '</div> ' +
    '</div> ' +
    '<div class="jawBoneContent" id="jawbone">' +
    '<div class="jawBoneOpenContainer">' +
    '<div class="jawBoneFadeInPlaceContainer">' +
    '<div class="jawBoneContainer">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';



var productEngineTemplate = Handlebars.compile(productEngineTemplate_text);

var mobileFilters_text =
    '<div class="popout visible-sm visible-xs">' +
    '<div class="fab {{#if fab}}active{{/if}}">' +
    '<i class="icon ion-ios-glasses"></i>' +
    '</div>' +
    '<div class="panel  {{#if fab}}active{{/if}}">' +
    '<div class="panel-header">' +
    '<h3>Filter <span class="pull-right close p-t-5"> <i class="pg-close_line" style="font-size: 25px;"></i></span></h3>'+
    '<div  class="filterTags" id="mobileTags"></div>' +
    '</div>' +
    '<div class="panel-body scrollable">' +
    '<div class="facets" id="primaryFacets">' +
    ' <div class="category"></div>' +
    ' <div class="price">' +
    '<h5>' +
    '<span class="bg-white text-left all-caps bold">Pris</span>' +
    '</h5>' +
    '<div id="pricerange_mobile"></div>' +
    '<div class="sale refinement"></div>' +
    '<div class="discounts refinement"></div>' +
    '</div>' +
    '<div class="sizes refinement bold" ></div>' +
    '<div class="brands refinement bold" ></div>' +
    '<div class="colors refinement" ></div>' +
    '<div class="shops refinement" ></div>' +
    '</div>' +
    '</div>' +
    '</div> </div>'
var mobileFilters = Handlebars.compile(mobileFilters_text)


var productTemplate_text =
    '{{#each  products}}' +
    '<li  class="item" index="{{@index}}" _id="{{{this.objectID}}}">' +
    '<div class="itemContainer">' +
    '<div class="itemWrapper">' +
    '<div class="row top-xs">'+
    '<div class="preview-image auto-margin col-xs" style="margin-top: 0;">' +
    '<img src="{{{this.mainPicture.largeUrl}}}" action="/add-viewed-product-session" class="v-align-top" pic-src="{{{this.mainPicture.largeUrl}}}{{#each auxPictures}}/BREAK/{{{largeUrl}}}{{/each}}" alt="{{../name}}" index="{{@index}}" nb-pic="{{nbImages}}" pic-order="0" _id="{{objectID}}" data-product-info="show"/>' +

    '</div>' +
    '</div>'+
    '<div class="item-brand sbold">{{{this.brand.name}}}</div>'+
    '<div class="item-name medium no-overflow-text">{{{this.name}}}</div>'+
    '{{#if sale}}' +
    '<div class="row">'+
    '<div class="original-price discounted col-xs text-right">{{{this.originalPrice.formatted}}}</div>' +
    '<div class="discounted-price col-xs text-left">{{{this.price.formatted}}}</div>'+
    '</div>'+
    '<div class="discounted-percentage ">{{{this.discount}}}%</div>' +
    '{{else}}'+
    '<div class="original-price text-center">{{{this.price.formatted}}}</div>'+
    '{{/if}}' +
    '<div class="main-options hidden-xs">' +
    '<ol class="no-style no-overflow-text">' +
    '{{#each  sizes}}' +
    '{{#if  @last}}<li class="inline text-pink-darker sbold no-overflow-text">{{this}}</li>' +
    '{{else}}<li class="inline text-pink-darker sbold no-overflow-text">{{this}} <font class="text-master-light">/</font></li>' +
    '{{/if}}'+
    '{{/each}}' +
    '</ol>' +
    '<div class="p-t-10 p-b-10 ">'+
    '<a class="dark bold"><div class="btn  btn-info btn-rounded m-r-5"><small>Go to store</small></div></a>'+
    '<a class="dark bold" data-product-info="show" index="{{@index }}" action="/add-viewed-product-session" _id="{{{this.objectID}}}"><div class="btn  btn-info btn-rounded  m-l-5 no-border" ><small>Find better prices</small></div></a>' +
    '</div>'+
    '</div>' +
    '<ol class="small-options no-style">' +
    '</ol>'+
    '</div>' +
    '</div>'+
    '</li>'+
    '{{/each}}';

var productTemplate = Handlebars.compile(productTemplate_text);



var jawBoneTemplate_text= '<div class="jawBone" nb-pic="{{product.numOfImages}}" pic-src="{{{product.mainPicture.largeUrl}}}{{#each product.auxPictures}}/BREAK/{{{this.largeUrl}}}{{/each}}">'+
                        '<div class="mainWrapper relative row">' +
                        '<div class=" jbImageContainer hidden-xs hidden-sm">' +
                        '<div class="selectedItemPictureContainer">'+
                        '<div class="selectedItemZoomPicture">'+
                        '<div id="mainJawBoneImageContainer" > ' +
                        '<div class=" next-item"><i class=" fa  fa-angle-right"></i></div>'+
                        '<div class=" prev-item"><i class="fa  fa-angle-left"></i></div>'+
                        '<div id="owl-main" class=" no-style">'+
                        '<div><img  imageorder ="0" data-src="{{product.mainPicture.largeUrl}}" class="lazyOwl"/></div>'+
                        '{{#each product.auxPictures}}'+
                        '<div><img  imageorder ="{{indexPlusConstant @index 1}}" data-src="{{largeUrl}}" class="lazyOwl"/></div>'+
                        '{{/each}}'+
                        '<div></div><div></div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>' +
                        '<div class=" col-xs-12 col-sm-12 visible-xs visible-sm">' +
                        '<div class="selectedItemPictureContainer">'+
                        '<div class="selectedItemZoomPicture">'+
                        '<div id="mainJawBoneImageContainer" > ' +
                        '<div id="owl-main-mobile" class=" no-style">'+
                        '<div class="text-center"><img  imageorder ="0" data-src="{{product.mainPicture.largeUrl}}" class="lazyOwl"/></div>'+
                        '{{#each product.auxPictures}}'+
                        '<div class="text-center"> <img   imageorder ="{{indexPlusConstant @index 1}}" data-src="{{largeUrl}}"  class="lazyOwl"/></div>'+
                        '{{/each}}'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>' +
                        '<div class="col-md-8 col-md-offset-4  col-sm-12 col-xs-12 p-t-10 p-l-20 p-r-20" id="selectedItemInformation" >'+
                        '<div class="row">'+
                        '<div class="col-md-11 col-sm-12 col-xs-12">'+
                        '<div class="item-info b-b more-content">' +
                        '<div class=" p-t-20 p-b-5">' +
                        '<div class="row top-xs">' +
                        '<div class="col-xs-6 bottom-xs">' +
                        '<div class="row bottom-xs start-xs">' +
                        '<div class="col-xs bottom-xs"><h4 class="text-left medium no-padding no-margin v-align-bottom text-black"> {{product.name}}</h4></div>' +
                        '</div>' +
                        '<div class="row bottom-xs start-xs">' +
                        '<a class="col-xs bottom-xs" href="/brand/{{product.brand.name}}?q=&hFR[products][0]={{product.DEPARTMENT}}"><h5 class="sbold no-margin no-padding text-black text-spaced-medium text-left v-align-bottom" style="font-size: 15px;">{{product.brand.name}}</h5></a>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xs bottom-xs">' +
                        '{{#if product.sale}}' +
                        '<div class="row bottom-xs end-xs">' +
                        '<div class="col-xs"><h3 class="text-right bold  no-padding no-margin">{{{product.discount}}}%</h3></div>'+
                        '</div>' +
                        '<div class="row bottom-xs end-xs">' +
                        '<div class="col-xs bottom-xs"><h4 class="medium no-margin text-right no-padding" ><span style="text-decoration: line-through; font-size:15px;">{{{originalPrice.formatted}}}</span>{{{price.formatted}}}</h4></div>' +
                        '</div>' +
                        '{{else}}'+
                        '<div class="row bottom-xs end-xs">' +
                        '<div class="col-xs"><h4 class="medium no-margin no-padding text-black text-right" style="">{{{product.price.formatted}}}</h4></div>' +
                        '</div>' +
                        '{{/if}}'+
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'+
                        '<div class="selectedItemDetail full-width">'+
                        '<div class="panel panel-transparent">'+
                        '<div class="tab-content">'+
                        '<div class="tab-pane active" id="tabDetails">'+
                        '<div class="row column-seperation">'+
                        '<div class="col-xs-12">'+
                        '<div class="p-t-20">'+
                        '<h6 class="bold text-black">Colors</h6>'+
                        '<ol class="JBColorList no-style no-padding no-margin">'+
                        '{{#if product.color}}<li class="inline no-padding no-margin"><img class="active bg-image" src="{{{product.mainPicture.mediumUrl}}}"/><div class="text-center no-overflow-text text-black">{{product.color}}</div></li>{{/if}}'+
                        '{{#each product.otherColors}}<li class="inline no-padding no-margin"><a data-product-info="show" _id="{{this._id}}"><img class="bg-image" src="{{{this.mainPicture.mediumUrl}}}"/><div class="text-center no-overflow-text text-black">{{this.color}}</div></a></li>{{/each}}'+
                        '</ol>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="panel panel-transparent no-margin">'+
                        '<div class="panel-body no-padding " style="height:auto;"> <div class="dataTables_wrapper form-inline no-footer"><div class="table-responsive no-border"><table class="table table-hover demo-table-search dataTable no-footer">'+
                        '<thread><tr role="row">'+
                        '<th class="sorting no-padding" rowspan="1" colspan="1">Shop</th>'+
                        '<th class="sorting no-padding hidden-xs" rowspan="1" colspan="1">Colors</th>'+
                        '<th class="sorting no-padding hidden-xs" rowspan="1" colspan="1">Prices</th>'+
                        '<th class="sorting no-padding" rowspan="1" colspan="1">Lowest Price</th>'+
                        '<th class="sorting no-padding hidden-xs" rowspan="1" colspan="1">Shipping & Return </th>'+
                        '<th class="sorting no-padding visible-xs" rowspan="1" colspan="1">Free Return </th>'+
                        '<th class="sorting no-padding " rowspan="1" colspan="1"></th>'+
                        '</tr></thread>'+
                        '<tbody>'+
                        '{{#each product.articles.shops}}'+
                        '<tr >'+
                        '<td class="v-align-middle no-padding p-t-10 "><img src="{{this.shop.logoUrl}}"/></td>'+
                        '<td class="v-align-middle no-padding p-t-10 p-l-5 hidden-xs">'+
                        '<ol class="no-padding no-margin no-style">'+
                        '{{#each this.units}}'+
                        '<li><p class="no-padding no-margin">{{this.color}}</p></li>'+
                        '{{/each}}'+
                        ' </ol>'+
                        '</td>'+
                        '<td class="v-align-middle no-padding p-t-10 p-l-5 hidden-xs">'+
                        '<ol class="no-padding no-margin no-style">'+
                        '{{#each this.units}}'+
                        '<li>'+
                        '<p class="no-padding no-margin">{{this.price.formatted}}{{#if discount}} <span class="bold text-velvet">({{this.discount}}%)</span>{{/if}}</p>'+
                        '</li>'+
                        '{{/each}}'+
                        ' </ol>'+
                        '</td>'+

                        '<td class="v-align-middle no-padding p-t-10">' +
                        '<p class="bold">{{lowest.price.formatted}}</p>' +
                        '</td>'+

                        '<td class="v-align-middle no-padding p-t-10 p-b-5 hidden-xs">' +
                        '<h6 class="bold no-padding no-margin"><font class="text-master medium">Free Return: </font>{{#if this.shop.freeReturn}} Yes {{else}} No {{/if}}</h6>' +
                        '<h6 class="bold no-padding no-margin"><font class="text-master medium">Return Period: </font>{{this.shop.returnPeriod}}</h6>' +
                        '<h6 class="bold no-padding no-margin"><font class="text-master medium">Shipping Cost: </font>{{this.shop.standardShippingCost}}</h6>' +
                        '<h6 class="bold no-padding no-margin"><font class="text-master medium">Shipping Period: </font>{{this.shop.standardShippingTime}}</h6>' +
                        '<h6 class="bold no-padding no-margin"><font class="text-master medium">Free Shipping After: </font>{{this.shop.freeAfter}}</h6>' +
                        '</td>'+
                        '<td class="v-align-middle no-padding p-t-10 p-b-5 visible-xs">' +
                        '<p class="bold no-padding no-margin"><font class="text-master medium"></font>{{#if this.shop.freeReturn}} Yes {{else}} No {{/if}}</p>' +
                        '</td>'+

                        '<td class="v-align-middle no-padding">' +
                        '<button class="btn btn-tag">Go to Shop</button>' +
                        '</td>'+
                        '</tr>'+
                        '{{/each}}'+
                        '</tbody>'+
                        '</table></div></div></div>'+
                        '</div>'+
                        '<div class="hidden-xs">'+
                        '<h6 class="text-black b-b bold b-transparent-white">Description</h6>'+
                        '<div class="description text-black medium">{{product.description}}</div>'+
                        '</div>'+
                        '<div class="visible-xs">'+
                        ' <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">'+
                        '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="headingOne">'+
                        ' <h4 class="panel-title">'+
                        ' <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne" class="collapsed">'+
                        'Description'+
                        ' </a>'+
                        '</h4>'+
                        '</div>'+
                        '<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style="height: 0px;">'+
                        ' <div class="panel-body">{{product.description}}</div>'+
                        '</div>'+
                        ' </div>'+
                        ' </div>'+
                        '</div>'+

                        '</div>'+
                        '</div>'+
                        '<div class="col-md hidden-sm hidden-xs relative"> '+
                        '<ol class="selectedItemSave ">'+
                        '{{#if lastPath}}<li class="delete p-l-10 p-b-10" data-path="{{lastPath}}">'+
                        '<div ><i class=" pg-close_line"> </i></div>'+
                        '</li>{{/if}}'+
                        '<li class="like cursor p-l-10 sm-p-t-10">' +
                        '{{#if isFavored}}'+
                        '<a class="removeFavouriteProduct" _id="{{{this._id}}}" action="/favourite-product/remove">' +
                        '<i class="fa fa-heart text-pink-darker"></i></a>' +
                        '{{else}} '+
                        '<a class="addFavouriteProduct" _id="{{{this._id}}}" action="/favourite-product/add">' +
                        '<i class="fa fa-heart-o"></i></a>' +
                        '{{/if}}' +
                        '</li>'+
                        '</ol>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<ol class="selectedItemSave visible-sm visible-xs">'+
                        '<li class="back p-l-10 p-b-10">'+
                        '<div ><i class=" pg-close_line"> </i></div>'+
                        '</li>'+
                        '<li class="like cursor p-l-10 sm-p-t-10">' +
                        '{{#if isFavored}}'+
                        '<a class="removeFavouriteProduct" _id="{{{this._id}}}" action="/favourite-product/remove">' +
                        '<i class="fa fa-heart text-pink-darker"></i></a>' +
                        '{{else}} '+
                        '<a class="addFavouriteProduct" _id="{{{this._id}}}" action="/favourite-product/add">' +
                        '<i class="fa fa-heart-o"></i></a>' +
                        '{{/if}}' +
                        '</li>'+
                        '</ol>'+
                        '<div class="similarProducts">'+
                        '<div class="relative">'+
                        '<div class="text-center p-t-50 p-b-50" >'+
                        '<div class=" text-center ">' +
                        '<h4>Loading Related Products</h4>'+
                        '<img src="/images/progress/progress-circle-master.svg" style="width:100px; height: 100px">'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>';

//var jawBoneTemplate = Handlebars.compile(jawBoneTemplate_text);


var similarProductTemplate_text= '<div class="row ">'+
                            '{{#if LowerPriceCategoryProducts}}'+
                            '<div class="p-xs-t-10   col-sm-12 col-xs-12 p-b-10 b-b">' +
                            '<h4 class="capitalize text-center"> {{#if style}}{{style}} <small>{{category.name}}</small>{{else}} {{category.name}} {{/if}} at <b>lower price</b></h4>' +
                            '<div id="frameSameCategory" class="auto-margin block">' +
                            '<div class="no-style" id="owlLowerCategory">'+
                            '{{#each LowerPriceCategoryProducts}}'+
                            '<div class="carousel" >' +
                            '<a _id="{{{this._id}}}" data-product-info="show"><img onload="$(this).fadeTo(500, 1);" src="{{{this.mainPicture.mediumUrl}}}"/>' +
                            '<p class="text-center">{{this.price.formatted}} {{#if this.isItSaving}}<br/> <span class="text-velvet" style="font-size: 12px;"><i><img src="/images/nav/compare.png" style="width:20px;"></i>Save <b>{{this.saving}}</b> ({{this.savingPercentage}}%)</span>{{/if}}</p></a>' +
                            '</div>'+
                            '{{/each}}'+
                            '</div>' +
                            '</div>' +
                            '</div>'+
                            '{{/if}}'+

                            '{{#if sameBrandProducts}}'+
                            '<div class="p-xs-t-10  p-t-20 p-b-10  col-sm-12 col-xs-12 b-b">' +
                            '<h4 class="capitalize text-center">Related Products from <b>{{brand.name}}</b></h4>' +
                            '<div id="frameSameBrand" class="auto-margin block">'+
                            '<div class="no-style text-center" id="owlBrand">'+
                            '{{#each sameBrandProducts}}'+
                            '<div class="carousel">' +
                            '<a _id="{{{this._id}}}" data-product-info="show"><img onload="$(this).fadeTo(500, 1);" src="{{{this.mainPicture.mediumUrl}}}"/>' +
                            '<p class="text-center">{{this.price.formatted}} {{#if this.isItSaving}}<br/> <span class="text-velvet" style="font-size: 12px;"><i><img src="/images/nav/compare.png" style="width:20px;"></i>Save <b>{{this.saving}}</b> ({{this.savingPercentage}}%)</span> {{/if}}</p></a>' +
                            '</div>'+
                            '{{/each}}'+
                            '</div>' +
                            '</div>'+
                            '</div>'+
                            '{{/if}}'+
                            '</div>'+
                            '{{#if sameCategoryProducts}}'+
                            '<div class="p-t-30 p-b-30 b-b">' +
                            '<h3 class="capitalize text-center">{{category.name}} <b>Related Products</b></h3>' +
                            '<div id="frameSameCategory" class="auto-margin block">' +
                            '<div class="text-center no-style" id="owlCategory">'+
                            '{{#each sameCategoryProducts}}'+
                            '<div class="flow inline p-b-40">' +
                            '<a _id="{{{this._id}}}" data-product-info="show"><img onload="$(this).fadeTo(500, 1);" src="{{{this.mainPicture.mediumUrl}}}"/>' +
                            '<p class="text-center no-overflow-text">{{this.name}}</p></a>' +
                            '<p class="text-center no-overflow-text">{{this.price.formatted}} {{#if this.isItSaving}}<br/> <span class="text-velvet" style="font-size: 12px;"><i><img src="/images/nav/compare.png" style="width:20px;"></i>Save <b>{{this.saving}}</b> ({{this.savingPercentage}}%)</span>{{/if}}  </p></a>' +
                            '</div>'+
                            '{{/each}}'+
                            '</div>' +
                            '</div>' +
                            '</div>'+
                            '{{/if}}'

var similarProductTemplate = Handlebars.compile(similarProductTemplate_text);


var categoryFacetTemplate_text = '<div class="refinement">'+
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
    '</div>';
var categoryFacetTemplate = Handlebars.compile(categoryFacetTemplate_text)


var listFacetTemplate_text = '{{#if content}}'+
    '<div class="">'+
    '<h5>'+
    '<span class="bg-white text-left all-caps bold">{{header}}</span>'+
    '</h5>'+
    '<div id="listContainer">'+
    '<ul class="list" style="max-height: 160px; overflow: scroll;">'+
    '{{#each content}}' +
    '{{#if (idGenerator this)}}{{/if}}'+
    '{{#if isRefined}}<div><input class="input" type="checkbox" value="{{this.name}}" id="{{this.theID}}" checked/> <label class="label" for="{{this.theID}}"><span class="name ">{{this.name}}</span> <span class="count">{{this.count}}</span></label></div>'+
    '{{else}}		  <div><input class="input" type="checkbox" value="{{this.name}}" id="{{this.theID}}"/> <label class="label" for="{{this.theID}}"><span class="name">{{this.name}}</span><span class="count">{{this.count}}</span></label></div>'+
    '{{/if}}'+
    '{{/each}}'+
    '</ul>'+
    '</div>'+
    '</div>'+
    '{{/if}}'
var listFacetTemplate = Handlebars.compile(listFacetTemplate_text)





var onlySaleBoxFacetTemplate_text = '{{#if content}}'+
    '{{#each content}}'+
    '{{#if isRefined}}<div class="checkbox  checkbox-circle"><input type="checkbox" name="checkbox" value="{{name}}"  id="{{name}}" checked/> <label for="{{name}}"><span class="bold">{{../header}}</span></label></div>'+
    '{{else}}<div class="checkbox  checkbox-circle"><input type="checkbox" name="checkbox" value="{{name}}" id="{{name}}" /> <label for="{{name}}"><span class="bold">{{../header}}</span></label></div>'+
    '{{/if}}'+
    '{{/each}}'+
    '{{/if}}'
var onlySaleBoxFacetTemplate = Handlebars.compile(onlySaleBoxFacetTemplate_text)




var colorFacetTemplate_text= '{{#if content}}'+
    '<h5>'+
    '<span class=" bg-white all-caps bold">{{header}}</span>'+
    '</h5>'+
    '<div class="colorList">'+
    '{{#each content}}'+
    '{{#if isRefined}}<input type="checkbox" name="color" value="{{name}}"   id="{{name}}_{{hex}}" checked/><label for="{{name}}_{{hex}}"  style="background-color:{{hex}}; "><span class="name no-overflow-text">{{name}}</span></label>'+
    '{{else}}         <input type="checkbox" name="color" value="{{name}}"   id="{{name}}_{{hex}}"        /><label for="{{name}}_{{hex}}"  style="background-color:{{hex}}; "><span class="name no-overflow-text">{{name}}</span></label>'+
    '{{/if}}'+
    '{{/each}}'+
    '</div>'+
    '{{/if}}'

var colorFacetTemplate = Handlebars.compile(colorFacetTemplate_text)

var filterTagsTemplate_text = '<div class="">'+
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
var filterTagsTemplate = Handlebars.compile(filterTagsTemplate_text)




var pagingTemplate_text = '{{#if paginate}}'+
    '<div class="clearfix hidden-xs">' +
    '<div class="pull-right btn-rounded p-r-10 p-l-10 b-b b-l b-t b-r b-grey  m-xs-r-10 m-b-20" >' +
    '{{#if hasPrevious}}' +
    '<a class="inline p-r-10 page v-align-middle   p-b-5"  value="{{indexMinusConstant currentPage 1}}"><i class=" pg-arrow_left_line_alt" style="font-size:15px;"></i></a>'+
    '{{/if}}'+
    '{{#if showFirst}}' +
    '<div class="inline"><a class=" page padding-1v p-xs-r-10"  value="0"> 1</a> ... </div>'+
    '{{/if}}' +
    '{{#each pages}}' +
    '<a class="inline page {{class}}  padding-05v p-xs-l-10 p-t-5 p-b-5"  value="{{thePage}}">{{indexPlusConstant thePage 1}}</a>' +
    '{{/each}}' +
    '{{#if showLast}}' +
    '<div class="inline">... <a class=" page padding-1v p-xs-l-10"  value="{{indexMinusConstant totalPages 1}}"> {{totalPages}}</a></div>'+
    '{{/if}}'+
    '{{#if hasNext}}' +
    '<a class="inline p-l-10 page v-align-middle  p-b-5" value="{{indexPlusConstant currentPage 1}}"><i class=" pg-arrow_lright_line_alt " style="font-size:15px;"></i></a>'+
    '{{/if}}'+
    '</div>' +
    '</div>' +

    '<div class="visible-xs p-t-5 p-b-5" style="font-size:20px;">' +
    '<div class="full-width btn-rounded p-r-10 p-l-10 b-b b-l b-t b-r b-grey  m-xs-r-10 m-b-20" >' +
    '{{#if hasPrevious}}' +
    '<a class="pull-left page v-align-middle   p-b-5"  value="{{indexMinusConstant currentPage 1}}" style="font-size: 30px;"><i class=" pg-arrow_left_line_alt" style=""></i></a>'+
    '{{/if}}' +
    '{{#if hasNext}}' +
    '<a class="pull-right page v-align-middle  p-b-5" value="{{indexPlusConstant currentPage 1}}" style="font-size: 30px;"><i class=" pg-arrow_lright_line_alt " style=""></i></a>'+
    '{{/if}}'+

    '<div class="auto-margin block text-center">'+
    '{{#if showFirst}}' +
    '<div class="inline"><a class=" page padding-1v p-xs-r-10"  value="0"> 1</a> ... </div>'+
    '{{/if}}' +
    '{{#each pages}}' +
    '<a class="inline page {{class}}  padding-05v p-xs-l-10 p-t-5 p-b-5"  value="{{thePage}}">{{indexPlusConstant thePage 1}}</a>' +
    '{{/each}}' +
    '{{#if showLast}}' +
    '<div class="inline">... <a class=" page padding-1v p-xs-l-10"  value="{{indexMinusConstant totalPages 1}}"> {{totalPages}}</a></div>'+
    '{{/if}}' +
    '</div>'+


    '</div>' +
    '</div>' +
    '{{/if}}';
var pagingTemplate = Handlebars.compile(pagingTemplate_text);

var welcomeTemplate_text = '{{#if search}}' +
    '<a class="pull-right visible-xs  closeSearch m-xs-r-10"><i class="pg-close_line fa-2x"></i></a>' +
    '<h3 class="all-caps text-spaced text-center font-GothamMedium">{{#if department}}{{department}}/{{/if}} {{name}} "{{query}}"</h3>' +
    '{{#if suggestedBrands}}'+
    '<div class="visible-xs p-b-40">'+
    '<h5 class="all-caps text-spaced text-center font-GothamMedium">{{{nbBrandHits}}}</h5>' +
    '<div class="text-center auto-margin block">' +
    '{{#each suggestedBrands}}' +
    '<a class="dark inline p-l-20 bold" href="/brand/{{{name}}}"><div class="brandsAC text-center">' +
    '<span class="">{{{ _highlightResult.name.value }}}</span>' +
    '</div></a>'+
    '{{/each}}' +
    '</div></div>'+
    '{{/if}}'+
    '<h5 class="all-caps text-spaced text-center font-GothamMedium">{{{nbHits}}}</h5>' +
    '{{else}}' +
    '<h1 class="all-caps text-spaced-medium text-center font-GothamMedium ">{{name}} </h1>' +
    '<h5 class="all-caps text-spaced-medium text-center font-GothamMedium">{{department}}{{#if subCategory}}/{{subCategory}} {{/if}}</h5>' +
    '{{#if attributes}}<div class=" auto-margin block text-center p-b-20">' +
    '<h5 class="all-caps bold  b-b">Styles</h5>' +
    '{{#each attributes}}<p class="inline text-center p-r-10 p-l-10">{{this.name}}</p>{{/each}}</div>{{/if}}' +
    '{{/if}}'
var welcomeTemplate = Handlebars.compile( welcomeTemplate_text)


//AUTOCOMEPLETE
var searchDropDownTemplate =  Handlebars.compile(
    '<div class="my-custom-menu">'+
    '<div class="row padding-2v">'+
    '<div class="col-md-1 hidden-xs hidden-sm"><h1 class="light">Your Search Result</h1></div>'+
    '<div class="col-xs-5 col-md-4 col-sm-offset-1 text-center" id="dditemListContainer">' +
    '<h5 class="text-left b-b bold text-pink-darker">Products</h5>'+
    '<div class="aa-dataset-0" id="dditemList"></div>'+
    '</div>'+
    '<div class="col-md-3 col-sm-offset-1 col-xs-5  col-xs-12 text-center" id="ddCol2">' +
    '<div id="ddBrands">'+
    '<div>'+
    '<h5 class="text-left b-b bold text-pink-darker" >Brands</h5>'+
    '</div>'+
    '<div class="aa-dataset-1"></div>'+
    '<div class="aa-dataset-2"></div>' +
    '</div>'+
    '<div id="ddCategory">'+
    '</div>' +
    '</div>'+
    '<div class="col-xs col-xs-offset-1 relative text-center no-overflow" style="display: none; " id="ddProductPreview">' +
    '<div class="top-left bottom-right" id="ddProductPreviewContainer">' +
    '</div>' +
    '</div>' +
    '</div>'+
    '</div>'
)
var searchDropDownMobileTemplate =  Handlebars.compile(
    '<div class="my-custom-menu scrollable">'+
    '<div class="row padding-2v">'+
    '<div class="col-xs-12 text-center" id="ddCol2">' +
    '<div id="ddBrands">'+
    '<div>'+
    '<h5 class="text-left b-b bold text-pink-darker" >Products</h5>'+
    '</div>'+
    '<div class="aa-dataset-2"></div>'+
    '<div>'+
    '<h5 class="text-left b-b bold text-pink-darker" >Brands</h5>'+
    '</div>'+
    '<div class="aa-dataset-3"></div>' +
    '</div>'+
    '<div id="ddCategory">'+
    '</div>' +
    '</div>'+
    '</div>'+
    '</div>'
)

var ACTemplateProduct = Handlebars.compile(
    '{{#if more}}' +
    '<a id="ddsearchMore"><h5 class="b-b b-t b-r b-l"><font class="text-pink-darker bold">{{nbHits}}</font> {{text}} </h5></a>' +
    '{{else}}' +
    '<a class="findBetterPrices dark" _id="{{objectID}}" href="/view/{{objectID}}"><div data-id="{{objectID}}"  href="/view/{{objectID}}" class="productsAC m-b-5 text-left">'+
    '<div><img src="{{{mainPicture.smallUrl}}}" width="40" height="auto"/></div>'+
    '<div class="b-b b-grey relative" style="font-size:12px;"> ' +
    '<div>' +
    '<div class=" bold">{{{ brand.name}}}</div>' +
    '<div class="medium">{{{ _highlightResult.name.value }}}</div>' +
    '<div class="medium inline">{{{ price.formatted}}}</div>' +
    '</div>'+
    '<div class="bottom-right hidden-xs visible-hover"> ' +
    '</div>'+
    '</div></div></a>'+
    '{{/if}}'
);


var ACTemplateBrand = Handlebars.compile('<a class="dark" href="/brand/{{name}}?q=&hFR[products][0]={{DEPARTMENT}}"><div class="brandsAC text-left">' +
    '<div>{{#if logoUrl}}<img src="{{logoUrl}}" width="40" height="auto"/>{{/if}}</div>'+
    '<div class="b-b b-grey p-l-10"><div class="name medium"><span class="">{{{ _highlightResult.name.value }}}</span></div></div>' +
    '</div></a>');

var ACProductPreviewTemplate= Handlebars.compile(
    '<div class="row">' +
    '<div class="col-xs-7"><img  src="{{mainPicture.largeUrl}}" style="width: 100%"/>' +
    '</div>' +
    '<div class="col-xs col-xs-offset-1"><ol class="slidee no-style">'+
    '{{#each auxPictures}}'+
    '{{#if (upToIndex @index 1)}}<li class="p-t-1v"><img src="{{largeUrl}}" style="width: 100%" /></li>{{/if}}'+
    '{{/each}}'+
    '</ol>'+
    '</div>'+
    '</div>'+
    '<div class="overlayer bottom-left full-width">' +
    '<div class="overlayer-wrapper item-info more-content">' +
    '<div class="gradient-grey p-l-20 p-r-20 p-t-20 p-b-5">' +
    '<div class="row top-xs">' +
    '<div class="col-xs-6 bottom-xs">' +
    '<div class="row bottom-xs start-xs">' +
    '<div class="col-xs bottom-xs"><h4 class="text-left medium text-white no-padding no-margin v-align-bottom"> {{name}}</h4></div>' +
    '</div>' +
    '<div class="row bottom-xs start-xs">' +
    '<div class="col-xs bottom-xs"><h5 class="sbold no-margin no-padding text-pink-dark text-left v-align-bottom" style="font-size: 15px;"><span class="light text-white">{{autoComplete.brand}} :</span> {{brand.name}}</h5></div>' +
    '</div>' +
    '<div class="row bottom-xs start-xs">' +
    '<div class="col-xs bottom-xs"><p class="bold text-left text-white v-align-bottom"><span class="light">{{autoComplete.shop}} :</span> {{shop.name}}</p></div>'+
    '</div>' +
    '</div>' +
    '<div class="col-xs bottom-xs">' +
    '{{#if sale}}' +
    '<div class="row bottom-xs end-xs">' +
    '<div class="col-xs"><h3 class="text-right bold text-white no-padding no-margin">{{{discount}}}%</h3></div>' +
    '</div>' +
    '<div class="row bottom-xs end-xs">' +
    '<div class="col-xs bottom-xs"><h4 class="medium no-margin text-right no-padding text-pink-dark" ><span class="text-white" style="text-decoration: line-through; font-size:15px;">{{{originalPrice.formatted}}}</span>{{{price.formatted}}}</h4></div>' +
    '</div>' +
    '{{else}}'+
    '<div class="row bottom-xs end-xs">' +
    '<div class="col-xs"><h4 class="medium no-margin no-padding text-pink-dark text-right" style="">{{{price.formatted}}}</h4></div>' +
    '</div>' +
    '{{/if}}'+
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'+
    '</div>'
);


//NEWSLETTER
var newsletterTemplate = Handlebars.compile(
    '{{#if form}}'+
    '<p>{{form.body}}</p>'+
    '<form id="newsletterSignupForm" action="/newsletter-signup">'+
    '<input name="email" type="email" id="newsletterSignupEmail"/>'+
    '</form>'+
    '{{/if}}'+

    '{{#if success}}'+
    '<p>{{success.body}}</p>'+
    '<a class="bold" id="addNewsletterEmail">{{success.addAnother}}</a>'+
    '{{/if}}'+

    '{{#if fail}}'+
     '<p>{{fail.body}}</p>'+
     '<form id="newsletterSignupForm" action="/newsletter-signup">'+
     '<input name="email" type="email" id="newsletterSignupEmail"/>'+
     '</form>'+
     '{{/if}}'
)
/*****Render Color LIST*******/

