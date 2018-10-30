$(document).on("click", ".sensorSetting", function () {
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



/*
$('body').on("click", ".sensorSetting", () => {
    //var cardDiv = $(this).closest(".card");
    var cardId = $(this).data("cardid");
    alert(cardId);
});*/