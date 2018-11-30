$(function () {
  var options = {
    cellHeight: '40',
    minWidth: '950',
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

    var window_mode = checkWindowSize();
    $.post( 'http://localhost:3000/api/updateSensorCard', {'data': JSON.stringify(this.serializedData), 'window_mode': window_mode}, function( data ) {
        console.log(data);
    });
    
  }.bind(this);

  $('#save-grid').click(this.saveGrid);
});

// Leellenőrzi az aktuális böngésző ablak méretét
function checkWindowSize() {
  var window_width = window.innerWidth;

  if(window_width > 1200 && window_width < 1450) {
    return "3columns";
  } else if( window_width < 1200) {
    return "2columns";
  } else {
    return "normal";
  }
}

// Lekérdezi az összes szenzor adatait
var allSensors = $.get('http://localhost:3000/api/getAllSensor');

$(document).ready( function() {
  var window_width = window.innerWidth;
  var grid = $('.grid-stack').data('gridstack');

  // Ha nem OneColumnMode-ba vagyunk!
  if(grid) {
    // Betöltéskor meg kell vizsgálni, hogy minden kártya megfelelő méretű, ha nem akkor beállítjuk.
    $('.grid-stack-item').each(function() {
      var gridstackItemContentHeight = $(this).find('.grid-stack-item-content')[0].scrollHeight + $('.grid-stack').data('gridstack').opts.verticalMargin;
      var plusDivHeight = $(this).find('.tesztDiv').height() + $('.grid-stack').data('gridstack').opts.verticalMargin;
      var minHeight = Math.ceil((gridstackItemContentHeight - plusDivHeight)  / ($('.grid-stack').data('gridstack').cellHeight() + $('.grid-stack').data('gridstack').opts.verticalMargin));

      if($(this).attr("data-gs-height") < minHeight) {
        grid.minHeight($(this), minHeight);
        grid.resize($(this), null, minHeight);
      }
    }); 

    // Megvizsgáljuk az oldal betöltésekor, hogy mekkora a böngésző mérete és az alapján töltjük be az oldalt.
    allSensors.done( function(sensors) {
      if(window_width > 1200 && window_width < 1450) {
        // Megvizsgáljuk, hogy volt-e már 3 oszlopos módban mentés! 
        var is3ColActive = sensors.some( function(sensor) {
          if(sensor.position_3col_active) {
            return true;
          } else {
            return false;
          }
        });

        if(is3ColActive) {
          console.log("3 column adatbázisból");

          sensors.forEach( sensor => {
            $('.grid-stack-item').each(function() {
              if($(this).attr('data-gs-id') == sensor._id) {
                grid.update($(this), sensor.position_3col.x, sensor.position_3col.y, sensor.position_3col.width, sensor.position_3col.height);
              }
            });
          });
        } else {
          console.log("3 column rendezéssel");

          $('.grid-stack-item').each(function() {
            grid.minWidth($(this), 4);
            grid.resize($(this), 4, null);
          });

          threeColumnMode();
        }    
      } else if( window_width > 950 && window_width < 1200) {
        // Megvizsgáljuk, hogy volt-e már 2 oszlopos módban mentés! 
        var is2ColActive = sensors.some( function(sensor) {
          if(sensor.position_2col_active) {
            return true;
          } else {
            return false;
          }
        });

        if(is2ColActive) {
          console.log("2 column adatbázisból");

          sensors.forEach( sensor => {
            $('.grid-stack-item').each(function() {
              if($(this).attr('data-gs-id') == sensor._id) {
                console.log(sensor.position_2col.x);
                grid.update($(this), sensor.position_2col.x, sensor.position_2col.y, sensor.position_2col.width, sensor.position_2col.height);
              }
            });
          });
        } else {
          console.log("2 column rendezéssel");

          $('.grid-stack-item').each(function() {
            grid.minWidth($(this), 6);
            grid.resize($(this), 6, null);
          });

          twoColumnMode();
        }
      }
    });
  }
});

$('.grid-stack .grid-stack-item').on('resize', function (event, content) {
  var grid = $('.grid-stack').data('gridstack');

  // Ha van grid
  if(grid) {
    var gridstackItemContentHeight = $(this).find('.grid-stack-item-content')[0].scrollHeight + $('.grid-stack').data('gridstack').opts.verticalMargin;
    var plusDivHeight = $(this).find('.tesztDiv').height() + $('.grid-stack').data('gridstack').opts.verticalMargin;
    var minHeight = Math.ceil((gridstackItemContentHeight - plusDivHeight)  / ($('.grid-stack').data('gridstack').cellHeight() + $('.grid-stack').data('gridstack').opts.verticalMargin));
  
    grid.minHeight($(this), minHeight);
  }
});

