// avatar des titres 
$(document).ready(function(){
    $("#bio-P2 .clear").click(function () {  localStorage.removeItem('bio-P2-Regles'); });
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
      $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/biodiversite/insectes/p1/faceAnimGrand.gif");
    }
    if (!isChrome) {
      $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/biodiversite/insectes/p1/faceAnimGrand.png");
    }
})
 
/* s3 jeu 1 anatomie insecte */
$(function() {
    var nbElementsDrag = 0;
    var nbADrag = $("#bio-b-3 [class^=drag]").length;
    for (var i = 1;i < nbADrag+1;i++) {
        $( "#bio-b-3 .jeu1 .drag"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
        $( "#bio-b-3 .jeu1 .drop"+i ).droppable({
            accept: "#bio-b-3 .jeu1 .drag"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith($(ui.draggable).html()+"<br/>");
                nbElementsDrag++;
                if (nbElementsDrag == nbADrag)  {
                    $( "#bio-b-3 .jeu1 ul li:not([class^=drag])").fadeIn(500);
                    if ($("#bio-b-3").hasClass('jeu1Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#bio-b-3 .pointsJeu1.pointsXP span").text();
                    }
                    finSeance("bio-b-3", 1, pointsJeu);       
                }
            }
        })
    }
})

/* s3 jeu 2 cle determination */
$(".e1 .s1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e2-s1").fadeIn(500)
})
$(".s1-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e3-s1").fadeIn(500)
})
$(".s1-2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e4-s1").fadeIn(500)
})
$(".s1-2-1-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e5-s1").fadeIn(500)
})
$(".s1-2-1-1-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e6-s1").fadeIn(500)
})
$(".s1-2-1-1-2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e7-s1a").fadeIn(500)
})
$(".s1-2-1-1-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100) 
    $(".e7-s1b").fadeIn(500)
})
$(".s1-2-1-1-2-1-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e8-s1a").fadeIn(500)
})
$(".s1-2-1-1-2-1-2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e9-s1a").fadeIn(500)
})
$(".s1-2-1-1-2-2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e8-s1b").fadeIn(500)
})
$(".s1-2-1-1-2-2-1-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e9-s1b").fadeIn(500)
})
$(".s1-2-1-1-2-2-1-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e10-s1b").fadeIn(500)
})
$(".e1 .s2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e2-s2").fadeIn(500)
})
$(".s2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e3-s2").fadeIn(500)
})
$(".s2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e3-s2c").fadeIn(500)
})
$(".s2-1-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e4-s2").fadeIn(500)
})
$(".s2-1-2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e5-s2a").fadeIn(500)
})
$(".s2-1-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e5-s2b").fadeIn(500)
})
$(".s2-1-2-1-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e6-s2a").fadeIn(500)
})
$(".s2-1-2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e6-s2b").fadeIn(500)
})
$(".s2-1-2-2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e7-s2").fadeIn(500)
})
$(".s2-1-2-2-2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e8-s2").fadeIn(500)
})
$(".s2-1-2-2-2-2-2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e9-s2a").fadeIn(500)
})
$(".s2-1-2-2-2-2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e9-s2b").fadeIn(500)
})
$(".s2-1-2-2-2-2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e10-s2b").fadeIn(500)
})
$(".s2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e4-s2c").fadeIn(500)
})
$(".s2-2-2-1").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e5-s2c1").fadeIn(500)
})
$(".s2-2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(".detailsCle").html($(".detailsCle").html().replace(/<br>\\*/g, "&nbsp;"));
    $(this).parent().fadeOut(100)
    $(".e5-s2c2").fadeIn(500)
})
$(".s1-1, .s1-2-2, .s1-2-1-2, .s1-2-1-1-1, .s1-2-1-1-2-1-1, .s1-2-1-1-2-1-2-2, .s1-2-1-1-2-1-2-1-1, .s1-2-1-1-2-1-2-1-2, .s1-2-1-1-2-2-2, .s1-2-1-1-2-2-1-1, .s1-2-1-1-2-2-1-2-1, .s1-2-1-1-2-2-1-2-2-1, .s1-2-1-1-2-2-1-2-2-2, .s2-1-1, .s2-1-2-1-1, .s2-1-2-1-2-1, .s2-1-2-1-2-2, .s2-1-2-2-1, .s2-1-2-2-2-1, .s2-1-2-2-2-2-1, .s2-1-2-2-2-2-2-1-1, .s2-1-2-2-2-2-2-1-2, .s2-1-2-2-2-2-2-2-1, .s2-1-2-2-2-2-2-2-2-1, .s2-1-2-2-2-2-2-2-2-2, .s2-2-2-1-1, .s2-2-1, .s2-2-2-1-2, .s2-2-2-2-1, .s2-2-2-2-2").click(function () {
    $(".detailsCle").append("<li>"+$(this).html()+"</li>");
    $(this).unbind( "click" );
    $(this).toggleClass("col-xs-4", "center");
    $(this).siblings().fadeOut(100)
    $(this).children("span").fadeOut(100)
    $(this).children("h6").fadeIn(500)
    $("#bio-b-3 .restart").fadeIn(500)
    $("#bio-b-3 .jeu2 .listeInsectes h6").fadeIn(500)

    if ($("#bio-b-3").hasClass("jeu1Termine")) {
        pointsJeu = 0;
    }
    else {
        pointsJeu = $("#bio-b-3 .pointsJeu2.pointsXP span").text();
    }
    finSeance("bio-b-3", 2, pointsJeu);
})
$("#bio-b-3 .restart").click(function () {
    $(this).fadeOut(100);
    $(".detailsCle").html("");
    $(".e1").fadeIn(500);
    for (var i = 2; i < 12; i++) {
        $("#bio-b-3 [class^=e"+i+"]").fadeOut(100);
    };
})
 
