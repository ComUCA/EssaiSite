// avatar des titres et clear local storage instructions
$(document).ready(function(){
    $("#teOcUn-P1 .clear").click(function () {  localStorage.removeItem('teOcUn-P1-Regles'); });
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
        $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/terre-ocean-univers/terre/p1/faceAnimGrand.gif");
    }
    if (!isChrome) {
        $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/terre-ocean-univers/terre/p1/faceAnimGrand.png");
    }
})

// demarche scientifique - teOcUn-a-1 
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

/* teOcUn-a-1 Quiz */ 
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>Indique le capteur le plus proche de la zone d\'impact :",
            ans: "Le capteur rouge", 
            ansSel: ["Le capteur sismo à l\'école", "Les deux sont à la même distance"]
        },
        {
            ques: "<u>Question 2</u><br/>Indique quel capteur enregistre le signal avec la plus forte amplitude :",
            ans: "L\'enregistrement du capteur rouge", 
            ansSel: [ "L\'enregistrement du capteur sismo à l\'école", "Il n\'y a pas de différence" ]
        },
        {
            ques: "<u>Question 3</u><br/>Indique quel capteur enregistre le premier l\'onde de choc :",
            ans: "Le capteur rouge", 
            ansSel: ["Le capteur sismo à l\'école", "Les deux sont à la même distance"]
        }
        ]
    },
    options = {
        animationType: 0,
        showHTML: true,
        showWrongAns: true,
        random: false,
        title: "Quiz de l'étape 1 du parcours Terre solide"
    };
    $("#quizTeOcUn-a-1").jQuizMe(quizMulti, options);
});

// teOcUn-a-2 - jeu 1
$(function() {
    var idParent = "teOcUn-a-2";    
    var nbElementsDrag = 0;
    var nbADrag = $("#"+idParent+" [id^=teOcUn-a-2--drag-]").length;
    for (var i = 0;i < nbADrag+1;i++) {
        $( "#"+idParent+" #teOcUn-a-2--drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( "#"+idParent+" #teOcUn-a-2--drop-"+i ).droppable({
            accept: "#"+idParent+" #teOcUn-a-2--drag-"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith("<div aria-hidden='true' class='glyphicon glyphicon-ok'></div>" + $(ui.draggable).html());
                nbElementsDrag++;
                if (nbElementsDrag == nbADrag)  {
                    $( "#"+idParent+" .jeu1 ul li:not([id^=teOcUn-a-2--drag-])").fadeIn(500);
                    if ($("#"+idParent).hasClass('jeu1Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#"+idParent+" .pointsJeu1.pointsXP span").text();
                    }
                    $("#"+idParent+" .jeu1 .ulPerso").fadeOut();
                    $("#"+idParent+" .jeu1 li").css("min-height","auto");
                    finSeance(idParent, 1, pointsJeu);       
                }
            }
        })
    }
})  

// teOcUn-a-2 - jeu 2
$(function() {
    var idParent = "teOcUn-a-2";    
    var nbElementsDrag = 0;
    var nbADrag = $("#"+idParent+" [class^=teOcUn-a-2---drag-]").length;
    for (var i = 0;i < nbADrag+1;i++) {
        $( "#"+idParent+" .teOcUn-a-2---drag-"+i).draggable({ revert: "invalid", snapTolerance: 15});
        $( "#"+idParent+" #teOcUn-a-2---drop-"+i).droppable({
            accept: "#"+idParent+" .teOcUn-a-2---drag-"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith("<div class='col-xs-6'><div aria-hidden='true' class='glyphicon glyphicon-ok'></div>" + $(ui.draggable).html() +"</div>");
                nbElementsDrag++;
                if (nbElementsDrag == nbADrag)  {
                    if ($("#"+idParent).hasClass('jeu1Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#"+idParent+" .pointsJeu2.pointsXP span").text();
                    }
                    $( "#"+idParent+" .jeu2 .source").fadeOut(100);
                    $("#"+idParent+" .conclusionJeu").fadeIn(1000);    
                    finSeance(idParent, 2, pointsJeu);       
                }
            }
        })
    }
})  

