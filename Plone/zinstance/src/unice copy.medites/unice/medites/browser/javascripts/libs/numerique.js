// avatar des titres 
$(document).ready(function(){
    $(".introSeance img").attr("src","++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/faceAnimGrand.png");
    $("#scNu-P1 .clear").click(function () {  localStorage.removeItem('scNu-P1-Regles'); });
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
            $( "#scNu-a-1 .jeu1 .pensee-drag-"+i ).draggable({ revert: "invalid" });
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
        $( ".scNu-a-1-drag0-"+i ).draggable({ revert: "invalid" });
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
            $( "#scNu-a-1 .jeu3 .instruction-drag-1, #scNu-a-1 .jeu3 .instruction-drag-2" ).draggable({ revert: "invalid" });
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
        $( "#scNu-a-2-drag-"+i ).draggable({ revert: "invalid" });
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
        $( ".scNu-a-3-drag-"+i ).draggable({ revert: "invalid" });
        $( ".scNu-a-3-drag-p"+i ).draggable({ revert: "invalid" });
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
    $("[class^=scNu-a-5-drag-]").draggable({ revert: "invalid" });
    $("[class^=scNu-a-5-drop-]").droppable({
        accept: "[class^=scNu-a-5-drag-]",
        hoverClass: "dropHover",
        drop: function(event, ui) {
            $(this).addClass( "ouvert" );
            $(this).prepend($(ui.draggable));
            classCapteur = $(ui.draggable).find("span").attr("class");
            pointsCase = $(this).droppable().next("div").find("u").text();
            $(ui.draggable).replaceWith("<span class="+classCapteur+">Chaque ligne "+classCapteur.replace("capteur", "")+" vaudra "+pointsCase+"</span>");  
            $(this).droppable( "disable" );
            // ajouter fonction pour la suite
            tableau = [];
            capteurRose = [11.9, 41.9];
            capteurBleu = [19.3, 34.1, 49, 71.1, 85.8];
            capteurJaune = [26.6, 56.4, 78.4];
            capteurVert = [63.9, 92.7];
            capteurOrange = [];
            capteurRouge = [];
            choix0 = $(".scNu-a-5-drop-0").children().attr("class");
            choix1 = $(".scNu-a-5-drop-1").children().attr("class");
            choix2 = $(".scNu-a-5-drop-2").children().attr("class");
            choix3 = $(".scNu-a-5-drop-3").children().attr("class");
            // transformer les strings en variables >> noms des variables dynamiques
            tableau = tableau.concat(window[choix0],window[choix1],window[choix2],window[choix3]);
            tableau.sort(function(a, b){return a-b});

            points = [window[choix0].length,window[choix1].length,window[choix2].length,window[choix3].length];
            score = points[0] * 5 + points[1] * 10 + points[2] * 15 + points[3] * 20;

            // le robot s arrette a chaque ligne dont le capteur a ete choisi
            var nb_ouvert = $("#scNu-a-5 .ouvert").length;
            if (nb_ouvert == 4)  {
                for (var i = 0; i < tableau.length; i++) {
                    $("#scNu-a-5 .robot-1").animate({left:tableau[i]+"%"}, 1000).delay(100);
                };
                $("#scNu-a-5 .resultat").text(score+" sur 175");
                $("#scNu-a-5 .details li:nth-child(1) span:nth-child(2)").text(choix0.replace("capteur", ""));
                $("#scNu-a-5 .details li:nth-child(2) span:nth-child(2)").text(choix1.replace("capteur", ""));
                $("#scNu-a-5 .details li:nth-child(3) span:nth-child(2)").text(choix2.replace("capteur", ""));
                $("#scNu-a-5 .details li:nth-child(4) span:nth-child(2)").text(choix3.replace("capteur", ""));
                $("#scNu-a-5 .details li:nth-child(1) span:nth-child(4)").text(window[choix0].length);
                $("#scNu-a-5 .details li:nth-child(2) span:nth-child(4)").text(window[choix1].length);
                $("#scNu-a-5 .details li:nth-child(3) span:nth-child(4)").text(window[choix2].length);
                $("#scNu-a-5 .details li:nth-child(4) span:nth-child(4)").text(window[choix3].length);
                $("#scNu-a-5 .details li:nth-child(1) span:last-child").text(window[choix0].length+ " x 5 = "+window[choix0].length*5);
                $("#scNu-a-5 .details li:nth-child(2) span:last-child").text(window[choix1].length+ " x 10 = "+window[choix1].length*10);
                $("#scNu-a-5 .details li:nth-child(3) span:last-child").text(window[choix2].length+ " x 15 = "+window[choix2].length*15);
                $("#scNu-a-5 .details li:nth-child(4) span:last-child").text(window[choix3].length+ " x 20 = "+window[choix3].length*20);
                $("#scNu-a-5 .details li:last-child span:nth-child(2)").text(window[choix0].length*5+" + "+window[choix1].length*10+ " + "+window[choix2].length*15+" + "+window[choix3].length*20+ " = "+score);
                $(".score").fadeIn(500);

                if ($("#scNu-a-5").hasClass('jeu1Termine')) {
                    pointsJeu = 0;
                }
                else {
                    pointsJeu = $("#scNu-a-5 .pointsJeu1.pointsXP span").text();
                }
                finSeance("scNu-a-5", 1, pointsJeu);       
            }
        }
    })
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

        $( "#scNu-a-6 .pieces div div").draggable({ revert: "invalid" });
        $( "#scNu-a-6 #robotVide" ).droppable({
            accept: ".pieces div div",
            hoverClass: "dropHover",
            drop: function( event, ui ) {
                idPiece = ui.draggable.parent().attr('id');
                $("#scNu-a-6 #robotVide").addClass(idPiece);
                $("#scNu-a-6 #robotVide").append($("#"+idPiece));
                $("#"+idPiece).replaceWith( $("#"+idPiece+" div").html());     
                if ($("#scNu-a-6 #robotVide").hasClass("moteur") && $("#scNu-a-6 #robotVide").hasClass("capteur") && $("#scNu-a-6 #robotVide").hasClass("brasComplet") && $("#scNu-a-6 #robotVide").hasClass("cerveau") && $("#scNu-a-6 #robotVide").hasClass("roueHaut1") && $("#scNu-a-6 #robotVide").hasClass("roueHaut2") && $("#scNu-a-6 #robotVide").hasClass("roueBas1") && $("#scNu-a-6 #robotVide").hasClass("roueBas2") ) {
                    $("#scNu-a-6 .pieces").fadeOut(500);
                    $("#scNu-a-6 .robotConstruire").animate({'min-height':'250px'}, 500);
                    $("#scNu-a-6 #robotVide").animate({rotate:'90deg','margin-top':'100px'}, 500);
                    $("#scNu-a-6 .instructions").fadeIn(500);

                    $("#scNu-a-6 .ready2").click(function () {
                        $("#scNu-a-6 .lignesCodesIntro").fadeOut(300);
                        $("#scNu-a-6 .instructions-1").fadeIn(500);
                        $("#scNu-a-6 .main").fadeIn(500);

                        $( "#scNu-a-6 [class^=instructions-] div").draggable({ revert: "invalid" });
                        $( "#scNu-a-6 .ordinateur" ).droppable({
                            accept: "#scNu-a-6 [class^=instructions-] div",
                            hoverClass: "anim",
                            hoverClass: "dropHover",
                            drop: function( event, ui ) {
                                classInsctruction = ui.draggable.attr('class');
                                $("#scNu-a-6 .ordinateur").addClass(classInsctruction);

                                $("#scNu-a-6 .code").animate({rotate:'10deg'}, 50).animate({rotate:'-10deg'}, 50).animate({rotate:'10deg'}, 50).animate({rotate:'-10deg'}, 50).animate({rotate:'10deg'}, 50).animate({rotate:'0deg'}, 50);
                            
                                if ($("#scNu-a-6 .ordinateur").hasClass("instructionsMoteur")) {
                                    $("#scNu-a-6 .instructions-1").fadeOut(20)
                                    $("#scNu-a-6 .instructions-2").fadeIn(500)
                                };
                                if ($("#scNu-a-6 .ordinateur").hasClass("instructionsRoues")) {
                                    $("#scNu-a-6 .instructions-2").fadeOut(20)
                                    $("#scNu-a-6 .instructions-3").fadeIn(500)
                                };
                                if ($("#scNu-a-6 .ordinateur").hasClass("instructionsCapteurCouleur")) {
                                    $("#scNu-a-6 .instructions-3").fadeOut(20)
                                    $("#scNu-a-6 .instructions-4").fadeIn(500)
                                };
                                if ($("#scNu-a-6 .ordinateur").hasClass("instructionsBras")) {
                                    $("#scNu-a-6 .instructions-4").fadeOut(20)
                                    $("#scNu-a-6 .instructions-5").fadeIn(500)
                                };
                                if ($("#scNu-a-6 .ordinateur").hasClass("instructionsCerveau")) {
                                    $("#scNu-a-6 .instructions-5").fadeOut(20)
                                };
                                if ($("#scNu-a-6 .ordinateur").hasClass("instructionsMoteur") && $("#scNu-a-6 .ordinateur").hasClass("instructionsRoues") && $("#scNu-a-6 .ordinateur").hasClass("instructionsCapteurCouleur") && $("#scNu-a-6 .ordinateur").hasClass("instructionsBras") && $("#scNu-a-6 .ordinateur").hasClass("instructionsCerveau") ) {
                                    $("#scNu-a-6 .lignesCode").fadeOut(30);
                                    $("#scNu-a-6 .transfere").fadeIn(500);
                                    $("#scNu-a-6 .envoiInstructions").fadeIn(500);

                                    $("#scNu-a-6 .transfere").click(function () {
                                        $("#scNu-a-6 .envoiInstructions").fadeOut(30);
                                        $("#scNu-a-6 #robotVide").animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10).animate({left:'1px'}, 50).animate({'left':'-1px'}, 10);
                                        $("#scNu-a-6 .transfere").fadeOut(500);
                                        $("#scNu-a-6 #ordinateur").fadeOut(30);
                                        $("#scNu-a-6 .termine").fadeIn(500);

                                        $("#scNu-a-6 .ready3").click(function () {
                                            $("#scNu-a-6 .circuitPJC").fadeIn(500);
                                            $("#scNu-a-6 .termine").fadeOut(30);
                                            $(".outils").switchClass( "col-xs-12", "col-xs-3");
                                            $(".robotConstruire").removeClass("col-sm-3");

                                            $( "#scNu-a-6 #robotVide").draggable({ revert: "invalid" });
                                            $( "#scNu-a-6 .circuitPJC" ).droppable({
                                                accept: "#robotVide",
                                                hoverClass: "dropHover",
                                                drop: function( event, ui ) {
                                                    $(".outils").fadeOut(30);
                                                    $(".robotCircuit").fadeIn(50)
                                                    $("#scNu-a-6 .ready4").fadeIn(50)

                                                    $("#scNu-a-6 .ready4").click(function () {
                                                        $("this").fadeOut(50)
                                                        $("#scNu-a-6 .robotCircuit").animate({left:'42%'}, 500)
                                                        .animate({left:'40%',rotate:'-45deg',top:'16%'},1000)
                                                        .animate({rotate:'-90deg',top:'20%'},1000)
                                                        .animate({left:'39%',top:'30%'},500)
                                                        .animate({rotate:'-45deg',top:'34%',left:'36%'},1000)
                                                        .animate({rotate:'0deg',top:'34%',left:'33%'},1000)
                                                        .animate({rotate:'45deg',top:'30%',left:'36%'},1000)
                                                        .animate({rotate:'90deg',top:'25%',left:'30.9%'},1000)
                                                        .animate({top:'19%'},500)
                                                        .animate({rotate:'45deg',top:'16%',left:'31%'},1000)
                                                        .animate({rotate:'0deg',top:'11.6%',left:'26%'},1000)
                                                        .animate({left:'12%'},500)
                                                        .animate({left:'9%',rotate:'-45deg',top:'16%'},1000)
                                                        .animate({rotate:'-90deg',top:'20%'},1000)
                                                        .animate({top:'25%'},500,  
                                                            function(){
                                                                $('#scNu-a-6 .brasMini').animate({rotate:'90deg'}, 300).animate({rotate:'0deg'}, 3000);  
                                                            })
                                                        .animate({top:'60%'},3000)
                                                        .animate({top:'66%'},10)
                                                        .animate({left:'12%',rotate:'-135deg',top:'75%'},1000)
                                                        .animate({left:'14%',rotate:'-180deg',top:'76%'},1000)
                                                        .animate({left:'48%'},500)
                                                        .animate({left:'50%',rotate:'-225deg',top:'74%'},1000)
                                                        .animate({left:'51.6%',rotate:'-270deg',top:'70%'},1000)
                                                        .animate({top:'61%'},500)
                                                        .animate({left:'53%',rotate:'-225deg',top:'56%'},1000)
                                                        .animate({left:'56%',rotate:'-180deg',top:'52%'},1000)
                                                        .animate({left:'59%',rotate:'-135deg',top:'56%'},1000)
                                                        .animate({left:'60.3%',rotate:'-90deg',top:'60%'},1000)
                                                        .animate({top:'66%'},500)
                                                        .animate({left:'62%',rotate:'-135deg',top:'75%'},1000)
                                                        .animate({left:'64%',rotate:'-180deg',top:'76%'},1000)
                                                        .animate({left:'78.5%'},500)
                                                        .animate({left:'80%',rotate:'-225deg',top:'73%'},1000)
                                                        .animate({left:'82.15%',rotate:'-270deg',top:'69%'},1000)
                                                        .animate({top:'64%'},500,  
                                                            function(){
                                                                $('#scNu-a-6 .brasMini').animate({rotate:'-450deg'}, 300).animate({rotate:'0deg'}, 3000);  
                                                            })
                                                        .animate({top:'30%'},3000)
                                                        .animate({top:'21%'},500)
                                                        .animate({left:'80%',rotate:'-315deg',top:'14%'},1000)
                                                        .animate({left:'76%',rotate:'-360deg',top:'11.5%'},1000)
                                                        .animate({left:'64%'},50)
                                                    });
                                                }
                                            })    
                                        });
                                    });
                                }
                            }       
                        });
                    });
                };
            }       
        });
    });                     
}); 

