/******************
 * Base Execution *
 ******************/

$(function(){

  /**
   * loading
   */

  var scrollHeight;

  $('.gnb').append('<div class="scroll-amount"></div>');

  // detect main page
  if( $('section').hasClass('main-visual') ){

    $('html').addClass('main');

  }

  // loading
  (function(){

    setTimeout(function(){
      $('.loading-inner').removeClass('opacity');
    }, 1000);

    $(window).on('load', function(){
      setTimeout(function(){
        $('.loading').addClass('opacity').delay(1000).queue(function(){
          $(this).addClass('none');
        });
      }, 3000);
    })

  })();

  /**
   * event
   */

  //Header 이벤트
  (function(){

    $('.header').on({

      'mouseenter' : function(){

        $('.header, .gnb').addClass('bg');

      },

      'mouseleave' : function(){

        if( $('html').hasClass('main') ){
          $('.header, .gnb').removeClass('bg');
        }

      }

    });

    $('.gnb').on({

      'mouseenter' : function(){

        if( !$(this).hasClass('fixed') ){

          $('.header, .gnb').addClass('bg');

        }

      },

      'mouseleave' : function(){

        if( !$(this).hasClass('fixed') && !$('.total-search').hasClass('show') ){

          if( $('html').hasClass('main') ){
            $('.header, .gnb').removeClass('bg');
          }
        }

        $('.gnb').removeClass('on')

      }

    });

    $('.gnb-depth1-link').on('mouseenter', function(e){

      e.stopPropagation();

      if( !$('.gnb').hasClass('fixed') ){

        //$('.header, .gnb').addClass('show');
        $('.header, .gnb').addClass('bg');

      }

      $('.gnb').addClass('on');

    });

    $('.header-search-btn').on('click', function(){

      $('.total-search').addClass('show');
      $('.header, .gnb').addClass('bg');

    });

    $('.total-search-close').on('click', function(){

      $('.total-search').removeClass('show');

      $(window).scroll();

    });

    $(window).on('resize', function(){

      scrollHeight = $('body').height() - $(window).height();

    }).resize();

    $(window).on('scroll', function(){

      console.log( $('.section2').offset().top );

      if( !$('.total-search').hasClass('show') ){

        var scrollAmount = ( $(this).scrollTop() / scrollHeight ) * 100;

        if( $(this).scrollTop() >= 50 ){

          $('.header, .gnb').addClass('fixed');


        } else if( $(this).scrollTop() < 50 ){

          $('.header, .gnb').removeClass('fixed');
          $('.scroll-amount').css({width : 0});

        }

        if( $(this).scrollTop() >= 400 ){

          $('.scroll-amount').css({width : scrollAmount + '%'});

          if( $('html').hasClass('main') ){

            $('.header, .gnb').addClass('bg down');

          } else {

            $('.header, .gnb').addClass('down');

          }

          $('.total-search').addClass('down');

        } else if( $(this).scrollTop() < 400 ){

          if( $('html').hasClass('main') ){

            $('.header, .gnb').removeClass('bg down');

          } else {

            $('.header, .gnb').removeClass('down');

          }

          $('.total-search').removeClass('down');

        }

        if( $(this).scrollTop() >= $('.section2').offset().top ){

          $('.section2').removeClass('bg-fixed');

        } else if( $(this).scrollTop() < $('.section2').offset().top ){

          $('.section2').addClass('bg-fixed');

        }

        if( $(this).scrollTop() >= $('.section3').offset().top ){

          $('.section3').removeClass('bg-fixed');

        } else if( $(this).scrollTop() < $('.section3').offset().top ){

          $('.section3').addClass('bg-fixed');

        }

      }

    }).scroll();

  })();

  // 공통 이벤트
  (function(){

    // Layer Popup 닫기
    $('.layer-close').on('click', function(){

      LayerPopup.closePopup( $(this).parent('.layer') );

    });

  })();

  // 상단 팝업 이빈트
  (function(){

    $('.top-popup-control-arrow .arrow.prev').on('click', function(){

      console.log(24);

      if( !TopPopup.checkAnimate() ){

        TopPopup.rollRight();

      }

    });

    $('.top-popup-control-arrow .arrow.next').on('click', function(){

      console.log(24);

      if( !TopPopup.checkAnimate() ){

        TopPopup.rollLeft();

      }

    });

    $('.top-popup-control-paging .play-button.play').on('click', function(){

      TopPopup.rollAuto();

    });

    $('.top-popup-control-paging .play-button.pause').on('click', function(){

      TopPopup.rollStop();

    });

  })();

  // 메인 페이지 이벤트
  (function(){

    $('.main-visual-control-arrow .arrow.prev').on('click', function(){

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollRight();

      }

    });

    $('.main-visual-control-arrow .arrow.next').on('click', function(){

      if( !MainVisual.checkAnimate() ){

        MainVisual.rollLeft();

      }

    });

    $('.main-visual-control-paging .play-button').on('click', function(){

      if( $(this).hasClass('pause') ){

        MainVisual.rollStop();

      } else {

        MainVisual.rollAuto();

      }

    });

  })();

  // 하단 배너 이벤트
  (function(){

    $('.main-banner-control-arrow .arrow.prev').on('click', function(){

      if( !BottomBanner.checkAnimate() ){

        BottomBanner.rollRight();

      }

    });

    $('.main-banner-control-arrow .arrow.next').on('click', function(){

      if( !BottomBanner.checkAnimate() ){

        BottomBanner.rollLeft();

      }

    });

    $('.main-banner-control-paging .play-button.play').on('click', function(){

      BottomBanner.rollAuto();

    });

    $('.main-banner-control-paging .play-button.pause').on('click', function(){

      BottomBanner.rollStop();

    });

  })();

  // 출발 시간표 페이지 이벤트
  (function(){

    // 출발 시간표 상세보기 열기
    $('.flight-info-basic-link').on('click', function(e){

      e.preventDefault();

      var $thisFlightInfoDetail = $(this).parent().next();

      if( $thisFlightInfoDetail.data().open == false ){

        TableLike.openInfoDetail( $thisFlightInfoDetail );

      }

    });

    // 출발 시간표 상세보기 닫기
    $('.flight-info-detail-close').on('click', function(e){

      e.preventDefault();

      var $thisFlightInfoDetail = $(this).parents('.flight-info-detail');

      TableLike.closeInfoDetail( $thisFlightInfoDetail );

    });

    // 공유하기 보기
    $('.flight-info-detail-share').on('click', function(e){

      e.preventDefault();

      TableLike.openInfoDetailShare( $(this).next('.td-pop') );

    });

    // 공유하기 닫기
    $('.td-pop-close-btn').on('click', function(e){

      e.preventDefault();

      TableLike.closeInfoDetailShare( $(this).parent('.td-pop') );

    });

    // 운항속보 SMS Layer Popup
    $('.btn-newsflash').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();

      LayerPopup.openPopup( $('.flight-sms-01') );

    });

    // 운항속보 SMS 다음 단계 Ppoup
    $('.js-next').on('click', function(e){

      e.preventDefault();

      LayerPopup.nextPopup( $(this).parents('.layer'), $(this).parents('.layer').next('.layer') );

    });

  })();

  // 쇼핑/이벤트 페이지
  (function(){

    $('.boxmodel2-list-item .btn-type-small').on('click', function(){

      BoxModel.openBoxModel2Detail( $(this) );

    });

  })();

});