// teOcUn-a-2 - instruments jeu generique
$(function() {
    var dragging0 = 0;
    var dragging1 = 0;
    var dragging2 = 0;
    var dragging3 = 0;
    var idParent = "teOcUn-a-2";
    var nb_ferme=$("#"+idParent+" .ferme").length;
    for (var i = 0;i < nb_ferme;i++) {
      $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
      $( "#"+idParent+"-drag2-"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
    }  
    $( "#teOcUn-a-2-drop-0" ).droppable({
      accept: "#teOcUn-a-2-drag-0, #teOcUn-a-2-drag-1, #teOcUn-a-2-drag-2, #teOcUn-a-2-drag-3",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>"); 
        $("#"+idParent+" .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging0 = dragging0+1;
        if (dragging0 == 4) {
          if (dragging1 == 4 && dragging2 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500);
            $(".aide-teOcUn-a-2 ").fadeIn(500)
            suiteJeu();
          }
        }
      }
    });
    $( "#teOcUn-a-2-drop-1" ).droppable({
      accept: "#teOcUn-a-2-drag-4, #teOcUn-a-2-drag-5, #teOcUn-a-2-drag-6, #teOcUn-a-2-drag-7",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");  
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>");   
        $("#"+idParent+" .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging1 = dragging1+1;       
        if (dragging1 == 4) {
          if (dragging0 == 4 && dragging2 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500)
            $(".aide-teOcUn-a-2 ").fadeIn(500)
            suiteJeu();
          }
        }
      }
    });

    $( "#teOcUn-a-2-drop-2" ).droppable({
      accept: "#teOcUn-a-2-drag-8, #teOcUn-a-2-drag-9, #teOcUn-a-2-drag-10, #teOcUn-a-2-drag-11",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>"); 
        $("#"+idParent+" .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging2 = dragging2+1;
        if (dragging2 == 4) {
          if (dragging0 == 4 && dragging1 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500)
            $(".aide-teOcUn-a-2 ").fadeIn(500)
            suiteJeu();
          }
        }
      }
    });
    function suiteJeu() {
        var idParent = "teOcUn-a-2";
        $("#"+idParent+ " .info1").fadeIn(200);
        for (var i = 0;i < 12;i++) {
            $("#"+idParent+" .etape2 li").css("min-height","auto");
            $( "#"+idParent+"-drag2-"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
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
                    var nb_drop = $("#"+idParent+" .etape3 .drop").length;
                    var nb_ouvert2 = $("#"+idParent+" .etape2 .ouvert2").length;
                    $("#"+idParent+" .etape3 li div div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
                    if (nb_drop == nb_ouvert2) {
                        $("#"+idParent+" .etape2").removeClass("col-xs-8").addClass("col-xs-12");
                        $("#"+idParent+" .info2").fadeIn(200);
                        $("#"+idParent+" .etape3").fadeOut(300)
                        if ($("#"+idParent).hasClass('jeu3Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#"+idParent+" .pointsJeu3.pointsXP span").text();
                        }
                        finSeance(idParent, 3, pointsJeu);
                    }
                }  
            })  
        }  
    };
});


// teOcUn-a-3 - visite Calern / Clic reperes
$(document).ready(function ($) {
    clicLegendCalern = "";
    $("#teOcUn-a-3 .calern1").click(function(){
        clicLegendCalern = clicLegendCalern + "info1";
        terreCalern();
    });        
    $("#teOcUn-a-3 .calern2").click(function(){
        clicLegendCalern = clicLegendCalern + "info2";
        terreCalern();
    });
    $("#teOcUn-a-3 .calern3").click(function(){
        clicLegendCalern = clicLegendCalern + "info3";
        terreCalern();
    });
    $("#teOcUn-a-3 .calern4").click(function(){
        clicLegendCalern = clicLegendCalern + "info4";
        terreCalern();
    });
    $("#teOcUn-a-3 .calern5").click(function(){
        clicLegendCalern = clicLegendCalern + "info5";
        terreCalern();
    });
    $("#teOcUn-a-3 .calern6").click(function(){
        clicLegendCalern = clicLegendCalern + "info6";
        terreCalern();
    });
    $("#teOcUn-a-3 .calern7").click(function(){
        clicLegendCalern = clicLegendCalern + "info7";
        terreCalern();
    });
    $("#teOcUn-a-3 .calern8").click(function(){
        clicLegendCalern = clicLegendCalern + "info8";
        terreCalern();
    });
    $("#teOcUn-a-3 .calern9").click(function(){
        clicLegendCalern = clicLegendCalern + "info9";
        terreCalern();
    });

});
     
