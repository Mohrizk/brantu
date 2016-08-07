/**********RESULT TAB FUNCTIONS***************************************/

$(document).ready(function() {
    var changeNameInputSelector = $('#changeName');
    var changeNameSubmitButton = $('#changeNameSubmitButton');
    var userName = changeNameInputSelector.val();
    console.log('is it here')
    changeNameInputSelector.on('change', function(){
      if(changeNameInputSelector.val()== userName)  changeNameSubmitButton.hide();
      else changeNameSubmitButton.show();
    })
    changeNameInputSelector.on('submit', function(){
        e.preventDefault();
        if(changeNameInputSelector.val() !== userName)  changeNameInputSelector.submit();
    })

    var changePassForm = $('#changePasswordSettingsForm')
    var oldPassSelector = $('#oldPassword');
    var newPassSelector = $('#newPassword');
    var confNewPassSelector = $('#newPasswordConfirm');

    var changePassButton = $('#changePassSubmitButton');
    $('#oldPassword, #newPassword,#newPasswordConfirm').on('change', function(){
        if(oldPassSelector.val() !== '' && newPassSelector.val() !== '' && confNewPassSelector.val() !== ''){
            changePassButton.show();
        }
        else {changePassButton.hide();}
    })

    changePassForm.on('submit',function(e){
        e.preventDefault();
        if(oldPassSelector.val() !== '' && newPassSelector.val() !== '' && confNewPassSelector.val() !== ''){
            if(newPassSelector.val() === confNewPassSelector.val())
                changePassForm[0].submit();
            else $('#warningConfirmPass').show();
        }
    })
})

 
/**********CREATE*****************************************************************************/    
 /**********CREATE CAROUSELS*******************************/



    
    
    
    
    
    
    
    
    

