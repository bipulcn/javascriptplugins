"user strict";
(function($) {
  $.fn.menuActive = function( options ) {
    var options = $.extend({ color: "#556b2f", 'shifts': '40', 'shiftt': '100' }, options );
    $window = $(window);
    let hsh = [];
    let check = true;
    let upchk = true;
		return this.each(function(){
      let o = options;
      let obj = $(this);
      let cur = "#item01";
      let int = setInterval(function () {
        if($('#body').css('display')!='none') {
          obj.find('.nav-link').each(function(){
            var url = $(this).attr('data-hash');
            var hash = url.substring(url.indexOf('#'));
            if(hash!="") {
              if($(hash).length){ hsh.push(hash); }
              $(hash).parent().siblings().hide();
            }
          });
          console.log(hsh);
          $(cur).parent().show();
          clearInterval(int);
        }
      }, 500);
      obj.find('.nav-link').click(function(){
        var url = $(this).attr('data-hash');
        var hash = url.substring(url.indexOf('#'));
        if(hash!="") {
          $(hash).parent().siblings().hide();
          $(hash).parent().show();
          cur = hash;
        }
      });
      function setEnable() {
        let ret = 0;
        hsh.forEach((v, k) => { 
          if(cur==v) { ret = k; }
        });
        return ret;
      }
      $window.scroll(function() { 
        let cp = setEnable();
        let ph = $(cur).siblings().innerHeight(), tp = $(cur).siblings().offset().top - o.shifts, ws = $(window).scrollTop(), 
          wh = $(window).height();
        let res = ph-wh+tp;
        console.log(ph, tp, wh, ws, res);
        if(!check) { if(tp>ws) check=true; }
        // if(!upchk) { if(tp>ws+o.shiftt) upchk=true; }
        console.log(tp-o.shiftt>ws, tp, o.shiftt);
        if(check){
          if(tp-o.shiftt>ws) {
            console.log('may change');
            cp--;
            if(cp>=0) {
              nhsh = hsh[cp];
              upchk = false;
              $(window).scrollTop(tp-o.shifts);
              console.log('From top change '+nhsh);          
              $(nhsh).parent().siblings().hide();
              $(nhsh).parent().show();
              cur = nhsh;
            }
          }
          if( (ph>=wh && ws >= ph-wh+tp) || (ph<wh && tp<ws)) {
            cp++;
            if(cp<hsh.length) {
              nhsh = hsh[cp];
              check = false;
              $(window).scrollTop(tp-o.shifts);
              console.log('End of the page '+nhsh);          
              $(nhsh).parent().siblings().hide();
              $(nhsh).parent().show();
              cur = nhsh;
            }
          }
        }
      });
    });
  };
})(jQuery);
$(document).ready(function(){
  $('.topmenu').menuActive();
});
