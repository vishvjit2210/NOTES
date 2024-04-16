let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    
    if (!addTitle.value || !addTxt.value) {
        return;
    }
    
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        time: new Date(),
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

let addTitleElm = document.getElementById('addTitle');
let addTxtElm = document.getElementById('addTxt');
let errorMessage = document.getElementById('errorMessage');
let errorMsg = document.getElementById('errorMsg');

function showNotes() {
    
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes !== null) {
        notesObj = JSON.parse(notes);
        notesObj.reverse(); // Reverse the order of notes
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.title && element.text) {
            html += `
                <div id="notesCard${index}" class="noteCard hover:scale-105 transition mt-4 w-64 border-[3px] border-black px-2 pt-2 rounded">
                    <div class="card-body">
                        <h5 id="title_${index}" class="card-title title text-lg text-black w-full truncate" title="${element.title}">${element.title}</h5>   
                        <p id="description_${index}" class="card-text description text-base pt-1 pb-2 w-full truncate" title="${element.text}">${element.text}</p>
                        <div class="flex">
                            <button id="${index}" onclick="showDeletePopUp(this.id)" class="dltBtn buttons border-[3px] border-black background-field h-9 w-28 transition bg-[#1a1aff] text-white px-3 rounded text-base">Delete</button>
                            <button id="${index}" onclick="favorites(this.id)" class="favBtn buttons border-[3px] border-[#ff0000] background-field bg-black transition text-white ml-3 h-9 py-1 w-28 px-3 rounded text-base">Favourite</button>
                        </div>
                        <div class="flex items-center justify-between">
                        <div class="rating" id="starRating_${index}" data-note="${index}">
                        <i onclick="initializeStars(${index}, 1)" class='bx bx-star' data-index="1"></i>
                        <i onclick="initializeStars(${index}, 2)" class='bx bx-star' data-index="2"></i>
                        <i onclick="initializeStars(${index}, 3)" class='bx bx-star' data-index="3"></i>
                        <i onclick="initializeStars(${index}, 4)" class='bx bx-star' data-index="4"></i>
                        <i onclick="initializeStars(${index}, 5)" class='bx bx-star' data-index="5"></i>                        
                        </div>                   
                            <div>
                                <p id="Time${index}" class="py-2 description font-semibold text-sm float-right">${getMinutesDifference(new Date(element.time), new Date())} </p>
                            </div>
                        </div>
                    </div>
                </div>  
                `;
            }
        });

        
        let notesElm = document.getElementById("notes");
        if (notesObj.length !== 0) {
            notesElm.innerHTML = html;
            
        } else {
            // notesElm.innerHTML = "Nothing to show!";
            $('#notes').text('Nothing To Show!').addClass('addtitle text-xl mt-2');
        }
        initializeStarsInReverseOrder();

    function updateNoteTimes() {
        notesObj.forEach(function (element, index) {
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
        if (diffMinutes < 60) {
            return `${diffMinutes} min ago`;
        } else if (diffHour < 24) {
            return `${diffHour} hours ago`;
        } else {
            return `${diffDay} days ago`;
        }
    }
}
showNotes();

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        // for lower case latter or words
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardDescription = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTitle.includes(inputVal) || cardDescription.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

function menuOpen(){
    $('#menu').show();
}

function menuClose(){
    let Menu = $('#menu');

    // Add the animation class to trigger the animation
    Menu.addClass('menu-close');

    // Use a setTimeout to delay hiding the menu until the animation completes
    setTimeout(function () {
        // Remove the animation class to reset it for the next time
        Menu.removeClass('menu-close');
        Menu.hide();
    }, 500);
}

// Function to initialize the star ratings for a specific note
function initializeStars(index, starIndex) {
    
    const starRatingContainer = document.getElementById(`starRating_${index}`);
    const stars = starRatingContainer.querySelectorAll('.bx-star');

    stars.forEach((star, index) => {
        if (index < starIndex) {
            star.classList.add('bxs-star');
        } else {
            star.classList.remove('bxs-star');
        }

        if (index == 0) {
            star.addEventListener('dblclick', function() {
                // Remove all stars for this note
                foundNote.star = 0; // Assuming 0 indicates no star selected
                localStorage.setItem('notes', JSON.stringify(notes));

                // Update the star display
                stars.forEach((star) => {
                    star.classList.remove('bxs-star'); // Remove filled star class for stars after starIndex
                });
            });
        }
    });

    const notesString = localStorage.getItem('notes');
    let notes = [];
    if (notesString) {
        notes = JSON.parse(notesString);
    }

    const reversedIndex = notes.length - 1 - index;
    const foundNote = notes[reversedIndex];
    foundNote.star = starIndex;
    localStorage.setItem('notes', JSON.stringify(notes));
}




// Function to initialize stars for all notes in reverse order
function initializeStarsInReverseOrder() {
    const notesString = localStorage.getItem('notes');
    const notes = notesString ? JSON.parse(notesString) : [];

    for (let i = notes.length - 1; i >= 0; i--) {
        const starIndex = notes[i].star || 0;

        const reversedIndex = notes.length - 1 - i;
        initializeStars(reversedIndex, starIndex);
    }
}

// Call the function to initialize stars in reverse order after the page has loaded
window.onload = initializeStarsInReverseOrder;


function noteCreateMsg(){
    let noteCreateMsg = $('#noteCreateMsg');

    if(addTitleElm.value == "" && addTxtElm.value == ""){
        noteCreateMsg.hide();
    } else if(addTitleElm.value == ""){
        noteCreateMsg.hide();
    } else if(addTxtElm.value == ""){
        noteCreateMsg.hide();
    } else {
        noteCreateMsg.addClass('noteCteateMsg scrollTopToDown show').show();
        setTimeout(function () {
            noteCreateMsg.removeClass('scrollTopToDown').hide();
        }, 2000);
    }
}
