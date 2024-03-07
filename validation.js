// to show error validation on input field
function addBtnValidation() {
    let errorMessage = $('#errorMessage').hide();
    let errorMsg = $('#errorMsg').hide();
    let addTitle = $('#addTitle').css('border','3px solid black');
    let addTxt = $('#addTxt').css('border','3px solid black');

    if (addTitleElm.value == "" && addTxtElm.value == "") {
        errorMessage.text('Please enter a Title.').show();
        errorMsg.text('Please enter a Description.').show();
        addTitle.css('border','3px solid #ff0000');
        addTxt.css('border','3px solid #ff0000');
        event.preventDefault();    
    } else if (addTitleElm.value == "") {
        errorMessage.text('Please enter a Title.').show();
        addTitle.css('border','3px solid #ff0000');
        event.preventDefault();
    } else if (addTxtElm.value == "") {
        errorMsg.text('Please enter a Description.').show();
        addTxt.css('border','3px solid #ff0000');
        event.preventDefault();
    } else {
        event.preventDefault();
    }
}
