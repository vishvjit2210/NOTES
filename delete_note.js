function deleteNote(index) {
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    let favObj = JSON.parse(localStorage.getItem("favItem")) || [];

    // Get the note to be deleted
    let deletedNote = notesObj[index];

    // Remove the note from the main page
    notesObj.splice(index, 1);
    // Remove the note from the favorite page, if it exists
    let favIndex = favObj.findIndex(favNote => favNote.title === deletedNote.title && favNote.text === deletedNote.text);
    if (favIndex !== -1) {
        favObj.splice(favIndex, 1);
    }
    // Update localStorage
    localStorage.setItem("notes", JSON.stringify(notesObj));
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
        // reference of text input and textarea
        let titleInput = document.getElementById('addTitle');
        let textarea = document.getElementById('addTxt');
        let addBtn = document.getElementById('addBtn');
        // Disable the text input and textarea
        titleInput.disabled = true;
        textarea.disabled = true;
        addBtn.disabled = true;
        
        let backgroundFields = document.getElementsByClassName('background-field');
    
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = true;
        }
        // disabled page scroll when popup is open
        document.body.style.overflowY = 'hidden';
        PingAnimationForOpen();
    }

    // close delete popup
    function closeDeletePopUp() {
        let deletePopUp = document.getElementById('deletePopUp');
      
        // Add a CSS class to initiate the ping-out animation
        deletePopUp.classList.add('ping-out');
      
        // Wait for the animation to finish, then hide the popup
        deletePopUp.addEventListener('animationend', function animationEndHandler() {
          // Remove the 'ping-out' class after the animation completes
          deletePopUp.classList.remove('ping-out');
      
          // Remove the 'ping-in' class if it exists
          deletePopUp.classList.remove('ping-in');
      
          // Hide the popup
          deletePopUp.style.display = 'none';
      
          // Remove the event listener to avoid attaching it multiple times
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
      
        // Enable page scroll when popup is closed
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
    success.style.transform = 'translateX(70rem)';
    success.style.transition = 'all 0.6s linear infinite';
    // Display the success popup
    success.style.display = 'block';
        
    // Add a class to initiate the animation
    success.classList.add('scroll-animation');
        
    // Hide the success popup after 2 seconds
    setTimeout(function () {
        success.style.display = 'none';
        success.classList.remove('scroll-animation');
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
        success.style.transform = 'translateX(70rem)';
        success.style.transition = 'all 0.6s linear infinite';
        // Display the success popup
        success.style.display = 'block';
            
        // Add a class to initiate the animation
        success.classList.add('scroll-animation');
            
        // Hide the success popup after 2 seconds
        setTimeout(function () {
            success.style.display = 'none';
            success.classList.remove('scroll-animation');
        }, 2000);
    }
    document.getElementById('noteCreateMsg').classList.add('show');
}

