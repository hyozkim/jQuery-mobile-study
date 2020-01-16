$(document).ready(function() {
    // is( selector / element / jQuery )
    var id = $('#leftMenu').is(':visible') ? '#leftMenu' : '#rightMenu';
    var offPosition = "0%";
    var onPosition = "0%";

    $(id).attr("mode","off");

    if( id == '#leftMenu' ) {
       $('.ui-content').css("margin-left","16%");
       $('.ui-header').css("margin-left","16%");
       $('.ui-footer').css("margin-left","16%");
    } else if(id == '#rightMenu') {
       $('.ui-content').css("margin-left","0%");
       $('.ui-header').css("margin-left","0%");
       $('.ui-footer').css("margin-left","0%");
    }

    $('#menuBtn').click(function() {
        var mode = $(id).attr('mode');

        if( id == '#leftMenu' ) {
            offPosition = "-64%";
            onPosition = "0%";
        } else if(id == '#rightMenu') {
            offPosition = "84%";
            onPosition = "20%";
        }

        // OFF 상태 -> 메뉴 열림
        if( mode == "off" ) {
            $(id).animate({ "left": onPosition}, "fast");
            $(id).attr("mode","on");
            $('#menuBtn').attr('class','ui-btn ui-icon-arrow-l ui-btn-icon-left ui-shadow ui-corner-all');
        } else { // ON -> 메뉴 닫힘
            $(id).animate({ "left": offPosition}, "fast");
            $(id).attr("mode","off");
            $('#menuBtn').attr('class','ui-btn ui-icon-arrow-r ui-btn-icon-left ui-shadow ui-corner-all');
        }
    });
});