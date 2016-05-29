
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
					         //loadItems(offer,1) +
					     '</ol>' + 
					     createJawBoneStructure(offer);

return html;
};



//Add UserName & Picture


//Initialize preference list carousels

//loadOffer(Offer);



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
		/*$('.itemList').scroll(function(event){
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
		});*/
		
		
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





    
    
    
    
    
    
    
    
    

