// open side baar
function showSidebar() {
    
    let sidebarContainer = $('#sidebarContainer');

    sidebarContainer.show();

    sidebarContainer.addClass('sidebar-open');

    let titleInput = $('#addTitle');
    let textarea = $('#addTxt');
    let addBtn = $('#addBtn');
    
    titleInput.prop('disabled', true);
    textarea.prop('disabled', true);
    addBtn.prop('disabled', true);
    
    let backgroundFields = document.getElementsByClassName('background-field');
    for (var i = 0; i < backgroundFields.length; i++) {
        backgroundFields[i].disabled = true;
    }

    $('body').css('overflowY','hidden');
    menuClose();
    event.preventDefault();
}

// close side baar
function closeSidebar() {    
    let closeSidebar = $('#sidebarContainer');

    closeSidebar.addClass('sidebar-close');

    let titleInput = document.getElementById('addTitle');
    let textarea = document.getElementById('addTxt');
    let addBtn = document.getElementById('addBtn');
    
    titleInput.disabled = false;
    textarea.disabled = false;
    addBtn.disabled = false;

    // Enable all background fields
    let backgroundFields = document.getElementsByClassName('background-field');
    for (var i = 0; i < backgroundFields.length; i++) {
        backgroundFields[i].disabled = false;
    }

    $('body').css('overflow','visible');

    setTimeout(function () {
        closeSidebar.hide();
        closeSidebar.removeClass('sidebar-close');
    }, 300);
}