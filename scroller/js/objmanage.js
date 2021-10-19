"use strict"
;(function ( $ ) {
  $.fn.objectMoves = function( options ) {
    var variables = $.extend({ color: "#556b2f", items:'cshuf-item' }, options );
    const $window = $(window);
    return this.each(function(){
      let vs = variables;
      let obj = $(this);
      let lx = parseInt(obj.css('left')), ly = parseInt(obj.css('top'));
      let ol = obj.width(), oh = obj.height();
      if(!lx) { lx = obj.offset().left; ly = obj.offset().top; }
      lx = lx + ol*0.5; ly = ly + ol*0.5;
      let ibox = $('#infos');
      $(window).bind('mousemove', ev => {
        let cval = ev.originalEvent;
        let px = cval.pageX, py = cval.pageY;
        let dx = lx - px, dy = ly - py;
        let sx = dx/Math.abs(dx), sy = dy/Math.abs(dy);
        let rx = Math.sqrt(Math.abs(dx)), ry = Math.sqrt(Math.abs(dy));
        let nx = 1.5*rx*sx, ny = 1.5*ry*sy;
        obj.css({'transform': 'translate('+nx+'px, '+ny+'px)'});
      });
    });
  };
}( jQuery ));


$(document).ready(function(){
  $('.box').objectMoves();
});
