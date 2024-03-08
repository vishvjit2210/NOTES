// open side baar
function showSidebar() {
    $('.bx-star').each(function() {
        $(this).attr('data-disabled', 'true').css('pointerEvents','none');
    });

    let sidebarContainer = $('#sidebarContainer');

    sidebarContainer.show();

    sidebarContainer.addClass('sidebar-open');

    $('#addTitle, #addTxt, #searchTxt, #addBtn, #home, #favButton, #menuBtn').prop('disabled', true);
    $('#addBtn').removeClass('addButton');
    $('#home, #favButton').removeClass('home');

    let backgroundFields = document.getElementsByClassName('background-field');
    for (var i = 0; i < backgroundFields.length; i++) {
        backgroundFields[i].disabled = true;
        $('.background-field').removeClass('addButton');
    }

    $('body').css('overflowY','hidden');
    $('#main').fadeTo(700,0.5);
    menuClose();
    event.preventDefault();
}

// close side baar
function closeSidebar() { 
    
    $('.bx-star').each(function() {
        $(this).attr('data-disabled','false').css('pointerEvents','visible');
    });

    let closeSidebar = $('#sidebarContainer');
    closeSidebar.addClass('sidebar-close');    
    
        $('#addTitle, #addTxt, #searchTxt, #addBtn, #home, #favButton, #menuBtn').prop('disabled', false);
        $('#addBtn').addClass('addButton');
        $('#searchTxt').addClass('search');
        $('#home, #favButton').addClass('home');
    
    // Enable all background fields
    let backgroundFields = document.getElementsByClassName('background-field');
    for (var i = 0; i < backgroundFields.length; i++) {
        backgroundFields[i].disabled = false;
        $('.background-field').addClass('addButton');
    }

    $('body').css('overflow','visible');

    setTimeout(function () {
        closeSidebar.removeClass('sidebar-close').hide();
    }, 300);
    $('#main').fadeTo(800,1);
}

$('#home, #favButton').addClass('home');    
$('#searchTxt').addClass('search');
$('#addBtn, .background-field').addClass('addButton');