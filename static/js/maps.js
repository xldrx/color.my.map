var map;

function double_click(area) {
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
            button = $('#remove_button');
            button.addClass('hideit');
        });

    }

    google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery, google);
