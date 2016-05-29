
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

var client = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var helper = algoliasearchHelper(client,'products_sv', {
	facets:['categoryKeys', 'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','shop.name','sizes', 'discount']
});
/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */
/*****Render Products*******/
function renderProducts(items){
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

			html += '<li  class="item offer" productId="'+item.productId +'">'+
				'<img class="preview-image" src="'+ item.picture.largeUrl +'" alt="'+ item.name+'"  productId="'+item.productId +'"/>'+
				'<span class="item-brand sbold">' + item.brand.name + '</span>'+
				'<span class="item-name medium">'  + item.name + '</span>' +
				price +
				'<ol class="small-options">'+
				'<li class="delete"><a href="#"><i class=" pg-close_line"> </i></a></li>' +
				'<li class="like"> <a href="#"><i class="  fa  fa-heart-o"></i></a></li>' +
				'<li class="cart"> <a href="#"><i class="fa fa-share-alt"></i></a></li>' +
				'</ol>' +
				' <div class="main-options">'+
				'<a><button class="btn  btn-info GoStore">Go to store</button></a>' +
				'<button class="btn btn-info moreInfo" productId="'+item.productId +'">More Info</button>' +
				'</div>'+
				'</li>';
			//'<a href="'+ item.shopUrl +'" target="_blank"><button class="btn  btn-info GoStore">Go to store</button></a>' +
		})

		$('.itemList').html(html);
	}

/******RENDER Brands***************/
function renderBrands(content){
	var html = '';
	var result = content.getFacetValues('brand.name');
	if(result != null){
		if(result.length==0){
			$('.brands').hide();
			return;
		}
		result.forEach(function(brand){

				if(brand.isRefined)
					html += '<div><input class="input" checked type="checkbox" id="'+brand.name+'"/> <label class="label" for="'+brand.name+'"><span class="name">'+brand.name+'</span> <span class="count">'+brand.count+'</span></label></div>';
				else
					html += '<div><input class="input" type="checkbox" id="'+brand.name+'"/> <label class="label" for="'+brand.name+'"><span class="name">'+brand.name+'</span> <span class="count">'+brand.count+'</span></label></div>';
		})

		$('#brandList .list').html(html);
		if($('.brands').is(":hidden")) $('.brands').show();
	}
	else{
		$('.brands').hide();
	}
}

/******RENDER SIZES***************/
function renderSizes(content){
	var html = '';
	var result = content.getFacetValues('sizes');
	if(result != null){
		if(result.length==0){
			$('.sizes').hide();
			return;
		}
		result.forEach(function(size){
				if(size.isRefined){
					html += '<div><input class="input" checked type="checkbox" id="'+size.name+'"/> <label class="label" for="'+size.name+'"><span class="name">'+size.name+'</span> <span class="count">'+size.count+'</span></label></div>';
				}
				else
					html += '<div><input class="input" type="checkbox" id="'+size.name+'"/> <label class="label" for="'+size.name+'"><span class="name">'+size.name+'</span> <span class="count">'+size.count+'</span></label></div>';
		});

		$('#sizeList .list').html(html);
		if($('.sizes').is(":hidden")) $('.brands').show();
	}
	else{
		$('.sizes').hide();
	}
}

/*****Render Color LIST*******/
function ArrayObjectColorMatch(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].displayName === nameKey) {
            return myArray[i];
        }
    }
	var x={}
	x.displayName = 'none';
	return x;
}
function renderColors(content){
    var result = content.getFacetValues('color');
	if(result != null){
		if(result.length==0){
			$('.colors').hide();
			return;
		}
		var html='';
		result.forEach(function(color){
			var colorProps =  ArrayObjectColorMatch(color.name, colors);
			if(color.isRefined){
				if(colorProps.displayName != 'none')
					html += '<input type="checkbox" name="color"  id="'+ colorProps.displayName +'" checked/><label for="'+ colorProps.displayName +'"  style="background-color:'+colorProps.hex+'; "><span class="name">'+colorProps.displayName+'</span></label>';
			}
			else{
				if(colorProps.displayName != 'none')
					html += '<input type="checkbox" name="color"  id="'+ colorProps.displayName +'" /><label for="'+ colorProps.displayName +'"  style="background-color:'+colorProps.hex+'; "><span class="name">'+colorProps.displayName+'</span></label>';
			}
		})
		$('#colorList').html(html);
		if($('.colors').is(":hidden")) $('.colors').show();
	}
	else{
		$('.colors').hide();

	}
}

