// avatar des titres et clear local storage instructions
$(document).ready(function(){
    $("#teOcUn-P1 .clear").click(function () {  localStorage.removeItem('teOcUn-P1-Regles'); });
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
        $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/temps-histoire-evolution/sur-le-fil-du-temps/p1/faceAnimGrand.gif");
    }
    if (!isChrome) {
        $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/temps-histoire-evolution/sur-le-fil-du-temps/p1/faceAnimGrand.png");
    }
})


// demarche scientifique 
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