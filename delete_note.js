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

        let titleInput = document.getElementById('addTitle');
        let textarea = document.getElementById('addTxt');
        let addBtn = document.getElementById('addBtn');

        titleInput.disabled = true;
        textarea.disabled = true;
        addBtn.disabled = true;
        
        let backgroundFields = document.getElementsByClassName('background-field');
    
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = true;
        }

        $('body').css('overflowY','hidden');
        PingAnimationForOpenDeletePopUp();
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
        let titleInput = document.getElementById('addTitle');
        let textarea = document.getElementById('addTxt');
        let addBtn = document.getElementById('addBtn');
      
        // Enable the text input and textarea
        titleInput.disabled = false;
        textarea.disabled = false;
        addBtn.disabled = false;
      
        // Enable all background fields
        let backgroundFields = document.getElementsByClassName('background-field');
        for (var i = 0; i < backgroundFields.length; i++) {
          backgroundFields[i].disabled = false;
        }
      
        document.body.style.overflowY = 'visible';
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

function noteCreateMsg(){
    let noteCreateMsg = $('#noteCreateMsg');

    if(addTitleElm.value == "" && addTxtElm.value == ""){
        noteCreateMsg.hide();
    } else if(addTitleElm.value == ""){
        noteCreateMsg.hide();
    } else if(addTxtElm.value == ""){
        noteCreateMsg.hide();
    } else {
        noteCreateMsg.css('transform','translateY(0.8rem)','transition','all 0.6s linear infinite');
        noteCreateMsg.show();
        noteCreateMsg.addClass('scrollTopToDown');
        setTimeout(function () {
            noteCreateMsg.hide();
            noteCreateMsg.removeClass('scrollTopToDown');
        }, 2000);
    }
    noteCreateMsg.addClass('show');
}

