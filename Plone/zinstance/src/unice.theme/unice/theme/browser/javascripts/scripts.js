
/************************************************************************************/
/*** IMAGES CARREES *****************************************************************/
/************************************************************************************/

jQuery.fn.extend({
    carre: function(options) {
        options = $.extend({wrap:true, width:0, cls:''}, options);
        return this.each(function() {
            var w = (options.width > 0 ? options.width : ($(this).width() > $(this).height() ? $(this).width() : $(this).height()));
            var src = $(this).attr('src');
            var style = 'width:'+w+'px; height:'+w+'px; background-image:url('+src+')';
            if (options.wrap) {
                $(this).wrap('<span class="carre '+options.cls+'" style="'+style+'"></span>');
            } else {
                $(this).parent().attr('style', style);
            }
        });
    }
});
$('.carre').each(function() {
    $(this).find('img').carre({wrap:false, width: $(this).data('width'), 'cls':$(this).attr('class')});
});

//$('.portlet.portletStories a.list-group-item img').carre({width: 60, cls: 'img-circle img-cerclee pull-left'});



/************************************************************************************/
/*** FLICKR *************************************************************************/
/************************************************************************************/

/*
<dl data-user = "45020358@N02"
    data-set  = "72157624250327711"
    data-nbr  = "9"
    class     = "portlet portletFlickrAlbum">

    <dt class="portletHeader">Flickr UNS</dt>
    <dd class="portletItem"></dd>
</dl>
*/

/*$('.portletFlickrAlbum').each(function( index ) {
    var user = $(this).data('user');
    var sets = $(this).data('set');
    var nbr = $(this).data('nbr');

    var content = $(this).find('.portletItem');
    var footer = $(this).find('.portletFooter');

    // Sets
    var reg = new RegExp("[ ,;]+", "g");
    var setsList = sets.split(reg);
    for (var i=0; i<setsList.length; i++) {
        var set = setsList[i];
        var flickrFeedUrl = 'http://api.flickr.com/services/feeds/photoset.gne?set='+set+'&nsid='+user+'&lang=fr&jsoncallback=?';
        $.getJSON(
            flickrFeedUrl, {format: 'json'},
            function (data) {
                console.log(flickrFeedUrl);
                console.log(data);

                // Titre
                var prefix = 'Contenu provenant de ';
                var title = data.title.substring(prefix.length);
                content.append('<small>'+title+'</small>');
                content.append('<br class="visualClear"/>');

                // Photos
                $.each(data.items, function (i, item) {
                    var a = $('<a/>').attr({'href': item.link, 'data-toggle': 'tooltip',  'title': item.title, 'data-placement': 'left'});
                    var img = $('<img/>').attr('src', item.media.m.replace("_m.jpg", "_q.jpg"));

                    a.attr('style', 'float:left; width:33.3%; padding:1%');
                    img.attr('style', 'width:100%;');

                    a.tooltip();
                    a.append(img);
                    content.append(a);

                    if (i == nbr-1) return false;
                });
                content.append('<br class="visualClear"/><hr/>');
            }
        );
    }
    footer.append('<a href="http://www.flickr.com/photos/'+user+'" class="btn btn-primary btn-sm">Toutes les photos <i class="icon-chevron-right"></i></a>');

});*/

/************************************************************************************/
/*** SLIDER *************************************************************************/
/************************************************************************************/

// var slider = $('.slider').bxSlider({
//     slideWidth: 5000,
//     minSlides: 3,
//     maxSlides: 3,
//     slideMargin: 0,
//     adaptiveHeight:false,
//     pager: false,
//     hideControlOnEnd: true,
//     infiniteLoop:false
// });
//setTimeout(function() { slider.redrawSlider(); }, 100);



/************************************************************************************/
/*** TOOLTIP ************************************************************************/
/************************************************************************************/

$('[data-toggle="tooltip"]').tooltip();
$('dl.portlet.portletCalendar .event a, dl.portlet.portletCalendar .todayevent a').tooltip();
$('dl.portlet.portletBoutique .thumbnail a').tooltip({placement: 'bottom'});

/************************************************************************************/
/*** WEBAPP IOS *********************************************************************/
/************************************************************************************/

/*$( document ).on("click", "a", function( event ){
    event.preventDefault();
    location.href = $( event.target ).attr( "href" );
});*/


/************************************************************************************/
/*** GESTION AGENDA *****************************************************************/
/************************************************************************************/


