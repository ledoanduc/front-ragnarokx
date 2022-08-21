
/*********************************
 웹 스크립트 
*********************************/


//  페이지 오류 부분 초기화 함수
function initFunction(){
    removeBirds();
    setTimeout(function() {
        
        createBirds();
    }, 1500);
    $('html').css('overflow','visible');
}


// 게임영상 부분 유튜브 url 설정
function SetYoutube() {    
    var youtube = '';
    var youtubeUrl = arguments[0];    
    
    if (youtubeUrl == '' || youtubeUrl == null) {
        alert('coming soon!'); //210713수정
    } else {
      youtube = '<iframe id="video" width="900" height="576" src="' + youtubeUrl + '" frameborder="0" allowfullscreen></iframe>';
        $(".you_tube").html(youtube);
    }
}

// [메인 이미지 변경 및 애니메이션 변경 함수 추가]

function createBirds(){
    $(".bird-container--one").html('<div class="bird bird--one"></div>');
    $(".bird-container--two").html('<div class="bird bird--two"></div>');
    $(".bird-container--three").html('<div class="bird bird--three"></div>');
}
function removeBirds(){
    $(".bird-container--one").html('');
    $(".bird-container--two").html('');
    $(".bird-container--three").html('');
}


function createStars(){
    for (var index = 0; index < 11; index++) {
        $(".night").append('<div class="shooting_star"></div>');                
    }
}
function removeStars(){
    $(".night").html('');

}

function header_open(){
    $('[id^=header_rightContents]').css('transform','translateX(0px)');
    $('[id^=header_leftContents]').css('transform','translateX(0px)');
}

function bg_morning(){
    $('#bgChange').removeClass()
    $('#bgChange').addClass('intro morning');
    $('[id^=effect_]').hide(); 
    $('#effect_morning_area').fadeIn('fast');
    $('.bird').css({"animation-name": "fly-cycle" });
    createBirds(); 
    removeStars();
}
function bg_afternoon(){
    removeStars(); 
    removeBirds(); 
    $('#bgChange').removeClass()
    $('#bgChange').addClass('intro afternoon');
    $('[id^=effect_]').hide(); 
    $('#effect_afternoon_area').fadeIn('fast');
}
function bg_evening(){
    createStars(); 
    removeBirds(); 
    $('#bgChange').removeClass()
    $('#bgChange').addClass('intro evening');
    $('[id^=effect_]').hide(); 
    $('#effect_evening_area').fadeIn('fast');
}
$(function(){
    
    $('.change_timeArea a').click(function(){
        var call_function = $(this).data('bg');
        if(call_function === 'bg_morning') {
            bg_morning();
        } else if(call_function === 'bg_afternoon') {
            bg_afternoon();
        } else {
            bg_evening();
        }
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })
})
// [메인 이미지 변경 및 애니메이션 변경 함수 추가]


// 팝업 요청 시 블라인드 액션 함수.
function open_blind() {
    $height = $(document).height();
    $(".blind").height($height);
    $(".blind").css("display", "block");
}
// 팝업 닫기 요청 시 액션 함수.
function closed_popup() {
    $(".blind").css("display", "none");
    $('[class^=pop_]').hide();
    $('[id^=pop_]').hide();
}

//worldView 눈내리기 
function txtShow() {
    setTimeout(function() {
        $('.img_txt0').addClass('show');
        setTimeout(function() {
            $('.img_txt1').addClass('show');
        }, 1000);            
            setTimeout(function() {
                $('.img_txt2').addClass('show');
            }, 1700);
    }, 700);
    return false;
}


