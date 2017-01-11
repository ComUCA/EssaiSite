// avatar des titres 
$(document).ready(function(){
    $(".introSeance img").attr("src","++resource++unice.medites.images/parcours-pedagogiques/terre-ocean-univers/ocean/p1/faceAnimGrand.png");
})

// Ocean teOcUn-b-2 - Demarche scientifique / Drag and drop
$(function() {
    var idParent = $(".drag1etape-teOcUn-b-2").attr('id');
    var nb_ferme=$("#"+idParent+".drag1etape-teOcUn-b-2 .ferme").length;
    for (var i = 0;i < nb_ferme;i++) {
        $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
        $( "#"+idParent+"-drop-"+i ).droppable({
            accept: "#"+idParent+"-drag-"+i,
            hoverClass: "dropHover",
            drop: function() {
                $(this).addClass( "ouvert" );
                idDrag = $(this).attr('id');
                idDrag = idDrag.slice(-1);
                $("#"+idParent+"-drop-"+idDrag).append($("#"+idParent+"-drag-"+idDrag));
                $("#"+idParent+"-drag-"+idDrag).replaceWith("<span aria-hidden='true' class='glyphicon glyphicon-ok'></span>" + $("#"+idParent+"-drag-"+idDrag).text());  
                var nb_ferme=$("#"+idParent+".drag1etape-teOcUn-b-2 .ferme").length;
                var nb_ouvert=$("#"+idParent+".drag1etape-teOcUn-b-2 .ouvert").length;
                if (nb_ferme == nb_ouvert)  {
                    if ($("#teOcUn-b-2").hasClass("jeu1Termine")) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#teOcUn-b-2 .pointsJeu1.pointsXP span").text();
                    }
                    finSeance(idParent, 1, pointsJeu);
                }
            }
        });
    }   
});

// Ocean teOcUn-b-3 - Outils / Drag and drop 
$(function() {
    var dragging0 = 0;
    var dragging1 = 0;
    var dragging2 = 0;
    var dragging3 = 0;
    var idParent = $(".drag2etapes-teOcUn-b-3").attr('id');
    var nb_ferme=$("#"+idParent+".drag2etapes-teOcUn-b-3 .ferme").length;
    for (var i = 0;i < nb_ferme;i++) {
      $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
      $( "#"+idParent+"-drag2-"+i ).draggable({ revert: "invalid" });
    }  
    $( "#teOcUn-b-3-drop-0" ).droppable({
      accept: "#teOcUn-b-3-drag-0, #teOcUn-b-3-drag-1, #teOcUn-b-3-drag-2, #teOcUn-b-3-drag-3",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6 col-sm-6 col-md-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>"); 
        $("#teOcUn-b-3 .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging0 = dragging0+1;
        if (dragging0 == 4) {
          if (dragging1 == 4 && dragging2 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500);
            $(".aide-teOcUn-b-3 ").fadeIn(500)
            suiteJeu();
          }
        }
      }
    });
    $( "#teOcUn-b-3-drop-1" ).droppable({
      accept: "#teOcUn-b-3-drag-4, #teOcUn-b-3-drag-5, #teOcUn-b-3-drag-6, #teOcUn-b-3-drag-7",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");  
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6 col-sm-6 col-md-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>");   
        $("#teOcUn-b-3 .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging1 = dragging1+1;       
        if (dragging1 == 4) {
          if (dragging0 == 4 && dragging2 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500)
            $(".aide-teOcUn-b-3 ").fadeIn(500)
            suiteJeu();
          }
        }
      }
    });

    $( "#teOcUn-b-3-drop-2" ).droppable({
      accept: "#teOcUn-b-3-drag-8, #teOcUn-b-3-drag-9, #teOcUn-b-3-drag-10, #teOcUn-b-3-drag-11",
      hoverClass: "dropHover",
      drop: function( event, ui ) {
        var draggable = ui.draggable;
        var idDrag = draggable.attr("id");
        var titleDrag = draggable.attr("data-original-title");
        var idDrop = $(this).attr("id");
        $(this).addClass( "ouvert" );  
        $("#"+idDrop).append($("#"+idDrag));
        $("#"+idDrag).replaceWith("<div id='"+idDrag+"' class='col-xs-6 col-sm-6 col-md-6'><h6>"+titleDrag+"</h6>" + $("#"+idDrag).html() + "</div>"); 
        $("#teOcUn-b-3 .etape1 li div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
        dragging2 = dragging2+1;
        if (dragging2 == 4) {
          if (dragging0 == 4 && dragging1 == 4) {
            $(".etape1").fadeOut(200);
            $(".etape3").fadeIn(500)
            $(".aide-teOcUn-b-3 ").fadeIn(500)
            suiteJeu();
          }

        }
      }
    });
    function suiteJeu() {
        var idParent = $(".drag2etapes-teOcUn-b-3").attr('id');
        for (var i = 0;i < 12;i++) {
            $("#teOcUn-b-3 .etape2 li").css("min-height","auto");
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
                    var nb_drop = $("#"+idParent+".drag2etapes-teOcUn-b-3 .etape3 .drop").length;
                    var nb_ouvert2 = $("#"+idParent+".drag2etapes-teOcUn-b-3 .etape2 .ouvert2").length;
                    $("#teOcUn-b-3 .etape3 li div div:only-child").fadeOut() // on retire les tooltips pour eviter les bugs
                    if (nb_drop == nb_ouvert2) {
                        if ($("#teOcUn-b-3").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-3 .pointsJeu1.pointsXP span").text();
                        }
                        finSeance(idParent, 1, pointsJeu);
                        $(".etape3").fadeOut(300)
                    }
                }  
            })  
        }  
    };
});

