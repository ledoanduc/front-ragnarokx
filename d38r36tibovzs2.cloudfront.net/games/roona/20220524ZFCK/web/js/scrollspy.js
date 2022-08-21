
//scrollSpy function   210615 위치변경
function scrollSpy() {
    var sections = ['main']; // 211103 수정 [리워드, 사전예약 삭제]
    var current = '';
    var target = '';
    var sectionId = i;
    for (var i = 0; i < sections.length; i++) {
        if ( $('#'+sections[i]).offset().top <= $(window).scrollTop() ) {
            current = sections[i];                                  
        }
    }

    if(current == 'main') {
       $('.btn_menu').removeClass('brown');
       $('.btn_menuBGM').removeClass('brown');
        $('.menu0').removeClass('active'); //210705추가
    } else {
        $('.btn_menu').addClass('brown');
        $('.btn_menuBGM').addClass('brown');
        $('.menu0').addClass('active'); //210705추가
    }
    

}


$(window).scroll(function(e) {
    scrollSpy();   
})