function terreCalern() {
    var result1 = clicLegendCalern.indexOf("info1");
    var result2 = clicLegendCalern.indexOf("info2");
    var result3 = clicLegendCalern.indexOf("info3");
    var result4 = clicLegendCalern.indexOf("info4");
    var result5 = clicLegendCalern.indexOf("info5");
    var result6 = clicLegendCalern.indexOf("info6");
    var result7 = clicLegendCalern.indexOf("info7");
    var result8 = clicLegendCalern.indexOf("info8");
    var result9 = clicLegendCalern.indexOf("info9");
    if (result1 > -1) {
         if (result2 > -1) {
            if (result3 > -1) {
                if (result4 > -1) {
                    if (result5 > -1) {
                        if (result6 > -1) {
                            if (result7 > -1) {
                                if (result8 > -1) {
                                    if (result9 > -1) {
                                        if ($("#teOcUn-a-3").hasClass('jeu1Termine')) {
                                            pointsJeu = 0;
                                        }
                                        else {
                                            pointsJeu = $("#teOcUn-a-3 .pointsJeu1.pointsXP span").text();
                                        }
                                        finSeance("teOcUn-a-3", 1, pointsJeu);
                                    }    
                                }  
                            }  
                        }  
                    }  
                }                
            }            
        }
    }
};

