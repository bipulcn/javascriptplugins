(function ( $ ) {  // need to work on it.
  $.fn.fitme = function( options ) {
    var options = $.extend({ color: "#556b2f" }, options );
		return this.each(function(){
      let o = options;
      let obj = $(this);
      let txt = obj.text();
      let line = obj.attr('data-line');
      if(!line) line = 1;
      let timer = setTimeout(function(){ changeSize(); }, 100);
      $(window).on("resize", function() { changeSize(); });
      function changeSize() {
        let conw = obj.innerWidth();
        let szm = 1;
        if (line > 1) {
          let lhi = parseFloat(obj.css('line-height'));
          let inh = obj.innerHeight();
          szm = inh/lhi;
          let cln = txt.length/szm;
          let ntx = txt.substring(0, cln);
          obj.text(ntx);
        }
        obj.css({'width': 'fit-content', 'margin': 'auto', 'text-align': 'center'});
        let inw = obj.innerWidth();
        if(line>1) obj.text(txt).css('text-align', 'justify');
        let fsz = parseFloat(obj.css('font-size'));        
        if(conw>0) {
          let siz = (conw*fsz/inw)*(line/szm);
          siz += Math.sqrt(siz);
          obj.css({"fontSize": siz+'px', "line-height": siz+'px', 'width': '100%'});          
          function decSize() {            
            let nsz = parseFloat(obj.css('font-size')) - 1;
            obj.css('font-size', nsz + "px");
            console.log("called for: " + nsz);
            let lhi = parseFloat(obj.css('line-height'));
            let inh = obj.innerHeight();
            if (inh / (lhi * line) > 1.01) decSize(timer);
          }
          decSize();
        }
      }
    });
  };

  // obj.css('color', getRandomColor());
  // function getRandomColor() {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  $.fn.readMore = function(option) {
    var options = $.extend({ wlimit: 10, text: 'read more...' }, options );
    return this.each(function(){
      let o = options;
      let obj = $(this);
      let len  = ($(this).attr('data-wlimit')) ? parseInt($(this).attr('data-wlimit')) : o.wlimit;
      let txt = obj.html();
      let words = txt.split(' ');
      if(words.length>len+5) {
        let str = words.slice(0, len).join(" ");
        str += " <span class='text-show-hide more'>"+o.text+"</span> <span class='extend-text'>"+words.slice(len+1, words.length).join(" ")+"</span><span class='text-show-hide less'> ...show less</span>";
        obj.html(str);
        obj.find('.text-show-hide').on('click', function() {
          if(obj.find('.extend-text').css('display')!='none') {
            obj.find('.extend-text').hide(500); obj.find('.less').hide(); obj.find('.more').show();
          }
          else {
            obj.find('.extend-text').show(500); obj.find('.more').hide(); obj.find('.less').show();
          }
        });
        obj.find('.extend-text').hide();
        obj.find('.less').hide();
      }
    });
  };
}(jQuery));
$(document).ready(function(){
  $('.readMore').readMore();
  $('.fitme').fitme();
});
