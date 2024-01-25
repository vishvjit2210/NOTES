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
                        <h5 id="title_${index}" class="card-title text-lg title text-black">${element.title}</h5>   
                        <p id="description_${index}" class="card-text description pt-1 pb-2">${element.text}</p>
                        <div class="flex">
                            <button id="${index}" onclick="showDeletePopUp(this.id)" class="dltBtn buttons border-[3px] border-black background-field h-9 w-28 transition bg-[#1a1aff] text-white px-3 rounded">Delete</button>
                            <button id="${index}" onclick="favorites(this.id)" class="favBtn buttons border-[3px] border-[#ff0000] background-field bg-black transition text-white ml-3 h-9 py-1 w-28 px-3 rounded">Favourite</button>
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
            
            // notesObj.forEach((element, index) => {
            //     let titleElm = document.getElementById(`title_${index}`);
            //     let descriptionElm = document.getElementById(`description_${index}`);
            
            //     if (titleElm) {
            //         titleElm.addEventListener('mouseover', function () {
            //             const fullTitle = element.title;
            //             const maxLength = 15;
            //             if (fullTitle.length > maxLength) {
            //                 titleElm.setAttribute('title', fullTitle);
            //             }
            //         });
            //     }
            
            //     if (descriptionElm) {
            //         descriptionElm.addEventListener('mouseover', function() {
            //             const fullDescription = element.text;
            //             const maxLength = 15;
            //             if (fullDescription.length > maxLength) {
            //                 descriptionElm.setAttribute('title', fullDescription);
            //             }
            //         });
            //     }
            // });
            
        } else {
            notesElm.innerHTML = "Nothing to show!";
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
    document.getElementById('menu').style.display= "block";
}

function menuClose(){
    let Menu = document.getElementById('menu');

    // Add the animation class to trigger the animation
    Menu.classList.add('menu-close');

    // Use a setTimeout to delay hiding the menu until the animation completes
    setTimeout(function () {
        Menu.style.display = 'none';
        // Remove the animation class to reset it for the next time
        Menu.classList.remove('menu-close');
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