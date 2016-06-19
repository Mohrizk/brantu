
/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
{isMobile = true; $('body').addClass('mobile')}

var client = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var helper   = algoliasearchHelper(client,'product_sweden', {
	hierarchicalFacets: [{
		name: 'products',
		attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl3', 'categories.lvl4'],
        sortBy: ['count:desc', 'name:asc']
	}],
	facets:[  'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','shop.name','sizes', 'discount']
});
var searcher = algoliasearchHelper(client,'product_sweden', {
	hierarchicalFacets: [{
		name: 'products',
		attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl3'],
		sortBy: ['count:desc', 'name:asc']
	}],
	facets:[  'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','shop.name','sizes', 'discount']
});

var typeVerified = true, departmentVerified= false;

if(TYPE !=null){
	var loading = $('.loading');
	switch (TYPE.name) {
		case 'category':
			var breadcrumb = '';
			for(var t in TYPE.value.breadcrumb)
				if(t == TYPE.value.breadcrumb.length - 1) breadcrumb += TYPE.value.breadcrumb[t].name;
				else breadcrumb += TYPE.value.breadcrumb[t].name + ' > ';
			helper.toggleRefinement('products',breadcrumb);
			loading.show()
			helper.search()
			break;
		case 'brand':
			helper.addDisjunctiveFacetRefinement('brand.name', TYPE.value.name);
			loading.show()
			helper.search()
			break;
		default:
			typeVerified = false;
			//helper.search();
			break;
	}
}
if( DEPARTMENT!==null){
	if( DEPARTMENT.name !== null) {
		if (DEPARTMENT.name == 'Kvinna' || DEPARTMENT.name == 'Man') {
			departmentVerified = true;
		}
	}
}

//_________AUTCOMPLETE
var currentDDHits=[];
var currentBrandDDHits=[];
var pPcurrentIndex = 100;  // needed for hovering effect
var autocompleteOptions = [
	{
		//source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
		source: function(query, callback) {
			var index = client.initIndex('product_sweden');
			var options = {hitsPerPage: 8}
			if(departmentVerified)options.facetFilters = 'categories.lvl0:'+DEPARTMENT.name;
			$('.ACSearchProgress').removeClass('hidden');
			index.search(query, options).then(function(answer) {
				pPcurrentIndex = 100;
				$('.ACSearchProgress').addClass('hidden');
				currentDDHits= answer.hits;
				$('#ddProductPreview').hide()
				$('#ddProductPreviewContainer').html('');
				$('#ddCol2').show()
				if(answer.hits.length > 7){
					answer.hits.splice(7,1,{
						more:true,
						nbHits:answer.nbHits,
						text:'found search more'
					})
				}

				callback(answer.hits);
			}, function() {
				callback([]);
			});
		},
		displayKey: 'name',
		templates: {
			suggestion: function(suggestion) {
				suggestion.autoComplete = HEADERTEXT.autoComplete.productList;
				return ACTemplateProduct(suggestion);
			},
			empty: function(empty) {
				return '<h5 class="text-left">No Items Found</h5>';
			}
		}
	} ,
	{
		source: function(query, callback) {
			var index = client.initIndex('brands_sv');
			var options = {hitsPerPage: 5}
			if(departmentVerified)options.facetFilters = 'genders:'+DEPARTMENT.name;
			index.search(query, options).then(function(answer) {
				callback(answer.hits);
			}, function() {
				callback([]);
			});
		},
		displayKey: 'name',
		templates: {
			suggestion: function(suggestion, answer) {
				return ACTemplateBrand(suggestion);
			},
			empty: function(empty) {
				return '<h5 class="text-left">No Items Found</h5>';
			}
		}
	}
];
var autocompleteOptionsMobile = [
	{
		//source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
		source: function(query, callback) {
			var index = client.initIndex('product_sweden');
			var options = {hitsPerPage: 4}
			if(departmentVerified)options.facetFilters = 'categories.lvl0:'+DEPARTMENT.name;
			$('.ACSearchProgress').removeClass('hidden');
			index.search(query, options).then(function(answer) {
				pPcurrentIndex = 100;
				$('.ACSearchProgress').addClass('hidden');
				currentDDHits= answer.hits;
				$('#ddProductPreview').hide()
				$('#ddProductPreviewContainer').html('');
				$('#ddCol2').show()
				if(answer.nbHits > 4){
					answer.hits.splice(3,1,{
						more:true,
						nbHits:answer.nbHits,
						text:'found search more'
					})
				}

				callback(answer.hits);
			}, function() {
				callback([]);
			});
		},
		displayKey: 'name',
		templates: {
			suggestion: function(suggestion) {
				suggestion.autoComplete = HEADERTEXT.autoComplete.productList;
				return ACTemplateProduct(suggestion);
			},
			empty: function(empty) {
				return '<h5 class="text-left">No Items Found</h5>';
			}
		}
	} ,
	{
		source: function(query, callback) {
			var index = client.initIndex('brands_sv');
			var options = {hitsPerPage: 4}
			if(departmentVerified)options.facetFilters = 'genders:'+DEPARTMENT.name;
			index.search(query, options).then(function(answer) {
				currentBrandDDHits = answer.hits;
				var returnedArray =[];
				if(currentBrandDDHits.length>=5)returnedArray= answer.hits.slice(0,5);
				else returnedArray = answer.hits;
				callback(returnedArray);
			}, function() {
				callback([]);
			});
		},
		displayKey: 'name',
		templates: {
			suggestion: function(suggestion, answer) {
				return ACTemplateBrand(suggestion);
			},
			empty: function(empty) {
				return '<h5 class="text-left">No Items Found</h5>';
			}
		}
	}
];
autocomplete('#search', {
		dropdownMenuContainer: '#containerAC',
		openOnFocus:true,
		hints:true,
		templates: {
			dropdownMenu: searchDropDownTemplate
		}
	},autocompleteOptions)
	.on('autocomplete:selected', function(event, suggestion, dataset) {
	//console.log(suggestion, dataset);
	})
	.on('autocomplete:shown', function(event, suggestion, dataset) {
		$('#containerHintAC').hide();
	});
