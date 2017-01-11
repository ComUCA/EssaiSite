$( document ).ready(function() {

    if (!$('body').hasClass('template-theming-controlpanel-mapper')) {

        $('.portlet.portletSygefor .portletItem').each(function() {
            var self = $(this);
            var sygefor = self.data('sygefor');
            var inscription = self.data('inscription');

            $.ajax({
                type: 'POST',
                url: window.location.href+'/@@sygefor',
                data: {
                    sygefor: sygefor,
                    inscription: inscription
                }
            }).done(function(msg) {
                self.html(msg);
                var img = $('<img src="./personnels/service-formation-des-personnels-de-luns/contenus-riches/images/divers/parcours-excel-1/image" class="img-responsive">');
                $('#modal_905, #modal_906, #modal_907, #modal_908, #modal_909, #modal_910, #modal_911, #modal_1004, #modal_1005, #modal_1006, #modal_1007, #modal_1008').find('.modal-body').prepend(img);

                img = $('<img src="./personnels/service-formation-des-personnels-de-luns/contenus-riches/images/divers/recapitulatif-formations-sats/image" class="img-responsive">');
                $('#modal_1130, #modal_932, #modal_1044, #modal_1131').find('.modal-body').prepend(img);
            }).fail(function(jqXHR, textStatus) {
                self.html('<div class="alert alert-danger">Une erreur est survenue</div>');
            }).always(function() {
                self.removeClass('loading');
            });

        });
    }
});
