var missingFields = true;
var allowFacebookPopUp= false;
var FacebookClicked= false;




function loadPopUpRegister(){
	
	var html = '<div class="row">'+	
	  			  '<div class="col-md-12 " style="background:rgba(255,255,255,0.85); border-radius:4px;">'+
	  				  '<form id="signupForm" class="form-horizontal" role="form" autocomplete="off" novalidate="novalidate" th:action="@{/newUser}" method="post" >'+
	  				  '<div class="form-group">'+
	  				  		'<div class="col-sm-12" style="padding:0; margin:0;">'+
				            		'<div class="col-sm-6 m-b-1v">' +
							  			  '<span class="input input--madoka">'+
										'<input class="input__field input__field--madoka registration" type="email" id="email" required="required" data-placement="right" title="Please fill in this field!" data-toggle="tooltip" data-original-title="Please fill in this field" data-trigger="manual" />'+
										'<label class="input__label input__label--madoka " for="email">'+
											'<svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">'+
												'<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>'+
											'</svg>'+
											'<span class="input__label-content input__label-content--madoka"><i class="fa fa-envelope"></i> Email</span>'+
										'</label>'+
									  '</span>'+
								    '</div>'+
							'</div>'+
	  				  		'<div class="col-sm-6 m-b-1v">' +
	  				  			'<span class="input input--madoka">'+
									'<input class="input__field input__field--madoka registration" type="text" id="fname" required="required" data-placement="right" title="Please fill in this field!" data-toggle="tooltip" data-original-title="Please fill in this field" data-trigger="manual" autocomplete="off"/>'+
									'<label class="input__label input__label--madoka" for="fname">'+
										'<svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">'+
											'<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>'+
										'</svg>'+
										'<span class="input__label-content input__label-content--madoka"><i class="fa fa-user"></i> First Name</span>'+
									'</label>'+
								'</span>'+
							 '</div>'+
							 '<div class="col-sm-6 m-b-1v">' +
	  				  			'<span class="input input--madoka">'+
									'<input class="input__field input__field--madoka registration" type="text" id="lname" required="required" data-placement="right" title="Please fill in this field!" data-toggle="tooltip" data-original-title="Please fill in this field" data-trigger="manual" autocomplete="off"/>'+
									'<label class="input__label input__label--madoka" for="lname">'+
										'<svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">'+
											'<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>'+
										'</svg>'+
										'<span class="input__label-content input__label-content--madoka"><i class="fa fa-user"></i> Last Name</span>'+
									'</label>'+
								'</span>'+
							 '</div>'+
							 '<div class="col-sm-6 m-b-1v">' +
	  				  			'<span class="input input--madoka">'+
									'<input class="input__field input__field--madoka registration" type="password" id="password" required="required" data-placement="right" title="Please fill in this field!" data-toggle="tooltip" data-original-title="Please fill in this field" data-trigger="manual" autocomplete="off"/>'+
									'<label class="input__label input__label--madoka" for="password">'+
										'<svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">'+
											'<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>'+
										'</svg>'+
										'<span class="input__label-content input__label-content--madoka"><i class="fa fa-unlock-alt"></i> password</span>'+
									'</label>'+
								'</span>'+
							 '</div>'+
							 '<div class="col-sm-6 m-b-1v">' +
	  				  			'<span class="input input--madoka">'+
									'<input class="input__field input__field--madoka registration" type="password" id="passwordConfirm" required="required" data-placement="right" title="Please fill in this field!" data-toggle="tooltip" data-original-title="Please fill in this field" data-trigger="manual" autocomplete="off"/>'+
									'<label class="input__label input__label--madoka" for="passwordConfirm">'+
										'<svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">'+
											'<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>'+
										'</svg>'+
										'<span class="input__label-content input__label-content--madoka"><i class="fa fa-user"></i>Confirm password</span>'+
									'</label>'+
								'</span>'+
							 '</div>'+
							'</div>'+
					'<div class="form-group">'+
	                     '<div class="col-sm-6">'+
                         	'<div id="birth-date"></div>'+
                         		'<div class="row m-t-10">'+
                         				'<p class="fs-11 no-margin no-padding brantu-blue inform cursor"  data-placement="auto" title="  Providing your birthday and Gender helps make sure you get the right Brantu experience for your age and sex."  data-html="true"  data-toggle="tooltip" data-trigger="click"><a>  <i class="fa fa-question-circle"></i><u> Why do I have to provide information about my gender and age?</u></a></p>'+ 
                         		'</div>'+
                           '</div>'+
                           '<div class="col-sm-6">'+
							    '<div class="radio radio-complete">'+
							       '<input type="radio" class="registration"  value="female" name="gender" id="female" />'+
							      '<label for="female"  class="fs-14 ">Female</label>'+
							      
							     ' <input type="radio" class="registration" value="male" name="gender" id="male" />'+
							     '<label for="male"  class="fs-14 ">Male</label> '+
							    '</div>'+
						   '</div>'+
					'</div>'+
					'<div >'+
					   ' <div class="pull-left clearfix">'+
							'<p class="fs-11">By clicking Sign Up, you agree to our  <a target="_blank" href="http://www.brantu.com/terms-and-conditions"> Terms &amp; Conditions</a> and that you have read our <a target="_blank" href="http://www.brantu.com/privacy-policy">Privacy Policy</a></p>'+
						'</div>'+
					    '<button id="submitRegistration" class="btn btn-infobtn-cons btn-animated from-left fa fa-check-circle pull-right m-b-20" type="button">'+'<span>Sign Up</span>'+'</button>'+
					'</div>'+		
		'</form>'+
	'</div>'+
  '</div>';
	
	return html;
	
}



