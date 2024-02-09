// open side baar
function showSidebar() {
    let sidebarContainer = $('#sidebarContainer');

    sidebarContainer.show();

    sidebarContainer.addClass('sidebar-open');

    $('#addTitle').prop('disabled', true);
    $('#addTxt').prop('disabled', true);
    $('#addBtn').prop('disabled', true);
    $('#searchTxt').attr('disabled',true);
    $('#home').prop('disabled', true);
    $('#favButton').prop('disabled', true);
    $('#menuBtn').prop('disabled', true);
    $('#addBtn').removeClass('addButton');
    $('#home').removeClass('home');
    $('#favButton').removeClass('home');

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
    let closeSidebar = $('#sidebarContainer');

    closeSidebar.addClass('sidebar-close');    
    
    $('#addTitle').prop('disabled', false);
    $('#addTxt').prop('disabled', false);
    $('#addBtn').prop('disabled', false);
    $('#searchTxt').attr('disabled',false);
    $('#home').prop('disabled', false);
    $('#favButton').prop('disabled', false);
    $('#menuBtn').prop('disabled', false);
    $('#addBtn').addClass('addButton');
    $('#searchTxt').addClass('search');
    $('#home').addClass('home');
    $('#favButton').addClass('home');
    
    // Enable all background fields
    let backgroundFields = document.getElementsByClassName('background-field');
    for (var i = 0; i < backgroundFields.length; i++) {
        backgroundFields[i].disabled = false;
        $('.background-field').addClass('addButton');
    }

    $('body').css('overflow','visible');

    setTimeout(function () {
        closeSidebar.hide();
        closeSidebar.removeClass('sidebar-close');
    }, 300);
    $('#main').fadeTo(800,1);
}

$('#home').addClass('home');
$('#favButton').addClass('home');
$('#searchTxt').addClass('search');
$('#addBtn').addClass('addButton');
$('.background-field').addClass('addButton');