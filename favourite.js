// open side baar
function showSidebar() {
    console.log('open sidebar');
    
    let sidebarContainer = document.getElementById('sidebarContainer');

    // Display the sidebar
    sidebarContainer.style.display = 'block';

    // Add a class to initiate the left-to-right animation
    sidebarContainer.classList.add('sidebar-open');

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

    // Disable page scroll when the sidebar is open
    document.body.style.overflowY = 'hidden';

    event.preventDefault();
}


// add note as favourite
function favorites(index) {
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    let selectedNote = notesObj[index];

    // Check if the note is already in favorites
    let favItem = localStorage.getItem("favItem") || "[]";
    let favObj = JSON.parse(favItem);

    // Check if the note is already in favorites
    let isAlreadyFav = favObj.some(favNote => favNote.title === selectedNote.title && favNote.text === selectedNote.text);

    if (!isAlreadyFav) {
        // Add the selected note to favorites
        favObj.push(selectedNote);

        // Update the localStorage for favorites
        localStorage.setItem("favItem", JSON.stringify(favObj));

        // call function to show favourite notes
        showFavNotes();
    } else {
        // alert to show notes already exist or not in favourite
        alreadyInFav();
    }   
}

// to show popup for added notes in favourite
function addToFavourite(){
    let favourite = document.getElementById('addToFavourite');
        favourite.style.transform = 'translateX(70rem)';
        favourite.style.transition = 'all 0.6s linear infinite';
        // Display the favourite popup
        favourite.style.display = 'block';
        
        // Add a class to initiate the animation
        favourite.classList.add('scroll-animation');
        
        // Hide the favourite popup after 2 seconds
        setTimeout(function () {
            favourite.style.display = 'none';
            favourite.classList.remove('scroll-animation');
        }, 2000);
    document.getElementById('addToFavourite').classList.add('show');
}

// to show popup for already in favourite
function alreadyInFav(){
    let favourite = document.getElementById('alreadyInFav');
        favourite.style.transform = 'translateX(70rem)';
        favourite.style.transition = 'all 0.6s linear infinite';
        // Display the favourite popup
        favourite.style.display = 'block';
        
        // Add a class to initiate the animation
        favourite.classList.add('scroll-animation');
        
        // Hide the favourite popup after 2 seconds
        setTimeout(function () {
            favourite.style.display = 'none';
            favourite.classList.remove('scroll-animation');
        }, 2000);
    document.getElementById('alreadyInFav').classList.add('show');
}

function showFavNotes() {
        // Retrieve favorite notes from localStorage
    let favItem = localStorage.getItem("favItem");
    let favObj = [];

    if (favItem !== null) {
        favObj = JSON.parse(favItem);
    }

    // HTML for favorite notes
    let sidebarItem = "";
    favObj.forEach(function (element, index) {
        if (element.title && element.text) {
            sidebarItem += `
                <div id="favNotesCard${index}" class="noteCard hover:scale-105 transition mt-4 w-64 border-2 border-black px-2 pt-2 rounded">
                    <div class="card-body">
                        <h5 id="title" class="card-title font-semibold">${element.title}</h5>
                        <p id="description" class="card-text py-2 text-sm">${element.text}</p>
                        <button id="removeFav_${index}" onclick="removeFromFavorites(${index})" class="btn bg-blue-600 text-white p-1 mb-2 rounded">Remove button</button>
                    </div>
                </div>`;
        }
    });

    // Get the sidebar element
    document.getElementById("sidebar").innerHTML = sidebarItem;
}
showFavNotes();

function removeFromFavorites(index) {
        let favItem = localStorage.getItem("favItem");
        let favObj = [];
    
        if (favItem !== null) {
            favObj = JSON.parse(favItem);
        }
        // Remove the note at the specified index from favorites
        favObj.splice(index, 1);
    
        // Update the localStorage for favorites
        localStorage.setItem("favItem", JSON.stringify(favObj));
    
        // Call the function to update the sidebar
        showFavNotes();
}
    
// close side baar
function closeSidebar() {    
    let sidebarContainer = document.getElementById('sidebarContainer');

    // Add a class to initiate the right-to-left animation
    sidebarContainer.classList.add('sidebar-close');

    // Enable the text input and textarea
    let titleInput = document.getElementById('addTitle');
    let textarea = document.getElementById('addTxt');
    let addBtn = document.getElementById('addBtn');
    
    titleInput.disabled = false;
    textarea.disabled = false;
    addBtn.disabled = false;

    // Enable all background fields
    let backgroundFields = document.getElementsByClassName('background-field');
    for (var i = 0; i < backgroundFields.length; i++) {
        backgroundFields[i].disabled = false;
    }

    // Enable page scroll when the sidebar is closed
    document.body.style.overflowY = 'visible';

    // Hide the sidebar after the animation
    setTimeout(function () {
        sidebarContainer.style.display = 'none';

        // Remove the classes after the animation completes
        sidebarContainer.classList.remove('sidebar-close');
    }, 300);
}
