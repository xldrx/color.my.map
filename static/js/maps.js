var map;

function double_click(area) {
    var url_button = $('#url_button');
    url_button.addClass('hideit');

    button = $('#remove_button');
    button.removeClass('hideit');
    button.unbind('click');
    button.click(function () {
        button.addClass('hideit');
        var n = area.getBounds().getNorthEast().lat(),
            e = area.getBounds().getNorthEast().lng(),
            s = area.getBounds().getSouthWest().lat(),
            w = area.getBounds().getSouthWest().lng();
        $.post("/remove-area", { n: n, w: w, e: e, s: s})
            .done(function (data) {
                area.setMap(null);
            });
    });
}

function rgbToHex(color) {
    var a = color.split("(")[1].split(")")[0];
    a = a.split(",");
    var b = a.map(function(x){
        x = parseInt(x).toString(16);
        return (x.length==1) ? "0"+x : x;
    });
    return b.join("");
}

function color_click(color) {
    var button = $('#remove_button');
    button.addClass('hideit');
    button.unbind('click');

    var url_button = $('#url_button');
    url_button.removeClass('hideit');

    var url_pic = $('#url_pic');
    url_pic.attr("src","https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=http%3A%2F%2Fxldrx.com%2Fcolor%3Fcolor%3D"+rgbToHex(color));
    url_pic.unbind('click');
    url_pic.click(function () {
        window.open("http://www.xldrx.com/color?color="+rgbToHex(color));
    });
}

(function ($, google) {
    function initialize() {
        var style = get_style();

        var myLatlng = new google.maps.LatLng(40.1140258, -88.2248073),
            isDraggable = $(document).width() > 556 ? true : false,
            mapOptions = {
                draggable: true,
                scrollwheel: false,
                /*disableDefaultUI: true,*/
                disableDoubleClickZoom: true,
                zoom: 17,
                center: myLatlng,
                styles: style,
                maxZoom: 19
            };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var searchBox = add_search(map);
        add_areas();


        google.maps.event.addDomListener(window, 'resize', function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });
        google.maps.event.addListener(map, 'bounds_changed', function () {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
        });
        google.maps.event.addListener(map, 'click', function () {
            var button = $('#remove_button');
            button.addClass('hideit');

            var url_button = $('#url_button');
            url_button.addClass('hideit');
        });

    }

    google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery, google);