// Megjegyezzük az elöző böngésző ablak méretét, hogy biztos csak akkor történjen változás, ha az ablakot méreteztük!
var last_window_width = $(window).width();

// Ha az ablakot méretezzük, akkor is váltson módot, illetve vissza!;
$(window).resize( function() {
  var window_width = window.innerWidth;

  if(last_window_width != window_width) {
    var grid = $('.grid-stack').data('gridstack');

    if(grid) {
      allSensors.done( function(sensors) {
        
        if(window_width > 1200 && window_width < 1450) {
          // Megvizsgáljuk, hogy volt-e már 3 oszlopos módban mentés! 
          var is3ColActive = sensors.some( function(sensor) {
            if(sensor.position_3col_active) {
              return true;
            } else {
              return false;
            }
          });

          if(is3ColActive) {
            console.log("3 column adatbázisból");

            sensors.forEach( sensor => {
              $('.grid-stack-item').each(function() {
                if($(this).attr('data-gs-id') == sensor._id) {
                  grid.minWidth($(this), 4);
                  grid.update($(this), sensor.position_3col.x, sensor.position_3col.y, sensor.position_3col.width, sensor.position_3col.height);
                }
              });
            });
          } else {
            console.log("3 column rendezéssel");

            $('.grid-stack-item').each(function() {
              grid.minWidth($(this), 4);
              grid.resize($(this), 4, null);
            });

            threeColumnMode();
          }    
        } else if( window_width > 950 && window_width < 1200) {
          // Megvizsgáljuk, hogy volt-e már 2 oszlopos módban mentés! 
          var is2ColActive = sensors.some( function(sensor) {
            if(sensor.position_2col_active) {
              return true;
            } else {
              return false;
            }
          });

          if(is2ColActive) {
            console.log("2 column adatbázisból");

            sensors.forEach( sensor => {
              $('.grid-stack-item').each(function() {
                if($(this).attr('data-gs-id') == sensor._id) {
                  grid.minWidth($(this), 6);
                  grid.update($(this), sensor.position_2col.x, sensor.position_2col.y, sensor.position_2col.width, sensor.position_2col.height);
                }
              });
            });
          } else {
            console.log("2 column rendezéssel");

            $('.grid-stack-item').each(function() {
              grid.minWidth($(this), 6);
              grid.resize($(this), 6, null);
            });

            twoColumnMode();
          }
        } else {
          sensors.forEach( sensor => {
            $('.grid-stack-item').each(function() {
              if($(this).attr('data-gs-id') == sensor._id) {
                grid.minWidth($(this), 3);
                grid.update($(this), sensor.position.x, sensor.position.y, sensor.position.width, sensor.position.height);
              }
            });
          });
        }
      });
    }
    last_window_width = window_width;
  }
});

/**
 * Grid számítások
 */
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


twoColumnMode = function() {
  var grid = $('.grid-stack').data('gridstack');
  var area = new Area();

  $('.grid-stack-item').each(function() {
    if($(this).attr("data-gs-width") <= 6) {
      grid.minWidth($(this), 6);
      grid.resize($(this), 6, null);
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

    grid.update($(this), x, y, width, height);
  });
}


threeColumnMode = function() {
  var grid = $('.grid-stack').data('gridstack');
  var area = new Area();

  $('.grid-stack-item').each(function() {
    if($(this).attr("data-gs-width") <= 6) {
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

    grid.update($(this), x, y, width, height);
  });
}

function calculateWrongHeight() {
  $('.grid-stack-item').each(function() {
    var gridstackItemContentHeight = $(this).find('.grid-stack-item-content')[0].scrollHeight + $('.grid-stack').data('gridstack').opts.verticalMargin;
    var plusDivHeight = $(this).find('.tesztDiv').height() + $('.grid-stack').data('gridstack').opts.verticalMargin;
    var minHeight = Math.ceil((gridstackItemContentHeight - plusDivHeight)  / ($('.grid-stack').data('gridstack').cellHeight() + $('.grid-stack').data('gridstack').opts.verticalMargin));

    if( $(this).attr("data-gs-height") < minHeight ) {
      grid.minHeight($(this), minHeight);
      grid.resize($(this), null, minHeight);
    }
  });
}