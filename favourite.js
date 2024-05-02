// add note as favourite
function favorites(index) {
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    let favObj = JSON.parse(localStorage.getItem("favItem")) || [];

    notesObj.reverse();

    let selectedNote = notesObj[index];

    let isAlreadyFavorite = favObj.some(favNote => favNote.title === selectedNote.title && favNote.text === selectedNote.text);

    if (!isAlreadyFavorite) {
        favObj.push(selectedNote);

        localStorage.setItem("favItem", JSON.stringify(favObj));
        addToFavourite();
    } else {
        alreadyInFav();
    }
    

    // Update the UI
    showFavNotes();
}

let w = window.innerWidth;
// to show popup for added notes in favourite
function addToFavourite(){
    let addToFavourite = $('#noteCreateMsg');
    
    let noteContainer = $('#noteContainer');
    noteContainer.addClass('flex justify-between align-middle border-2 border-[#00cc00] bg-[#e6ffe6]');
    
    let createMsg = $('#createMsg');
    createMsg.html('Your note is add to Favourite').css('color', '#00cc00');
    
    const SVG = `<i class='bx bxs-star text-lg lg:text-2xl text-[#00cc00]'></i>`;
    $('#SVG').html(SVG);
    
    addToFavourite.addClass('addToFavourite scrollTopToDown show').show();
    // timeout function for hide animation message
    setTimeout(function () {
        addToFavourite.removeClass('scrollTopToDown').hide();
        noteContainer.removeClass('flex justify-between align-middle border-2 border-[#00cc00] bg-[#e6ffe6]');
    }, 2000);
}

// to show popup for already in favourite
function alreadyInFav(){
    let alreadyInFav = $('#noteCreateMsg');
    
    let noteContainer = $('#noteContainer');
    noteContainer.addClass('flex justify-between align-middle border-2 border-[#cc0000] bg-[#ffe6e6]');
    
    let createMsg = $('#createMsg');
    createMsg.html('Your note is already in Favourite').css('color', '#cc0000');
    
    const SVG = `<i class='bx bxs-error-alt text-lg lg:text-2xl text-[#cc0000]'></i>`;
    $('#SVG').html(SVG);
    
        alreadyInFav.addClass('alreadyInFav scrollTopToDown show').show();
        // timeout function for hide animation message
        setTimeout(function () {
            alreadyInFav.removeClass('scrollTopToDown').hide();
            noteContainer.removeClass('flex justify-between align-middle border-2 border-[#cc0000] bg-[#ffe6e6]');
        }, 2000);
}

function showFavNotes() {
    let sidebarElm = document.getElementById("sidebar");
    let favItem = localStorage.getItem("favItem");
    let favObj = [];
    
    if (favItem !== null) {
        favObj = JSON.parse(favItem);
    }

    let sidebarItem = "";
    favObj.forEach(function (element, index) {
        if (element.title && element.text) {
            sidebarItem += `
                <div id="favNotesCard${index}" class="noteCard hover:scale-105 flex transition mt-4 w-64 border-[3px] border-black px-2 pt-2 rounded">
                    <div class="card-body">
                        <h5 id="title_${index}" class="card-title title text-lg text-black w-60 truncate" title = "${element.title}">${element.title}</h5>
                        <p id="description_${index}" class="card-text description text-base pt-1 pb-2 w-60 truncate" title = "${element.text}">${element.text}</p>
                        <button id="removeNoteBtn_${index}" onclick="removeFromFavorites(${index})" class="btn text-lg buttons border-[3px] border-black bg-[#1a1aff] text-white px-6 py-1 mb-2 rounded">Remove</button>
                    </div>
                </div>`;
        }
    });
    
    if (favObj.length !== 0) {
        sidebarElm.innerHTML = sidebarItem;
    } else {
        $('#sidebar').html('No Favourite Notes!').addClass('addtitle text-xl mt-2');
    }
}

showFavNotes();

function removeFromFavorites(index) {
    let favItem = localStorage.getItem("favItem");
    let favObj = [];
    if (favItem !== null) {
        favObj = JSON.parse(favItem);
    }
        favObj.splice(index, 1);
        localStorage.setItem("favItem", JSON.stringify(favObj));
        showFavNotes();
}