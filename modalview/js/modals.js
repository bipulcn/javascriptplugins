(function ( $ ) { $.fn.modalloader = function( options ) {
    var options = $.extend({ color: "#556b2f", 'enablenext': true }, options );
    let ech = $(this).toArray();
    let objs = [];
    let y = 0;
		return this.each(function(){
      let o = options;
      let obj = $(this);
      objs.push($(this));
      getObject(obj, o);
      let tar = obj.attr('data-target-modal');
      let tobj = $("[data-modalname='"+tar+"']");
      tobj.addClass("modaldisplay");
      let close = tobj.find('.modalcloser');
      let holder = tobj.find('.holdercloser');
      close.on('click', function(){ hideall(holder, y); });
      holder.on('click', function(){ hideall(holder, y); });
      $('.disableClick').click(function(e) { e.stopPropagation();}); tobj.appendTo('body');
      let nxt = tobj.find('.modalnext');
      let pev = tobj.find('.modalprev');
      nxt.on('click', function(){ y = moveModal(obj, objs, y, 1); });
      pev.on('click', function(){ y = moveModal(obj, objs, y, -1); });
      obj.on('click',function(){
        y = showThisObj(holder);
      });
    });
    function showThisObj(holder) {
      body = $('body');
      htmlbody = $('html, body');
      holder.css('display', 'block');
      let h = holder.innerHeight();
      let top = parseInt(($(window).height() - h)/2.0-50);      
      if(top<0) top = 0;
      body.children().not('.modaldisplay').css({filter:'blur(5px)'});
      y = (htmlbody.scrollTop()>0)? htmlbody.scrollTop() : y;
      htmlbody.css({ overflow: 'hidden', height: '100%'});
      htmlbody.animate({scrollTop: y+'px'}, 0);
      holder.find('.disableClick').css({top: top+'px'});
      holder.css({opacity: 0}).animate({'opacity': 1}, 400);
      return y;
    }
    function hideall(hold, y) {
      body = $(body);
      htmlbody = $('html, body');
      body.children().not('.modaldisplay').css({'filter':'blur(0px)'});
      htmlbody.css({ overflow: 'auto', height: 'auto' });
      htmlbody.animate({scrollTop: y+'px'}, 0);
      hold.css('display', 'none');
    }
    function moveModal(obj, ary, y, dir) {
      let sz = ary.length;
      ary.forEach(function(oj, k){
        if(obj.attr('data-target-modal')==oj.attr('data-target-modal')) {
          let tr = k+dir;
          if(tr>=sz) tr = 0;
          if(tr<0) tr = sz-1;
          let tar = obj.attr('data-target-modal');
          let holder = $("[data-modalname='"+tar+"']").find('.holdercloser');
          holder.css('display', 'none');
          tar = ary[tr].attr('data-target-modal');
          let tobj = $("[data-modalname='"+tar+"']");
          holder = tobj.find('.holdercloser');
          showThisObj(holder);
        }
      });
      return y;
    }
    function getObject(obj, o) {
      let tar = obj.attr('data-target-modal');
      let tobj = $("[data-modalname='"+tar+"']");
      let vwid = tobj.attr('width');
      let thtml = tobj.html();
      let pvnx = "";
      let wid = $(window).width();
      let rpos = '-15px';
      if(wid<620) { vwid = '98%'; rpos='15px'; }
      if (o.enablenext) pvnx = "<div class='modalprev' style=''>&#x25B7;</div><div class='modalnext' style=''>&#x25B7;</div>";
      tobj.html("<div class='holdercloser' style='display: none'><div class='disableClick' style='width: " + vwid +";display: block;'><div class='modalbody'><div class='modalcloser btn btn-danger' style='right: "+rpos+";'>x</div>"+thtml+pvnx+"</div></div></div>");
    }
};}(jQuery));
