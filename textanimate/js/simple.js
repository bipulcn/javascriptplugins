"use strict";
;(function($) {
  $.fn.simples = function( options ) {
    var options = $.extend({ color: "#556b2f" }, options );
    let hsh = [];
    let pos = [];
		return this.each(function(){
      let o = options;
      let obj = $(this);
      let str = obj.attr('data-txt').split(",").map(function(item) { return item.trim();});;
      str.forEach((v, k)=> { 
        obj.find("div").append("<span class='el'>"+v+"</span>"); 
      });
      let ihi;
      obj.find('.el').each(function(){ihi = $(this).innerHeight(); console.log($(this).innerWidth(), $(this).innerHeight(), $(this).parent().offset().top);});
      anime({
        targets: obj.find('.el').get(),
        translateY: [
          { value: function(v, i){ return -2*i*ihi;}, delay: function(v, i) { return i*10; }, duration: 10 }
          , { value: function(v, i){ return -1*(3-i)*ihi;}, delay: function(v, i) { return i*1300; }, duration: 300 }
          , { value: function(v, i){ return -1*i*ihi;}, delay: function(v, i) { return i*300; }, duration: 1000 }
          , { value: function(v, i){ return i*ihi;}, delay: function(v, i) { return i*500; }, duration: 100 }
        ],
        // duration: 1000,
        loop: true,
        easing: 'easeInOutSine'
      }); 
    });
  };
})(jQuery);
$(document).ready(function(){
  $('.simple').simples();
});

/* 
[function(v, i){ return (i+1)*(-30);}, function(v, i){ return 60 - (i+1)*30;}]
  [
          { value: function(v, i){ return (i+1)*(-30);}, delay: function(v, i) { return i*500; } },
          { value: function(v, i){ return 60 - (i+1)*30;}, delay: function(v, i) { return i*500; } }
        ]
*/