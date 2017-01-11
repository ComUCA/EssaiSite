// avatar des titres 
$(document).ready(function(){
    $("#scNu-P1 .clear").click(function () {  localStorage.removeItem('scNu-P1-Regles'); });
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
      $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/sciences-du-numerique/sciences-du-numerique/p1/faceAnimGrand.gif");
    }
    if (!isChrome) {
      $(".introSeance img").attr("src","++resource++unice.medites.images/avatars/sciences-du-numerique/p1/faceAnimGrand.png");
   }
})
 
/* scNu-a-1 jeu1 */ 
$("#scNu-a-1 .velo").click(function () {
    $("#scNu-a-1 .jeu1 .clickMe").fadeOut(500);
    $(this).animate({left:"42%"}, 2200).animate({top:"65%"}, 1700).animate({left:"90%"}, 2200).unbind( "click" );
    setTimeout(function() {
        $('.arbre img').animate({  borderSpacing: 120 }, {
            step: function(now,fx) {
              $(this).css('-webkit-transform','rotateX('+now+'deg)'); 
              $(this).css('-moz-transform','rotateX('+now+'deg)');
              $(this).css('transform','rotateX('+now+'deg)');
            },
            duration:'slow'
        },1500);
        $('#scNu-a-1 .arbre').animate({  borderSpacing: 70 }, {
            step: function(now,fx) {
              $(this).css('-webkit-transform','translateY('+now+'%)'); 
              $(this).css('-moz-transform','translateY('+now+'%)');
              $(this).css('transform','translateY('+now+'%)');
            },
            duration:'slow'
        },1500);
    }, 600);

    setTimeout(function() {
        $("#scNu-a-1 .jeu1 .cadreRose, #scNu-a-1 .jeu1 .ligne, #scNu-a-1 .jeu1 [class^=pensee-drop-]").fadeIn(500);
/*        $("#scNu-a-1 .jeu1 .cadreRose").fadeIn(500);
        $("#scNu-a-1 .jeu1 .ligne").fadeIn(500);
        $("#scNu-a-1 .jeu1 [class^=pensee-drop-]").fadeIn(500); */
        var nb_ferme=$("#scNu-a-1 .jeu1 .ferme").length;
        for (var i = 0;i < nb_ferme;i++) {
            $( "#scNu-a-1 .jeu1 .pensee-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
            $( "#scNu-a-1 .jeu1 .pensee-drop-"+i+" span" ).droppable({
                accept: "#scNu-a-1 .jeu1 .pensee-drag-"+i,
                hoverClass: "dropHover",
                drop: function(event, ui) {
                    $(this).addClass( "ouvert" );
                    $(this).append($(ui.draggable));
                    $(ui.draggable).replaceWith($(ui.draggable).html());

                    var nb_ferme=$("#scNu-a-1 .jeu1 .ferme").length;
                    var nb_ouvert=$("#scNu-a-1 .jeu1 .ouvert").length;
                    if (nb_ferme == nb_ouvert)  {
                        $("#scNu-a-1 .jeu1 .cadreRose").fadeOut(500);
                        $("#scNu-a-1 .jeu1 .cadreJaune").fadeIn(1000);

                        if ($("#scNu-a-1").hasClass('jeu1Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#scNu-a-1 .pointsJeu1.pointsXP span").text();
                        }
                        finSeance("scNu-a-1", 1, pointsJeu);       
                    }
                }
            })
        }
    },6000);
});

/* scNu-a-1 jeu2 */ 
$(function() {
    for (var i = 0;i < 5;i++) {
        $( ".scNu-a-1-drag0-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( ".scNu-a-1-drop0-"+i ).droppable({
            accept: ".scNu-a-1-drag0-"+i,
            hoverClass: "dropHover",
            drop: function( event, ui ) {
                $(this).addClass( "ouvert" );
                $(this).droppable( "disable" );
                var nb_ouvert=$("#scNu-a-1 .jeu2 .ouvert").length;
                if (nb_ouvert == 10)  { 
                    $( "[class^=scNu-a-1-drag0-]" ).draggable( "disable" );
                    $(".etape2 li:nth-child(1)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)
                    setTimeout(function() {$(".etape2 li:nth-child(2)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 1100);
                    setTimeout(function() {$(".etape2 li:nth-child(3)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 2200);
                    setTimeout(function() {$(".etape2 li:nth-child(4)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 3300);
                    setTimeout(function() {$(".etape2 li:nth-child(5)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 4400);
                    setTimeout(function() {$(".etape2 li:nth-child(6)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 5500);
                    setTimeout(function() {$(".etape2 li:nth-child(7)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 6600);
                    setTimeout(function() {$(".etape2 li:nth-child(8)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 7700);
                    setTimeout(function() {$(".etape2 li:nth-child(9)").animate({opacity:"0.4"}, 1000).animate({opacity:"1"}, 300)}, 8800);
                    setTimeout(function() {$(".etape2 li:nth-child(10)").animate({opacity:"0.4"}, 1000)}, 9900);

                    $(".jeu2 .robot").animate({top:"48px"}, 1000)         
                    .animate({left:"165px"},1000) 
                    .delay(100)
                    .animate({left:"276px"},1000)         
                    .delay(100)
                    .animate({top:"157px"},1000) 
                    .delay(100)
                    .animate({left:"165px"},1000) 
                    .delay(100)
                    .animate({top:"267px"},1000) 
                    .delay(100)
                    .animate({left:"276px"},1000)         
                    .delay(100)
                    .animate({left:"380px"},1000)         
                    .delay(100)
                    .animate({top:"157px"},1000) 

                    if ($("#scNu-a-1").hasClass('jeu2Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#scNu-a-1 .pointsJeu2.pointsXP span").text();
                    }
                    finSeance("scNu-a-1", 2, pointsJeu);       
                }
            }    
        })
    }   
});

/* scNu-a-1 jeu3 */ 
$("#scNu-a-1 .jeu3 .robot").click(function () {
    $("#scNu-a-1 .jeu3 .clickMe").fadeOut(500);
    $(this).animate({left:"18%"}, 2200).animate({top:"52%"}, 1700).animate({left:"39%"}, 2200).animate({top:"24%"}, 1700).animate({left:"61%"}, 2200).animate({top:"52%"}, 1700).animate({left:"88%"}, 2200).unbind( "click" );
    setTimeout(function() { 
        $("#scNu-a-1 .jeu3 .cadreRose").fadeIn(500);
        dragging = 0;
        for (var i = 0;i < 2;i++) {
            $( "#scNu-a-1 .jeu3 .instruction-drag-1, #scNu-a-1 .jeu3 .instruction-drag-2" ).draggable({ revert: "invalid", snapTolerance: 15  });
            $( "#scNu-a-1 .jeu3 .poubelle" ).droppable({
                accept: "#scNu-a-1 .jeu3 .instruction-drag-2",
                hoverClass: "dropHover",
                drop: function(event, ui) {
                    $(this).append($(ui.draggable));
                    $(ui.draggable).replaceWith("");
                    dragging = dragging+1;

                    if (dragging == 3)  {
                        $("#scNu-a-1 .jeu3 .cadreRose").fadeOut(500);
                        $("#scNu-a-1 .jeu3 .cadreJaune").fadeIn(1000);

                        if ($("#scNu-a-1").hasClass('jeu3Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#scNu-a-1 .pointsJeu3.pointsXP span").text();
                        }
                        finSeance("scNu-a-1", 3, pointsJeu);       
                    }
                }
            })
        }
    },13900);
});

/* scNu-a-2 */
$(function() {
    for (var i = 0;i < 6;i++) {
        $( "#scNu-a-2-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( "#scNu-a-2-drop-"+i ).droppable({
            accept: "#scNu-a-2-drag-"+i,
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).addClass( "ouvert" );
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith($(ui.draggable).html());  
                var nb_ouvert = $("#scNu-a-2 .ouvert").length;
                if (nb_ouvert == 6)  {
                    if ($("#scNu-a-2").hasClass('jeu1Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#scNu-a-2 .pointsJeu1.pointsXP span").text();
                    }
                    finSeance("scNu-a-2", 1, pointsJeu);       
                }
            }
        })
    }   
});

/* scNu-a-3 */
$(function() {
    for (var i = 0;i < 4;i++) {
        $( ".scNu-a-3-drag-"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( ".scNu-a-3-drag-p"+i ).draggable({ revert: "invalid", snapTolerance: 15  });
        $( "#scNu-a-3-drop-p1-"+i ).droppable({
            accept: ".scNu-a-3-drag-0",
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).addClass( "ouvert" );
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith($(ui.draggable).html());  
                $(this).droppable( "disable" );
                ouvert();
            }
        });
        $( "#scNu-a-3-drop-p2-"+i ).droppable({
            accept: ".scNu-a-3-drag-3",
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).addClass( "ouvert" );
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith($(ui.draggable).html());  
                $(this).droppable( "disable" );
                ouvert();
            }
        });
        $( "#scNu-a-3-drop-p1p" ).droppable({
            accept: ".scNu-a-3-drag-p2",
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).addClass( "ouvert" );
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith($(ui.draggable).html());  
                ouvert();
            }
        });
        $( "#scNu-a-3-drop-p2p" ).droppable({
            accept: ".scNu-a-3-drag-p1",
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).addClass( "ouvert" );
                $(this).append($(ui.draggable));
                $(ui.draggable).replaceWith($(ui.draggable).html());  
                ouvert();
            }
        });
    }  

    function ouvert() {
        var nb_ouvert = $("#scNu-a-3 .ouvert").length;
        if (nb_ouvert == 7 ) {
            $("#scNu-a-3-drop-p1-0 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300);
            $("#scNu-a-3 .robot").addClass("p1");
            setTimeout(function() {  $("#scNu-a-3-drop-p1-1 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 1100);
            setTimeout(function() {  
                $("#scNu-a-3-drop-p2-0 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300);
                $("#scNu-a-3 .robot").removeClass("p1").addClass("p2");
            }, 2200);
            setTimeout(function() {  $("#scNu-a-3-drop-p2-1 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 3300);
            setTimeout(function() {  $("#scNu-a-3-drop-p2-2 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 4400);
            setTimeout(function() {  
                $("#scNu-a-3-drop-p1-0 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300);
                $("#scNu-a-3 .robot").removeClass("p2").addClass("p1");
            }, 5500);
            setTimeout(function() {  $("#scNu-a-3-drop-p1-1 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 6600);
            setTimeout(function() {  
                $("#scNu-a-3-drop-p2-0 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300);
                $("#scNu-a-3 .robot").removeClass("p1").addClass("p2");
            }, 7700);
            setTimeout(function() {  $("#scNu-a-3-drop-p2-1 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 8800);
            setTimeout(function() {  $("#scNu-a-3-drop-p2-2 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 9900);
            setTimeout(function() {  
                $("#scNu-a-3-drop-p1-0 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300);
                $("#scNu-a-3 .robot").removeClass("p2").addClass("p1");
            }, 11000);
            setTimeout(function() {  $("#scNu-a-3-drop-p1-1 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 12100);
            setTimeout(function() {  
                $("#scNu-a-3-drop-p2-0 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300);
                $("#scNu-a-3 .robot").removeClass("p1").addClass("p2");
            }, 13200);
            setTimeout(function() {  $("#scNu-a-3-drop-p2-1 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 14300);
            setTimeout(function() {  $("#scNu-a-3-drop-p2-2 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 15400);
            setTimeout(function() {  $("#scNu-a-3-drop-p2-2 img").animate({opacity:"1"}, 1000).animate({opacity:"0.4"}, 300)}, 15400);
            setTimeout(function() {  
                $("#scNu-a-3 .robot").removeClass("p2");
                if ($("#scNu-a-3").hasClass('jeu1Termine')) {
                    pointsJeu = 0;
                }
                else {
                    pointsJeu = $("#scNu-a-3 .pointsJeu1.pointsXP span").text();
                }
                finSeance("scNu-a-3", 1, pointsJeu);       
            }, 16500);

            $("#scNu-a-3 .robot")
            .animate({bottom:"95px"}, 1000)      
            .delay(100)   
            .animate({bottom:"169px"}, 1000) 
            .delay(100)
            .animate({left:"94px"}, 1000)         
            .delay(100)
            .animate({left:"167px"}, 1000)         
            .delay(100)
            .animate({left:"241px"}, 1000)         
            .delay(100)
            .animate({bottom:"242px"}, 1000)      
            .delay(100)   
            .animate({bottom:"314px"}, 1000)
            .delay(100)
            .animate({left:"315px"}, 1000)    
            .delay(100)
            .animate({left:"388px"}, 1000)         
            .delay(100)
            .animate({left:"461px"}, 1000)             
            .delay(100)
            .animate({bottom:"388px"}, 1000)      
            .delay(100)   
            .animate({bottom:"463px"}, 1000)      
            .delay(100) 
            .animate({left:"535px"}, 1000)    
            .delay(100)
            .animate({left:"608px"}, 1000)         
            .delay(100)
            .animate({left:"682px"}, 1000);                       
        }
    }
});

/* scNu-a-4  */ 
$(function() {
    parcours1 = 0;
    parcours2 = 0;
    $("#scNu-a-4 #submitParcours1").click(function () { 
        roueParcours1 = $("#scNu-a-4 #roueParcours1").val();
        vitesseParcours1 = $("#scNu-a-4 #vitesseParcours1").val();
        distanceParcourue1 = (parseInt(roueParcours1) + parseInt(vitesseParcours1))*8;
        $("#scNu-a-4 .robot-1").animate({left:distanceParcourue1+"%"}, 3000 / parseInt(vitesseParcours1));
        if (distanceParcourue1 >= 46 && distanceParcourue1 <= 49) { 
            $("#scNu-a-4 #submitParcours1").unbind( "click" );
            parcours1 = 1;  
            lesParcours()
        }
        else { setTimeout(function() { $("#scNu-a-4 .robot-1").animate({left:"2%"}, 3000)}, 5000) }
    })
    $("#scNu-a-4 #submitParcours2").click(function () { 
        roueParcours2 = $("#scNu-a-4 #roueParcours2").val();
        vitesseParcours2 = $("#scNu-a-4 #vitesseParcours2").val();
        distanceParcourue2 = ((parseInt(roueParcours2) * parseInt(vitesseParcours2))+parseInt(vitesseParcours2))*8;
        $("#scNu-a-4 .robot-2").animate({left:distanceParcourue2+"%"}, 3000 / parseInt(vitesseParcours2));
        if (distanceParcourue2 >= 69 && distanceParcourue2 <= 72) { 
            $("#scNu-a-4 #submitParcours2").unbind( "click" )
            parcours2 = 1;     
            lesParcours()
        }
        else { setTimeout(function() { $("#scNu-a-4 .robot-2").animate({left:"2%"}, 3000)}, 5000) }
    })
   
    function lesParcours(){
        if (parcours1 + parcours2 == 2) {
            setTimeout(function() {
                if ($("#scNu-a-4").hasClass('jeu1Termine')) {
                    pointsJeu = 0;
                }
                else {
                    pointsJeu = $("#scNu-a-4 .pointsJeu1.pointsXP span").text();
                }
                finSeance("scNu-a-4", 1, pointsJeu);       
            }, 1000);
        }
    }
});

/* scNu-a-5  */ 
$(function() {
    var idParent = "scNu-a-5";    
    var nbElementsDrag = 0;
    for (var i = 0;i < 5;i++) {
        $( "#"+idParent+" [class^=scNu-a-5-drag-]" ).draggable({revert: "invalid", snapTolerance:15});
        $( "#"+idParent+" .ordinateur").droppable({
            accept: "#"+idParent+" [class^=scNu-a-5-drag-]",
            hoverClass: "dropHover",
            drop: function(event, ui) {
                $(this).append($(ui.draggable));
                classCapteur = $(ui.draggable).find("span").attr("class");
                $(ui.draggable).replaceWith($(ui.draggable).html());  
                nbElementsDrag++;
                if (nbElementsDrag == 4)  {
                    $("#scNu-a-5 .paletteInstructions").switchClass( "hidden", "show", 1000, "easeInOutQuad" );
                    $("#"+idParent+" [class^=scNu-a-5-drag-]" ).draggable("disable");
                    $("#"+idParent+" [class^=scNu-a-5-drag2-]" ).draggable({revert: "invalid", snapTolerance:15});
                    $("#"+idParent+" [class^=capteur]").droppable({
                        accept: "#"+idParent+" [class^=scNu-a-5-drag2-]",
                        hoverClass: "dropHover",
                        drop: function(event, ui) {
                            nbElementsDrag--;
                            //$(this).droppable( "disable" );
                            $(this).append($(ui.draggable));
                            $(ui.draggable).replaceWith($(ui.draggable).html()); 
                            $(this).droppable( "disable" );
                            if (nbElementsDrag == 0)  {
                                // le robot s arrette a chaque ligne dont le capteur a ete choisi
                                tableau = [];
                                capteurRose = [11.9, 41.9];
                                capteurBleu = [19.3, 34.1, 49, 71.3, 86.2];
                                capteurJaune = [26.6, 56.4, 78.6];
                                capteurVert = [63.9, 93];
                                capteurOrange = [];
                                capteurRouge = [];
                                choix0 = $(".ordinateur .points-5").parent().attr("class").split(' ')[0];
                                choix1 = $(".ordinateur .points-10").parent().attr("class").split(' ')[0];
                                choix2 = $(".ordinateur .points-15").parent().attr("class").split(' ')[0];
                                choix3 = $(".ordinateur .points-20").parent().attr("class").split(' ')[0];
                                // transformer les strings en variables >> noms des variables dynamiques
                                tableau = tableau.concat(window[choix0],window[choix1],window[choix2],window[choix3]);
                                tableau.sort(function(a, b){return a-b});
                                points = [window[choix0].length,window[choix1].length,window[choix2].length,window[choix3].length];
                                score = points[0] * 5 + points[1] * 10 + points[2] * 15 + points[3] * 20;
                                $("#scNu-a-5 .action").switchClass( "hidden", "show", 1000, "easeInOutQuad" );
                                $("#scNu-a-5 .action").click(function () { 
                                    for (var i = 0; i < tableau.length; i++) {
                                        $("#scNu-a-5 .robot-1").animate({left:tableau[i]+"%"}, 1000).delay(100);
                                    };
                                    $("#scNu-a-5 .resultat").text(score+" sur 175");
                                    $("#scNu-a-5 .details li:nth-child(1) u:nth-child(1)").text(choix0.replace("capteur", ""));
                                    $("#scNu-a-5 .details li:nth-child(2) u:nth-child(1)").text(choix1.replace("capteur", ""));
                                    $("#scNu-a-5 .details li:nth-child(3) u:nth-child(1)").text(choix2.replace("capteur", ""));
                                    $("#scNu-a-5 .details li:nth-child(4) u:nth-child(1)").text(choix3.replace("capteur", ""));
                                    $("#scNu-a-5 .details li:nth-child(1) u:nth-child(2)").text(window[choix0].length);
                                    $("#scNu-a-5 .details li:nth-child(2) u:nth-child(2)").text(window[choix1].length);
                                    $("#scNu-a-5 .details li:nth-child(3) u:nth-child(2)").text(window[choix2].length);
                                    $("#scNu-a-5 .details li:nth-child(4) u:nth-child(2)").text(window[choix3].length);
                                    $("#scNu-a-5 .details li:nth-child(1) u:last-child").text(window[choix0].length+ " x 5 = "+window[choix0].length*5);
                                    $("#scNu-a-5 .details li:nth-child(2) u:last-child").text(window[choix1].length+ " x 10 = "+window[choix1].length*10);
                                    $("#scNu-a-5 .details li:nth-child(3) u:last-child").text(window[choix2].length+ " x 15 = "+window[choix2].length*15);
                                    $("#scNu-a-5 .details li:nth-child(4) u:last-child").text(window[choix3].length+ " x 20 = "+window[choix3].length*20);
                                    $("#scNu-a-5 .details li:last-child span").text(window[choix0].length*5+" + "+window[choix1].length*10+ " + "+window[choix2].length*15+" + "+window[choix3].length*20+ " = "+score);
                                    $(".score").fadeIn(500);
                                    if ($("#scNu-a-5").hasClass('jeu1Termine')) {
                                        pointsJeu = 0;
                                    }
                                    else {
                                        pointsJeu = $("#scNu-a-5 .pointsJeu1.pointsXP span").text();
                                    }
                                    finSeance("scNu-a-5", 1, pointsJeu);    
                                })   
                            }
                        }
                    })
                }
            }
        })
    }
});

/* scNu-a-6 */ 
$("#scNu-a-6 .ready0").click(function () {
    /* script pour anime rotate */
    (function ($) {
        function initData($el) {
            var _ARS_data = $el.data('_ARS_data');
            if (!_ARS_data) {
                _ARS_data = {
                    rotateUnits: 'deg',
                    scale: 1,
                    rotate: 0
                };
                $el.data('_ARS_data', _ARS_data);
            }
            return _ARS_data;
        }
        function setTransform($el, data) {
            $el.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
        }
        $.fn.rotate = function (val) {
            var $self = $(this), m, data = initData($self);
            if (typeof val == 'undefined') {
                return data.rotate + data.rotateUnits;
            }
            m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
            if (m) {
                if (m[3]) {
                    data.rotateUnits = m[3];
                }
                data.rotate = m[1];
                setTransform($self, data);
            }
            return this;
        };
        $.fn.scale = function (val) {
            var $self = $(this), data = initData($self);
            if (typeof val == 'undefined') {
                return data.scale;
            }
            data.scale = val;
            setTransform($self, data);
            return this;
        };
        var curProxied = $.fx.prototype.cur;
        $.fx.prototype.cur = function () {
            if (this.prop == 'rotate') {
                return parseFloat($(this.elem).rotate());
            } else if (this.prop == 'scale') {
                return parseFloat($(this.elem).scale());
            }
            return curProxied.apply(this, arguments);
        };
        $.fx.step.rotate = function (fx) {
            var data = initData($(fx.elem));
            $(fx.elem).rotate(fx.now + data.rotateUnits);
        };
        $.fx.step.scale = function (fx) {
            $(fx.elem).scale(fx.now);
        };
        var animateProxied = $.fn.animate;
        $.fn.animate = function (prop) {
            if (typeof prop['rotate'] != 'undefined') {
                var $self, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
                if (m && m[5]) {
                    $self = $(this);
                    data = initData($self);
                    data.rotateUnits = m[5];
                }
                prop['rotate'] = m[1];
            }
            return animateProxied.apply(this, arguments);
        };
    })(jQuery);
 
    $("#scNu-a-6 .intro").fadeOut(50);
    $("#scNu-a-6 .observation").fadeIn(500);

    $("#scNu-a-6 .ready1").click(function () {
        $("#scNu-a-6 .observation, #scNu-a-6 .circuitPJC").fadeOut(50);
        $("#scNu-a-6 .outils").fadeIn(500);
        $("html,body").animate( { scrollTop: $(".outils").height()}, 1000);

        $( "#scNu-a-6 .pieces div div").draggable({ revert: "invalid", snapTolerance: 15  });
        $( "#scNu-a-6 #robotVide" ).droppable({
            accept: ".pieces div div",
            hoverClass: "dropHover",
            drop: function( event, ui ) {
                idPiece = ui.draggable.parent().attr('id');
                $("#scNu-a-6 #robotVide").addClass(idPiece);
                $("#scNu-a-6 #robotVide").append($("#"+idPiece));
                $("#"+idPiece).replaceWith( $("#"+idPiece+" div").html());     
                if ($("#scNu-a-6 #robotVide").hasClass("moteur") && $("#scNu-a-6 #robotVide").hasClass("capteur") && $("#scNu-a-6 #robotVide").hasClass("brasComplet") && $("#scNu-a-6 #robotVide").hasClass("cerveau") && $("#scNu-a-6 #robotVide").hasClass("roueHaut1") && $("#scNu-a-6 #robotVide").hasClass("roueHaut2") && $("#scNu-a-6 #robotVide").hasClass("roueBas1") && $("#scNu-a-6 #robotVide").hasClass("roueBas2") ) {
                    $("#scNu-a-6 .pieces, #scNu-a-6 .titreConstRobot").fadeOut(500);
                    $("#scNu-a-6 .robotConstruire").animate({'min-height':'250px'}, 500);
                    $("#scNu-a-6 #robotVide").animate({rotate:'90deg','margin-top':'100px'}, 500);
                    $("#scNu-a-6 .instructions, #scNu-a-6 .titreEnvoiInst").fadeIn(500);

                    $("#scNu-a-6 .ready2").click(function () {
                        $("#scNu-a-6 .lignesCodesIntro").fadeOut(20);
                        $("#scNu-a-6 .instructions-1").fadeIn(500);
          
                        $("#scNu-a-6 .instructions-1 div").click(function () {
                            setTimeout(function() {
                                $("#scNu-a-6 .instructions-1").fadeOut(20);
                                $("#scNu-a-6 .instructions-2").fadeIn(500); 
                            }, 500);
                            $("#scNu-a-6 .code").animate({rotate:'-360deg'}, 1000);

                            $("#scNu-a-6 .instructions-2 div").click(function () {
                                setTimeout(function() {
                                    $("#scNu-a-6 .instructions-2").fadeOut(20);
                                    $("#scNu-a-6 .instructions-3").fadeIn(500);      
                                }, 500);
                                $("#scNu-a-6 .code").animate({rotate:'20deg'}, 50).animate({rotate:'-20deg'}, 50).animate({rotate:'20deg'}, 50).animate({rotate:'-20deg'}, 50).animate({rotate:'20deg'}, 50).animate({rotate:'0deg'}, 50);

                                $("#scNu-a-6 .instructions-3 div").click(function () {
                                    setTimeout(function() {
                                        $("#scNu-a-6 .instructions-3").fadeOut(20);
                                        $("#scNu-a-6 .instructions-4").fadeIn(500);   
                                    }, 500);
                                    $("#scNu-a-6 .code").animate({rotate:'360deg'}, 1000);

                                    $("#scNu-a-6 .instructions-4 div").click(function () {
                                        setTimeout(function() {
                                            $("#scNu-a-6 .instructions-4").fadeOut(20);
                                            $("#scNu-a-6 .instructions-5").fadeIn(500);        
                                        }, 500);
                                        $("#scNu-a-6 .code").animate({rotate:'20deg'}, 50).animate({rotate:'-20deg'}, 50).animate({rotate:'20deg'}, 50).animate({rotate:'-20deg'}, 50).animate({rotate:'20deg'}, 50).animate({rotate:'0deg'}, 50);
                                       
                                        $("#scNu-a-6 .instructions-5 div").click(function () {
                                            setTimeout(function() {
                                                $("#scNu-a-6 .instructions-5, #scNu-a-6 .lignesCode, #scNu-a-6 .titreEnvoiInst").fadeOut(20);
                                                $("#scNu-a-6 .transfere, #scNu-a-6 .envoiInstructions, #scNu-a-6 .titreEnvoiInst2").fadeIn(500);
                                            }, 500);
                                            $("#scNu-a-6 .code").animate({rotate:'-1080deg'}, 1000);

                                            $("#scNu-a-6 .transfere").click(function () {
                                                setTimeout(function() {
                                                    $("#scNu-a-6 .envoiInstructions, #scNu-a-6 .transfere, #scNu-a-6 #ordinateur").fadeOut(30)
                                                    $("#scNu-a-6 .termine").fadeIn(500);
                                                ;}, 600);
                                                $("#scNu-a-6 #robotVide").animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10);

                                                $("#scNu-a-6 .ready3").click(function () {
                                                    $(this).fadeOut(30);
                                                    $("#scNu-a-6 .termine, #scNu-a-6 .outils h5").fadeOut(30);
                                                    $("#scNu-a-6 .circuitPJC, #scNu-a-6 .main").fadeIn(500);
                                                    $(".circuitPJC").addClass("col-xs-6");
                                                    $(".outils").switchClass( "col-xs-12", "col-xs-3");
                                                    $(".robotConstruire").removeClass("col-sm-3");

                                                    $( "#scNu-a-6 #robotVide").draggable({ revert: "invalid", snapTolerance: 15  });
                                                    $( "#scNu-a-6 .circuitPJC" ).droppable({
                                                        accept: "#robotVide",
                                                        hoverClass: "dropHover",
                                                        drop: function( event, ui ) {
                                                            $(".outils").fadeOut(30);
                                                            $("#scNu-a-6 .circuitPJC").switchClass("col-xs-6", "noPadding");
                                                            $("#scNu-a-6 .robotCircuit, #scNu-a-6 .ready4, #scNu-a-6 .iSED, #scNu-a-6 .objetDepart").fadeIn(50);
                                                            $("#scNu-a-6 .main").fadeOut(20);
                                                            
                                                            $("#scNu-a-6 .ready4").click(function () {
                                                                $(this).fadeOut(50);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .robotCircuit").animate({left:'45%'}, 1200) // tt droit
                                                                    .animate({left:'39.6%',rotate:'-90deg',top:'19.1%'},1700) // gauche
                                                                    .animate({top:'23.1%'},1200) // tt droit
                                                                    .animate({rotate:'0deg',top:'32%',left:'35.5%'},1700) // droite
                                                                    .animate({rotate:'90deg',top:'25%',left:'30.9%'},1700) // droite
                                                                    .animate({top:'21%'},1200) // tt droit
                                                                    .animate({rotate:'0deg',top:'10.8%',left:'27%'},1700) // gauche
                                                                    .animate({left:'14%'},1200) // tt droit
                                                                    .animate({rotate:'-90deg',left:'9%',top:'20%'},1700) // gauche
                                                                    .animate({top:'25%'},1200,  
                                                                        function(){
                                                                            $('#scNu-a-6 .brasMini').animate({rotate:'90deg', left: '18%',top: '-50%'}, 300).animate({rotate:'0deg',left: '-29%',top: '30%'}, 4000);  
                                                                            setTimeout(function() {
                                                                                $('#scNu-a-6 .objetDepart').animate({left: '12.5%',top: '66.8%'}, 2000);  
                                                                            },2000);                                                                           
                                                                        }
                                                                    ) // debut ligne verte
                                                                    .animate({top:'60%'},6000,
                                                                        function(){
                                                                            $('#scNu-a-6 .objetDepart').fadeOut(200);
                                                                            $("#scNu-a-6 .objetTransport").fadeIn(200);
                                                                        }
                                                                    )  // fin ligne verte
                                                                    .animate({top:'64%'},1200) // tt droit
                                                                    .animate({left:'14%',rotate:'-180deg',top:'72.2%'},1700) // gauche
                                                                    .animate({left:'46.5%'},1200) // tt droit
                                                                    .animate({left:'51.6%',rotate:'-270deg',top:'70%'},1700) // gauche
                                                                    .animate({top:'61%'},1200) // tt droit
                                                                    .animate({left:'56%',rotate:'-180deg',top:'52%'},1700) // droite
                                                                    .animate({left:'60.3%',rotate:'-90deg',top:'60%'},1700) // droite
                                                                    .animate({top:'62%'},1200) // tt droit
                                                                    .animate({left:'64%',rotate:'-180deg',top:'72.2%'},1700) // gauche
                                                                    .animate({left:'77%'},1200) // tt droit
                                                                    .animate({left:'82.15%',rotate:'-270deg',top:'69%'},1700) // gauche 
                                                                    .animate({top:'64%'},1200,  
                                                                        function(){
                                                                            $('#scNu-a-6 .brasMini').animate({rotate:'35deg', left:'-20%',top: '-22%'}, 3800).animate({rotate:'0deg',left: '-29%',top: '30%'}, 300);  
                                                                            $('#scNu-a-6 .objetTransport').animate({top: '-75%'}, 3200);  
                                                                            setTimeout(function(){
                                                                                $('#scNu-a-6 .objetTransport').fadeOut(50);
                                                                                $("#scNu-a-6 .objetArrive").fadeIn(50);
                                                                            }, 3200);
                                                                        }
                                                                    ) // debut ligne rouge
                                                                    .animate({top:'30%'},6000) // fin ligne rouge
                                                                    .animate({top:'21%'},1200) // tt droit
                                                                    .animate({left:'76%',rotate:'-360deg',top:'10.8%'},1700) // gauche
                                                                    .animate({left:'64%'},1200) // tt droit
                                                                }, 500);

                                                                $("#scNu-a-6 .iSED .instDirMoteur .instrDir1").removeClass("displayNone")
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirMoteur .instrDir1").addClass("displayNone")
                                                                }, 500);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 1700);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone");
                                                                }, 3400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir6, #scNu-a-6 .iSED .instDirRoues .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // droite
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone"); 
                                                                }, 4600);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir6, #scNu-a-6 .iSED .instDirRoues .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // droite
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone"); 
                                                                }, 6300);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir6, #scNu-a-6 .iSED .instDirRoues .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone"); 
                                                                }, 8000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 9200);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone");
                                                                }, 10900);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 12100);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone");
                                                                }, 13800);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir3, #scNu-a-6 .iSED .instDirBras .instrDir2").removeClass("displayNone"); // ligne verte
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 15000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir3, #scNu-a-6 .iSED .instDirBras .instrDir2").addClass("displayNone"); 
                                                                }, 21000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");                                                                    
                                                                }, 22200);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone");
                                                                }, 23900);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 25100);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone"); 
                                                                }, 26800);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCerveau .instrDir8, #scNu-a-6 .iSED .instDirCapteur .instrDir6, #scNu-a-6 .iSED .instDirRoues .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // droite
                                                                    $("#scNu-a-6 .iSED .instDirCerveau .instrDir3, #scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 28000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir6, #scNu-a-6 .iSED .instDirRoues .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // droite
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 29700);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir6, #scNu-a-6 .iSED .instDirRoues .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone");
                                                                }, 31400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 32600);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone");
                                                                }, 34300);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 35500);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone");
                                                                }, 37200);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir3, #scNu-a-6 .iSED .instDirBras .instrDir1").removeClass("displayNone"); // ligne rouge
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");                                                                
                                                                }, 38400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir3, #scNu-a-6 .iSED .instDirMoteur .instrDir3,  #scNu-a-6 .iSED .instDirBras .instrDir1").addClass("displayNone");
                                                                }, 44400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").removeClass("displayNone"); // gauche
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                }, 45600);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").removeClass("displayNone"); // tt droit
                                                                    $("#scNu-a-6 .iSED .instDirCapteur .instrDir5, #scNu-a-6 .iSED .instDirRoues .instrDir2, #scNu-a-6 .iSED .instDirMoteur .instrDir4").addClass("displayNone")
                                                                }, 47300); // fin
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iSED .instDirMoteur .instrDir2").removeClass("displayNone") // fin
                                                                    $("#scNu-a-6 .iSED .instDirMoteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir1, #scNu-a-6 .iSED .instDirCapteur .instrDir4, #scNu-a-6 .iSED .instDirRoues .instrDir1, #scNu-a-6 .iSED .instDirMoteur .instrDir5").addClass("displayNone");
                                                                    $("#scNu-a-6 .ready5").fadeIn(500);
                                                                }, 48500); // couper moteur
                                                            });

                                                            $("#scNu-a-6 .ready5").click(function () {
                                                                $(this).fadeOut(50);
                                                                $("#scNu-a-6 .iSED, #scNu-a-6 .circuitPJC").fadeOut(50);
                                                                $("#scNu-a-6 .iED").fadeIn(50);
                                                                $("#scNu-a-6 .iED .instDirMoteur .instrDir1, #scNu-a-6 .iED .instDirCerveau .instrDir1, #scNu-a-6 .iED .instDirCerveau .instrDir3").addClass("txtJaune")
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirMoteur .instrDir1, #scNu-a-6 .iED .instDirCerveau .instrDir1").removeClass("txtJaune")
                                                                }, 500);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 1700);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune");
                                                                }, 3400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir8, #scNu-a-6 .iED .instDirCapteur .instrDir6, #scNu-a-6 .iED .instDirRoues .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // droite
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune"); 
                                                                }, 4600);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir8, #scNu-a-6 .iED .instDirCapteur .instrDir6, #scNu-a-6 .iED .instDirRoues .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // droite
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune"); 
                                                                }, 6300);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir8, #scNu-a-6 .iED .instDirCapteur .instrDir6, #scNu-a-6 .iED .instDirRoues .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune"); 
                                                                }, 8000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 9200);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune");
                                                                }, 10900);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 12100);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune");
                                                                }, 13800);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir4, #scNu-a-6 .iED .instDirCapteur .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir3, #scNu-a-6 .iED .instDirBras .instrDir2").addClass("txtJaune"); // ligne verte
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 15000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir4, #scNu-a-6 .iED .instDirCapteur .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir3, #scNu-a-6 .iED .instDirBras .instrDir2").removeClass("txtJaune"); 
                                                                }, 21000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");                                                                    
                                                                }, 22200);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune");
                                                                }, 23900);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 25100);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune"); 
                                                                }, 26800);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir8, #scNu-a-6 .iED .instDirCapteur .instrDir6, #scNu-a-6 .iED .instDirRoues .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // droite
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 28000);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir8, #scNu-a-6 .iED .instDirCapteur .instrDir6, #scNu-a-6 .iED .instDirRoues .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // droite
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 29700);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir8, #scNu-a-6 .iED .instDirCapteur .instrDir6, #scNu-a-6 .iED .instDirRoues .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune");
                                                                }, 31400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 32600);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune");
                                                                }, 34300);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 35500);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune");
                                                                }, 37200);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir5, #scNu-a-6 .iED .instDirCapteur .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir3, #scNu-a-6 .iED .instDirBras .instrDir1").addClass("txtJaune"); // ligne rouge
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");                                                                
                                                                }, 38400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir5, #scNu-a-6 .iED .instDirCapteur .instrDir3, #scNu-a-6 .iED .instDirMoteur .instrDir3,  #scNu-a-6 .iED .instDirBras .instrDir1").removeClass("txtJaune");
                                                                }, 44400);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").addClass("txtJaune"); // gauche
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 45600);
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").addClass("txtJaune"); // tt droit
                                                                    $("#scNu-a-6 .iED .instDirCerveau .instrDir7, #scNu-a-6 .iED .instDirCapteur .instrDir5, #scNu-a-6 .iED .instDirRoues .instrDir2, #scNu-a-6 .iED .instDirMoteur .instrDir4").removeClass("txtJaune")
                                                                }, 47300); // fin
                                                                setTimeout(function() {
                                                                    $("#scNu-a-6 .iED .instDirMoteur .instrDir2, #scNu-a-6 .iED .instDirCerveau .instrDir2").addClass("txtJaune") // fin
                                                                    $("#scNu-a-6 .iED .instDirMoteur .instrDir1, #scNu-a-6 .iED .instDirCerveau .instrDir1, #scNu-a-6 .iED .instDirCerveau .instrDir3, #scNu-a-6 .iED .instDirCapteur .instrDir1, #scNu-a-6 .iED .instDirCapteur .instrDir4, #scNu-a-6 .iED .instDirRoues .instrDir1, #scNu-a-6 .iED .instDirMoteur .instrDir5").removeClass("txtJaune");
                                                                }, 48500); // couper moteur

                                                                setTimeout(function() {
                                                                    if ($("#scNu-a-6").hasClass('jeu1Termine')) {
                                                                        pointsJeu = 0;
                                                                    }
                                                                    else {
                                                                        pointsJeu = $("#scNu-a-6 .pointsjeu1.pointsXP span").text();
                                                                    }
                                                                    finSeance("scNu-a-6", 1, pointsJeu);       
                                                                }, 52000);

                                                            });
                                                        }
                                                    });    
                                                });
                                            });                      
                                        });
                                    });
                                });
                            });
                        });
                    });
                }     // if
            } // function drag drop
        }); // droppable
    });                    
});

