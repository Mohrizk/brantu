//Preferences of Each customer- will be imported using ajax
/*************************GLOBAL OBJECTS & VARIABLES **************************/

//Initialize Global User Object

var User = {
		firstName:"Linda", 
		lastName:"Fredriksson",
		gender:"female",
		age: 25,
		avatar:"https://scontent-cai1-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/1526174_1252436751438285_6465530710645500859_n.jpg?oh=a69e7b0c1915f6aa5fb1dbe92338b6c0&oe=5784A6CE",
		preferences:{enabled:true, added:false , preferenceList:[{'type':'brand', 'name': 'Nike','key':'n12'}, {'type':'brand', 'name': 'Iceberg', 'key':'ic3'},{'type':'category', 'name': 'Heels', 'key':'womens-shoes-heels'}, {'type':'category','name': 'Sports Clothing Sale', 'key':'womens-sports-clothing-sale'}]}, // Dummy data
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
	return '<div class="row"><div class="col-md-12">'+
	   			'<div class="fetching">'+
				    '<h6 class="text-center">LOADING</h6>'+
					'<div class="loader loader--style8" title="7">'+
					  '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="5vw" height="5vw" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">'+
					   ' <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">'+
					      '<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />'+
					      '<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />'+
					      '<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />'+
					    '</rect>'+
					    '<rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">'+
					      '<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />'+
					      '<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />'+
					      '<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />'+
					   ' </rect>'+
					   ' <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">'+
					     ' <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />'+
					      '<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />'+
					      '<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />'+
					    '</rect>'+
					 ' </svg>'+
					'</div>'+
				'</div>'+
			'</div></div>';
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
			 '<button type="button" class="btn btn-complete btn-lg btn-large fs-15" data-dismiss="modal" id="keep-Carousel">NAH, KEEP IT</button>'+
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
							   '<h3 class="all-caps pull-left">' + 
							     preference.name + 
							   '</h3>'+
							 '</div>'+
							 '<div class="preference-filter inline" preference="'+preference.key+'" style="vertical-align:top; margin-top:0.5vw;"><div class="" style="border: 1px solid #333;"><h6 class="inline">FILTER</h6> ' +'<i class="inline fa  fa-angle-down"></i>'+'</div></div>' + 
						 	'<div class="changeView" preference="'+preference.key+'" id="'+preference.key+'_view"><i class="fa  fa-th-large"></i></div>' +
						 	'<div class="dropdown pull-right" >'+
				              '<button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class=" fa fa-ellipsis-h"></i> </button>'+
					            '<ul class="dropdown-menu profile-dropdown">'+
					                '<li><a class="delete-carousel" id="'+preference.key+'"><i class=" pg-close_line"></i> DELETE</a></li>'+					             
					             '</ul>'+
				            '</div>'+
						 '</div>'+
						 '<div class="filterpopup" id="'+preference.key+'_filter"><input class="filtertags" id="'+preference.key+'_filtertags"/><div class="main"><div class="filters">'+loadFilters(preference) +'</div><div class="close-filterpopup" preference="'+preference.key+'"> <i class="pg-close_line"></i></div></div> </div>'+ 
					     '<ol class="group horizontal" key="'+preference.key+'" id="'+preference.key+'_items" type="'+preference.type+'">' + 
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
			 if(data.content.length == 0){ $('#' + preference.key.toLowerCase()).find('.group').append('<h3 class="text-center"> No Items Loaded</h3>'); }
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
								       		'<a href="'+ item.shopUrl +'" target="_blank"><button class="btn  btn-complete GoStore">Go to store</button></a>' +
								            '<button class="btn btn-complete moreInfo" product-id="'+item.id +'">More Info</button>' +
								       '</div>'+
								     '</li>';
					 });
					 
					 $('#' + preference.key.toLowerCase()).find('.group').attr('page',data.page).attr('totalpages',data.totalPages).attr('totalelements',data.totalElements).append(html); 
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

/***************************************STICKY HEADERS*****/










//Add UserName & Picture
$("#username").append(User.firstName);
$("#avatar").append("<img src="+ User.avatar +" alt='User-Photo' />");





























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
		
		
		
		
		
});

})(window.jQuery);
 
/**********CREATE*****************************************************************************/    
 /**********CREATE CAROUSELS*******************************/
var CaroselHtml="";



    
    
    
    
    
    
    
    
    