$(document).ready(function () {
    
    $('#btn_top').click(function(){
        $('html,body').animate({scrollTop:0},200);
    })
    //$('.scroll1').infiniteslide(); 210709삭제

    // var logo삭제 210709    
    
    /*****210609추가******/
    var agent = navigator.userAgent.toLowerCase(); // 브라우저 체크.
    var mainBgm = document.getElementById("mainBGM"); // bgm 태그.
    
    // 배경음악 재생 함수 210806수정.
    function bgmPlay(){
        mainBgm.play();			
        $(".btn_menuBGM").removeClass('active')

    }
    // 배경음악 일시정지 함수 210806수정.
    function bgmPause(){
        mainBgm.pause();
        $(".btn_menuBGM").addClass('active')
    }		

    // 메인 음악 음소거 on/off 버튼.
		$(".btn_menuBGM").click(function() {			
			var bool = mainBgm.paused;			
			if(!bool){ // 배경음악이 켜져있다면,
				bgmPause();
			} else { // 배경음악이 꺼져있다면,				
				bgmPlay();
			}
		});


    //210806 수정
    // 엣지 또는 IE 브라우저 액션. (마이크로소프트 엣지 navigator.userAgent 에 chorme 단어가 포함 되어있으므로 처리. )
    function browsers(){
        /*if (agent.indexOf("edg") != -1 || agent.indexOf("trident") != -1 ) {
            bgmPlay();			
            return false;
        } else { // 그 이외의 브라우저 액션.*/
            bgmPause();
            return false;
        /*}	*/
    }
    browsers();
    /***** //210609추가******/




    // 메인 음악 음소거 on/off 버튼. 210609삭제
   /* $(".btn_menuBGM").click(function() {
        $(this).removeClass('active');
        var bool = $("#mainBGM").prop("muted");        
        if(!bool){
            $(this).addClass('active');
        }
        $("#mainBGM").prop("muted",!bool);
    });*/



    // 메뉴 버튼에 호버 시 액션.
    $('.btn_menu').hover(function(){
        $('.logoPart0').addClass('is_animated');
        $('.logoPart1').addClass('is_animated');
    }, function(){
        $('.logoPart0').removeClass('is_animated');
        $('.logoPart1').removeClass('is_animated');
    })
  
    //동영상 open  
    $(".btn_play").click(function() {    
        
        SetYoutube($(this).attr('data-content')); 
        open_blind();
        $(".movie_wrap").addClass("open_movie"); 
        return false;
    });
    

    //210709수정
    $("#main_btn_play").click(function() {    
        //$(".btn_menuBGM").trigger('click')
        $("#mainBGM").prop("muted", true); 
        return false;
    });

    // 210709수정 [youtube 팝업 닫기 버튼 클릭 시 배경음 활성화 ]
    $('section.movie_wrap .btn_close').click(function(){
        
        // 페이지 진입 시 현재 위치 명 취득.
        var $currentPage = $('html').data('page');
        
        // 현재 페이지가 메인 페이지 일 때.
        if ($currentPage == 'main') {                 
            $("#mainBGM").prop("muted", false);     
            //$(".btn_menuBGM").trigger('click');
        } else {
            return false;
        }
    });
    
    //worldView 눈내리기 
    txtShow();

    

    //팝업 버튼클릭 close
    $('.btn_close').click(function() {         
        $('.movie_wrap').removeClass("open_movie"); 
        closed_popup();
        $('.you_tube').empty();
        return false;
    });   
    

    //블라인드 클릭 모든 팝업, 헤더등 close 210806 삭제
   /* $('.blind').click(function() {    	
        if($(".movie_wrap").hasClass("open_movie") === true) {
               $("#mainBGM").prop("muted", false);
               $('.movie_wrap').removeClass("open_movie"); 
                $('.you_tube').empty();
                closed_popup();
            } else {
                closed_popup();
                $('#header nav').animate({
                    left: '-100%'
                });
            }
            return false;		
    });   */

    
    // 메뉴 클릭
    $('.btn_menu').click(function(){
        $('#header nav').animate({
            left: '0%'
        });
        open_blind();
        return false;
    });
    // 메뉴 닫기 클릭
    $('.nav_close_btn').click(function(){
        $('#header nav').animate({
            left: '-100%'
        });
        closed_popup();
        return false;
    });

    var flag = 0;
    $('.showBottom').click(function(){ // # -> . 로 선택자 변경
                        
        if(flag === 1){
            $(this).removeClass('active');    
            $('#cbp-spmenu').removeClass('cbp-spmenu-open');
            flag = 0;
        }else {
            $(this).addClass('active');
            $('#cbp-spmenu').addClass('cbp-spmenu-open');
            flag = 1;
        }
        
        return false;
    });

    
    
});


