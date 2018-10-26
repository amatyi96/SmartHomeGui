/**
 * Ennek a gombnak(switch) a hatására kapcsol be, illetve ki az edit mode.
 */
editModeToggle = document.getElementById('editModeToggleDiv');

/**
 * Elemek, amelyek elérhetőek az edit mode-ban.
 */
var editModeItem = ["addRoomButton", "card-footer1", "card-footer2", "card-footer3", "plusGridButton"];



editModeToggle.onclick = function() {
    editModeToggleValue = document.getElementById('editModeToggle').checked;

    if(editModeToggleValue) {
        for(var i = 0; i < editModeItem.length; i++) {
            document.getElementById(editModeItem[i]).style.display = "none";
        }
    } else {
        for(var i = 0; i < editModeItem.length; i++) {
            document.getElementById(editModeItem[i]).style.display = "initial";
        }
    }
};