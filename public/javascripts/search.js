




var colors = [
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

var client2 = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');


var itemQuery = algoliasearchHelper(client2,'products_sv', {
	facets:['categoryKeys', 'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','shop.name','sizes', 'discount']
});

//var brandQuery = algoliasearchHelper(client2,'brands_sv')
var newQuery = false;


var productIndex = client2.initIndex('products_sv');
var brandIndex = client2.initIndex('brands_sv');

var templateProduct = Hogan.compile(
	'<a class="dark" href="{{{shopUrl}}}"><div class="productsAC m-b-5 text-left">'+
	'<div><img src="{{{picture.smallUrl}}}" width="40" height="auto"/></div>'+
	'<div class="b-b b-grey" style="font-size:12px;"> ' +
	'<div class="brand bold">{{{ brand.name}}}</div>' +
	'<div class="name medium">{{{ _highlightResult.name.value }}}</div>' +
	'<div class="price medium inline">{{{ price.formatted}}}</div>' +
	'</div></div></a>'
);

var templateBrand = Hogan.compile('<a class="dark" href="/brand/{{{name}}}"><div class="brandsAC text-left">' +
	'<div>{{#logoUrl}}<img src="{{logoUrl}}" width="40" height="auto"/>{{/logoUrl}}</div>'+
	'<div class="b-b b-grey p-l-10"><div class="name medium"><span class="">{{{ _highlightResult.name.value }}}</span></div></div>' +
	'</div></a>');

autocomplete('#search', {
	dropdownMenuContainer: '#containerAC',
	hints:true,
	templates: {
		dropdownMenu: '#my-custom-menu-template'
		}
	},
	[
			{
				source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
				displayKey: 'name',
				templates: {
					suggestion: function(suggestion) {
						return templateProduct.render(suggestion);
					},
					empty: function(empty) {
						return '<h5 class="text-left">No Items Found</h5>';
					}
				}
			} ,
			{
				source: autocomplete.sources.hits(brandIndex, {hitsPerPage: 7}),
					displayKey: 'name',
					templates: {
						suggestion: function(suggestion, answer) {
						return templateBrand.render(suggestion);
						},
						empty: function(empty) {
							return '<h5 class="text-left">No Items Found</h5>';
						}
				}
			}
	]
).on('autocomplete:selected', function(event, suggestion, dataset) {
	console.log(suggestion, dataset);
	//window.location ='/brand/'+suggestion.name;
});


function searchLoading(){
	return '<div class="row">'+
				'<div class="col-md-12">'+
					'<div class="fetching text-center ">'+
					'<h5 class="bold" style="color:#ddd;">Loading</h5>'+
					'<img src="/images/loading.svg" style="width:4vw;">'+
					'</div>'+
				'</div>'+
			'</div>';

}

/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */
/*****Render Products*******/
function renderSearchProducts(items){
	var html='';
	items.forEach(function (item){
		var price='';
		if(item.price.value === item.originalPrice.value){
			price = '<span class="original-price">'+ item.originalPrice.formatted +'</span>';
		}
		else{
			price = '<span class="original-price discounted">'+ item.originalPrice.formatted  +'</span>' +
				'<span class="discounted-price">'+ item.price.formatted  +'</span>' +
				'<span class="discounted-percentage">'+ item.discount+ '%' +'</span>';
		};

		html += '<li  class="searchItem" productId="'+item.productId +'">'+
			'<img class="preview-image" src="'+ item.picture.largeUrl +'" alt="'+ item.name+'"  productId="'+item.productId +'"/>'+
			'<span class="item-brand  sbold">' + item.brand.name + '</span>'+
			'<span class="item-name medium">'  + item.name + '</span>' +
			price +
			'<ol class="small-options">'+
			'<li class="like"> <a href="#"><i class="fa  fa-heart-o"></i></a></li>' +
			'</ol>' +
			' <div class="main-options">'+
			'<a><button class="btn  btn-info GoStore">Go to store</button></a>' +
			'<button class="btn btn-info moreInfo" productId="'+item.productId +'">More Info</button>' +
			'</div>'+
			'</li>';
		//'<a href="'+ item.shopUrl +'" target="_blank"><button class="btn  btn-info GoStore">Go to store</button></a>' +

	})

	$('.itemSearchList').html(html);
}

/******RENDER Categories***************/
function renderSearchCategories(content){

}
/******RENDER Brands***************/
function renderSearchBrands(content){
    var html = '';
	var result = content.getFacetValues('brand.name');
	if(result.length==0){
        $('.searchBrands').hide();
        return;
    }
    result.forEach(function(brand){
		var concatId = brand.name +"_search";
		if(brand.isRefined)
		 html += '<div ><input class="input value" type="checkbox" id="'+concatId+'"  value="'+brand.name+'" checked/> <label class="label" for="'+concatId+'"><span class="name">'+brand.name+'</span> <span class="count">'+brand.count+'</span></label></div>';
		else
			html += '<div ><input class="input value" type="checkbox" id="'+concatId+'"  value="'+brand.name+'" /> <label class="label" for="'+concatId+'"><span class="name">'+brand.name+'</span> <span class="count">'+brand.count+'</span></label></div>';


	})
	$('#brandSearchList .list').html(html);
    if($('.searchBrands').is(":hidden")) $('.searchBrands').show();
}

/******RENDER SIZES***************/
function renderSearchSizes(content){
	var html ='';
	var result = content.getFacetValues('sizes');
	if(result.length==0){
		$('.searchSizes').hide();
		return;
	}
	result.forEach(function(size){
		var concatId = size.name +"_search";
		if(size.isRefined)
			html += '<div ><input class="input value" type="checkbox" id="'+concatId+'"  value="'+size.name+'" checked/> <label class="label" for="'+concatId+'"><span class="name">'+size.name+'</span> <span class="count">'+size.count+'</span></label></div>';
		else
			html += '<div ><input class="input value" type="checkbox" id="'+concatId+'"  value="'+size.name+'" /> <label class="label" for="'+concatId+'"><span class="name">'+size.name+'</span> <span class="count">'+size.count+'</span></label></div>';


	})
	$('#sizeSearchList .list').html(html);

	if($('.searchSizes').is(":hidden")) $('.searchSizes').show();
}

/*****Render Color LIST*******/

function Array2ObjectColorMatchSearch(nameKey, myArray){
	for (var i=0; i < myArray.length; i++) {
		if (myArray[i].displayName === nameKey) {
			return myArray[i];
		}
	}
	var x={}
	x.displayName = 'none';
	return x;
}

function renderSearchColors(content){
	var result = content.getFacetValues('color');

	if(result.length==0){
		$('.searchColors').hide();
		return;
	}
	var html='';
	result.forEach(function(color){
		var colorProps =  Array2ObjectColorMatchSearch(color.name, colors);
		var concatId = colorProps.displayName+'Search';
		if(color.isRefined){
			if(colorProps.displayName != 'none')
				html += '<input type="checkbox" name="color" value="'+colorProps.displayName+'"  id="'+ concatId +'" checked/><label for="'+ concatId+'"  style="background-color:'+colorProps.hex+'; "><span class="name">'+colorProps.displayName+'</span></label>';
		}
		else{
			if(colorProps.displayName != 'none')
				html += '<input type="checkbox" name="color" value="'+colorProps.displayName+'"  id="'+ concatId +'" /><label for="'+ concatId +'"  style="background-color:'+colorProps.hex+'; "><span class="name">'+colorProps.displayName+'</span></label>';
		}
	})
	$('#colorSearchList').html(html);
	if($('.searchColors').is(":hidden")) $('.searchColors').show();
}

/*****Pricing Render*******/
function renderSearchPrices(content) {

    var result = content.getFacetStats('price.value');

	if(result !=null){
		if(result.length != 0){
			$("#priceSearchBar").show();

			$("#priceSearchRange").ionRangeSlider({
				type: "double",
				min: result.min,
				max: result.max,
				prefix: "SEK" ,
				onFinish: function (data) {

					itemQuery.removeNumericRefinement('price.value')
						.addNumericRefinement('price.value','>', data.from)
						.addNumericRefinement('price.value','<', data.to)
						.search();

				}
			});
		}
		else
			$("#priceSearchBar").hide();
	}
	else
		$("#priceSearchBar").hide();

	var result2 = content.getFacetValues('sale');

	var selector2 = $('#saleSearchBox');
    if(result2.hasOwnProperty("length")) {
        if (result2.length == 0) {
            selector2.hide();
        }
        else {
            for (var i = 0; i < result2.length; i++) {
                if (result2[i].name === 'true') {
                    if (result2[i].count > 0) {

						var concatId = result2[i].name+"_Search";
						if(result2[i].isRefined){
							selector2.html('<div class="checkbox value="'+result2[i].name+'"  checkbox-circle"><input type="checkbox" name="checkbox"  id="'+ concatId +'" checked/> <label for="'+ concatId+'"><span>Only Sale</span></label></div>');


						}
						else{
							selector2.html('<div class="checkbox value="'+result2[i].name+'"  checkbox-circle"><input type="checkbox" name="checkbox"  id="'+ concatId +'" /> <label for="'+ concatId +'"><span>Only Sale</span></label></div>');
						}
						selector2.show();
					}
                }

            }
        }
    }
    else{
        selector2.hide();
    }


	var result3 = content.getFacetValues('discount');
    var discountSelector= $('.searchDiscounts');
    if(result3.hasOwnProperty("length")) {
		var html = '';
        if(result3.length==0){
            discountSelector.hide();
            return;
        }
        result3.forEach(function(discount){
            if(discount.name != '0'){
				var concatId2 = discount.name+"_Search";
				if(discount.isRefined)
					html += '<div><input class="input" value="'+discount.name+'" type="checkbox" id="'+concatId2+'" checked/> <label class="label" for="'+concatId2+'"><span class="name">'+discount.name+'</span> <span class="count">'+discount.count+'</span></label></div>';
				else
					html += '<div><input class="input" value="'+discount.name+'" type="checkbox" id="'+concatId2+'"/> <label class="label" for="'+concatId2+'"><span class="name">'+discount.name+'</span> <span class="count">'+discount.count+'</span></label></div>';
			}
		})
		$('#discountSearchList ul').html(html);
        if(discountSelector.is(":hidden")) discountSelector.show();
    }
    else{
        discountSelector.hide();
    }
}

/*****Render Shop LIST*******/

function renderSearchShops(content){
	var result = content.getFacetValues('shop.name');
    var selector = $('.searchShops');
    if(result.hasOwnProperty("length")) {
        if(result.length==0){
            selector.hide();
            return;
        }
        var html='';
        result.forEach(function(shop){
            html += '<div class="checkbox  checkbox-circle"><input type="checkbox" name="shop" value="'+shop.name+'" id="'+shop.name+'Search"> <label for="'+shop.name+'Search"><span>'+shop.name+'</span></label></div>';
        })
        $('#shopSearchList').html(html);
        if(selector.is(":hidden")) selector.show();
    }
    else{

    }

}

/*****Facet Router*******/
function renderSearchFacets(content){
    renderSearchCategories(content);
	renderSearchBrands(content);
	renderSearchSizes(content);
	renderSearchPrices(content);
	renderSearchShops(content);
	renderSearchColors(content);
	//var position = $('#searchPane').offset().top;
	//console.log(position)
	//$(document).scrollTop(position) ;
}
//**************BEG JAWBONE CONTENT **********
function  createJawBoneSearchLoader(){
	return  '<div class="jawBone" style="padding-top:20vw">'+
			searchLoading()+
			'</div>';
}

function  createJawBoneSearchContent(itemId){
	$.ajax({
		url: 'https://api.zalando.com/articles/'+itemId,
		type: 'get',
		dataType: 'json',
		error: function(data){

		},
		success: function(data){
			// Get all Images
			var allImages='';
			var numOfImages = data.media.images.length;
			$.each(data.media.images, function(i,item) {
				allImages += '<li><img imageorder ="'+ i +'" src="'+ item.smallUrl +'" /></li>';
			});


			// Check Pricing and Sizes
			var pricing='';
			var sizes='';
			var discountDetected = false;
			var discountLocation;
			var discountPercentage = 0;

			$.each(data.units, function(i,item) {
				var currentprice = item.price.value ;
				var originalprice = item.originalPrice.value;
				if (currentprice !== originalprice){
					discountDetected = true;
					var percentage = 100 - ((currentprice / originalprice) *100);

					if (percentage > discountPercentage){
						discountPercentage = percentage;
						discountLocation = i;
					}
				}
			});


			if(!discountDetected){
				pricing += '<span class="original-price">'+ data.units[0].originalPrice.formatted +'</span>';
			}
			else{
				pricing = '<span class="selectedItemOriginalPercentage">'+ Math.ceil(discountPercentage) + '%' +'</span>'+
					'<span class="selectedItemOriginalPrice discounted">'+ data.units[discountLocation].originalPrice.formatted  +'</span>' +
					'<span class="selectedItemDiscountedPrice">'+ data.units[discountLocation].price.formatted  +'</span>' ;
			}

			// ProductDetails
			var productDetails='';
			$.each(data.attributes, function(i,item) {
				productDetails += '<li>'+ item.name +': <span>'+ item.values +'</span></li>';
			});

			//ATTACH ITEM CONTENT TO JAWBONE
			var html = '<div class="jawBone" id="jawboneSearchContent">'+
				'<div class="mainWrapper">'+
				'<div class="selectedItemImageWrapper">'+
				'<div class="selectedItemImageColoumn frame" id="selectedItemImages" numOfImages="'+numOfImages+'">'+
				'<ol class="slidee">'+
				allImages+
				'</ol>'+
				'</div>'+
				'<div class="selectedItemPictureContainer">'+
				'<div class="selectedItemZoomPicture">'+
				'<div class="prev-item"><i class="  pg-arrow_left_line_alt"></i></div> <div class="next-item"><i class=" pg-arrow_lright_line_alt"></i></div>'+
				' <img imageorder = "0" src="'+data.media.images[0].largeUrl +'"/>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'<div class="selectedItemDescriptionContainer">'+
				'<div class="selectedItemHeader">'+
				'<div class="headerWrapper ">'+
				'<div><img src="'+data.brand.logoUrl+'"/></div>'+
				'<h2 class="selectedItemBrand">'+ data.brand.name +'</h2>'+
				'<h5 class="selectedItemName">'+ data.name +'</h5>'+
				'</div>'+
				'<div class="priceLocation">'+
				pricing+
				'</div>'+
				'</div>'+
				'<div class="selectedItemActions">'+
				'<button class="btn  btn-info"> Go To Shop</button>'+
				'</div>'+
				'<div class="selectedItemDetail">'+
				'<div class="panel">'+
				'<ul class="nav nav-tabs nav-tabs-simple hidden-xs"  data-init-reponsive-tabs="collapse">'+
				'<li class="active"><a href="#tabDetails_'+data.id+'"  data-toggle="tab" aria-expanded="true">Description</a></li>'+
				'<li class=""><a href="#tabReviews_'+data.id+'"   data-toggle="tab" aria-expanded="false">Reviews</a></li>'+
				'</ul>'+
				'<div class="tab-content hidden-xs">'+
				'<div class="tab-pane active" id="tabDetails_'+data.id+'">'+
				'<div class="row column-seperation">'+
				'<div class="col-md-5"></div>'+
				'<div class="col-md-7">'+'<ol class="selectedItemDetailList">'+ productDetails +'</ol>'+'</div>'+
				'</div>'+
				'</div>'+
				'<div class="tab-pane" id="tabReviews_'+data.id+'">'+ searchLoading()+'</div>'+
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
				'<li><div class="cart"><i class="fa  fa-share-alt"></i></div></li>'+
				'</ol>'+
				'</div>';

			$('.jawBoneSearchContainer').html(html);
			//getRecommendations(location, itemId);
		}
	});
}
/************************************/
function searchCallback() {
	var q = $('#search').val();
	$('#search').blur();
	var loading = $('#searchLoading');
	var brandSelector= $('.brandSuggestion');
	var resultSelector= $('.resultSearchContainer');

	var mainSection = $('#mainSection');
	var searchSection = $('#searchSection');

	//if(q.length < 3) return;
	closeJawbone();

	if(q.length ==  0){
		if(searchSection.is(':visible')) searchSection.hide();
		if(mainSection.is(':hidden')){
			mainSection.show();
			$(document).scrollTop(10);
		}
		return;
	}

	loading.show();
	brandSelector.hide();
	resultSelector.hide();
	resultSelector.addClass('noFilter');
	if(mainSection.is(':visible')) mainSection.hide();
	if(searchSection.is(':hidden')){
		searchSection.show();
		$(document).scrollTop(10);
	}
	newQuery = true;
	itemQuery.clearRefinements().setQuery(q);

	if(!jQuery.isEmptyObject(DEPARTMENT))
		itemQuery.addFacetRefinement('categoryKeys', DEPARTMENT.key);

	itemQuery.search();
	//brandQuery.setQuery(q).search();
}

function closeJawbone(){
	var itemList = $('.itemSearchList');
	itemList.removeClass("jbMode");
	itemList.removeClass('horizontal').addClass('vertical');
	$('.jawBoneSearchContent').removeClass( "open");
	$('#jawboneSearchContent').remove();
	$('.resultSearchContainer').removeClass('noFilter');

}

$(document).ready( function() {

   var searchSection = $('#searchSection');
   var searchFacetContainer = $('#searchFacetContainer');
   var searchFacetSelector = $('#searchFacetPane');

	itemQuery.on('result', function(content) {
		var itemsSelector = $('.itemSearchList');
		var resultSelector= $('.resultSearchContainer');
		var loading = $('#searchLoading');
		if(content.hits.length > 0){
			renderSearchProducts(content.hits);
			renderSearchFacets(content);

			resultSelector.removeClass('noFilter');
		}
		else{
			itemsSelector.html('<h1 class=" text-center bg-master-lighter" style="padding: 5vw;"><i class="fa fa-thumbs-down"></i><br/>Zero Product<h1>');
		}
		if(newQuery) $(document).scrollTop(20);
		newQuery = false;
		loading.hide();
		resultSelector.show();
	});

	/*brandQuery.on('result', function(content) {
		var brandSelector= $('.brandSuggestionContainer');
        var brandSuggestionList = $('#brandSuggestions');

		if(content.hits.length > 0){
			var html = '';
			content.hits.forEach(function (brand){
				html+= '<a class="medium text-white bold" href="/brand/'+brand.name+'"><li>'+brand.name+'</li></a>'
			})
			brandSuggestionList.html(html);
			brandSelector.show();
		}
		else{
			brandSuggestionList.html('<h3 class="">Zero Brands</h3>');
		}
		searchFacetPaneScroll();
	});*/

	$('#search').on( 'change', searchCallback)

	$('#searchSubmit').on( 'click', searchCallback)

	$('#closeSearch').on( 'click', function(event){
		$('#search').val('');
		$('#searchSection').hide();
		$('#mainSection').show();
	})

    //*******************************************Filter Actions


	$('#brandSearchList').on( 'change', 'input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			itemQuery.addDisjunctiveFacetRefinement('brand.name', value).search();
		}
		else{
			itemQuery.removeDisjunctiveFacetRefinement('brand.name', value).search();
		}

    });

    $('#sizeSearchList').on( 'change', 'input', function (event) {
        var value = $(this).attr('value');
        //console.log(value);
        if($(this).prop('checked')){
            itemQuery.addDisjunctiveFacetRefinement('sizes', value).search();
        }
        else{
            itemQuery.removeDisjunctiveFacetRefinement('sizes', value).search();
        }
    });

    $('#colorSearchList').on( 'change', 'input', function (event) {
		var value = $(this).attr('value');
        if( $(this).prop('checked')){
            itemQuery.addDisjunctiveFacetRefinement('color', value).search();
        }
        else{
            itemQuery.removeDisjunctiveFacetRefinement('color', value).search();
        }
    });

    $('#discountSearchList').on( 'change', 'input', function (event) {
        var value = $(this).attr('value');

        if( $(this).prop('checked')){
            itemQuery.addDisjunctiveFacetRefinement('discount', value).search();
        }
        else{
            itemQuery.removeDisjunctiveFacetRefinement('discount', value).search();
        }
    });

    $('#shopSearchList').on( 'change', 'input', function (event) {
        var value = $(this).attr('value');

        if( $(this).prop('checked')){
            itemQuery.addDisjunctiveFacetRefinement('shop.name', value).search();
        }
        else{
            itemQuery.removeDisjunctiveFacetRefinement('shop.name', value).search();
        }
    });

    $('#saleSearchBox').on( 'change', 'input', function (event) {
        var value = $(this).attr('value');

        if( $(this).prop('checked')){
            itemQuery.addFacetRefinement('sale', value).search();
        }
        else{
            itemQuery.removeFacetRefinement('sale', value).search();
        }
    });




	//***************JAWBONE****
	$('.itemSearchList').on( 'click','.searchItem .preview-image, .searchItem .moreInfo' , function (event) {
		//console.log('*******')
		var itemcontainer = $('.itemSearchList');
		var jawboneLocation = $('#searchJawbone');
		var selecteditem = $(this).attr('productId');
		$('.resultSearchContainer').addClass('noFilter');
		itemcontainer.removeClass('vertical').addClass('horizontal');
		$('.jawBoneSearchContainer').html(createJawBoneSearchLoader());
		jawboneLocation.addClass( "open");
		$('html, body').animate({scrollTop: itemcontainer.offset().top - 100 }, 1, $.bez([.5,0,.1,1]));
		createJawBoneSearchContent(selecteditem);
		itemcontainer.addClass("jbMode");
	});

	searchSection.on( 'click','#jawboneSearchContent .delete' , function (event){
		closeJawbone();
	});

	//*******************************************JAWBONE ACTIONS - Product Showcase
	//******Hover over mini images
	searchSection.on( 'mouseover','.jawBone .selectedItemImageColoumn ol li img' , function (event) {
		var newImage = $(this).attr('src').replace('catalog','large');
		var location = $(this).closest('.selectedItemImageWrapper').find('.selectedItemPictureContainer').find('.selectedItemZoomPicture');
		location.find('img:first').remove();
		location.append('<img imageorder = "'+$(this).attr('imageorder') +'" src="'+newImage+'"/>');
	});

	//******CLICK NEXT
	searchSection.on( 'click','.jawBone .next-item' , function (event) {
		var currentImage = $(this).closest('.selectedItemZoomPicture').find('img');
		var currentImageOrder = parseInt(currentImage.attr('imageorder'));

		var coloumnImages = $(this).closest('.selectedItemImageWrapper').find('.selectedItemImageColoumn');
		var coloumnImagesLength = parseInt(coloumnImages.attr('numofimages'));

		var newImageLocation;
		if(currentImageOrder < (coloumnImagesLength-1)) newImageLocation = currentImageOrder + 1;
		else newImageLocation = 0;
		var nthchild = newImageLocation + 1;

		var newImageSrc = coloumnImages.find('ol li:nth-child('+nthchild+')').find('img').attr('src').replace('catalog','large');
		currentImage.remove();
		$(this).closest('.selectedItemZoomPicture').append('<img imageorder = "'+newImageLocation+'" src="'+newImageSrc+'"/>');
	});

	//******CLICK PREV
	searchSection.on( 'click','.jawBone .prev-item' , function (event) {
		var currentImage = $(this).closest('.selectedItemZoomPicture').find('img');
		var currentImageOrder = parseInt(currentImage.attr('imageorder'));

		var coloumnImages = $(this).closest('.selectedItemImageWrapper').find('.selectedItemImageColoumn');
		var coloumnImagesLength = parseInt(coloumnImages.attr('numofimages'));

		var newImageLocation;
		if(currentImageOrder > 0) newImageLocation = currentImageOrder - 1;
		else newImageLocation = coloumnImagesLength-1;
		var nthchild = newImageLocation + 1;

		var newImageSrc = coloumnImages.find('ol li:nth-child('+nthchild+')').find('img').attr('src').replace('catalog','large');
		currentImage.remove();
		$(this).closest('.selectedItemZoomPicture').append('<img imageorder = "'+newImageLocation+'" src="'+newImageSrc+'"/>');
	});

	var previousScroll = 0;
	var downStateChanged = false;
	var upStateChanged = false;
	function searchFacetPaneScroll(){
		/*var currentScroll2 = $(this).scrollTop();
		var filterPosition = searchFacetSelector.offset();
		if (currentScroll2 + searchFacetContainer.height() >= $('#footer').offset().top -40 ) {
			searchFacetContainer.addClass('pull-bottom').removeClass('fixedFacet');
		}
		else if (currentScroll2 > (filterPosition.top - 100)) {
			searchFacetContainer.addClass('fixedFacet').removeClass('pull-bottom');
		}
		else if (currentScroll2 < (filterPosition.top - 100)) {
			searchFacetContainer.removeClass('fixedFacet').removeClass('pull-bottom');
		}*/

		var currentScroll = $(document).scrollTop();
		var footerPosition = $('#footer').offset();
		var filterPosition = searchFacetSelector.offset();
		var headerHeight = $('.header').height();
		var filterWrapperPosition=$('.facetSearchWrapper').offset();
		var filterHeight = $('.facetSearchWrapper').height();

		if(currentScroll +  headerHeight<= filterPosition.top){
			searchFacetContainer.css('position','absolute').css('top','0px').css('bottom', 'auto');
		}
		else if(currentScroll + searchFacetContainer.height() >= footerPosition.top -10){
			searchFacetContainer.css('position','absolute').css('top','auto').css('bottom', '10px');
		}
		else if(previousScroll<currentScroll ){

			if(!upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top ){
				searchFacetContainer.css('position','absolute').css('bottom','auto').css('top', filterWrapperPosition.top-filterPosition.top);
				downStateChanged = false;
				upStateChanged = true;
			}
			else if(upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top && currentScroll + $(window).height() <= filterWrapperPosition.top + filterHeight){

			}
			else if(upStateChanged && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight){
				searchFacetContainer.css('position','fixed').css('bottom','0').css('top', 'auto');
			}

		}
		else if (previousScroll>currentScroll)
		{
			if(!downStateChanged && currentScroll - headerHeight <= filterWrapperPosition.top + filterHeight ){
				searchFacetContainer.css('position','absolute').css('bottom', 'auto').css('top', filterWrapperPosition.top-filterPosition.top);
				downStateChanged = true;
				upStateChanged = false;
			}
			else if(downStateChanged && currentScroll + headerHeight <= filterWrapperPosition.top && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight ){

			}
			else if(downStateChanged && currentScroll + headerHeight  < filterWrapperPosition.top){
				searchFacetContainer.css('position','fixed').css('top', headerHeight).css('bottom', 'auto');
			}
		}
			previousScroll= currentScroll;
	}

	$(window).scroll(function () {
		if(searchSection.is(':visible')) {
			searchFacetPaneScroll();
		}
	});

});