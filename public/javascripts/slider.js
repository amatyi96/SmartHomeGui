var slider = new Slider('#sensorDutySlider', {
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});