/* teOcUn-a-4 conference jeu 1 */ 
$(function() {
    $("#teOcUn-a-4 .jeu1 .test1 .good").click(function () {
        $("#teOcUn-a-4 .jeu1 .test1 .good span").fadeIn(500);
        $("#teOcUn-a-4 .jeu1 .test2").fadeIn(500)
    });
    $("#teOcUn-a-4 .jeu1 .test1 .wrong").click(function () {
        $(this).children("span").fadeIn(500);
    });
    //var nb_ferme=$("#scNu-a-1 .jeu1 .ferme").length;
    var nbElementsDrag = 0;
    var nbElementsDrag2 = 0;
    for (var i = 1;i < 4;i++) {
        $( "#teOcUn-a-4 .jeu1 .test2 .rep"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
        $( "#teOcUn-a-4 .jeu1 .test2 .bloc"+i ).droppable({
            accept: "#teOcUn-a-4 .jeu1 .test2 .rep"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith("- "+$(ui.draggable).html()+"<br/>");
                nbElementsDrag++;
                if (nbElementsDrag == 6)  {
                    $("#teOcUn-a-4 .jeu1 .test3").fadeIn(500);
                    $("#teOcUn-a-4 .jeu1 .test2 .sansPuce, #teOcUn-a-4 .jeu1 .test2 .instruction").fadeOut(500);
                    for (var i = 1;i < 5;i++) {
                        $( "#teOcUn-a-4 .jeu1 .test3 .rep"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
                        $( "#teOcUn-a-4 .jeu1 .test3 .bloc"+i ).droppable({
                            accept: "#teOcUn-a-4 .jeu1 .test3 .rep"+i,
                            hoverClass: "dropHover",
                            drop: function(event, ui) {
                                $(this).append($(ui.draggable));
                                $(ui.draggable).replaceWith("- "+$(ui.draggable).html()+"<br/>");
                                nbElementsDrag2++;
                                if (nbElementsDrag2 == 2)  {
                                    $( "#teOcUn-a-4 .jeu1 .test3 .ulPerso").fadeOut(500)
                                    if ($("#teOcUn-a-4").hasClass('jeu1Termine')) {
                                        pointsJeu = 0;
                                    }
                                    else {
                                        pointsJeu = $("#teOcUn-a-4 .pointsJeu1.pointsXP span").text();
                                    }
                                    finSeance("teOcUn-a-4", 1, pointsJeu);       
                                }
                            }
                        })
                    }
                }
            }
        })
    }
})

/* teOcUn-a-4 conference jeu 2 */ 
$(function() {
    $("#teOcUn-a-4 .jeu2 .test4 .good").click(function () {
        $("#teOcUn-a-4 .jeu2 .test4 .good span").fadeIn(500);
        $("#teOcUn-a-4 .jeu2 .test5").fadeIn(500)
    });
    $("#teOcUn-a-4 .jeu2 .test5 .good").click(function () {
        $("#teOcUn-a-4 .jeu2 .test5 .good span").fadeIn(500);
        $("#teOcUn-a-4 .jeu2 .test6").fadeIn(500)
    });

    $("#teOcUn-a-4 .jeu2 .test6 .good").click(function () {
        $("#teOcUn-a-4 .jeu2 .test6 .good span").fadeIn(500);
        if ($("#teOcUn-a-4").hasClass('jeu2Termine')) {
            pointsJeu = 0;
        }
        else {
            pointsJeu = $("#teOcUn-a-4 .pointsJeu2.pointsXP span").text();
        }
        finSeance("teOcUn-a-4", 2, pointsJeu);
    });
    $("#teOcUn-a-4 .jeu2 .wrong").click(function () {
        $(this).children("span").fadeIn(500);
    });


    //var nb_ferme=$("#scNu-a-1 .jeu2 .ferme").length;
    var nbElementsDrag = 0;
    var nbElementsDrag2 = 0;
    for (var i = 1;i < 4;i++) {
        $( "#teOcUn-a-4 .jeu2 .test2 .rep"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
        $( "#teOcUn-a-4 .jeu2 .test2 .bloc"+i ).droppable({
            accept: "#teOcUn-a-4 .jeu2 .test2 .rep"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith("- "+$(ui.draggable).html()+"<br/>");
                nbElementsDrag++;
                if (nbElementsDrag == 6)  {
                    $("#teOcUn-a-4 .jeu2 .test3").fadeIn(500);
                    $("#teOcUn-a-4 .jeu2 .test2 .sansPuce, #teOcUn-a-4 .jeu2 .test2 .instruction").fadeOut(500);
                    for (var i = 1;i < 5;i++) {
                        $( "#teOcUn-a-4 .jeu2 .test3 .rep"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
                        $( "#teOcUn-a-4 .jeu2 .test3 .bloc"+i ).droppable({
                            accept: "#teOcUn-a-4 .jeu2 .test3 .rep"+i,
                            hoverClass: "dropHover",
                            drop: function(event, ui) {
                                $(this).append($(ui.draggable));
                                $(ui.draggable).replaceWith("- "+$(ui.draggable).html()+"<br/>");
                                nbElementsDrag2++;
                                if (nbElementsDrag2 == 2)  {
                                    $( "#teOcUn-a-4 .jeu2 .test3 .ulPerso").fadeOut(500)
                                    if ($("#teOcUn-a-4").hasClass('jeu1Termine')) {
                                        pointsJeu = 0;
                                    }
                                    else {
                                        pointsJeu = $("#teOcUn-a-4 .pointsJeu1.pointsXP span").text();
                                    }
                                    finSeance("teOcUn-a-4", 1, pointsJeu);       
                                }
                            }
                        })
                    }
                }
            }
        })
    }
})
 
/* teOcUn-a-5 Quiz */ 
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>Quel séisme est renseigné en détail dans cette exposition ?",
            ans: "Le séisme de février 1887", 
            ansSel: ["Le séisme Nissart de 1564", "Le séisme de Lambesc de 1909"]
        },
        {
            ques: "<u>Question 2</u><br/>Où a-t-il été ressenti ?",
            ans: "De Lyon à Livorno",
            ansSel: [ "De Paris à Alger", "De Venise à Perpignan" ]
        },
        {
            ques: "<u>Question 3</u><br/>Combien de décès ont été attribué à cet évènement ?",
            ans: "Plus d\'une cinquantaine de morts",
            ansSel: [ "Il n\'y a eu aucun mort", "Une commerçante et 9 ouvriers"]
        },
        {
            ques: "<u>Question 4</u><br/>Où son épicentre est-il estimé aujourd\'hui ?",
            ans: "En Espagne, dans les Pyrénées orientales",
            ansSel: [ "En France, au large de Nice", "En Italie, au large d\'Arma di Taggia"]
        },
        {
            ques: "<u>Question 5</u><br/>A quoi est dû un séisme ?",
            ans: "C\'est la rupture d\'une faille suite à l\'accumulation d\'une énergie",
            ansSel: [ "Il s\'agit d\'une onde issue d\'une éruption volcanique", "Cela correspond à une vibration après l\'arrivée d\'un tsunami" ]
        },
        {
            ques: "<u>Question 6</u><br/>Que signifie l\'expression « effet de site » ?",
            ans: "Ce sont des modifications locales des ondes sismiques",
            ansSel: [ "Ce sont des lieux protégés des séismes", "Ce sont des dégâts qui apparaissent après les séismes" ]
        },
        {
            ques: "<u>Question 7</u><br/>Combien de types d\'ondes partent de l\'origine du séisme ?",
            ans: "Les ondes premières P et les ondes secondes S",
            ansSel: [ "Les ondes sismiques et c\'est tout" , "Les ondes P, les ondes S et les ondes troisièmes T" ]
        },
        {
            ques: "<u>Question 8</u><br/>Indique quelles sont les causes possibles d\'un tsunami :",
            ans: "Les séismes et les effondrements sous-marins",
            ansSel: [ "Les mouvements de Namazu, bien sûr", "Les vents violents pendant les tempêtes au large" ]
        },
        {
            ques: "<u>Question 9</u><br/>En 1887, le tsunami déclenché provoqua des vagues d\'une hauteur de :",
            ans: "Aux alentours de 2,5 mètres",
            ansSel: [ "Près de 6 mètres", "Il n\'y a jamais eu de tsunamis après le séisme de 1887"]
        },
        {
            ques: "<u>Question 10</u><br/>Quelle est la cause de la formation des Alpes ?",
            ans: "C\'est une zone où la Terre s\'est cassée et pliée car des plaques tectoniques se sont rencontrées",
            ansSel: [ "Ce sont de grands volcans éteints depuis très longtemps", "Elles ont toujours été là, il n\'y a pas de vrai raison" ]
        },
        {
            ques: "<u>Question 11</u><br/>Qu\'est ce qu\'un aléa sismique ?",
            ans: "C\'est une probabilité qu\'un séisme se déroule en un lieu donné",
            ansSel: [ "C\'est une méthode pour prévoir les séismes", "C\'est la cause du séisme" ]
        },
        {
            ques: "<u>Question 12</u><br/>Selon une légende japonaise, qui est Namazu ?",
            ans: "Un poisson chat géant vivant dans les profondeurs de la terre",
            ansSel: [ "Un amas de zucettes ? (ok, on se passe de commentaire :/ )", "Un être capable de contrôler le temps" ]
        },
        {
            ques: "<u>Question 13</u><br/>Combien de stations sismiques font partie du réseau de survéillance alpin RISE ?",
            ans: "39",
            ansSel: [ "22", "41" ]
        },
        {
            ques: "<u>Question 14</u><br/>Donne une définition de sismogramme :",
            ans: "Un enregistrement des ondes sismiques",
            ansSel: [ "Un message codé et envoyé par mail","Un appareil de mesure des séismes" ]
        },
        {
            ques: "<u>Question 15</u><br/>Lors du séisme du 7 avril 2014, dans le bâtiment de la préfecture :",
            ans: "Le niveau 21 a bougé plus longtemps que les autres étages",
            ansSel: [ "Le niveau 12 a moins bougé que les autres étages", "Tous les étages ont bougé de la même façon" ]
        }

        ]
    },
    options = {
        animationType: 0,
        showHTML: true,
        showWrongAns: true,
        random: false,
        title: "Quiz"
    };
    $("#quizTeOcUn-a-5").jQuizMe(quizMulti, options);
});

