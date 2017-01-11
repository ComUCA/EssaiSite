// !function(e){e.fn.hideseek=function(t){var i={list:".hideseek-data",nodata:"",attribute:"text",highlight:!1,ignore:"",headers:"",navigation:!1,ignore_accents:!1,hidden_mode:!1,min_chars:1},t=e.extend(i,t);return this.each(function(){var i=e(this);i.opts=[],e.map(["list","nodata","attribute","highlight","ignore","headers","navigation","ignore_accents","hidden_mode","min_chars"],function(e){i.opts[e]=i.data(e)||t[e]}),i.opts.headers&&(i.opts.ignore+=i.opts.ignore?", "+i.opts.headers:i.opts.headers);var s=e(i.opts.list);i.opts.navigation&&i.attr("autocomplete","off"),i.opts.hidden_mode&&s.children().hide(),i.keyup(function(t){function n(e){return e.children(".selected:visible")}function o(e){return n(e).prevAll(":visible:first")}function r(e){return n(e).nextAll(":visible:first")}if(38!=t.keyCode&&40!=t.keyCode&&13!=t.keyCode&&(8!=t.keyCode?i.val().length>=i.opts.min_chars:!0)){var a=i.val().toLowerCase();s.children(i.opts.ignore.trim()?":not("+i.opts.ignore+")":"").removeClass("selected").each(function(){var t=("text"!=i.opts.attribute?e(this).attr(i.opts.attribute)||"":e(this).text()).toLowerCase(),s=-1==t.removeAccents(i.opts.ignore_accents).indexOf(a)||a===(i.opts.hidden_mode?"":!1);s?(e(this).hide(),i.trigger("_after_each")):(i.opts.highlight?e(this).removeHighlight().highlight(a).show():e(this).show(),i.trigger("_after_each"))}),i.opts.nodata&&(s.find(".no-results").remove(),s.children(':not([style*="display: none"])').length||s.children().first().clone().removeHighlight().addClass("no-results").show().prependTo(i.opts.list).text(i.opts.nodata)),i.opts.headers&&e(i.opts.headers,s).each(function(){e(this).nextUntil(i.opts.headers).not('[style*="display: none"],'+i.opts.ignore).length?e(this).show():e(this).hide()}),i.trigger("_after")}i.opts.navigation&&(38==t.keyCode?n(s).length?(o(s).addClass("selected"),n(s).last().removeClass("selected")):s.children(":visible").last().addClass("selected"):40==t.keyCode?n(s).length?(r(s).addClass("selected"),n(s).first().removeClass("selected")):s.children(":visible").first().addClass("selected"):13==t.keyCode&&(n(s).find("a").length?document.location=n(s).find("a").attr("href"):i.val(n(s).text())))})})},e(document).ready(function(){e('[data-toggle="hideseek"]').hideseek()})}(jQuery),jQuery.fn.highlight=function(e){function t(e,i){var s=0;if(3==e.nodeType){var n=e.data.removeAccents(!0).toUpperCase().indexOf(i);if(n>=0){var o=document.createElement("mark");o.className="highlight";var r=e.splitText(n);r.splitText(i.length);var a=r.cloneNode(!0);o.appendChild(a),r.parentNode.replaceChild(o,r),s=1}}else if(1==e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName))for(var h=0;h<e.childNodes.length;++h)h+=t(e.childNodes[h],i);return s}return this.length&&e&&e.length?this.each(function(){t(this,e.toUpperCase())}):this},jQuery.fn.removeHighlight=function(){return this.find("mark.highlight").each(function(){with(this.parentNode.firstChild.nodeName,this.parentNode)replaceChild(this.firstChild,this),normalize()}).end()},String.prototype.removeAccents=function(e){return e?this.replace(/[áàãâä]/gi,"a").replace(/[éè¨ê]/gi,"e").replace(/[íìïî]/gi,"i").replace(/[óòöôõ]/gi,"o").replace(/[úùüû]/gi,"u").replace(/[ç]/gi,"c").replace(/[ñ]/gi,"n"):this};


// (function($, undefined) {
    $.expr[":"].containsNoCase = function(el, i, m) {
        var search = m[3];
        if (!search) { return false; }
        return new RegExp(search, "i").test($(el).text());
    };

    $.fn.searchFilter = function(options) {
        var opt = $.extend({
            // target selector
            targetSelector: "",
            // number of characters before search is applied
            charCount: 1
        }, options);

        return this.each(function() {
            var $el = $(this);
            $el.keyup(function() {
                var search = $(this).val();

                var $target = $(opt.targetSelector);
                $target.show();

                if (search && search.length >= opt.charCount) {
                    $target.not(":containsNoCase(" + search + ")").hide();
                }
            });
        });
    };
// })(jQuery);

