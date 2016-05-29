(function($) {

    'use strict';

    $(window).on('load', function() {
    	/*var myInput = document.getElementById('passwordConfirm');
   	 myInput.onpaste = function(e) {
   	   e.preventDefault();
   	 }*/

   })


$(document).ready(function() {

	$('#AuthenticationPopUp').on('click','.toggle', function() {
		$('.registerContainer').stop().addClass('active');
	});

	$('#AuthenticationPopUp').on('click', '.close', function() {
		$('.registerContainer').stop().removeClass('active');
	});

	$(document).on('click', '#login, #signup', function (event) {
		var x = $(this)
		if(x.attr('id')==='login'){
			console.log(x.attr('id'));
			$('.registerContainer').stop().removeClass('active');

		}
		else if(x.attr('id')==='signup'){
			console.log(x.attr('id'));
			$('.registerContainer').stop().addClass('active');
		}
		$('#AuthenticationPopUp').removeClass('hidden');

	});

	$(document).on('click','#close-AuthenticationPopUp', function(e){
		$('#AuthenticationPopUp').addClass('hidden');
	})



	/*$(document).on('click','#submitRegistration',function () {

		submitRegistration();

	});

	$(document).on('click','#submitLogin',function () {
		console.log('xxx');
		finalloginvalidation();
	});*/

	$('#signupForm').on('keypress', function(e) {
	    var code = e.keyCode || e.which;

	    if (code == 13 ) {

	    	e.preventDefault();
	  }
	});



	$(document).on('keyup', '#signupForm', function(e) {
	    var code = e.keyCode || e.which;
	    if (code == 13 ) {
	    	e.preventDefault();
	  }
	});




});

})(window.jQuery);


/***************SUBMIT FORM***************/
function submitRegistration(){
	var user = {}
	user["email"] = $("#email").val();
	if ($('#male').is(":checked"))
	{
		user["gender"] = "MALE";

	}else if ($('#female').is(":checked")){

		user["gender"] = "FEMALE";
	}
	user["password"] = $("#password").val();
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
               console.log(data);
              if( data  === 'interrupted'){
                $("#registerError ").show();
                console.log('the account exist')
							}
	        		else{
								success = true;
	        			$("#signupContainer").fadeOut('fast');
	        			$("#successSignup").fadeIn('fast');
	        			$(".authenticationPopUp").delay(1000).fadeOut(500);
								window.location.reload();
						}

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(jqXHR);
            success = false;
            console.log('Submition failed')
        }
    });
}


/*******submit login*****/
function submitLogin(){
	var user = {}

	user["email"] = $("#loginEmail").val();
	user["password"] = $("#loginPassword").val();



	$.ajax({
        url: $("#loginForm").attr( "action"),
        type: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
		data : JSON.stringify(user),
		dataType : 'text',
        success: function(data) {
        			success = true;
              if(data == "Missing credentials"){
                 $("#loginError ").text('There is a missing credential').show();
              }
              else if(data == "nouser"){
                 $("#loginError ").text('This email does not exist').show();
              }
              else if(data == "nopass"){
                $("#loginError ").text('Your password is wrong').show();
              }
              else{
							        window.location.reload();
              }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(jqXHR);
						$("#loginError ").show();

        }
    });
}
