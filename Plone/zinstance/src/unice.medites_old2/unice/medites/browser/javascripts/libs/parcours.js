$(function() {
    // on se positionne automatiquement sur l illustration
    setTimeout(function() {$("html,body").animate( { scrollTop: $("header").height(), opacity: 1 }, 1000 )}, 1200);
})
$(document).ready(function(){
    // hauteur des fenetres PANEL en fonction de l ecran
    heightWindow = $(".emplacement").height()-70;
    $("div.HE_Panel .item").css("min-height",heightWindow)
    $('.glyphiconButton').click(function () {
        $("div.HE_Panel .item").css("min-height",heightWindow)
    });
    // closeButton
    $('.alert-close').on('click', function(c){
        $(this).parent().fadeOut('slow', function(c){});
    }); 
    // popover
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover()
    });
    // tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    // affichage manuel de la regle du jeu
    $(".regleBtn").click(function () {
        $(this).parent(".jeuBtn").prev("[class^=aide-]").fadeIn();
    });
    // carousel avec parallaxe on SitePoint by Maria Antonietta Perna
    (function( $ ) {
        //Function to animate slider captions 
        function doAnimations( elems ) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }
        //Variables on page load 
        var $myCarousel = $('.carouselParallaxe'),
            $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        if ($myCarousel) {
            //Initialize carousel 
            $myCarousel.carousel();
            //Animate captions in first slide on page load 
            doAnimations($firstAnimatingElems);
            //Pause carousel  
            $myCarousel.carousel('pause');
            //Other slides to be animated on carousel slide event 
            $myCarousel.on('slide.bs.carousel', function (e) {
                var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
                doAnimations($animatingElems);
            });  
        }
    })(jQuery);
    
    // ******************* gestion des points, de l affichage des seances, des localstorage, de la jauge, des fenetres aide...  
    $(document).ready(
        function(){
            idParcours = $(".Marker_Container").attr("id"); // identifiant du parcours
    // Regles parcours
            reglesParcours = parseInt(localStorage.getItem(idParcours+"-Regles"));
            if (isNaN(reglesParcours)) {reglesParcours = 1}
            if (reglesParcours < 5) {   
                localStorage.setItem(idParcours+"-Regles", reglesParcours +1); 
                 $(window).load(function(){
                    $(".reglesParcours").modal('show');
                });
            }
    // Points
            pointsParcours = parseInt(localStorage.getItem(idParcours+"-Points")); // on recupere les points deja gagnes du parcours
            if (pointsParcours == null || isNaN(pointsParcours)) {   // si null on met 0
                localStorage.setItem(idParcours+"-Points", 0);  
                $("#pointsParcours").text(0); 
            }
            else {
                $("#pointsParcours").text(pointsParcours); // sinon on affiche le score
            }
    // Seances 
            nomSeances = localStorage.getItem(idParcours+"-Seances"); // on recupere le nom des seances parcourues
            if (nomSeances != null) {
                seancesParcourues = nomSeances.split(","); // on insere chaque entree dans un tableau
                nbSeancesParcourues = seancesParcourues.length;
                for (i = 0; i < nbSeancesParcourues;i++){
                    jeuTermine = seancesParcourues[i].substring(0,1); 
                    seancesParcourues[i] = seancesParcourues[i].replace(jeuTermine+"-","");
                    $("#"+seancesParcourues[i]).addClass("jeu"+jeuTermine+"Termine");
                    $("#"+seancesParcourues[i]+" .pointsJeu"+jeuTermine+".pointsXP span" ).text(0); // mise a 0 des points a gagner
                    $("#"+seancesParcourues[i]+" .pointsJeu"+jeuTermine+".pointsXP" ).fadeOut(); // on rend invisible le conteneur des points 
                }
            }
        }
    )
})