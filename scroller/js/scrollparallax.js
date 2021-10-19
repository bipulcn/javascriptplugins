// var Scrollbar = window.Scrollbar;
// var scroll = Scrollbar.init(document.querySelector('#my-scrollbar'));
// scroll.addListener((s) => {
//   if(s.offset.y%100<10)
//     console.log(s.offset.y) // returns “scrollTop” equivalent
// })

"use strict"
;(function ( $ ) {
  $.fn.parallaxit = function( options ) {
    var variables = $.extend({ color: "#556b2f", items:'cshuf-item' }, options );
    const $window = $(window);
    let hsh = [];
    let ary = [];
    return this.each(function(){
      let vs = variables;
      let obj = $(this);
      let ibox = $('#infos');
      let off = 0, wt;
      let run = true, irun = false;
      var ints, ci=0;
      $('[class*="layer"]').each(function(){ let cl = $(this).attr('class'); $(this).css({'z-index': getNumb(cl)}); });
      // window.onwheel = function(){ return false; }
      $(window).bind('wheel', events => {
        passive: false;
        let cval = events.originalEvent;
        let dy = cval.deltaY;
        // wt = $(window).scrollTop();
        wt = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
        console.log(wt, dy);
        off += dy;
        // scroll();
        // $('html, body').scrollTop(wt);
        // window.scroll(0, Math.ceil((1 * (off - wt)) + wt), 'smooth');
        $('html, body').scrollTop(wt+off);
        // $('html, body').animate({ scrollTop: wt }, 500, 'easeOutExpo');
        // $('html, body').animate({ scrollTop: wt+off },500, 'easeOutExpo');
      });
      function intfun() {
        if(!run) { clearInterval(ints); irun = false; off = 0; console.log(off, irun); }
        run = false;
      }
      $(window).scroll(function() { run = true;
        if(!irun) { ints = setInterval(intfun, 100); ci++; irun = true; }
        positionScr();
      });
      $(window).bind('mousemove', events => {
        let cval = events.originalEvent;
        let ox = cval.offsetX, oy = cval.offsetY, px = cval.pageX, py = cval.pageY, sx = cval.screenX, sy = cval.screenY
        , ts = cval.timeStamp, el = cval.toElement
        , wdx = cval.wheelDeltaX, wdy = cval.wheelDeltaY, cx = cval.clientX, cy = cval.clientY, wt = $(window).scrollTop();
        setinfos(ibox, px, py, {'ox':ox, 'px':px, 'sx':sx, 'cx':cx, 'wt':wt, 'ts':ts});
      });
    });
  };
  function getNumb(str){
    let spl = str.split(" "), re;
    spl.forEach((v, k)=>{
      if(v.match('layer')) {
        re = v.split("_");
      }
    });
    return re[1];
  }
  function positionScr() {
    let sct = $(window).scrollTop(), scl = $(window).scrollLeft(), h = $(window).height(), w = $(window).width();
    let wh = sct + h*0.5, ww = scl + w*0.5;
    $('[class*="layer"]').each(function(){
      let el = $(this);
      let cl = el.attr('class');
      let num =  getNumb(cl);
      let ew = el.width(), eh = el.height(), ofs = el.offset();
      let x = ofs.left + ew*0.5, y = ofs.top + eh*0.5;
      let py = y - wh, px = x - ww;
      if(py> -0.5*h - eh*0.5 && py < h*0.5 + eh*0.5) {
        el.css({'transform': 'translate('+px*num*0.025+'px, '+py*num*0.05+'px) scale('+(1+num*0.01)+')'});
      }
    });
  }

  function setinfos(obj, x, y, ary) {
    let ww = $(window).width(), wh = $(window).height(), wt = $(window).scrollTop();
    obj.html("<table>");
    for (let [k, v] of Object.entries(ary)) {
      obj.append('<tr><th>'+k+':</th><td> '+Math.round(v, 2)+'</td></tr>');
    };
    obj.append('</table>');
    let ow = obj.innerWidth();
    let oh = obj.innerHeight();
    if(x+ow+12>ww) x = x-ow-20;
    if(y+oh+12>wt+wh) y = y-oh-20;
    obj.stop( true, true ).animate({'left': (x+10)+'px', 'top': (y+10)+'px'}, 500);
  }

}( jQuery ));


$(document).ready(function(){
  $('body').parallaxit();
  window.addEventListener("wheel", event => {
      // const delta = Math.sign(event.deltaY);
      // console.info(event);
  });
});