// Ocean teOcUn-b-4 - visite OOV / Clic reperes
$(document).ready(function ($) {
    clicLegendOOV = "";
    $("#teOcUn-b-4 .infobulle-1").click(function(){
        clicLegendOOV = clicLegendOOV + "info1";
        OOV();
    });        
    $("#teOcUn-b-4 .infobulle-2").click(function(){
        clicLegendOOV = clicLegendOOV + "info2";
        OOV();
    });
    $("#teOcUn-b-4 .infobulle-3").click(function(){
        clicLegendOOV = clicLegendOOV + "info3";
        OOV();
    });
    $("#teOcUn-b-4 .infobulle-4").click(function(){
        clicLegendOOV = clicLegendOOV + "info4";
        OOV();
    });
    $("#teOcUn-b-4 .infobulle-5").click(function(){
        clicLegendOOV = clicLegendOOV + "info5";
        OOV();
    });
    $("#teOcUn-b-4 .infobulle-6").click(function(){
        clicLegendOOV = clicLegendOOV + "info6";
        OOV();
    });
    $("#teOcUn-b-4 .infobulle-7").click(function(){
        clicLegendOOV = clicLegendOOV + "info7";
        OOV();
    });
    $("#teOcUn-b-4 .infobulle-8").click(function(){
        clicLegendOOV = clicLegendOOV + "info8";
        OOV();
    });
});
     
function OOV() {
    var result1 = clicLegendOOV.indexOf("info1");
    var result2 = clicLegendOOV.indexOf("info2");
    var result3 = clicLegendOOV.indexOf("info3");
    var result4 = clicLegendOOV.indexOf("info4");
    var result5 = clicLegendOOV.indexOf("info5");
    var result6 = clicLegendOOV.indexOf("info6");
    var result7 = clicLegendOOV.indexOf("info7");
    var result8 = clicLegendOOV.indexOf("info8");
    if (result1 > -1) {
         if (result2 > -1) {
            if (result3 > -1) {
                if (result4 > -1) {
                    if (result5 > -1) {
                        if (result6 > -1) {
                            if (result7 > -1) {
                                if (result8 > -1) {
                                    if ($("#teOcUn-b-4").hasClass('jeu1Termine')) {
                                        pointsJeu = 0;
                                    }
                                    else {
                                        pointsJeu = $("#teOcUn-b-4 .pointsJeu1.pointsXP span").text();
                                    }
                                    finSeance("teOcUn-b-4", 1, pointsJeu);
                                }  
                            }  
                        }  
                    }  
                }                
            }            
        }
    }
};

