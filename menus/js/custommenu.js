(function ( $ ) {
  $.fn.customemenu = function( options ) {
    let ids = $(this).attr('id');
    var options = $.extend({ shortwidth: 640, caption: 'Main', hmenu: 'mnuhide', smenu: 'mnushow', pdrop: 'dropdown', cdrop: 'drop-menu', pexpd: 'expand', cexpd: 'expand-menu' }, options );
    return this.each(function(){
      let o = options;
      let obj = $(this);
      let wwidth = $(window).width();
      let short = false;
      $(window).bind("resize", function(){
        resizeContent();
      });
      $(document).ready(function(){resizeContent();});
      function resizeContent() {
        wwidth = $(window).width();
      }
      let lis = $(this).find('li');
      lis.each(function(){
        setMenu($(this), o.pexpd, o.cexpd);
        setMenu($(this), o.pdrop, o.cdrop);
      });
      function setMenu(part, parnt, child) { 
        if(part.hasClass(parnt)) {
          let subprt = part.find('.'+child).first();
          if (subprt.length) {
            if (subprt.hasClass(o.smenu)) subprt.removeClass(o.smenu)
            if (!subprt.hasClass(o.hmenu)) subprt.addClass(o.hmenu);
          }
          part.on('mouseover', function () {
            if (subprt.hasClass(o.hmenu)) subprt.removeClass(o.hmenu)
            if (!subprt.hasClass(o.smenu)) subprt.addClass(o.smenu);
          });
          part.on('mouseout', function() {
            if (subprt.hasClass(o.smenu)) subprt.removeClass(o.smenu)
            if (!subprt.hasClass(o.hmenu)) subprt.addClass(o.hmenu);
          });
        }
      }
    });
  };
})(jQuery);

$(document).ready(function(){
  $('.topmenu').customemenu({ appeardrop: 'flipInX', appearexpand: 'flipInY', shortwidth: 768 });
  const add = (a, b) => a+b;
  const mobj = (word, description) => ({w:word, d:description});

  let c = add(2, 4);
  console.log(c);
  let one = mobj('good', 'explains something positive');
  console.log(one.w);  
})