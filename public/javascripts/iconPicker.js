// _.invert(dict)['Villám'];
/*var dict = {
    'fas fa-bolt': 'Villám',
    'fas fa-cloud': 'Felhő',
    'fas fa-cloud-moon': 'Felhő-hold',
    'fas fa-cloud-moon-rain': 'Felhő-hold-eső',
    'fas fa-cloud-rain': 'Felhő-eső',
    'fas fa-cloud-sun': 'Felhő-nap',
    'fas fa-cloud-sun-rain': 'Felhő-nap-eső',
    'fas fa-eye-dropper': 'Színválasztó',
    'fas fa-lightbulb':  'Égő-felkapcsolt',
    'far fa-lightbulb': 'Égő-lekapcsolt',
    'fas fa-moon': 'Hold',
    'fas fa-sliders-h': 'Csúszka',
    'fas fa-snowflake': 'Hópihe',
    'fas fa-star': 'Csillag',
    'fas fa-tachometer-alt': 'Mérő',
    'fas fa-temperature-high': 'Hőmérő-tele',
    'fas fa-temperature-low': 'Hőmérő-alacsony',
    'fas fa-thermometer-empty': 'Mérő-üres',
    'fas fa-thermometer-full': 'Mérő-tele',
    'fas fa-thermometer-half': 'Mérő-félig'
};*/

$('#modalIconPicker').iconpicker('setIconset', {
    icons: [
      '',  
      'fas fa-bolt',
      'fas fa-cloud',
      'fas fa-cloud-moon',
      'fas fa-cloud-moon-rain',
      'fas fa-cloud-rain',
      'fas fa-cloud-sun',
      'fas fa-cloud-sun-rain',
      'fas fa-eye-dropper',
      'fas fa-lightbulb',
      'far fa-lightbulb',
      'fas fa-moon',
      'fas fa-sliders-h',
      'fas fa-snowflake',
      'fas fa-star',
      'fas fa-tachometer-alt',
      'fas fa-temperature-high',
      'fas fa-temperature-low',
      'fas fa-thermometer-empty',
      'fas fa-thermometer-full',
      'fas fa-thermometer-half'
    ]
}).iconpicker('setSearch', false);

$('#modalIconPicker').on('change', function(e) {
    $('.newSensorIconInput').val(e.icon);
});