// Ocean teOcUn-b-5 - Flotabilite / Clic pinces
// fonctionnement
$(document).ready(
    function(){
        for (var i = 1;i < 11;i++) {
            $(".pince-"+i).click(
                function () {       
                    $(this).css("background-size","cover").css("width","25%").css("left","18.5%");
                    $(this).next(".objet1").addClass("objet1Chute")
                    .delay(200)
                    .queue(function() {
                        $(this).dequeue(); 
                    })
                    .delay(1000)
                    .queue(function() {
                        $(this).addClass("flotter");  
                        $(this).dequeue(); 
                    })
                    .delay(1000)
                    .queue(function() {
                        $(this).parent().prev(".displayNone").fadeIn();  
                        $(this).dequeue(); 
                    })                         
                }  
            )  
        }   
    }
);   
$(document).ready(
    function(){
        for (var i = 1;i < 11;i++) {
            $(".pince-"+i).click(
                function () {       
                    $(this).css("background-size","cover").css("width","25%").css("left","18.5%");
                    $(this).next(".objet2").addClass("objet2Chute")
                    .delay(200)
                    .queue(function() {
                        $(this).dequeue(); 
                    })
                    .delay(1000)
                    .queue(function() {
                        $(this).addClass("flotter");  
                        $(this).dequeue(); 
                    })
                    .delay(1000)
                    .queue(function() {
                        $(this).parent().prev(".displayNone").fadeIn();  
                        $(this).dequeue(); 
                    })                         
                }  
            )  
        }   
    }
);   
$(document).ready(
    function(){
        for (var i = 1;i < 11;i++) {
            $(".pince-"+i).click(
                function () {       
                    $(this).css("background-size","cover").css("width","25%").css("left","18.5%");
                    $(this).next(".objet3").addClass("objet3Chute")
                    .delay(200)
                    .queue(function() {
                        $(this).dequeue(); 
                    })
                    .delay(1000)
                    .queue(function() {
                        $(this).parent().prev(".displayNone").fadeIn();  
                        $(this).dequeue(); 
                    })                         
                }  
            )  
        }   
    }
);   
// ouverture popup points
$(document).ready(function ($) {
    clicLegendPinces = "";
    $(".pince-1").click(function(){
        clicLegendPinces = clicLegendPinces + "info1";
        pointsFlotabilite();
    });        
    $(".pince-2").click(function(){
        clicLegendPinces = clicLegendPinces + "info2";
        pointsFlotabilite();
    });
    $(".pince-3").click(function(){
        clicLegendPinces = clicLegendPinces + "info3";
        pointsFlotabilite();
    });
    $(".pince-4").click(function(){
        clicLegendPinces = clicLegendPinces + "info4";
        pointsFlotabilite();
    });
    $(".pince-5").click(function(){
        clicLegendPinces = clicLegendPinces + "info5";
        pointsFlotabilite();
    });
    $(".pince-6").click(function(){
        clicLegendPinces = clicLegendPinces + "info6";
        pointsFlotabilite();
    });
    $(".pince-7").click(function(){
        clicLegendPinces = clicLegendPinces + "info7";
        pointsFlotabilite();
    });
    $(".pince-8").click(function(){
        clicLegendPinces = clicLegendPinces + "info8";
        pointsFlotabilite();
    });
    $(".pince-9").click(function(){
        clicLegendPinces = clicLegendPinces + "info9";
        pointsFlotabilite();
    });
});
     
