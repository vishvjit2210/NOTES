document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        // Disable the button and prevent further clicks
        $('#username').attr('disabled', 'true');
        $('#password').attr('disabled', 'true');
        $('#confirm-password').attr('disabled', 'true');
        submitButton.disabled = true;
        submitButton.style = 'background-color: #8c8c8c;'
        submitButton.innerHTML = 'Loading...';
        setTimeout(() => {
            // Restore the button state after operation is done
            $('#username').prop('disabled', false);
            $('#password').prop('disabled', false);
            $('#confirm-password').prop('disabled', false);
            submitButton.disabled = false;
            submitButton.style = 'background-color: black;'
            submitButton.innerHTML = 'Login';
            checkInputField();
        }, 2000);
    });
});

function checkInputField() {
    let username = $("#username").val();
    let password = $("#password").val();
    let confirm_password = $("#confirm-password").val();
    let usernameMsg = $("#usernameMsg").css('color', '#ff1a1a').hide();
    let passwordMessage = $("#password-message").css('color', '#ff1a1a').hide();
    let confirmPassword = $("#confirm-message").css('color', '#ff1a1a').hide();

    if (!username || !password || !confirm_password) {
        if (!username) {
            usernameMsg.text("Username must be required!").show();
            if (password != confirm_password) {
                confirmPassword.text("Both password does't match").show();
            }
        }
        if (!password) {
            passwordMessage.text("Password must be required!").show();
        }
        if (!confirm_password) {
            confirmPassword.text("Confirm password must be required!").show();
        }
    } else if (password !== confirm_password) {
        confirmPassword.text("Both passwords don't match").show();
    } else {
        removePicture();
        successLoggedInMsg();
        $("#username, #password, #confirm-password").val('');
        setTimeout(() => {
            window.location.href = 'magicNote.html';
        }, 1500);
    }
}

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

// toggle confirm Password
function toggleconfirmPassword() {
    const confirmPassword = document.getElementById('confirm-password');
    const showconfirmPassowrd = document.getElementById('showconfirmPasswordIcon');

    confirmPassword.type = confirmPassword.type === 'password' ? 'text' : 'password';

    const confirmPasswordShow = `<svg id="showPasswordIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`;

    const confirmPasswordHide = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>`;

    showconfirmPassowrd.innerHTML = confirmPassword.type === 'password' ? confirmPasswordShow : confirmPasswordHide;
}

// toggle success message
function successLoggedInMsg() {
    let successDltMsg = $('#success');

    successDltMsg.addClass('success scrollTopToDown show').show();
    setTimeout(function () {
        successDltMsg.removeClass('scrollTopToDown').hide();
    }, 2000);
}

const imageUpload = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

const savedImage = localStorage.getItem('userImage');
if (savedImage) {
    previewImage.src = savedImage;
} else {
    previewImage.src = defaultImage;
}

imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            localStorage.setItem('userImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function handleLogin() {
    return true;
}

function removePicture() {
    localStorage.removeItem('userImage');
    previewImage.src = defaultImage;
}