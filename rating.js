// Function to initialize the star ratings for a specific note
function initializeStars(noteIndex) {
    const ratingContainer = document.getElementById(`starRating_${noteIndex}`);
    const stars = ratingContainer.querySelectorAll('.bx-star');

    // Retrieve the stored rating from local storage or default to 0
    const rating = parseInt(localStorage.getItem(`userRating_${noteIndex}`)) || 0;
    highlightStars(stars, rating);

    // Add new click event listeners
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            setRating(stars, index + 1, noteIndex);
        });
    });
}

// Function to set the rating and update the local storage
function setRating(stars, index, noteIndex) {
    const rating = Math.min(index, 5); // Ensure the rating does not exceed 5
    highlightStars(stars, rating);

    // Store the rating in local storage
    localStorage.setItem(`userRating_${noteIndex}`, rating);
}

// Function to highlight stars based on the rating
function highlightStars(stars, index) {
    stars.forEach((star, i) => {
        const newClass = i < index ? 'bxs-star' : 'bx-star';
        const oldClass = i < index ? 'bx-star' : 'bxs-star';

        star.classList.remove(oldClass);
        star.classList.add(newClass);
    });
}


// Call initializeStars for each note when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const ratingContainers = document.querySelectorAll('.rating');
    ratingContainers.forEach(container => {
        const noteIndex = container.getAttribute('data-note');
        initializeStars(noteIndex);
    });
});