/* teOcUn-a-6 */ 
$(function() {
    var idParent = "teOcUn-a-6";    
    var nbElementsDrag = 0;
    var nbADrag = $("#"+idParent+" [id^=teOcUn-a-6-drag]").length;
    for (var i = 0;i < nbADrag+1;i++) {
        $( "#"+idParent+" #teOcUn-a-6-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( "#"+idParent+" #teOcUn-a-6-drop-"+i ).droppable({
            accept: "#"+idParent+" #teOcUn-a-6-drag-"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span>" + $(ui.draggable).html());
                nbElementsDrag++;
                if (nbElementsDrag == nbADrag)  {
                    if ($("#"+idParent).hasClass('jeu1Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#"+idParent+" .pointsJeu1.pointsXP span").text();
                    }  
                    finSeance(idParent, 1, pointsJeu);       
                }
            }
        })
    }
})   

/* teOcUn-a-7 */ 
$(function() {
    for (var i = 0;i < 14;i++) {
        $( ".teOcUn-a-7-drag1-"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
        $( ".teOcUn-a-7-drop1-"+i ).droppable({
            accept: ".teOcUn-a-7-drag1-"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).addClass( "ouvert" );
                $(this).droppable( "disable" );
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith( "<span class='"+$(ui.draggable).attr('class')+"'>"+$(ui.draggable).html()+"</span>"  );  
                $("#teOcUn-a-7 .etape1 ul li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
                $("#teOcUn-a-7 .etape1 ul li > .tooltip").fadeOut() // on retire les tooltips pour eviter les bugs
                var nb_ouvert = $("[class^=teOcUn-a-7-drop1-].ouvert").length;
                if (nb_ouvert == 14)  {
                    $("#teOcUn-a-7 .etape2").fadeIn(500);
                    for (var i = 0;i < 14;i++) {
                        $( ".teOcUn-a-7-drag2-"+i ).draggable({ revert: "invalid", snapTolerance: 20 });
                        $( ".teOcUn-a-7-drop2-"+i ).droppable({
                            accept: ".teOcUn-a-7-drag2-"+i,
                            hoverClass: "dropHover",
                            drop: function(event, ui) {
                                $(this).addClass( "ouvert" );
                                $(this).droppable( "disable" );
                                $(this).append($(ui.draggable));
                                $(ui.draggable).replaceWith(  "<span class='"+$(ui.draggable).attr('class')+"'>"+$(ui.draggable).html()+"</span>"  );  
                                var nb_ouvert = $("[class^=teOcUn-a-7-drop2-].ouvert").length;
                                if (nb_ouvert == 14)  {
                                    $("#teOcUn-a-7 .etape3").fadeIn(500);
                                    $(".teOcUn-a-7-clic-0").click(function () {
                                        $(this).find("span").fadeIn(100);      
                                    });
                                    $(".teOcUn-a-7-clic-1").click(function () {
                                        $(this).find("span").fadeIn(100);
                                    });
                                    $(".teOcUn-a-7-clic-2").click(function () {
                                        $(this).find("span").fadeIn(100);
                                        $("#teOcUn-a-7 .fin").fadeIn(500);
                                        //$("#teOcUn-a-7 ul").fadeOut(100);
                                        if ($("#teOcUn-a-7").hasClass('jeu1Termine')) {
                                            pointsJeu = 0;
                                        }
                                        else {
                                            pointsJeu = $("#teOcUn-a-7 .pointsJeu1.pointsXP span").text();
                                        }
                                        finSeance("teOcUn-a-7", 1, pointsJeu);     
                                    });
                                    $(".teOcUn-a-7-clic-3").click(function () {
                                        $(this).find("span").fadeIn(100);
                                    });
                                    $(".teOcUn-a-7-clic-4").click(function () {
                                        $(this).find("span").fadeIn(100);
                                    });
                                    $(".teOcUn-a-7-clic-5").click(function () {
                                        $(this).find("span").fadeIn(100);
                                    });
                                }
                            }
                        })
                    }                  
                }
            }
        })
    }   
});

