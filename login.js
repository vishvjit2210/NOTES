document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitButton');
    
    submitButton.addEventListener('click', () => {
        // Disable the button and form elements
        const disableFormElements = () => {
            $('#username, #password, #imageUpload, #removeBtn').attr('disabled', true);
            submitButton.disabled = true;
            submitButton.style.opacity = '0.4';
            submitButton.innerHTML = 'Loading...';
        };

        // Enable the button and form elements
        const enableFormElements = () => {
            $('#username, #password, #imageUpload, #removeBtn').prop('disabled', false);
            submitButton.disabled = false;
            submitButton.style.opacity = '';
            submitButton.innerHTML = 'Login';
        };

        disableFormElements();

        setTimeout(() => {
            enableFormElements();
            login();
        }, 1500);
    });
});


// Function to get users from local storage or initialize an empty array
function getUsers() {
  let users = JSON.parse(localStorage.getItem('users'));
  return users ? users : [];
}

// Function to check if a username exists in the array of users
function usernameExists(username) {
  let users = getUsers();
  return users.some(user => user.username === username);
}

// Function to authenticate a user
function authenticate(username, password) {
  let users = getUsers();
  let user = users.find(user => user.username === username);
  return user && user.password === password;
}

function login() {
  let username = $("#username").val();
  let password = $("#password").val();
  $("#usernameMsg").hide();
  $("#password-message").hide(); 
  
    if (!username && !password) {
        $("#usernameMsg").text("Please enter username").show();
        $("#password-message").text("Please enter password").show();
        return;
    } else if(!username){
        $("#usernameMsg").text("Please enter username").show();
        return;
    } else if(!password){
        $("#password-message").text("Please enter password").show();
        return;
    }

  if (!usernameExists(username)) {
    let users = getUsers();
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    $("#usernameMsg").text("");
        successLoggedInMsg();
        $("#username, #password").val('');
        setTimeout(() => {
            window.location.href = 'magicNote.html';
        }, 1000);
    return;
  }

  if (!authenticate(username, password)) {
    $("#password-message").text("Password is incorrect").show();
    return;
  }

        $("#password-message").text("");
        successLoggedInMsg();
        $("#username, #password").val('');
        setTimeout(() => {
            window.location.href = 'magicNote.html';
        }, 1000);
}

// Function to display a success message after logging in
function successLoggedInMsg() {
    const successDltMsg = $('#success');

    successDltMsg.addClass('success scrollTopToDown show').show();
    setTimeout(() => {
        successDltMsg.removeClass('scrollTopToDown').hide();
    }, 2000);
}

// Function to prevent the user from navigating back to the previous page
function preventBack() {
    window.history.forward();
}

// Set up the preventBack function to run on page load
setTimeout(preventBack, 0);

// Prevent the back button from working when the user unloads the page
window.onunload = function() { null };