function pointsFlotabilite() {
    var result1 = clicLegendPinces.indexOf("info1");
    var result2 = clicLegendPinces.indexOf("info2");
    var result3 = clicLegendPinces.indexOf("info3");
    var result4 = clicLegendPinces.indexOf("info4");
    var result5 = clicLegendPinces.indexOf("info5");
    var result6 = clicLegendPinces.indexOf("info6");
    var result7 = clicLegendPinces.indexOf("info7");
    var result8 = clicLegendPinces.indexOf("info8");
    var result9 = clicLegendPinces.indexOf("info9");
    if (result1 > -1) {
        if (result2 > -1) {
            if (result3 > -1) {
                if (result4 > -1) {
                    if (result5 > -1) {
                        if (result6 > -1) {
                            if (result7 > -1) {
                                if (result8 > -1) {
                                    if (result9 > -1) {
                                        if ($("#teOcUn-b-5").hasClass('jeu1Termine')) {
                                            pointsJeu = 0;
                                        }
                                        else {
                                            pointsJeu = $("#teOcUn-b-5 .pointsJeu1.pointsXP span").text();

                                        }
                                        finSeance("teOcUn-b-5", 1, pointsJeu);
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

// Ocean teOcUn-b-5 - Flotabilite / Quiz
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>Définis la « flottabilité » d’un corps dans l’eau :",
            ans: "Le comportement de ce corps dans l’eau", 
            ansSel: ["La force qui lui permet de ne pas couler", "La force qui l’attire vers le centre de la Terre et donc vers le fond"]
        },
        {
            ques: "<u>Question 2</u><br/>La flottabilité d’un corps dans l’eau dépend de :",
            ans: "La poussée d’Archimède et la densité du corps",
            ansSel: [ "La poussée de Newton et la taille du corps","La Force de Galilée et la couleur du corps" ]
        },
        {
            ques: "<u>Question 3</u><br/>Si vous êtes dans l’eau, dans quelle direction vous pousse la poussée d’Archimède ?",
            ans: "Vers le haut, donc vers la surface",
            ansSel: [ "Vers le centre de la Terre, donc vers le fond","Vers la côte" ]
        },
        {
            ques: "<u>Question 4</u><br/>La densité d’un corps est la mesure de :",
            ans: "La quantité de matière par rapport à son volume",
            ansSel: [ "Son poids","Sa couleur et sa forme" ]
        },
        {
            ques: "<u>Question 5</u><br/>Pour bien flotter dans l’eau, un corps doit être caractérisé par :",
            ans: "Une densité inférieure à celle de l’eau, donc une poussée d’Archimède supérieure à son poids",
            ansSel: [ "Une densité égale à celle de l’eau, donc une poussée d’Archimède égale à son poids","Une densité supérieure à celle de l’eau, donc une poussée d’Archimède inférieur à son poids" ]
        },
        {
            ques: "<u>Question 6</u><br/>Choisis parmi les objets suivants celui qui flotterait le mieux dans l’eau : ",
            ans: "Un bateau en acier",
            ansSel: [ "Un oursin","Un masque de plongée" ]
        },
        {
            ques: "<u>Question 7</u><br/>Choisis parmi les choses suivantes celle qui flotterait le moins bien dans l’eau : ",
            ans: "Un masque de plongée",
            ansSel: [ "Un bateau en acier ","Une méduse" ]
        }
        ]
    },
    options = {
        animationType: 0,
        showHTML: true,
        showWrongAns: true,
        random: false,
        title: "Quiz sur la flottabilité"
    };
    $("#quizTeOcUn-b-5").jQuizMe(quizMulti, options);
});

// Ocean teOcUn-b-7 - reseau trophique / drag and drop
    $(function() {
        var idParent = $(".drag1etape-teOcUn-b-7").attr('id');
        var nb_ferme=$("#"+idParent+".drag1etape-teOcUn-b-7 .ferme").length;
        for (var i = 0;i < nb_ferme;i++) {
            $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
            $( "#"+idParent+"-drop-"+i ).droppable({
                accept: "#"+idParent+"-drag-"+i,
                hoverClass: "dropHover",
                drop: function() {
                    $(this).addClass( "ouvert" );
                    idDrag = $(this).attr('id');
                    idDrag = idDrag.slice(-1);
                    $("#"+idParent+"-drop-"+idDrag).prepend($("#"+idParent+"-drag-"+idDrag));
                    $("#"+idParent+"-drag-"+idDrag).replaceWith( $("#"+idParent+"-drag-"+idDrag).html());          
                    var nb_ferme=$("#"+idParent+".drag1etape-teOcUn-b-7 .ferme").length;
                    var nb_ouvert=$("#"+idParent+".drag1etape-teOcUn-b-7 .ouvert").length;
                    if (nb_ferme == nb_ouvert)  {
                        $(".teOcUn-b-7-drag").fadeOut(500);
                        $(".teOcUn-b-7-drop").css("margin-top","0");
                        if ($("#teOcUn-b-7").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-7 .pointsJeu1.pointsXP span").text();
                        }
                        finSeance("teOcUn-b-7", 1, pointsJeu);
                    }
                }
            });
        }   
    });

// Ocean teOcUn-b-7 - reseau trophique / clic sur img
clicLegendTrophique = "";
$(".cliqueJeu .humain").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".answer.humain, .cliqueJeu .humain .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info1";
    reseauTrophique();
});
$(".cliqueJeu .mammi").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".cliqueJeu .poissons, .cliqueJeu .mesoZoo").addClass("imgMulti2");
    $(".cliqueJeu .algues, .cliqueJeu .microPhy").addClass("imgDiv2");
    $(".cliqueJeu .mammi .croixRouge, .answer.requinMammi").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info2";
    reseauTrophique();
});
$(".cliqueJeu .requin").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".cliqueJeu .poissons, .cliqueJeu .mesoZoo").addClass("imgMulti2");
    $(".cliqueJeu .algues, .cliqueJeu .microPhy").addClass("imgDiv2");
    $(".cliqueJeu .requin .croixRouge, .answer.requinMammi").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info3";
    reseauTrophique();        
});
$(".cliqueJeu .algues").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".cliqueJeu .poissons").addClass("imgDiv2");
    $(".answer.algues, .cliqueJeu .algues .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info4";
    reseauTrophique();        
});
$(".cliqueJeu .poissons").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".cliqueJeu .macroZoo").addClass("imgMulti2");
    $(".cliqueJeu .requin, .cliqueJeu .mammi").addClass("die");
    $(".answer.poissons, .cliqueJeu .poissons .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info5";
    reseauTrophique();        
});
$(".cliqueJeu .macroZoo").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".cliqueJeu .poissons, .cliqueJeu .requin, .cliqueJeu .mammi").addClass("imgDiv2");
    $(".answer.macroZoo, .cliqueJeu .macroZoo .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info6";
    reseauTrophique();

});
$(".cliqueJeu .mesoZoo").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".cliqueJeu .macroZoo, .cliqueJeu .poissons, .cliqueJeu .requin, .cliqueJeu .mammi").addClass("imgDiv2");
    $(".answer.mesoZoo, .cliqueJeu .mesoZoo .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info7";
    reseauTrophique();

});
$(".cliqueJeu .microZoo").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".answer.microZoo, .cliqueJeu .microZoo .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info8";
    reseauTrophique();

});
$(".cliqueJeu .microPhy").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".cliqueJeu .microZoo, .cliqueJeu .macroZoo, .cliqueJeu .poissons, .cliqueJeu .requin, .cliqueJeu .mammi, .cliqueJeu .humain").addClass("die");
    $(".answer.microPhy, .cliqueJeu .microPhy .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info9";
    reseauTrophique();

});
$(".cliqueJeu .virus").click(function () {
    $(".cliqueJeu .croixRouge, .answer").fadeOut(100);
    $(".cliqueJeu div").removeClass("imgDiv2 imgMulti2 die");
    $(".answer.virus, .cliqueJeu .croixRouge").fadeIn(600);
    clicLegendTrophique = clicLegendTrophique + "info10";
    reseauTrophique();

});

