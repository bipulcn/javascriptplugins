"use strict";
;(function($) {
  $.fn.simples = function( options ) {
    var options = $.extend({ color: "#556b2f" }, options );
		return this.each(function(){
      let o = options;
      let obj = $(this);
      let str = obj.attr('data-txt').split(",").map(function(item) { return item.trim();});;
      let typ = obj.attr('data-type');
      // str.forEach((v, k)=> { obj.find("div").append("<span class='el'>"+v+"</span>"); });
      let cr = -1;
      if(typ=='appear'){
        let int = setInterval(function () {
          obj.delay( 2000 ).animate({width: 0, 'overflow': 'hidden'}, 500, function(){obj.html(str[cr]);}).animate({width: '100%'}, 500);
          cr++;
          if(cr>=str.length) cr = 0;
        }, 2000);
      }
      if(typ=='typing'){
        function runText() { cr++; if(cr>=str.length) cr = 0; writeTxt(obj, str[cr], runText); }
        runText();
      }
      // let tst = $('.testtp');
      // let st = tst.attr('data-txt');
      // writeTxt(tst, st);
    });
  };

  function writeTxt(tst, st, callback=null) {
    let ast = st.split("");
    let tc = 0;
    let offset = 5;
    let ints = setInterval(function(){
      if(tc<ast.length) tst.append(ast[tc]);
      if(tc==0) tst.html(ast[tc]);
      tc++;
      if(tc>=ast.length+offset) {
        clearInterval(ints); 
        let sint = setInterval(function(){
          let txt = tst.html();
          if(txt.length>0)
          tst.text(function (_,txt) { return txt.slice(0, -1); });
          else { clearInterval(sint); if(callback!=null) callback(); }
        }, 100);
      }
    }, 200);
  }
})(jQuery);

$(document).ready(function(){
  $('.typeit').simples();
});