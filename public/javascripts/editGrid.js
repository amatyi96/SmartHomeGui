$(function () {
  var options = {
    cellHeight: '100',
    minWidth: '1000',
    verticalMargin: 10,
    disableDrag: true,
    disableResize: true
  };
  $('.grid-stack').gridstack(options);

  this.saveGrid = function () {
    this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
      el = $(el);
      var node = el.data('_gridstack_node');
      return {
        id: node.id,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height
      };
    }, this);
    
    $.post( 'http://localhost:3000/api/updateSensorCard', {'data': JSON.stringify(this.serializedData)}, function( data ) {
        console.log(data);
    });
    
  }.bind(this);

  $('#save-grid').click(this.saveGrid);
});

$(document).ready( function() {
  var grid = $('.grid-stack').data('gridstack');

  $('.grid-stack-item').each(function() {
    var gridstackItemContentHeight = $(this).find('.grid-stack-item-content')[0].scrollHeight + $('.grid-stack').data('gridstack').opts.verticalMargin;
    var plusDivHeight = $(this).find('.tesztDiv').height() + $('.grid-stack').data('gridstack').opts.verticalMargin;
    var minHeight = Math.ceil((gridstackItemContentHeight - plusDivHeight)  / ($('.grid-stack').data('gridstack').cellHeight() + $('.grid-stack').data('gridstack').opts.verticalMargin));

    grid.minHeight($(this), minHeight);
    grid.resize($(this), null, minHeight);
  });
});

$('.grid-stack .grid-stack-item').on('resize', function (event, content) {
  var grid = $('.grid-stack').data('gridstack');

  var gridstackItemContentHeight = $(this).find('.grid-stack-item-content')[0].scrollHeight + $('.grid-stack').data('gridstack').opts.verticalMargin;
  var plusDivHeight = $(this).find('.tesztDiv').height() + $('.grid-stack').data('gridstack').opts.verticalMargin;
  var minHeight = Math.ceil((gridstackItemContentHeight - plusDivHeight)  / ($('.grid-stack').data('gridstack').cellHeight() + $('.grid-stack').data('gridstack').opts.verticalMargin));
  
  grid.minHeight($(this), minHeight);
});


$(window).resize(function() {
  var window_width = $(window).width();

  if(window_width > 1000 && window_width < 1350) {
    twoColumnMode();
  }
});

twoColumnMode = function() {
  var grid = $('.grid-stack').data('gridstack');
  var area = new Area();

  $('.grid-stack-item').each(function() {
    if($(this).attr("data-gs-width") <= 5) {
      grid.minWidth($(this), 4);
      grid.resize($(this), 4, null);
    }
    

    var x = 0;
    var y = 0;
    var width = $(this).attr("data-gs-width");
    var height = $(this).attr("data-gs-height");
    
    while( !area.isAreaEmpty(x, y, width, height)) {
      x++;

      if( x > 12) {
        y++;
        x = 0;
      }
    }
    
    console.log("Beszúrás történ a következő helyre: ");
    grid.update($(this), x, y, width, height);
    console.log("X: " + x);
    console.log("Y: " + y);
    console.log("Width: " + width);
    console.log("Height: " + height);
  });
}

function Grid(id, x, y, width, height) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.width  = width;
  this.height = height;
}

function Area() {
  this.Grids = [];
}

Area.prototype.isAreaEmpty = function(x, y, width, height) {
  var isX = false;
  var isY = false;

  var result = this.Grids.every(item => {
    if( parseInt(item.x) + parseInt(item.width) <= parseInt(x) && parseInt(x) + parseInt(width) < 13) {
      isX = true;
    } else {
      isX = false;
    }

    if( parseInt(item.y) + parseInt(item.height) < parseInt(y) ) {
      isY = true;
    } else {
      isY = false;
    }
    
    return isX || isY;
  });
  
  if(result || this.Grids.length == 0) {
    this.Grids.push(new Grid("0", x, y, width, height));
    return true;
  } else {
    return false;
  }
}