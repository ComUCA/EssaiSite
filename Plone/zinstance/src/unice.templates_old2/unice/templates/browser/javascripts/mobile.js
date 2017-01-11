
window.addEventListener('push', function(param) {
    console.log('push');
    console.log(param);
});

/*********************************************************************************************/

function load(url, callback) {
    var xhr;
    if (typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest();
    } else {
        var versions = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"]
        for(var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch(e){}
        }
    }

    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if(xhr.readyState < 4) { return; }
        if(xhr.status !== 200) { return; }
        if(xhr.readyState === 4) { callback(xhr); }
    }

    xhr.open('GET', url, true);
    xhr.send('');
}


function load_dexterity(result_element_id, reponse_element_id) {
    var url = document.URL.substring(0, document.URL.lastIndexOf('/') + 1);
    load(url+'?ajax_load=1', function(xhr) {
        var parser = new DOMParser();
        var response = parser.parseFromString(xhr.responseText, 'application/xhtml+xml');
        document.getElementById(result_element_id).appendChild(response.getElementById(reponse_element_id));
    });
}

/*********************************************************************************************/

function submit_search_form(search_form, search_input, search_results) {
    var input = document.getElementById(search_input).value.trim();
    if (input != '') {
        load(search_form.action+'?q='+input, function(xhr) {
            var html = '';
            var parser = new DOMParser();
            var response = parser.parseFromString(xhr.responseText, 'application/xhtml+xml');
            var links = response.getElementsByTagName('a');
            for (i = 0; i < links.length; ++i) {
                var href = links[i].getAttribute('href').trim();
                var title = links[i].childNodes[0].nodeValue;
                if (href != '' && !href.contains('@@search')) {
                    var href_mobile = href.split('?')[0]+'/@@mobile_view';
                    html += '<li tal:repeat="item items" class="table-view-cell">';
                    html += '<a class="push-right" data-transition="slide-in" href="'+href_mobile+'" ontouchstart="close_search_modal(\'search-modal\');">';
                    html += title;
                    html += '</a>';
                    html += '</li>';
                }
            }
            html = '<div class="card"><ul class="table-view">'+html+'</ul></div>';
            document.getElementById(search_results).innerHTML = html;
        });
    }
}

function close_search_modal(modal_id) {
    removeClass(document.getElementById(modal_id), 'active');
}

/*********************************************************************************************/

if (!('contains' in String.prototype)) {
    String.prototype.contains = function(str, startIndex) {
        return ''.indexOf.call(this, str, startIndex) !== -1;
    };
}

function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function removeClass(ele, cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}
