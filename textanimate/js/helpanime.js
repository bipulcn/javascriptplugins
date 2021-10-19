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
    let ir = 'normal', lp = 1;
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
    let ir = 'normal', lp = (lps=="true")? true : lps;
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

  var wowanimes = function() {
    emergence.init({ container: window,
      reset: true, handheld: true, throttle: 250, elemCushion: 0.01,
      offsetTop: 0, offsetRight: 0, offsetBottom: 0, offsetLeft: 0,
      callback: function(element, state) {
        if (state === 'visible') { if($(element).attr('data-ani')) { animateObject($(element), 'on');} }
        else if (state === 'reset') { animateObject($(element), 'off'); }
        else if (state === 'noreset') { if($(element).attr('data-ani')) animateObject($(element), 'res'); }
      }
    });
  }
  if (document.readyState != "loading") { wowanimes(); }
  else { document.addEventListener("DOMContentLoaded", function () { wowanimes(); }); }
})(jQuery);


$(document).ready(function() {
  $('.contanime').combine();
});
