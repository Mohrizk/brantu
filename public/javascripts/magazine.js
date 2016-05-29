//Preferences of Each customer- will be imported using ajax
/*************************GLOBAL OBJECTS & VARIABLES **************************/

//Initialize Global User Object

var User = {
		firstName:"Linda", 
		lastName:"Fredriksson",
		gender:"female",
		age: 25,
		avatar:"https://scontent-cai1-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/1526174_1252436751438285_6465530710645500859_n.jpg?oh=a69e7b0c1915f6aa5fb1dbe92338b6c0&oe=5784A6CE",
		magazine:{enabled:true, added:false , preferenceList:[{'type':'brand', 'name': 'Nike','key':'n12'}, {'type':'brand', 'name': 'Iceberg', 'key':'ic3'},{'type':'category', 'name': 'Heels', 'key':'womens-shoes-heels'}, {'type':'category','name': 'Sports Clothing Sale', 'key':'womens-sports-clothing-sale'}]}, // Dummy data
		brands:["ic3", "ti5", "g53", "4be", "g38", "kc1"],
		details:[{'name':'ageGroup', 'value':'adult'}, {'name':'assortmentArea', 'value':'standard'}, {'name':'gender', 'value':'female'}],// Dummy data
		sizes:{'added':true, 'sizeList': [{'name':'tops', 'value':'s'},  {'name':'pants', 'value':'32'}, {'name':'shoes', 'value':'40'}] }
}


//***********************Initiate global variables
var isActive = false; //infinite scroll boolean

/*var allFilters = $.ajax({
						url: 'https://api.zalando.com/filters',
						type: 'get',
						async: false,
						dataType: 'json',
						error: function(data){
							alert("mmmm");
						},
						success: function(data) {
							
						}
					  }).responseJSON;*/


	
var facets = '';
$.each(User.details, function(i,item) {	
	facets += item.name+'='+item.value+'&';
});


function loadUserSizes(){
	var html = ''
	
	if(User.sizes.added){	
	$.each(User.sizes.sizeList, function(i,size) {
		html += '<p class="inline all-caps">'+size.name+': <span>'+size.value+'</span></p> ';
	})

	}
	return html;
}

function loadUserGeneral(){ 
	return '';
}
function loadUserBrands(){ return '';}

	
/*************************Loading **************************/

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

function DeleteModal(preferenceName){

	var html= '<div class="modal fade fill-in in" id="modalFillIn" tabindex="-1" role="dialog" aria-hidden="false" style="display: block;">'+
			 '<div class="modal-dialog "><div class="modal-content"><div class="modal-header text-left">'+
			 '<h5 class="text-left p-b-5 all-caps">Are you sure you what to delete your <br/><span class="font-GothamMedium all-caps">'+preferenceName+' Carousel</span></h5>'+
			 '</div><div class="modal-body"><div class="row">'+
			 '<div class="col-md-4 col-md-offset-4 no-padding sm-m-t-10 sm-text-center">'+
			 '<button type="button" class="btn btn-danger btn-lg btn-large fs-15" data-preference="'+preferenceName+'" id="delete-Carousel">YES, DELETE IT</button>'+
			 '</div>'+
			 '<div class="col-md-4 no-padding sm-m-t-10 sm-text-center">'+
			 '<button type="button" class="btn btn-info btn-lg btn-large fs-15" data-dismiss="modal" id="keep-Carousel">NAH, KEEP IT</button>'+
			 '</div></div></div><div class="modal-footer"></div></div></div></div>';
	$(".content").prepend(html);
}

/*******************************************************************/

/********************************Initiate plugins***********************************/


/******** CREATE LIST OF CAROUSELS *********************************/
function  createPreferenceListCarousels(Preferences, Brands, Filters){

var preferenceCarouselText=[];

if(Preferences.enabled)
{

if(Preferences.preferenceList.length > 0)
{
	var j=0
	
	for( i=0 ; i < Preferences.preferenceList.length ; i++)
	{
		    preferenceCarouselText [j++] = '<li class="preference" id="'+ Preferences.preferenceList[i].key.toLowerCase()+'">'
			preferenceCarouselText [j++] = '<div class="preference-row " >'
		    preferenceCarouselText [j++] = createPreferenceCarousel(Preferences.preferenceList[i], Filters);
		    preferenceCarouselText [j++] = '</div></li>'
	}
	$('.preference-list').append(preferenceCarouselText.join(''));
}




}
else{


}


};