//teOcUn-a-8 .jeu1
$(function() {
    $("#teOcUn-a-8 .jeu1 .test1 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-8 .jeu1 .test2").css("visibility","visible")
    });
    $("#teOcUn-a-8 .jeu1 .test2 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-8 .jeu1 .test3").css("visibility","visible")
    });
    $("#teOcUn-a-8 .jeu1 .test3 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-8 .jeu1 .conclusion").fadeIn(500);
        if ($("#teOcUn-a-8").hasClass('jeu2Termine')) {
            pointsJeu = 0;
        }
        else {
            pointsJeu = $("#teOcUn-a-8 .pointsJeu2.pointsXP span").text();
        }
        finSeance("teOcUn-a-8", 1, pointsJeu);   
    });
    $("#teOcUn-a-8 .jeu1 .wrong").click(function () {
        $(this).children("span").fadeIn(500);
    });
});

// teOcUn-a-8 jeu2
$(function() {
    var idParent = "teOcUn-a-8";    
    var nbADrag1 = $("#"+idParent+" .jeu2 .etape1 [class^=teOcUn-a-8-drag]").length;
    for (var i = 0;i < nbADrag1+1;i++) {
        $( "#"+idParent+" .jeu2 .etape1 .teOcUn-a-8-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( "#"+idParent+" .jeu2 .etape1 .teOcUn-a-8-drop-"+i ).droppable({
            accept: "#"+idParent+" .jeu2 .etape1 .teOcUn-a-8-drag-"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span>" + $(ui.draggable).html() + "<br/>");
                nbADrag1--;
                if (nbADrag1 == 0)  {
                    $("#"+idParent+" .jeu2 .etape2").fadeIn(1000);    
                    $("#"+idParent+" .etape1 .cadreBlanc").fadeOut();
                    var nbADrag2 = $("#"+idParent+" .jeu2 .etape2 [class^=teOcUn-a-8-drag]").length;
                    for (var i = 0;i < nbADrag2+1;i++) {
                        $( "#"+idParent+" .jeu2 .etape2 .teOcUn-a-8-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
                        $( "#"+idParent+" .jeu2 .etape2 .teOcUn-a-8-drop-"+i ).droppable({
                            accept: "#"+idParent+" .jeu2 .etape2 .teOcUn-a-8-drag-"+i,
                            hoverClass: "dropHover",
                            drop: function(event, ui) {
                                $(this).append($(ui.draggable));
                                $(ui.draggable).replaceWith("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span>" + $(ui.draggable).html() + "<br/>");
                                nbADrag2--;
                                if (nbADrag2 == 0)  {
                                    if ($("#"+idParent).hasClass('jeu2Termine')) {
                                        pointsJeu = 0;
                                    }
                                    else {
                                        pointsJeu = $("#"+idParent+" .pointsJeu2.pointsXP span").text();
                                    }
                                    $("#"+idParent+" .jeu2 .etape2 .cadreBlanc").fadeOut();
                                    $("#"+idParent+" .jeu2 .conclusion").fadeIn(1000);    
                                    finSeance(idParent, 2, pointsJeu);   
                                }
                            }
                        })
                    }            
                }
            }
        })
    }
})  

