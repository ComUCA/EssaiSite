if (Modernizr.touch) {
    scrollme.init_if = function() { return(false);}
} else {
    scrollme.init_if = function() { return(true);}
}

function fullscreenFix(){
    var h = $('body').height();
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        var remainingH = 0;
        if(path.hasClass("parallax")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();






var selectorE = '.galerie a';
var instanceE = $( selectorE ).imageLightbox({
    onStart:     function() { overlayOn(); navigationOn(instanceE, selectorE); },
    onEnd:       function() { overlayOff(); navigationOff(); activityIndicatorOff(); },
    onLoadStart: function() { activityIndicatorOn(); },
    onLoadEnd:   function() { navigationUpdate( selectorE ); activityIndicatorOff(); }
});


var form_errors = $('.field.error');
if (form_errors.length > 0) {
    $('html, body').animate({
        scrollTop: form_errors.first().parents('.pfg-form').offset().top + 100
    }, 1000);
}



$('.navbar a[href^="#"]').click(function(e) {
    var href = $(this).attr('href');
    if (href != '#') {
        var body = $('body');
        var scrollPos = body.find(href).offset().top - body.data('offset') + 1;
        $('body, html').animate({scrollTop: scrollPos}, 500);
        return false;
    }
});