/******** CREATE PREFERENCE CAROUSEL  *********************************/
function createPreferenceCarousel(preference){

var prefernceHTML =     '<div class="preference-card">' +
							'<div class="title inline">'+ 
							   '<h3 class="capitalize font-GothamMedium pull-left">' + 
							     preference.name + 
							   '</h3>'+
							 '</div>'+
							 '<div class="preference-filter inline" preference="'+preference.key+'"><button class="btn btn-info btn-cons all-caps pull-left "><span>FILTER <i class="fa fa-sort-desc pull-right"></i></span>'+'</button></div>' + 
						 	'<div class="changeView" preference="'+preference.key+'" id="'+preference.key+'_view"><i class="fa  fa-th-large"></i></div>' +
						 	'<div class="dropdown pull-right" >'+
				              '<button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class=" fa fa-ellipsis-h"></i> </button>'+
					            '<ul class="dropdown-menu profile-dropdown">'+
					                '<li><a class="delete-carousel" id="'+preference.key+'"><i class=" pg-close_line"></i> DELETE</a></li>'+					             
					             '</ul>'+
				            '</div>'+
						 '</div>'+
						 '<div class="filterpopup" id="'+preference.key+'_filter"><input class="filtertags" id="'+preference.key+'_filtertags"/><div class="main"><div class="filters">'+loadFilters(preference) +'</div><div class="close-filterpopup" preference="'+preference.key+'"> <i class="pg-close_line"></i></div></div> </div>'+ 
					     '<ol class="itemList horizontal" key="'+preference.key+'" id="'+preference.key+'_items" type="'+preference.type+'">' + 
					         loadItems(preference,1) + 
					     '</ol>' + 
					     createJawBoneStructure(preference);

return prefernceHTML;
};











/******** FILTER - PREFERENCE CAROUSEL  **********/
function loadFilters(preference){
	var removedFilters=[ 'agegroup', 'gender', 'assortmentarea'];
	
	var filterText=''; 
	var type = '';
	if(preference.type === 'category'){
		type = 'category='+preference.key+'&';
	}
	else if(preference.type === 'brand'){
		type = 'brand='+preference.key+'&';
		removedFilters.push('brand', 'brandfamily');
	}
	
	
	 var ajaxFilters= $.ajax({
		url: 'https://api.zalando.com/facets?'+type+facets,
		type: 'get',
		dataType: 'json',
		error: function(data){
			alert("mmmm");
		},
		success: function(data) {
				$.each(data, function(i,item) {
				var options = '';
				if(removedFilters.indexOf(item.filter.toLowerCase()) == -1)
				{
					$.each(item.facets, function(j,option) {
						if(option.count>0){options += '<option value=' + option.key + '>' + option.displayName + '</option>';}
					});
					
					filterText += '<select preference_key="'+preference.key+'" preference_type="'+preference.type+'"  filter="'+item.filter +'" id="'+preference.key+'_filter_'+ item.filter  + '" class="selectpicker" title="'+ item.filter +'"  multiple="multiple">'+ options +'</select>';
				}
			});
			
			$('#'+preference.key+'_filter .main').append(filterText);
			$('.selectpicker').selectpicker();
		}
		})

	
	return filterText;
	
}






