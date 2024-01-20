function addBtnValidation() {
    errorMessage.style.display = 'none';
    errorMsg.style.display = 'none';
    addTitleElm.style.border = '2px solid black';
    addTxtElm.style.border = '2px solid black';

    if (addTitleElm.value == "" && addTxtElm.value == "") {
        errorMessage.innerText = 'Please enter a Title.';
        errorMsg.innerText = 'Please enter a Description.';
        addTitleElm.style.border = '2px solid #ff0000';
        addTxtElm.style.border = '2px solid #ff0000';
        errorMessage.style.display = 'block';
        errorMsg.style.display = 'block';
        event.preventDefault();    
    } else if (addTitleElm.value == "") {
        errorMessage.innerText = 'Please enter a Title.';
        errorMessage.style.display = 'block';
        addTitleElm.style.border = '2px solid #ff0000';
        event.preventDefault();
    } else if (addTxtElm.value == "") {
        errorMsg.innerText = 'Please enter a Description.';
        errorMsg.style.display = 'block';
        addTxtElm.style.border = '2px solid #ff0000';
        event.preventDefault();
    } else {
        event.preventDefault();
    }
}