// to show error validation on input field
function addBtnValidation() {
    let addTitleElm = $('#addTitle').val();
    let addTxtElm = $('#addTxt').val();
    let errorMessage = $('#errorMessage').hide();
    let errorMsg = $('#errorMsg').hide();
    let addTitle = $('#addTitle').css('border-bottom','3px solid #000000');
    let addTxt = $('#addTxt').css('border-bottom','3px solid #000000');

    if (!addTitleElm || !addTxtElm) {
        if (!addTitleElm) {
            errorMessage.text('Please enter a Title.').css('color','#e60000').show();
            addTitle.css('border-bottom', '3px solid #ff0000');
        }
        if (!addTxtElm) {
            errorMsg.text('Please enter a Description.').css('color','#e60000').show();
            addTxt.css('border-bottom', '3px solid #ff0000');
        }
    }
}