$( document ).ready(function() {

    if (!$('body').hasClass('template-theming-controlpanel-mapper')) {

        //$('.responsive_player').fitVids();

        $('.more_items').find('a').click(function(e) {
            e.preventDefault();
            $('.canal_fil_importance3').slideToggle();
        });
    }

    var prefix_theme = '#FilUNSTheme';
    $('#SFQuery .SFQuery_input label').each(function() {
        var txt = $(this).text();
        if (txt.startsWith(prefix_theme)) {
            $(this).text(txt.substr(prefix_theme.length));
        }
    });

    $('#live-search input').keyup(function(){
        var filter = $(this).val();
        $('body.template-filuns_gestion_view .list-group-item a').each(function() {
            var title = $(this).find('strong').text().clean();
            var desc = $(this).find('small').text().clean();
            var subjects = $(this).find('span.subjects span span').text();
            var content = title+' '+desc;

            var notfound = false;
            if (filter === '#oui') {
                notfound = (subjects === '');
            } else if (filter === '#non') {
                notfound = (subjects !== '');
            } else {
                notfound = content.search(new RegExp(filter.clean(), "i")) < 0;
            }
            if (notfound) {
                $(this).parent().fadeOut();
            } else {
                $(this).parent().fadeIn();
            }
        });
    });


    if (!$('body').hasClass('template-theming-controlpanel-mapper')) {
        //$('#live-search input').popover('show').popover('hide');
    }

});

/*******************************************************************/
/*** GESTION *******************************************************/
/*******************************************************************/

$(function() {

    if (!$('body').hasClass('template-theming-controlpanel-mapper') && !$('body').hasClass('template-theming-controlpanel')) {
        $('[rel=popover]').popover({
            html : true,
            content: function() {
                return $($(this).data('popover-content')).html();
            }
        });
    }
    $('body').on('click', function (e) {
        $('[rel=popover]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('body.template-filuns_gestion_view a.list-group-item').each(function() {
        updateSubjects($(this));
    }).click(function(e) {
        e.preventDefault();
    });

    $(document).on('click', 'body.template-filuns_gestion_view .popover button', function(){
        addSubjects($(this));
    });



    // var dropzone = $('#dropzone');

    // $('body.template-filuns_gestion_view .list-group-item a').draggable({
    //     revert: true,
    //     helper:'clone',
    //     zIndex: '10000',
    //     opacity: 0.85,
    //     appendTo: 'body',
    //     cursorAt: {top:0, left:0},
    //     distance: 20,
    //     helper: function(e) {
    //         return $('<h4><span class="label label-default">'+$(this).find('strong').text()+'</span></h4>');
    //     },
    //     start: function() {
    //         dropzone.show('blind', 'fast');
    //     },
    //     stop: function() {
    //         dropzone.hide('blind', 'fast');
    //     }
    // }).each(function() {
    //     updateSubjects($(this));
    // });

    // dropzone.find('button').droppable({
    //     tolerance: 'pointer',
    //     hoverClass: 'btn-primary',
    //     drop: function(e, ui) {
    //         var element = $(ui.draggable);
    //         var url = element.attr('href')+'/ajouter_subject';
    //         $.ajax({
    //             url: url,
    //             type: 'POST',
    //             dataType: "json",
    //             data: 'subject='+$(this).data('subjects'),
    //         }).done(function(data) {
    //             addSubjects(element, data);

    //             var ok = $('<i class="fa fa-ok" style="display:none;position:absolute;top:20px;left:20px;color:#FFF;background-color:green;padding:5px;border-radius:50%;border:1px solid #FFF;"/>');
    //             element.append(ok);
    //             ok.fadeIn(1000).fadeOut(1000);
    //             element.effect( "shake", {times:1, direction:'right'} );

    //         });
    //     }
    // });
});

// function addSubjects(element, subjects) {
//     element.data('subjects', subjects.join(','));
//     updateSubjects(element);
// }

function updateSubjects(element) {
    var popovers = $(element.data('popover-content')+',.popover');
    popovers.find('.btn').removeClass('btn-primary').addClass('btn-default');

    var subjects = $(element.data('subjects').split(','));
    var labels = element.find('span.subjects span span').text('');
    subjects.each(function(i, subject) {
        labels.each(function(j, label) {
            label = $(label);
            var prefix_theme = label.data('prefix-theme');
            if (subject.startsWith(prefix_theme)) {
                var sub = subject.substring(prefix_theme.length);
                label.append((label.text() === '' ? sub : ' + '+sub));
                popovers.find('*[data-subjects="'+subject+'"]').addClass('btn-primary');
            }
            var prefix_canal = label.data('prefix-canal');
            var prefix_importance = label.data('prefix-importance');
            if (subject.startsWith(prefix_canal)) {
                subjects.each(function(k, importance) {
                    if (importance.startsWith(prefix_importance)) {
                        var sub = importance.substring(prefix_importance.length);
                        label.append((label.text() === '' ? sub : ' + '+sub));
                        popovers.find('*[data-subjects="'+subject+','+importance+'"]').removeClass('btn-default').addClass('btn-primary');
                    }
                });
            }
        });
    });

    labels.each(function() {
        var empty = $(this).text() === '';
        $(this).parent().attr('class', (empty ? 'label label-default' : 'label label-info'));
    });
}

function addSubjects(button) {
    var subjects = button.data('subjects');

    var id = button.parents('[rel]').attr('rel');
    var elements = $('[data-popover-content="#'+id+'"]');
    var selected = button.hasClass('btn-primary');
    var url = elements.attr('href')+(selected ? '/supprimer_subject' : '/ajouter_subject');

    var data = 'subject='+subjects;
    if (selected) {
        if (button.data('type')=='canaux') {
            var buttons = button.parent().find('button');
            protect = $.map(buttons, function(value) {
                var s = $(value).data('subjects');
                var sel = $(value).hasClass('btn-primary');
                return sel && s != subjects ? s : null;
            }).join(',');

            data += '&protect='+protect;
        }
    }

    button.find('i').hide();
    var spin = $('<i class="fa fa-spinner fa-spin"></i>');
    button.prepend(spin);

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data
    }).done(function(data) {
        elements.each(function () {
            $(this).data('subjects', data.join(','));
            updateSubjects($(this));
            spin.remove();
            button.find('i').show();
        });

        refreshIframes();
    });

}

