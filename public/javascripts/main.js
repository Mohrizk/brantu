
/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */

var isMobile = false, eventOnTE = 'click', eventOnTS = 'click', scrollEvent = true;
//Device
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
{	isMobile = true;eventOnTE = 'touchend';eventOnTS = 'touchstart'; }

//GetTemplate
var productNavigate = Handlebars.compile($("#productNavigationTemplate").html());
var productView = Handlebars.compile($("#productViewTemplate").html());
var productRelated = Handlebars.compile($("#productRelatedTemplate").html());
var searchDropDown = Handlebars.compile($("#searchDropDownTemplate").html());
var searchDropDownMobile= Handlebars.compile($("#searchDropDownMobileTemplate").html());
var ACTemplateProduct= Handlebars.compile($("#ACTemplateProductTemplate").html());
var ACTemplateBrand= Handlebars.compile($("#ACTemplateBrandTemplate").html());
var ACTemplateCategory= Handlebars.compile($("#ACTemplateCategoryTemplate").html());
var ACProductPreviewTemplate = Handlebars.compile($("#ACProductPreviewTemplateTemplate").html());
var newsletterTemplate = Handlebars.compile($("#newsletterTemplateTemplate").html());


var client = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var helper   = algoliasearchHelper(client, 'products_2',
	{
		hitsPerPage: 30,
		hierarchicalFacets: [{
		name: 'products',
		attributes: ['category.lvl0', 'category.lvl1', 'category.lvl2', 'category.lvl3', 'category.lvl4', 'category.lvl5'],
        sortBy: ['count:desc', 'name:asc']
	}],
	facets:[  'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','sizes', 'shops', 'discount' , 'style', 'fit', 'material']
});

var typeVerified = false, departmentVerified= false;
//INITIALIZE STATES & HELPERS
var currentState= {search:false , brand:false, category:false}
if(TYPE !=null && TYPE!==''){
		var loading = $('.loading');
		var brandName=null;
		typeVerified = true;
		switch (TYPE) {
			case 'category':
				currentState.category=true;
				currentState.brand=false;
				currentState.search=false;
				break;
			case 'brand':
				currentState.brand=true;
				currentState.category=false;
				currentState.search=false;
				var splitted = window.location.href.split('/')
				brandName = splitted[splitted.length -1].split('?')[0];
				break;
			case 'search':
				currentState.search=true;
				currentState.brand=false;
				currentState.category=false;
				break;
		}
		renderHelper.urlToState(helper,window.location.href.split('?')[1],currentState,brandName)
	}


if( DEPARTMENT!==null){
	if( DEPARTMENT !== null) {
		if (DEPARTMENT == 'Kvinna' || DEPARTMENT == 'Man') {
			departmentVerified = true;
		}
	}
}
/**
 * Ensure that a tag is not filtering the results
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 * @fires
 */
