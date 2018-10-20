var components = $('li.list-rooms-group');
var itemTemplate = $('a.list-rooms');
var rooms = ["Room 1", "Room 2", "Room 3"];

$('.new-room-btn').on('click', function() {
    $('#addRoomModal').modal('hide');

    /*
    var modalInput = $('#exampleInputEmail1').val();
    
   //components.html('');
    itemTemplate.clone().html(
        modalInput
    )
    .appendTo(components);
    
    //components.slideDown();*/
});


/*
$(document).ready(function() {
   components.html('');
    $.each(rooms, function(index, item){
        itemTemplate.clone().html(
            item
        )
        .appendTo(components);
    });
    //components.slideDown();
});*/