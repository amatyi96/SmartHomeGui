/**
 * Új szenzor hozzáadása - Modal - Név megjelenításe
 */
$('#nameDisplay').change(function() {
    $('#nameDisplayInputHide').val($('#nameDisplay').is(':checked'));
});

/**
 * Szenzor módosítása - Modal - Név megjelenításe
 */
$('#settingNameDisplay').change(function() {
    $('#settingNameDisplayInputHide').val($('#settingNameDisplay').is(':checked'));
});