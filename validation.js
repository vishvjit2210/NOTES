// to show error validation on input field
function addBtnValidation() {
    let addTitleElm = $('#addTitle').val();
    let addTxtElm = $('#addTxt').val();
    let errorMessage = $('#errorMessage').hide();
    let errorMsg = $('#errorMsg').hide();
    let addTitle = $('#addTitle').css('border','3px solid black');
    let addTxt = $('#addTxt').css('border','3px solid black');

    if (!addTitleElm || !addTxtElm) {
        if (!addTitleElm) {
            errorMessage.text('Please enter a Title.').show();
            addTitle.css('border', '3px solid #ff0000');
        }
        if (!addTxtElm) {
            errorMsg.text('Please enter a Description.').show();
            addTxt.css('border', '3px solid #ff0000');
        }
    }
}