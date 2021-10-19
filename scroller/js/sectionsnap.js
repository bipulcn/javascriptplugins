"user strict";
(function($) {
	$.fn.sectionsnap = function( options ) {
		let opt = $.extend({
			  'delay'			: 100 /* time dilay (ms) */
			, 'selector'		: ".section" /* selector */
			, 'reference'		: .9 /* % of window height from which we start */
			, 'animationTime'	: 400 /* animation time (snap scrolling) */
			, 'offsetTop'		: 100 /* offset top (no snap before scroll reaches this position) */
			, 'offsetBottom'	: 100 /* offset bottom (no snap after bottom - offsetBottom) */
		}, options);		
		
		let $wrapper = this
		, direction = 'down'
		, currentScrollTop = $(window).scrollTop()
		, scrollTimer
		, animating = false;

		// check the direction
		let updateDirection = function() {
			if ($(window).scrollTop() >= currentScrollTop) direction = 'down';
			else direction = 'up';
			currentScrollTop = $(window).scrollTop();
		}

		// return the closest element (depending on direction)
		let getClosestElement = function() {			
			let $list = $wrapper.find(opt.selector)
			, wt = $(window).scrollTop()
			, wh = $(window).height()
			, refY = wh * opt.reference
			, wtd = wt + refY - 1
			, $target;

			if (direction == 'down') {
				$list.each(function() {
					let st = $(this).position().top;					
					if ((st > wt) && (st <= wtd)) {
						$target = $(this);
						return false; // just to break the each loop
					}
				});
			} else {
				wtd = wt - refY + 1;
				$list.each(function() {
					let st = $(this).position().top;					
					if ((st < wt) && (st >= wtd)) {
						$target = $(this);
						return false; // just to break the each loop
					}
				});
			}
			return $target;
		}

		// snap
		let snap = function() {
			let $target = getClosestElement();
			if ($target) {
				if(direction=='down') {
					animating = true;
					$('html, body').animate({
										scrollTop: ($target.offset().top)
									}, opt.animationTime, function() {
										window.clearTimeout(scrollTimer);
										animating = false;
									});
				}
				if(direction=='up') {
					let wh = $(window).height(), th = $target.height(), tt = $target.offset().top, wt = $(window).scrollTop();
					// tt mid=wt+wh/2 bt=tt+th
					animating = true;
					if(Math.abs(tt-wt)>Math.abs(tt+th-wt-wh) && 200>Math.abs(tt+th-wt-wh)) {
						$('html, body').animate({
											scrollTop: (tt+th-wh)
										}, opt.animationTime, function() {
											window.clearTimeout(scrollTimer);
											animating = false;
										});
					}
					else $('html, body').animate({
											scrollTop: (tt)
										}, opt.animationTime, function() {
											window.clearTimeout(scrollTimer);
											animating = false;
										});
				}
			}
		}
		// on window scroll
		let windowScroll = function() {
			if (animating) 
				return;
			let st = $(window).scrollTop();
			if (st < opt.offsetTop)
				return;
			if (st > ($("html").height() - $(window).height() - opt.offsetBottom))
				return;
			updateDirection();
			window.clearTimeout(scrollTimer);
			scrollTimer = window.setTimeout(snap, opt.delay);
		}
		$(window).scroll(windowScroll);
		return this;
	};
})(jQuery);