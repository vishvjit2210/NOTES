const profileImage = document.getElementById('profileImage');
const userImage = localStorage.getItem('userImage');
const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

if (userImage) {
    profileImage.src = userImage;
} else {
    profileImage.src = defaultImage;
}

// function logOut() {
//     window.location.href = 'index.html';
//     localStorage.removeItem('userImage');
//     previewImage.src = defaultImage;
// }


function preventBack() {
    window.history.forward();

}
setTimeout("preventBack()", 0);
window.onunload = function () { null };