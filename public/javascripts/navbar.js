$(document).ready(function() {

	/*$('#navbar-categories li a').on( 'mouseover',function(){
		$('.category-expand-container').addClass('hidden');
		$('#navbar-categories-expand').addClass('expand');
		var key = $(this).attr('key');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');

		if($("body").scrollTop() < 50){
			var totalHeight = $('#navbar-categories-expand').outerHeight();
		}
	});*/

	$('li a[expand-key]').on( 'mouseover',function(){
		console.log('ooo')
		$('.category-expand-container').addClass('hidden');
		var key = $(this).attr('expand-key');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');
		$('.category-expand-wrapper').animate({opacity:1});
	});

	$('#navbarDepartment').on('mouseleave',function(){
		$.when( $('.category-expand-wrapper').animate({opacity:0})).done( function() {
			$('.category-expand-container').addClass('hidden');
		})
	});


	/*
	 Mobile Menu
	 */
	$('#menuBurgerIcon').on('click', function(e) {
		$('.page-sidebar').toggleClass('visible').css({opacity:0}).animate({opacity:1});
		$('.fixed-header').toggleClass('sidebar-open');

		$('.page-sidebar-cover').toggleClass('hidden');

	})

	$('.page-sidebar-cover').on('click', function() {
		$('.page-sidebar').animate({opacity:0}).removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
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


	var previousScroll = 0;
	function navBarScrollActions(){
		var navSegment = $('#navbarDepartment');
		var logo = $('.mainLogo');
		var header= $('.header').height();
		var current = $(document).scrollTop();
		var headerSegment = $('#header-Dropdown');

		if(current > header){
			headerSegment.slideUp('fast');
			logo.addClass('scaleDown')
		}
		else{
			headerSegment.slideDown('fast');
			logo.removeClass('scaleDown')
		}

		if(previousScroll<current){
			navSegment.slideUp('fast');
		}
		else if (previousScroll>current)
		{
			navSegment.slideDown('fast');
		}

		previousScroll= current;
	}

	$(document).on( 'scroll' , function (event) {

		if(!isMobile)navBarScrollActions;
		else{
			var logo = $('.mainLogo');
			var current = $(document).scrollTop();
			var header= $('.header').height();
			if(current > header){
				logo.addClass('scaleDown')
			}
			else{
				logo.removeClass('scaleDown')
			}
		}
	});
})
