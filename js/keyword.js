$(function() {
    $('#listview > li').hide();

    $('#keyword').keyup(function() {
        var keyword = $(this).val();
        if( keyword == '') {
            $('#listview > li').hide();
            return false;
        }

        $('#listview > li').each( function() {
            if($(this).text().indexOf(keyword) >  -1 ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
        
    });
});
