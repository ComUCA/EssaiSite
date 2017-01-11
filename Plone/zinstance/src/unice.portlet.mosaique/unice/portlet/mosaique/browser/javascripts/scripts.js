$( document ).ready(function() {

	if (!$('body').hasClass('template-theming-controlpanel-mapper')) {

		$('.mosaique-video').fitVids();

		$('.mosaique-more-items').find('a').click(function(e) {
			e.preventDefault();
			$('.mosaique-col-list').slideDown();
		});
	}
});