function open_add_windows(){
    var win = window.open('/add-window', '_blank');
    win.onload = function() { win.RunCallbackFunction = add_area_to_db; };
}

function add_area_to_db(color, n,w,e,s){

}