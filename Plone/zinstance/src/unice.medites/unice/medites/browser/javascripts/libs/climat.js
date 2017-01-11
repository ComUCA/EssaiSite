// avatar des titres 
$(document).ready(function(){
    $("#bio-P4 .clear").click(function () {  localStorage.removeItem('bio-P4-Regles'); });
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
      $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/biodiversite/climat/p1/faceAnimGrand.gif");
    }
    if (!isChrome) {
      $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/biodiversite/climat/p1/faceAnimGrand.png");
    }
})

// Demarche scientifique - bio-a-2
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
    };
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