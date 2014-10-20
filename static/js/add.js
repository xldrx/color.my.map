function previewFile() {
    var preview = $("#preview");
    var file = $("#upload")[0].files[0]; //sames as here
    var reader = new FileReader();

    preview.load(function () {
        updateColor();
    });

    reader.onloadend = function () {
        preview.attr("src", reader.result);
    }

    if (file) {
        reader.readAsDataURL(file);
    }
    else {
        preview.src = "";
    }
}

function updateColor() {
    var img = new Image();
    img.src = $("#preview").attr("src");

    var colorThief = new ColorThief();
    main_color = colorThief.getColor(img);
    $("#main_color").css("background-color", 'rgb(' + main_color.join(',') + ')');

    other_colors = colorThief.getPalette(img, 5);
    for (index = 0; index < other_colors.length; index++) {
        color = other_colors[index];
        $("#color_" + index).css("background-color", 'rgb(' + color.join(',') + ')');
    }

    $(".colorInner").css('background-color', 'rgb(' + other_colors[4].join(',') + ')');
    $(".track").css('background-image', 'url(' + $("#preview").attr('src') + ')');

    var $box = $('#colorPicker');
    $box.tinycolorpicker();

    $box.bind("change", function (color) {
        $("#color_4").css("background-color", $(".colorInner").css('backgroundColor'));
    });

}

function checkExif(exifObject) {
    try {
        var aLat = exifObject.GPSLatitude;
        var aLong = exifObject.GPSLongitude;
        var latRef = exifObject.GPSLatitudeRef ? exifObject.GPSLatitudeRef : 'N';
        var longRef = exifObject.GPSLongitudeRef ? exifObject.GPSLongitudeRef : 'W';

        if (aLat && aLong) {
            var fLat = (aLat[0] + aLat[1] / 60 + aLat[2] / 3600) * (latRef === 'N' ? 1 : -1);
            var fLong = (aLong[0] + aLong[1] / 60 + aLong[2] / 3600) * (longRef === 'W' ? -1 : 1);

            var center = new google.maps.LatLng(fLat, fLong);
            update_rect(center);
        }

    }
    catch (e) {
    }
}

function init() {
    $(".color_placeholder").click(function () {
        $(".color_placeholder").removeClass('selected_color');
        $(this).addClass('selected_color');
        cur_color = $(this).css("background-color");
        if (rect) {
            rect.setOptions({'fillColor': cur_color});
            rect.setOptions({'strokeColor': cur_color});
        }
    });

    try {
        $('#upload').change(function () {
            $(this).fileExif(checkExif);
        });
    }
    catch (e) {
//        alert(e);
    }
}

function submit() {
    if (!cur_color) {
        return false;
    }
    if (!rect) {
        return false;
    }

    var n = rect.getBounds().getNorthEast().lat(),
        e = rect.getBounds().getNorthEast().lng(),
        s = rect.getBounds().getSouthWest().lat(),
        w = rect.getBounds().getSouthWest().lng();
    $.post("/add-area", { n: n, w: w, e: e, s: s, color: cur_color })
        .done(function (data) {
            alert("Added");
            RunCallbackFunction(cur_color, n, e, s, w);
            window.close();

        });

    return false;
//    return  new google.maps.LatLngBounds(new google.maps.LatLng(s, w), new google.maps.LatLng(n, e))
}