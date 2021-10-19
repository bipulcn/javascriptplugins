(function($) {
  $.fn.bgImages = function(duration) {
    return this.each(function(){
      let obj = $(this), inview, loaded;
      let $window = $(window);
      obj.one('imgBoxScroll', function() {
        if($(this).attr('data-src')){
          let file  = $(this).attr('data-src');               $(this).removeAttr('data-src');
          let hsize = $(this).attr('data-hsize');             $(this).removeAttr('data-hsize');
          let pad   = $(this).attr('data-pad');               $(this).removeAttr('data-pad');
          let txpos = $(this).attr('data-txpos');             $(this).removeAttr('data-txpos');
          let flt   = $(this).attr('data-filter');            $(this).removeAttr('data-filter');
          let aln   = $(this).attr('data-align');             $(this).removeAttr('data-align');
          let pos   = $(this).attr('data-pos');               $(this).removeAttr('data-pos');
          let wid   = parseInt($(this).attr('data-width'));   $(this).removeAttr('data-width');

          $(this).css({'background': "url("+file+")", 'background-position': 'center', 'background-size': 'cover' });
          if(hsize) $(this).css('min-height', hsize );
          if(pad)   $(this).css('padding', pad );
          if(txpos) $(this).css('text-align', txpos );
          if(flt){
            $(this).css({ 'background-attachment': 'fixed',  'overflow': 'hidden'});
            let blur = $(this).find('div').first();
            blur.css({'width':'400px', 'overflow':'hidden', 'position': 'relative', 'z-index':'1', 'left': 'calc(50vw - 200px)', 'padding': '20px', 'border': '10px solid rgba(0, 0, 0, 0.2)'});
            if(wid) blur.css({'width':wid+'px'});
            if(aln=='center') blur.css({'left': 'calc(50vw - '+(wid/2+10)+'px)'});
            if(aln=='left')   blur.css({'left': '20px'});
            if(aln=='right')  blur.css({'left': 'calc(100vw - '+(wid+30)+'px)'});
            let pd = -1*parseInt(blur.css('padding-left'));
            pd += 'px';
            blur.prepend("<div class='blur-back' style='background-image: url("+file+")'></div>");
            $('.blur-back').css({'background-attachment': 'fixed', 'background-position': 'center',  'background-size': 'cover', 'position': 'absolute', 'width': '1400px', 'height': '1210px', 'z-index':'-1', 'filter': 'blur(10px)', 'left': pd, 'top': pd });
            $(document).scroll(function() {
              let hg = parseInt(blur.outerHeight());
              if(pos=='top')    blur.css({'top': '10px'});
              if(pos=='middle') blur.css({'top': 'calc(calc('+hsize+' - '+(hg+10)+'px)/2)'});
              if(pos=='bottom') blur.css({'top': 'calc('+hsize+' - '+(hg+10)+'px)'});
            });
            $('.blur-back').css({'filter':flt});
          }
        }
      });
      $window.scroll(function() { loadImageLate(); }); // changing images
      $window.ready(function() {
        setTimeout(function(){ loadImageLate(); }, 2000);
      });
      function loadImageLate() {
        inview = obj.filter(function() { let a = $window.scrollTop(), b = $window.height(), c = $(this).offset().top, d = $(this).height(); return c + d >= a && c <= a + b; });
        loaded = inview.trigger('imgBoxScroll');
        obj = obj.not(loaded);
      }
    });
  };
})(jQuery);
$('.div-img-box').bgImages(500);



(function($) {
  $.fn.loadScroll = function(duration, imgfile) {
    let $window = $(window), images = this, inview, loaded;
    images.one('loadScroll', function() {
      if (this.getAttribute('data-src'))
      {
        this.setAttribute('src', this.getAttribute('data-src'));
        this.removeAttribute('data-src');
        if (duration) {
          $(this).hide().fadeIn(duration).add('img').removeAttr('style');
        } else return false;
      }
    });

    $window.scroll(function() { performAction(); });
    $window.ready(function() {
      setTimeout(function(){
        performAction();
      }, 1200);
      images.each(function(){
        src = $(this).attr('src');
        $(this).attr('data-src', src);
        $(this).attr('src',imgfile);
      });
    });
    function performAction() {
        inview = images.filter(function() {
          let a = $window.scrollTop(), b = $window.height(), c = $(this).offset().top, d = $(this).height();
          return c + d >= a && c <= a + b;
        });

        loaded = inview.trigger('loadScroll');
        images = images.not(loaded);
    }
  };
})(jQuery);
$(document).ready(function(){
  $('img').loadScroll(500, '../imgs/frog.jpg');
});


(function($) {
  $.fn.tobgImage = function(duration, cls) {
    let $window = $(window), images = this;
    images.each(function(){
      src = $(this).attr('src');
      $(this).addClass('lucid');
      $(this).wrap("<div style='background: url("+src+")' class='"+cls+"'></div>");
    });
  };
})(jQuery);

$('.bgimg').tobgImage(500, 'bganimate');
$('.bgout').tobgImage(500, 'bganimout');
