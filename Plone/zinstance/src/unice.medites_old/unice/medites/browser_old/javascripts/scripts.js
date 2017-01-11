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
                    // test si le visiteur a deja les cookies, si non, // si non, creation des cookies avec une valeur de 0
                        if ($.cookie("niveau") == null || isNaN($.cookie("niveau"))) {   
                            $.cookie("niveau", 0, { expires: 365 });    
                        }
                        if ($.cookie("seanceBioP1") == null) {   
                            $.cookie("seanceBioP1", 0, { expires: 365 });
                        }    
                        if ($.cookie("seanceBioP2") == null) {   
                            $.cookie("seanceBioP2", 0, { expires: 365 });
                        }
                    // on fait en sorte que le visiteur puisse reprendre le parcours ou il en etait, on debloque les seances et on leur retire les points 
                        var identifiantBioP1 =  parseInt((/([0-9]+)/.exec($.cookie("seanceBioP1"))),10) ;
                        var i = 0;
                        while ( i < identifiantBioP1+1 ) {
                            $("#bio-P1 .marqueur").eq(i).addClass("debloque"); // ajout de la classe debloque
                            i++; 
                        }
                        var j = 0;
                        while ( j < identifiantBioP1 ) {
                            $("#bio-P1 .pointsXP span").eq(j).text(0); // retrait des points
                            $("#bio-P1 .pointsXP").eq(j).hide(); // on cache le conteneur
                            $("#bio-P1 .marqueur button").eq(j).hide(); // on cache le button des seances debloquees
                            j++; 
                        }

                        var identifiantBioP2 =  parseInt((/([0-9]+)/.exec($.cookie("seanceBioP2"))),10) ;
                        var k = 0;
                        while ( k < identifiantBioP2+1 ) {
                            $("#bio-P2 .marqueur").eq(k).addClass("debloque"); // ajout de la classe debloque
                            k++; 
                        }
                        var l = 0;
                        while ( l < identifiantBioP2 ) {
                            $("#bio-P2 .pointsXP span").eq(l).text(0); // retrait des points
                            $("#bio-P2 .pointsXP").eq(l).hide(); // on cache le conteneur
                            $("#bio-P2 .marqueur button").eq(l).hide(); // on cache le button des seances debloquees
                            l++; 
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
                                $.cookie("niveau", newValue, { expires: 365 }); // MAJ du cookie niveau
                                $(this).hide("button"); // on cache le button apres avoir clique dessus
                            }
                        );
                        var saveXP = $.cookie("niveau");    // recuperation de la valeur du cookie dans une variable
                        $("#ancienXP").text(saveXP);    // lorsque l utilisateur revient sur la page, affichage de ses anciens points deja cumules 
                        $("#totalXP").text(saveXP); // report de ces donnees dans le total des points
                        $(".Marker_Container button").click(
                            function () {
                                niveau = parseInt((saveXP),10) + parseInt($xp.text(), 10);  // addition des points de la seance aux total des points
                                $("#totalXP").text(niveau); // MAJ du total des points
                                $.cookie("niveau", niveau, { expires: 365 });   // MAJ du cookie niveau
                            }
                        );
                    // mise en place de l ordre d affichage des seances d un parcours
                        $('#bio-P1').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            // cookie pour recuperer l id de la seance 
                            identifiantBioP1 = $(this).parent().parent(".marqueur").attr("id");
                            $.cookie("seanceBioP1", identifiantBioP1, { expires: 365 });  // on met a jour le cookie                       
                        });

                        $('#bio-P2').on('click', '.marqueur button', function() {
                            var $next = $(this).parents('.marqueur').next();
                            while( !$next.hasClass('marqueur') ) {
                                $next = $next.next();
                            }
                            $next.fadeIn(400);
                            // cookie pour recuperer l id de la seance 
                            identifiantBioP2 = $(this).parent().parent(".marqueur").attr("id");
                            $.cookie("seanceBioP2", identifiantBioP2, { expires: 365 });  // on met a jour le cookie                        
                        });  
                    }
                ); 

    // jquery cookie ne fonctionne pas sous chrome, on invite le visiteur a parcourir le site avec un autre navigateur web
                var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
/*                 if (isChrome) alert("MESSAGE DE MEDITES\nVous utilisez le navigateur web Google Chrome.\nSi vous souhaitez sauvegarder les points\net ne pas re-parcourir le contenu des séances d'une thématique,\nveuillez utiliser un autre navigateur web"); */