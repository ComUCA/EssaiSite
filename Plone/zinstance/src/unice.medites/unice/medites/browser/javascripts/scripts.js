// detecter si chrome et remplacer les apng par des gif
// if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){ }

// images dans tooltip
$('a.imgTooltipBottom').tooltip({
    animated: 'fade',
    placement: 'bottom',
    html: true
});
$('a.imgTooltipRight').tooltip({
    animated: 'fade',
    placement: 'right',
    html: true
});

// effet hover sur avatars - accueil 
// positionnement de la page
$(function() {
    // on se positionne automatiquement sur l illustration
    // setTimeout(function() {$("html,body").animate( { scrollTop: $(".entete").height(), opacity: 1 }, 1000 )}, 1000);
    
    // $(".marqueur").click(function () {
    //     $("html,body").animate( { scrollTop: $(".scrollup").height(), opacity: 1 }, 1000 )
    // }) 
})

// lightbox
$(document).ready(function ($) {
    $(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function() {
                if (window.console) {
                    return console.log('Checking our the events huh?');
                }
            },
            onNavigate: function(direction, itemIndex) {
                if (window.console) {
                    return console.log('Navigating '+direction+'. Current item: '+itemIndex);
                }
            }
        });
    });
    $('#open-image').click(function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });
    $('#open-youtube').click(function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });
    // navigateTo
    $(document).delegate('*[data-gallery="navigateTo"]', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function() {
                var a = this.modal_content.find('.modal-footer a');
                if(a.length > 0) {
                    a.click(function(e) {
                        e.preventDefault();
                        this.navigateTo(2);
                    }.bind(this));
                }
            }
        });
    }); 
});
        
// retrait des caracteres ajoutes par plone dans la colonne "parcours" de l'annuaire  
$(".nettoyage").each(function() {
    $(this).html($(this).html().replace("\set([u'",""));
    $(this).html($(this).html().replace("'])",""));
    $(this).html($(this).html().replace("',",","));
    $(this).html($(this).html().replace("u'Biodiversit\\xe9","Biodiversité"));
    $(this).html($(this).html().replace("Biodiversit\\xe9","Biodiversité"));
    $(this).html($(this).html().replace("num\\xe9rique","numérique"));
    $(this).html($(this).html().replace("sant\\xe9'","santé"));
    $(this).html($(this).html().replace("Activit\\xe9","Activité"));
    $(this).html($(this).html().replace("d\\xe9couverte","découverte"));
    $(this).html($(this).html().replace("Oc\\xe9an","Océan"));
    $(this).html($(this).html().replace("\\xe0","à"));      
    $(this).html($(this).html().replace("\\",""));
    $(this).html($(this).html().replace(", u'",", "));
    $(this).html($(this).html().replace("', u'",", "));
    $(this).html($(this).html().replace("',u'",", "));
    $(this).html($(this).html().replace("xe9","é"));
});

// desactiver premier et dernier bouton carrousel selon la page visitee
$(document).ready(function(){
    $(".marqueur").click(function () { // quand on clique sur le marqueur
        parentCarou = $(this).attr("id");
        var curSlide = $('#'+parentCarou+' .carousel .active');
        if(curSlide.is( ':first-child' )) {
            $('#'+parentCarou+' .bottomPanel .pull-left').hide();
            return;
        } else {
            $('#'+parentCarou+' .bottomPanel .pull-left').show();   
        }
        if (curSlide.is( ':last-child' )) {
            $('#'+parentCarou+' .bottomPanel .pull-right').hide();
            return;
        } else {
            $('#'+parentCarou+' .bottomPanel .pull-right').show();      
        }
    });
    $('.carousel').on('slid.bs.carousel', function () { // quand on clique sur la fleche
        parentCarou = $(this).parents(".marqueur").attr("id");
        var curSlide = $('#'+parentCarou+' .carousel .active');
        if(curSlide.is( ':first-child' )) {
            $('#'+parentCarou+' .bottomPanel .pull-left').hide();
            return;
        } else {
            $('#'+parentCarou+' .bottomPanel .pull-left').show();   
        }
        if (curSlide.is( ':last-child' )) {
            $('#'+parentCarou+' .bottomPanel .pull-right').hide();
            return;
        } else {
            $('#'+parentCarou+' .bottomPanel .pull-right').show();      
        }
    });
});