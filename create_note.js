let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    var notesObjectId = JSON.parse(localStorage.getItem("notes")).length;

    let myObj = {
        id: notesObjectId,
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
    if (notes == "") {
        notesObj = [];
    } else {
        notesObj = JSON.parse(localStorage.getItem("notes"));
    }

    // Reverse the notesObj array to show the newest notes first
    notesObj.reverse();

    let html = "";
    notesObj.forEach(function (element, index) {
        const noteIndex = index + 1;
        if (element.title && element.text) {
            html += `
                <div id="notesCard${index}" class="noteCard hover:scale-105 transition mt-4 w-64 border-2  border-black px-2 pt-2 rounded">
                    <div class="card-body">
                        <h5 id="title" class="card-title font-semibold">${element.title}</h5>
                        <p id="description" class="card-text py-2 text-sm">${element.text}</p>
                        <div class="flex">
                            <button id="${index}" onclick="showDeletePopUp(this.id)" class="dltBtn background-field py-1 w-28 transition text-sm bg-blue-600 text-white px-3 rounded">Delete Note</button>
                            <button id="${index}" onclick="favorites(this.id)" class="favBtn background-field bg-black transition text-white ml-3 py-1 w-28 text-sm px-3 rounded">Favourite</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="rating" id="starRating_${noteIndex}" data-note="${noteIndex}" onclick="initializeStars()">
                                <i onclick="initializeStars(${noteIndex})" class='bx bx-star' data-index="1"></i>
                                <i onclick="initializeStars(${noteIndex})" class='bx bx-star' data-index="2"></i>
                                <i onclick="initializeStars(${noteIndex})" class='bx bx-star' data-index="3"></i>
                                <i onclick="initializeStars(${noteIndex})" class='bx bx-star' data-index="4"></i>
                                <i onclick="initializeStars(${noteIndex})" class='bx bx-star' data-index="5"></i>
                            </div>
                            <div>
                                <p id="Time${index}" class="py-2 font-semibold text-sm float-right">${getMinutesDifference(new Date(element.time), new Date())} </p>
                            </div>
                        </div>
                    </div>
                </div>  `;
        }
    });

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

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = "Nothing to show!";
    }
}

showNotes();

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardDescription = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTitle.includes(inputVal) || cardDescription.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});