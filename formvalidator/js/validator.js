(function ( $ ) { $.fn.validate = function( options ) {
    var options = $.extend({ color: "#556b2f", 'enablenext': true }, options );
    $(body).append("<div id='validatetips' style='position: absolute; top: 10px; left: 10px; z-index: 1000; padding: 0.37rem 0.75rem; background: black; color: white; border-radious: 5px; display: none;font-family: \"Andale Mono\";border-radius: 0.25rem;'></div>")
		return this.each(function(){
      let obj = $(this);
      obj.on('focus', function(){
        // console.log('in '+$(this).prop('required'));
      });
      obj.on('focusout', function(){
        let txt = $(this).val();
        $("#validatetips").hide();
        if(txt.length==0 && $(this).prop('required'))
          $(this).addClass('redalert');
      });
      obj.keyup(function(){
        let tis = $(this);
        let len = parseInt(tis.attr('size'));
        let eml = tis.attr('type');
        let nam = tis.attr('name');
        let txt = tis.val();
        let pos = tis.offset();
        let hig = tis.height();
        let wid = tis.width();
        if(txt.length>0 && tis.prop('required')) tis.removeClass('redalert');
        if(len) { let lft=len-txt.length, yp= pos.top-40, xp=pos.left+wid-30; $('#validatetips').text(parseInt(lft)).css({'top': yp+'px', 'left': xp+'px'}); $("#validatetips").show(); }
        if(nam=='phone') if(phoneValid(txt)) tis.removeClass('redalert'); else tis.addClass('redalert');
        if(eml=='email') if(emailValid(txt)) tis.removeClass('redalert'); else tis.addClass('redalert');
      });
    });
    function phoneValid(number) {
      var rg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
      const found = number.match(rg);
      if(found) return true;
      else return false;
    }
    function emailValid(addr) {
      var rg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const found = addr.match(rg);
      if(found) return true;
      else return false;
    }
  }
})(jQuery);
