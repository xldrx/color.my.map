function previewFile() {
    var preview = $("#preview");
    var file = $("#upload")[0].files[0]; //sames as here
    var reader = new FileReader();

    preview.load(function(){updateColor();});

    reader.onloadend = function () {
        preview.attr("src",reader.result);
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
    $("#main_color").css("background-color", 'rgb('+ main_color.join(',') +')');

    other_colors = colorThief.getPalette(img, 5);
    for (index = 0; index < other_colors.length; index++){
        color = other_colors[index];
        $("#color_"+index).css("background-color", 'rgb('+ color.join(',') +')');
    }
}

function init() {
    $(".color_placeholder").click(function(){
        $(".color_placeholder").removeClass('selected_color');
        $(this).addClass('selected_color');
        cur_color = $(this).css("background-color");
        if (rect){
            rect.setOptions({'fillColor': cur_color});
            rect.setOptions({'strokeColor': cur_color});
        }
    });
}

function submit(){
    if (!cur_color){
        return false;
    }
    if (!rect){
        return false;
    }


}