/*****Pricing Render*******/
function renderPrices(content) {
    var result = content.getFacetStats('price.value');
	if(result !=null){
		if(result.length != 0){
			$("#priceBar").show();
			$("#pricerange").ionRangeSlider({
				type: "double",
				min: result.min,
				max: result.max,
				prefix: "SEK" ,
				onFinish: function (data) {
					helper.removeNumericRefinement('price.value')
						.addNumericRefinement('price.value','>', data.from)
						.addNumericRefinement('price.value','<', data.to)
						.search();

				}
			});
		}
		else
			$("#priceBar").hide();
	}
	else
		$("#priceBar").hide();

    var result2 = content.getFacetValues('sale');
	if(result!=null){
		if(result2.length == 0){
			$('#saleBox').hide();
		}
		else {
			for (var i = 0; i < result2.length; i++) {
				if (result2[i].name === 'true') {
					if (result2[i].count > 0) {
						if(result2[i].isRefined)
							$('#saleBox').html('<div class="checkbox  checkbox-circle"><input type="checkbox" name="checkbox"  id="'+ result2[i].name +'" checked/> <label for="'+ result2[i].name +'"><span>Only Sale</span></label></div>');
						else
							$('#saleBox').html('<div class="checkbox  checkbox-circle"><input type="checkbox" name="checkbox"  id="'+ result2[i].name +'" /> <label for="'+ result2[i].name +'"><span>Only Sale</span></label></div>');
					}
				}
			}
		}
	}


	var result3 = content.getFacetValues('discount');
	if(result3 != null){
		var html = '';
		if(result3.length==0){
			$('.discounts').hide();
			return;
		}
		result3.forEach(function(discount){
			if(discount.name != '0'){
				if(discount.isRefined)
					html += '<div><input class="input" type="checkbox" id="'+discount.name+'" checked/> <label class="label" for="'+discount.name+'"><span class="name">'+discount.name+'</span> <span class="count">'+discount.count+'</span></label></div>';
				else
					html += '<div><input class="input" type="checkbox" id="'+discount.name+'"/> <label class="label" for="'+discount.name+'"><span class="name">'+discount.name+'</span> <span class="count">'+discount.count+'</span></label></div>';
			}
		})
		$('#discountList ul').html(html);
		if($('.discounts').is(":hidden")) $('.discounts').show();
	}
	else
		$('.discounts').hide();
}

/*****Render Shop LIST*******/
function renderShops(content){
	var result = content.getFacetValues('shop.name');
	if(result != null){
		if(result.length==0){
			$('.shops').hide();
			return;
		}
		var html='';
		result.forEach(function(shop){
			if(shop.isRefined)
				html += '<div class="checkbox  checkbox-circle"><input type="checkbox" name="shop"  id="'+shop.name+'" checked/> <label for="'+shop.name+'"><span>'+shop.name+'</span></label></div>';
			else
				html += '<div class="checkbox  checkbox-circle"><input type="checkbox" name="shop"  id="'+shop.name+'"/> <label for="'+shop.name+'"><span>'+shop.name+'</span></label></div>';

		})
		$('#shopList').html(html);
		if($('.shops').is(":hidden")) $('.colors').show();
	}
	else {
		$('.shops').hide();
	}
}

/*****Facet Router*******/
function renderFacets(content){
    renderBrands(content);
    renderSizes(content);
    renderPrices(content);
    renderShops(content);
    renderColors(content);
	//var position = $('.child-category').offset().top;
	//$('body').animate({scrollTop: position },200, $.bez([.5,0,.1,1]));
	facetsLoaded = true;

}


var facetsLoaded=false;
var initialFacetType='';
var initialFacetValue = "";

switch (TYPE.name) {
	case 'category':
		initialFacetType = 'categoryKeys';
		initialFacetValue = TYPE.value.key;
		helper.addFacetRefinement(initialFacetType, initialFacetValue).search();
		break;

	case 'brand':
		initialFacetType = 'brand.name';
		initialFacetValue = TYPE.value.name;
		helper.addDisjunctiveFacetRefinement(initialFacetType, initialFacetValue).search();
		break;

	default:
		break;
}

//********LOADING
function Loading(){
	return '<div class="row">'+
			'<div class="col-md-12">'+
				'<div class="fetching">'+
					'<h6 class="text-center">LOADING</h6>'+
					'<div class="loader loader--style3" title="2">'+
						'<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'+
						'<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">'+
						' <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>'+
						'</path>'+
						'</svg>'+
					'</div>'+
				'</div>'+
	        '</div>'+
	     '</div>';
}

