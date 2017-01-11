
function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t;
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}

// String.prototype.clean = function(){
//     var accent = [
//         /[\300-\306]/g, /[\340-\346]/g, // A, a
//         /[\310-\313]/g, /[\350-\353]/g, // E, e
//         /[\314-\317]/g, /[\354-\357]/g, // I, i
//         /[\322-\330]/g, /[\362-\370]/g, // O, o
//         /[\331-\334]/g, /[\371-\374]/g, // U, u
//         /[\321]/g, /[\361]/g, // N, n
//         /[\307]/g, /[\347]/g, // C, c
//     ];
//     var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
//     var str = this;
//     for(var i = 0; i < accent.length; i++){
//         str = str.replace(accent[i], noaccent[i]);
//     }
//     return str.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ');
// };

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


// $( document ).ready(function() {

//     if (!$('body').hasClass('template-theming-controlpanel-mapper')) {

//         $('.more_items').find('a').click(function(e) {
//             e.preventDefault();
//             $('.canal_fil_importance3').slideToggle();
//         });
//     }

//     var prefix_theme = '#FilUNSTheme';
//     $('#SFQuery .SFQuery_input label').each(function() {
//         var txt = $(this).text();
//         if (txt.startsWith(prefix_theme)) {
//             $(this).text(txt.substr(prefix_theme.length));
//         }
//     });

//     $('#live-search input').keyup(function(){
//         var filter = $(this).val();
//         $('body.template-filuns_gestion_view .list-group-item a').each(function() {
//             var title = $(this).find('strong').text().clean();
//             var desc = $(this).find('small').text().clean();
//             var subjects = $(this).find('span.subjects span span').text();
//             var content = title+' '+desc;

//             var notfound = false;
//             if (filter === '#oui') {
//                 notfound = (subjects === '');
//             } else if (filter === '#non') {
//                 notfound = (subjects !== '');
//             } else {
//                 notfound = content.search(new RegExp(filter.clean(), "i")) < 0;
//             }
//             if (notfound) {
//                 $(this).parent().fadeOut();
//             } else {
//                 $(this).parent().fadeIn();
//             }
//         });
//     });

// });

/*******************************************************************/
/*** GESTION *******************************************************/
/*******************************************************************/

// $(function() {

//     if (!$('body').hasClass('template-theming-controlpanel-mapper') && !$('body').hasClass('template-theming-controlpanel')) {
//         $('[rel=popover]').popover({
//             html : true,
//             content: function() {
//                 return $($(this).data('popover-content')).html();
//             }
//         });
//     }
//     $('body').on('click', function (e) {
//         $('[rel=popover]').each(function () {
//             if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
//                 $(this).popover('hide');
//             }
//         });
//     });

//     $('body.template-filuns_gestion_view a.list-group-item').each(function() {
//         updateSubjects($(this));
//     }).click(function(e) {
//         e.preventDefault();
//     });

//     $(document).on('click', 'body.template-filuns_gestion_view .popover button', function(){
//         addSubjects($(this));
//     });

// });

// function updateSubjects(element) {
//     var popovers = $(element.data('popover-content')+',.popover');
//     popovers.find('.btn').removeClass('btn-primary').addClass('btn-default');

//     var subjects = $(element.data('subjects').split(','));
//     var labels = element.find('span.subjects span span').text('');
//     subjects.each(function(i, subject) {
//         labels.each(function(j, label) {
//             label = $(label);
//             var prefix_theme = label.data('prefix-theme');
//             if (subject.startsWith(prefix_theme)) {
//                 var sub = subject.substring(prefix_theme.length);
//                 label.append((label.text() === '' ? sub : ' + '+sub));
//                 popovers.find('*[data-subjects="'+subject+'"]').addClass('btn-primary');
//             }
//             var prefix_canal = label.data('prefix-canal');
//             var prefix_importance = label.data('prefix-importance');
//             if (subject.startsWith(prefix_canal)) {
//                 subjects.each(function(k, importance) {
//                     if (importance.startsWith(prefix_importance)) {
//                         var sub = importance.substring(prefix_importance.length);
//                         label.append((label.text() === '' ? sub : ' + '+sub));
//                         popovers.find('*[data-subjects="'+subject+','+importance+'"]').removeClass('btn-default').addClass('btn-primary');
//                     }
//                 });
//             }
//         });
//     });

//     labels.each(function() {
//         var empty = $(this).text() === '';
//         $(this).parent().attr('class', (empty ? 'label label-default' : 'label label-info'));
//     });
// }

// function addSubjects(button) {
//     var subjects = button.data('subjects');

//     var id = button.parents('[rel]').attr('rel');
//     var elements = $('[data-popover-content="#'+id+'"]');
//     var selected = button.hasClass('btn-primary');
//     var url = elements.attr('href')+(selected ? '/supprimer_subject' : '/ajouter_subject');

//     var data = 'subject='+subjects;
//     if (selected) {
//         if (button.data('type')=='canaux') {
//             var buttons = button.parent().find('button');
//             protect = $.map(buttons, function(value) {
//                 var s = $(value).data('subjects');
//                 var sel = $(value).hasClass('btn-primary');
//                 return sel && s != subjects ? s : null;
//             }).join(',');

//             data += '&protect='+protect;
//         }
//     }

//     button.find('i').hide();
//     var spin = $('<i class="fa fa-spinner fa-spin"></i>');
//     button.prepend(spin);

//     $.ajax({
//         url: url,
//         type: 'POST',
//         dataType: 'json',
//         data: data
//     }).done(function(data) {
//         elements.each(function () {
//             $(this).data('subjects', data.join(','));
//             updateSubjects($(this));
//             spin.remove();
//             button.find('i').show();
//         });

//         refreshIframes();
//     });

// }

// function refreshIframes() {
//     $('iframe').each(function () {
//         $(this).attr('src', $(this).attr('src'));
//     });
// }

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
        filter_field = $('<li class="filter_field active"><div class="has-feedback"><label class="control-label sr-only">Recherche</label><input type="text" class="form-control" placeholder="Rechercher un code ou un mot... (taper \'actifs\' pour afficher ceux séléctionnés)" data-list="#'+uuid+'" autocomplete="off"/><i class="glyphicon glyphicon-search form-control-feedback"></i></div></li>');
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
        updateFilter(filter_field.find('input'), '#'+uuid+' li', '.filter_field', 1);
    }
}

function updateFilter(e, sel, exclude, charCount) {
    e.on("keyup",function () {
        var search = $(this).val();
        var $target = $(sel);
        $target.show();

        if (search && search.length >= charCount) {
            if (!searchNoCase('actifs', search)) {
                $target.not(":containsNoCase(" + search + "),"+exclude+"").hide();
            } else {
                $target.not(".active").hide();
            }
        }
    });

    $.expr[":"].containsNoCase = function (el, i, m) {
        var search = m[3];
        if (!search) {
            return false;
        }
        return searchNoCase(search, $(el).text());
    };
}

function searchNoCase(search, txt) {
    return new RegExp(search,"i").test(txt);
}

