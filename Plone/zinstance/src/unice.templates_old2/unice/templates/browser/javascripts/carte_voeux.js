storage = $.localStorage

var form = $('#form');
var img = $('#img');
var div_titre = $('#titre');
var div_texte = $('#texte');
var input_img = $('#input_img');
var input_titre = $('#input_titre');
var input_texte = $('#input_texte');
var input_lien = $('#input_lien');
var button_lien = $('#button_lien');


initForm();
updateFonts();

$(input_titre).keyup(function() {
    updateForm();
});
$(input_texte).keyup(function() {
    updateForm();
});
$(input_img).change(function() {
    updateForm();
});

function initForm() {
    if (form.length > 0) {
        form.submit(function( event ) {
            event.preventDefault();
        });
        input_texte.keypress(function(event) {
            if(event.which == '13') {
                return false;
            }
        });


        if (!storage.isEmpty('image')) {
            input_img.val(storage.get('image'));
        }
        if (!storage.isEmpty('titre')) {
            input_titre.val(storage.get('titre'));
        }
        if (!storage.isEmpty('texte')) {
            input_texte.val(storage.get('texte'));
        }

        // input_lien.val('');

        updateForm();
    }
}

function updateForm() {
    var image = input_img.val();
    var titre = input_titre.val();
    var texte = input_texte.val();

    img.attr('src', '++resource++unice.templates.images/'+image+'.jpg');
    $('#textes').removeClass().addClass(image);
    updateFonts();

    div_titre.text(titre);
    div_texte.html(texte.replace(/\r\n|\r|\n/g, '<br />'));

    storage.set('image', image);
    storage.set('titre', titre);
    storage.set('texte', texte);

    // input_lien.val('');
    if (titre && texte) {
        button_lien.attr('disabled', false);
    } else {
        button_lien.attr('disabled', true);
    }

    generateImage();
}

function updateFonts() {
    div_titre.fitText(2);
    div_texte.fitText(2.5);
}

function loadingIcon(cls) {
    button_lien.find('i').removeClass().addClass(cls);
}

button_lien.click(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: './creer_carte',
        data: {image: input_img.val(), titre: input_titre.val(), texte: input_texte.val() },
        beforeSend: function(xhr) {
            loadingIcon('fa fa-cog fa-spin');
            // input_lien.val('');
        },
        success: function(data, textStatus, jqXHR ) {
            loadingIcon('fa fa-check-circle');
            // input_lien.val(data);
            // window.open(data);
            // alert(data);
            window.location.href = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            loadingIcon('fa fa-exclamation-triangle');
            // input_lien.val('Une erreur est survenue !');
        },
        complete: function(jqXHR, textStatus) {
        }
    });
});

generateImage();
function generateImage() {
    var canvas = document.getElementById('carteCanvas');
    if (canvas) {
        var image = $(canvas).data('image');
        var titre = $(canvas).data('titre');
        var texte = $(canvas).data('texte');
        var color = $(canvas).data('color');

        var context = canvas.getContext('2d');
        var imageObj = new Image();
        imageObj.onload = function() {
            var maxWidth = 1200 - 2*20;
            var x = canvas.width / 2;
            var y = 600;

            context.drawImage(imageObj, 0, 0);
            context.fillStyle = color;
            context.textAlign = 'center';

            context.font = '300 58px Roboto';
            y = wrapText(context, titre, x, y, maxWidth, 58);

            context.font = '100 46px Roboto';
            y = wrapText(context, texte, x, y, maxWidth, 46);


            var dataURL = canvas.toDataURL("image/jpeg", 0.75);
            $('#imageCanvas').attr('src', dataURL);
            // var data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            // window.location.href = data;
        };
        imageObj.src = image;
    }
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    return y+lineHeight;
}

