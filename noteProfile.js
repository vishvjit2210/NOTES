const profileImage = document.getElementById('profileImage');
const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

// Load saved image or set default image
const userImage = localStorage.getItem('userImage');
profileImage.src = userImage || defaultImage;

// Prevent back navigation
function preventBack() {
    window.history.forward();
}
setTimeout(preventBack, 0);
window.onunload = function () { return null; };
