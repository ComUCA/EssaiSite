$( document ).ready(function() {

	if (!$('body').hasClass('template-theming-controlpanel-mapper')) {
		$('.bxslider').each(function( index ) {
			var self = $(this);
			var agenda = self.hasClass('slider_agenda');

			self.bxSlider({
				captions: self.data('slider-captions') == '1',
				pager: self.data('slider-pager') == '1',
				auto: self.data('slider-auto') == '1',
				autoControls: self.data('slider-auto') == '1',
				pause: 7500,
				autoHover: true,
	            video: true,
				useCSS: false,
				adaptiveHeight: true,
				easing: 'easeOutExpo',
				speed: 750,

			    slideMargin: (agenda ? 1 : 0),
			    slideWidth: (agenda ? ((1170*91.6666/100)/3)-1 : 0),
			    minSlides: (agenda ? 2 : 1),
			    maxSlides: (agenda ? 3 : 1)
			});
		});
	}
});
