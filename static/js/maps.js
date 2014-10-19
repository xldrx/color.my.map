var map;

(function ($, google) {
    function initialize() {
        var style = get_style();

        var myLatlng = new google.maps.LatLng(40.1140258, -88.2248073),
            isDraggable = $(document).width() > 556 ? true : false,
            mapOptions = {
                draggable: true,
                scrollwheel: false,
                /*disableDefaultUI: true,*/
                zoom: 17,
                center: myLatlng,
                styles: style,
                maxZoom: 19
            };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        add_search(map);

    }

    google.maps.event.addDomListener(window, 'resize', function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });
    google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
    google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery, google);
