"user strict";
;(function($){
	$.fn.explodEffect = function( options ) {
	    var variables = $.extend({ color: "#556b2f", items:'cshuf-item' }, options );
	    const $window = $(window);
	    return this.each(function(){
	      let vs = variables;
	      let obj = $(this);
	      obj.append("<div class='bombexp'><span style='font-size:50px;'>&#9676;</span><span style='font-size:50px;'>&#9672;</span></div>"); //<span style='font-size:50px;'>&#9675;</span><span style='font-size:50px;'>&#9679;</span>
	      obj.find('bombexp').css({'position': 'abaolute', 'left': '100px', 'top': '100px'});
	      obj.click(createSpark);
	 	});
	}
	function createSpark(evt) {
		let ch01 = $('.bombexp span');
      	let px = evt.pageX, py = evt.pageY;
      	let cw1 = ch01.width(), ch1 = ch01.height();
      	let tar = evt.target;
      	$('.bombexp').css({'left': (px-15)+'px', 'top': (py-50)+'px', 'display': 'block'});
      	if($(tar).data('running')==undefined || $(tar).data('running')==false) anime({
		  targets: $(tar).get(0),
		  scale: [1, 1],
		  easing: 'easeOutBounce',
		  begin: function(anim) {
		  	$(tar).data('running', true);
		  	anime({
		  		targets: '.bombexp span',
		  		delay: function(el, i) { return i*200; },
		  		scale: [{value: 0, duration: 10}, {value: 2, duration: 2500}, {value: 0, duration: 100}],
		  		// opacity: [{value: 0, duration: 10}, {value: 1, duration: 2500}, { value: 0, duration: 100}]
		  	});
		  },
		  complete: function(anim) {
		  	$(tar).data('running', false);
	      	$('.bombexp').css({'display': 'none'});
	      	// $('.bombexp span').css({'transform': 'scale(1)'});
		  }
		});
	}
}(jQuery));

