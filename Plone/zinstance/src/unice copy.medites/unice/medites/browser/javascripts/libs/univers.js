// avatar des titres et clear local storage instructions
$(document).ready(function(){
    $(".introSeance img").attr("src","++resource++unice.medites.images/parcours-pedagogiques/terre-ocean-univers/univers/p1/faceAnimGrand.png");
})

// univers p1 etape 1 - identique a drag1etape-teOcUn-b-2 - demarche scientifique
$(function() {
  var nb_ferme=$("#teOcUn-c-1 .jeu1 .ferme").length;
  for (var i = 0;i < nb_ferme;i++) {
    $( "#teOcUn-c-1-drag-"+i ).draggable({ revert: "invalid" });
    $( "#teOcUn-c-1-drop-"+i ).droppable({
      accept: "#teOcUn-c-1-drag-"+i,
      hoverClass: "dropHover",
      drop: function() {
        $(this).addClass( "ouvert" );
        idDrag = $(this).attr('id');
        idDrag = idDrag.slice(-1);
        $("#teOcUn-c-1-drop-"+idDrag).append($("#teOcUn-c-1-drag-"+idDrag));
        $("#teOcUn-c-1-drag-"+idDrag).replaceWith("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span>" + $("#teOcUn-c-1-drag-"+idDrag).text());  
        var nb_ferme=$("#teOcUn-c-1 .jeu1 .ferme").length;
        var nb_ouvert=$("#teOcUn-c-1 .jeu1 .ouvert").length;
        if (nb_ferme == nb_ouvert)  {           
          if ($("#teOcUn-c-1").hasClass('jeu1Termine')) {
              pointsJeu = 0;
          }
          else {
              pointsJeu = $("#teOcUn-c-1 .pointsJeu1.pointsXP span").text();
          }
          finSeance("teOcUn-c-1", 1, pointsJeu);             
        }
      }
    });
  }   
});

// univers p1 etape 1 - identique a drag1etape-teOcUn-b-2 - demarche scientifique - jeu n°2
$(function() {
  var nb_ferme=$("#teOcUn-c-1 .jeu2 .ferme").length;
  for (var i = 0;i < nb_ferme;i++) {
    $( "#teOcUn-c-1b-drag-"+i ).draggable({ revert: "invalid" });
    $( "#teOcUn-c-1b-drop-"+i ).droppable({
      accept: "#teOcUn-c-1b-drag-"+i,
      hoverClass: "dropHover",
      drop: function() {
        $(this).addClass( "ouvert" );
        idDrag = $(this).attr('id');
        idDrag = idDrag.slice(-1);
        $("#teOcUn-c-1b-drop-"+idDrag).append($("#teOcUn-c-1b-drag-"+idDrag));
        $("#teOcUn-c-1b-drag-"+idDrag).replaceWith("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span>" + $("#teOcUn-c-1b-drag-"+idDrag).text());  
        var nb_ferme=$("#teOcUn-c-1 .jeu2 .ferme").length;
        var nb_ouvert=$("#teOcUn-c-1 .jeu2 .ouvert").length;
        if (nb_ferme == nb_ouvert)  {
           if ($("#teOcUn-c-1").hasClass('jeu2Termine')) {
              pointsJeu = 0;
          }
          else {
              pointsJeu = $("#teOcUn-c-1 .pointsJeu2.pointsXP span").text();
          }
          finSeance("teOcUn-c-1", 1, pointsJeu);             
        }
      }
    });
  }   
});