// demarche scientifique - bio-b-6
$(function() {
    var idParent = $(".demarcheScientifique").attr('id');    
    var nbElementsDrag = 0;
    var nbADrag = $("#"+idParent+" .jeu1 [id^=demarche-drag]").length;
    for (var i = 0;i < nbADrag+1;i++) {
        $( "#"+idParent+" .jeu1 #demarche-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( "#"+idParent+" .jeu1 #demarche-drop-"+i ).droppable({
            accept: "#"+idParent+" .jeu1 #demarche-drag-"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span>" + $(ui.draggable).html());
                nbElementsDrag++;
                if (nbElementsDrag == nbADrag)  {
                    $( "#"+idParent+" .jeu1 ul li:not([id^=demarche-drag])").fadeIn(500);
                    if ($("#"+idParent).hasClass('jeu1Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#"+idParent+" .pointsJeu1.pointsXP span").text();
                    }
                    $("#"+idParent+" .sourcesJeu").fadeOut();
                    $("#"+idParent+" .conclusionJeu").fadeIn(1000);    
                    finSeance(idParent, 1, pointsJeu);       
                }
            }
        })
    }
})  

/******************************/

function finSeance(idSeance, idNbJeu, pointsSeance) {
    idParcours = $(".Marker_Container").attr("id"); // identifiant du parcours
    pointsParcours = parseInt(localStorage.getItem(idParcours+"-Points")); // on recupere les points deja gagnes du parcours
    if (pointsParcours == null || isNaN(pointsParcours)) {   // si null on met 0
        localStorage.setItem(idParcours+"-Points", 0);  
        $("#pointsParcours").text(0); 
    }
    if ($("#great-"+idNbJeu+"-"+idSeance).attr("style") == null) {
        $("#great-"+idNbJeu+"-"+idSeance).fadeIn(1000).fadeOut(4000);
    };   // bref affichage du panneau congratulation avec condition pour qu elle ne s affiche qu une seule fois a la fin du jeu   
    idParcours = $(".Marker_Container").attr("id"); // identifiant du parcours
    pointsParcours = parseInt(localStorage.getItem(idParcours+"-Points")); // on recupere les points deja gagnes
    localStorage.setItem(idParcours+"-Points", pointsParcours + parseInt(pointsSeance)); // on met a jour le cookie des points
    $("#"+idSeance).addClass("jeu"+idNbJeu+"Termine"); // on ajoute la classe a la seance termine       
    nomSeances = localStorage.getItem(idParcours+"-Seances"); // on recupere les points deja gagnes
     
    setTimeout(function() { 
        if (idNbJeu > 0) {
            localStorage.setItem(idParcours+"-Seances", nomSeances+","+idNbJeu+"-"+idSeance); // on met a jour le cookie des seances
            $("#"+idSeance+" .pointsJeu"+idNbJeu+".pointsXP span").text(0); // mise a 0 des points a gagner
            pointsParcours = parseInt(localStorage.getItem(idParcours+"-Points")); // on charge a nouveau les points 
            $("#pointsParcours").text(pointsParcours); // maj du score
        } 
    }, 3600);
}