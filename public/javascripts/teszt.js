/**
 * Ennek a gombnak(switch) a hatására kapcsol be, illetve ki az edit mode.
 */
editModeToggle = document.getElementById('editModeToggleDiv');

editModeToggle.onclick = function() {
    editModeToggleValue = document.getElementById('editModeToggle').checked;
    var editModeItem = document.getElementsByClassName('editModeItem');
    grid = $('.grid-stack').data('gridstack');

    for(var i = 0; i < editModeItem.length; i++) {
        if(editModeToggleValue) {
            editModeItem[i].style.display = "none";
            grid.disable();
        } else {
            editModeItem[i].style.display = "initial";
            grid.enable();
        }
    }
};