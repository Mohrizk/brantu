$(document).ready(function() {
	$('#owlNav').owlCarousel({

		navigation : false, // Show next and prev buttons
		autoPlay:  7000,
		pagination:false,
		slideSpeed : 0,
		paginationSpeed : 5000,
		rewindSpeed:5000,
		stopOnHover:true,
		singleItem:true
	});

	$('li a[expand-key]').on('touchend click',function(e){
		e.preventDefault();
		$('.category-expand-container').addClass('hidden');

		var key = $(this).attr('expand-key');
		$('#category-expand-parent').removeClass('hidden');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');
		$('.category-expand-wrapper').animate({opacity:1});
	});
	$('#navbarDepartment').on('mouseleave',function(){
		$.when( $('.category-expand-wrapper').animate({opacity:0})).done( function() {
			$('.category-expand-container').addClass('hidden');
			$('#category-expand-parent').addClass('hidden');
		})
	});
	$('.category-expand').on('click', '.desktopNavColoumns li a, a h4', function(){
		console.log('lll')
		$.when( $('.category-expand-wrapper').animate({opacity:0})).done( function() {
			$('.category-expand-container').addClass('hidden');
			$('#category-expand-parent').addClass('hidden');
		})
	});
	$('.page-content-wrapper').on('click',function(){
		if($('.category-expand-container').not('.hidden')){
			$('.category-expand-container').addClass('hidden');
			$('.category-expand-wrapper').css({opacity:0});
		}

	})

	/*
	 Mobile Menu
	 */
	function closeSidePage(){
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
	}
	$('#menuBurgerIcon').on('click', function(e) {
		e.stopImmediatePropagation();  e.preventDefault();e.cancelBubble = true;
		$('.page-sidebar').addClass('visible').css({opacity:0}).animate({opacity:1}, 300);
		$('.fixed-header').addClass('sidebar-open');
		$('.page-sidebar-cover').removeClass('hidden');
         console.log('opening mobile menu')
	})

	$('.page-sidebar-cover').on(eventOnTE, function(e) {
		e.stopImmediatePropagation();  e.preventDefault();
		console.log('closing mobile menu')
		closeSidePage()
	})

	$('a[data-page]').on(eventOnTE,function(e){
		$('a[data-page]').removeClass('active');
		$(this).addClass('active');
	})
	$('a[data-page-ref]').on(eventOnTE,function(e){
		$('a[data-page]').removeClass('active');
		$('a[data-page="explore"]').addClass('active');
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


	$('#departmentMenu').on('click','a',function(){
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
		else if(current < header){
			headerSegment.slideDown('fast');
			logo.removeClass('scaleDown')
		}


	 if( screen.width >480){
		 if(scrollEvent){
			 if( current - previousScroll  >130 && current > header ){
				 previousScroll= current;
				 navSegment.slideUp('fast');
			 }
			 else if (previousScroll - current > 130 && scrollEvent)
			 {
				 previousScroll= current;
				 navSegment.slideDown('fast');
			 }
		 }
		 else if(!scrollEvent && current > header ){
			 if(current < $('.itemList').offset().top) scrollEvent = true;
			 if(navSegment.is(':visible'))navSegment.slideUp('fast');
		 }
	 }


		if(isMobile && current> header){
			$('#menuSearchIcon').fadeIn();
		}
		else if(isMobile && current< header){
			$('#menuSearchIcon').fadeOut('fast');
		}
	}
	$(window).on( 'scroll' ,function(){
		navBarScrollActions()
	});

})
