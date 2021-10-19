"use strict";
var ml = { timelines: {}};

$(document).ready(function(){
  anime({ direction: 'alternate', loop: true,
    targets: '.anime_00',  background: { value: ['#009a00', ' #FFFFFF'], duration: 2500, easing: 'easeOutBack', delay: 0 }
  });

  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_01', translateX: [50, 250]
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_02',
    translateX: { value: 100, duration: 800 },
    rotate: { value: 360, duration: 1800, easing: 'easeInOutSine' },
    scale: { value: 1.3, duration: 1600, delay: 800, easing: 'easeInOutQuart' }
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_03', rotate: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_04', 'width': '100%'
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_05', keyframes: [ {translateY: -40}, {translateX: 150}, {translateY: 40}, {translateX: 0}, {translateY: 0} ],
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_06', translateY: -50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_07', rotateX: 180
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_08', rotateY: 180
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_09', rotateZ: 180
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_10', scale: 0
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_11', scaleX: 0
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_12', scaleY: 0
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_13', scaleZ: 0
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_14', skew: (50, 30)
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_15', skewX: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_16', skewY: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_17', perspective: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_18', translateX: [100, -100]
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_19', rotate: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_20', rotate: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_21', rotate: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_22', rotate: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_23', rotate: 50
  });
  anime({ duration: 3000, easing: 'easeInOutQuad', delay: 1000, endDelay: 1000, direction: 'alternate', loop: true,
    targets: '.anime_24', rotate: 50
  });
  anime({
    targets: '.anime_30',
      translateX: [ { value: 250, duration: 1000, delay: 500 }, { value: 0, duration: 1000, delay: 500 }
    ],
    translateY: [ { value: -40, duration: 500 }, { value: 40, duration: 500, delay: 1000 }, { value: 0, duration: 500, delay: 1000 }    ],
    scaleX: [
      { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
      { value: 1, duration: 900 },
      { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
      { value: 1, duration: 900 }
    ],
    scaleY: [
      { value: [1.75, 1], duration: 500 },
      { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
      { value: 1, duration: 450 },
      { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
      { value: 1, duration: 450 }
    ],
    easing: 'easeOutElastic(1, .8)',
    loop: true
  });

  $('.ml1 .letters').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });

  ml.timelines["ml1"] = anime.timeline({loop: true})
    .add({
      targets: '.ml1 .letter',
      scale: [0.3,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 600,
      delay: function(el, i) {
        return 70 * (i+1)
      }
    }).add({
      targets: '.ml1 .line',
      scaleX: [0,1],
      opacity: [0.5,1],
      easing: "easeOutExpo",
      duration: 700,
      offset: '-=875',
      delay: function(el, i, l) {
        return 80 * (l - i);
      }
    }).add({
      targets: '.ml1',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
});
