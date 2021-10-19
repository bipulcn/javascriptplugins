"use strict"
;(function ( $ ) {
  $.fn.cshuffle = function( options ) {
    var variables = $.extend({ color: "#556b2f", items:'cshuf-item' }, options );
    const $window = $(window);
    let hsh = [];
    let ary = [];
    return this.each(function(){
      let vs = variables;
      let obj = $(this);
      $(vs.items).each(function(){
        hsh.push($(this));
        let keys = JSON.parse($(this).attr('data-groups'));
        pushInKey(ary, keys, $(this));
      });
      // rand(ary, 'one');
      console.log(Object.keys(ary).length);
      obj.find('.nav-link').each(function(){        
        $(this).click(function(){
          let key = $(this).attr('data-trg');
          setEnableContent(ary, key);
          setTimeout(function(){getHeight(obj);}, 1000);
          obj.animate({'height': obj.height()+'px'});
        });
        // $(this).mouseover(function(){console.log('mouseover '+$(this).text());});
        // $(this).mouseout( function(){console.log('mouseout  '+$(this).text());});
        // $(this).mousemove(function(){console.log('mousemove '+$(this).text());});
        // $(this).mousedown(function(){console.log('mousedown '+$(this).text());});
        // $(this).mouseup(  function(){console.log('mouseup   '+$(this).text()); });
        // $(this).hover(    function(){console.log('hover     '+$(this).text());});
      });
    });
  };
  function getHeight(obj){
    let tp = 100000, btm=0;
    obj.children().each(function(){
      let ofs = $(this).offset();
      let hi = $(this).innerHeight();
      if(tp>ofs.top) tp = ofs.top;
      if(btm<(ofs.top+hi)) btm = ofs.top+hi;
    }); 
    let rhi = btm-tp;
    obj.animate({height: rhi+"px"});
  }
  function setEnableContent(list, key) {
    console.log(key);
    let ak = Object.keys(list);
    if(key=='all') {
      ak.forEach((pv, pk)=>{
        list[pv].forEach((v, k)=>{
          v.delay(200).show(500);
        });
      });      
    }
    else {
      ak.forEach((pv, pk)=>{
        list[pv].forEach((v, k)=>{
          if(!ckValueIn(list[key], v)) v.hide(200);
        });
      });
      list[key].forEach((v, k)=>{
        v.delay(200).show(500);
      });
    }
  }
  function ckValueIn(list, value) {
    if(list.indexOf(value) !== -1) return true;
    else return false;
  }
  function ckKeyIn(list, value) {
    if(value in list) return true;
    else return false;
  }
  function rand(list, key){
    let prt = list[key];
    for (let i = prt.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [prt[i], prt[j]] = [prt[j], prt[i]];
    }
    list[key] = prt;
    return list;
  }
  function pushIn(list, value){
    list.push(value)
  }
  function pushInKey(list, keys, value){
    keys.forEach((v, k)=>{
      if(!ckKeyIn(list, v))
        list[v] = [];
      list[v].push(value);
    });
    return list;
  }
  function pushOut(list, key, value=null){
    if(value==null) list.splice(key, 1);
    else list.splice(key, 1, value);
  }
  function animate(obj, opt, sec){
    let val = $.extend({'left': '10px'}, opt);
    let tim = sec*1000;
    obj.animate(val, tim);
  }
  function hide(obj, sec){
    obj.slideUp(sec*1000);
  }
  function show(obj, sec){
    obj.slideDown(sec*1000);
  }
  function toggle(obj, sec){
    obj.toggle(sec*1000);
  }
  $.fn.showLinkLocation = function() {
    this.filter( "a" ).each(function() {
      var link = $( this );
      link.append( "<br>(" + link.attr( "href" ) + ")" );
    });
    return this;
  };
}( jQuery ));
