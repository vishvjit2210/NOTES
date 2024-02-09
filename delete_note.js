function deleteNote(index) {
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    let favObj = JSON.parse(localStorage.getItem("favItem")) || [];

    notesObj.reverse();

    let deletedNote = notesObj[index];

    notesObj.splice(index, 1);
    
    let originalIndex = notesObj.length - index - 1;

    let favIndex = favObj.findIndex(favNote => favNote.title === deletedNote.title && favNote.text === deletedNote.text);
    if (favIndex !== -1) {
        favObj.splice(favIndex, 1);
    }

    localStorage.removeItem(`userRating_${originalIndex}`);

    localStorage.setItem("notes", JSON.stringify(notesObj.reverse()));
    localStorage.setItem("favItem", JSON.stringify(favObj));

    // Update the UI
    showNotes();
    showFavNotes();
}


// showing delete popup
let currentDeleteIndex;
let currentFavBtnIndex;
    function showDeletePopUp(index) {
        currentDeleteIndex = index;
        currentFavBtnIndex = index;
        $('#deletePopUp').show();

        $('#addTitle').prop('disabled', true);
        $('#addTxt').prop('disabled', true);
        $('#addBtn').prop('disabled', true);
        $('#searchTxt').attr('disabled',true);
        $('#home').prop('disabled', true);
        $('#favButton').prop('disabled', true);
        $('#menuBtn').prop('disabled', true);
        $('#addBtn').removeClass('addButton');
        $('#home').removeClass('home');
        $('#favButton').removeClass('home');
        
        let backgroundFields = document.getElementsByClassName('background-field');
    
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = true;
            $('.background-field').removeClass('addButton');
        }

        $('body').css('overflowY','hidden');
        PingAnimationForOpenDeletePopUp();
        $('#main').fadeTo(800,0.6);
    }

    // close delete popup
    function closeDeletePopUp() {
        let closeDeletePopUp = $('#deletePopUp');
      
        closeDeletePopUp.addClass('ping-out');
      
        closeDeletePopUp.on('animationend', function animationEndHandler() {
            closeDeletePopUp.removeClass('ping-out ping-in');
            closeDeletePopUp.hide();
            closeDeletePopUp.off('animationend', animationEndHandler);
        });
      
        // Reference of text input and textarea
        $('#addTitle').prop('disabled', false);
        $('#addTxt').prop('disabled', false);
        $('#addBtn').prop('disabled', false);
        $('#searchTxt').attr('disabled',false);
        $('#home').prop('disabled', false);
        $('#favButton').prop('disabled', false);
        $('#menuBtn').prop('disabled', false);
        $('#addBtn').addClass('addButton');
        $('#searchTxt').addClass('search');
        $('#home').addClass('home');
        $('#favButton').addClass('home');
        console.log(searchTxt);
      
        // Enable all background fields
        let backgroundFields = document.getElementsByClassName('background-field');
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = false;
            $('.background-field').addClass('addButton');
        }
      
        document.body.style.overflowY = 'visible';
        $('#main').fadeTo(800,1);
      }
      

    function deleteItem() {
        // delete note based on the currentDeleteIndex
        deleteNote(currentDeleteIndex);
        
        closeDeletePopUp();
        successDltMsg();
    }

    // ping animation for open delete popup
    function PingAnimationForOpenDeletePopUp() {
        // Add a class to apply the ping animation
        $('#deletePopUp').addClass('ping-animation-open');
    }
    
function successDltMsg() {
    let successDltMsg = $('#success');

        successDltMsg.css('transform','translateY(0.8rem)','transition','all 0.6 linear infinite');
        successDltMsg.show();
        successDltMsg.addClass('scrollTopToDown');
        setTimeout(function () {
            successDltMsg.hide();
            successDltMsg.removeClass('scrollTopToDown');
        }, 2000);
    successDltMsg.addClass('show');
}

$('#home').addClass('home');
$('#favButton').addClass('home');
$('#searchTxt').addClass('search');
$('#addBtn').addClass('addButton');
$('.background-field').addClass('addButton');