//**************BEG JAWBONE STRUCTURE**********
function  createJawBoneStructure(preference){
	return '<div class="jawBoneContent" key="'+preference.key+'" id="'+preference.key+'_jawbone">' + 
			'<div class="jawBoneOpenContainer">'+
				'<div class="jawBoneFadeInPlaceContainer">'+
					'<div class="jawBoneContainer">'+
					'</div></div></div></div>';
}

//**************BEG JAWBONE LOADING**********
function  createJawBoneLoader(){
	return  '<div class="jawBone" style="padding-top:20vw">'+Loading()+'</div>';
}

//**************BEG JAWBONE CONTENT **********
function  createJawBoneContent(itemId){
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
			var html = '<div class="jawBone">'+
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
		            		  				'<div class="tab-pane" id="tabReviews_'+data.id+'">'+ Loading()+'</div>'+
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
						'</div>';
			$('.jawBoneContainer').html(html);
			//getRecommendations(location, itemId);
		    }
		});
}

//********BEGNING GET & ATTACH JAWBONE RECOMMENDATION
function getRecommendations(itemId){
	var html='';
	$.ajax({
		url: 'https://api.zalando.com/recommendations/'+itemId,
		type: 'get',
		dataType: 'json',
		error: function(data){

		},
		success: function(data){
			var recommendedItems='';
			if(data.length>0)
			{
				$.each(data, function(i,item) {
					var name = item.name.split("-");
					recommendedItems += '<li productID= "'+item.id+'"><img src="'+item.media.images[0].mediumUrl+'" alt="'+item.name+'"/> <div class="brandName">'+name[0]+'</div></li>';
				});
				
				html = '<h5>Similar Products</h5><div class=" frame similarProducts" id="sly_'+itemId+'"><ol class="slidee">'+recommendedItems+'</ol></div>';
				location.find('.recommendedProducts').html(html);	
				
				var horizontalOptions= {
					    horizontal: 1,
					    itemNav: 'basic',
					    speed: 300,
					    mouseDragging: 1,
					    touchDragging: 1
					};

				var sly = new Sly("#sly_"+itemId,{
				    horizontal: 1,
				    itemNav: 'basic',
				    speed: 300,
				    mouseDragging: 1,
				    touchDragging: 1
				}).init();
				sly.reload();	
			}
		}
	});
}

//********BEGINING of Change view********************
function changeView (){
	var list = $('.itemList');
	var container = $('.resultContainer');
	if(!list.hasClass('jbMode')){
		if(list.hasClass('vertical')){
			list.toggleClass('horizontal').toggleClass('vertical');
			container.addClass('noFilter');
		}
		else {
			//$('.itemList').removeClass('vertical').addClass('horizontal');
			list.toggleClass('horizontal').toggleClass('vertical');
			container.removeClass('noFilter');
		}
		//$('html, body').animate({scrollTop: list.closest('.preference').offset().top-45 },100 , $.bez([.5,0,.1,1]));
	}
	
}

