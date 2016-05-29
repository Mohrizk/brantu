//Preferences of Each customer- will be imported using ajax
/*************************DATA INPUT **************************/

//Initialize Global User Object

var User = {
		firstName:"Linda", 
		lastName:"Fredriksson",
		gender:"female",
		age: 25,
		avatar:"https://scontent-cai1-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/1526174_1252436751438285_6465530710645500859_n.jpg?oh=a69e7b0c1915f6aa5fb1dbe92338b6c0&oe=5784A6CE",
		preferences:{enabled:true, added:false , preferenceList:[{'type':'brand', 'name': 'tiger of sweden','key':'ti5'}, {'type':'brand', 'name': 'kenneth cole', 'key':'kc1'},{'type':'category', 'name': 'Heels', 'key':'womens-shoes-heels'}, {'type':'category','name': 'Sports Clothing Sale', 'key':'womens-sports-clothing-sale'}]}, // Dummy data
		brands:["ic3", "ti5", "g53", "4be", "g38", "kc1"] // Dummy data
}

/*************************BRAND LIST FOR SEARCH **************************/

var brandSearchEngine = new Bloodhound({
	  datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.title);
      },
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  limit: 10,
	  prefetch: {
          url: ".assets/js/allBrands.json",
          filter: function (data) {
              console.log("data", data)
              return $.map(data.content, function (brand) {
                  return {
                      title: brand.name,
                      key:brand.key,
                      logo:brand.logoUrl
                  };
              });
          }
	  }
	});

console.log(brandSearchEngine.get('s'));
/*function brandListDefaults(q, sync) {
	  if (q === '') {
	    sync(brandSearchEngine.get('TI5'));  
	  }

	  else {
		  brandSearchEngine.search(q, sync);
 
	  }
}*/


$('.typeahead').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 0
	},
	{
	  name: 'brandSearchEngine',
	  displayKey: 'title',
	  source: brandSearchEngine,
	  templates: {
          empty: [
          '<div class="empty-message">',
          'unable to find any results that match the current query',
          '</div>'
          ].join('\n'),
          suggestion: function(data) {
        	    return '<p type="brand" source="brandlist" displayname="'+ data.title +'"  key="'+data.key+'"><span><i class="pg-plus_circle"></i></span><img src="'+data.logo+'"/> ' + data.title + '</p>';
          }
      }
	});






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


/*******************************************************************/
/**********HEADER & WELCOME***************************************/
//Add UserName & Picture
$("#username").append(User.firstName);
$("#avatar").append("<img src="+ User.avatar +" alt='User-Photo' />");
//Initialize preference list carousels
$(".welcome").append('<h3 class=" text-center">Your Settings</h3>');
/**********SelectionTAB BRANDS***************************************/

function showMainTab(value){
	//var 
	$("#main").children().each(function(i,item) {
		if($(item).attr('id')!==value)$(item).hide();
	});
	$('#'+value+'').show();
}

/**********FAVOURED BRANDS***************************************/

function createFavouredBrandList(brandlist){
	var ajaxBrandKeyString = '';
	$.each(brandlist, function(i,brandKey) {
		ajaxBrandKeyString += '&key='+brandKey;
	});
	
	var html='';
    $.ajax({
		url: 'https://api.zalando.com/brands?'+ajaxBrandKeyString,
		type: 'get',
		dataType: 'json',
		error: function(data){
			alert("mmmm");
		},
		success: function(data){
			console.log(data)
			$.each(data.content, function(i,brandinfo) {
				 html += '<li type="brand" source="user" displayname="'+ brandinfo.name +'"  key="'+brandinfo.key+'"><span><i class="pg-plus_circle"></i></span><img src="'+brandinfo.logoUrl+'"/> '+brandinfo.name+'</li>';	
			});
			$('#user ol').append(html);	
		}
	}); 
   
}

createFavouredBrandList(User.brands);

/**********Initial category list***************************************/
var breadcrumbDisplay=[]

