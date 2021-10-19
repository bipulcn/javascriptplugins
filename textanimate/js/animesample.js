
document.onreadystatechange = () => {
  console.log(document.readyState);
  if (document.readyState === 'complete') {
    console.log('DOM is ready.')
  }
};


// seciton animation 01
let eas = ['easeOutSine', 'easeOutQuad', 'easeOutCubic', 'easeOutQuart', 'easeOutQuint', 'easeOutExpo', 'easeOutCirc', 'easeOutBack', 'easeOutBounce'];
anime({
  targets: '.el01_1',
  translateX: '40vw',
  duration: 1500,
  borderRadius: ['50%', 0],
  loop: true,
  direction: 'alternate',
  easing: function(el, i) { return eas[i]; }
});
// seciton animation 02
anime({
  targets: ['.el02_1 path', '.el02_1 circle', '.el02_1 line'],
  strokeDashoffset: [anime.setDashoffset, 0],
  strokeWidth:  [1, 6],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 150 },
  direction: 'alternate',
  loop: true
});
anime({
  targets: '#demo-svg polygon',
  points: [
    {value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369'},
    {value: '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369'}
  ],
  easing:'easeOutQuad',
  duration: 2500,
  loop:true,
  direction:'alternate'
});
// seciton animation 03
let col = ['red', 'orange', 'blue', 'purple', 'gold', 'silver', 'magenta', 'tomato'];
let shp = document.querySelectorAll('.sym');
shp.forEach((v, k)=>{ v.style.color = col[Math.floor(Math.random()*col.length)]; })
anime({
  targets: ['.el03_1 .sym','.el03_2 .sym'],
  translateX: {value: function(el, i) { return 40 - Math.random()*80 }, duration: 100 } ,
  translateY: {value: function(el, i) { return 40 - Math.random()*80 }, duration: 100} ,
  rotate: [ 0, function(el, i) { return 90 - Math.random()*180;}],
  scale: function(el, i) { return [0, 3 + Math.random()*3]; },
  opacity: [
    { value: [0, 1], duration: 300 }, { value: [1, 0], duration: 200}
  ],
  duration: 800,
  loop: true,
  easing: 'easeOutBack',
  delay: function(el, i) { return i*250; }
});
// seciton animation 04
anime({
  targets: '.hexagon',
  clipPath: 'polygon(75% 0, 100% 0%, 75% 100%, 25% 100%, 0 100%, 25% 0)',
  duration: 1500,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutBack'
});
// seciton animation 05
let hco = ['#a3f923', '#8423de', '#32aeFe'];
anime({
  targets: '.line polyline',
  strokeDashoffset: {
    value: [100, -600],
    duration: 2700,
    easing: 'easeOutQuart'
  },
  strokeDasharray: [{
    value: ['100 600'],
    duration: 400,
    easing: 'easeOutQuart'
  }, {
    value: ['100 600', '0 600'],
    duration: 1200,
    easing: 'easeOutQuart'
  }],
  // easing: 'easeInOutSine',
  delay: function(el, i) { return i * 50 },
  direction: 'natural',
  loop: true
});
anime({
  targets: '.triangle div',
  rotate: {value: [30, 90], delay: anime.stagger(90)},
  skewY: { value:[-30, -30], dealy: anime.stagger(-10)},
  translateX: [20, 80],
  translateY: [50, -80] ,
  scaleX:  {value: [1.5, 2.3], dealy: anime.stagger(-0.5, {start: 2.4})},
  duration: 1000,
  // delay: anime.stagger(30),
  loop: true,
  easing: 'easeInOutSine',
  direction: 'forword'
});
// seciton animation 06
var d = new Date(), scl = 50;
anime({
  targets: '.ani-cirles1',
  scale: [{value: [0, 2], delay: 5*scl, endDelay: 5*scl, duration: 10*scl}, { value: [2, 0.99], duration: 5*scl, delay: 5*scl}, { value: [1, 8], duration: 5*scl, endDelay: 30*scl}],
  loop: true,
  loopBegin: function(anim) {
    // console.log('began circle2 : ' + d.getTime());
    anime({
      targets: '.ani-cirles2',
      scale: [{value: [0, 1], delay: 20*scl, duration: 5*scl}],
      endDelay: 25*scl,
      easing: 'easeOutSine'
    });
    anime({
      targets: '.ani-cirles3',
      scale: [{value: [0, 8], delay: 35*scl, duration: 25*scl}],
      endDelay: 5*scl,
      easing: 'easeOutSine'
    });
    anime({
      targets: '.ani-bar1, .ani-bar2',
      scaleX: [{value: [0, 5], delay: 5*scl, duration: 10*scl}],
      scaleY: {value: [1, 0], delay: 7*scl, duration: 10*scl},
      endDelay: 35*scl,
      easing: 'easeOutSine'
    });
    anime({
      targets: '.ani-arrow1',
      opacity: { value: [0, 1], duration: 10, delay: 15*scl },
      translateY: { value: [-50, 20], delay: 15*scl, duration: 7*scl},
      scale: {value:[2, 0], delay: 15*scl, duration: 7*scl },
      endDelay: 28*scl,
      easing: 'easeOutSine'
    });
    anime({
      targets: '.ani-arrow2',
      opacity: { value: [0, 1], duration: 10, delay: 15*scl },
      translateY: { value: [50, -20], delay: 15*scl, duration: 7*scl},
      scale: {value:[2, 0], delay: 15*scl, duration: 7*scl },
      endDelay: 28*scl,
      easing: 'easeOutSine'
    });
  },
  loopComplete: function(anim) {
    console.log('began circle2 : ' + d.getTime());
  },  
  easing: 'easeOutSine'
});

// seciton animation 07
// seciton animation 08
// seciton animation 09
anime({
  targets: '.boxTwo, .boxThree',
  width: 0,
  duration: 2000,
  delay: anime.stagger(2000),
  endDelay: 1000,
  loop: true,
  easing: 'easeInOutSine',
  direction: 'alternate'
});


// seciton animation 10
let pin = document.querySelectorAll('.musCng');
pin.forEach((v, k)=>{
  v.addEventListener('click', animateThis);
  // v.addEventListener('mouseout', animateSrink);
});
function animateSrink(evt) {
  // var element = document.getElementById("myDIV");
  // element.className = element.className.replace(/\bmystyle\b/g, "");
  let nam = evt.target.className;
  if(nam.includes('musCng'))
  evt.target.classList.remove('fullSize');
}
function animateThis(evt) {
  // var element = document.getElementById("myDIV");
  // element.classList.remove("mystyle");
  let tar = evt.target;
  let nam = tar.className;
  const par = tar.parentElement;
  let pnm = par.className;
  if(nam.includes('fullSize')){
    tar.classList.remove('fullSize');
    tar.classList.add('fullClear');
  }
  else if(pnm.includes('fullSize')){
    par.classList.remove('fullSize');
    par.classList.add('fullClear');
  }
  else {
    if(nam.includes('musCng')){
      tar.classList.remove('fullClear');
      tar.classList.add('fullSize');
    }
    else if(pnm.includes('musCng')){
      par.classList.remove('fullClear');
      par.classList.add('fullSize');
    }
  }
}
// function animateSrink(evt) {
//   evt.target.style.zIndex = 0;
//   anime({
//     targets: evt.target,
//     width: '33%',
//     duration: 2000,
//     easing: 'easeInOutSine',
//   });
// }


// seciton animation 11
let esi = ['easeInSine', 'easeInQuad', 'easeInCubic', 'easeInQuart', 'easeInQuint', 'easeInExpo', 'easeInCirc', 'easeInBack', 'easeOutBounce'];
anime({
  targets: '.buncBall1, .buncBall2, .buncBall3, .buncBall4, .buncBall5, .buncBall6, .buncBall7, .buncBall8, .buncBall9',
  translateY: 250,
  duration: 2500,
  easing: function(el, i) { return esi[i];},
  direction: 'alternate',
  loop: true
});
anime({
  targets: '.buncBall10',
  translateY: [{value: [0, 250], duration: 1500, easing: 'easeInExpo'}, { value: [250, 0], duration: 1500, easing: 'easeOutExpo'}],
  scaleX: [{ value: [1, 1.3], duration: 100, delay: 1450, easing: 'easeInBounce'}, { value: [1.3, 1], duration: 50, endDelay: 1450, easing: 'easeInSine'}],
  scaleY: [{ value: [1, 0.58], duration: 100, delay: 1450, easing: 'easeInBounce'}, { value: [0.58, 1], duration: 50, endDelay: 1450, easing: 'easeInSine'}],
  duration: 5000,
  loop: true
});


// seciton animation 12
anime({
  targets: '.expandit',
  scaleY: [{ value: [1.05, 1.075], duration: 50, easing: 'easeInBack'}, { value: [1.075, 1.05], duration: 50, easing: 'easeInBack'}],
  scaleX: [{ value: [1.05, 1.025], duration: 50, easing: 'easeInBack'}, { value: [1.025, 1.05], duration: 50, easing: 'easeInBack'}],
  loop: true
});
anime({
  targets: '.zoomit',
  scaleX: [
    {value: [1, 1.25], duration: 500 }
  ],
  scaleY: [
    {value: [1, 1.25], duration: 500 }
  ],
  borderRadius: [
    {value: [1, 50], duration: 300, delay: 200 }
  ],
  easing: 'easeOutSine',
  direction: 'alternate',
  duration: 2000,
  loop: true
});

anime({
  targets: '.slideit',
  translateX: [
    {value: [800, 0], duration: 1000 }
  ],
  skewX: [
    {value: [1, -10], duration: 500 },
    {value: 0, duration: 800, easing: 'easeOutBack' }
  ],
  easing: 'easeOutBack',
  duration: 1000,
  endDelay: 2000,
  loop: true
});


// seciton animation 13
function animateFrom(x, y){
  let tx = x +(100 -  Math.random()*200), ty = x +(100 -  Math.random()*200);
  let msec = Math.sqrt(Math.pow((x-tx), 2)+Math.pow((y-ty), 2))*20;
  console.log(msec);
  anime({
    targets: '.dotpoint',
    translateX: [{value: [x, tx], duration: msec, easing: 'linear'}],
    translateY: [{value: [y, ty], duration: msec, easing: 'easeInOutSine'}],
    loopComplete: function(anim) {
      animateFrom(tx, ty);
    },
  });
}
animateFrom(0, 0);

anime({
  targets: '.dotball',
  translateX: [
    { value: 250, duration: 1000, delay: 500 },
    { value: 0, duration: 1000, delay: 500 }
  ],
  translateY: [
    { value: -40, duration: 500 },
    { value: 40, duration: 500, delay: 1000 },
    { value: 0, duration: 500, delay: 1000 }
  ],
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


