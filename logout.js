function logOut() {
    successLoggedOutMsg();
    setTimeout(function() {
        window.location.href = 'index.html';
        localStorage.removeItem('userImage');
        previewImage.src = defaultImage;
    }, 1300);
}

    let activePopup = null;
    let clickEvent = null;
    function showLogOutPopUp() {
        activePopup = 'logOutPopUp';
        clickEvent = 'logOutPopUp';
        $('#logOutPopUp').removeClass('ping-out');
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','true').css('pointerEvents','none');
        });
        $('#logOutPopUp').show();
        $('#addTitle, #addTxt, #searchTxt, #addBtn, #profileImageBtn, #featuresBtn, #createNoteButton').prop('disabled', true);
        $('#addBtn').removeClass('addButton');
        $('#home, #favButton').removeClass('home');
        
        let backgroundFields = document.getElementsByClassName('background-field');
    
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = true;
            $('.background-field').removeClass('addButton');
        }

        $('body').css('overflowY','hidden');
        $('#main').fadeTo(400,0.5); 
    }
    
    $(document).keydown(function(event) {
        if (event.key === 'Escape') {
            if (activePopup === 'logOutPopUp') {
                closeLogOutPopUp();
            }
        }
    });

        $(document).mouseup(function(event) {
            if (clickEvent === 'logOutPopUp' && !$('#logOutPopUp').is(event.target) && $('#logOutPopUp').has(event.target).length === 0) {
                closeLogOutPopUp();
            }
        });

    // closeLogOutPopUp using Esc key
    function closeLogOutPopUp() {
        if (activePopup === 'logOutPopUp'){
            activePopup = null;
        }
        if (clickEvent === 'logOutPopUp'){
            clickEvent = null;
        }
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','false').css('pointerEvents','visible');
        });
        
        let closeLogOutPopUp = $('#logOutPopUp');
        closeLogOutPopUp.addClass('ping-out');
        closeLogOutPopUp.on('animationend', function animationEndHandler() {
            closeLogOutPopUp.removeClass('ping-out ping-in').off('animationend', animationEndHandler).hide();
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

    function successLoggedOutMsg() {
        closeLogOutPopUp();
        let successLoggedOutMsg = $('#successMsg');
            
        let noteContainer = $('#noteContainer');
        noteContainer.removeClass('removeMsg');
        noteContainer.addClass('successMsg'); // include css class
            
        let createMsg = $('#createMsg');
        createMsg.html('You have successfully Logout').css('color', '#00cc00');
            
        const SVG = `<i class='bx bx-log-out text-lg lg:text-2xl text-[#00cc00]'></i>`;
        $('#SVG').html(SVG);

        successLoggedOutMsg.addClass('success scrollTopToDown show').show();
        // timeout function for hide animation message
        setTimeout(function () {
            successLoggedOutMsg.removeClass('scrollTopToDown').hide();
        }, 2000);
        if (activePopup === 'sidebarContainer'){
            activePopup = null;  
        } 
    }