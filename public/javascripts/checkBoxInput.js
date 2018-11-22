$('#displayName').change(function() {
    $('#displayNameInputHide').val($('#displayName').is(':checked'));
    console.log($('#displayName').is(':checked'));
});