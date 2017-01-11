$( document ).ready(function() {

    if (!$('body').hasClass('template-theming-controlpanel-mapper')) {

        $('div.modal').on('loaded.bs.modal', function (e) {
            var modalcontent = $(e.target).find('.modal-content');
            var content = modalcontent.find('#content');
            var title = content.find('h2').first().text();

            modalcontent.html($('<div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
                <h4 class="modal-title">'+title+'</h4>\
            </div>\
            <div class="modal-body">'+content.html()+'<div class="visualClear"></div></div>'));
        })

        $('#video_modal .modal-body').fitVids();

        $('body.portaltype-formation_professionnelle.template-edit textarea[name^="form.widgets"]').attr('rows', '5');

        $('*[data-toggle="popover"]').popover();

        //console.log($('*[data-toggle="dropdown"]'));
        $('*[data-toggle="dropdown"]').dropdown();


        var prefix = 'body.template-edit.portaltype-document_structure ';
        for (var i = 1; i <= 15; i++) {
            var n = i>9 ? ''+i : '0'+i;
            $(prefix+'div[data-fieldname="form.widgets.texte'+n+'"]').each(function() {
                var richTextWidget = $(this).find('.richTextWidget');
                var label = $(this).find('label.horizontal');

                label.addClass('closed').click(function() {
                    richTextWidget.toggle();

                    if ($(this).hasClass('closed')) {
                        $(this).removeClass('closed').addClass('opened');
                    } else {
                        $(this).removeClass('opened').addClass('closed');
                    }
                });
            });
        };

        $(prefix+' span.named-image-widget div label').each(function() {
            var txt = $(this).text();
            if (txt == 'Garder l\'image existante') {
                txt = 'Garder';
            } else if (txt == 'Remplacer l\'image existante') {
                txt = 'Supprimer';
            } else if (txt == 'Remplacer par une nouvelle image') {
                txt = 'Remplacer';
            }
            $(this).text(txt);
        });

        $('body.portaltype-axe_interdisciplinaire #form-widgets-banniere, body.template-axe_interdisciplinaire #form-widgets-banniere').each(function() {
            $(this).after('<img style="width: 50%; margin: 10px auto; display: block;"/>');
        }).bind('change', function() {
            $(this).next('img').attr('src', '++resource++unice.templates.images/banners/'+$(this).val()+'.jpg');
            // $('.title').attr('style', 'background-image: url("++resource++unice.templates.images/banners/'+$(this).val()+'.jpg")')
        }).trigger('change');

    }

});
