document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        // Disable the button and prevent further clicks
        $('#username').attr('disabled', 'true');
        $('#password').attr('disabled', 'true');
        $('#imageUpload').attr('disabled', 'true');
        $('#removeBtn').attr('disabled', 'true');
        submitButton.disabled = true;
        submitButton.style = 'opacity: 0.4;'
        submitButton.innerHTML = 'Loading...';
        setTimeout(() => {
            // Restore the button state after operation is done
            $('#username').prop('disabled', false);
            $('#password').prop('disabled', false);
            $('#imageUpload').prop('disabled', false);
            $('#removeBtn').prop('disabled', false);
            submitButton.disabled = false;
            submitButton.style = 'background-color: #9999ff;'
            submitButton.innerHTML = 'Login';
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
        $("#usernameMsg").text("Please enter username").css('color', '#ff1a1a').show();
        $("#password-message").text("Please enter password").css('color', '#ff1a1a').show();
        return;
    } else if(!username){
        $("#usernameMsg").text("Please enter username").css('color', '#ff1a1a').show();
        return;
    } else if(!password){
        $("#password-message").text("Please enter password").css('color', '#ff1a1a').show();
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
    $("#password-message").text("Password is incorrect").css('color', '#ff1a1a').show();
    return;
  }

        $("#password-message").text("");
        successLoggedInMsg();
        $("#username, #password").val('');
        setTimeout(() => {
            window.location.href = 'magicNote.html';
        }, 1000);
}



// Use the stored password as needed

// togglePassword
function togglePassword() {
    const password = document.getElementById('password');
    const showPasswordIcon = document.getElementById('showPasswordIcon');

    password.type = password.type === 'password' ? 'text' : 'password';

    const passwordShow = `<svg id="showPasswordIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`;

    const passwordHide = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>`;

    showPasswordIcon.innerHTML = password.type === 'password' ? passwordShow : passwordHide;
}

// toggle success message
function successLoggedInMsg() {
    let successDltMsg = $('#success');

    successDltMsg.addClass('success scrollTopToDown show').show();
    setTimeout(function () {
        successDltMsg.removeClass('scrollTopToDown').hide();
    }, 2000);
}

function preventBack() {
    window.history.forward();

}
setTimeout("preventBack()", 0);
window.onunload = function () { null };