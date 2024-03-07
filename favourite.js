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
    let addToFavourite = $('#addToFavourite');

    addToFavourite.css('transform','translateY(0.8rem)','transition','all 0.6 linear infinite').addClass('scrollTopToDown show').show();
    setTimeout(function () {
        addToFavourite.removeClass('scrollTopToDown').hide();
    }, 2000);
}

// to show popup for already in favourite
function alreadyInFav(){
    let alreadyInFav = $('#alreadyInFav');
        alreadyInFav.css('transform','translateY(0.8rem)','transition','all 0.6 linear infinite').addClass('scrollTopToDown show').show();
        setTimeout(function () {
            alreadyInFav.removeClass('scrollTopToDown').hide();
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
                <div id="favNotesCard${index}" class="noteCard hover:scale-105 flex transition mt-4 w-60 border-[3px] border-black px-2 pt-2 rounded">
                    <div class="card-body">
                        <h5 id="title_${index}" class="card-title text-xl title text-black">${element.title}</h5>
                        <p id="description_${index}" class="card-text text-lg description pt-1 pb-2">${element.text}</p>
                        <button id="removeFav_${index}" onclick="removeFromFavorites(${index})" class="btn text-lg buttons border-[3px] border-black bg-[#1a1aff] text-white px-6 py-1 mb-2 rounded">Remove</button>
                    </div>
                </div>`;
        }
    });

    
    if (favObj.length !== 0) {
        sidebarElm.innerHTML = sidebarItem;

        // // Event listeners for titles in the sidebar
        // favObj.forEach((element, index) => {
        //     let titleElm = document.getElementById(`title_${index}`);
        //     let descriptionElm = document.getElementById(`description_${index}`);
        //     if (titleElm || descriptionElm) {
        //         titleElm.addEventListener('mouseover', function () {
        //             const fullTitle = element.title;
        //             const maxLength = 15;
        //             if (fullTitle.length > maxLength) {
        //                 titleElm.setAttribute('title', fullTitle);
        //             }
        //         });
        //         descriptionElm.addEventListener('mouseover', function() {
        //             const fullDescription = element.text;
        //             const maxLength = 15;
        //             if(fullDescription.length > maxLength) {
        //                 descriptionElm.setAttribute('title', fullDescription);
        //             }
        //         });
        //     }
        // });
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