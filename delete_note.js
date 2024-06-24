function deleteNote(index) {
    let notesObj = JSON.parse(localStorage.getItem("notes")) || [];
    let favObj = JSON.parse(localStorage.getItem("favItem")) || [];

    notesObj.reverse();

    
    let deletedNote = notesObj[index];

    notesObj.splice(index, 1);
    
    let originalIndex = notesObj.length - index - 1;

    let favIndex = favObj.findIndex(favNote => favNote.title === deletedNote.title && favNote.text === deletedNote.text);
    if (favIndex !== -1) {
        favObj.splice(favIndex, 1);
    }

    localStorage.removeItem(`userRating_${originalIndex}`);
    localStorage.setItem("notes", JSON.stringify(notesObj.reverse()));
    localStorage.setItem("favItem", JSON.stringify(favObj));

    // Update the UI
    showNotes();
    showFavNotes();
}


// showing delete popup
let currentDeleteIndex;
let currentFavBtnIndex;
    function showDeletePopUp(index) {
        activePopup = 'deletePopUp';
        clickEvent = 'deletePopUp';
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','true').css('pointerEvents','none');
        });
        currentDeleteIndex = index;
        currentFavBtnIndex = index;
        $('#deletePopUp').show();
        $('#addTitle, #addTxt, #searchTxt, #addBtn, #profileImageBtn, #featuresBtn, #createNoteButton').prop('disabled', true);
        $('#addBtn').removeClass('addButton');
        $('#home, #favButton').removeClass('home');
        
        let backgroundFields = document.getElementsByClassName('background-field');
    
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = true;
            $('.background-field').removeClass('addButton');
        }

        $('body').css('overflowY','hidden');
        PingAnimationForOpenDeletePopUp();
        $('#main').fadeTo(800,0.5);
    }

    // close deletePopUp using Esc key
    $(document).keydown(function(event) {
        if (event.key === 'Escape') {
            if (activePopup === 'deletePopUp') {
                closeDeletePopUp();
            }
        }
    });

        $(document).mouseup(function(event) {
            if (clickEvent === 'deletePopUp' && !$('#deletePopUp').is(event.target) && $('#deletePopUp').has(event.target).length === 0) {
                closeDeletePopUp();
            }
        });

    // close delete popup
    function closeDeletePopUp() {
        if (activePopup === 'deletePopUp') { 
            activePopup = null;
        }

        if (clickEvent === 'deletePopUp') { 
            clickEvent = null;
        }
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','false').css('pointerEvents','visible');
        });
        
        let closeDeletePopUp = $('#deletePopUp');
        closeDeletePopUp.addClass('ping-out');
        closeDeletePopUp.on('animationend', function animationEndHandler() {
            closeDeletePopUp.removeClass('ping-out ping-in').off('animationend', animationEndHandler).hide();
        });
      
        // Reference of text input and textarea
        $('#addTitle, #addTxt, #searchTxt,#addBtn, #profileImageBtn, #featuresBtn, #createNoteButton').prop('disabled', false);
        $('#addBtn').addClass('addButton');
        $('#searchTxt').addClass('search');
        $('#home, #favButton').addClass('home');
        
        // Enable all background fields
        let backgroundFields = document.getElementsByClassName('background-field');
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = false;
            $('.background-field').addClass('addButton');
        }
      
        document.body.style.overflowY = 'visible';
        $('#main').fadeTo(800,1);
        
      }
      

    function deleteItem() {
            let yesBtn = $('#yesButton');
            yesBtn.html('Deleting...').addClass('text-md');
            yesBtn.attr('disabled','true');

            let noBtn = $('#noButton');
            noBtn.attr('disabled','true');
            
            let closeBtn = $('#closeBtn');
            closeBtn.attr('disabled','true');
        
        // delete note based on the currentDeleteIndex
        setTimeout(() => {
            yesBtn.html('Yes').addClass('text-xl');
            yesBtn.prop('disabled',false);
            noBtn.prop('disabled',false);
            closeBtn.prop('disabled',false);
            deleteNote(currentDeleteIndex);
            closeDeletePopUp();
            successDltMsg();
        }, 800);
        
    }

    function PingAnimationForOpenDeletePopUp() {
        $('#deletePopUp').addClass('ping-animation-open');
    }
    
function successDltMsg() {
    let successDltMsg = $('#successMsg');

    let noteContainer = $('#noteContainer');
    noteContainer.removeClass('successMsg');
    noteContainer.addClass('removeMsg'); // include css class
    
    let createMsg = $('#createMsg');
    createMsg.html('Your note is successfully deleted').css('color', '#cc0000');
    
    const SVG = `<i class='bx bxs-trash text-lg lg:text-2xl text-[#cc0000]'></i>`;
    $('#SVG').html(SVG);

        successDltMsg.addClass('success scrollTopToDown show').show();
    // timeout function for hide animation message
        setTimeout(function () {
            successDltMsg.removeClass('scrollTopToDown').hide();
        }, 2000);
}

$('#home, #favButton').addClass('home');
$('#searchTxt').addClass('search');
$('#addBtn').addClass('addButton');
$('.background-field').addClass('addButton');