function loadPopUpLogin(){
	var html = '<div class="row">'+	
					'<div class="col-md-12 " style="background:rgba(255,255,255,0.85); border-radius:4px;">'+
					'<form id="signupForm" class="form-horizontal" role="form" autocomplete="off" novalidate="novalidate" th:action="@{/loginUser}" method="post" >'+
					'<div class="form-group">'+
							'<div class="col-sm-12" style="padding:0; margin:0;">'+
		            		'<div class="col-sm-6 m-b-1v">' +
					  			  '<span class="input input--madoka">'+
								'<input class="input__field input__field--madoka" type="Email" id="loginEmail" required="required" data-placement="right" title="Please fill in this field!" data-toggle="tooltip" data-original-title="Please fill in this field" data-trigger="manual" />'+
								'<label class="input__label input__label--madoka" for="loginEmail">'+
									'<svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">'+
										'<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>'+
									'</svg>'+
									'<span class="input__label-content input__label-content--madoka"><i class="fa fa-envelope"></i> Email</span>'+
								'</label>'+
							  '</span>'+
						    '</div>'+
						   '</div>'+
						   '<div class="col-sm-12" style="padding:0; margin:0;">'+
		            		'<div class="col-sm-6 m-b-1v">' +
					  			 '<span class="input input--madoka">'+
								'<input class="input__field input__field--madoka" type="password" id="loginPassword" required="required" data-placement="right" title="Please fill in this field!" data-toggle="tooltip" data-original-title="Please fill in this field" data-trigger="manual" />'+
								'<label class="input__label input__label--madoka" for="loginPassword">'+
									'<svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">'+
										'<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>'+
									'</svg>'+
									'<span class="input__label-content input__label-content--madoka"><i class="fa fa-lock"></i> Password</span>'+
								'</label>'+
							  '</span>'+
						    '</div>'+
						   '</div>'+
						   '<p class="fs-11">Forgot Your Password</p>'+
						'</div>'+
					'</div>'+
					'<div >'+
					    '<button id="submitLogin" class="btn btn-info bbtn-cons btn-animated from-left fa fa-check-circle pull-right m-b-20" type="button">'+'<span>Login</span>'+'</button>'+
					'</div>'+	
					'</form>'+
				'</div>';
	
	return html;
}










