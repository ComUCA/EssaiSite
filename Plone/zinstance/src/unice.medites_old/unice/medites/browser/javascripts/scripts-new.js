// lightbox
                $(document).ready(function ($) {
                    $(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
                        event.preventDefault();
                        return $(this).ekkoLightbox({
                            onShown: function() {
                                if (window.console) {
                                    return console.log('Checking our the events huh?');
                                }
                            },
                            onNavigate: function(direction, itemIndex) {
                                if (window.console) {
                                    return console.log('Navigating '+direction+'. Current item: '+itemIndex);
                                }
                            }
                        });
                    });
                    $('#open-image').click(function (e) {
                        e.preventDefault();
                        $(this).ekkoLightbox();
                    });
                    $('#open-youtube').click(function (e) {
                        e.preventDefault();
                        $(this).ekkoLightbox();
                    });
                    // navigateTo
                    $(document).delegate('*[data-gallery="navigateTo"]', 'click', function(event) {
                        event.preventDefault();
                        return $(this).ekkoLightbox({
                            onShown: function() {
                                var a = this.modal_content.find('.modal-footer a');
                                if(a.length > 0) {
                                    a.click(function(e) {
                                        e.preventDefault();
                                        this.navigateTo(2);
                                    }.bind(this));
                                }
                            }
                        });
                    }); 
                });