/*$(function() {
    var dropzone = $('#dropzone');

    $('body.template-filuns_gestion_view .list-group-item a').draggable({
        revert: true,
        helper:'clone',
        zIndex: '10000',
        opacity: 0.85,
        appendTo: 'body',
        cursorAt: {top:0, left:0},
        distance: 20,
        helper: function(e) {
            return $('<h4><span class="label label-default">'+$(this).find('strong').text()+'</span></h4>');
        },
        start: function() {
            dropzone.show('blind', 'fast');
        },
        stop: function() {
            dropzone.hide('blind', 'fast');
        }
    }).each(function() {
        updateSubjects($(this));
    });

    dropzone.find('button').droppable({
        tolerance: 'pointer',
        hoverClass: 'btn-primary',
        drop: function(e, ui) {
            var element = $(ui.draggable);
            var url = element.attr('href')+'/ajouter_subject';
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: 'subject='+$(this).data('subjects'),
            }).done(function(data) {
                addSubjects(element, data);

                var ok = $('<i class="icon-ok" style="display:none;position:absolute;top:20px;left:20px;color:#FFF;background-color:green;padding:5px;border-radius:50%;border:1px solid #FFF;"/>');
                element.append(ok);
                ok.fadeIn(1000).fadeOut(1000);
                element.effect( "shake", {times:1, direction:'right'} );

            });
        }
    });
});

function addSubjects(element, subjects) {
    element.data('subjects', subjects.join(','));
    updateSubjects(element);
}

function updateSubjects(element) {
    var subjects = $(element.data('subjects').split(','));
    var labels = element.find('span.subjects span span').text('');
    subjects.each(function(i, subject) {
        labels.each(function(j, label) {
            label = $(label);
            var prefix = label.data('subjects-prefix');
            if (subject.startsWith(prefix)) {
                var sub = subject.substring(prefix.length);
                label.append((label.text() === '' ? sub : ' + '+sub));
            }
        });
    });

    labels.each(function() {
        $(this).parent().attr('class', ($(this).text() === '' ? 'label label-default' : 'label label-info'));
    });
}*/

if ( typeof String.prototype.startsWith != 'function' ) {
    String.prototype.startsWith = function( str ) {
        return this.substring( 0, str.length ) === str;
    };
}


/************************************************************************************/
/*** FORMULAIRE *********************************************************************/
/************************************************************************************/

jQuery(document).ready(function () {

    // $('#portlets-in-header a#personaltools-login').prepOverlay({
    //         subtype: 'ajax',
    //         filter: common_content_filter,
    //         cssclass: 'overlay-folder-factories'
    //     }
    // );

    var prefix = 'body.subsection-fondation-unice-nous-soutenir ';
    if (jQuery(prefix+'input#reduction-impot').length !== 0) {
        jQuery('input:radio').click(function () {
            this.blur();
            this.focus();
        })
    }

    jQuery(prefix+'input#reduction-impot').attr('disabled', 'disabled');

    jQuery(prefix+'input#montant, '+prefix+'input[name=mon-don-est-concerne-par]').bind("keyup change", function(e) {
        strval = jQuery('input#montant').val().replace(',', '.');
        val = parseFloat(strval);
        if (!isNaN(val)) {
            type = jQuery(prefix+'input[name=mon-don-est-concerne-par]:checked').val();
            if (type == 'entreprise')
                reduc = 60;
            else if (type == 'fortune')
                reduc = 75;
            else if (type == 'revenu')
                reduc = 66;
            reduction = val - val * reduc / 100;
            reduction = reduction.toFixed(2);
            jQuery(prefix+"input#reduction-impot").attr('value', reduction)
        } else {
            jQuery(prefix+"input#reduction-impot").attr('value', "")
        }
    })

    /**********************************************************************************/

    var prefix = 'body.subsection-formulaires-formulaire-inscription-stage-ete ';
    if (jQuery(prefix+'input#total').length !== 0) {
        jQuery('input:radio').click(function () {
            this.blur();
            this.focus();
        })
    }

    jQuery(prefix+'input#option-stage').attr('disabled', 'disabled');
    jQuery(prefix+'input#total').attr('disabled', 'disabled');

    jQuery(prefix+'input#options-tcf, '+prefix+'input#option-hebergement').bind("keyup change", function(e) {
        strval = jQuery('input#montant').val().replace(',', '.');
        val = parseFloat(strval);
        if (!isNaN(val)) {
            type = jQuery(prefix+'input[name=mon-don-est-concerne-par]:checked').val();
            if (type == 'entreprise')
                reduc = 60;
            else if (type == 'fortune')
                reduc = 75;
            else if (type == 'revenu')
                reduc = 66;
            reduction = val - val * reduc / 100;
            reduction = reduction.toFixed(2);
            jQuery(prefix+"input#reduction-impot").attr('value', reduction)
        } else {
            jQuery(prefix+"input#reduction-impot").attr('value', "")
        }
    })
});

