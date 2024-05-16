// Profile picture function
const imageUpload = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const selectPicture = document.getElementById('selectPicture');
const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

// Load saved image or set default image
const savedImage = localStorage.getItem('userImage');
if (savedImage) {
    previewImage.src = savedImage;
    removeBtn.style.display = 'block';
    selectPicture.style.display = 'none';
} else {
    previewImage.src = defaultImage;
    removeBtn.style.display = 'none';
    selectPicture.style.display = 'block';
}

// Image upload event
imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            localStorage.setItem('userImage', e.target.result);
            localStorage.setItem('userImg', e.target.result);
        };
        reader.readAsDataURL(file);
        removeBtn.style.display = 'block';
        selectPicture.style.display = 'none';
    }
});

// Handle login
function handleLogin() {
    return true;
}

// Remove picture
function removePicture() {
    previewImage.src = defaultImage;
    localStorage.removeItem('userImage');
    localStorage.removeItem('userImg');
    removeBtn.style.display = 'none';
    selectPicture.style.display = 'block';
}
