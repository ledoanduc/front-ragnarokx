
    var $customScrollbarFlag = $('.customscrollFlag').data('customscroll');
    if($customScrollbarFlag == 'on'){
        $(".faqArea ul").mCustomScrollbar({
            theme:"minimal",
            scrollInertia : 100
        });

        $(".contentsScroll").mCustomScrollbar({
            theme:"minimal",
            scrollInertia : 100
        });
    }