function createNoteButton() {
    
    let createNoteButton = $('#createNoteButton');
    let createNoteBox = $('#createNoteBox');
    setTimeout(function () {
        createNoteBox.css('display','block');
        createNoteButton.addClass('hidden');
    }, 0);
}

let addBtn = document.getElementById('addBtn');
let addTxt = document.getElementById("addTxt");
let addTitle = document.getElementById("addTitle");
addBtn.addEventListener("click", function () {
        addBtn.innerHTML = 'Creating...';
        addBtn.disabled = true;
        addTitle.disabled = true;
        addTxt.disabled = true;

        setTimeout(function () {
            addBtn.disabled = false;
            addTitle.disabled = false;
            addTxt.disabled = false;
        }, 2000);

    setTimeout(() => {

        if (!addTitle.value || !addTxt.value) {
            addBtnValidation();
            addBtn.innerHTML = '<button id="addBtn" class="flex justify-center items-center gap-3 buttons font-semibold text-xl h-10 transition tracking-wider text-[#00b300] rounded" type="button"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 0 0" xml:space="preserve" class="h-7 w-7"><g><g fill="#000"><path fill-rule="evenodd" d="M42 2v10a8 8 0 0 0 8 8h11.977c.015.201.023.404.023.607V46c0 8.837-7.163 16-16 16H18C9.163 62 2 54.837 2 46V18C2 9.163 9.163 2 18 2zm1 30a2 2 0 0 1-2 2h-7v7a2 2 0 1 1-4 0v-7h-7a2 2 0 1 1 0-4h7v-7a2 2 0 1 1 4 0v7h7a2 2 0 0 1 2 2z" clip-rule="evenodd" fill="#00b300" opacity="1" data-original="#00b300" class=""></path><path d="M46 2.742V12a4 4 0 0 0 4 4h10.54a7.995 7.995 0 0 0-1.081-1.241L48.093 4.152A7.998 7.998 0 0 0 46 2.742z" fill="#00b300" opacity="1" data-original="#000000" class="h-4 w-4"></path></g></g></svg> Add Note</button>';
            return;
        }

        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
            noteCreateMsg();
            addBtnValidation();
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
        addBtn.innerHTML = '<button id="addBtn" class="flex justify-center items-center gap-3 buttons font-semibold text-xl h-10 transition tracking-wider text-[#00b300] rounded" type="button"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 0 0" xml:space="preserve" class="h-7 w-7"><g><g fill="#000"><path fill-rule="evenodd" d="M42 2v10a8 8 0 0 0 8 8h11.977c.015.201.023.404.023.607V46c0 8.837-7.163 16-16 16H18C9.163 62 2 54.837 2 46V18C2 9.163 9.163 2 18 2zm1 30a2 2 0 0 1-2 2h-7v7a2 2 0 1 1-4 0v-7h-7a2 2 0 1 1 0-4h7v-7a2 2 0 1 1 4 0v7h7a2 2 0 0 1 2 2z" clip-rule="evenodd" fill="#00b300" opacity="1" data-original="#00b300" class=""></path><path d="M46 2.742V12a4 4 0 0 0 4 4h10.54a7.995 7.995 0 0 0-1.081-1.241L48.093 4.152A7.998 7.998 0 0 0 46 2.742z" fill="#00b300" opacity="1" data-original="#000000" class="h-4 w-4"></path></g></g></svg> Add Note</button>'; 
        showNotes();
    }, 1500);
    
});