(function($) {

    'use strict';
    
    $(window).on('load', function() {
    	/*var myInput = document.getElementById('passwordConfirm');
   	 myInput.onpaste = function(e) {
   	   e.preventDefault();
   	 }*/
      
   })


$(document).ready(function() {
	
	/*Pages.prototype.init = function() {this.initSlidingTabs();}
	$.Pages = new Pages();
    $.Pages.Constructor = Pages;
	Pages.prototype.initSlidingTabs = function() {
	    // TODO: move this to a separate file
	    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
	        //e = $(e.relatedTarget || e.target).parent().find('a[data-toggle=tab]');
	        e = $(e.target).parent().find('a[data-toggle=tab]');

	        var hrefPrev = e.attr('href');

	        var hrefCurrent = e.attr('href');

	        if (!$(hrefCurrent).is('.slide-left, .slide-right')) return;
	        $(hrefCurrent).addClass('sliding');

	        setTimeout(function() {
	            $(hrefCurrent).removeClass('sliding');
	        }, 200);
	    });
	}*/
	


	$("#birth-date").birthdayPicker({maxAge: 65, sizeClass: "span2"});

	  
	//$("#phone").intlTelInput({utilsScript: "assets/plugins/int-phone/js/utils.js", initialCountry :"se", preferredCountries: [ "gb", "dk","no" ]});
	
	
	
	
	
	/****Initiate tool tips****/
	$('[data-toggle="tooltip"]').tooltip({
		animation: true, 
		html: true
	});
	$("[data-toggle='tooltip']").on('shown.bs.tooltip', function(){
		setTimeout(function () {
			$("[data-toggle='tooltip']").tooltip("hide");
  	    }, 10000)
				    
    });
	
	
	/****Input Event listner****/
	(function() {
		// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
			// in case the input is already filled..
			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'input--filled' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'input--filled' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'input--filled' );
			}
		}
	})();
	
	
    /*****FOR FACEBOOK****/
    $(document).on('click','#facebook-signup',function(e) {  
        
  	  allowFacebookPopUp= true;
  	  FacebookClicked= true;
  	  checkLoginState();
  	  console.log('xxxxx')
  	  
     });
    
    
    $('#facebook-signup2').click(function(e) {  
        
    	  allowFacebookPopUp= true;
    	  FacebookClicked= true;
    	  checkLoginState();
    	  
      });
      

/****Input Checkup for bug fixing - Check if any input have a problem as soon as focus****/
    
    
$('.input__field--madoka').on({
    focus: function () {

        var self = this;

        $(this).data('timer', 
            setInterval(function() {
                 checkInput();
            }, 250)
        );
    },
    blur: function() {
        clearInterval( $(this).data('timer') );
    }
});

function checkInput() {
	$( ".input__field--madoka" ).each(function( ) {
		   if(!$(this).val()=="" & !$(this).closest("span").hasClass("input--filled") )
		   {   
			   $(this).closest("span").addClass("input--filled");
			   
			   
		   }
		});
 
}
    
    
    
    
	
	
	/****Sign-up Form Submit****/
	$(document).on('blur','input.registration',function () {
	
	var theinput=$(this);
		
	 if(theinput.val() == "" ){
		 
          if(theinput.prop('required')==true){
			 
			 $(this).attr('title', 'This is a required field').tooltip('fixTitle').tooltip('show');	
		  } 
	  }
	 else{
		 
		 /*****Validate*****/
		 //first and last name
		 if(theinput.attr("id")=="fname" || theinput.attr("id")=="lname"){
			 
			 if (!ValidateName($(this).val()) )
			 {
				 $(this).attr('title', "Please make sure that your name doesn't contain numbers & more than 2 charachters").tooltip('fixTitle').tooltip('show');

			 } 
			 else{
				 $(this).tooltip('hide');
		     }
	     }
		 else if(theinput.attr("id")=="email"){ 
		 
			 if (!ValidateEmail($("#email").val())){
				 $(this).attr('title', "Make sure your email is correct").tooltip('fixTitle').tooltip('show');
				 
			 }
			 else{
				 $(this).tooltip('hide');
		     }
		 }
		 else  if(theinput.attr("id")=="emailConfirm"){ 
		 
			 if (!ValidateEmailconf($("#email").val(),$("#emailConfirm").val())){
				 $(this).attr('title', "Make sure both email mathc").tooltip('fixTitle').tooltip('show');
				 
			 }
			 else{
				 $(this).tooltip('hide');
		     }
		 }
		 else if(theinput.attr("id")=="birth-date"){ 
			 $(this).tooltip('hide');
		 }
		 else if(theinput.attr("id")=="password"){ 
			 if(!ValidatePass($("#password").val()) ){
				 $(this).attr('title', "Please make sure your password is at least 8 charachters and contains one number").tooltip('fixTitle').tooltip('show');
			 }
			 else {	
				 $(this).tooltip('hide');
		     }
			 
	     } 
		 else if(theinput.attr("id")=="passwordConfirm"){ 
			 
			 if( !ValidatePassconf($("#password").val(), $("#passwordConfirm").val()) ){
				 $(this).attr('title', "Please make sure it matches your password").tooltip('fixTitle').tooltip('show');
			 }
			 else {	
				 $(this).tooltip('hide');
		     }
			 
	     }
		 else if(theinput.attr("id")=="phone"){ 
			 
			 if( ! ValidatePhone()){
				 $(this).attr('title', "Make sure your phone is correct").tooltip('fixTitle').tooltip('show');
			 }
			 else {	
				 $(this).tooltip('hide');
		     }
			 
		 }
		 
	 }
		
	});
	
	
	
	

	/****Sign-up Form Submit****/
	
	$(document).on('click','#submitRegistration',function () {
		finalvalidation();
	});
	
	
	$('#signupForm').on('keypress', function(e) {
	    var code = e.keyCode || e.which;
	    
	    if (code == 13 ) {
	    	   
	    	e.preventDefault();
	  }
	});
	
	
	
	$('#signupForm').on('keyup', function(e) {
	    var code = e.keyCode || e.which;
	    
	    if (code == 13 ) {
	    	
	    	e.preventDefault();
	    	
	    	
	  }
	});
	
	
/****************************************Connect to email - NEED TO SEND AN ACESS TO THE API****/
	//this is temp
	$('#connectEmail').click(function () {
		Discover();	
	});
	//this is temp
	$('#AfterSocialconnectEmail').click(function () {
		Discover();	
	});
	

});

})(window.jQuery);
 
    
 

    
    
    
    
    
    
    
    
    
    