// univers teOcUn-c-2 - identique teOcUn-b-2 - Outils 
$(function() {
    var dragging0 = 0;
    var dragging1 = 0;
    var dragging2 = 0;
    var dragging3 = 0;
    var idParent = $(".drag2etapes-teOcUn-c-2").attr('id');
    var nb_ferme=$("#"+idParent+".drag2etapes-teOcUn-c-2 .ferme").length;
    for (var i = 0;i < nb_ferme;i++) {
      $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
      $( "#"+idParent+"-drag2-"+i ).draggable({ revert: "invalid" });
    }  
    $( "#teOcUn-c-2-drop-0" ).droppable({
      accept: "#teOcUn-c-2-drag-0, #teOcUn-c-2-drag-1, #teOcUn-c-2-drag-2, #teOcUn-c-2-drag-3",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6 col-sm-6 col-md-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>"); 
        $("#teOcUn-c-2 .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging0 = dragging0+1;
        if (dragging0 == 4) {
          if (dragging1 == 4 && dragging2 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500);
            $(".aide-teOcUn-c-2 ").fadeIn(500)
            suiteJeu();
          }
        }
      }
    }); 
    $( "#teOcUn-c-2-drop-1" ).droppable({
      accept: "#teOcUn-c-2-drag-4, #teOcUn-c-2-drag-5, #teOcUn-c-2-drag-6, #teOcUn-c-2-drag-7",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");  
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6 col-sm-6 col-md-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>");   
        $("#teOcUn-c-2 .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging1 = dragging1+1;       
        if (dragging1 == 4) {
          if (dragging0 == 4 && dragging2 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500)
            $(".aide-teOcUn-c-2 ").fadeIn(500)
            suiteJeu();
          }
        }
      }
    });

    $( "#teOcUn-c-2-drop-2" ).droppable({
      accept: "#teOcUn-c-2-drag-8, #teOcUn-c-2-drag-9, #teOcUn-c-2-drag-10, #teOcUn-c-2-drag-11",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6 col-sm-6 col-md-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>"); 
        $("#teOcUn-c-2 .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging2 = dragging2+1;
        if (dragging2 == 4) {
          if (dragging0 == 4 && dragging1 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500)
            $(".aide-teOcUn-c-2 ").fadeIn(500)
            suiteJeu();
          }

        }
      }
    });
    function suiteJeu() {
        var idParent = $(".drag2etapes-teOcUn-c-2").attr('id');
        for (var i = 0;i < 12;i++) {
            $("#teOcUn-c-2 .etape2 li").css("min-height","auto");
            $( "#"+idParent+"-drag2-"+i ).draggable({ revert: "invalid" });
            $( "#"+idParent+"-drag-"+i ).droppable({
                accept: "#"+idParent+"-drag2-"+i,
                hoverClass: "dropHover",
                drop: function( event, ui ) {
                    var draggable = ui.draggable;
                    var idDrag = draggable.attr("id");
                    var titleDrag = draggable.attr("data-original-title");
                    var idDrop = $(this).attr("id");
                    $( this ).addClass( "ouvert2" );
                    $("#"+idDrop).append($("#"+idDrag));
                    $("#"+idDrag).replaceWith("<div><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>"); 
                    var nb_drop = $("#"+idParent+".drag2etapes-teOcUn-c-2  .etape3 .drop").length;
                    var nb_ouvert2 = $("#"+idParent+".drag2etapes-teOcUn-c-2 .etape2 .ouvert2").length;
                    $("#teOcUn-c-2 .etape3 li div div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
                    if (nb_drop == nb_ouvert2) {
                        if ($("#teOcUn-c-2").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#teOcUn-c-2 .pointsJeu1.pointsXP span").text();
                        }
                        finSeance(idParent, 1, pointsJeu);
                        $(".etape3").fadeOut(300)
                    }
                }  
            })  
        }  
    };
});