// 페이지 리로드 시 현재 위치 체크 스크립트.
$(function() {
    initLocalClocks();

    // 페이지 진입 시 현재 위치 명 취득.
    var $currentPage = $('html').data('page');

    // 현재 페이지가 메인 페이지 일 때.
    if ($currentPage == 'main') {          
        //$('.btn_menuBGM').show(); 210806삭제
        $('.change_timeArea').show(); // 200330 추가
    } else {        
        $('.btn_menuBGM').show();
        $('.cbp-spmenu').show(); //210809수정
        // $('#header').css('display','block');  200330 수정 [주석]   
        header_open(); // 200330 추가 헤더 메뉴들 나타내기 함수   
        /*$("#mainBGM").prop("muted",true);*/ // 210806삭제
    }

    
     if ($currentPage == 'gameintro') {         
        var $event_pageIndex = $('html').data('index');

        $('ul.navUL li.menu1').addClass('active');     // 220510 수정   

        if($event_pageIndex === 0) {            
            $('ul.navUL a li.menu1_0').addClass('active');
        } else if($event_pageIndex === 1) {            
            $('ul.navUL a li.menu1_1').addClass('active');
        } else if($event_pageIndex === 2) {            
            $('ul.navUL a li.menu1_2').addClass('active');
        } else if($event_pageIndex === 3) {            
            $('ul.navUL a li.menu1_3').addClass('active');
        } 

    }
    if ($currentPage == 'support') {      
        var $pageIndex = $('html').data('index');           
        $('ul.navUL li.menu2').addClass('active');  // 220510 수정
        if($pageIndex === 0) {            
            $('ul.navUL a li.menu2_0').addClass('active');
        } 

    }

    // 220510 추가
    if ($currentPage == 'news') {      
        var $pageIndex = $('html').data('index');           
        $('ul.navUL li.news').addClass('active'); 
        if($pageIndex === 0) {            
            $('ul.navUL a li.news--update').addClass('active');
        } 
    }
    // //220510 추가
    


    // 211103 추가 [[전체적인 브라우저에 스크롤 미 표현]]
    var $pageFixedFlag = $('html').data('screenfixed');
    if($pageFixedFlag == 'on'){
        $('body').css('overflow','hidden');
        $('footer').css('position','absolute');
    }

    // faq 부분 메뉴 드롭다운 액션.
    $('.faqArea ul li').click(function(){
        
        $(this).children('p.contents').slideToggle();
        $(this).children('i.arrow').toggleClass('on');
        
        $(this).siblings().children('i').removeClass('on');
        $(this).siblings().children('p').slideUp('');


    })
    // //211103 추가

})



function initLocalClocks() {
    
    var date = new Date;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
  
    
    var hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'minutes',
        angle: (minutes * 6)
      },
      {
        hand: 'seconds',
        angle: (seconds * 6)
      }
    ];
    
    for (var j = 0; j < hands.length; j++) {
      var elements = document.querySelectorAll('.' + hands[j].hand);
      for (var k = 0; k < elements.length; k++) {
          elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
          elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
          
          if (hands[j].hand === 'minutes') {
            elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
          }
      }
    }
  }

  function setUpMinuteHands() {    
    var containers = document.querySelectorAll('.minutes-container');
    var secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {      
      var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
      setTimeout(function() {
        moveMinuteHands(containers);
      }, delay);
    }
  }

  function moveMinuteHands(containers) {
    for (var i = 0; i < containers.length; i++) {
      containers[i].style.webkitTransform = 'rotateZ(6deg)';
      containers[i].style.transform = 'rotateZ(6deg)';
    }    
    setInterval(function() {
      for (var i = 0; i < containers.length; i++) {
        if (containers[i].angle === undefined) {
          containers[i].angle = 12;
        } else {
          containers[i].angle += 6;
        }
        containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
      }
    }, 60000);
  }

  function moveSecondHands() {
    var containers = document.querySelectorAll('.seconds-container');
    setInterval(function() {
      for (var i = 0; i < containers.length; i++) {
        if (containers[i].angle === undefined) {
          containers[i].angle = 6;
        } else {
          containers[i].angle += 6;
        }
        containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
      }
    }, 1000);
  }

  // 220328 수정
  function swiperActivate() {
    var swiper = new Swiper('.swiper-container', {

        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 60,
        loop : true,
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
            on: {
                slideChange: function(){            
                    
                    // 슬라이드 갯수 기입. [가상으로 생겨나는 슬라이드 수도 존재하기때문에 swiper.slides.length 는 사용 불가]
                    var slideLength = 4;

                    for (var index = 0; index < slideLength; index++) {
                        $('.psy').removeClass('img'+index);                        
                    }
                                               
                switch(this.realIndex) {
                    
                    case 0 :  $('.psy').addClass('img'+this.realIndex); break;
                    case 1 :  $('.psy').addClass('img'+this.realIndex); break;
                    case 2 :  $('.psy').addClass('img'+this.realIndex); break;
                    case 3 :  $('.psy').addClass('img'+this.realIndex); break;
                }
                
                },
            },
        
    
    });    

  }
  // 220328 수정