/************************************************************************************/
/*** TEXT COUNTER *******************************************************************/
/************************************************************************************/
/*!
* jQuery Text Counter Plugin v0.3.6
* https://github.com/ractoon/jQuery-Text-Counter
*
* Copyright 2014 ractoon
* Released under the MIT license
*/
(function($){$.textcounter=function(el,options){var base=this;base.$el=$(el);base.el=el;base.$el.data("textcounter",base);base.init=function(){base.options=$.extend({},$.textcounter.defaultOptions,options);var counterText=base.options.countDown?base.options.countDownText:base.options.counterText,counterNum=base.options.countDown?base.options.max:0;base.$el.after('<'+base.options.countContainerElement+' class="'+base.options.countContainerClass+'">'+counterText+'<span class="'+base.options.textCountClass+'">'+counterNum+'</span></'+base.options.countContainerElement+'>');base.$el.bind('keyup.textcounter click.textcounter blur.textcounter focus.textcounter change.textcounter paste.textcounter',base.checkLimits).trigger('click.textcounter');base.options.init(base.el)};base.checkLimits=function(e){var $this=base.$el,$countEl=$this.nextAll('.'+base.options.countContainerClass),$text=$this.val(),textCount=0,textTotalCount=0,eventTriggered=e.originalEvent===undefined?!1:!0;if(!$.isEmptyObject($text)){if(base.options.type=="word"){textCount=$text.trim().replace(/\s+/gi,' ').split(' ').length}
else{if(base.options.countSpaces){textCount=$text.replace(/[^\S\n|\r|\r\n]/g,' ').length}
else{textCount=$text.replace(/\s/g,'').length}
if(base.options.countExtendedCharacters){var extended=$text.match(/[^\x00-\xff]/gi);if(extended==null){textCount=$text.length}else{textCount=$text.length+extended.length}}}}
if(base.options.max=='auto'){var max=base.$el.attr('maxlength');if(typeof max!=='undefined'&&max!==!1){base.options.max=max}
else{base.$el.nextAll('.'+base.options.countContainerClass).text('error: [maxlength] attribute not set')}}
textTotalCount=base.options.countDown?base.options.max-textCount:textCount;base.setCount(textTotalCount);if(base.options.min>0&&eventTriggered){if(textCount<base.options.min){base.setErrors('min');base.options.minunder(base.el)}
else if(textCount>=base.options.min){base.options.mincount(base.el);base.clearErrors('min')}}
if(base.options.max!==-1){if(textCount>=base.options.max&&base.options.max!=0){base.options.maxcount(base.el);if(base.options.stopInputAtMaximum){var trimmedString='';if(base.options.type=="word"){var wordArray=$text.split(/[^\S\n]/g);var i=0;while(i<wordArray.length){if(i>=base.options.max-1)break;if(wordArray[i]!==undefined){trimmedString+=wordArray[i]+' ';i++}}}
else{if(base.options.countSpaces){trimmedString=$text.substring(0,base.options.max)}
else{var charArray=$text.split(''),totalCharacters=charArray.length,charCount=0,i=0;while(charCount<base.options.max&&i<totalCharacters){if(charArray[i]!==' ')charCount++;trimmedString+=charArray[i++]}}}
$this.val(trimmedString.trim());textTotalCount=base.options.countDown?0:base.options.max;base.setCount(textTotalCount)}else{base.setErrors('max')}}
else{base.options.maxunder(base.el);base.clearErrors('max')}}};base.setCount=function(count){var $this=base.$el,$countEl=$this.nextAll('.'+base.options.countContainerClass);$countEl.children('.'+base.options.textCountClass).text(count)};base.setErrors=function(type){var $this=base.$el,$countEl=$this.nextAll('.'+base.options.countContainerClass);$this.addClass(base.options.inputErrorClass);$countEl.addClass(base.options.counterErrorClass);if(base.options.displayErrorText){switch(type){case 'min':errorText=base.options.minimumErrorText;break;case 'max':errorText=base.options.maximumErrorText;break}
if(!$countEl.children('.error-text-'+type).length){$countEl.append('<'+base.options.errorTextElement+' class="error-text error-text-'+type+'">'+errorText+'</'+base.options.errorTextElement+'>')}}};base.clearErrors=function(type){var $this=base.$el,$countEl=$this.nextAll('.'+base.options.countContainerClass);$countEl.children('.error-text-'+type).remove();if($countEl.children('.error-text').length==0){$this.removeClass(base.options.inputErrorClass);$countEl.removeClass(base.options.counterErrorClass)}};base.init()};$.textcounter.defaultOptions={'type':"character",'min':0,'max':200,'countContainerElement':"div",'countContainerClass':"text-count-wrapper",'textCountClass':"text-count",'inputErrorClass':"error",'counterErrorClass':"error",'counterText':"Total Count: ",'errorTextElement':"div",'minimumErrorText':"Minimum not met",'maximumErrorText':"Maximum exceeded",'displayErrorText':!0,'stopInputAtMaximum':!0,'countSpaces':!1,'countDown':!1,'countDownText':"Remaining: ",'countExtendedCharacters':!1,maxunder:function(el){},minunder:function(el){},maxcount:function(el){},mincount:function(el){},init:function(el){}};$.fn.textcounter=function(options){return this.each(function(){new $.textcounter(this,options)})}})(jQuery);

jQuery(document).ready(function () {
    $('#archetypes-fieldname-description textarea#description').textcounter({
        max: 200,
        countSpaces: true,
        stopInputAtMaximum: false,
        counterText: 'Nombre de caractères : ',
        maximumErrorText: 'Maximum conseillé dépassé !',
    });
});