function createInitialCategoryList(dgender){
	var gender='';
	
	if(dgender==='male') gender = 'men';
	else gender = 'women';
	categoryGenerator(gender)
}
function categoryGenerator(key){
	html='';
	$.ajax({
		url: 'https://api.zalando.com/categories/'+key,
		type: 'get',
		dataType: 'json',
		error: function(data){
			alert("fuck");
		},
		success: function(data){
			if(data.childKeys.length==0) return false;
			/*************GETTING WHAT NOT TO MENTION**********/			
			ajaxString='';
			
			/*************Break down the child Keys & Remove Repetitive words**********/
			$.each(data.childKeys, function(i,category) {
				//;*/
				ajaxString += '&key='+category;
			});
			
			var targetgroup = (User.gender > 'male') ? 'men' : 'women';
			$.ajax({
				url: 'https://api.zalando.com/categories?targetGroup='+targetgroup+ajaxString,
				type: 'get',
				dataType: 'json',
				error: function(data){
					alert("fuck");
				},
				success: function(data){
					$.each(data.content, function(i,category){
						 var drillOrNot = '';
						 if(category.childKeys.length >0) {drillOrNot = '<span class="drill">Drill More<i class="pg-arrow_right"></i></span>'};
						html += '<li type="category" displayname="'+ category.name +'" source="category" key="'+category.key+'"><span class="add"><i class="pg-plus_circle"></i></span> <div class="inline" style="width:60%">'+ category.name +'</div>'+ drillOrNot +'</li>';
					})
					$('#categoryList').html(html);
				}
			})
            
			if(data.name.toLowerCase() === targetgroup)
			{$('#categoryReference').html('');}
			else {$('#categoryReference').html('<li referencekey="'+data.parentKey+'"><i class="pg-arrow_left_line_alt"></i> <u>'+data.name+'</u></li>');}
		}
	})
	
}

/**********RESULT TAB FUNCTIONS***************************************/
function addPreferenceToResult(preference){ 
	$('#result ol').append('<li type="'+ preference.type +'" source="'+preference.source+'" key="'+preference.key+'"><p>'+preference.displayname+'</p><span>'+preference.type+' </span> <i class="pg-close"></i></li>');
	getResult();
	checkResultStyle()
}

function removePreferenceFromResult(preference){
	preference.remove();
	getResult();
	checkResultStyle()
}

function getResult(){
	var count = $("#result ol li").length;
	if(count>0) $("#resultCounter").html(count+' ADDED');
	else $("#resultCounter").html('NONE');	
}


function submitResult(){

}

function checkResultStyle(){
	var resultLength = $("#resultList li").length;
	
	if( resultLength> 0){
		$("#save").removeClass('hidden');
		$("#resultList").addClass('hasResults');
	}
	else {
		$("#save").addClass('hidden');
		$("#resultList").removeClass('hasResults');
	}
}

/**********RESULT TAB FUNCTIONS***************************************/
(function($) {

    'use strict';
    
$(window).on('load', function() {
})
    

$(document).ready(function() {
  
/************************************************INITIALIZATION*********************/
$('#search-brands').focus();
$('#search-brands').typeahead('open');
/*****ToolTIP******/
$('[data-toggle="tooltip"]').tooltip();

		
/************************** DOCUMENT USER ACTION**********************/
$('#user ol').on( 'click','li' , function (event) {
    var item =$(this);
	addPreferenceToResult({key:item.attr('key'), type:item.attr('type'), source:item.attr('source'), displayname:item.attr('displayname')});
});
$('#categoryList').on( 'click','li div, li span.add' , function (event) {
    var item =$(this).closest('li');
	addPreferenceToResult({key:item.attr('key'), type:item.attr('type'), source:item.attr('source'), displayname:item.attr('displayname')});
	
});

$(document).on( 'click','.tt-selectable' , function (event) {
    var item =$(this);
	addPreferenceToResult({key:item.attr('key'), type:item.attr('type'), source:item.attr('source'), displayname:item.attr('displayname')});
	
});

$('#categoryList').on( 'click','li span.drill' , function (event) {
	categoryGenerator($(this).closest('li').attr('key'));
});

$('#categoryReference').on( 'click','li' , function (event) {
	var key = $(this).attr('referencekey');
	categoryGenerator(key);
});



$('#result ol').on( 'click','li' , function (event) {
	var preference = $(this);
	removePreferenceFromResult(preference);
});


$('#menu ol').on( 'click','li' , function (event) {
	var i= $(this).attr('value');
	
	showMainTab(i);
	if(i=='categories') createInitialCategoryList(User.gender);
})

});



})(window.jQuery);
 
/**********CREATE*****************************************************************************/    
 /**********CREATE CAROUSELS*******************************/



    
    
    
    
    
    
    
    
    

