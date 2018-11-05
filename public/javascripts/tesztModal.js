/**
 * Egy szenzort reprezentáló Card jobb felső sarkában található ikonra kattintva egy Modal nyílik le, aminek input mezői ki vannak töltve az aktuális szenzor értékeivel!
 */
$(document).on("click", ".sensorSetting-btn", function () {
    var mySensorId = $(this).data('id');

    $.get( 'http://localhost:3000/api/getSensorByID/' + mySensorId, function( data ) {
        $('.modal-content #sensorUpdateForm').attr('action', '/api/updateSensor/' + mySensorId);
        $('.modal-body #selectedIconId').val(data.icon);
        $('.modal-body #sensorNameId').val(data.name);
        $('.modal-body #functionRadioButton-' + data.duty).prop('checked', true);
    });

    /*$.ajax({
        url: "http://localhost:3000/api/getSensorByID/" + "5bd6150cf3608d32a40e876d",
        type: "GET",
        success: function(result) {
            console.log(result);
        },
        error: function(error) {
            console.log('${error}')
        }
    })*/
});


/**
 * Szoba modal feltöltése adatokkal!
 */
$(document).on("click", ".roomSetting-btn", function () {
    var myRoomId = $(this).data('id');

    $.get( 'http://localhost:3000/api/getRoomByID/' + myRoomId, function( data ) {
        $('.modal-body #currentRoomName').val(data.name);
    });
});

/**
 * Setting Room Modal - delete room
 */
$(document).on("click", ".roomDelete-btn", function () {
    var myRoomId = $(this).data('id');
    $('#roomSettingModal').modal('hide');
    

    $.get( 'http://localhost:3000/api/deleteRoom/' + myRoomId, function() {
        window.location.assign('/');
    });
});