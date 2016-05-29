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

var Offer = {'type':'brand', 'name': 'Filippa K','description': 'Special Brantu Sale', 'expiry':{'hours':'4','minutes':'20'},'key':'f14'};

document.title = Offer.name + ' Exclusive Sale'

//***********************Initiate global variables
var isActive = false; //infinite scroll boolean
var isVertical = false;
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

var articles = [];


/*******************************************************************/

/********************************Initiate plugins***********************************/


/******** CREATE LIST OF CAROUSELS *********************************/
function  loadOffer(offer, Brands, Filters){

		    var html = '<li class="preference m-t-1v" id="'+ offer.key.toLowerCase()+'">'+
		    		   '<div class="preference-row " >'+
		    		   createBodyStructure(offer) +
		                '</div></li>';
	
	      $('.preference-list').append(html);
};



/******** CREATE PREFERENCE CAROUSEL  *********************************/
function createBodyStructure(offer){

var html =     '<div class="preference-card row">' +
 							'<div class="col-sm-9">'+
 								'<div id="'+offer.key+'_filter"><div class="main"><div class="filters"></div></div></div>' + 
						 	'</div>'+
							'<div class="col-sm-3" >'+
						 	  '<ul>'+
				              '<li class="inline"><button class="btn btn-info btn-rounded btn-cons btn-animated from-left fa fa-plus all-caps" type="button" ><span>Filter My Size </span></button></li>'+
				              '<li class="inline"><div class="changeView" preference="'+offer.key+'" id="'+offer.key+'_view"><i class="fa  fa-th-large"></i></div></li>' +
				              '</ul>'+
				            '</div>'+
						 '</div>'+
						 '<input class="filtertags" id="'+offer.key+'_filtertags" preference="'+offer.key+'" type="'+offer.type+'"/>'+
					     '<ol class="itemList vertical" key="'+offer.key+'" id="'+offer.key+'_items" type="'+offer.type+'">' + 
					         loadItems(offer,1) + 
					     '</ol>' + 
					     createJawBoneStructure(offer);

return html;
};



//Add UserName & Picture

$("#username").append(User.firstName);
$("#avatar").append("<img src="+ User.avatar +" alt='User-Photo' />");
//Initialize preference list carousels
$(".welcome").append('<h1 class="all-caps text-center font-GothamMedium">'+ Offer.name +'</h1> <h5 class="text-center ">'+Offer.description+'</h5><h6 class="bottom-right bg-red text-white font-GothamBold m-r-1v padding-05v"><i class="fa fa-clock-o"></i> Expires in '+Offer.expiry.hours+' hours and '+Offer.expiry.minutes+' minutes</h6>');

loadOffer(Offer);



(function($) {

    'use strict';
    
$(window).on('load', function() {
	
})
    

$(document).ready(function() {
    
	/************************************************INITIALIZATION*********************/


	/*****ToolTIP******/
	$('[data-toggle="tooltip"]').tooltip();
	 $('.filtertags').tagsinput({
	      allowDuplicates: true // this will be used to set text of tag
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
             changeView(preference);
		});
		//**********************************************************************JAWBONE ACTIONS - Create and Remove 
		//Item Create Jawbone
		$(document).on( 'click','.item .preview-image, .item .moreInfo' , function (event) {
			var itemcontainer = $(this).closest('.itemList');
			var preference = itemcontainer.attr('key');
			var jawboneLocation = $('#'+preference+'_jawbone');
		    var selecteditem = $(this).attr('product-id');
		    
			if(itemcontainer.hasClass("vertical"))
			{
				changeView(preference);
			    isVertical = true;
			}
			else if (itemcontainer.hasClass("horizontal") && !itemcontainer.hasClass("jbMode")){
				isVertical = false;
			}
		    
		    jawboneLocation.find('.jawBoneContainer').append(createJawBoneLoader());
		    jawboneLocation.addClass( "open");
		    $('html, body').animate({scrollTop: itemcontainer.offset().top-50 }, 640, $.bez([.5,0,.1,1]));
		  
		    createJawBoneContent(jawboneLocation,selecteditem); 
		    itemcontainer.addClass("jbMode");
		    
		});
		
		
		//Remove Jawbone
		$(document).on( 'click','.jawBone .delete' , function (event) {
			var preference = $(this).closest('.jawBoneContent').attr('key');
			$('#'+preference+'_items').removeClass("jbMode");
			if(isVertical){ 
				changeView(preference);
			}
			
			
			var jawboneRemove = $(this).closest('.jawBoneContent');
			//$('html, body').animate({scrollTop: jawboneRemove.closest('.preference-row').offset().top-45 },500);
			$('#'+preference+'_jawbone').removeClass( "open");
			$('#'+preference+'_jawbone').find('.jawBone').remove();
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
		    var scrollPercentage = 100*this.scrollTop/this.scrollHeight/(1-this.clientHeight/this.scrollHeight);	    
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

		//On Selecting filter
		$(document).on('changed.bs.select', '.selectpicker' , function (event, clickedIndex, newValue, oldValue) {
			//Put a tag
			if (clickedIndex != null){
				
			var itemlocation = clickedIndex+1;
			var valueChanged = $(this).find('option:nth-child('+itemlocation+')').attr('value');
		    //var valueChanged = $(this).val();
		    
			var selectedFilters= '';
			var filterChanged= $(this).attr('filter');
			var preferencekey = $(this).attr('preference_key');
			var preferencetype = $(this).attr('preference_type');

			var texty = filterChanged+": "+valueChanged;
			if(newValue && !oldValue){ // if it is a new value
				$('#'+preferencekey+'_filtertags').tagsinput('add', texty);//change this
			}
			else if (!newValue && oldValue){
				$('#'+preferencekey+'_filtertags').tagsinput('remove', texty);//change this
			}
			
			//Get Filter Values
			var data = $('#'+preferencekey+'_filtertags').tagsinput('items')//change this
			$.each(data, function(i,item) {
				var splited = data[i].split(": ");
				selectedFilters += splited[0]+'='+splited[1]+'&';
			});

			//remove Loded items
			$('#'+preferencekey+'_items').html('');
			//load new items with filters
			loadItems({'key':preferencekey,'type':preferencetype},1,selectedFilters)
			}
		});
		
		
		
		
		// When Filter Removed
		$(document).on('itemRemoved', '.filtertags', function(event) {

			var str = event.item;
			var res = str.split(": ");
			var filter = res[0];
			var removevalue = res[1];
			var preference = $(this).attr('preference');
			var type = $(this).attr('type');
			var selector = $('#'+preference+'_filter_'+filter+'');

			//Get all values
			var allvalues = selector.val();
			if(allvalues != null){
			// remove value from array
			allvalues = jQuery.grep(allvalues, function(x) {
				  return x != removevalue;
				});
	        // deselect all
			selector.selectpicker('deselectAll');
			selector.selectpicker('val', allvalues);
			
			var selectedFilters= '';
			var data = $('#'+preference+'_filtertags').tagsinput('items')//change this
			$.each(data, function(i,item) {
				var splited = data[i].split(": ");
				selectedFilters += splited[0]+'='+splited[1]+'&';
			});
			
			//remove Loded items
			$('#'+preference+'_items').html('');
			//load new items with filters
			loadItems({'key':preference,'type':type},1,selectedFilters)
			
			}
			
		});
		

		$( window ).scroll(function() {
			
			
		});
			
});

})(window.jQuery);
 
/**********CREATE*****************************************************************************/    
 /**********CREATE CAROUSELS*******************************/
var CaroselHtml="";



    
    
    
    
    
    
    
    
    

