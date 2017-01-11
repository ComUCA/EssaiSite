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
        var filter = $(this).val(), count = 0;
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
    /*if (element.find('strong').text() == 'Actualité 3') {
    console.log('-------------------------------------------------------');
    console.log(element.find('strong').text());*/

        var popovers = $(element.data('popover-content')+',.popover');
        popovers.find('.btn').removeClass('btn-primary').addClass('btn-default');

        var subjects = $(element.data('subjects').split(','));
        var labels = element.find('span.subjects span span').text('');
        //console.log(subjects);
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

                            /*console.log('######################');
                            console.log(subject);
                            console.log(prefix_canal);
                            console.log(importance);
                            console.log(prefix_importance);*/
                            var sub = importance.substring(prefix_importance.length);
                            //console.log(sub);
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
    //}
}

function addSubjects(button) {
    var subjects = button.data('subjects');
    //console.log(button);
    //console.log(subjects);

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
    // var colors = menu.data('colors').split(',').clean('');
    // var prefix = menu.data('prefix');
    var url = menu.data('url');

    /*** Button ***/
    // var html = '';
    // if (subjects.length == 0) {
    //     html += 'Non affiché';
    // } else {
    //     html += 'Affiché dans';
    //     subjects.each(function(i, s) {
    //         html += ' <i class="fa fa-square" style="color:'+colors[i]+'"></i> '+s.replace(prefix, '');
    //     });
    // }
    // html += ' <span class="caret"></span>';
    // button.html(html);

    /*** Menu ***/
    nbr_actives = 0;
    button.html('');
    dropdown.html('');
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

        var li = $('<li style="background-color:'+allcolors[i]+'" class="'+cls+'"></li>');
        var admin = '';
        if (!access) {
            admin = ' <span class="label label-danger">admin</span>';
        }
        var a = $('<a href="#"><i class="fa fa-lg"></i> '+alltitles[i]+admin+'</a>').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (access) {
                console.log(alltitles[i]);
                console.log(allsubject);
                console.log($(this).find('.fa').addClass('fa-spin'));


                // setTimeout(function() {
                    $.ajax({
                        url: url+(active ? '/supprimer_subject' : '/ajouter_subject'),
                        data: {'subject': allsubject},
                        type: 'POST',
                        dataType: 'json'
                    }).done(function(data) {
                        console.log(data);
                        console.log(data.join('|'));
                        menu.data('subjects', data.join('|'));
                        updatePublicationMenu(menu);
                    });
                // }, 2000);
            }
        });
        li.append(a);
        dropdown.append(li);

        // var active = $.inArray(subject, subjects) > -1;
        // var cls = (active ? 'active' : '');
        // var li = $('<li style="background-color:'+allcolors[i]+'" class="'+cls+'"></li>');
        // var a = $('<a href="#"><i class="fa fa-lg"></i> '+subject.replace(prefix, '')+'</a>').click(function(e) {
        //     e.preventDefault();
        //     e.stopPropagation();

        //     $.ajax({
        //         url: url+(active ? '/supprimer_subject' : '/ajouter_subject'),
        //         data: {'subject': subject},
        //         type: 'POST',
        //         dataType: 'json'
        //     }).done(function(data) {
        //         console.log(data);
        //         menu.data('subjects', data.join(','));
        //         updatePublicationMenu(menu);
        //     });
        // });
        // li.append(a);
        // dropdown.append(li);
    });

    if (nbr_actives == 0) {
        button.html('Non affiché');
    }
    button.append(' <span class="caret"></span>');
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
