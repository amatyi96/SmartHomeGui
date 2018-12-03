$(function () {
	$.get( 'http://localhost:3000/api/getAllColorPicker', function( dutyColorPickers ) {
		dutyColorPickers.forEach( dutyColorPicker => {
			$('#cp-' + dutyColorPicker._id).colorpicker({
				format: 'hex',
				autoInputFallback: false
			});		
		});	
	});
});