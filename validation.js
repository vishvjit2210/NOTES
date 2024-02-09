// to show error validation on input field
function addBtnValidation() {
    let errorMessage = $('#errorMessage');
    let errorMsg = $('#errorMsg');
    let addTitle = $('#addTitle');
    let addTxt = $('#addTxt');
    errorMessage.hide();
    errorMsg.hide();
    addTitle.css('border','3px solid black');
    addTxt.css('border','3px solid black');

    if (addTitleElm.value == "" && addTxtElm.value == "") {
        errorMessage.text('Please enter a Title.');
        errorMsg.text('Please enter a Description.');
        addTitle.css('border','3px solid #ff0000');
        addTxt.css('border','3px solid #ff0000');
        errorMessage.show();
        errorMsg.show();
        event.preventDefault();    
    } else if (addTitleElm.value == "") {
        errorMessage.text('Please enter a Title.');
        errorMessage.show();
        addTitle.css('border','3px solid #ff0000');
        event.preventDefault();
    } else if (addTxtElm.value == "") {
        errorMsg.text('Please enter a Description.');
        errorMsg.show()
        addTxt.css('border','3px solid #ff0000');
        event.preventDefault();
    } else {
        event.preventDefault();
    }
}
