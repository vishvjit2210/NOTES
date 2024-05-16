function logOut() {
    successLoggedOutMsg();
    setTimeout(function() {
        window.location.href = 'index.html';
        localStorage.removeItem('userImage');
        previewImage.src = defaultImage;
    }, 1300);
}

    function showLogOutPopUp() {
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','true').css('pointerEvents','none');
        });
        $('#logOutPopUp').show();
        $('#addTitle, #addTxt, #searchTxt, #addBtn, #home, #favButton, #menuBtn').prop('disabled', true);
        $('#addBtn').removeClass('addButton');
        $('#home, #favButton').removeClass('home');
        
        let backgroundFields = document.getElementsByClassName('background-field');
    
        for (var i = 0; i < backgroundFields.length; i++) {
            backgroundFields[i].disabled = true;
            $('.background-field').removeClass('addButton');
        }

        $('body').css('overflowY','hidden');
    }

    // close delete popup
    function closeLogOutPopUp() {
        $('.bx-star').each(function(){
            $(this).attr('data-disabled','false').css('pointerEvents','visible');
        });
        
        let closeDeletePopUp = $('#logOutPopUp');
        closeDeletePopUp.addClass('ping-out');
        closeDeletePopUp.on('animationend', function animationEndHandler() {
            closeDeletePopUp.removeClass('ping-out ping-in').off('animationend', animationEndHandler).hide();
        });
      
        // Reference of text input and textarea
        $('#addTitle, #addTxt, #searchTxt,#addBtn, #home, #favButton, #menuBtn').prop('disabled', false);
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
        }