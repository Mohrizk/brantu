
/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */

var client = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var helper   = algoliasearchHelper(client,'product_sweden', {
	hierarchicalFacets: [{
		name: 'products',
		attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl3'],
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
	var mainSection = $('#mainSection');
	var loading = $('.loading');

	switch (TYPE.name) {
		case 'category':
			helper.toggleRefinement('products','Kvinna');
			mainSection.hide();
			loading.show()
			helper.search()
			break;
		case 'brand':
			helper.addDisjunctiveFacetRefinement('brand.name', TYPE.value.name);
			mainSection.hide();
			loading.show()
			helper.search()
			break;
		default:
			typeVerified = false;
			//helper.search();
			break;
	}
}
console.log(DEPARTMENT)
if( DEPARTMENT!==null){
	if( DEPARTMENT.name !== null) {
		if (DEPARTMENT.name == 'Kvinna' || DEPARTMENT.name == 'Man') {
			console.log('aaaa')
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
				console.log(answer);
				$('.ACSearchProgress').addClass('hidden');
				currentDDHits= answer.hits;
				$('#ddProductPreview').hide()
				$('#ddProductPreviewContainer').html('');
				$('#ddCol2').show()
				if(answer.nbHits > 4){
					console.log('mmmm')
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
		hints:true,
		templates: {
			dropdownMenu: searchDropDownTemplate
		}
	},autocompleteOptions).on('autocomplete:selected', function(event, suggestion, dataset) {
	//console.log(suggestion, dataset);
	//window.location ='/brand/'+suggestion.name;
});
autocomplete('#searchMobile', {
	dropdownMenuContainer: '#mobileContainerAC',
	hints:true,

	templates: {
		dropdownMenu: searchDropDownMobileTemplate
	}
},autocompleteOptionsMobile).on('autocomplete:selected', function(event, suggestion, dataset) {
	//console.log(suggestion, dataset);
	//window.location ='/brand/'+suggestion.name;
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
	}
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
	var priceBarInput = $("#pricerange")
	var paginate = $('.paginate');
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
		mainSection.hide();
		loading.show()
		currentInstance.search()
	}
	function RENDER (content){
		refreshVariables();
		if(!currentState.compare && (currentState.search || currentState.main) && searchSection.length == 0){
			mainSection.html(productEngineTemplate({fab:onFab}));
		}
		else if(!currentState.compare && currentState.search && searchSection.length != 0){
			searchSection.html(productEngineTemplate({fab:onFab}));
		}


		//STORE CURRENT HITS IN CURRENT PRODUCT GLOBAL ARRAY
		productArray = content.hits;
		$('.itemList').html(productTemplate(productArray));

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
		console.log('fab is ', onFab);
		general.css({'opacity':0.5}).animate({'opacity':1});
	}

//*******************************************Filter Actions
	general.on( 'click', ' .resultContainer .category li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value);
		FETCHPRODUCTS()
	});
	general.on( 'click', '.resultContainer .breadcrumb li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value);
		FETCHPRODUCTS()
	});
	general.on( 'click', '.resultContainer .brands input', function (event) {
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
	general.on( 'change', '.resultContainer .sizes input', function (event) {
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
	general.on( 'change', '.resultContainer .discounts input', function (event) {
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
	general.on( 'change', '.resultContainer .colors input', function (event) {
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
	general.on( 'change', '.resultContainer .shops input', function (event) {
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
	general.on( 'change', '.resultContainer .sale input', function (event) {
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
	general.on( 'click', '.resultContainer .filterTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		productHelper.removeFilterTag(type, facet, value, currentInstance);

	});
	$('.header').on( 'click', '#navbarTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		productHelper.removeFilterTag(type, facet, value, currentInstance);

	});
	general.on( 'click', ' .paginate a', function (event) {
		currentInstance.setPage($(this).attr('value'));
		FETCHPRODUCTS();
	});

	//***********************USER ACTIONS
	var productPreviewTimer;
	$('body ').on( 'mouseover','.vertical .item .preview-image' , function (event) {
		var imageSelector  =  $(this).find('img');
		var productPreviewIndex = 1;
		var divSelector = $(this);
		var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
		console.log('oo')
        if(imageArray.length>1){
		   productPreviewTimer=setInterval(function(){
			   if(productPreviewIndex == imageArray.length) productPreviewIndex= 0;
				   imageSelector.attr('src',imageArray[productPreviewIndex]);
				   divSelector.css({opacity:0.2}).animate({opacity: 1}, 500, $.bez([.6, 0, .1, 1]));
				   productPreviewIndex++;
		   }, 1200);
	   }

	}).on( 'mouseout','.item .preview-image' , function (event) { console.log('out');
		var imageSelector  =  $(this).find('img');
		var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
		if(imageArray.length>1)
			imageSelector.attr('src',imageArray[0]);
        console.log('mmm');
		clearInterval(productPreviewTimer);
	});

	/*
    * JAWBONE ACTIONS
    *
    * **/
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
		$('html, body').scrollTop(productList.offset().top - $('.header').height())
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
		//console.log(newImage)
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
		$(document).scrollTop(0);
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
		console.log(',,,')
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
				console.log('mmmm')
				index = c;
			}
		}
            console.log(index, pPcurrentIndex);
			if(pPcurrentIndex != index)
				$.when( pPreviewContainer.animate({opacity: 0.5, left:"20"}, 100, $.bez([.6, 0, .1, 1]))).done( function() {
				pPcurrentIndex = index;
					console.log('sp.',pPcurrentIndex)
					content.autoComplete = HEADERTEXT.autoComplete.productPreview;
				pPreviewContainer.html(ACProductPreviewTemplate(content));
				pPreviewContainer.animate({opacity: 1, left:"0"}, 100, $.bez([.6, 0, .1, 1]));
			})
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
		console.log('mmm')
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

		var navSegment = $('#navbarCategory');
		var tagSegment = $('#navbarTags');

		if(filterSelector.length != 0){
			if(currentScroll +  headerHeight<= filterPosition.top){
				facetContainer.css('position','absolute').css('top','0px').css('bottom', 'auto');
			}
			else if(currentScroll + facetContainer.height() >= footerPosition.top -10){
				facetContainer.css('position','absolute').css('top','auto').css('bottom', '10px');
			}
			else if(previousScroll<currentScroll ){
				navSegment.hide(); tagSegment.slideDown();

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
				navSegment.slideDown(); tagSegment.hide();

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
		if((mainSection.is(':visible') || searchSection.is(':visible')) && $('.itemList').hasClass('vertical') && $('.itemList').is(':visible')){
			console.log('ok')
			mainFacetPaneScroll();
		}
	});
	/*
	 * MOBILE
	 * Search
	 *
	 * */
	function openMobileSearch(){
		$('#searchMobileContainer').removeClass('hidden').css({left:1000}).animate({left: 0}, 100);
		$('#searchMobile').focus();
	}
	function closeMobileSearch(){
		$('#searchMobile').val('').blur();
		var searchContainer = $('#searchMobileContainer');

		$.when(searchContainer.css({left:0}).animate({left: 1000},100))
			.done( function() {
				searchContainer.addClass('hidden')
			})

	}
	$('#searchMobileForm').submit( function(){
		event.preventDefault();
		SEARCH($('#searchMobile'))
	})
	$('#mobileContainerAC').on( 'click','#ddsearchMore', function(){
		SEARCH($('#searchMobile'))
	})
	$('#menuSearchIcon').on('click',openMobileSearch);
	$('#CloseSearchMobile').on('click', closeMobileSearch)
	$('.page-container-wrapper').on('click', closeMobileSearch)
	/*
	 Mobile Menu
	 */
	$('#menuBurgerIcon').on('click', function() {
		$('.fixed-header').toggleClass('sidebar-open');
		$('.page-sidebar').toggleClass('visible');

	})

	/*
	 * MOBILE
	 * FLOATING ACTION BUTTON
	 * */

	function openFab(){
		console.log('openning fab')
		onFab  = true;
		$('.header').addClass("hidden");
		$('#footer').addClass("hidden");
		$('.fab').addClass("active");
		$('.fab').closest(".popout").find(".panel").toggleClass("active");
	}
	function closeFab(){
		onFab  = false;
		$('.header').removeClass("hidden");
		$('#footer').removeClass("hidden");
		$(".popout .panel").removeClass("active");
		$(".popout .fab").removeClass("active");
	}
	general.on('click',".popout .fab",openFab);
	general.on('click',".panel .close",closeFab);
	general.on('click',".popout .panel",function(event) {
		event.stopPropagation();
	});
	general.on('click',".popout .fab",function(event) {
		event.stopPropagation();
	});

});