/* scNu-a-10 Quiz */ 
$( function($){
    var quizMulti = {
        multiList: [
        {
            ques: "<u>Question 1</u><br/>Qu'est-ce qui caractérise un robot autonome ?",
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
    $("#quizScNu-a-10").jQuizMe(quizMulti, options);
});

/* scNu-a-10 jeu1 */ 
$(function() {
    robotAutonome ();
    function robotAutonome () {
    // drag and drop
        $( ".ligneBleue, .ligneJaune, .sphereRose, .sphereVerte" ).draggable({ revert: "invalid" });
        $( "#scNu-a-10 .programme" ).droppable({
            accept: ".ligneBleue, .ligneJaune",
            hoverClass: "dropHover",
            drop: function( event, ui ) {
                $("#scNu-a-10 .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")+"<hr/>"); 
                $(".capteurs").fadeOut(300);
                $(".obstacles").fadeIn(1500);
                $( ".obstacleJaune, .obstacleBleu" ).draggable({ revert: "invalid" });
                $( "#scNu-a-10 .programme" ).droppable({
                    accept: ".obstacleJaune, .obstacleBleu",
                    hoverClass: "dropHover",
                    drop: function( event, ui ) {
                        $("#scNu-a-10 .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                        $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")+"<hr/>"); 
                        $(".obstacles").fadeOut(300);
                        $(".spheres").fadeIn(1500);
                        $( "#scNu-a-10 .programme" ).droppable({
                            accept: ".sphereRose, .sphereVerte",
                            hoverClass: "dropHover",
                            drop: function( event, ui ) {
                                $("#scNu-a-10 .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                                $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")+"<hr/>");                        
                                $(".spheres").fadeOut(300);
                                $(".murs").fadeIn(1500);
                                $( ".murVert, .murRose" ).draggable({ revert: "invalid" });
                                $( "#scNu-a-10 .programme" ).droppable({
                                    accept: ".murRose, .murVert",
                                    hoverClass: "dropHover",
                                    drop: function( event, ui ) {
                                        $("#scNu-a-10 .programme").append($(ui.draggable)).addClass("capteur-"+ui.draggable.attr("class"))
                                        $(ui.draggable).replaceWith($(ui.draggable).html()+ui.draggable.attr("data-original-title")); 
                                        $(".murs, .briquesProgramme").fadeOut(300);
                                        $(".generateurRobot").fadeIn(1500);
                                        robotHeight = $(".jeu1 [class^=robot-]").height()
                                        robotWidth = $(".jeu1 [class^=robot-]").width()

                                        $(".generateurRobot").click(function () {     
                                            $(this).fadeOut(200);                   
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-bBRR").fadeIn();
                                                $(".executer").fadeIn(1500);
                                                coordonnees("b",5);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-bBRV, .executer").fadeIn(1500);
                                                coordonnees("b",8);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-bBVR, .executer").fadeIn(1500);
                                                coordonnees("b",5);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-bBVV, .executer").fadeIn(1500);
                                                coordonnees("b",6);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-bJRR, .executer").fadeIn(1500);
                                                coordonnees("b",5);                                          
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-bJVR, .executer").fadeIn(1500);
                                                coordonnees("b",5);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-bJRV, .executer").fadeIn(1500);
                                                coordonnees("b",21);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneBleue") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-bJVV, .executer").fadeIn(1500);
                                                coordonnees("b",6);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-jBRR, .executer").fadeIn(1500);
                                                coordonnees("j",6);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-jBRV, .executer").fadeIn(1500);
                                                coordonnees("j",5);                                            
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-jBVR, .executer").fadeIn(1500);
                                                coordonnees("j",22);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleBleu") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-jBVV, .executer").fadeIn(1500);
                                                coordonnees("j",5);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-jJRR, .executer").fadeIn(1500);
                                                coordonnees("j",6);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murRose") ) {
                                                $(".robot-jJVR, .executer").fadeIn(1500);
                                                coordonnees("j",8);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereRose") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-jJRV, .executer").fadeIn(1500);
                                                coordonnees("j",5);
                                            };
                                            if ($("#scNu-a-10 .programme").hasClass("capteur-ligneJaune") && $(".programme").hasClass("capteur-obstacleJaune") && $(".programme").hasClass("capteur-sphereVerte") && $(".programme").hasClass("capteur-murVert") ) {
                                                $(".robot-jJVV, .executer").fadeIn(1500);
                                                coordonnees("j",5);
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
        $("#scNu-a-10 .executer").click(function () {  
            $(this).fadeOut(200);                   
            for (var i = 0; i < nbCheckpoints; i++) {
                // on recupere les coordonnees x et y
                divsCheckPosition = $(".checkPoint-"+parcours+"-" + i).position();
                $("#scNu-a-10 .jeu1 [class^=robot-]").animate({
                    "left": divsCheckPosition.left - robotHeight/2.2,
                    "top": divsCheckPosition.top - robotWidth/2.2
                }, 1000);
                if (nbCheckpoints == 6) {
                    setTimeout(function() { 
                        badCheckPosition = $(".badCheckPoint-"+parcours).position();
                        $("#scNu-a-10 .jeu1 [class^=robot-]").animate({
                            "left": badCheckPosition.left - robotHeight/2.2,
                            "top": badCheckPosition.top - robotWidth/2.2
                        }, 1000);
                    }, 5000);
                };
            }
            if (nbCheckpoints != 22) {
                $("#scNu-a-10 .restart").fadeIn();
                $("#scNu-a-10 .jeu1 .restart").click(function () {      
                    $("#scNu-a-10 .jeu1 [class^=robot-]").css("left","7.9%").css("top","45.7%").fadeOut();
                    $("#scNu-a-10 .programme").html('').removeClass().addClass("programme cadreBlanc");
                    $("#scNu-a-10 .briquesProgramme").html('');
                    $("#scNu-a-10 .briquesProgramme").html('<h6>Les actions / ou briques de programme</h6><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cadreBlanc capteurs"><h6>Capteur de couleur</h6><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="ligneBleue" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je vois une ligne bleue, je la suis."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/ligneBleue.png" /></a></div><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="ligneJaune" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je vois une ligne jaune, je la suis."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/ligneJaune.png" /></a></div></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cadreBlanc obstacles"><h6>Déplacement d\'obstacle</h6><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="obstacleBleu" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je rencontre un obstacle bleu, je saute par dessus."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/obstacleBleu.png" /></a></div><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="obstacleJaune" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je rencontre un obstacle jaune, je saute par dessus."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/obstacleJaune.png" /></a></div></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cadreBlanc spheres"><h6>Super saut</h6><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="sphereRose" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je rencontre une sphère rose, je stoppe mes précédentes actions pour sauter jusqu\'à la prochaine sphère rose, et ensuite je reprends mes précédentes actions."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/sphereRose.png" /></a></div><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="sphereVerte" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je rencontre une sphère verte, je stoppe mes précédentes actions pour sauter jusqu\'à la prochaine sphère verte, et ensuite je reprends mes précédentes actions."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/sphereVerte.png" /></a></div></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cadreBlanc murs"><h6>Mur</h6><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="murRose" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je rencontre un mur rose, je passe à travers."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/murRose.png" /></a></div><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><a class="murVert" title="" data-placement="bottom" data-toggle="tooltip" data-original-title="Si je rencontre un mur vert, je passe à travers."><img alt="" src="++resource++unice.medites.images/parcours-pedagogiques/numerique/p1/etape1/murVert.png" /></a></div></div>').fadeIn();
                    parcours = null;
                    nbCheckpoints = null;    
                    robotAutonome();
                })
            }
            if (nbCheckpoints == 22) {
                setTimeout(function() {
                    if ($("#scNu-a-10").hasClass('jeu1Termine')) {
                        pointsJeu = 0;
                    }
                    else {
                        pointsJeu = $("#scNu-a-10 .pointsjeu1.pointsXP span").text();
                    }
                    finSeance("scNu-a-10", 1, pointsJeu);       
                }, 20000);
            }
        });
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