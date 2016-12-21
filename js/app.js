//Problem: Hints (speech bubbles) are shown even when form is valid действительна
//Solution: Hide and show them at appropriate times
var $password = $("#password");
var $confirmPassword = $("#confirm_password");
var $username = $("#username");
//Hide hints
$("form span").hide();

function isUsernamePresent() {
  return $username.val().length > 0;   /*here we check if user put his name*/ 
}
function isPasswordValid() {
  return $password.val().length > 8;  /*it returns true or false*/  
}
function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}
function canSubmit() {
  return isPasswordValid() && arePasswordsMatching() && isUsernamePresent();   /*if all these conditions are true, the form can be submitted */
}
function passwordEvent(){   /* to keep DRY, we created a function and named it passwordEvent */
  //Find out if the password is valid
  if(isPasswordValid()) {    /* so if it's true */
    $password.next().hide(); /* Hide hint if valid. We use traversing method next, because our span goes next after input with id="password". The next method, or any of the traversal methods, return the objects. val - is values of input, and it returns a string.*/
  } else {
    $password.next().show(); /* Else - show the hint */
  }
}
function confirmPasswordEvent() {
  //Find out if password and confirmation match
  if(arePasswordsMatching()) {
    //Hide hint if match    
    $confirmPassword.next().hide();
  } else {
    //Else - show hint
    $confirmPassword.next().show();
  }    
}
function enableSubmitEvent() {
  $("#submit").prop("disabled", !canSubmit()); /* ! means "not". So when we get a bolean value, this function will flip that value to an opposite value */
  /* this code doesn't allow form submission if user typed less characters than we ask. so the form will stay on the current page and will not send any data to server until user will not put rigth password length and mathing password */
}
//When event happens on password input
/* keyup binds to the key press trigger and key up. It means that you've actually finished pressing down on the keyboard so now the key is up*/
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent); 

//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();

/*The focus event is only triggered when an element gains focus. This means that if you removed the keyup bit, your confirmPasswordEvent function would only be called when you clicked on the password field. Adding the keyup event means that the confirmPasswordEvent function is called every time you release a key. This means that it gets called after each character you type, updating the user on whether or not they have met the requirements yet.*/

  