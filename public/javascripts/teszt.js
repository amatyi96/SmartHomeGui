/**
 * Ennek a gombnak(switch) a hatására kapcsol be, illetve ki az edit mode.
 */
editModeToggle = document.getElementById('editModeToggleDiv');

editModeToggle.onclick = function() {
    editModeToggleValue = document.getElementById('editModeToggle').checked;
    var editModeItem = document.getElementsByClassName('editModeItem');
    grid = $('.grid-stack').data('gridstack');

    if(editModeToggleValue && grid) {
        grid.disable();
    } else if(grid) {
        grid.enable();
    }

    Array.prototype.forEach.call( editModeItem, function(element) {
        if(editModeToggleValue) {
            element.style.display = "none";
        } else {
            element.style.display = "initial";
        }
    });

    calculateWrongHeight();
};

