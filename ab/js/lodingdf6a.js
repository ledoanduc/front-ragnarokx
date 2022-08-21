// 로딩 부분 스크립트
$(function () {
    var status = false;
    function checkCookie() {
        var user = getCookie("RoOrigin");
        if (user != "") {
            // 이 함수가 실행되면 로딩화면 실행 안됌.
            animation_loading_off();
            status = true;
        } else {
            setCookie("RoOrigin", "false", 1);
            status = false;
        }
    }

    $('#video').get(0).pause();

    // $('#header').hide();  [주석]

    $('html').css('overflow', 'hidden');

    checkCookie();

    // 이 함수가 실행되면 로딩화면 실행 안됨.
    //animation_loading_off();

    // 쿠키가 발급되어있는 경우 함수
    function animation_loading_off() {
        $('html').css('overflow', 'visible');
        $('#section_loding').hide();
        $('#section_video').hide();
        $('#main').show();
        $('#section_alchemist').show();//220523 수정 : 추가
        $('#section_psy').show();//220523 수정 : 추가
        $('#section_screenshot').show(); // 220222 추가
        $('#section_crusader').show(); // 220222 추가
        $('#section_reservation').show();
        $('#section_registration').show();
        $('#cbp-spmenu').show(); //210806추가
        $('.snsArea').show(); //210806추가
        $('#btn_top').show(); //210806추가
        $('#pop_cbt').show(); //210916추가
        $('#header').show();
        swiperActivate(); // 220222 추가
        header_open();
        euPopup();
    }

    // 화면 전환 함수
    function viewChange() {
        if (status) {
            return false;
        }

        // 로딩화면 페이드 아웃
        $('#section_loding').fadeOut('slow', function () {
            $('#video').get(0).play();

            // 비디오화면 페이드인
            $('#section_video').fadeIn('slow', function () {
                $('html').css('overflow', 'hidden');
                setTimeout(function () {

                    // 비디오화면 hide
                    $('#section_video').fadeOut('slow');

                    setTimeout(function () {
                        // 메인화면 show
                        $('#main').fadeIn('slow', function () {
                            $('html').css('overflow', 'visible');
                            $('#section_reservation').show();
                            $('#section_registration').show();
                            $('#section_alchemist').show();//220523 수정 : 추가
                            $('#section_psy').show();//220523 수정 : 추가
                            $('#section_screenshot').show(); // 220222 추가
                            $('#section_crusader').show(); // 220222 추가
                            $('#cbp-spmenu').show(); //210806추가
                            $('.snsArea').show(); //210806추가
                            $('#btn_top').show(); //210806추가
                            $('#pop_cbt').show(); //210916추가
                            setTimeout(function () {
                                // 헤더부분 부분 show
                                // $('#header').fadeIn('slow');                            
                                swiperActivate(); // 220222 추가
                                header_open();
                                euPopup();
                            }, 200)
                        });


                    }, 500);

                }, 2500); //200608 수정
            });
        });
    }

    // 로딩 게이지 동작 함수
    function gauge(sec, percent, itemNum) {
        $('span.gauge').animate({
            width: percent
        }, sec, 'linear', function () {

            $('.item' + itemNum).fadeIn('fast'); // 200416 수정
            // 로딩이 100%가 됐을 때 로딩화면 -> 비디오화면으로 화면 전환 액션
            if (itemNum === 6) {
                viewChange();
            }
        });
    }


    function gaugeP(sec) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(gauge(250, '12%', 0)); // 200416 수정
                reject('failed');
            }, sec);
        })
    }
    gaugeP(500).then(function (result) {

    }).then(function (result) {

        setTimeout(function () {
            gauge(400, '20%', 1); // 200416 수정              
        }, 200);
    }).then(function (result) {
        setTimeout(function () {
            gauge(350, '38%', 2); // 200416 수정         
        }, 500);
    }).then(function (result) {
        setTimeout(function () {
            gauge(250, '50%', 3); // 200416 수정
        }, 500);
    }).then(function (result) {
        setTimeout(function () {
            gauge(400, '68%', 4); // 200416 수정
        }, 500);
    }).then(function (result) {
        setTimeout(function () {
            gauge(300, '70%', 5); // 200416 수정
        }, 500);
    }).then(function (result) {
        setTimeout(function () {
            gauge(750, '94%', 6); // 200416 수정
        }, 500);
    })

        .catch(function (err) {
            console.log(err);
        });

    // //200330 수정 및 추가
})