/******** ITEMS- PREFERENCE CAROUSEL  **********/
function  loadItems(preference, page, filters) {
	
	//check preference conditions
	var key='';
	var pagenum = 'page='+page;
	
	switch(preference.type) {
    case 'brand':
    	key += 'brand='+preference.key+'&';	
        break;
    case 'brandfamily':
    	key += 'brandFamilyName='+preference.key+'&';	
        break;
    case 'category':
    	key += 'category='+preference.key+'&';	
    	break
    default:
    	key +='';
   }
	
	var filterValue=''
	if(filters!=null) filterValue = filters;

	var searchUrl = 'https://api.zalando.com/articles?'+key+facets+filterValue+pagenum;
	 var html='';
	 $.ajax({
			url: searchUrl,
			type: 'get',
			dataType: 'json',
			error: function(data){
				alert("mmmm");
			},
			success: function(data) {
			 //MAKE SURE THERE IS QUERY RESULT
			 if(data.content.length == 0){ $('#' + preference.key.toLowerCase()).find('.itemList').append('<h3 class="text-center"> No Items Loaded</h3>'); }
			 else {
					 /***Iterate over each item***/
					 var ImageLocation;
					 $.each(data.content, function(i,item) { 
					    
						 /***Get First Model Images***/
						var images = item.media.images;
						var modelPhotoFound = false;
						var nonmodelPhotoFound = false;
						var modelImageLocation;
						var nonmodelImageLocation;
						$.each(images, function( index, value ) {
							  if(value.type.toLowerCase() === 'model' &&  !modelPhotoFound) 
							  { modelImageLocation = index; 
							    modelPhotoFound = true;
							  }
							  else if(value.type.toLowerCase() === 'non_model' && !nonmodelPhotoFound){
								  nonmodelImageLocation = index;
								  nonmodelPhotoFound = true;
							  }
						});
						
						if (modelPhotoFound){
							mainImageLocation = modelImageLocation;
						}
						else{ 
							mainImageLocation = nonmodelImageLocation;
						}
						/****END Getting Photo***/
			
						
						/***GET PRICE & DETERMINE IF THERE IS A DISCOUNT OR NOT***/
						var price='';
						if(item.units[0].price.value === item.units[0].originalPrice.value){
							price = '<span class="original-price">'+ item.units[0].originalPrice.formatted +'</span>';
						}
						else{
							discountPercentage = 100 - ((item.units[0].price.value / item.units[0].originalPrice.value) *100);
							
							price = '<span class="original-price">'+ item.units[0].originalPrice.formatted  +'</span>' +
					   	    		'<span class="discounted-price">'+ item.units[0].price.formatted  +'</span>' +
					   	    		'<span class="discounted-percentage">'+ Math.ceil(discountPercentage) + '%' +'</span>';	
						}
						/***END OF PRICING***/
			
						var name = item.name.split("-");
						
						
						
						/***CONSTRUCT HTML FOR THE ITEM***/
						 html += '<li  class="item" product-id="'+item.id +'">'+   
								        '<img class="preview-image" src="'+ item.media.images[mainImageLocation].largeUrl +'" alt="'+ item.name+'"  product-id="'+item.id +'"/>'+
								   	    '<span class="item-brand">' + item.brand.name + '</span>'+
								   	    '<span class="item-name">'  + name[0] + '</span>' +
								   	    price +
								   	    ' <ol class="small-options">'+
								   	   			 '<li class="delete"><a href="#"><i class=" pg-close_line"> </i></a></li>' +
								   	   			 '<li class="like"> <a href="#"><i class="  fa  fa-heart-o"></i></a></li>' +
								   	   			 '<li class="cart"> <a href="#"><i class="fa fa-share-alt"></i></a></li>' +
								   	    '</ol>' +
								       ' <div class="main-options">'+
								       		'<a href="'+ item.shopUrl +'" target="_blank"><button class="btn  btn-info GoStore">Go to store</button></a>' +
								            '<button class="btn btn-info moreInfo" product-id="'+item.id +'">More Info</button>' +
								       '</div>'+
								     '</li>';
					 });
					 
					 $('#' + preference.key.toLowerCase()).find('.itemList').attr('page',data.page).attr('totalpages',data.totalPages).attr('totalelements',data.totalElements).append(html); 
					 isActive = false;
					 
			 }
	 }
	
	 });	
	 return html;
}





/************************************************************************ Jawbone - PREFERENCE CAROUSEL  **********/

function  createJawBoneStructure(preference){
	return '<div class="jawBoneContent" id="'+preference+'JawBone">' + 
			'<div class="jawBoneOpenContainer">'+
				'<div class="jawBoneFadeInPlaceContainer">'+
					'<div class="jawBoneContainer">'+
					'</div></div></div></div>';
}
/*********** Intial Loader  **********/
function  createJawBoneLoader(){
	return  '<div class="jawBone" style="padding-top:20vw">'+Loading()+'</div';
}