function showNotes(showRecentNotes = false) {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes !== null) {
        notesObj = JSON.parse(notes);
        notesObj.reverse(); // Reverse the order of notes
    }
    let html = "";
    let hasRecentNotes = false;
    notesObj.forEach(function (element, index) {
        const noteTime = new Date(element.time);
        const currentTime = new Date();
        const timeDifference = (currentTime - noteTime) / (1000 * 60); // Difference in minutes
        if (element.title && element.text) {
            if (!showRecentNotes || (showRecentNotes && timeDifference <= 1440)) { // Show all notes or only recent notes
                html += `
                    <div id="notesCard${index}" class="noteCard relative hover:scale-105 transition mt-4 h-52 w-72 sm:w-80 lg:w-72 xl:w-80 border-2 border-gray-300 bg-white rounded-lg shadow-lg shadow-gray-500">
                        <div class="card-body">
                            <div>
                                <div class="bg-gray-200 p-2 rounded-t-lg border-b-2 border-gray-300">
                                    <h5 id="title_${index}" class="card-title description font-black text-lg text-black w-60 truncate" title="${element.title}">${element.title}</h5>   
                                </div>
                                <div class="p-2">
                                    <p id="description_${index}" class="card-text description text-base pt-1 pb-2 w-60 truncate" title="${element.text}">${element.text}</p>
                                </div>
                            </div>

                            <div class="divide-y-[3px] absolute bottom-0 right-0 left-0 divide-gray-300">
                                <div class="flex items-center justify-between px-2">
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
                                <div class="flex justify-center divide-x-[3px] divide-gray-300">
                                    <button id="${index}" onclick="showDeletePopUp(this.id)" class="dltBtn focus:outline-none flex justify-center items-center rounded-bl-lg gap-3 buttons background-field h-10 w-full transition tracking-wider font-semibold  text-[#ff0000] text-lg"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" /></svg></span> <span>Delete </span></button>

                                    <button id="${index}" onclick="favorites(this.id)" class="favBtn buttons focus:outline-none flex justify-center items-center rounded-br-lg gap-3 background-field h-10 w-full transition tracking-wider font-semibold  text-[#009900] text-lg"><span><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" style="fill: #009900;transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg></span> <span>Favourite</span></button>
                                </div>
                            </div>
                            
                        </div>
                    </div>  
                    `;
                hasRecentNotes = true;
            }
        }
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length !== 0 && hasRecentNotes) {
        notesElm.innerHTML = html;
    } else if (notesObj.length !== 0 && !hasRecentNotes) {
        html = '<p class="mt-5 text-xl font-bold description">No recent notes!</p>';
        notesElm.innerHTML = html;
    } else {
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

document.addEventListener('DOMContentLoaded', function() {
    let createNoteBtn = $('#createNoteButton');
    const menu = document.getElementById('screenMenu');
    const menuButton = document.getElementById('profileImage');
    let backgroundFields = document.getElementsByClassName('background-field');
    let menuOpen = false;

  menuButton.addEventListener('click', function() {
    menuOpen = !menuOpen;
    if (menuOpen) {
        menu.classList.remove('hidden');
        $('#main').fadeTo(200,0.6);
        addBtn.disabled = true;
        addTitle.disabled = true;
        addTxt.disabled = true;
        $('#searchTxt').attr('disabled','true');
        createNoteBtn.attr('disabled','true');
        $('body').css('overflowY','hidden');
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','true').css('pointerEvents','none');
        });
    
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = true;
            $('.background-field').removeClass('addButton');
        }
    } else {
      menu.classList.add('hidden');
       $('#main').fadeTo(800,1);
        addBtn.disabled = false;
        addTitle.disabled = false;
        addTxt.disabled = false;
        createNoteBtn.prop('disabled', false);
        $('#searchTxt').attr('disabled', false);
        document.body.style.overflowY = 'visible';
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','false').css('pointerEvents','visible');
        });
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = false;
            $('.background-field').removeClass('addButton');
        }
    }
  });

  document.addEventListener('click', function(event) {
    if (menuOpen && event.target !== menuButton) {
      menu.classList.add('hidden');
       $('#main').fadeTo(800,1);
        addBtn.disabled = false;
        addTitle.disabled = false;
        addTxt.disabled = false;
        createNoteBtn.prop('disabled', false);
        $('#searchTxt').prop('disabled', false);
        document.body.style.overflowY = 'visible';
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','false').css('pointerEvents','visible');
        });

        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = false;
            $('.background-field').removeClass('addButton');
        }
      menuOpen = false;
    }
  });
});



// Function to initialize the star ratings for a specific note
function initializeStars(index, starIndex) {
    const notesString = localStorage.getItem('notes');
    let notes = [];
    if (notesString) {
        notes = JSON.parse(notesString);
    }

    const reversedIndex = notes.length - 1 - index;
    const foundNote = notes[reversedIndex];

    const starRatingContainer = document.getElementById(`starRating_${index}`);
    if (!starRatingContainer) {
        // Exit the function if the starRatingContainer is null
        return;
    }

    const stars = starRatingContainer.querySelectorAll('.bx-star');

    stars.forEach((star, index) => {
        if (index < starIndex) {
            star.classList.add('bxs-star');
        } else {
            star.classList.remove('bxs-star');
        }

        if (index == 0) {
            star.addEventListener('dblclick', function () {
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
    let noteCreateMsg = $('#successMsg');

    let noteContainer = $('#noteContainer');
    noteContainer.removeClass('removeMsg');
    noteContainer.addClass('successMsg'); // include css class

    let createMsg = $('#createMsg');
    createMsg.html('Your note is successfully created').css('color', '#00cc00');
    
    const SVG = `<i class='bx bxs-check-circle text-2xl text-[#00cc00]'></i>`;
    $('#SVG').html(SVG);
    
    noteCreateMsg.addClass('noteCteateMsg scrollTopToDown show').show();
    // timeout function for hide animation message
        setTimeout(function () {
            noteCreateMsg.removeClass('scrollTopToDown').hide();
        }, 2000);
}