/****Final Validation before submitting****/

function finalvalidation(){
	
	    var noerror= true;
	     
         //First name 
		 if (!ValidateName($("#fname").val()) )
		 {
			 $("#fname").attr('title', "Please make sure that your name doesn't contain numbers & more than 2 charachters").tooltip('fixTitle').tooltip('show');
			 if($("#fname").hasClass("its-success"))  $("#fname").removeClass("its-success"); 
			 if(!$("#fname").hasClass("its-error"))  $("#fname").addClass("its-error"); 
			 noerror= false;
		 } 
		 else{
		
			 if($("#fname").hasClass("its-error"))  $("#fname").removeClass("its-error"); 
			 if(!$("#fname").hasClass("its-success"))  $("#fname").addClass("its-success");  
			 $("#fname").tooltip('hide');
	     }
		 
		 
         //last name 
		 if (!ValidateName($("#lname").val()) )
		 {
			 $("#lname").attr('title', "Please make sure that your name doesn't contain numbers & more than 2 charachters").tooltip('fixTitle').tooltip('show');
			 if($("#lname").hasClass("its-success"))  $("#lname").removeClass("its-success"); 
			 if(!$("#lname").hasClass("its-error"))  $("#lname").addClass("its-error");
			 noerror= false;
		 } 
		 else{
		
			 if($("#lname").hasClass("its-error"))  $("#lname").removeClass("its-error"); 
			 if(!$("#lname").hasClass("its-success"))  $("#lname").addClass("its-success");  
			 $("#lname").tooltip('hide');
	     }
		 
		 
		
		//Email
		 if (!ValidateEmail($("#email").val())){
			 $("#email").attr('title', "Make sure your email is correct").tooltip('fixTitle').tooltip('show');
			 if($("#email").hasClass("its-success"))  $("#email").removeClass("its-success"); 
			 if(!$("#email").hasClass("its-error"))  $("#email").addClass("its-error");  
			 noerror= false;
			 
		 }
		 else{	
			 if($("#email").hasClass("its-error"))  $("#email").removeClass("its-error"); 
			 if(!$("#email").hasClass("its-success"))  $("#email").addClass("its-success"); 
			 $("#email").tooltip('hide');
	     }
	 
	
		//Email Confirmation
		 if (!ValidateEmailconf($("#email").val(),$("#emailConfirm").val())){
			 $("#emailConfirm").attr('title', "Make sure both email mathc").tooltip('fixTitle').tooltip('show');
			 if($("#emailConfirm").hasClass("its-success"))  $("#emailConfirm").removeClass("its-success"); 
			 if(!$("#emailConfirm").hasClass("its-error"))  $("#emailConfirm").addClass("its-error"); 
			 noerror= false;
		 }
		 else{
				
			 if($("#emailConfirm").hasClass("its-error"))  $("#emailConfirm").removeClass("its-error"); 
			 if(!$("#emailConfirm").hasClass("its-success"))  $("#emailConfirm").addClass("its-success"); 
			 $("#emailConfirm").tooltip('hide');
			 
	     }
		 
		 
		 //Password
		 if(!ValidatePass($("#password").val()) ){
			 $("#password").attr('title', "Please make sure your password is at least 8 charachters and contains one number").tooltip('fixTitle').tooltip('show');
			 if($("#password").hasClass("its-success"))  $("#password").removeClass("its-success"); 
			 if(!$("#password").hasClass("its-error"))  $("#password").addClass("its-error"); 
			 noerror= false;
		 }
		 else {	
			 if($("#password").hasClass("its-error"))  $("#password").removeClass("its-error"); 
			 if(!$("#password").hasClass("its-success"))  $("#password").addClass("its-success"); 
			 $("#password").tooltip('hide');
			
	     }
		 
    
	 
		//Password Confirm
		 if( !ValidatePassconf($("#password").val(), $("#passwordConfirm").val()) ){
			 $("#passwordConfirm").attr('title', "Please make sure it matches your password").tooltip('fixTitle').tooltip('show');
			 if($("#passwordConfirm").hasClass("its-success"))  $("#passwordConfirm").removeClass("its-success"); 
			 if(!$("#passwordConfirm").hasClass("its-error"))  $("#passwordConfirm").addClass("its-error");
			 noerror= false;
		 }
		 else {	
			 if($("#passwordConfirm").hasClass("its-error"))  $("#passwordConfirm").removeClass("its-error"); 
			 if(!$("#passwordConfirm").hasClass("its-success"))  $("#passwordConfirm").addClass("its-success"); 
			 $("#passwordConfirm").tooltip('hide');
	     }
		 
    
	 
	 
		 //Phone 
		 if(!$("#phone").val()=="")
		 {	
			 if( ! ValidatePhone()){
				 $("#phone").attr('title', "Make sure your phone is correct").tooltip('fixTitle').tooltip('show');
				 if($("#phone").hasClass("its-success"))  $("#phone").removeClass("its-success"); 
				 if(!$("#phone").hasClass("its-error"))  $("#phone").addClass("its-error");  
				 noerror= false;
			 }
			 else {	
				 if($("#phone").hasClass("its-error"))  $("#phone").removeClass("its-error"); 
				 if(!$("#phone").hasClass("its-success"))  $("#phone").addClass("its-success"); 
				 $("#phone").tooltip('hide');
		     }
		 }
		 
		//Gender
		 if ( ! $("#male").is(':checked') && ! $("#female").is(':checked') ){	
			 
			 $("#b-and-g").tooltip('show');
			 
			 noerror= false;
	     }
		 else {	
			 $("#b-and-g").tooltip('hide');
		 }
		 
		//birthday
		 if($(".birthDay").val() == "") {
			 $("#b-and-g").tooltip('show');
			
			 noerror= false;
		 }
		 else {	
			 $("#b-and-g").tooltip('hide');
		 }
	 
	
	if(!noerror) return false;
	else {
		     
		   //submit();
		     emailRedirect();
	        return true;	
	 }
}




