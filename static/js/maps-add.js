var map;
var rect;
var cur_color;

function calcBounds(center, size) {

    var n = google.maps.geometry.spherical.computeOffset(center, size.height / 2, 0).lat(),
        s = google.maps.geometry.spherical.computeOffset(center, size.height / 2, 180).lat(),
        e = google.maps.geometry.spherical.computeOffset(center, size.width / 2, 90).lng(),
        w = google.maps.geometry.spherical.computeOffset(center, size.width / 2, 270).lng();
    return  new google.maps.LatLngBounds(new google.maps.LatLng(s, w), new google.maps.LatLng(n, e))
}


function update_rect(center) {
    bounds = calcBounds(center, new google.maps.Size(20,20));
    if (!rect) {
        var color;
        if (cur_color){
            color = cur_color;
        }
        else{
            color = 'red';
        }
        rect = new google.maps.Rectangle({
            bounds: bounds,
            editable: true,
            draggable: true,
            map: map,
            fillColor: color,
            fillOpacity: 0.8,
            strokeColor: color
        });
    }
    else {
        rect.setBounds(bounds);
    }
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
                zoom: 17,
                center: myLatlng,
                styles: style,
                maxZoom: 19
            };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        add_search(map);

        google.maps.event.addListener(map, 'click', function (event) {
            var center = event.latLng;
            console.log(center);
            update_rect(center);
        });


    google.maps.event.addDomListener(window, 'resize', function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });
    google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery, google);