$(document).ready( function() {
	function lazy(){
		$('img.lazy').lazyload({effect: "fadeIn", threshold:300}).removeClass("lazy");
	}
	lazy()
	if(typeVerified){
		priceBar();
	}
	//_________AUTCOMPLETE
	var currentDDHits=[];
	var currentBrandDDHits=[];
	var pPcurrentIndex = 100;  // needed for hovering effect
	var autocompleteOptions = [
		{
			//source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
			source: function(query, callback) {
				var index = client.initIndex('products_2');
				var options = {hitsPerPage: 8}
				if(departmentVerified)options.facetFilters = 'category.lvl0:'+DEPARTMENT;
				$('.ACSearchProgress').removeClass('hidden');
				index.search(query, options).then(function(answer) {
					pPcurrentIndex = 100;
					$('.ACSearchProgress').addClass('hidden');
					currentDDHits= answer.hits;
					$('#ddProductPreview').hide()
					$('#ddProductPreviewContainer').html('');
					$('#ddCol2').show();
					if(answer.hits.length > 7){
						answer.hits.splice(7,1,{
							linkHref:'/search?q='+$('#search').val()+'&hFR[products][0]='+DEPARTMENT,
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
				var index = client.initIndex('brands');
				var options = {hitsPerPage: 5}
				if(departmentVerified)options.facetFilters = 'genders:'+DEPARTMENT;
				index.search(query, options).then(function(answer) {
					answer.hits.map(function(hit){
						return hit.DEPARTMENT = DEPARTMENT;
					})
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
		},
		{
			source: function(query, callback) {
				var index = client.initIndex('categories');
				var options = {hitsPerPage: 3}
				if(departmentVerified)options.facetFilters = 'gender:'+DEPARTMENT;

				index.search(query, options).then(function(answer) {
					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion, answer) {
					return ACTemplateCategory(suggestion);
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
				var index = client.initIndex('products_2');
				var options = {hitsPerPage: 4}
				if(departmentVerified)options.facetFilters = 'category.lvl0:'+DEPARTMENT;
				$('.ACSearchProgress').removeClass('hidden');
				index.search(query, options).then(function(answer) {
					console.log(answer)
					pPcurrentIndex = 100;
					$('.ACSearchProgress').addClass('hidden');
					currentDDHits= answer.hits;
					$('#ddProductPreview').hide()
					$('#ddProductPreviewContainer').html('');
					$('#ddCol2').show()
					if(answer.nbHits > 4){
						answer.hits.splice(3,1,{
							linkHref:'/search?q='+$('#search').val()+'&hFR[products][0]='+DEPARTMENT,
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
				var index = client.initIndex('brands');
				var options = {hitsPerPage: 4}
				if(departmentVerified)options.facetFilters = 'genders:'+DEPARTMENT;
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
			dropdownMenu: searchDropDown
		}
	},autocompleteOptions)
		.on('autocomplete:selected', function(event, suggestion, dataset) {
			$('#search').val('');
			searchBar.blur();
		})
		.on('autocomplete:shown', function(event, suggestion, dataset) {
			$('#containerHintAC').hide();
		});

	autocomplete('#searchMobile', {
		dropdownMenuContainer: '#mobileContainerAC',
		hints:true,
		templates: {
			dropdownMenu: searchDropDownMobile
		}
	},autocompleteOptionsMobile)
		.on('autocomplete:selected', function(event, suggestion, dataset) {
			$('#searchMobile').val('');
			searchBar.blur();
		})
		.on('autocomplete:shown', function(event, suggestion, dataset) {
			$('#mobileContainerHintAC').hide();
		});

	function loadMainOWl(){
		owl = $("#owl-main")
		owl.owlCarousel({
			items : 3,
			itemsDesktop : [1000,2],
			itemsDesktopSmall : [900,2],
			lazyLoad : true
		});
		$("#owl-main-mobile").owlCarousel({
			items : 3,
			itemsDesktopSmall : [900,2],
			lazyLoad : true
		});
	}
	function loadOtherOWl(){
		$("#owlBrand").owlCarousel({
			items :6,
			itemsDesktopSmall : [900,3],
			itemsTablet: [600,2],
			itemsMobile : false,
			lazyLoad : true
		});

		$("#owlLowerCategory").owlCarousel({
			items : 6,
			itemsDesktopSmall : [900,3],
			itemsTablet: [600,2],
			itemsMobile : false,
			lazyLoad : true
		});
	}
	loadMainOWl(); loadOtherOWl();



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

	var itemScrollindex, returnPath;
	/****
	 *
	 */

	//DEFINED ROUTES
	//NAVIGATION
	page('/view/:id'   , showLoading,  hideHeader, viewProduct, getSimilarProducts, addViewedProduct)
	page('/explore'    , saveLastPath, showLoading, setCategory, closeSidePage,  setStateFromUrl, showHeader )
	page('/search'     , saveLastPath, showLoading , setSearch, closeSidePage,  setStateFromUrl, showHeader )
	page('/brand/:name', saveLastPath, showLoading, setBrand,  closeSidePage,  setStateFromUrl, showHeader )
	page('/kvinna/*', reload)
	page('/man/*', reload)
	page('/settings/*', reload)
	page('/about/*', reload)
	page('/favourite-products', reload)
	page({ dispatch: false, decodeURLComponents:false});

	function reload(context,next){
		location.href = context.path;
	}
	function getUrlFromState(){

		var pattern = "'%20&%20'",
		re = new RegExp(pattern, "g");
		var helperString = helper.getStateAsQueryString().replace(re, '%20%26%20')
			//helperString = helperString.replace(/'%20&%20').join('%20%26%20');

		var path ;
		var page = '&page='+helper.getPage();
		if(currentState.brand){
			path = 'brand/'+renderHelper.getBrandName(helper)+'?';
			helper.clearRefinements('brand.name');
		}
		else if(currentState.search)   path ='search?';
		else if(currentState.category) path ='explore?';


		var x = '/'+path+helperString+page;
		console.log(x)
		console.log(helper.getStateAsQueryString())
		console.log('---------')

		return x;
	}
	function saveLastPath(context, next){
		returnPath = context.path;
		next()
	}
	function setStateFromUrl(context, next){
		var stringQuery = context.querystring;
		renderHelper.urlToState(helper, stringQuery, currentState, context.params.name);
		helper.search()
		next();
	}
	function priceBar(){
		$("#pricerange").ionRangeSlider({
			type: "double",
			min:priceLimits.data.min,
			max: priceLimits.data.max,
			from:priceLimits.data.from,
			to:  priceLimits.data.to,
			prefix: "SEK", onFinish: function (data) {
				priceLimits.data={ min: data.min, max: data.max, from: data.from, to: data.to} ;
				priceLimits.change= false;
				helper.removeNumericRefinement('price.value')
					.addNumericRefinement('price.value','>', data.from)
					.addNumericRefinement('price.value','<', data.to);
				page(getUrlFromState());
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
				helper.removeNumericRefinement('price.value')
					.addNumericRefinement('price.value','>', data.from)
					.addNumericRefinement('price.value','<', data.to);
				page(getUrlFromState());
			}
		});
	}
	function RENDER (content){
		refreshVariables();
		renderHelper.setTitle(currentState)
		var renderer = {};
		renderHelper.getAllFacetValues(renderer, helper, content, currentState, currentBrandDDHits, COLORS, HEADERTEXT, departmentVerified);
		renderer.isMobile = isMobile;
		renderer.isFab = onFab;
		if(priceLimits.change && renderer.price!=null) priceLimits.data = {min: renderer.price.min, max: renderer.price.max, from: renderer.price.min, to:  renderer.price.max}
		else priceLimits.change= true;
		mainSection.addClass('content').html(productNavigate(renderer));
		priceBar()
		lazy()
	}
	helper.on('result', function(content) {
		RENDER(content);
		$('html, body').scrollTop(0);
		loading.fadeOut('slow');
		general.css({'opacity':0.5}).animate({'opacity':1});
	})

	function showLoading (context, next){
		loading.show();
		next();
	}

	function setCategory(context, next){
		currentState.category=true;
		currentState.search=false;
		currentState.brand=false;
		next();
	}
	function setSearch(context, next){
		currentState.search=true;
		currentState.brand=false;
		currentState.category=false;
		next();
	}

	function SEARCH (searchInput){
		refreshVariables()
		$('.ACSearchProgress').addClass('hidden');
		var q = searchInput.val(); searchInput.blur(); searchInput.val('');
		if(q.length ==  0){return;}
		currentState.search=true;
		currentState.brand=false;
		currentState.category=false;
		helper.clearRefinements().setQuery(q);
		if(!jQuery.isEmptyObject(DEPARTMENT)) helper.toggleRefinement('products', DEPARTMENT);
		page(getUrlFromState())
	}

	var owl;
	function viewProduct(context, next){
		context.state.product = context.params.id
		//context.save()
		refreshVariables()
		$('.resultContainer').fadeOut()
		//$('.facetPane').hide();
		$('.itemList img').removeClass('selected');
		$.ajax({
			url: '/api/getProductByID/'+context.state.product,
		}).success(function(result) {
			result.lastPath = returnPath;
			$(document).prop('title', 'Product - '+  result.product.name)
			    mainSection.html(productView(result) + '<div class="relatedProducts">'+
				 '<div class="">'+
				 '<div class="text-center p-t-50 p-b-50">'+
				 '<div class=" text-center ">' +
				 '<h4 class="text-velvet">Söker efter relaterade <b>styles</b> </h4>'+
				 '<img src="/images/progress/progress-circle-danger.svg" style="width:200px height: 200px">'+
				 '</div>'+
				 '</div>'+
				 '</div>'+
				 '</div >')
				loadMainOWl();

				$('html, body').scrollTop(0);
				//$('#header-Dropdown').hide();
				loading.fadeOut('slow');
			    mainSection.show().css({'opacity':0}).animate({'opacity':1},'slow')
				next();
			})

	}


	function getSimilarProducts(context, next){
		$.ajax({
			url: '/api/getSimilarProducts/'+ context.state.product,
		}).success(function(result) {
			$.when($('.relatedProducts').html(productRelated(result)))
				.done(function(){
					loadOtherOWl();
					lazy()
					$('.relatedProducts').css({'opacity':0}).animate({'opacity':1})
					next();
				})
		});
	}
	function addViewedProduct(context, next){
		$.ajax({
			type: "POST",
			url: "/add-viewed-product-session",
			data: {_id:context.state.product}
		}).success(function(result) {
		});
	}


	function hideHeader(context,next){
		if(screen.width < 480){
			$('#headerMainContainer').slideUp('fast');
		}
		next()
	}
	function showHeader(context,next){
		if(screen.width < 480){
			$('#headerMainContainer').slideDown('fast');
		}
	}

	function closeSidePage(context, next){
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
		next();
	}
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

	function setBrand(context,next){
		currentState.brand=true;
		currentState.search=false;
		currentState.category=false;
		next()
	}

	/*
	 * MAIN RENDER FUNCTION FOR ALL SEARCHES
	 * AND CATEGORY NAVIGATION
	 *
	 * */
	//*******************************************Filter Actions
	var body = $('body')

	body.on( eventOnTE , ' .category li a', function (event) {
		var value = $(this).attr('value');
		helper.clearRefinements('products').toggleRefinement('products', value);
		page(getUrlFromState())
	});
	body.on( 'click', ' .breadcrumb li a', function (event) {

		var value = $(this).attr('value');
		helper.clearRefinements('products').toggleRefinement('products', value);
		event.stopPropagation();event.preventDefault();
		page(getUrlFromState())
	});
	body.on( 'click', ' .brands input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('brand.name', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('brand.name', value);
		}
		page(getUrlFromState())
	});

	body.on( 'click', ' .style input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('style', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('style', value);
		}
		page(getUrlFromState())
	});

	body.on( 'click', ' .material input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('material', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('material', value);
		}
		page(getUrlFromState())
	});
	body.on( 'click', ' .fit input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('fit', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('fit', value);
		}
		page(getUrlFromState())
	});


	body.on( 'change', ' .sizes input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('sizes', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('sizes', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', ' .discounts input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('discount', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('discount', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', '  .colors input', function (event) {
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('color', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('color', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', ' .shops input', function (event) {

		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('shops', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('shops', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', ' .sale input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addFacetRefinement('sale', value);
		}
		else{
			helper.removeFacetRefinement('sale', value);
		}
		page(getUrlFromState())
	});
	body.on( eventOnTE, '  .filterTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		renderHelper.removeFilterTag(type, facet, value, helper);
		page(getUrlFromState())
	});
	/*$('.header') .on( eventOnTE, '#navbarTags button', function (event) {
		event.stopPropagation()
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		renderHelper.removeFilterTag(type, facet, value, helper);
		page(getUrlFromState())

	});*/
	pageContainer.on( eventOnTE, ' .paginate a', function (event) {
		event.stopPropagation()
		helper.setPage($(this).attr('value'));
		page(getUrlFromState())
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
    * View Product
    *
    * **/
	mainSection.on( 'click','a[data-product-info = "show"], img[data-product-info="show"]' , function (e) {
		$(this).addClass('selected')
		closeMobileSearch();
		var index = $(this).attr('index'), _id =  $(this).attr('_id');
		if(index !== null)itemScrollindex = index;
		page('/view/'+_id);
		e.stopPropagation();e.preventDefault();
	});
	mainSection.on('click','#mainJawBoneImageContainer .next-item',function(){
		owl.trigger('owl.next');
	})
	mainSection.on('click','#mainJawBoneImageContainer .prev-item',function(){
		owl.trigger('owl.prev');
	})
	mainSection.on( eventOnTE,'.jawBone .delete' , function (e) {
		page($(this).attr('data-path'))
		e.preventDefault();
	})
	mainSection.on( eventOnTE,'.jawBone .back' , function (e) {
		page.back();
		e.preventDefault();
	})

	/*
	 * AUTOCOMEPLTE ACTIONS
	 *
	 * **/
	//***************************************SEARCH
	$('#fakeDesktopSearch').on('keyup',function(){
		searchBar.focus()
		searchBar.val($(this).val())
	})
	$('#autocompleteForm').submit( function(event){

		event.preventDefault();
		SEARCH(searchBar);
	})
	ddContainer.on( 'click','#ddsearchMore', function(){
		console.log('sup', searchBar.val())
		$('#autocompleteForm').submit()
	})
	mainSection.on( 'click','.closeSearch', function(){})
	searchSection.on( 'click','.closeSearch', function(){})
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
		var _id = $(this).attr('data-id');
		var pPreviewSelector = $('#ddProductPreview')
		var pPreviewContainer = $('#ddProductPreviewContainer')
		pPreviewSelector.show();
		var index = 3;
		for(var c in currentDDHits){
			if(_id == currentDDHits[c].objectID){
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
		$('.searchMainPageOverlay').fadeIn('slow');
		if(this.value == ''){
			$('#containerHintAC').show();
		}
	})
	searchBar.blur(function(){
		$('.searchMainPageOverlay').hide();
		$('#containerHintAC').hide();
	})
	searchBar.on('keyup',function(){
		var fake = $('#fakeDesktopSearch');
		fake.val($(this).val());
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

		//var tagSegment = $('#navbarTagsContainer');

		if(filterSelector.length != 0){
			if(currentScroll +  headerHeight<= filterPosition.top){
				facetContainer.css('position','absolute').css('top','0px').css('bottom', 'auto');
			}
			else if(currentScroll + facetContainer.height() >= footerPosition.top -10){
				facetContainer.css('position','absolute').css('top','auto').css('bottom', '10px');
			}
			else if(previousScroll<currentScroll ){
				//tagSegment.slideDown();

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
				//tagSegment.hide();

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
		if($('.page-sidebar').hasClass('visible')){
			$('.page-sidebar').removeClass('visible');
			$('.fixed-header').removeClass('sidebar-open');
			$('.page-sidebar-cover').addClass('hidden');
		}
		$.when($('#searchMobileContainer').removeClass('hidden').css({opacity:0}).animate({opacity: 1}, 20))
			.done( function() {
				$('#searchMobileForm').find('.algolia-autocomplete').find('input').focus();
			})
	}
	$('#searchMobileForm').submit(function(e){
		event.preventDefault();
		SEARCH($('#searchMobile'))
	}).keyup(function(e) {
		if (e.which == 13) {
			SEARCH($('#searchMobile'))
		}
	});
	$('#mobileContainerAC').on( 'click','#ddsearchMore', function(){
		SEARCH($('#searchMobile'))
	})
	$('.fakeMobileSearchButton').focus(function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		e.cancelBubble = true;
		openMobileSearch();
	});
	$('#CloseSearchMobile').on(eventOnTE, function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		e.cancelBubble = true;
		//closeSEARCH()
		closeMobileSearch();
	})
	//$('.page-container-wrapper').on('click', closeMobileSearch)
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
		$('.page-container').addClass('openFab')
		$('#mobileSubMenu').addClass("hidden");
		$('#footer').addClass("hidden");
		$('.fab').addClass("active").closest(".popout").find(".panel").toggleClass("active");;

	}
	function closeFab(){
		onFab  = false;
		$('.header').removeClass("hidden");
		$('#mobileSubMenu').removeClass("hidden");
		$('#footer').removeClass("hidden");
		$('.page-container').removeClass('openFab')
		$(".popout .panel").removeClass("active");
		$(".popout .fab").removeClass("active");
	}
	$(document).on('click',".popout .fab",function(e){
		e.preventDefault();
		e.stopImmediatePropagation();openFab()
	});
	$(document).on(eventOnTS,".panel .close",function(e){
		e.preventDefault();
		e.stopImmediatePropagation();closeFab()
	});
	$(document).on('click',".popout .panel",function(e) {
		e.stopImmediatePropagation();
	});
	$(document).on('click',".popout .fab",function(e) {
		e.stopImmediatePropagation();
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
		$('#newsletterSignUp').html(newsletterTemplate(HEADERTEXT.newsletter.addForm));
	})
	/***
	 * Add Favourit Product
	 * **/
	function addRemoveFavoriteProduct(action, _id){
		$.ajax({
			type: "POST",
			url: action,
			data: _id
		}).success(function(result) {
			if(result == '0' && window.location.pathname.indexOf('favourite') > -1)location.reload();
			else
			    $('.sideBarFavouriteProducts').text(result)
		});
	}
	mainSection.on( eventOnTS,'.jawBone .addFavouriteProduct' ,function(e){
		addRemoveFavoriteProduct($(this).attr('action'), {_id: $(this).attr('_id')})
		$(this).removeClass('addFavouriteProduct').addClass('removeFavouriteProduct').attr('action','/favourite-product/remove')
			.find('i').css({opacity:0}).removeClass('fa-heart-o').addClass('fa-heart').addClass('text-pink-darker').animate({opacity:1});
		e.stopImmediatePropagation(); e.preventDefault();
	})
	mainSection.on( eventOnTS,'.jawBone .removeFavouriteProduct' ,function(e){
		e.stopPropagation(); e.preventDefault();
		addRemoveFavoriteProduct($(this).attr('action'), {_id: $(this).attr('_id')})
		$(this).removeClass('removeFavouriteProduct').addClass('addFavouriteProduct').attr('action','/favourite-product/add')
			.find('i').css({opacity:0}).removeClass('fa-heart').removeClass('text-pink-darker').addClass('fa-heart-o').animate({opacity:1});

	})
	general.on( 'click','.item .removeFavouriteProduct' ,function(){
		$(this).closest('.item').fadeOut();
		addRemoveFavoriteProduct($(this).attr('action'), {_id: $(this).attr('_id')})
	})
});