/*********** Create the Jawbone **********/
function  createJawBoneContent(location, itemId){
	
	$.ajax({
		url: 'https://api.zalando.com/articles/'+itemId,
		type: 'get',
		dataType: 'json',
		error: function(data){
			alert("fuck");
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
						       		'<button class="btn  btn-danger"> Go To Shop</button>'+      
		            		  '</div>'+
		            		  '<div class="selectedItemDetail">'+
		            		  		'<div class="panel">'+
		            		  			'<ul class="nav nav-tabs nav-tabs-simple hidden-xs"  data-init-reponsive-tabs="collapse">'+
		            		  			   '<li class="active"><a href="#tabDetails_'+data.id+'"  data-toggle="tab" aria-expanded="true">Description</a></li>'+
		            		  			   '<li class=""><a href="#tabReviews_'+data.id+'"   data-toggle="tab" aria-expanded="false">Reviews</a></li>'+
		            		  			   '<li class=""><a href="#tabFindBetterPrices_'+data.id+'"  data-toggle="tab" aria-expanded="false">Find Better Prices</a></li>'+
		            		  			'</ul>'+
		            		  			'<div class="tab-content hidden-xs">'+
		            		  				'<div class="tab-pane active" id="tabDetails_'+data.id+'">'+
		            		  					'<div class="row column-seperation">'+
		            		  						'<div class="col-md-5"></div>'+
		            		  						'<div class="col-md-7">'+'<ol class="selectedItemDetailList">'+ productDetails +'</ol>'+'</div>'+
		            		  				    '</div>'+
		            		  				'</div>'+
		            		  				'<div class="tab-pane" id="tabReviews_'+data.id+'">'+ Loading()+'</div>'+
		            		  				'<div class="tab-pane" id="tabFindBetterPrices_'+data.id+'">'+ Loading() +'</div>'+
	            		  				'</div>'+
		            		  		'</div>'+
		            		  '</div>'+
						  '</div>'+
						  '<ol class="selectedItemSave">'+
	   				      '<li ><div class="delete"><i class=" pg-close_line"> </i></div></li>'+
	   	   			      '<li> <div class="like"><i class="  fa  fa-heart-o"></i></div></li>'+
	   	   			      '<li><div class="cart"><i class="fa  fa-share-alt"></i></div></li>'+
	   					  '</ol>'+
	   					  '<div class="recommendedProducts">'+
	   					  '</div>'+
						'</div>';
						   
			location.find('.jawBoneContainer').html(html);
			getRecommendations(location, itemId);
		    }
		});
}


