$(document).ready(function() {
    //Alapértelmezetten ne látszódjanak a kimenet/bemenet hozzáadó gombok!
    $(".addNewLink").hide();
});

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
});


/**
 * Szoba modal feltöltése adatokkal!
 */
$(document).on("click", ".roomSetting-btn", function () {
    var myRoomId = $(this).data('id');

    $.get( 'http://192.168.1.108:3000/api/getRoomByID/' + myRoomId, function( data ) {
        $('.modal-body #currentRoomName').val(data.name);
    });
});

/**
 * Setting Room Modal - delete room
 */
$(document).on("click", ".roomDelete-btn", function () {
    var myRoomId = $(this).data('id');
    $('#roomSettingModal').modal('hide');

    $.get( 'http://localhost:3000/api/deleteRoom/' + myRoomId, function(data) {
        window.location.assign(data);
    });
});

$(document).on("click", ".sensorAddDuty-btn", function () {
    var mySensorId = $(this).data('id');
    console.log(mySensorId);
    $('.modal-body #addDuty_sensor_id').val(mySensorId);
});

/**
 * Funkció kiválasztása után elérhetővé válnak az Kimeneti/bemeneti linkek!
 * Iconok is cserélődnek!
 */
$('#dutySelectDropdown').on('change', function() {
    deleteAllInputField();
    $('.addDutySelectLabel').text('');

    if(this.value == 'textDisplay') {
        $('.addDutySelectLabel').append('<i class="fas fa-align-center"></i>');
        insertInputField();
    } else if(this.value == 'colorPicker') {
        $('.addDutySelectLabel').append('<i class="fas fa-palette"></i>');
        insertOutputField();
        insertInputField();
    } else if(this.value == 'switcher') {
        $('.addDutySelectLabel').append('<i class="fas fa-toggle-on"></i>');
        insertOutputField();
        insertInputField();
    } else if(this.value == 'slider') {
        $('.addDutySelectLabel').append('<i class="fas fa-sliders-h"></i>');
        insertOutputField();
        insertInputField();
    } else if(this.value == 'universalSwitcher') {
        $('.addDutySelectLabel').append('<i class="fas fa-toggle-on"></i>');
        $(".addNewLink").show();            
    } else {
        $('.addDutySelectLabel').text('Funkció');
    }
});

// Új kimeneti link mező beszúrása
$('.addNewOutputField').click( function() {
    insertOutputField();
});

// Új bemeneti link mező beszúrása
$('.addNewInputField').click( function() {
    insertInputField();
});

// Beszúr egy új bemeneti input mezőt
function insertInputField() {
    var newInputField = $("<div class='input-group input-group-sm mb-3 outputDutyLink'>" +
                            "<div class='input-group-prepend'>" +
                                "<span class='input-group-text' id='inputGroup-sizing-sm'>Bemenet</span> </div>" +
                                    "<input class='form-control' type='text' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' placeholder='Link' /></div>"
                        );
    $('.addDutyModalBody').append(newInputField);
}

// Beszúr egy új kimenet input mezőt
function insertOutputField() {
    var newOutputField = $("<div class='input-group input-group-sm mb-3 inputDutyLink'>" +
                                "<div class='input-group-prepend'>" +
                                    "<span class='input-group-text' id='inputGroup-sizing-sm'>Kimenet</span></div>" +
                                        "<input class='form-control' type='text' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' placeholder='Link' /></div>");
    $('.addDutyModalBody').append(newOutputField);
}

// Törli az összes input mezőt az adott div-ben
function deleteAllInputField() {
    $('.addDutyModalBody').empty();
    $(".addNewLink").hide();
}