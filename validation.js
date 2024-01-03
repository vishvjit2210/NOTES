function addBtnValidation() {
    errorMessage.style.display = 'none';
    errorMsg.style.display = 'none';

    if (addTitleElm.value == "" && addTxtElm.value == "") {
        errorMessage.innerText = 'Please enter a Title.';
        errorMsg.innerText = 'Please enter a Description.';
        errorMessage.style.display = 'block';
        errorMsg.style.display = 'block';
        event.preventDefault();
    } else if (addTitleElm.value == "") {
        errorMessage.innerText = 'Please enter a Title.';
        errorMessage.style.display = 'block';
        event.preventDefault();
    } else if (addTxtElm.value == "") {
        errorMsg.innerText = 'Please enter a Description.';
        errorMsg.style.display = 'block';
        event.preventDefault();
    } else {
        event.preventDefault();
    }
}