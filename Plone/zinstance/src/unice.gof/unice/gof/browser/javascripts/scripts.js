$( document ).ready(function() {

    $.urlParam = function(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }
    $.classStartsWith = function(el, cls) {
        var classList =$(el).attr('class').split(/\s+/);
        var found = false;
        $.each(classList, function(index, item) {
            if (item.indexOf(cls) == 0) {
                found = item;
            }
        });
        return found;
    }

    /*****************************************************************************/


	$('ul.termes_accessibilite li').each(function() {
        var txt = $(this).find('a').text();
        var reg = new RegExp("[ ,;/'\"|!?]+", "g");
        var mots = txt.split(reg);

        var initiales = $.map(mots, function(mot) {
            return mot.length > 3 ? mot.substr(0,1).toUpperCase() : null;
        });

        $(this).prepend('<span class="label label-default">'+initiales.join('')+'</span>');
    });

    $('ul.termes_motscles li a').each(function() {
        $(this).addClass('btn btn-default btn-xs');
    });

    /*****************************************************************************/

    $('input[name=multicriteres]').change(function() {
        if($(this).is(":checked")) {
            $('#recherche_formation_multicriteres').slideDown();
        } else {
            $('#recherche_formation_multicriteres').slideUp();
        }
    });

    $('#recherche_formation').submit(function (e) {
        e.preventDefault();
        rechercheFormation($(this), false);
        return false;
    });
    $('#recherche_formation_multicriteres input[type=checkbox]').change(function() {
        rechercheFormation($(this).parents('form'), false);
    });
    var recherche_initiale = $.urlParam('recherche');
    if (recherche_initiale) {
        rechercheFormation($('#recherche_formation'), window.location.search.substring(1));
    }

    function rechercheFormation(form, data) {
        var url = (form.attr('action') ? form.attr('action') : './@@recherche');
        $.ajax({
            url: url,
            type: 'POST',
            data: (data ? data : form.serialize()),
            success: function(html) {
                $('#liste_formations').html(html);
            }
        });
    }

/*****************************************************************************/

String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}

function locations(str, searches) {
    str = str.sansAccent().toLowerCase();
    var indexes = [];
    for(var i=0; i<searches.length; i++) {
        var search = searches[i].sansAccent().toLowerCase();
        var j=-1;
        while((j=str.indexOf(search, j+1)) >= 0) indexes.push([j, search.length]);
    }
    return indexes;
}

// var titre = 'Master 2 Économie et Management des Organisations et des Ressources Humanies (EMORH) - parcours Économie et Management des Entreprises et des Organisations (EMEO) (ISEM)'.sansAccent().toLowerCase();



    var form = $('#searchform');
    var search = form.find('#search');
    var state_icon = form.find('#state_icon');
    var button = form.find('button');
    var resultats = $('#resultats');

    search.on('input', function(e){
        button.prop('disabled', search.val().length == 0);
    }).trigger('input');

    form.submit(function(e) {
        e.preventDefault();
        var search_txt = search.val().toLowerCase();

        // words = search_txt.match(/\w+/g).join('|');
        // var pattern = /(des|et)/g;
        // pattern = new RegExp('/(des|et)/g');
        // console.log(titre.replace(pattern, '<strong>$1</strong>'));

        if (search_txt.length > 0) {
            var postData = $(this).serializeArray();
            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: postData,
                dataType: 'json',
                beforeSend: function(xhr) {
                    state_icon.attr('class', 'fa fa-cog fa-spin fa-fw');
                },
                success: function(data, textStatus, jqXHR) {
                    var html = '<div class="panel panel-info"><div class="panel-heading text-center"><i class="fa fa-search"></i> <strong> ';
                    if (data.length == 0) {
                        html += 'aucune formation</strong> <span>ne correspond';
                    } else if (data.length == 1) {
                        html += 'une formation</strong> <span>correspond';
                    } else {
                        html += data.length+' formations</strong> <span>correspondent';
                    };
                    html += ' aux mots-clés "'+search_txt+'"</span></div><div class="list-group">';

                    $(data).each(function(i, o) {

                        // console.log('-----------------------------------------------------');
                        // console.log(o.titre_formation);
                        // console.log(o.titre_formation.sansAccent().toLowerCase());
                        // console.log(search_txt.match(/\w+/g));
                        // var indexes = locations(o.titre_formation, search_txt.split(/[\s,;.]+/));
                        // console.log(indexes);


                        var suffix = $.urlParam('inscription') != null ? '?inscription' : '';

                        html += '<a class="list-group-item" href="http://formations.unice.fr/formation-initiale/'+o.id_formation.toLowerCase()+suffix+'">';
                        if (parseInt(o.score1) >= 2) {
                            html += '<i class="fa fa-star fa-fw"></i> ';
                        } else if (parseInt(o.score1) == 1) {
                            html += '<i class="fa fa-star-half-o fa-fw"></i> ';
                        } else {
                            html += '<i class="fa fa-star-o fa-fw"></i> ';
                        };
                        html += o.titre_formation;
                        html += '</a>';
                    });

                    html += '</div></div>';
                    resultats.html(html);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    resultats.html('<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> Une erreur est survenue lors de la recherche</div>');
                },
                complete: function (jqXHR, status) {
                    state_icon.attr('class', 'fa fa-search fa-fw');
                }
            });
        }
    });

    /*****************************************************************************/

    $('body.template-formation_view *[id^="form-widgets-"] ul[class^="list-unstyled termes_"] > li > a').each(function() {
        var ul = $(this).parents('ul');
        var termes = $.classStartsWith(ul, 'termes_');
        if (termes) {
            var termes = termes.replace('termes_','');
            var terme = encodeURIComponent($.trim($(this).text()));
            var href = '../?recherche='+terme+'&multicriteres=on&'+termes+'=on&mode_recherche=exact&titre_initial=Formations "'+terme+'"';
            $(this).attr('href', href);
        }
    });

    /*****************************************************************************/
    var addParam = function(base, key, value) {
        var sep = (base.indexOf('?') > -1) ? '&' : '?';
        return base + sep + key + '=' + value;
    }

    var relatedItemBox = $('dl#relatedItemBox dt');

    $('.ajax_load, dl#relatedItemBox dd-').each(function() {
        var self = $(this);
        var href = self.find('a').first().attr('href');
        if (!self.hasClass('ajax_load')) {
            href = addParam(href, 'ajax_load', '1');
        }
        if (href != undefined) {
            $.ajax({
                url: href,
                type: 'GET',
                beforeSend: function(){
                },
                success: function(html) {
                    self.html((self.hasClass('ajax_load') ? html : $(html).find('#content')));
                    self.find('*[data-toggle="dropdown"]').dropdown();
                    // relatedItemBox.hide();
                },
                complete : function(){
                    self.addClass('loading_done');
                }
            });

        }
    });

    $('dl#relatedItemBox dd').each(function() {
        var self = $(this);
        var href = self.find('a').first().attr('href');
        // if (!self.hasClass('ajax_load')) {
        //     href = addParam(href, 'ajax_load', '1');
        // }
        if (href != undefined) {
            $.ajax({
                url: href,
                type: 'GET',
                beforeSend: function(){
                },
                success: function(html) {
                    // self.html((self.hasClass('ajax_load') ? html : $(html).find('#content')));
                    // self.find('*[data-toggle="dropdown"]').dropdown();
                    // relatedItemBox.hide();
                },
                complete : function(){
                    self.addClass('loading_done');
                }
            });

        }
    });
});
