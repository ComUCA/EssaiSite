$( document ).ready(function() {
    $('.indicateurs_panel .modal').on('show.bs.modal', function (e) {
        setTimeout(function() {
            $('.modal-backdrop').addClass('indicateurs_modal_backdrop');
        }, 50);
    });
});

