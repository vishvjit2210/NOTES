// // Function to initialize the star ratings for a specific note
// function initializeStars(index, starIndex) {
//     const starRatingContainer = document.getElementById(`starRating_${index}`);
//     const stars = starRatingContainer.querySelectorAll('.bx-star');

//     stars.forEach((star, index) => {
//         if (index < starIndex) {
//             star.classList.add('bxs-star');
//         } else {
//             star.classList.remove('bxs-star');
//         }
//     });

//     const notesString = localStorage.getItem('notes');
//     let notes = [];
//     if (notesString) {
//         notes = JSON.parse(notesString);
//     }

//     const reversedIndex = notes.length - 1 - index;
//     const foundNote = notes[reversedIndex];
//     foundNote.star = starIndex;

//     localStorage.setItem('notes', JSON.stringify(notes));
// }



// // Function to initialize stars for all notes in reverse order
// function initializeStarsInReverseOrder() {
//     const notesString = localStorage.getItem('notes');
//     const notes = notesString ? JSON.parse(notesString) : [];

//     for (let i = notes.length - 1; i >= 0; i--) {
//         const starIndex = notes[i].star || 0;

//         const reversedIndex = notes.length - 1 - i;
//         initializeStars(reversedIndex, starIndex);
//     }
// }

// // Call the function to initialize stars in reverse order after the page has loaded
// window.onload = initializeStarsInReverseOrder;