//teOcUn-a-9 .jeu1
$(function() {
    $("#teOcUn-a-9 .jeu1 .test1 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-9 .jeu1 .test2").css("visibility","visible")
    });
    $("#teOcUn-a-9 .jeu1 .test2 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-9 .jeu1 .test3").css("visibility","visible")
    });
    $("#teOcUn-a-9 .jeu1 .test3 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-9 .jeu1 .conclusion").fadeIn(500);
        if ($("#teOcUn-a-9").hasClass('jeu1Termine')) {
            pointsJeu = 0;
        }
        else {
            pointsJeu = $("#teOcUn-a-9 .pointsJeu1.pointsXP span").text();
        }
        finSeance("teOcUn-a-9", 1, pointsJeu);   
    });
    $("#teOcUn-a-9 .jeu1 .wrong").click(function () {
        $(this).children("span").fadeIn(500);
    });
});

//teOcUn-a-9 .jeu2
$(function() {
    $("#teOcUn-a-9 .jeu2 .test1 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-9 .jeu2 .test2").css("visibility","visible")
    });
    $("#teOcUn-a-9 .jeu2 .test2 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-9 .jeu2 .test3").css("visibility","visible")
    });
    $("#teOcUn-a-9 .jeu2 .test3 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-9 .jeu2 .conclusion").fadeIn(500);
        if ($("#teOcUn-a-9").hasClass('jeu2Termine')) {
            pointsJeu = 0;
        }
        else {
            pointsJeu = $("#teOcUn-a-9 .pointsJeu2.pointsXP span").text();
        }
        finSeance("teOcUn-a-9", 2, pointsJeu);   
    });
    $("#teOcUn-a-9 .jeu2 .wrong").click(function () {
        $(this).children("span").fadeIn(500);
    });
});

