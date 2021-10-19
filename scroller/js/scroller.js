"user strict";
(function($) {
  $.fn.menuActive = function( options ) {
    var options = $.extend({ color: "#556b2f" }, options );
    $window = $(window);
    let hsh = [];
    let pos = [];
		return this.each(function(){
      let o = options;
      let obj = $(this);
      let cur = "";
      let int = setInterval(function () {
        if($('#body').css('display')!='none') {
          obj.find('a').each(function(){
            var url = $(this).attr('href');
            var hash = url.substring(url.indexOf('#'));
            if(hash!="") {
              if($(hash).length){ hsh.push(hash); pos.push($(hash).offset().top); }
            }
          });
          setEnable(performAction(hsh, pos));
          clearInterval(int);
        }
      }, 500);
      function setEnable(tar) {
        obj.find('a').each(function(){
          var url = $(this).attr('href');
          var hash = url.substring(url.indexOf('#'));
          if(hash==tar) {
            $(this).addClass('active');
          }
          else $(this).removeClass('active');
        });
      }
      $window.scroll(function() { setEnable(performAction(hsh, pos)); });
      function performAction(dsh, dps) {
        let cls = '';
        let ck = 9000;
        let wst = $(window).scrollTop();
        dps.forEach((val, i) => {
          if(Math.abs(val-wst)<ck) { cls = dsh[i]; ck = Math.abs(val-wst); }
        });
        return cls;
      }
    });
  };
})(jQuery);
$(document).ready(function(){
  $('.topmenu').menuActive();
});
