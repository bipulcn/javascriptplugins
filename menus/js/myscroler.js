(function ( $ ) { $.fn.scrollcaker = function( options ) {
    var options = $.extend({ color: "#556b2f", 'enablenext': true }, options );
    let ech = $(this).toArray();
    let objs = [];
    let y = 0;
    let $window = $(window);
		return this.each(function(){
      let o = options;
      let obj = $(this);
      $window.scroll(function() {
        console.log("working");
        console.log($('html').scrollTop());
      });
    });
  }
})(jQuery);
(function($) {
  $.fn.onScrolls = function(duration, imgfile) {
    let $window = $(window);

    $window.scroll(function() { performAction(); });
    function performAction() {
        console.log('working');
    }
  };
})(jQuery);
$(document).ready(function(){
  $(window).scroll(function(){
    console.log('working');
  });
});