function reseauTrophique() {
    var result1 = clicLegendTrophique.indexOf("info1");
    var result2 = clicLegendTrophique.indexOf("info2");
    var result3 = clicLegendTrophique.indexOf("info3");
    var result4 = clicLegendTrophique.indexOf("info4");
    var result5 = clicLegendTrophique.indexOf("info5");
    var result6 = clicLegendTrophique.indexOf("info6");
    var result7 = clicLegendTrophique.indexOf("info7");
    var result8 = clicLegendTrophique.indexOf("info8");
    var result9 = clicLegendTrophique.indexOf("info9");
    var result10 = clicLegendTrophique.indexOf("info10");
    if (result1 > -1) {
         if (result2 > -1) {
            if (result3 > -1) {
                if (result4 > -1) {
                    if (result5 > -1) {
                        if (result6 > -1) {
                            if (result7 > -1) {
                                if (result8 > -1) {
                                    if (result9 > -1) {
                                        if (result10 > -1) {
                                            if ($("#teOcUn-b-7").hasClass('jeu2Termine')) {
                                                pointsJeu = 0;
                                            }
                                            else {
                                                pointsJeu = $("#teOcUn-b-7 .pointsJeu2.pointsXP span").text();
                                            }
                                            finSeance("teOcUn-b-7", 2, pointsJeu);
                                        }    
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

// Ocean teOcUn-b-10 - Drag and drop metiers
$(function() {
    var dragging0 = 0;
    var dragging1 = 0;
    var dragging2 = 0;
    var dragging3 = 0;
    var dragging4 = 0;
    var dragging5 = 0;
    var idParent = $(".drag1etape-teOcUn-b-10").attr('id');
    for (var i = 0;i < 5;i++) {
        $( "#"+idParent+"-drag0-"+i ).draggable({ revert: "invalid" });
        $( "#"+idParent+"-drag1-"+i ).draggable({ revert: "invalid" });
        $( "#"+idParent+"-drag2-"+i ).draggable({ revert: "invalid" });
        $( "#"+idParent+"-drag3-"+i ).draggable({ revert: "invalid" });
        $( "#"+idParent+"-drag4-"+i ).draggable({ revert: "invalid" });
        $( "#"+idParent+"-drag5-"+i ).draggable({ revert: "invalid" });

        $( "#"+idParent+"-drop0" ).droppable({
            accept: "#teOcUn-b-10-drag0-0, #teOcUn-b-10-drag0-1, #teOcUn-b-10-drag0-2, #teOcUn-b-10-drag0-3, #teOcUn-b-10-drag0-4",
            hoverClass: "dropHover",
            drop: function() {
                $(this).addClass( "ouvert" );
                dragging0 = dragging0+1;
                if (dragging0 == 5) {
                    $("#teOcUn-b-10-drop0").append($("#teOcUn-b-10-drag0-0"));
                    $("#teOcUn-b-10-drag0-0").replaceWith("<div class='col-md-1'></div><div class='col-md-2'>" + $("#teOcUn-b-10-drag0-0").html() + "</div>");   
                
                    $("#teOcUn-b-10-drop0").append($("#teOcUn-b-10-drag0-1"));
                    $("#teOcUn-b-10-drag0-1").replaceWith("<div class='col-md-2'>" + $("#teOcUn-b-10-drag0-1").html() + "</div>");
                
                    $("#teOcUn-b-10-drop0").append($("#teOcUn-b-10-drag0-2"));
                    $("#teOcUn-b-10-drag0-2").replaceWith("<div class='col-md-2'>" + $("#teOcUn-b-10-drag0-2").html() + "</div>");
                
                    $("#teOcUn-b-10-drop0").append($("#teOcUn-b-10-drag0-3"));
                    $("#teOcUn-b-10-drag0-3").replaceWith("<div class='col-md-2'>" + $("#teOcUn-b-10-drag0-3").html() + "</div>");
                
                    $("#teOcUn-b-10-drop0").append($("#teOcUn-b-10-drag0-4"));
                    $("#teOcUn-b-10-drag0-4").replaceWith("<div class='col-md-2'>" + $("#teOcUn-b-10-drag0-4").html() + "</div>");
                
                    if (dragging1 == 2 && dragging2 == 3 && dragging3 == 3 && dragging4 == 2 && dragging5 == 4) {
                        if ($("#teOcUn-b-10").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-10 .pointsJeu1.pointsXP span").text();
                        }
                        finSeance("teOcUn-b-10", 1, pointsJeu);
                    }
                }         
            }
        })

        $( "#"+idParent+"-drop1" ).droppable({
            accept: "#teOcUn-b-10-drag1-1, #teOcUn-b-10-drag1-2",
            hoverClass: "dropHover",
            drop: function() {
                $(this).addClass( "ouvert" );
                dragging1 = dragging1+1;
                if (dragging1 == 2) {
          
                    $("#teOcUn-b-10-drop1").append($("#teOcUn-b-10-drag1-1"));
                    $("#teOcUn-b-10-drag1-1").replaceWith("<div class='col-md-3'></div><div class='col-md-3'>" + $("#teOcUn-b-10-drag1-1").html() + "</div>");
              
                    $("#teOcUn-b-10-drop1").append($("#teOcUn-b-10-drag1-2"));
                    $("#teOcUn-b-10-drag1-2").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag1-2").html() + "</div>");  
                        
                    if (dragging0 == 5 && dragging2 == 3 && dragging3 == 3 && dragging4 == 2 && dragging5 == 4) {
                        if ($("#teOcUn-b-10").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                            alert(pointsJeu);
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-10 .pointsJeu1.pointsXP span").text();
                            alert(pointsJeu);
                        }
                        finSeance("teOcUn-b-10", 1, pointsJeu);
                    }
                } 
            }     
        })

        $( "#"+idParent+"-drop2" ).droppable({
            accept: "#teOcUn-b-10-drag2-0, #teOcUn-b-10-drag2-1, #teOcUn-b-10-drag2-2",
            hoverClass: "dropHover",
            drop: function() {
                $(this).addClass( "ouvert" );
                dragging2 = dragging2+1;
                if (dragging2 == 3) {
                    $("#teOcUn-b-10-drop2").append($("#teOcUn-b-10-drag2-0"));
                    $("#teOcUn-b-10-drag2-0").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag2-0").html() + "</div>");   
              
                    $("#teOcUn-b-10-drop2").append($("#teOcUn-b-10-drag2-1"));
                    $("#teOcUn-b-10-drag2-1").replaceWith("<div class='col-md-1'></div><div class='col-md-3'>" + $("#teOcUn-b-10-drag2-1").html() + "</div><div class='col-md-1'></div>");
              
                    $("#teOcUn-b-10-drop2").append($("#teOcUn-b-10-drag2-2"));
                    $("#teOcUn-b-10-drag2-2").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag2-2").html() + "</div>");
                                                        
                    if (dragging0 == 5 && dragging1 == 2 && dragging3 == 3 && dragging4 == 2 && dragging5 == 4) {
                        finSeance("teOcUn-b-10", 1, 20);
                        if ($("#teOcUn-b-10").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                            alert(pointsJeu);
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-10 .pointsJeu1.pointsXP span").text();
                            alert(pointsJeu);
                        }
                        finSeance("teOcUn-b-10", 1, pointsJeu);
                    }
                }
            }     
        })   

        $( "#"+idParent+"-drop3" ).droppable({
            accept: "#teOcUn-b-10-drag3-0, #teOcUn-b-10-drag3-1, #teOcUn-b-10-drag3-2",
            hoverClass: "dropHover",
            drop: function() {
                $(this).addClass( "ouvert" );
                dragging3 = dragging3+1;
                if (dragging3 == 3) {
                    $("#teOcUn-b-10-drop3").append($("#teOcUn-b-10-drag3-0"));
                    $("#teOcUn-b-10-drag3-0").replaceWith("<div class='col-md-4'>" + $("#teOcUn-b-10-drag3-0").html() + "</div>");   
              
                    $("#teOcUn-b-10-drop3").append($("#teOcUn-b-10-drag3-1"));
                    $("#teOcUn-b-10-drag3-1").replaceWith("<div class='col-md-4'>" + $("#teOcUn-b-10-drag3-1").html() + "</div>");
              
                    $("#teOcUn-b-10-drop3").append($("#teOcUn-b-10-drag3-2"));
                    $("#teOcUn-b-10-drag3-2").replaceWith("<div class='col-md-4'>" + $("#teOcUn-b-10-drag3-2").html() + "</div>");
                          
                    if (dragging0 == 5 && dragging1 == 2 && dragging2 == 3 && dragging4 == 2 && dragging5 == 4) {
                        if ($("#teOcUn-b-10").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                            alert(pointsJeu);
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-10 .pointsJeu1.pointsXP span").text();
                            alert(pointsJeu);
                        }
                        finSeance("teOcUn-b-10", 1, pointsJeu);
                    }
                }
            }     
        })   

        $( "#"+idParent+"-drop4" ).droppable({
            accept: "#teOcUn-b-10-drag4-0, #teOcUn-b-10-drag4-1",
            hoverClass: "dropHover",
            drop: function() {
                $(this).addClass( "ouvert" );
                dragging4 = dragging4+1;
                if (dragging4 == 2) {
                    $("#teOcUn-b-10-drop4").append($("#teOcUn-b-10-drag4-0"));
                    $("#teOcUn-b-10-drag4-0").replaceWith("<div class='col-md-3'></div><div class='col-md-3'>" + $("#teOcUn-b-10-drag4-0").html() + "</div>");   
              
                    $("#teOcUn-b-10-drop4").append($("#teOcUn-b-10-drag4-1"));
                    $("#teOcUn-b-10-drag4-1").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag4-1").html() + "</div>");          
                                      
                    if (dragging0 == 5 && dragging1 == 2 && dragging2 == 3 && dragging3 == 3 && dragging5 == 4) {
                        if ($("#teOcUn-b-10").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                            alert(pointsJeu);
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-10 .pointsJeu1.pointsXP span").text();
                            alert(pointsJeu);
                        }
                        finSeance("teOcUn-b-10", 1, pointsJeu);
                    }
                }
            }     
        })   

        $( "#"+idParent+"-drop5" ).droppable({
            accept: "#teOcUn-b-10-drag5-0, #teOcUn-b-10-drag5-1, #teOcUn-b-10-drag5-2, #teOcUn-b-10-drag5-3",
            hoverClass: "dropHover",
            drop: function() {
                $(this).addClass( "ouvert" );
                dragging5 = dragging5+1;
                if (dragging5 == 4) {
                    $("#teOcUn-b-10-drop5").append($("#teOcUn-b-10-drag5-0"));
                    $("#teOcUn-b-10-drag5-0").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag5-0").html() + "</div>");   
              
                    $("#teOcUn-b-10-drop5").append($("#teOcUn-b-10-drag5-1"));
                    $("#teOcUn-b-10-drag5-1").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag5-1").html() + "</div>");
              
                    $("#teOcUn-b-10-drop5").append($("#teOcUn-b-10-drag5-2"));
                    $("#teOcUn-b-10-drag5-2").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag5-2").html() + "</div>");
                          
                    $("#teOcUn-b-10-drop5").append($("#teOcUn-b-10-drag5-3"));
                    $("#teOcUn-b-10-drag5-3").replaceWith("<div class='col-md-3'>" + $("#teOcUn-b-10-drag5-3").html() + "</div>");
                    
                    if (dragging0 == 5 && dragging1 == 2 && dragging2 == 3 && dragging3 == 3 && dragging4 == 2) {
                        if ($("#teOcUn-b-10").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                            alert(pointsJeu);
                        }
                        else {
                            pointsJeu = $("#teOcUn-b-10 .pointsJeu1.pointsXP span").text();
                            alert(pointsJeu);
                        }
                        finSeance("teOcUn-b-10", 1, pointsJeu);
                    }
                }
            }     
        })   
    }   
});

// ocean teOcUn-b-12 etape 12 - Quiz 
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>L’océanographie c’est quoi pour toi ?",
            ans: "L’étude de tous les aspects des océans", 
            ansSel: ["L’étude de la vie dans les océans", "L’étude des terres submergées par les océans"]
        },
        {
            ques: "<u>Question 2</u><br/>Quelle est la première étape de la démarche scientifique ?",
            ans: "Se poser une question",
            ansSel: [ "Marcher vers une direction bien précise","Rencontrer un scientifique" ]
        },
        {
            ques: "<u>Question 3</u><br/>Qu’est-ce que la surpêche ?",
            ans: "La pêche excessive de certains poissons, crustacés et mollusques",
            ansSel: [ "Une technique de pêche à la surface de l’eau","Tout type de pêche faite par un bateau super rapide" ]
        },
        {
            ques: "<u>Question 4</u><br/>Qu’est-ce que l’aquaculture ?",
            ans: "Elever des poissons, crustacés, mollusques ou algues en captivité",
            ansSel: [ "Lire beaucoup de livres sur la mer","Vendre des poissons, crustacés ou mollusques" ]
        },
        {
            ques: "<u>Question 5</u><br/>Est-ce que l’homme et ses activités peuvent mettre en danger l’écosystème marin ?",
            ans: "Oui, de plus en plus",
            ansSel: [ "Oui, mais la situation est sous contrôle","Non, absolument pas" ]
        },
        {
            ques: "<u>Question 6</u><br/>Le plancton c’est quoi ?",
            ans: "L’ensemble des êtres vivants aquatiques incapables de s’opposer aux courants ",
            ansSel: [ "L’ensemble des animaux qui vivent dans l’eau","L’ensemble des animaux aquatiques incapables de s’opposer aux courants" ]
        },
        {
            ques: "<u>Question 7</u><br/>Une méduse fait partie du :",
            ans: "Plancton",
            ansSel: [ "Pleuston","Necton", "Benthos" ]
        },
        {
            ques: "<u>Question 8</u><br/>Un dauphin fait partie du :",
            ans: "Necton",
            ansSel: [ "Pleuston","Plancton", "Benthos" ]
        },
        {
            ques: "<u>Question 9</u><br/>L’homme est considéré comme un superprédateur, c’est à dire un animal qui :",
            ans: "est au sommet de la chaîne alimentaire",
            ansSel: [ "est doté de super-pouvoirs","a un symbole très coloré sur la poitrine" ]
        },
        {
            ques: "<u>Question 10</u><br/>Les courants marins ne dépendent pas de :",
            ans: "les trajectoires de grands navires",
            ansSel: [ "la température et la salinité de l’eau de mer", "les vents" ]
        },
        {
            ques: "<u>Question 11</u><br/>L’eau de mer très salée se trouve :",
            ans: "en profondeur",
            ansSel: [ "à la surface","proche de la côte", "à la sortie d’un port" ]
        },
        {
            ques: "<u>Question 12</u><br/>La présence de Chlorophylle a dans l’eau de mer est synonyme de :",
            ans: "présence de phytoplancton",
            ansSel: [ "présence de poissons","absence de pollution" ]
        },
        {
            ques: "<u>Question 13</u><br/>Qu'est ce qui n'est pas un robot sous-marin utilisé par les chercheurs ?",
            ans: "un plongeur télécommandé",
            ansSel: [ "un flotteur","un planeur sous-marin", "une bouée instrumentée" ]
        },
        {
            ques: "<u>Question 14</u><br/>Les robots sous-marins peuvent communiquer :",
            ans: "avec les satellites",
            ansSel: [ "entre eux","avec les mammifères marins" ]
        },
        {
            ques: "<u>Question 15</u><br/>Est-il possible de travailler dans la Recherche sans être Chercheur ?",
            ans: "Oui",
            ansSel: [ "Non"]
        }
        ]
    },
    options = {
        animationType: 0,
        showHTML: true,
        showWrongAns: true,
        random: false,
        title: "Quiz du parcours Océan"
    };
    $("#quizTeOcUn-b-12").jQuizMe(quizMulti, options);
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