/*************** MAIN VALIDATION  ***************/
//EMAIL
function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}
//EMAIL CONFIRMATION
function ValidateEmailconf(email, emailconfirm) {
    
    if( email.toLowerCase() != emailconfirm.toLowerCase() || emailconfirm=="")
    {
    	return false;
    }
    else {
    	return true;
    	}
}
// NAME 
function ValidateName(name) {
    var expr = /^[a-zA-Z\sàáâäãåèéêëìíîïòóôöõøùúûüÿýñçčšžÀÁÂÄÃÅÈÉÊËÌÍÎÏÒÓÔÖÕØÙÚÛÜŸÝÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    if( !expr.test(name) || name.length<2 || name.length>15 ){
    	return false;
    }
    else {return true;}
}

// PASSWORD
function ValidatePass(password) {
	var matches = password.match(/\d+/g);
    if( matches == null || password.length<8){
    	return false;
    }
    else {return true;}
}
//PASSWORD CONFIRM
function ValidatePassconf(password, passwordconfirm) {
    
    if( password != passwordconfirm || passwordconfirm=="")
    {
    	return false;
    }
    else {
    	return true;
    	}
}
//Phone
function ValidatePhone() {
	
	var telInput = $("#phone");
	
	if ($.trim(telInput.val())) 
	{
	    if (telInput.intlTelInput("isValidNumber")) 
	    {
	      return true;
	    } else 
	    {
	    	return false;
	    }
	}
}

function textonly(e){
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	var character = String.fromCharCode(code);
	//alert('Character was ' + character);
	    //alert(code);
	    //if (code == 8) return true;
	    var AllowRegex  = /^[\ba-zA-Z\s-]$/;
	    if (AllowRegex.test(character)) return true;     
	    return false; 
	}



/***************SUBMIT FORM***************/
function submit(){
	var user = {}
	user["name"] = $("#fname").val();
	user["surname"] = $("#lname").val();
	user["email"] = $("#email").val();
	
	if ($('#male').is(":checked"))
	{
		user["gender"] = "MALE";
		
	}else if ($('#female').is(":checked")){
		
		user["gender"] = "FEMALE";
	}
	
	user["password"] = $("#password").val();
	user["birthdate"] = $("#birth-date").val();
	user["phone"] = $("#phone").val();

	
	$.ajax({
        url: $("#signupForm").attr( "action"),
        type: 'post',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
		data : JSON.stringify(user),
		dataType : 'text',
        success: function(data) {
//                  alert(data);
        			success = true;
                 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(jqXHR);
            success = false;
        }
    });
}

/***************ACTION AFTER SUBMIT***************/

function emailRedirect(){
		var email = $("#email").val();
		if(email.toLowerCase().indexOf("@google") >= 0 || email.toLowerCase().indexOf("@gmail") >= 0 || email.toLowerCase().indexOf("@hotmail") >= 0 || email.toLowerCase().indexOf("@outlook") >= 0 ) {
			$("#tabForm").removeClass("active");
			
			$("#formInbox").show();

			$("#tabThankyou").addClass("active");
			$('.page-content-wrapper ').addClass("newsletter");
			
		}
		else{
			
			$("#tabForm").removeClass("active");
			

			$("#tabNobrands").addClass("active");	
			$('.page-content-wrapper ').addClass("nobrands");
		}
	}

/***************SUBMIT FORM***************/
function Discover(){
 if($("#tabThankyou").hasClass("active")){
			 $("#tabThankyou").removeClass("active");
			
			 $("#tabDiscover").addClass("active");
			
			 $("#tabDiscover").addClass('sliding');

		       
		        
		        
			 $('.page-content-wrapper ').removeClass("newsletter");
			 $('.page-content-wrapper ').addClass("discover");
	
		} 
		else if($("#tabNobrands").hasClass("active"))
		{
			  
				$("#tabNobrands").removeClass("active");

			
				$("#tabDiscover").addClass("active");
				$('.page-content-wrapper ').removeClass("nobrands");
				$('.page-content-wrapper ').addClass("discover");
		} 
		
		
}




/*********************************************************************************************** SocialMedia ******************/

function socialMediaSuccess(){
	
	if(
		$("#tabForm").hasClass("active")){
		$("#tabForm").removeClass("active");

		$("#socialMediaInbox").show();

		$("#tabThankyou").addClass("active");
		$('.page-content-wrapper ').addClass("newsletter");

	} else if ($("#tabNobrands").hasClass("active")){
		
		$("#tabNobrands").removeClass("active");
		

		$("#tabDiscover").addClass("active");
		$('.page-content-wrapper').removeClass("nobrands");
		$('.page-content-wrapper').addClass("discover");
	}	
}



/*************** Facebook ***************/
	
	//This is called with the results from from FB.getLoginStatus().
	function statusChangeCallback(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	  if (response.status === 'connected') {
	    // Logged into your services and Facebook.
		  if(FacebookClicked==true){
             //already logged in
			  $("#error-message").text("Opsy! It seems you already signed up with this account please try with another or press login to go to your wall");
			  $("#modalSlideUp1").modal("show");
			  
		  }
		  
		  
	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your services.

		  if(allowFacebookPopUp){
			  FB.login(function(response) {
				  console.log(response);
				  if (response.status === 'connected') {
			      testAPI(response);
				  }
				 }, {scope: 'public_profile,email,user_likes'});  
		  }

	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this services or not.

		 
		  if(allowFacebookPopUp){
			  FB.login(function(response) {
				  console.log(response);
				  if (response.status === 'connected') {
					  testAPI(response);
				  }
				 }, {scope: 'public_profile,email,user_likes'});  
		  }
	  }
	}

	function checkLoginState() {
	  FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	  });
	}

	window.fbAsyncInit = function() {
	FB.init({
	  appId      : '1692583477684792',
	  cookie     : false,  // enable cookies to allow the server to access 
	                      // the session
	  xfbml      : true,  // parse social plugins on this page
	  version    : 'v2.2' // use version 2.2
	});

	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});

	};

	// Load the SDK asynchronously
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	function testAPI(authObj) {
	  console.log('Welcome!  Fetching your information.... ');
	  FB.api('/me', function(response) {
	    console.log('Successful login for: ' + response.name);
	    
	    
	    saveUsersData(authObj,response.name);
//	    document.getElementById('status').innerHTML =
//	      'Thanks for logging in, ' + response.name + '!';
	  });
	}

	function saveUsersData(response,name){
		
		var earlySignUp = {}
		earlySignUp["userID"] = response.authResponse.userID;
		earlySignUp["accessToken"] = response.authResponse.accessToken;
		earlySignUp["exiresIn"] = response.authResponse.expiresIn;
		earlySignUp["name"] = name;
		
		$.ajax({
	        url: $("#facebookForm").attr( "action"),
	        type: 'post',
			contentType : "application/json",
			data : JSON.stringify(earlySignUp),
			dataType : 'text', 
	        success: function(data) {
	        	
	        	if ( data == "OK"){
	        		
	        		socialMediaSuccess()
	        	    //SUCCESSFUL CONNECTION	
	        	}
	        	else if ( data == "KO"){
	        		
	        		//Already Exist CONNECTION
	        		// The below is temporary
	        		socialMediaSuccess()
	        		
	         	}        
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	        	console.log('error');
	            console.log(errorThrown);
	            console.log(jqXHR);
	        }
	    });
		
	}
	