//teOcUn-a-9 .jeu3
$(function() {
    $("#teOcUn-a-9 .jeu3 .test1 .good").click(function () {
        $(this).children("span").fadeIn(500);
        $("#teOcUn-a-9 .jeu3 .conclusion").fadeIn(500);
        if ($("#teOcUn-a-9").hasClass('jeu3Termine')) {
            pointsJeu = 0;
        }
        else {
            pointsJeu = $("#teOcUn-a-9 .pointsjeu3.pointsXP span").text();
        }
        finSeance("teOcUn-a-9", 3, pointsJeu);   
    });
    $("#teOcUn-a-9 .jeu3 .wrong").click(function () {
        $(this).children("span").fadeIn(500);
    });
});

/* teOcUn-a-11 Quiz */ 
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>Qu\'est ce qu\'une démarche expérimentale ?",
            ans: "Une méthode d\'investigation qui commence pour une observation", 
            ansSel: ["Une méthode d\'investigation qui commence par une expérience", "Une méthode d\'investigation qui commence par une hypothèse"]
        },
        {
            ques: "<u>Question 2</u><br/>Parmi ces outils, lesquel ne permet pas d\'enregistrer des séismes ?",
            ans: ["Un anémomètre"],
            ansSel: [ "Un géophone", "un sismomètre" ]
        },
        {
            ques: "<u>Question 3</u><br/>Parmi les outils suivants, lequel n\'est pas présent sur le site de Calern",
            ans: "Un interféromètre radio pour observation astronomique",
            ansSel: [ "Un télémètre laser-lune", "Un sismomètre"]
        },
        {
            ques: "<u>Question 4</u><br/>Qu’enregistre un sismomètre ?",
            ans: "Les ondes qui sont des mouvements souvent trop faibles pour être ressentis",
            ansSel: [ "Le bruit que fait un séisme", "Les mouvements du sol que les animaux ressentent"]
        },
        {
            ques: "<u>Question 5</u><br/>A quoi sert un réseau de sismomètres ?",
            ans: "A enregistrer de manière différente un même séisme et ainsi le localiser",
            ansSel: [ "Pas à grand chose, tous les sismomètres enregistrent la même chose", "A prévenir les problèmes de panne d’un des sismomètres" ]
        },
        {
            ques: "<u>Question 6</u><br/>Qu’est ce qu’une isoséiste ?",
            ans: "Une courbe délimitant les zones d’intensité sismique",
            ansSel: [ "Une chercheuse qui travaille sur les séismes", "Une enquête de recueil de témoignages des victimes d’un séisme" ]
        },
        {
            ques: "<u>Question 7</u><br/>Parmi les propriétés d’un séisme citées ci-dessous, laquelle permet le déclenchement d’un tsunami.",
            ans: "Un mouvement vertical de la faille située en mer",
            ansSel: [ "Un mouvement horizontal de la faille située en mer" , "Un mouvement vertical d’une faille située dans les terres" ]
        },
        {
            ques: "<u>Question 8</u><br/>Indiquer si vous êtes d’accord avec l’affirmation suivante, \" les bâtiments les plus hauts sont les plus sensibles aux tremblements de Terre. \" ",
            ans: "Ce n’est pas toujours vrai",
            ansSel: [ "C’est exact", "C’est faux" ]
        },
        {
            ques: "<u>Question 9</u><br/>Qu’est ce que l’épicentre d’un séisme :",
            ans: "Le point où le séisme a été le plus fort en surface, il peut être éloigné de la faille qui a bougé",
            ansSel: [ "L’origine du séisme, il se situe en profondeur", "Le point où le séisme a été le plus fort en surface, il se situe toujours le long de la faille qui a bougé"]
        },
        {
            ques: "<u>Question 10</u><br/>La région de Nice se situe sur la frontière entre les plaques Afrique et Eurasie",
            ans: "C\'est une zone où la Terre s\'est cassée et pliée car des plaques tectoniques se sont rencontrées",
            ansSel: [ "Il existe des volcans sous-marins qui font bouger la côte d’Azur", "A la montagne, de gros éboulements font trembler le sol" ]
        }
        ]
    },
    options = {
        animationType: 0,
        showHTML: true,
        showWrongAns: true,
        random: false,
        title: "Quiz du parcours Terre solide"
    };
    $("#quizTeOcUn-a-11").jQuizMe(quizMulti, options);
});

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