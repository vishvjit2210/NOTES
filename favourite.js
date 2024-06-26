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
    let addToFavourite = $('#successMsg');

    let noteContainer = $('#noteContainer');
        noteContainer.removeClass('removeMsg'); // include css class


    noteContainer.addClass('successMsg'); // include css class
    
    let createMsg = $('#createMsg');
    createMsg.html('Your note is add to Favourite').css('color', '#00cc00');
    
    const SVG = `<i class='bx bxs-star text-lg lg:text-2xl text-[#00cc00]'></i>`;
    $('#SVG').html(SVG);
    
    addToFavourite.addClass('addToFavourite scrollTopToDown show').show();
    // timeout function for hide animation message
    setTimeout(function () {
        addToFavourite.removeClass('scrollTopToDown').hide();
    }, 2000);
}

// to show popup for already in favourite
function alreadyInFav(){
    let alreadyInFav = $('#successMsg');

    let noteContainer = $('#noteContainer');
    noteContainer.removeClass('successMsg');
    noteContainer.addClass('removeMsg'); // include css class
    
    let createMsg = $('#createMsg');
    createMsg.html('Your note is already in Favourite').css('color', '#cc0000');
    
    const SVG = `<i class='bx bxs-error-alt text-lg lg:text-2xl text-[#cc0000]'></i>`;
    $('#SVG').html(SVG);
    
        alreadyInFav.addClass('alreadyInFav scrollTopToDown show').show();
        // timeout function for hide animation message
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
                <div id="favNotesCard${index}" class="noteCard hover:scale-105 relative flex transition h-[12.5rem] mt-4 border-2 border-gray-300 bg-white rounded-lg shadow-lg shadow-gray-500">
                    <div class="card-body">
                        <div class="bg-gray-200 p-2 rounded-t-lg border-b-2 border-gray-300">
                            <h5 id="title_${index}" class="card-title description font-black text-lg text-black w-60 lg:w-72 truncate" title = "${element.title}">${element.title}</h5>
                        </div>
                        <div class="p-2">
                            <p id="description_${index}" class="card-text description text-base pt-1 pb-2 h-[4.5rem] w-60 lg:w-72 overflow-y-auto" title = "${element.text}">${element.text}</p>
                        </div>
                        <div>
                            <p id="Time${index}" class="description w-full mb-0.5 pr-2 text-right font-semibold text-sm text-blue-600">${getMinutesDifference(new Date(element.time), new Date())} </p>
                        </div>
                        <div class="flex justify-between items-center border-t-[3px]">
                            <button id="removeNoteBtn_${index}" onclick="removeFromFavorites(${index})" class="removeBtn dltBtn focus:outline-none flex justify-center rounded-b-lg items-center rounded-bl-lg gap-3 w-full buttons background-field h-10 transition tracking-wider font-semibold text-[#ff0000] bg-red-50 text-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" /></svg> Remove</button>
                        </div> 
                    </div>
                </div>`;
        }
    });
    
    if (favObj.length !== 0) {
        sidebarElm.innerHTML = sidebarItem;
    } else {
        $('#sidebar').html('No Favourite Notes!').addClass('addtitle text-xl mt-2');
    }

    function updateNoteTimes() {
        favObj.forEach(function (element, index) {
            if (element.title && element.text) {
                // Update the time for each note
                let timeElement = document.getElementById(`Time${index}`);
                if (timeElement) {
                    timeElement.innerText = getMinutesDifference(new Date(element.time), new Date());
                }
            }
        });
    }

    setInterval(updateNoteTimes, 60000); // Update every 60 seconds (adjust as needed)

    function getMinutesDifference(date1, date2) {
        const diffMilliseconds = Math.abs(date1 - date2);
        const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
        const diffHour = Math.floor(diffMinutes / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffMonth = Math.floor(diffDay / 30);
        const diffYear = Math.floor(diffDay / 365);
        if (diffMinutes < 60) {
            return `${diffMinutes} Min ago`;
        } else if (diffHour < 24) {
            return `${diffHour} Hours ago`;
        } else if (diffDay < 30) {
            return `${diffDay} Days ago`
        } else if (diffMonth < 12) {
            return `${diffMonth} Month ago`
        } else {
            return `${diffYear} Year ago`;
        }
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
