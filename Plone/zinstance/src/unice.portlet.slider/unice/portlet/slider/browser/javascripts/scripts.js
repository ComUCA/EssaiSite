$( document ).ready(function() {


    if (!$('body').hasClass('template-theming-controlpanel-mapper')) {

		$('.bxslider').each(function( index ) {
			var self = $(this);
			self.bxSlider({
				captions: self.data('slider-captions') == '1',
				pager: self.data('slider-pager') == '1',
				auto: self.data('slider-auto') == '1',
				pause: 10000,
	            video: true,
				useCSS: false,
				adaptiveHeight: true,
				easing: 'easeOutExpo',
				speed: 750
			});
		});

	}
});