/* univers p1 etape 4 - systeme solaire */
$(function() {
  var dragging0 = 0;
  var dragging1 = 0;  
  for (var i = 0;i < 11;i++) {
    $( "#teOcUn-c-4-drag0-"+i ).draggable({ revert: "invalid" });
    $( "#teOcUn-c-4-drag1-"+i ).droppable({
      accept: "#teOcUn-c-4-drag0-"+i,
      hoverClass: "dropHover",
      drop: function(event, ui) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var idDrop = $(this).attr("id");    
        $( this ).addClass( "ouvert" );
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div><h6>"+ $("#"+idDrag).html() + "</h6></div>");   
        var nb_ouvert=$("#teOcUn-c-4 .ouvert").length;
        if (nb_ouvert == 11)  {
          $("#teOcUn-c-4 .info1").fadeIn(200);
          $("#teOcUn-c-4 .info2").fadeIn(1200);
          $("#teOcUn-c-4 .lesTypes").fadeIn(1200);
          $("#teOcUn-c-4 .lesNoms").fadeOut(500);
          $("#teOcUn-c-4 .horsJeu").fadeOut(500);
          $("#teOcUn-c-4 .lesPhotos.cadreNoir li").removeClass("col-xs-3 col-sm-3 col-md-2").addClass("col-xs-2 col-sm-2 col-md-1").css("margin","0 15px");

          for (var j = 0;j < 8;j++) {
            $("#teOcUn-c-4-drag1-"+j).draggable({ revert: "invalid" });
            $( "#teOcUn-c-4-drop1-0" ).droppable({
              accept: "#teOcUn-c-4-drag1-0, #teOcUn-c-4-drag1-1, #teOcUn-c-4-drag1-2, #teOcUn-c-4-drag1-3",
              hoverClass: "dropHover",
              drop: function(event, ui) {
                dragging0 = dragging0+1;
                var draggable = ui.draggable;
                var idDrag = draggable.attr("id");
                var idDrag2 = idDrag.replace("drag1","drag2")
                var idDrop = $(this).attr("id");    
                $("#"+idDrop).append($("#"+idDrag));
                $("#"+idDrag).replaceWith("<div class='col-xs-6 col-sm-6 col-md-6 col-lg-3'><div id='"+idDrag2+"'>"+ $("#"+idDrag).html() + "</div>");
                if (dragging0 == 4) {
                  suiteTeOcUnC4();
                }           
              }
            })
            $( "#teOcUn-c-4-drop1-1" ).droppable({
              accept: "#teOcUn-c-4-drag1-4, #teOcUn-c-4-drag1-5, #teOcUn-c-4-drag1-6, #teOcUn-c-4-drag1-7",
              hoverClass: "dropHover",
              drop: function(event, ui) {
                dragging1 = dragging1+1;
                var draggable = ui.draggable;
                var idDrag = draggable.attr("id");
                var idDrag2 = idDrag.replace("drag1","drag2")
                var idDrop = $(this).attr("id");    
                $("#"+idDrop).append($("#"+idDrag));
                $("#"+idDrag).replaceWith("<div class='col-xs-6 col-sm-6 col-md-3'><div id='"+idDrag2+"'>"+ $("#"+idDrag).html() + "</div></div>");
                if (dragging1 == 4) {
                  suiteTeOcUnC4();
                }
              }
            })
          }
        } 
      }
    })  
  }
  function suiteTeOcUnC4() {
    if (dragging0 == 4 && dragging1 == 4) {
      $("#teOcUn-c-4 .info2b").fadeIn(200);
      $("#teOcUn-c-4 .info3").fadeIn(1200);
      $("#teOcUn-c-4 .lesPhotos").fadeOut(500);
      $("#teOcUn-c-4 .etape1").removeClass("col-xs-12 col-sm-12 col-md-12").addClass("col-xs-4 col-sm-4 col-md-4");
      $("#teOcUn-c-4 .lesTypes li").removeClass("col-xs-6 col-sm-6 col-md-6").addClass("col-xs-12 col-sm-12 col-md-12").css("height","auto");
      $("#teOcUn-c-4 .systemeSolaire").fadeIn(500);    
    }
    for (var i = 0;i < 8;i++) {
      $( "#teOcUn-c-4-drag2-"+i ).draggable({ revert: "invalid" });
      $( "#teOcUn-c-4-drop-"+i ).droppable({
        accept: "#teOcUn-c-4-drag2-"+i,
        hoverClass: "dropHover",
        drop: function() {
          $( this ).addClass( "ouvert2" ).removeClass("ferme");
          idDrag = $(this).attr('id');
          idDrag = idDrag.slice(-1);
          $("#teOcUn-c-4-drop-"+idDrag).append($("#teOcUn-c-4-drag2-"+idDrag));
          $("#teOcUn-c-4-drag2-"+idDrag).replaceWith( "<div>" + $( "#teOcUn-c-4-drag2-"+idDrag ).html() + "</div>" );
          var nb_ouvert2=$("#teOcUn-c-4 .ouvert2").length;
          if (nb_ouvert2 == 8)  {
            setTimeout(function() {  
              $("#teOcUn-c-4 .info3b").fadeIn(1200);
              $("#teOcUn-c-4 .infoParent").fadeOut(1200);
              $("#teOcUn-c-4 .lesTypes").fadeOut(1000);
              $("#teOcUn-c-4 .etape1").fadeOut(1000);
              $(".fiches").fadeIn(3000);
              $(".systemeSolaire").fadeOut(2500);
              if ($("#teOcUn-c-4").hasClass('jeu1Termine')) {
                pointsJeu = 0;
              }
              else {
                pointsJeu = $("#teOcUn-c-4 .pointsJeu1.pointsXP span").text();
              }
              finSeance("teOcUn-c-4", 1, pointsJeu);             
            }, 2000);         
          }
        }
      })
    }
  }
});

