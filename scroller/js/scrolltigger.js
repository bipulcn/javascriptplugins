// var Scrollbar = window.Scrollbar;
// var scroll = Scrollbar.init(document.querySelector('#my-scrollbar'));
// scroll.addListener((s) => {
//   if(s.offset.y%100<10)
//     console.log(s.offset.y) // returns “scrollTop” equivalent
// })

"use strict"
;(function ( $ ) {
  $.fn.scrolleffect = function( options ) {
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
      $(window).bind('wheel', events => {
        let cval = events.originalEvent;
        let ox = cval.offsetX, oy = cval.offsetY, px = cval.pageX, py = cval.pageY, sx = cval.screenX, sy = cval.screenY
        , dx = cval.deltaX, dy = cval.deltaY, dz = cval.deltaZ, ts = cval.timeStamp, el = cval.toElement
        , wdx = cval.wheelDeltaX, wdy = cval.wheelDeltaY, cx = cval.clientX, cy = cval.clientY;
        wt = $(window).scrollTop();
        setinfos(ibox, px, py, {'oy':oy, 'py':py, 'sy':sy, 'cy':cy, 'wt':wt, 'ts':ts, 'dy':dy, 'wdy':wdy});
        off += dy;
        $('html, body').scrollTop(wt);
        $('html, body').scrollTop(wt+off);
      });
      function intfun() {
        if(!run) { clearInterval(ints); irun = false; off = 0; console.log(off, irun); }
        run = false;
      }
      $(window).scroll(function(){ 
        run = true;
        if(!irun) { ints = setInterval(intfun, 100); ci++; irun = true; }
      });
      $(window).bind('mousemove', events => {
        let cval = events.originalEvent;
        let ox = cval.offsetX, oy = cval.offsetY, px = cval.pageX, py = cval.pageY, sx = cval.screenX, sy = cval.screenY
        , ts = cval.timeStamp, el = cval.toElement
        , wdx = cval.wheelDeltaX, wdy = cval.wheelDeltaY, cx = cval.clientX, cy = cval.clientY, wt = $(window).scrollTop();
        setinfos(ibox, px, py, {'oy':oy, 'py':py, 'sy':sy, 'cy':cy, 'wt':wt, 'ts':ts});
      });
    });
  };
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
  $('body').scrolleffect();
  window.addEventListener("wheel", event => {
      // const delta = Math.sign(event.deltaY);
      // console.info(event);
  });
//   let hashpos = [];
//   let int = setInterval(function() {
//     if ($('#body').css('display') == 'block') {
//       $('.anchor').each(function(){
//         console.log($(this).attr('id'));
//         hashpos[$(this).attr('id')] = $(this).offset().top;
//       });
//       console.log(hashpos);
//       // $('#my-scrollbar .scroll-content').css({transform: 'translate3d(0px, -803px, 0px)'},200);
//       clearInterval(int);
//       // Scrollbar.scrollTop = 2048+'px'; // setPosition(offset.x, 2048);
//       // scroll.setPosition(scroll.offset.x, 1000);
//     }
//   }, 300);
//   $('.topmenu .nav-link').click(function(){
    // let lnk = $(this).attr('href');
    // scroll.scrollTop = $(lnk).offset().top;
    // console.log(lnk, $(lnk).offset().top);
    // scroll.setPosition(scroll.offset.x, $(lnk).offset().top);

    // $('#my-scrollbar .scroll-content').css({transform: 'translate3d(0px, -'+hashpos[ids]+'px, 0px)'},200);
    // $('#my-scrollbar .scroll-content').offset.y = hashpos[ids];
    // var thishref =$(this).attr("href");
    // var url = thishref.substr(thishref.indexOf("#"));
    // if(url.length>1){
    //     console.log($(url).offset().top);
    //     // event.preventDefault();
    //     $('#my-scrollbar .scroll-content').animate({
    //               scrollTop: $(url).offset().top+'px'
    //     }, 2000);
    // }
//   });
});
