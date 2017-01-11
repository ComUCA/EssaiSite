jQuery(function($){
    $(document).on('loadInsideOverlay', function() {
        $('#wrap, footer, #carousel_fond').attr('style', '-webkit-filter: blur(5px);');
    });
     $(document).on('onBeforeClose', function() {
        $('#wrap, footer, #carousel_fond').attr('style', '-webkit-filter: blur(0);');
    });


    $('#portlets-in-header a#personaltools-login').prepOverlay({
            subtype: 'ajax',
            filter: common_content_filter,
            cssclass: 'overlay-folder-factories'
        }
    );
});
