// avatar des titres 
$(document).ready(function(){
    $(".introSeance img").attr("src","++resource++unice.medites.images/parcours-pedagogiques/terre-ocean-univers/terre/p1/faceAnimGrand.png");
})

// Ocean teOcUn-a-1 - Demarche scientifique / Drag and drop
$(function() {
    var idParent = "teOcUn-a-1";
    var nb_ferme = $("#"+idParent+" .ferme").length;
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
                var nb_ferme=$("#"+idParent+" .ferme").length;
                var nb_ouvert=$("#"+idParent+" .ouvert").length;
                if (nb_ferme == nb_ouvert)  {
                    if ($("#teOcUn-a-1").hasClass("jeu1Termine")) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#teOcUn-a-1 .pointsJeu1.pointsXP span").text();
                    }
                    finSeance(idParent, 1, pointsJeu);
                }
            }
        });
    }   
});

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
            ansSel: ["Le capteur sismo à l\'école", "les deux sont à la même distance"]
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
        title: "Quiz du parcours Terre solide"
    };
    $("#quizTeOcUn-a-5").jQuizMe(quizMulti, options);
});

/* teOcUn-a-7 */ 

$(function() {
    for (var i = 0;i < 14;i++) {
        $( ".teOcUn-a-7-drag1-"+i ).draggable({ revert: "invalid" });
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
                        $( ".teOcUn-a-7-drag2-"+i ).draggable({ revert: "invalid" });
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

/******************************/

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