/* univers teOcUn-c-10 */ 
$(function() {
  $('#teOcUn-c-10 [id^=bloc]').click(function () {
    idBloc = $(this).attr("id");
    $(".bloc").fadeOut(10)
    $("."+idBloc).fadeIn(1200);
  })
})

/* univers teOcUn-c-11 */ 
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>Qu'est ce que la Terre?",
            ans: "Une planète", 
            ansSel: ["Une étoile", "Une galaxie", "Un satellite"]
        },
        {
            ques: "<u>Question 2</u><br/>Qu'est ce que le Soleil ?",
            ans: "Une étoile",
            ansSel: [ "Une planète", "Une galaxie", "Un satellite" ]
        },
        {
            ques: "<u>Question 3</u><br/>Qu’est-ce que la lune ?",
            ans: "Un satellite",
            ansSel: [ "Une planète", "Une étoile", "Une galaxie"]
        },
        {
            ques: "<u>Question 4</u><br/>Peut-on voir la Lune pendant la journée ?",
            ans: "Oui",
            ansSel: [ "Non" ]
        },
        {
            ques: "<u>Question 5</u><br/>Pourquoi on ne voit pas toujours la Lune ronde ?",
            ans: "Parce que le Soleil illumine la Lune de différentes manièrers",
            ansSel: [ "Parce que la forme de la Lune change" ]
        },
        {
            ques: "<u>Question 6</u><br/>Est-ce que tu peux voir les mêmes étoiles depuis chez toi en décembre et en juillet ?",
            ans: "Non",
            ansSel: [ "Oui" ]
        },
        {
            ques: "<u>Question 7</u><br/>Est-ce que tu peux voir les mêmes étoiles à Nice ou au Pôle Sud ?",
            ans: "Non",
            ansSel: [ "Oui" ]
        },
        {
            ques: "<u>Question 8</u><br/>Est-ce que le soleil est toujours à la même hauteur dans le ciel à midi ?",
            ans: "Non",
            ansSel: [ "Oui" ]
        },
        {
            ques: "<u>Question 9</u><br/>Les saisons existent grâce à :",
            ans: "La révolution de la Terre autour du Soleil combinée à l’inclinaison de l’axe terrestre",
            ansSel: [ "La rotation de la Terre sur son axe"]
        },
        {
            ques: "<u>Question 10</u><br/>Les étoiles que l’on voit dans le ciel :",
            ans: "Appartiennent à notre galaxie",
            ansSel: [ "Appartiennent à toutes les galaxies de l’Univers", "On ne voit pas d’étoiles, on ne voit que des planètes" ]
        },
        {
            ques: "<u>Question 11</u><br/>Une année-lumière c’est quoi ?",
            ans: "La distance que la lumière parcourt pendant une année",
            ansSel: [ "Une façon d’appeler une année particulièrement ensoleillée","La quantité de lumière que la Terre reçoit pendant une année" ]
        }
        ]
    },
    options = {
        animationType: 0,
        showHTML: true,
        showWrongAns: true,
        random: false,
        title: "Quiz du parcours Univers"
    };
    $("#quizTeOcUn-c-11").jQuizMe(quizMulti, options);
});

function finSeance(idSeance, idNbJeu, pointsSeance) {
    idParcours = $(".Marker_Container").attr("id"); // identifiant du parcours
    pointsParcours = parseInt(localStorage.getItem(idParcours+"-Points")); // on recupere les points deja gagnes du parcours
    if (pointsParcours == null || isNaN(pointsParcours)) {   // si null on met 0
        localStorage.setItem(idParcours+"-Points", 0);  
        $("#pointsParcours").text(0); 
    }
   
    $("#great-"+idNbJeu+"-"+idSeance).fadeIn(500).fadeOut(3000); // bref affichage du panneau congratulation 
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