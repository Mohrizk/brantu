$(document).ready(function() {

	$('#navbar-categories li a').on( 'mouseover',function(){
		$('.category-expand-container').addClass('hidden');
		$('#navbar-categories-expand').addClass('expand');
		var key = $(this).attr('key');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');

		if($("body").scrollTop() < 50){
			var totalHeight = $('#navbar-categories-expand').outerHeight();
		}
	});
	$('.header').on('mouseleave',function(){
		$('.category-expand-container').addClass('hidden');
		$('.content').css({"opacity": "1"});
	});
	$('.header').on('mouseleave',function(){
		$('.category-expand-container').addClass('hidden');
		$('.content').css({"opacity": "1"});
	});

	/*
	 Mobile Menu
	 */
	$('#menuBurgerIcon').on('click', function() {
		$('.fixed-header').toggleClass('sidebar-open');
		$('.page-sidebar').toggleClass('visible');
		$('.page-sidebar-cover').toggleClass('hidden');

	})
	$('.page-sidebar-cover').on('click', function() {
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar').removeClass('visible');
		$('.page-sidebar-cover').addClass('hidden');

	})



	$('.menu-items > li a').click( function() {
		console.log('ges here')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');

		}
	})
	$('.menu-items > .sub-menu li a').click( function(event) {
		event.stopImmediatePropagation()
		console.log('why the fuck')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');
		}


	})
    function closesideBarDD(){
		$('.sidebar-overlay-slide').toggleClass('show');
		$('.sidebar-header').find('button').toggleClass('active');
	}
	$('.sidebar-header').click( closesideBarDD)

	$('#departmentMenu a').click(function(){
		var departmentChoose = $(this).attr('data-department');
		var selector = "div[data-department-toggle='"+departmentChoose+"']"
		console.log(selector)
		$('.sidebar-menu').addClass('hidden');
		$('.sidebar-header-title').text(departmentChoose);
		closesideBarDD();
		$(selector).removeClass('hidden');
	})




	$(document).on( 'scroll' , function (event) {
		var header= $('.header').height();
		var current = $(document).scrollTop();
		var headerSegment = $('#header-Dropdown');

		if(current > header)
			headerSegment.slideUp();
		else
			headerSegment.slideDown();
	});
})
