"use strict";
;(function($) {
  let esn = {'li': 'linear', 'qd': 'easeOutQuad', 'cu': 'easeOutCubic', 'qr': 'easeOutQuart', 'qt': 'easeOutQuint', 'sn': 'easeOutSine', 'ex': 'easeOutExpo', 'cr': 'easeOutCirc', 'bc': 'easeOutBack', 'bn': 'easeOutBounce', 'el': 'easeOutElastic',
    'iqd': 'easeInQuad', 'icu': 'easeInCubic', 'iqr': 'easeInQuart', 'iqt': 'easeInQuint', 'isn': 'easeInSine', 'iex': 'easeInExpo', 'icr': 'easeInCirc', 'ibc': 'easeInBack', 'ibn': 'easeInBounce', 'iel': 'easeInElastic',
    'bqd': 'easeInOutQuad', 'bcu': 'easeInOutCubic', 'bqr': 'easeInOutQuart', 'bqt': 'easeInOutQuint', 'bsn': 'easeInOutSine', 'bex': 'easeInOutExpo', 'bcr': 'easeInOutCirc', 'bbc': 'easeInOutBack', 'bbn': 'easeInOutBounce', 'bel': 'easeInOutElastic'};
  let pro = {'tx': 'translateX', 'ty': 'translateY', 'tz': 'translateZ', 'r': 'rotate', 'rx': 'rotateX', 'ry': 'rotateY', 'rz': 'rotateZ', 's': 'scale', 'sx': 'scaleX', 'sy': 'scaleY', 'sz': 'scaleZ', 'w': 'skew' , 'wx': 'skewX', 'wy': 'skewY', 'p': 'perspective', 'bg': 'background', 'cl': 'color', 'wd': 'width', 'hi': 'height', 'o': 'opacity'};
  $.fn.combine = function( options ) {
    var options = $.extend({ color: "#556b2f" }, options );
    let hsh = [];
    let pos = [];

    return this.each(function(){
      let o = options;
      let obj = $(this);
      let cls = obj.attr('data-ani');  //pro|val|dur|esn|del|odr+
      let act = obj.attr('data-act');
      let lop = obj.attr('data-loop');
      if(cls)
        obj.attr('data-emergence', 'hidden');
      if(!lop) lop = 1;
      runit(obj);
    });
  };
  $.fn.keyframe = function( options ) {
    var options = $.extend({ color: "#556b2f" }, options );
    let hsh = [];
    let pos = [];

    return this.each(function(){
      let o = options;
      let obj = $(this);
      let cls = obj.attr('data-ani');
      let lop = obj.attr('data-loop');
      if(!lop) lop = 1;
      srunit(obj.get(0), cls, lop);
    });
  };
  function runit(obj) {
    let vl = obj.attr('data-ani');
    let gp = vl.split('+');
    let lps = obj.attr('data-loop');
    let ir = 'alternate', lp = (lps=="true")? true : lps;
    let run = "anime({ targets: obj.get(0), direction: ir, loop: lp, complete: function(anim) {hidecon(obj);}";
    gp.forEach((v)=>{
      let pt = v.split("|");
      let vvl;
      if(pt[1]=='i') {
        vvl = "["+pt[2]+", 0]";
        if(pt[0]=='bg' || pt[0]=='cl') vvl = "'"+pt[2]+"'";
        if(pt[0]=='o') vvl = "["+pt[2]+", 1]";
        if(pt[0]=='s' || pt[0]=='sx' || pt[0]=='sy' || pt[0]=='sz') vvl = "["+pt[2]+", 1]";
      }
      if(pt[1]=='o') {
        vvl = "[0, "+pt[2]+"]";
        if(pt[0]=='bg' || pt[0]=='cl') vvl = "'"+pt[2]+"'";
        if(pt[0]=='o') vvl = "[1, "+pt[2]+"]";
        if(pt[0]=='s' || pt[0]=='sx' || pt[0]=='sy' || pt[0]=='sz') vvl = "[1, "+pt[2]+"]";
      }
      run += ", "+pro[pt[0]]+": {value: "+vvl+", duration: "+(pt[3]*1000)+", easing: '"+esn[pt[4]]+"', delay: "+(pt[5]*1000)+"}";
    });
    run += " })";
    eval(run);
  }
  var hidecon = function(obj) {
    if(obj.attr('data-act')=='on') hideit(obj);
  }
  var hideit = function(obj) {
    anime({targets: obj.get(0), opacity: 0, duration: 1});
    obj.attr('data-act', 'on');
  }
  function srunit(obj, vl, lps) {
    let ir = 'alternate', lp = (lps=="true")? true : lps;
    let run = "anime({ targets: obj, direction: ir, loop: lp";
    let prt = vl.split(";");
    prt.forEach((pv)=>{
      let spt = pv.split(":");
      let sbp = spt[1].split("+");
      let srn = "[";
      sbp.forEach((v)=>{
        let pt = v.split("|");
        let vvl = pt[0];
        if(spt[0]=='bg' || spt[0]=='cl') vvl = "'"+pt[0]+"'";
        srn += "{value: "+vvl+", duration: "+(pt[1]*1000)+", easing: '"+esn[pt[2]]+"', delay: "+(pt[3]*1000)+"},";
      });
      srn = srn.slice(0, -1);
      srn += "]";
      run += ", "+pro[spt[0]]+": "+srn;
    });
    run += " })";
    eval(run);
  }
  var animateObject = function(obj, knd){
    if(knd=='on') {
      if(obj.attr('data-act')=='on'){
        obj.css('opacity', 0);
        obj.attr('data-act', 'done');
        runit(obj);
      }
    }
    if(knd=='off') {
      if(obj.attr('data-act')=='done'){
        if(obj.attr('data-reset')=='true'){
          hideit(obj);
        }
      }
    }
    if(knd=='res') console.log('its reseted');
    // if(obj.attr('data-ani')) obj.combine();
  }
})(jQuery);
$(document).ready(function(){
  $('.animate').combine();
  $('.keyframe').keyframe();
});

/* 
// 

function(el) {
    return el.getAttribute('data-x');
  },
rotate: function() { return anime.random(-360, 360); },
borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
delay: anime.stagger(100) // increase delay by 100ms for each elements.
delay: anime.stagger(100, {start: 500}) // delay starts at 500ms then increase by 100ms for each elements.
delay: anime.stagger(100, {from: 'center'})
delay: anime.stagger(100, {direction: 'reverse'})
translateX: function() {
      return anime.random(0, 270);
    },
function(el, i, l) { // target, index, targetsLength
    return i * 100;
  }


'tx': 'translateX', 'ty': 'translateY', 'tz': 'translateZ', 'r': 'rotate', 'rx': 'rotateX', 'ty': 'rotateY', 'rz': 'rotateZ', 's': 'scale', 'sx': 'scaleX', 'sy': 'scaleY', 'sz': 'scaleZ', 'w': 'skew' , 'wx': 'skewX', 'wy': 'skewY', 'p': 'perspective'

// direction: lft, rgt, up(down), dw(from up), none
// 'Quad' qd, 'Cubic' cu, 'Quart' qr, 'Quint' qt, 'Sine' sn, 'Expo' ex, 'Circ' cr, 'Back' bc, 'Bounce' bn,

  [function(v, i){ return (i+1)*(-30);}, function(v, i){ return 60 - (i+1)*30;}]
  [
    { value: function(v, i){ return (i+1)*(-30);}, delay: function(v, i) { return i*500; } },
    { value: function(v, i){ return 60 - (i+1)*30;}, delay: function(v, i) { return i*500; } }
  ]
*/