autocomplete('#searchMobile', {
	dropdownMenuContainer: '#mobileContainerAC',
	hints:true,
	openOnFocus:true,
	templates: {
		dropdownMenu: searchDropDownMobileTemplate
	}
},autocompleteOptionsMobile)
	.on('autocomplete:selected', function(event, suggestion, dataset) {
	//console.log(suggestion, dataset);
})
	.on('autocomplete:shown', function(event, suggestion, dataset) {
		$('#mobileContainerHintAC').hide();
	});

//********BEGINING of Change view********************
/**
 * Ensure that a tag is not filtering the results
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 * @fires
 */
$(document).ready( function() {
	var currentInstance = helper;
	var currentState= {search:false , main:true, compare:false}
	helper.on('result', function(content) {

		currentInstance = helper;
		RENDER(content);
		loading.hide();
		$('html, body').animate({scrollTop: 0 }, 100, $.bez([.5, 0, .1, 1]));
		mainSection.show().css({'opacity':0}).animate({'opacity':1});
	})
	searcher.on('result', function(content) {
		currentInstance = searcher;
		RENDER(content);
		loading.hide();
		$('html, body').animate({scrollTop: 0 }, 100, $.bez([.5, 0, .1, 1]));
		if(searchSection.length !=0){searchSection.show().css({'opacity':0}).animate({'opacity':1});}
		else mainSection.show().css({'opacity':0}).animate({'opacity':1});
	})

	var productArray=[];
	var priceLimits = {
		change : true,
		data:{}
	};
	var pageContainer = $('.page-container')
	var mainSection = $('#mainSection');
	var searchSection = $('#searchSection');
	var general = $('.general');
	var ddContainer = $('#containerAC');
	var mainContainer = $('.resultContainer');
	var filterSelector = $('#mainFacetPane');
	var facetContainer = $('#mainFacetContainer');
	var productContainer= $('.productPane');
	var productList = $('.itemList');
	var jawboneContainer = $('.jawBoneContainer');
	var jawboneContent = $('.jawBoneContent');
	var searchBar =  $('#search');
	var mobileSearchBar =  $('#searchMobile');
	var priceBarInput = $("#pricerange")
	var paginate = $('.paginate');
	var footer = $('#footer');
	var loading = $('.loading');
	var onFab = false;
	/*
	 * MAIN RENDER FUNCTION FOR ALL SEARCHES
	 * AND CATEGORY NAVIGATION
	 *
	 * */

	function refreshVariables(){
		mainSection = $('#mainSection');
		searchSection = $('#searchSection');

		ddContainer = $('#containerAC');

		mainContainer = $('.resultContainer');
		filterSelector = $('#mainFacetPane');
		facetContainer = $('#mainFacetContainer');
		productContainer= $('.productPane');
		productList = $('.itemList');

		jawboneContainer = $('.jawBoneContainer');
		jawboneContent = $('.jawBoneContent');
		searchBar =  $('#search');
		priceBarInput = $("#pricerange")
		paginate = $('.paginate');
		loading = $('.loading');
	}
	function FETCHPRODUCTS(){
		//mainSection.hide();
		loading.show()
		currentInstance.search()
	}
	function RENDER (content){
		refreshVariables();
		if(!currentState.compare && (currentState.search || currentState.main) && searchSection.length == 0){
			mainSection.html(productEngineTemplate());
			$('#mobileProductFilter').html(mobileFilters({fab:onFab}))
		}
		else if(!currentState.compare && currentState.search && searchSection.length != 0){
			searchSection.html(productEngineTemplate());
			$('#mobileProductFilter').html(mobileFilters({fab:onFab}))
		}
		//STORE CURRENT HITS IN CURRENT PRODUCT GLOBAL ARRAY
		productArray = content.hits;
		$('.itemList').html(productTemplate({products: productArray, mobile: isMobile}));

		//GET BREAD CRUMB IF THERE IS A VERIFIED DEPARTMENT
		//IF THERE IS A DEPARTMENT VERIFIED THEN A CATEGORY IS INVOLOVED
		var breadCrumb = [];
		if(departmentVerified) breadCrumb=currentInstance.getHierarchicalFacetBreadcrumb('products');

		//GET NEW PRICES
		//UPDATE PRICES IF THE NAVIGATION
		var newPrice = content.getFacetStats('price.value')

		if(priceLimits.change && newPrice!=null) priceLimits.data = {min: newPrice.min, max: newPrice.max, from: newPrice.min, to:  newPrice.max}
		else priceLimits.change= true;

		$("#pricerange").ionRangeSlider({
			type: "double",
			min:priceLimits.data.min,
			max: priceLimits.data.max,
			from:priceLimits.data.from,
			to:  priceLimits.data.to,
			prefix: "SEK", onFinish: function (data) {
				priceLimits.data={ min: data.min, max: data.max, from: data.from, to: data.to} ;
				priceLimits.change= false;
				currentInstance.removeNumericRefinement('price.value')
					.addNumericRefinement('price.value','>', data.from)
					.addNumericRefinement('price.value','<', data.to)
					.search();
			}
		});
		$("#pricerange_mobile").ionRangeSlider({
			type: "double",
			min:priceLimits.data.min,
			max: priceLimits.data.max,
			from:priceLimits.data.from,
			to:  priceLimits.data.to,
			prefix: "SEK", onFinish: function (data) {
				priceLimits.data={ min: data.min, max: data.max, from: data.from, to: data.to} ;
				priceLimits.change= false;
				currentInstance.removeNumericRefinement('price.value')
					.addNumericRefinement('price.value','>', data.from)
					.addNumericRefinement('price.value','<', data.to)
					.search();
			}
		});
		//RENDER ALL NEW VALUES
		$('.welcome').html(welcomeTemplate(productHelper.getWelcomeMessage(breadCrumb, content, currentState.search, currentBrandDDHits)));
        $('.sale').html(onlySaleBoxFacetTemplate({header: HEADERTEXT.facets.sale.header,   content: productHelper.mapWithout(content.getFacetValues('sale'),['false'])}));
        $('.discounts').html(listFacetTemplate(  {header: HEADERTEXT.disjunctionFacets.discount.header, content: productHelper.mapWithout(content.getFacetValues('discount'), ['0'])} ));
        $('.sizes').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.size.header , content:content.getFacetValues('sizes')}));
        $('.brands').html(listFacetTemplate(     {header: HEADERTEXT.disjunctionFacets.brand.header, content: content.getFacetValues('brand.name')}));
        $('.shops').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.shop.header ,content: content.getFacetValues('shop.name')}));
		$('.colors').html(colorFacetTemplate(    {header: HEADERTEXT.disjunctionFacets.color.header , content: productHelper.mapColor(content.getFacetValues('color'),COLORS)}));
		$('.category').html(categoryFacetTemplate(productHelper.categoryRefinement(content.hierarchicalFacets, breadCrumb)));
		$('.paginate').html(pagingTemplate(productHelper.pagination(content)));
		var tags = filterTagsTemplate(productHelper.getAllRefinements(currentInstance.getState(['attribute:*']), HEADERTEXT))
		$('.filterTags').html(tags);
		$('#navbarTags').html(tags);

		//Show Result
		general.css({'opacity':0.5}).animate({'opacity':1});
	}

	//*******************************************Filter Actions
	pageContainer.on( 'touchend click', ' .category li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value);
		FETCHPRODUCTS()
	});
	pageContainer.on( 'click', ' .breadcrumb li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value);
		FETCHPRODUCTS()
	});
	pageContainer.on( 'click', ' .brands input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('brand.name', value);
			FETCHPRODUCTS()
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('brand.name', value);
			FETCHPRODUCTS()
		}
	});
	pageContainer.on( 'change', ' .sizes input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('sizes', value);
			FETCHPRODUCTS()
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('sizes', value);
			FETCHPRODUCTS()
		}
	});
	pageContainer.on( 'change', ' .discounts input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('discount', value);
			FETCHPRODUCTS()
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('discount', value);
			FETCHPRODUCTS()
		}
	});
	pageContainer.on( 'change', '  .colors input', function (event) {
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('color', value);
			FETCHPRODUCTS()
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('color', value);
			FETCHPRODUCTS()
		}
	});
	pageContainer.on( 'change', ' .shops input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('shop.name', value);
			FETCHPRODUCTS()
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('shop.name', value);
			FETCHPRODUCTS()
		}
	});
	pageContainer.on( 'change', ' .sale input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addFacetRefinement('sale', value);
			FETCHPRODUCTS()
		}
		else{
			currentInstance.removeFacetRefinement('sale', value);
			FETCHPRODUCTS()
		}
	});
	pageContainer.on( 'touchend click', '  .filterTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		productHelper.removeFilterTag(type, facet, value, currentInstance);

	});
	$('.header').on( 'touchstart click', '#navbarTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		productHelper.removeFilterTag(type, facet, value, currentInstance);

	});
	pageContainer.on( 'touchstart click', ' .paginate a', function (event) {
		currentInstance.setPage($(this).attr('value'));
		FETCHPRODUCTS();
	});

	//***********************USER ACTIONS
	var productPreviewTimer;
	$('body ')
		.on( 'mouseover','.vertical .item .preview-image' , function (event) {
		if(!isMobile){
			var imageSelector  =  $(this).find('img');
			var productPreviewIndex = 1;
			var divSelector = $(this);
			var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
        	if(imageArray.length>1){
		   productPreviewTimer=setInterval(function(){
			   if(productPreviewIndex == imageArray.length) productPreviewIndex= 0;
				   imageSelector.attr('src',imageArray[productPreviewIndex]);
				   divSelector.css({opacity:0.2}).animate({opacity: 1}, 500, $.bez([.6, 0, .1, 1]));
				   productPreviewIndex++;
		   }, 1200);
		}
	   }

	})
		.on( 'mouseout','.item .preview-image' , function (event) {
		if(!isMobile){var imageSelector  =  $(this).find('img');
			var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
			if(imageArray.length>1)
				imageSelector.attr('src',imageArray[0]);
			clearInterval(productPreviewTimer);
		}
	});


	/*
    * JAWBONE ACTIONS
    *
    * **/
	function addViewedProduct(action, productId){
		$.ajax({
			type: "POST",
			url: action,
			data: productId
		}).success(function(result) {
			console.log('done');
		});
	}
	var itemScrollindex;
	general.on( 'click','.itemList .item img, .item .moreInfo' , function (event) {
		refreshVariables()
		itemScrollindex = $(this).attr('index');
		$('.itemList img').removeClass('selected');
		$('.fab').hide();
		$(this).addClass('selected')
		productHelper
			.openDDViewProductInfo(
			$(this) ,mainContainer, productList, $('#jawbone'), jawboneContainer, productArray[$(this).attr('index')],paginate, itemScrollindex
			);

		if(!isMobile)$('html, body').scrollTop(jawboneContent.offset().top - $('.header').height())
		else $('.page-container').scrollTop(260)

		$('#navbarDepartment').hide();
		addViewedProduct($(this).attr('action'), {productId: $(this).attr('productId')});
	});
	general.on( 'click','.jawBone .delete' , function () {
		refreshVariables()
		productHelper
			.closeDDViewProductInfo(
				mainContainer, productList,jawboneContent, paginate, itemScrollindex
			)
		$('.fab').show();

	})
	general.on( 'mouseover','.jawBone .selectedItemImageColoumn ol li img' , function (event) {
		var JBDivSelector = $('#mainJawBoneImageContainer');
		var JBImageSelector = $('#mainJawBoneImage');
		var newImage = $(this).attr('src');
		var newOrder = $(this).attr('imageorder')
		$.when( JBDivSelector.animate({opacity: 0.4, marginLeft:"600"}, 500, $.bez([.6, 0, .1, 1]))).done( function() {
			JBImageSelector.attr('src',newImage).attr('imageorder', newOrder);
			JBDivSelector.animate({opacity: 1, margin:"0"}, 500, $.bez([.6, 0, .1, 1]));
		})
	});
	general.on( 'click','.jawBone .next-item' , function (event) {
		var JBDivSelector = $('#mainJawBoneImageContainer');
		var JBImageSelector = $('#mainJawBoneImage');
		var imageArray = $('.jawbone').attr('pic-src').split('/BREAK/');
		var currentIndex = JBImageSelector.attr('imageorder');
		var nextIndex = (currentIndex == imageArray.length-1)? 0 : (Number(currentIndex)+1);
		$.when( JBDivSelector.animate({opacity: 0.4, marginLeft:"100%"}, 500, $.bez([.6, 0, .1, 1]))).done( function() {
			JBImageSelector.attr('src',imageArray[nextIndex]).attr('imageorder', nextIndex);
			JBDivSelector.animate({opacity: 1, margin:"0"}, 500, $.bez([.6, 0, .1, 1]));
		})
	});
	general.on( 'click','.jawBone .prev-item' , function (event) {
		var JBDivSelector = $('#mainJawBoneImageContainer');
		var JBImageSelector = $('#mainJawBoneImage');
		var imageArray = $('.jawbone').attr('pic-src').split('/BREAK/');
		var currentIndex =  Number(JBImageSelector.attr('imageorder'))
		var prevIndex = (currentIndex == 0)? (imageArray.length-1) : (currentIndex-1) ;
		$.when( JBDivSelector.animate({opacity: 0.4, marginLeft:"100%"}, 500, $.bez([.6, 0, .1, 1]))).done( function() {
			JBImageSelector.attr('src',imageArray[prevIndex]).attr('imageorder', prevIndex);
			JBDivSelector.animate({opacity: 1, margin:"0"}, 500, $.bez([.6, 0, .1, 1]));
		})
	});


	/*
	 * AUTOCOMEPLTE ACTIONS
	 *
	 * **/
	//***************************************SEARCH
	function SEARCH (searchInput){
		refreshVariables()
		$('.ACSearchProgress').addClass('hidden');
		if(isMobile) pageContainer.scrollTop(0);
		else $('html, body').scrollTop(0);
		  //MAKE SURE TO TURN THE LOADING OF THE AUTCOMPLETE BAR
		var q = searchInput.val(); searchInput.blur();
		productHelper.closeDDViewProductInfo(mainContainer, productList,jawboneContent, paginate);
		if(q.length ==  0){
			closeSEARCH();
			return;
		}
		//if(searchSection.length !=0){
		mainSection.hide()
		loading.show()
		currentState={search:true, compare:false,main:false};
		searcher.clearRefinements().setQuery(q);
		if(!jQuery.isEmptyObject(DEPARTMENT)) searcher.toggleRefinement('products', DEPARTMENT.name);
		searcher.search();
	}
	function closeSEARCH(){
		refreshVariables()
		currentState={search:false, compare:false,main:true};
		currentInstance = helper;
		if(searchSection.length !=0) {
			searchSection.hide()
			mainSection.show().css({'opacity':0}).animate({'opacity':1});

		}
		if(typeVerified) FETCHPRODUCTS()
	}
	$('#autocompleteForm').submit( function(){
		event.preventDefault();
		SEARCH(searchBar);
	})
	ddContainer.on( 'click','#ddsearchMore', function(){
		SEARCH(searchBar)
	})
	mainSection.on( 'click','.closeSearch', closeSEARCH)
	searchSection.on( 'click','.closeSearch', closeSEARCH)
	ddContainer.on( 'mouseover','#dditemList',function(event){
		$('#ddCol2').hide();
		$('#ddProductPreview').show();
	}).on('mouseout' ,'#dditemList' , function (event) {
		$('#ddProductPreview').hide()
		$('#ddProductPreviewContainer').html('');
		$('#ddCol2').show()
	})
	ddContainer.on( 'mouseover','#dditemList .productsAC' , function (event) {
		var content;
		var productId = $(this).attr('data-id');
		var pPreviewSelector = $('#ddProductPreview')
		var pPreviewContainer =
		pPreviewSelector.show();
		var index = 3;
		for(var c in currentDDHits){
			if(productId == currentDDHits[c].productId){
				content = currentDDHits[c];
				index = c;
			}
		}
			if(pPcurrentIndex != index)
				$.when( pPreviewContainer.animate({opacity: 0.5, left:"20"}, 100, $.bez([.6, 0, .1, 1]))).done( function() {
				pPcurrentIndex = index;
					content.autoComplete = HEADERTEXT.autoComplete.productPreview;
				pPreviewContainer.html(ACProductPreviewTemplate(content));
				pPreviewContainer.animate({opacity: 1, left:"0"}, 100, $.bez([.6, 0, .1, 1]));
			})
	})
	searchBar.focus(function(){
		$('.searchMainPageOverlay').show();
		if(this.value == ''){
			$('#containerHintAC').show();
		}
	})
	searchBar.blur(function(){
		$('.searchMainPageOverlay').hide();
		$('#containerHintAC').hide();
	})

	/*
	 * Find better price ACTIONS
	 *
	 * **/
	function FINDBETTERPRICES(content){
		refreshVariables()
		searchBar.blur();
		currentState={search:false, compare:true,main:false};
		if(searchSection.length !=0){
			mainSection.hide()
			searchSection.html(CPProductTemplate(content)).show().css({'opacity':0}).animate({'opacity':1});

		}
		else mainSection.html(CPProductTemplate(content)).css({'opacity':0}).animate({'opacity':1});

		$('html, body').animate({scrollTop: 0 }, 100, $.bez([.5, 0, .1, 1]));
	}
	ddContainer.on( 'click','.findBetterPrices',function(){
		var productId = $(this).attr('data-id');
		for(var c in currentDDHits){
			if(productId == currentDDHits[c].productId){
				content = currentDDHits[c];
			}
		}
		FINDBETTERPRICES(content);

	})

	/*
	 * Scrolling ACTIONS
	 *
	 * **/
	var previousScroll = 0;
	var downStateChanged = false;
	var upStateChanged = false;
	function mainFacetPaneScroll(){
		refreshVariables()
		var currentScroll = $(document).scrollTop();
		var footerPosition = $('#footer').offset();
		var filterPosition = filterSelector.offset();
		var headerHeight = $('.header').height();
		var filterWrapperPosition=$('.facetWrapper').offset();
		var filterHeight = $('.facetWrapper').height();

		var tagSegment = $('#navbarTagsContainer');

		if(filterSelector.length != 0){
			if(currentScroll +  headerHeight<= filterPosition.top){
				facetContainer.css('position','absolute').css('top','0px').css('bottom', 'auto');
			}
			else if(currentScroll + facetContainer.height() >= footerPosition.top -10){
				facetContainer.css('position','absolute').css('top','auto').css('bottom', '10px');
			}
			else if(previousScroll<currentScroll ){
				tagSegment.slideDown();

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
				tagSegment.hide();

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



		}

		if(mainContainer.offset().top  > currentScroll){

		}
		previousScroll= currentScroll;
	}
	$(window).scroll(function () {
		console.log('scolling')
		if((mainSection.is(':visible') || searchSection.is(':visible')) && $('.itemList').hasClass('vertical') && $('.itemList').is(':visible')){
			mainFacetPaneScroll();
		}
	});
	/*
	 * MOBILE
	 * Search
	 *
	 * */
	function closeMobileSearch(){
		$('#searchMobile').val('').blur();
		$('#fakeMobileSearchButton').show();
		var searchContainer = $('#searchMobileContainer');

		$.when(searchContainer.animate({opacity: 0},50))
			.done( function() {
				searchContainer.addClass('hidden')
			})
	}
	function openMobileSearch(){
		$.when($('#searchMobileContainer').removeClass('hidden').css({opacity:0}).animate({opacity: 1}, 20))
			.done( function() {
				$('#searchMobileForm').find('.algolia-autocomplete').find('input:eq(1)').focus();
			})
	}
	$('#searchMobileForm').submit(function(e){
		event.preventDefault();
		SEARCH($('#searchMobile'))
	})
	$('#searchMobileForm').keyup(function(event) {
		if (event.which == 13) {
			SEARCH($('#searchMobile'))
		}
	});
	$('#mobileContainerAC').on( 'click','#ddsearchMore', function(){
		SEARCH($('#searchMobile'))
	})
	$('.fakeMobileSearchButton').focus(openMobileSearch);
	$('#CloseSearchMobile').on('touchend click', function(e){
		closeMobileSearch(); e.preventBubble();
	})
	$('.page-container-wrapper').on('click', closeMobileSearch)
	mobileSearchBar.focus(function(){
		$('.searchMainPageOverlay').show();
		if(this.value == ''){
			$('#mobileContainerHintAC').show();
		}
	})
	mobileSearchBar.blur(function(){
		$('.searchMainPageOverlay').hide();
		$('#mobileContainerHintAC').hide();
	})
	/*
	 * MOBILE
	 * FLOATING ACTION BUTTON
	 * */

	function openFab(){
		onFab  = true;
		$('.header').addClass("hidden");
		$('#mobileSubMenu').addClass("hidden");
		$('#footer').addClass("hidden");
		$('.fab').addClass("active").closest(".popout").find(".panel").toggleClass("active");;
	}
	function closeFab(){
		onFab  = false;
		$('.header').removeClass("hidden");
		$('#mobileSubMenu').removeClass("hidden");
		$('#footer').removeClass("hidden");
		$(".popout .panel").removeClass("active");
		$(".popout .fab").removeClass("active");
	}
	pageContainer.on('touchend click',".popout .fab",openFab);
	pageContainer.on('touchend click',".panel .close",closeFab);
	pageContainer.on('click',".popout .panel",function(event) {
		event.stopPropagation();
	});
	pageContainer.on('click',".popout .fab",function(event) {
		event.stopPropagation();
	});

	/*
	 *
	 * Newsletter Submit
	 *
	 * */
	function submitNewsletterForm(content){
		var email = {email:content[0].value};
		$.ajax({
			url: $('#newsletterSignupForm').attr('action'),
			data: email
		}).success(function(result) {
			var response;
			if(result)response = HEADERTEXT.newsletter.responseSuccess;
			else response =HEADERTEXT.newsletter.responseFail;
			$('#newsletterSignUp').html(newsletterTemplate(response));
		});
	}
	footer.on('submit','#newsletterSignupForm',function(event) {
		event.preventDefault()
		submitNewsletterForm( $( this ).serializeArray() )
	})
	footer.on('click','#addNewsletterEmail' ,function(){
		console.log('mmmm')
		$('#newsletterSignUp').html(newsletterTemplate(HEADERTEXT.newsletter.addForm));
	})
	/***
	 * Add Favourit Product
	 * **/
	function addFavoriteProduct(action, productId){
		$.ajax({
			type: "POST",
			url: action,
			data: productId
		}).success(function(result) {
			$('#nbFavoProduct').text(result);
		});
	}
	general.on( 'click','.addFavouriteProduct' ,function(){
		addFavoriteProduct($(this).attr('action'), {productId: $(this).attr('productId')})
	})
});