// gestion des points, de l affichage des seances et des cookies
                $(document).ready(
                    function(){
// test si le visiteur a deja les cookies, si non, creation des cookies avec une valeur de 0
//attention : niveau est le score total
                        var niveau = localStorage.getItem("niveau");
                        if (niveau == null || isNaN(niveau)) {   
                            localStorage.setItem("niveau", 0);  
                        }
// biodiversite    
                        var seanceBioP1 = localStorage.getItem("seanceBioP1");
                        if (seanceBioP1 == null) {   
                            localStorage.setItem("seanceBioP1", 0);  
                        }
                        var seanceBioP2 = localStorage.getItem("seanceBioP2");
                        if (seanceBioP2 == null) {   
                            localStorage.setItem("seanceBioP2", 0);  
                        }
                        var seanceBioP3 = localStorage.getItem("seanceBioP3");
                        if (seanceBioP3 == null) {   
                            localStorage.setItem("seanceBioP3", 0);  
                        }
                        var seanceBioP4 = localStorage.getItem("seanceBioP4");
                        if (seanceBioP4 == null) {   
                            localStorage.setItem("seanceBioP4", 0);  
                        }
// Terre ocean univers    
                        var seanceTeOcUnP1 = localStorage.getItem("seanceTeOcUnP1");
                        if (seanceTeOcUnP1 == null) {   
                            localStorage.setItem("seanceTeOcUnP1", 0);  
                        }
                        var seanceTeOcUnP2 = localStorage.getItem("seanceTeOcUnP2");
                        if (seanceTeOcUnP2 == null) {   
                            localStorage.setItem("seanceTeOcUnP2", 0);  
                        }
                        var seanceTeOcUnP3 = localStorage.getItem("seanceTeOcUnP3");
                        if (seanceTeOcUnP3 == null) {   
                            localStorage.setItem("seanceTeOcUnP3", 0);  
                        }
// Vivant matiere technologie    

// sciences numerique  
                        var seanceScNuP1 = localStorage.getItem("seanceScNuP1");
                        if (seanceScNuP1 == null) {   
                            localStorage.setItem("seanceScNuP1", 0);  
                        }
// Temps histoire evolution  
                        var seanceTpHiEvP1 = localStorage.getItem("seanceTpHiEvP1");
                        if (seanceTpHiEvP1 == null) {   
                            localStorage.setItem("seanceTpHiEvP1", 0);  
                        }

// on fait en sorte que le visiteur puisse reprendre le parcours ou il en etait, on debloque les seances et on leur retire les points 
// bio p1
                        var identifiantBioP1 =  parseInt((/([0-9]+)/.exec(seanceBioP1)),10) ;
                        var bp1a = 0;
                        while ( bp1a < identifiantBioP1+1 ) {
                            $("#bio-P1 .marqueur").eq(bp1a).addClass("debloque"); // ajout de la classe debloque
                            bp1a++; 
                        }
                        var bp1b = 0;
                        while ( bp1b < identifiantBioP1 ) {
                            $("#bio-P1 .pointsXP span").eq(bp1b).text(0); // retrait des points
                            $("#bio-P1 .pointsXP").eq(bp1b).hide(); // on cache le conteneur
                            $("#bio-P1 .marqueur button").eq(bp1b).hide(); // on cache le button des seances debloquees
                            bp1b++; 
                        }
// bio p2
                        var identifiantBioP2 =  parseInt((/([0-9]+)/.exec(seanceBioP2)),10) ;
                        var bp2a = 0;
                        while ( bp2a < identifiantBioP2+1 ) {
                            $("#bio-P2 .marqueur").eq(bp2a).addClass("debloque"); // ajout de la classe debloque
                            bp2a++; 
                        }
                        var bp2b = 0;
                        while ( bp2b < identifiantBioP2 ) {
                            $("#bio-P2 .pointsXP span").eq(bp2b).text(0); // retrait des points
                            $("#bio-P2 .pointsXP").eq(bp2b).hide(); // on cache le conteneur
                            $("#bio-P2 .marqueur button").eq(bp2b).hide(); // on cache le button des seances debloquees
                            bp2b++; 
                        }
// bio p3
                        var identifiantBioP3 =  parseInt((/([0-9]+)/.exec(seanceBioP3)),10) ;
                        var bp3a = 0;
                        while ( bp3a < identifiantBioP3+1 ) {
                            $("#bio-P3 .marqueur").eq(bp3a).addClass("debloque"); // ajout de la classe debloque
                            bp3a++; 
                        }
                        var bp3b = 0;
                        while ( bp3b < identifiantBioP3 ) {
                            $("#bio-P3 .pointsXP span").eq(bp3b).text(0); // retrait des points
                            $("#bio-P3 .pointsXP").eq(bp3b).hide(); // on cache le conteneur
                            $("#bio-P3 .marqueur button").eq(bp3b).hide(); // on cache le button des seances debloquees
                            bp3b++; 
                        }
// bio p4
                        var identifiantBioP4 =  parseInt((/([0-9]+)/.exec(seanceBioP4)),10) ;
                        var bp4a = 0;
                        while ( bp4a < identifiantBioP4+1 ) {
                            $("#bio-P4 .marqueur").eq(bp4a).addClass("debloque"); // ajout de la classe debloque
                            bp4a++; 
                        }
                        var bp4b = 0;
                        while ( bp4b < identifiantBioP4 ) {
                            $("#bio-P4 .pointsXP span").eq(bp4b).text(0); // retrait des points
                            $("#bio-P4 .pointsXP").eq(bp4b).hide(); // on cache le conteneur
                            $("#bio-P4 .marqueur button").eq(bp4b).hide(); // on cache le button des seances debloquees
                            bp4b++; 
                        }
// teOcUn p1
                        var identifiantTeOcUnP1 =  parseInt((/([0-9]+)/.exec(seanceTeOcUnP1)),10) ;
                        var tou1a = 0;
                        while ( tou1a < identifiantTeOcUnP1+1 ) {
                            $("#teOcUn-P1 .marqueur").eq(tou1a).addClass("debloque"); // ajout de la classe debloque
                            tou1a++; 
                        }
                        var tou1b = 0;
                        while ( tou1b < identifiantTeOcUnP1 ) {
                            $("#teOcUn-P1 .pointsXP span").eq(tou1b).text(0); // retrait des points
                            $("#teOcUn-P1 .pointsXP").eq(tou1b).hide(); // on cache le conteneur
                            $("#teOcUn-P1 .marqueur button").eq(tou1b).hide(); // on cache le button des seances debloquees
                            tou1b++; 
                        }
// teOcUn p2
                        var identifiantTeOcUnP2 =  parseInt((/([0-9]+)/.exec(seanceTeOcUnP2)),10) ;
                        var tou2a = 0;
                        while ( tou2a < identifiantTeOcUnP2+1 ) {
                            $("#teOcUn-P2 .marqueur").eq(tou2a).addClass("debloque"); // ajout de la classe debloque
                            tou2a++; 
                        }
                        var tou2b = 0;
                        while ( tou2b < identifiantTeOcUnP2 ) {
                            $("#teOcUn-P2 .pointsXP span").eq(tou2b).text(0); // retrait des points
                            $("#teOcUn-P2 .pointsXP").eq(tou2b).hide(); // on cache le conteneur
                            $("#teOcUn-P2 .marqueur button").eq(tou2b).hide(); // on cache le button des seances debloquees
                            tou2b++; 
                        }
// teOcUn p3
                        var identifiantTeOcUnP3 =  parseInt((/([0-9]+)/.exec(seanceTeOcUnP3)),10) ;
                        var tou3a = 0;
                        while ( tou3a < identifiantTeOcUnP3+1 ) {
                            $("#teOcUn-P3 .marqueur").eq(tou3a).addClass("debloque"); // ajout de la classe debloque
                            tou3a++; 
                        }
                        var tou3b = 0;
                        while ( tou3b < identifiantTeOcUnP3 ) {
                            $("#teOcUn-P3 .pointsXP span").eq(tou3b).text(0); // retrait des points
                            $("#teOcUn-P3 .pointsXP").eq(tou3b).hide(); // on cache le conteneur
                            $("#teOcUn-P3 .marqueur button").eq(tou3b).hide(); // on cache le button des seances debloquees
                            tou3b++; 
                        }
// viMaTe p1
                      
// scNu p1
                        var identifiantScNuP1 =  parseInt((/([0-9]+)/.exec(seanceScNuP1)),10) ;
                        var sn1a = 0;
                        while ( sn1a < identifiantScNuP1+1 ) {
                            $("#scNum-P1 .marqueur").eq(sn1a).addClass("debloque"); // ajout de la classe debloque
                            sn1a++; 
                        }
                        var sn1b = 0;
                        while ( sn1b < identifiantScNuP1 ) {
                            $("#ScNuM-P1 .pointsXP span").eq(sn1b).text(0); // retrait des points
                            $("#ScNuM-P1 .pointsXP").eq(sn1b).hide(); // on cache le conteneur
                            $("#ScNuM-P1 .marqueur button").eq(sn1b).hide(); // on cache le button des seances debloquees
                            sn1b++; 
                        }
// tpHiEvo p1
                        var identifiantTpHiEvP1 =  parseInt((/([0-9]+)/.exec(seanceTpHiEvP1)),10) ;
                        var the1a = 0;
                        while ( the1a < identifiantTpHiEvP1+1 ) {
                            $("#tpHiEvo-P1 .marqueur").eq(the1a).addClass("debloque"); // ajout de la classe debloque
                            the1a++; 
                        }
                        var the1b = 0;
                        while ( the1b < identifiantTpHiEvP1 ) {
                            $("#tpHiEvo-P1 .pointsXP span").eq(the1b).text(0); // retrait des points
                            $("#tpHiEvo-P1 .pointsXP").eq(the1b).hide(); // on cache le conteneur
                            $("#tpHiEvo-P1 .marqueur button").eq(the1b).hide(); // on cache le button des seances debloquees
                            the1b++; 
                        }
// mise en place du systeme de points
                        var $xp = $("#nouveauXP");
                        $(".Marker_Container button").click(
                            function () {
                                var currentXP = parseInt($xp.text(), 10);   // recuperation les points deja gagnes
                                $spanXP = $(this).parent().find(".pointsXP span");  // recuperation les points a gagner de la seance
                                value = parseInt($spanXP.text(), 10); // parse
                                newValue = value + currentXP;   // ajout des points de la seance aux points deja gagnes
                                $spanXP.text(0); // mise a 0 des points a gagner
                                $(this).parent().find(".pointsXP").hide(); // on cache le conteneur
                                $xp.text(newValue); // maj des points
                                localStorage.setItem("niveau", newValue); // MAJ du cookie niveau
                                $(this).hide("button"); // on cache le button apres avoir clique dessus
                            }
                        );
                        var saveXP = localStorage.getItem("niveau");    // recuperation de la valeur du cookie dans une variable
                        $("#ancienXP").text(saveXP);    // lorsque l utilisateur revient sur la page, affichage de ses anciens points deja cumules 
                        $("#totalXP").text(saveXP); // report de ces donnees dans le total des points
                        $(".Marker_Container button").click(
                            function () {
                                niveau = parseInt((saveXP),10) + parseInt($xp.text(), 10);  // addition des points de la seance aux total des points
                                $("#totalXP").text(niveau); // MAJ du total des points
                                localStorage.setItem("niveau", niveau);   // MAJ du cookie niveau
                            }
                        );

// mise en place de l ordre d affichage des seances d un parcours
// Biodiversite - P1
                        $('#bio-P1').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantBioP1 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceBioP1", identifiantBioP1);  // on met a jour le cookie                       
                        });
