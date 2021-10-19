(function ( $ ) {
  $.fn.bnmenu = function( options ) {
    var options = $.extend({ sticky: false, tagid:'#header', forArrow: "&#x25B9;", downArrow:"&#x25BF;", arrowAni: "rotateicon", shortwidth: 640, caption:'Menu', appeardrop: 'fadeInUp', appearexpand: 'slideInRight', appearcontent: 'fadeIn', disappear: 'fadeOut' }, options );
    return this.each(function(){
      let o = options;
      let obj = $(this);
      let wwidth = $(window).width();
      let short = false;
      $(window).bind("resize", function(){
        resizeContent();
      });
      let pof = 0, hi;
      $(window).scroll(function(){
        if(o.sticky == true){ if(pof==0) { pof = $(o.tagid).offset().top; hi = $(o.tagid).height(); }
          if ($(window).scrollTop() >= pof)
          { $(o.tagid).addClass('sticky'); $('.sticky+div').css({'padding-top': hi+"px"}); }
          else { $('.sticky+div').css({'padding-top': "0px"}); $(o.tagid).removeClass('sticky');
      }}});
      $(document).ready(function(){resizeContent();});
      function resizeContent() {
        wwidth = $(window).width();
        if (wwidth <= o.shortwidth) {
          short = true;
          if (!obj.find('.menushort').length)
            obj.prepend("<div class='menushort'><span class='caption'>" + o.caption + "</span><span class='short-icon'>&#x2630;</span></div>");
          obj.find('.nav').first().hide();
          obj.find('.menushort').bind('hover click', function(){
            if(obj.find('.nav').first().css("display")=='none') { obj.find('.nav').first().show(); }
            else { obj.find('.nav').first().hide(); }
          });
        }
        else { obj.find('.menushort').remove(); obj.find('.nav').show();  }
      }

      let ww = $(window).width();
      obj.find('.dropper').each(function(){
        $(this).find('.droppermenu').addClass('mitemhide');
        $(this).hover(function(){
          let cld = $(this).find('.droppermenu').first();
          $(this).find('a').first().addClass('active');
          cld.addClass('animated '+o.appearexpand).show(400);
          let xp = cld.offset().left;
          let wd = cld.width();
          if(xp+wd>ww && !short) cld.css({'left': (ww - wd - 20) +'px'});
          else if (short) cld.css({'left': '10%'});
        }, function() {
          $(this).find('.droppermenu').first().removeClass('animated '+o.appearexpand).hide();
          // $(this).find('a').first().removeClass('active');
        });
      });
      obj.find('.expnder').each(function(){
        $(this).find('.expndermenu').addClass('mitemhide');
        $(this).hover(function(){
          let cld = $(this).find('.expndermenu').first();
          $(this).find('a').first().addClass('active');
          cld.addClass('animated '+o.appearexpand).show(400);
          let xp = cld.offset().left;
          let wd = cld.width();
          if(xp+wd>ww && !short) cld.css({'left': (ww - wd - 20) +'px'});
          else if (short) cld.css({'left': '10%'});
        }, function() {
          $(this).find('.expndermenu').first().removeClass('animated '+o.appearexpand).hide();
          // $(this).find('a').first().removeClass('active');
        });
      });
    });
  };
} (jQuery));

$(document).ready(function(){
  $('.topmenu').bnmenu();
});
