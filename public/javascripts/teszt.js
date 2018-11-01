/**
 * Ennek a gombnak(switch) a hatására kapcsol be, illetve ki az edit mode.
 */
editModeToggle = document.getElementById('editModeToggleDiv');

editModeToggle.onclick = function() {
    editModeToggleValue = document.getElementById('editModeToggle').checked;
    var editModeItem = document.getElementsByClassName('editModeItem');

    for(var i = 0; i < editModeItem.length; i++) {
        if(editModeToggleValue) {
            editModeItem[i].style.display = "none";
        } else {
            editModeItem[i].style.display = "initial";
        }
    }
};