// Biodiversite - P2
                        $('#bio-P2').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantBioP2 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceBioP2", identifiantBioP2);  // on met a jour le cookie                        
                        }); 
// Biodiversite - P3
                        $('#bio-P3').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantBioP3 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceBioP3", identifiantBioP3);  // on met a jour le cookie                       
                        });
// Biodiversite - P4
                        $('#bio-P4').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantBioP4 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceBioP4", identifiantBioP4);  // on met a jour le cookie                        
                        });  
// Terre océan univers - P1
                       $('#teOcUn-P1').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantTeOcUnP1 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceTeOcUnP1", identifiantTeOcUnP1);  // on met a jour le cookie                       
                        });
// Terre océan univers - P2
                        $('#teOcUn-P2').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantTeOcUnP2 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceTeOcUnP2", identifiantTeOcUnP2);  // on met a jour le cookie                        
                        });  
// Terre océan univers - P3
                        $('#teOcUn-P3').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantTeOcUnP3 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceTeOcUnP3", identifiantTeOcUnP3);  // on met a jour le cookie                       
                        });
// Sciences numerique - P1                        
                        $('#scNu-P1').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantScNuP1 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceScNuP1", identifiantScNuP1);  // on met a jour le cookie                       
                        });
// Temps histoire evolution - P1                        
                        $('#tpHiEvo-P1').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            identifiantTpHiEvP1 = $(this).parent().parent(".marqueur").attr("id");
                            localStorage.setItem("seanceTpHiEvP1", identifiantTpHiEvP1);  // on met a jour le cookie                       
                        });
                    }
                ); 