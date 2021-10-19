// https://github.com/ampersanda/shimming-page-example/blob/master/index.html
"use strict"
;(function ( $ ) {
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
      let timer;
      if(py> -0.5*h - eh*0.5 && py < h*0.5 + eh*0.5) {
        el.css({'transform': 'translate('+px*num*0.025+'px, '+py*num*0.05+'px) scale('+(1+num*0.01)+')'});
      }
    });
  }

  function triggerResize(){
    if (document.createEvent){
      var resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    } else {
      window.dispatchEvent(new Event('resize'));
    }
  }

$.fn.parallaxit = function( options ) {
    $('[class*="layer"]').each(function(){ let cl = $(this).attr('class'); $(this).css({'z-index': getNumb(cl)}); });
    positionScr();
    let i = 0;
    let interval = setInterval(() => {
      triggerResize();
      if (i === 5){ clearInterval(interval) }
      i++;
    }, 1000);

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
          || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  };

  document.addEventListener("DOMContentLoaded", function() {
    let scrollTop = 0, tweened = 0, winHeight = 0;

    let wrap = document.getElementById('scroller');
    wrap.style.position = 'fixed';
    wrap.style.width = '100%';
    wrap.style.top = '0';
    wrap.style.left = '0';
    wrap.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';

    let _ = document.createElement('div');
    _.style.height = wrap.clientHeight + "px";
    document.body.appendChild(_);

    let update = function () {
      window.requestAnimationFrame(update);

      let app = document.getElementById('scroller');

      if (Math.abs(scrollTop - tweened) > 0) {
        let
          // top = Math.floor(tweened += .25 * (scrollTop - tweened)),
          top = tweened += .03 * (scrollTop - tweened),
          bot = top + winHeight,
          wt = wrap.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${(top * -1)},0,1)`;

        _.style.height = wrap.clientHeight + "px";
      }
      positionScr();
    };

    let listen = function (el, on, fn) {
      (el.addEventListener || (on = 'on' + on) && el.attachEvent)(on, fn, false);
    };
    let scroll = function () {
      scrollTop = Math.max(0, document.documentElement.scrollTop || window.pageYOffset || 0);
    };

    listen(window, 'scroll', scroll);
    update();

    // window.addEventListener('resize', () => {
      // update();
      // _.style.height = wrap.clientHeight + "px";
    // }, false);
  });

}( jQuery ));
