(function ( $ ){
  $.fn.showLargeView = function( options ) {
    var defaults = { top : '30px', left : '45%', width : '40', zindex: '101', type: 'outside' };
    var option = $.extend( {}, defaults, options );
    this.each(function(){
      var op = option;
      var obj = $(this);
      let mobj;
      let imgw, imgh, nhig, rato, scal;
      let img = new Image();
      if(op.type=='inside') obj.css({'z-index': 3, position: 'relative'});

      obj.find('div').each(function(){
        if($(this).css('display')=='block') {
          let url = $(this).find('img').attr('src');
          obj.parent().append("<div class='maxView'><div class='maxImage' style='background:url("+url+") no-repeat'></div></div>");
          mobj = obj.parent().find('.maxView');
          let plft = parseInt(obj.parent().css('padding-left')) + parseInt(obj.find('div').first().css('padding-left')) + parseInt(obj.parent().css('margin-top'));
          let ptop = parseInt(obj.parent().css('padding-top')) + parseInt(obj.find('div').first().css('padding-top')) + parseInt(obj.find('img').css('margin-top'));
          if (op.type == 'inside')
            mobj.css({ 'overflow': 'hidden', 'position': 'absolute', 'width': op.width + 'vw', 'top': ptop + 'px', 'left': plft + 'px' }).animate({ height: '0px' }, "fast");
          else
            mobj.css({'overflow': 'hidden', 'position': 'fixed', 'width': op.width+'vw', 'top': op.top, 'left': op.left, 'z-index': op.zindex }).animate({height: '0px'}, "fast");
          img.src = url;
          img.onload = function() {
            imgw = this.width;
            imgh = this.height;
            rato = parseFloat(imgh)/parseFloat(imgw);
            scal = parseFloat(op.width)/parseFloat(imgw);
            nhig = op.width * rato;
            let mimg = mobj.find('.maxImage');
            if(op.type=='inside')
              mimg.css({'width': imgw+'px', 'height': imgh+'px', 'background-size': 'cover !important', 'position': 'absolute'});
            else
              mimg.css({'width': imgw+'px', 'height': imgh+'px', 'background-size': 'cover !important', 'position': 'absolute'});
            mobj.css('height', (op.width * rato)+'px');
          }
        }
      });

      obj.find('div img').on({mousemove: function(e) {
        let offset = $(this).offset();
        if(op.type=='inside') $(this).css({'opacity': 0});
        moveImagePos(e, op, $(this), offset);
      }, mouseenter: function(e) {
        obj.find('div').each(function(){
          if($(this).css('display')=='block') {
            let url = $(this).find('img').attr('src');
            let high = $(this).find('img').height();
            img.src = url;
            img.onload = function() {
              imgw = this.width;
              imgh = this.height;
              nhig = op.width * parseFloat(imgh)/parseFloat(imgw);
              scal = parseFloat(op.width) / parseFloat(imgw);
              let mimg = mobj.find('.maxImage');
              mimg.css({"background-image": "url("+url+")"});
              mobj.css({'visibility': 'visible', 'display': 'block', 'height':  high+'px', opacity: '0.5'}).animate({opacity: '1'}, "fast");
              $(this).css({'opacity': 1});
            }
            let offset = $(this).offset();
            moveImagePos(e, op, $(this), offset);
          }
        });
      },
      mouseleave: function(e) {
        $(this).css({'opacity': 1});
        mobj.animate({height: '0px'}, "fast");
      },
      click: function(e) {
        console.log( "clicked on a div" );
      }});
      function moveImagePos(e, op, ths, offset) {
        let x = e.pageX - offset.left;
        let y = e.pageY - offset.top;
        let iw = ths.width();
        let ih = ths.height();
        let w = mobj.width();
        let h = mobj.height();
        // let rt = w/iw;
        let sx = 1 - (iw - x) / iw;
        let sy = 1 - (ih - y) / ih;
        let wl = (w - imgw) * sx;
        let hl = (h - imgh) * sy;
        let mimg = mobj.find('.maxImage');
        if(op.type=='inside') mobj.css({'width': iw+'px', 'height': ih+'px'});
        mimg.css({'left': wl+'px', 'top': hl+'px'});
      }
    });
  }
}(jQuery));

$(document).ready(function(){
  console.log("working");  
  $('#proimg').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg1').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg2').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg3').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg4').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg5').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg6').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg7').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg8').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg9').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg10').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg11').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg12').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
  $('#proimg13').showLargeView({ 'left': '43%', 'top': '10px', width: '50', type: 'inside' });
})