// demarche scientifique - scNu-a-8
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


/* scNu-a-8 jeu2 */ 
$(function() {
    $("#scNu-a-8 .startJeu").click(function () {
        $(this).fadeOut();
        sourceJeu = $("#scNu-a-8 .sourceJeu").html();
        $(sourceJeu).clone().appendTo("#scNu-a-8 .instructionsJeu");
        robotAutonome ();

        function robotAutonome () {
            $('.briquesProgramme a').tooltip(); // bug car les tooltips ne fonctionnent pas sans cette ligne
            parcours = null;
            nbCheckpoints = null;

            $( "#scNu-a-8 .instructionsJeu .ligneBleue, #scNu-a-8 .instructionsJeu .ligneJaune, #scNu-a-8 .instructionsJeu .sphereRose, #scNu-a-8 .instructionsJeu .sphereVerte" ).draggable({ revert: "invalid", snapTolerance: 15  });
            $( "#scNu-a-8 .jeu2 .instructionsJeu .programme" ).droppable({
                accept: ".ligneBleue, .ligneJaune",
                hoverClass: "dropHover",
                drop: function( event, ui ) {
                    $("#scNu-a-8 .jeu2 .instructionsJeu .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                    $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")+"<hr/>"); 
                    $(".instructionsJeu .capteurs").fadeOut(300);
                    $(".instructionsJeu .obstacles").fadeIn(1500);
                    $(".instructionsJeu .obstacleJaune, .instructionsJeu .obstacleBleu" ).draggable({ revert: "invalid", snapTolerance: 15  });
                    $( "#scNu-a-8 .jeu2 .instructionsJeu .programme" ).droppable({
                        accept: ".instructionsJeu .obstacleJaune, .instructionsJeu .obstacleBleu",
                        hoverClass: "dropHover",
                        drop: function( event, ui ) {
                            $("#scNu-a-8 .jeu2 .instructionsJeu .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                            $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")+"<hr/>"); 
                            $(".instructionsJeu .obstacles").fadeOut(300);
                            $(".instructionsJeu .spheres").fadeIn(1500);
                            $( "#scNu-a-8 .jeu2 .instructionsJeu .programme" ).droppable({
                                accept: ".instructionsJeu .sphereRose, .instructionsJeu .sphereVerte",
                                hoverClass: "dropHover",
                                drop: function( event, ui ) {
                                    $("#scNu-a-8 .jeu2 .instructionsJeu .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                                    $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")+"<hr/>");                        
                                    $(".instructionsJeu .spheres").fadeOut(300);
                                    $(".instructionsJeu .murs").fadeIn(1500);
                                    $( ".instructionsJeu .murVert, .instructionsJeu .murRose" ).draggable({ revert: "invalid", snapTolerance: 15  });
                                    $( "#scNu-a-8 .jeu2 .instructionsJeu .programme" ).droppable({
                                        accept: ".instructionsJeu .murRose, .instructionsJeu .murVert",
                                        hoverClass: "dropHover",
                                        drop: function( event, ui ) {
                                            $("#scNu-a-8 .jeu2 .instructionsJeu .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                                            $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")); 
                                            $(".instructionsJeu .murs, .instructionsJeu .briquesProgramme").fadeOut(300);
                                            $(".instructionsJeu .generateurRobot").fadeIn(1500);
                                            robotHeight = $("#scNu-a-8 .jeu2 [class^=robot-]").height()
                                            robotWidth = $("#scNu-a-8 .jeu2 [class^=robot-]").width()

                                            $("#scNu-a-8 .instructionsJeu .generateurRobot").click(function () {     
                                                $(this).fadeOut(200);                   
                                                if ($("#scNu-a-8 .jeu2 .instructionsJeu .programme").hasClass("capteur-ligneBleue") && $(".instructionsJeu .programme").hasClass("capteur-obstacleBleu") && $(".instructionsJeu .programme").hasClass("capteur-sphereRose") && $(".instructionsJeu .programme").hasClass("capteur-murRose") ) {
                                                    $(".instructionsJeu .robot-bBRR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",5);
                                                    $(".restart .explication").text("Ton robot ne sait pas franchir les obstacles verts ! Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .instructionsJeu .programme").hasClass("capteur-ligneBleue") && $(".instructionsJeu .programme").hasClass("capteur-obstacleBleu") && $(".instructionsJeu .programme").hasClass("capteur-sphereRose") && $(".instructionsJeu .programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-bBRV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",8);
                                                    $(".restart .explication").text("Ton robot ne sait pas sauter par dessus les obstacles jaunes ! Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");                                                                                            
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                    $(".robot-bBVR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",5);
                                                    $(".restart .explication").text("Ton robot ne sait ni franchir les murs roses, ni sauter entre les sphères roses, ni sauter par dessus les obstacles jaunes ! Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-bBVV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",6);
                                                    $(".restart .explication").text("Ton robot ne sait ni sauter entre les sphères roses, ni sauter par dessus les obstacles jaunes ! Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murRose") ) {
                                                    $(".robot-bJRR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",5);          
                                                    $(".restart .explication").text("Tu ne peux choisir qu\'un seul mur à traverser alors que ce sur parcours il y en a deux différents. Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                    $(".robot-bJVR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",5);
                                                    $(".restart .explication").text("Ton robot ne sait ni sauter entre les sphères roses, ni franchir les murs verts ! Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-bJRV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",21);
                                                    $(".restart .explication").text("Tu ne peux choisir qu\'un seul mur à traverser alors qu\'il y en a deux différents sur ce parcours. Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-bJVV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("b",6);
                                                    $(".restart .explication").text("Ton robot ne sait ni sauter entre les sphères roses, ni franchir les murs roses ! Ensuite, es-tu certain qu\'il s\'agisse de la bonne ligne de couleur à suivre ?");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murRose") ) {
                                                    $(".robot-jBRR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",6);
                                                    $(".restart .explication").text("Tu y étais presque ! N\'oublies pas que ton robot doit être capable de sauter d\'une sphère verte à l\'autre.");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-jBRV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",5);                       
                                                    $(".restart .explication").text("Tu es proche de la bonne solution ! N\'oublies pas que ton robot doit être capable de sauter d\'une sphère verte à l\'autre, mais aussi de franchir les murs roses.");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                    $(".robot-jBVR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",22);
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-jBVV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",5);
                                                    $(".restart .explication").text("Tu y étais presque ! N\'oublies pas que ton robot doit être capable de franchir les murs roses.");                                                                                            
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murRose") ) {
                                                    $(".robot-jJRR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",6);
                                                    $(".restart .explication").text("Tu n\'es pas très loin de la bonne solution ! N\'oublies pas que ton robot doit être capable de sauter par dessus les blocs bleus, mais aussi d\'une sphère verte à l\'autre.");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                    $(".robot-jJVR, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",8);
                                                    $(".restart .explication").text("Tu y es presque ! N\'oublies pas que ton robot doit être capable de sauter par dessus les blocs bleus.");                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-jJRV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",5);
                                                    $(".restart .explication").text("Ton robot ne sait ni sauter par dessus les blocs bleus, ni sauter d\'une sphère verte à l\'autre, ni franchir les murs roses !");                                                                                             
                                                };
                                                if ($("#scNu-a-8 .jeu2 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                    $(".robot-jJVV, .instructionsJeu .executer").fadeIn(2000);
                                                    coordonnees("j",5);
                                                    $(".restart .explication").text("Ton robot ne sait ni sauter par dessus les blocs bleus, ni franchir les murs roses ! A toi de jouer ;)");                                                                                                                                             
                                                };                                        
                                            })
                                        }    
                                    })    
                                }
                            });
                        }
                    });
                }
            });
        }
        function coordonnees(parcours, nbCheckpoints) {
            $("#scNu-a-8 .jeu2 .instructionsJeu .executer").click(function () {  
                $(this).fadeOut(200);                   
                for (var i = 0; i < nbCheckpoints; i++) {
                    // on recupere les coordonnees x et y
                    divsCheckPosition = $(".checkPoint-"+parcours+"-" + i).position();
                    $("#scNu-a-8 .jeu2 [class^=robot-]").animate({
                        "left": divsCheckPosition.left - robotHeight/2.2,
                        "top": divsCheckPosition.top - robotWidth/2.2
                    }, 1000);
                    if (nbCheckpoints == 6) {
                        setTimeout(function() { 
                            badCheckPosition = $(".badCheckPoint-"+parcours).position();
                            $("#scNu-a-8 .jeu2 [class^=robot-]").animate({
                                "left": badCheckPosition.left - robotHeight/2.2,
                                "top": badCheckPosition.top - robotWidth/2.2
                            }, 1000);
                        }, 5000);
                    };
                }
                if (nbCheckpoints != 22) {
                    $("#scNu-a-8 .restart").fadeIn(3000);
                    $("#scNu-a-8 .jeu2 .restart").click(function () {  
                        $(this).fadeOut();    
                        $("#scNu-a-8 .jeu2 [class^=robot-]").css("left","7.9%").css("top","45.7%").fadeOut();

                        sourceJeu = $("#scNu-a-8 .sourceJeu").html();
                        $("#scNu-a-8 .instructionsJeu").html(sourceJeu);                   
                        robotAutonome();
                    })
                }
                if (nbCheckpoints == 22) {
                    setTimeout(function() {
                        if ($("#scNu-a-8").hasClass('jeu2Termine')) {
                            pointsJeu = 0;
                        }
                        else {
                            pointsJeu = $("#scNu-a-8 .pointsjeu2.pointsXP span").text();
                        }
                        finSeance("scNu-a-8", 2, pointsJeu);       
                    }, 20000);
                }
            });
        }
    }); 
});

