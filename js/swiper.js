// trigger 생성
var processId; 

$(function() {
    var bodyWidth = $('body').width();
    var galleryWidth = bodyWidth - Number($(".ui-content").css('padding-left').replace('px','')) * 2 
                        - ($('#leftBtn').width() * 2);

    $('#imgList').attr('mode','stop');

    // alert(windowWidth); // 360
    // alert(Number($(".ui-content").css('padding-left').replace('px','')) * 2); // 16
    // alert($('#leftBtn').width() * 2); // 30
    // alert(galleryWidth); // 298

    $('#gallery').css('width', galleryWidth + 'px');
    $('#imgList ul li img').css('width', galleryWidth + 'px');

    // offset => 좌표뽑는 함수
    var galleryTop = $('#gallery').offset().top;
    $('#items').css('top', galleryTop + $('#leftBtn').height() * 0.8);
    $('#items').css('left', '20px');

    var imgCnt = 0;
    // 이미지 갯수
    $('#imgList ul > li').each(function () {
        imgCnt++;
    });

    // 선택 항목 동글벵이
    var tag = "";
    tag += "<ul>";
    for( var i = 1; i <= imgCnt; i++ ) {
        tag += "<li><div class='item' id='item" + i + "' onclick='selectImage(" + galleryWidth + ", " + i  +  ")'></div></li>";
    }
    tag += "</ul>";
    $('#items').html(tag);

    $("#items #item1").removeClass('item');
    $("#items #item1").addClass('item-active');

    $('#imgList').css('width', (galleryWidth * imgCnt) + 'px');

    $('#rightBtn').click(function(){ 
        // 첫번째 이미지 : 0px
        // 두번째 이미지 : 298px
        // 세번째 이미지 : 596px
        clearInterval(processId);

        if( $('#imgList').attr('mode') =='stop' )  {
            $('#imgList').attr('mode', 'play');
        
            var currentPos = Number($('#imgList').css('margin-left').replace('px',''));
            var movePos = ((currentPos / galleryWidth) -1 ) * galleryWidth;

            // 마지막으로 넘어갔을때 처음으로 되돌리기
            if( currentPos == (-1 * galleryWidth * (imgCnt - 1)) ) {
                movePos = 0;
            }

            $('#imgList').animate({
                "margin-left" : movePos + "px" 
            },"fast" );

            // animate가 완전히 끝났을때 이벤트 처리
            $('#imgList').promise().done(function() {
                $('#imgList').attr('mode','stop');
                processId = setInterval( moveRightImg, 5000);
                // 0 => 1번째
                // -100% => 2번째
                // -200% => 3번째 
                var index = (movePos / (-1 * galleryWidth) + 1);
                if( movePos == 0 ) {
                    $("#item" + imgCnt ).removeClass('item-active');
                    $("#item" + imgCnt ).addClass('item');
                    $("#item1").removeClass('item');
                    $("#item1").addClass('item-active');
                } else {
                    $("#item" + (index-1) ).removeClass('item-active');
                    $("#item" + (index-1) ).addClass('item');
                    $("#item" + index).removeClass('item');
                    $("#item" + index).addClass('item-active');
                }
            });
        }
    });

    $('#leftBtn').click(function(){ 
        // 1번째 이미지 : 0px -> -298px * 4
        // 2번째 이미지 : -298px -> 0px
        // 3번째 이미지 : -298px * 2 -> -298px
        // 4번째 이미지 : -298px * 3 -> -298px * 2
        // 5번째 이미지 : -298px * 4 -> -298px * 3
        clearInterval(processId);
        if( $('#imgList').attr('mode') =='stop' )  {
            $('#imgList').attr('mode', 'play');
            var currentPos = Number($('#imgList').css('margin-left').replace('px',''));
            var movePos = currentPos + galleryWidth;

            // 마지막으로 넘어갔을때 처음으로 되돌리기
            if( currentPos == 0 ) {
                movePos = (-1 * galleryWidth * (imgCnt-1));
            }

            $('#imgList').animate({
                "margin-left" : movePos + "px" 
            },"fast" );
            
            // animate가 완전히 끝났을때 이벤트 처리
            $('#imgList').promise().done(function() {
                $('#imgList').attr('mode','stop');
                processId = setInterval( moveRightImg, 5000);

                var index = ( movePos / (-1 * galleryWidth) + 1 );
                if( currentPos == 0 ) {
                    $("#item" + imgCnt).removeClass('item');
                    $("#item" + imgCnt).addClass('item-active');
                    $("#item1").removeClass('item-active');
                    $("#item1").addClass('item');
                } else {
                    $("#item" + (index+1) ).removeClass('item-active');
                    $("#item" + (index+1) ).addClass('item');
                    $("#item" + index).removeClass('item');
                    $("#item" + index).addClass('item-active');
                }
            });
        }
    });
    
    processId = setInterval( moveRightImg, 5000);
});

function moveRightImg() {
    $("#rightBtn").trigger("click");
}

// 1~5
// 1 -> 0px
// 2-> -298px
// 
function selectImage(galleryWidth, index) {
    var movePos = (index-1) * galleryWidth * -1;
    clearInterval(processId);
    if( $('#imgList').attr('mode') =='stop' )  {
        $('#imgList').attr('mode', 'play');

        $('#imgList').animate({
            "margin-left" : movePos + "px" 
        },"fast" );
        
        // animate가 완전히 끝났을때 이벤트 처리
        $('#imgList').promise().done(function() {
            $('#imgList').attr('mode','stop');
            processId = setInterval( moveRightImg, 5000);
        });

        $("#items ul li div").removeClass('item-active');
        $("#items ul li div").removeClass('item');
        $("#items ul li div").addClass('item');
        $("#items #item" + index ).addClass('item-active');
    }
}