$(document).ready( function() {
	var mainSection = $('#mainSection');
	var filterSelector = $('#mainFacetPane');
	var facetContainer = $('#mainFacetContainer');
    var isVertical = true;

	helper.on('result', function(content) {
		renderProducts(content.hits);
		renderFacets(content);
	});

//*******************************************Filter Actions

	$('#brandList').on( 'click', 'input', function (event) {
		var value = $(this).attr('id');
		var selector= $(this);
		if(selector.prop('checked')){
			helper.addDisjunctiveFacetRefinement('brand.name', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('brand.name', value).search();
		}
	});

	$('#sizeList').on( 'change', 'input', function (event) {
		var value = $(this).attr('id');
		//console.log(value);
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('sizes', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('sizes', value).search();
		}
	});

	$('#colorList').on( 'change', 'input', function (event) {
		var value = $(this).attr('id');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('color', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('color', value).search();
		}
	});

	$('#discountList').on( 'change', 'input', function (event) {
		var value = $(this).attr('id');
		//console.log(value)
		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('discount', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('discount', value).search();
		}
	});

	$('#shopList').on( 'change', 'input', function (event) {
		var value = $(this).attr('id');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('shop.name', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('shop.name', value).search();
		}
	});

	$('#saleBox').on( 'change', 'input', function (event) {
		var value = $(this).attr('id');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addFacetRefinement('sale', value).search();
		}
		else{
			helper.removeFacetRefinement('sale', value).search();
		}
	});

  //***********************USER ACTIONS
	mainSection.on( 'click','.changeView' , function (event) {
		var preference = $(this).attr('preference');
		changeView();
	});
	//**********************************************************************JAWBONE ACTIONS - Create and Remove
	//Item Create Jawbone
	$('.itemList').on( 'click','.item .preview-image, .item .moreInfo' , function (event) {
		//console.log('*******')
		var itemcontainer = $('.itemList');
		var jawboneLocation = $('#jawbone');
		var selecteditem = $(this).attr('productId');

		if(itemcontainer.hasClass("vertical"))
		{
			changeView();
			isVertical = true;
		}
		else if (itemcontainer.hasClass("horizontal") && !itemcontainer.hasClass("jbMode")){
			isVertical = false;
		}

		$('.jawBoneContainer').append(createJawBoneLoader());
		jawboneLocation.addClass( "open");
		$('html, body').animate({scrollTop: itemcontainer.offset().top-100 }, 1, $.bez([.5,0,.1,1]));
		createJawBoneContent(selecteditem);
		itemcontainer.addClass("jbMode");
	});

	//Remove Jawbone
	mainSection.on( 'click','.jawBone .delete' , function () {
		$('.itemList').removeClass("jbMode");
		if(isVertical){
			changeView();
		}
		$('.jawBoneContent').removeClass( "open");
		$('.jawBone').remove();
	});

	//*******************************************JAWBONE ACTIONS - Product Showcase
	//******Hover over mini images
	mainSection.on( 'mouseover','.jawBone .selectedItemImageColoumn ol li img' , function (event) {
		var newImage = $(this).attr('src').replace('catalog','large');
		var location = $(this).closest('.selectedItemImageWrapper').find('.selectedItemPictureContainer').find('.selectedItemZoomPicture');
		location.find('img:first').remove();
		location.append('<img imageorder = "'+$(this).attr('imageorder') +'" src="'+newImage+'"/>');
	});

	//******CLICK NEXT
	mainSection.on( 'click','.jawBone .next-item' , function (event) {
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
	mainSection.on( 'click','.jawBone .prev-item' , function (event) {
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
	function mainFacetPaneScroll(){
		var currentScroll = $(document).scrollTop();
		var footerPosition = $('#footer').offset();
		var filterPosition = filterSelector.offset();
		var headerHeight = $('.header').height();
		var filterWrapperPosition=$('.facetWrapper').offset();
		var filterHeight = $('.facetWrapper').height();


		if(currentScroll +  headerHeight<= filterPosition.top){
			facetContainer.css('position','absolute').css('top','0px').css('bottom', 'auto');
		}
		else if(currentScroll + facetContainer.height() >= footerPosition.top -10){
			facetContainer.css('position','absolute').css('top','auto').css('bottom', '10px');
		}
		else if(previousScroll<currentScroll ){

			if(!upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top ){
				facetContainer.css('position','absolute').css('bottom','auto').css('top', filterWrapperPosition.top-filterPosition.top);
				downStateChanged = false;
				upStateChanged = true;

			}
			else if(upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top && currentScroll + $(window).height() <= filterWrapperPosition.top + filterHeight){

			}
			else if(upStateChanged && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight){
				facetContainer.css('position','fixed').css('bottom','0').css('top', 'auto');
			}

		}
		else if (previousScroll>currentScroll)
		{
			if(!downStateChanged && currentScroll - headerHeight <= filterWrapperPosition.top + filterHeight ){
				facetContainer.css('position','absolute').css('bottom', 'auto').css('top', filterWrapperPosition.top-filterPosition.top);
				downStateChanged = true;
				upStateChanged = false;
			}
			else if(downStateChanged && currentScroll + headerHeight <= filterWrapperPosition.top && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight ){

			}
			else if(downStateChanged && currentScroll + headerHeight  < filterWrapperPosition.top){
				facetContainer.css('position','fixed').css('top', headerHeight).css('bottom', 'auto');

			}
		}
		previousScroll= currentScroll;

		/*if(currentScroll + facetContainer.height() >= footerPosition.top -40){
			facetContainer.addClass('pull-bottom').removeClass('fixed');
		}
		else if(currentScroll> (filterPosition.top - 100) ){
			facetContainer.addClass('fixed').removeClass('pull-bottom');
		}
		else if(currentScroll < (filterPosition.top-100)  ){
			facetContainer.removeClass('fixed').removeClass('pull-bottom');
		}*/
	}


	$(window).scroll(function () {
		if(mainSection.is(':visible')){
			mainFacetPaneScroll()
		}
    });


});

