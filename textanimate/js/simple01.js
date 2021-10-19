"use strict";
;(function($) {
  $.fn.simples = function( options ) {
    var options = $.extend({ color: "#556b2f", speed: 1000 }, options );
		return this.each(function(){
      let o = options;
      let obj = $(this);
      let str = obj.attr('data-txt').split(",").map(function(item) { return item.trim();});;
      str.forEach((v, k)=> { obj.append("<span class='el'>"+v+"</span>"); });
      let wid = [];
      let ihi;
      obj.find('.el').each(function(){ ihi = $(this).innerHeight(); wid.push($(this).innerWidth()); });
      wid.push(0);
      let rwid = wid.map((v, i)=> {return v+5;});
      obj.css({"height": (ihi+5)+'px', 'padding-bottom': '10px'});
      anime({
        targets: obj.find('.el').get(), loopComplete: function(anim) { console.log('hope'); runAnime(); }, loop: true,
        translateY: [
          {value:function(v, i){ return (i+1)*(-ihi-5);}, duration: 10, delay: function(v, i) { return i*1;} }, 
          {value:function(v, i){ return (i)*(-ihi);}, duration: o.speed, delay: function(v, i) { return i*o.speed;} }, 
          {value:function(v, i){ return (wid.length-i)*(ihi*0.5);}, duration: o.speed }
        ]
      });
      function runAnime(){ anime({ targets: obj.get(), width: rwid, duration: wid.length*o.speed, loop: false }); }
      runAnime();
    });
  };
})(jQuery);

$(document).ready(function(){
  $('.simple').simples();
});