//********GET & ATTACH JAWBONE RECOMMENDATION
function getRecommendations(location, itemId){
	var html='';
	$.ajax({
		url: 'https://api.zalando.com/recommendations/'+itemId,
		type: 'get',
		dataType: 'json',
		error: function(data){
			alert("fuck");
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

/***************************************STICKY HEADERS*****/










//Add UserName & Picture

$("#username").append(User.firstName);
$("#avatar").append("<img src="+ User.avatar +" alt='User-Photo' />");
//Initialize preference list carousels
$(".welcome").append('<div class="circular thumbnail-wrapper d48  text-center"></div><h2 class="text-center ">Welcome '+ User.firstName  +' To Your Store</h2> <h5 class="text-center font-GothamBold ">We have very exciting stuff for you! ready for shopping time</h5><div class="userDetails text-center"><div class="inline" id="general">'+loadUserGeneral()+'</div><div class="inline " style="padding-right:1vw;" id="sizes">'+loadUserSizes()+'</div><div class="inline" id="brands">'+loadUserBrands()+'</div></div> <div class="text-center"><a href="/add-preference"></a><div>'+
		'<div class="m-t-1v auto-margin text-center full-width" style="margin-bottom:0">'+
		'<ul class="nav nav-tabs nav-tabs-linetriangle text-center" data-init-reponsive-tabs="dropdownfx">'+
			'<li class="active inline no-float" >'+
			'<a class=" fs-14 " data-toggle="tab" href="#home"><span><i class="brantu-purple  pg-bag "></i><br/>Feed</span></a>'+
			'</li>'+
			'<li class="no-float inline" >'+
			'<a class=" fs-14 " data-toggle="tab" href="#profile"><span><i class=" fa  fa-circle-o-notch brantu-green"></i><br/>Brands</span></a>'+
			'</li>'+
			'<li class="no-float inline">'+
			'<a class=" fs-14 " data-toggle="tab" href="#messages"><span><i class="brantu-blue fa fa-tag"></i><br/>Coupons</span></a>'+
			'</li>'+
			'<li class="no-float inline">'+
			'<a class=" fs-14 " data-toggle="tab" href="#messages"><span><i class="brantu-pink fa text-red fa-heart"></i><br/>Watcher</span></a>'+
			'</li>'+
		'</ul>'+
		'</div>'
);
createPreferenceListCarousels(User.magazine);




























(function($) {

    'use strict';
    
$(window).on('load', function() {

	
	
	
	
	
	
	
	
})
    

$(document).ready(function() {
    
	/************************************************INITIALIZATION*********************/


	/*****ToolTIP******/
	$('[data-toggle="tooltip"]').tooltip();
	 $('.filtertags').tagsinput({
	      allowDuplicates: false // this will be used to set text of tag
	    });

	/*****JAWBONE Picture SILIDERS******/
	//RECOME
	
		
		/*$(".mCustomSrollbar").mCustomScrollbar({
		    axis:"x", // horizontal scrollbar
		    preventDefault:true,
		    autoExpandScrollbar: true
		});*/
		
		$(document).on("click", ".nav-tabs a", function(e){
			  e.preventDefault();
			  //$(this).tab('show');
			  
			});
		
		
/************************** DOCUMENT USER ACTION**********************/
		$(document).on( 'click','.changeView' , function (event) {
			var preference = $(this).attr('preference');
			
			if($('#'+preference+'_items').hasClass('vertical')){ $('#'+preference+'_items').toggleClass('horizontal').toggleClass('vertical');}
			else {
				$('.itemList').removeClass('vertical').addClass('horizontal');
				$('#'+preference+'_items').toggleClass('horizontal').toggleClass('vertical');
			}
			$('html, body').animate({scrollTop: $('#'+preference+'_items').closest('.preference').offset().top-45 },50 , $.bez([.5,0,.1,1]));
		});
		
		//**********************************************************************Preference Carousel
		$(document).on( 'click','.preference-card .dropdown ul li a.delete-carousel', function (event) {
			//
			var preference=$(this).closest('.preference').attr('id');
			DeleteModal(preference);
		});
		$(document).on( 'click','#keep-Carousel', function (event) {
			
			$(this).closest('.modal').remove();	
		});
		$(document).on( 'click','#delete-Carousel', function (event) {
			var preference=$(this).attr('data-preference');
			$('#'+preference).remove();
			$(this).closest('.modal').remove();
		});
		
		
		
		
		
		
		
		//**********************************************************************JAWBONE ACTIONS - Create and Remove 
		//Item Create Jawbone
		$(document).on( 'click','.item .preview-image, .item .moreInfo' , function (event) {
			var miniGroup = $(this).closest('.itemList');
			miniGroup.addClass("jbMode");
			
		    var jawboneLocation = $(this).closest('.preference-row').find('.jawBoneContent');
		    
		    var selecteditem = $(this).attr('product-id');
		    jawboneLocation.find('.jawBoneContainer').append(createJawBoneLoader());
		    jawboneLocation.addClass( "open");
		    $('html, body').animate({scrollTop: miniGroup.offset().top }, 640, $.bez([.5,0,.1,1]));
		  
		    createJawBoneContent(jawboneLocation,selecteditem);    
		});
		// Recommended Item Create Jawbone
		$(document).on( 'click','.recommendedProducts ol li' , function (event) {
		    var jawboneLocation = $(this).closest('.jawBoneContent');
		    var selecteditem = $(this).attr('productId');
		    jawboneLocation.closest('.jawBoneContainer').append(createJawBoneLoader());
		    if(!jawboneLocation.hasClass( "open"))jawboneLocation.addClass( "open");
		    createJawBoneContent(jawboneLocation,selecteditem);    
		});
		//Remove Jawbone
		$(document).on( 'click','.jawBone .delete' , function (event) {
			$(this).closest('.preference-row').find('.itemList').removeClass("jbMode");
			var jawboneRemove = $(this).closest('.jawBoneContent');
			//$('html, body').animate({scrollTop: jawboneRemove.closest('.preference-row').offset().top-45 },500);
			jawboneRemove.removeClass( "open");
			jawboneRemove.find('.jawBone').remove();
		});
		
		
		//*******************************************JAWBONE ACTIONS - Product Showcase
		//******Hover over mini images
		$(document).on( 'mouseover','.jawBone .selectedItemImageColoumn ol li img' , function (event) {
			var newImage = $(this).attr('src').replace('catalog','large');
			var location = $(this).closest('.selectedItemImageWrapper').find('.selectedItemPictureContainer').find('.selectedItemZoomPicture');
			location.find('img:first').remove();
			location.append('<img imageorder = "'+$(this).attr('imageorder') +'" src="'+newImage+'"/>');
		});
		
		//******CLICK NEXT
		$(document).on( 'click','.jawBone .next-item' , function (event) {
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
		$(document).on( 'click','.jawBone .prev-item' , function (event) {	
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
		
		//*****************Infinite Scroll
		//**************
		//*********
		//****
		//Horizontal
		$('.itemList.horizontal').scroll(function(event){
		    var scrollPercentage = 100*this.scrollLeft/this.scrollWidth/(1-this.clientWidth/this.scrollWidth);
		    
		    if(!isActive && scrollPercentage > 80 )
		    {
		    	var currentPage = parseInt($(this).attr('page'));
		    	var totalPages = parseInt($(this).attr('totalpages'));
		    	if(currentPage<totalPages){
		    		isActive=true;
		    		var thePreference = {key: $(this).attr('key'), type:$(this).attr('type') }
		    		var nextPage = currentPage + 1;
                    
		    		var selectedFilters = '';
		    		var filterdata = $(this).siblings('.filterpopup').find(".filtertags").tagsinput('items')
					$.each(filterdata, function(i,item) {
						var splited = filterdata[i].split(": ");
						selectedFilters += splited[0]+'='+splited[1]+'&';
					});
		    		loadItems(thePreference, nextPage, selectedFilters);
		    		
		    	}
		    	
		    }
		});
		//Vertical
		$('.itemList').scroll(function(event){
			console.log('fuck');
		    var scrollPercentage = 100*this.scrollTop/this.scrollHeight/(1-this.clientHeight/this.scrollHeight);	    
		    console.log(scrollPercentage);
		    if(!isActive && scrollPercentage > 80 )
		    {
		    	var currentPage = parseInt($(this).attr('page'));
		    	var totalPages = parseInt($(this).attr('totalpages'));
		    	if(currentPage<totalPages){
		    		isActive=true;
		    		var thePreference = {key: $(this).attr('key'), type:$(this).attr('type') }
		    		var nextPage = currentPage + 1;
                    
		    		var selectedFilters = '';
		    		var filterdata = $(this).siblings('.filterpopup').find(".filtertags").tagsinput('items')
					$.each(filterdata, function(i,item) {
						var splited = filterdata[i].split(": ");
						selectedFilters += splited[0]+'='+splited[1]+'&';
					});
		    		loadItems(thePreference, nextPage, selectedFilters);
		    		
		    	}
		    	
		    }
		});
		
		
		/****************************************Filter Actions*******************************/
		//SHOW & HIDE FILTER POPUP
		$(document).on( 'click','.preference .preference-filter' , function (event) {
			//$(this).closest('.preference-row').find('.filterpopup').show();
			var temp = $(this).attr('preference');
			$('#'+temp+'_filter').slideDown();
			$('#'+temp+'_filter .main').slideDown();
			
		});
		$(document).on( 'click','.preference .close-filterpopup' , function (event) {
			//$(this).closest('.filterpopup').hide();
			var temp = $(this).attr('preference');
			if( $('#'+temp+'_filtertags').tagsinput('items').length == 0){
				$('#'+temp+'_filter').slideUp();
			}
			else{
				$('#'+temp+'_filter .main').slideUp();
			}	
		});
		//On Selecting filter
		$(document).on('changed.bs.select', '.selectpicker' , function (e) {
			//Put a tag
			var selectedFilters= '';
			var valueChanged = $(this).val();
			var filterChanged= $(this).attr('filter');
			var preferencekey = $(this).attr('preference_key');
			var preferencetype = $(this).attr('preference_type');
			var texty = filterChanged+": "+valueChanged[valueChanged.length-1];
			$(this).closest('.filterpopup').find(".filtertags").tagsinput('add', texty);//change this
			
			//Get Filter Values
			var data = $(this).closest('.filterpopup').find(".filtertags").tagsinput('items')//change this
			$.each(data, function(i,item) {
				var splited = data[i].split(": ");
				selectedFilters += splited[0]+'='+splited[1]+'&';
			});
			
			//remove Loded items
			$(this).closest('.filterpopup').siblings('.itemList').html('');
			//load new items with filters
			loadItems({'key':preferencekey,'type':preferencetype},1,selectedFilters)
		});

		
		$( window ).scroll(function() {
			
			
		});
		
		
		
		
});

})(window.jQuery);
 
/**********CREATE*****************************************************************************/    
 /**********CREATE CAROUSELS*******************************/
var CaroselHtml="";



    
    
    
    
    
    
    
    
    

