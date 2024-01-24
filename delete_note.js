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
        document.getElementById('deletePopUp').style.display = 'block';

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

        document.body.style.overflowY = 'hidden';
        PingAnimationForOpen();
    }

    // close delete popup
    function closeDeletePopUp() {
        let deletePopUp = document.getElementById('deletePopUp');
      
        deletePopUp.classList.add('ping-out');
      
        deletePopUp.addEventListener('animationend', function animationEndHandler() {
        deletePopUp.classList.remove('ping-out');
        deletePopUp.classList.remove('ping-in');
        deletePopUp.style.display = 'none';
        deletePopUp.removeEventListener('animationend', animationEndHandler);
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
    function PingAnimationForOpen() {
        let elementToOpen = document.getElementById('deletePopUp');
    
        // Add a class to apply the ping animation
        elementToOpen.classList.add('ping-animation-open');
    }
    
function successDltMsg() {
    let success = document.getElementById('success');
        success.style.transform = 'translateY(0.7rem)';
        success.style.transition = 'all 0.6s linear infinite';
        success.style.display = 'block';
        success.classList.add('scrollTopToDown');
        setTimeout(function () {
            success.style.display = 'none';
            success.classList.remove('scrollTopToDown');
        }, 2000);
    document.getElementById('success').classList.add('show');
}

function noteCreateMsg(){
    let success = document.getElementById('noteCreateMsg');

    if(addTitleElm.value == "" && addTxtElm.value == ""){
        success.style.display = 'none';
    } else if(addTitleElm.value == ""){
        success.style.display = 'none';
    } else if(addTxtElm.value == ""){
        success.style.display = 'none';
    } else {
        success.style.transform = 'translateY(0.7rem)';
        success.style.transition = 'all 0.6s linear infinite';
        success.style.display = 'block';
        success.classList.add('scrollTopToDown');
        setTimeout(function () {
            success.style.display = 'none';
            success.classList.remove('scrollTopToDown');
        }, 2000);
    }
    document.getElementById('noteCreateMsg').classList.add('show');
}

