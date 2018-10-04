
var components = $('li.list-rooms-group');
var itemTemplate = $('a.list-rooms');
var rooms = ["Room 1", "Room 2", "Room 3"];
var indexRooms = 0;

$('.find-room-btn').on('click', function() {
    console.log("Működik a gomb!");
    
   //components.html('');

    itemTemplate.clone().html(
        "Room " + (indexRooms+1)
    )
    .appendTo(components);
    indexRooms++;

    //components.slideDown();
});

$(document).ready(function() {
    console.log("Működik a gomb!");
    
   components.html('');
    $.each(rooms, function(index, item){
        itemTemplate.clone().html(
            item
        )
        .appendTo(components);
        indexRooms = index + 1;
    });
    //components.slideDown();
});