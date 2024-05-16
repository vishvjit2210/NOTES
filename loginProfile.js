// profile picture function
const imageUpload = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

const savedImage = localStorage.getItem('userImage');
if (savedImage) {
    previewImage.src = savedImage;
    $('#removeBtn').show();
    $('#selectPicture').hide();
    
} else {
    $('#selectPicture').show();
    $('#removeBtn').hide();
    previewImage.src = defaultImage;
}

imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        $('#removeBtn').show();
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            localStorage.setItem('userImage', e.target.result);
            localStorage.setItem('userImg', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function handleLogin() {
    return true;
}

function removePicture() {
    $('#removeBtn').hide();
    $('#selectPicture').show();
    localStorage.removeItem('userImage');
    localStorage.removeItem('userImg');
    previewImage.src = defaultImage;
}