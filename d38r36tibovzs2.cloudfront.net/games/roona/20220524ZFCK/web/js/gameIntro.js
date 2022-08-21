
// 게임소개 직업 소개 부분 스크립트
$(function(){

    var detailView_number; 

    // 직업소개 캐릭터 얼굴 클릭 시.
    $('ul.btn_charFace_area li').click(function(){
        $('[class^=char_area]').hide();
        $('[class^=img_char]').removeClass('show');
        var target = $(this).data('facenumber');

        $('#subdivideJobsImages').removeClass();
        $('#subdivideJobsImages').addClass('img_subdivideJobs'+target+'_0');
        $('[id^=job_]').hide();
        $('#job_'+target).show();
        $('.char_area'+target).fadeIn('slow');
        $('.img_char'+target).addClass('show');

        $(this).siblings().removeClass('active');    
        $(this).addClass('active');
    })

    // 자세히 보기 버튼 클릭 시.
    $('.btn_detail').click(function(){
        // 직업 소개 부분에 자세히 보기 버튼 클릭 시 캐릭 넘버 취득.
        detailView_number = $(this).data('detailbtnnumber'); 
        $('ul.detailJobs_area li.btn_jobs'+detailView_number).trigger('click');
        $('.step1').addClass('show');
    })
    
    // back 버튼 클릭 시.
    $('.btn_back').click(function(){
        $('.step1').removeClass('show');
    })

    // 직업 자세히 보기 뷰 부분. 직업 선택 시.
    $('ul.detailJobs_area li').click(function(){
        $('[class^=img_detailJobs]').hide();
        detailView_number = $(this).data('number'); 
        $('#subdivideJobsImages').removeClass();
        $('#subdivideJobsImages').addClass('img_subdivideJobs'+detailView_number+'_0');
        $('[id^=job_]').hide();
        $('#job_'+detailView_number).show();
        $('.subdivideJobs_area li:first-child').trigger('click');

        $(this).siblings().removeClass('active');    
        $(this).addClass('active');
        $('.img_detailJobs'+detailView_number).fadeIn('slow');

    })

    // 세분화된 직업 클릭 시.
    $('ul.subdivideJobs_area li').click(function(){        
        var subdivi_number = $(this).data('subdivinumber');                
        $('#subdivideJobsImages').removeClass();
        $('#subdivideJobsImages').addClass('img_subdivideJobs'+detailView_number+'_'+subdivi_number);
        
        $(this).siblings().removeClass('active');    
        $(this).addClass('active');
    })

})

$(function () {
    particlesJS('particles-js',

        {
            particles: {
                number: {
                    value: 20,
                    density: {
                        enable: !1,
                        value_area: 0
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "image",
                    stroke: {
                        width: 0,
                        color: "#ffffff"
                    },
                    polygon: {
                        nb_sides: 3
                    },
                    image: {
                        src: $('#particles-js').attr('data-content'),
                        width: 30,
                        height: 30
                    }
                },
                opacity: {
                    value: .5,
                    random: !1,
                    anim: {
                        enable: !1,
                        speed: 1,
                        opacity_min: .1,
                        sync: !1
                    }
                },
                size: {
                    value: 6,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 30,
                        size_min: .1,
                        sync: !1
                    }
                },
                line_linked: {
                    enable: !0,
                    distance: 0,
                    color: "#ffffff",
                    opacity: .4,
                    width: 2
                },
                move: {
                    enable: !0,
                    speed: 3,
                    direction: "top",
                    random: !0,
                    straight: !1,
                    out_mode: "out",
                    bounce: !1,
                    attract: {
                        enable: !1,
                        rotateX: 1,
                        rotateY: 1
                    }
                }
            },

            interactivity: {
                detect_on: "window",
                events: {
                    onhover: {
                        enable: !1,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: !1,
                        mode: "push"
                    },
                    resize: !0
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: .4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            }

        }

    );
})