function refreshIframes() {
    $('iframe').each(function () {
        $(this).attr('src', $(this).attr('src'));
    });
}

/*******************************************************************/

$( document ).ready(function() {

    $('.menu_publication').each(function() {
        updatePublicationMenu($(this));
    });

});

function updatePublicationMenu(menu) {
    /*** Datas ***/
    var button = menu.find('button strong');
    var dropdown = menu.find('ul.dropdown-menu');
    var alltitles = $(menu.data('alltitles').split('|').clean(''));
    var allsubjects = menu.data('allsubjects').split('|').clean('');
    var allaccess = menu.data('allaccess').toString().split('|').clean('');
    var allcolors = $(menu.data('allcolors').split('|').clean(''));
    var subjects = menu.data('subjects').split('|').clean('');
    var def = menu.data('default');
    var url = menu.data('url');
    var filter = menu.data('filter');
    var filter_field;
    var uuid = uniqId();


    nbr_actives = 0;
    button.html('');
    dropdown.html('');
    dropdown.attr('id', uuid);

    if (filter) {
        filter_field = $('<li class="filter_field active"><div class="has-feedback"><label class="control-label sr-only">Recherche</label><input type="text" class="form-control" placeholder="Recherche..." data-list="#'+uuid+'" autocomplete="off"/><i class="glyphicon glyphicon-search form-control-feedback"></i></div></li>');
        dropdown.append(filter_field);
    }

    $(allsubjects).each(function(i, allsubject) {
        s = allsubject.split(',').clean('');
        var active = intersect(s, subjects).length == s.length;
        var access = (allaccess[i] == '1');
        var cls = (active ? 'active' : '');
        cls += (access ? ' enabled' : ' disabled');
        if (active) {
            nbr_actives += 1;
            button.append(' <i class="fa fa-circle fa-lg" style="color:'+allcolors[i]+'"></i> '+alltitles[i]);
        }

        if (access) {
            var li = $('<li style="background-color:'+allcolors[i]+'" class="'+cls+'"></li>');
            var admin = '';
            if (!access) {
                admin = ' <span class="label label-danger">admin</span>';
            }
            var a = $('<a href="#"><i class="fa fa-lg"></i> '+alltitles[i]+admin+'</a>').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (access) {
                    $.ajax({
                        url: url+(active ? '/supprimer_subject' : '/ajouter_subject'),
                        data: {'subject': allsubject},
                        type: 'POST',
                        dataType: 'json'
                    }).done(function(data) {
                        menu.data('subjects', data.join('|'));
                        updatePublicationMenu(menu);
                    });
                }
            });
            li.append(a);
            dropdown.append(li);
        }
    });

    if (nbr_actives == 0) {
        button.html(def);
    }
    button.append(' <span class="caret"></span>');

    if (filter) {
        filter_field.click(function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        console.log('-----------------------------');
        // console.log($.fn.hideseek);
        // console.log($.isFunction($.fn.hideseek));
        // filter_field.find('input').hideseek({highlight: true, nodata: 'Aucun résultat ne correspond à votre recherche', ignore_accents: true,  ignore: '.filter_field'});
        // filter_field.find('input').hideseek();
        updateFilter(filter_field.find('input'), uuid);//.searchFilter({targetSelector: '#'+uuid, charCount: 2});
    }
}

function updateFilter(e, uuid) {
    e.searchFilter({targetSelector: '#'+uuid, charCount: 2});
}

/*******************************************************************/

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        if (str === undefined) { return false; }
        return this.substring( 0, str.length ) === str;
    };
}

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t;
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}

String.prototype.clean = function(){
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
    return str.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ');
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function uniqId() {
    return Math.round(new Date().getTime() + (Math.random() * 100));
}