/* scNu-a-10 Quiz */ 
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>Qu'est-ce qui caractérise un robot autonome ?",
            ans: "Il est capable par lui-même d\'analyser son environnement, de prendre des décisions et de les appliquer dans le but de remplir la mission qui lui est assignée (ex : nettoyer le sol d\'un appartement).", 
            ansSel: ["Il a provoqué lui-même sa naissance, et contrairement aux robots traditionnels, il est capable de grandir.", "Il est capable de fonctionner sans pile."]
        },
        {
            ques: "<u>Question 2</u><br/>Quel est le principe de fonctionnement d\'un robot autonome ?",
            ans: "Perception – décision – action.",
            ansSel: [ "Action – perception – décision.", "Décision – perception – action.", "Action – décision – perception." ]
        },
        {
            ques: "<u>Question 3</u><br/>Quel est le rôle d\'un capteur ?",
            ans: "Transformer un phénomène physique (ex : intensité lumineuse) en une grandeur électrique mesurable (ex : tension, courant, fréquence)",
            ansSel: [ "Enregistrer les informations qu'il perçoit.", "Prendre une décision quand il est face à un obstacle."]
        },
        {
            ques: "<u>Question 4</u><br/>Parmi les propositions suivantes, quels sont les deux capteurs les mieux adaptés pour repérer une ligne noire marquée au sol ?",
            ans: "Capteur de couleur ou de lumière",
            ansSel: [ "Capteur de couleur ou magnétique", "Capteur de contact ou de distance", "Capteur d\'orientation ou de lumière." ]
        },
        {
            ques: "<u>Question 5</u><br/>Dans quels appareils courants trouve-t\'on des capteurs de couleurs ?",
            ans: "Les appareils photo numériques (standards et smartphones).",
            ansSel: [ "Une tablette graphique (Outils qui remplace la souris par un stylo et une sorte d\'ardoise.", "Une manette sans fil pour console de jeux-vidéo." ]
        },
        {
            ques: "<u>Question 6</u><br/>Quelles sont les possibilités des moteurs du kit LEGO ?",
            ans: "Tourner à une vitesse donnée (commande en vitesse) et tourner à un angle donné (commande en position).",
            ansSel: [ "Se recharger automatiquement, sans avoir besoin d\'une source énergétique.", "Ils peuvent servir de capteur de distance." ]
        },
        {
            ques: "<u>Question 7</u><br/>Quelle est la manière la plus fiable de faire avancer le robot à une distance donnée ?",
            ans: "Faire tourner ses moteurs à un angle donné (on choisit le nombre de tours).",
            ansSel: [ "Faire tourner ses moteurs pendant un certain temps (on choisit la durée)." ]
        },
        {
            ques: "<u>Question 8</u><br/>De quoi est composé un programme ?",
            ans: "D\'instructions.",
            ansSel: [ "De questions.", "De propositions." ]
        },
        {
            ques: "<u>Question 9</u><br/>Dans un programme, quelle est la construction utilisée pour répéter une action plusieurs fois ?",
            ans: "Une boucle.",
            ansSel: [ "Un test.", "Une contradiction"]
        },
        {
            ques: "<u>Question 10</u><br/>Dans un programme, quelle est la construction utilisée pour choisir entre plusieurs actions ?",
            ans: "Un test.",
            ansSel: [ "Une boucle.", "Une interrogation." ]
        }
        ]
    },
    options = {
        animationType: 0,
        showHTML: true,
        showWrongAns: true,
        random: false,
        title: "Quiz du parcours Numérique"
    };
    $("#quizScNu-a-10").jQuizMe(quizMulti, options);
});


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