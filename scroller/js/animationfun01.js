'use strict';
 
var starttime;
function moveit(timestamp, el, dts, callback){
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    let milidur = dts[0]*1000;
    var timestamp = timestamp || new Date().getTime();
    var runtime = timestamp - starttime;
    move(el, runtime, milidur, dts[2], dts[1]);
    if (runtime < milidur){ 
      requestAnimationFrame(function(timestamp){
        moveit(timestamp, el, dts, callback);
      })
    } 
    if(milidur<runtime) { callback(el); }
}
function move(obj, rtime, duration, dis, dir) {
  let p = dis.replace(/[\d]/g, '');
  let val;
  if(p=='px') { dis = parseFloat(dis.replace('px', '')); }
  if(p=='%') { val = obj.parentElement.clientWidth; dis = parseFloat(dis.replace('%', ''))*val/100.0; }
  let progress = rtime / duration;
  progress = Math.min(progress, 1);
  let clc = dis*calc1(progress);
  if(clc > dis) clc = dis;
  if(dir=='mx') obj.style.transform = 'translateX('+(clc).toFixed(2)+'px)';
  if(dir=='my') obj.style.transform = 'translateY('+(clc).toFixed(2)+'px)';
}
 
function startit(obj, dis, sec, fun, callback){
  requestAnimationFrame(function(timestamp){
      starttime = timestamp || new Date().getTime();
      moveit(timestamp, obj, dis, sec, fun, callback);
  });
  var timestamp = timestamp || new Date().getTime();
  moveit(timestamp, obj, dis, sec, fun, callback);
}
function doneAnim(obj){
  console.log('done animation');
}
let calc1 = function(t)  { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;}
const easings = {
    linear(t)         { return t;                                                                 },
    easeInQuad(t)     { return t * t;                                                             },
    easeOutQuad(t)    { return t * (2 - t);                                                       },
    easeInOutQuad(t)  { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;                        },
    easeInCubic(t)    { return t * t * t;                                                         },
    easeOutCubic(t)   { return (--t) * t * t + 1;                                                 },
    easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInQuart(t)    { return t * t * t * t;                                                     },
    easeOutQuart(t)   { return 1 - (--t) * t * t * t;                                             },
    easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;           },
    easeInQuint(t)    { return t * t * t * t * t;                                                 },
    easeOutQuint(t)   { return 1 + (--t) * t * t * t * t;                                         },
    easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
  };

var box3 = document.querySelector('.bx3');
var box4 = document.querySelector('.bx4');

console.log(box3.parentElement.clientWidth);
console.log(window.screen.width);
console.log(window.innerWidth );
console.log(document.body.clientWidth);
console.log(document.body.clientHeight);

let dts1 = [2.2, 'my', '400px'];
let dts2 = [3.2, 'mx', '50%'];
startit(document.querySelector('.bx1'), dts1, doneAnim);
startit(document.querySelector('.bx2'), dts2, doneAnim);
let dts3 = [2, 'mx', '400px'];
startit(box3, dts3, doneAnim);
startit(box4, dts2, doneAnim);

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
/*
EasingFunctions = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t*t,
  // decelerating to zero velocity
  easeOutQuad: t => t*(2-t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity 
  easeInCubic: t => t*t*t,
  // decelerating to zero velocity 
  easeOutCubic: t => (--t)*t*t+1,
  // acceleration until halfway, then deceleration 
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  // accelerating from zero velocity 
  easeInQuart: t => t*t*t*t,
  // decelerating to zero velocity 
  easeOutQuart: t => 1-(--t)*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  // accelerating from zero velocity
  easeInQuint: t => t*t*t*t*t,
  // decelerating to zero velocity
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  // acceleration until halfway, then deceleration 
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
}
*/

/*

 simple linear tweening - no easing, no acceleration


Math.linearTween = function (t, b, c, d) {
  return c*t/d + b;
};
    

// quadratic easing in - accelerating from zero velocity


Math.easeInQuad = function (t, b, c, d) {
  t /= d;
  return c*t*t + b;
};
    

// quadratic easing out - decelerating to zero velocity


Math.easeOutQuad = function (t, b, c, d) {
  t /= d;
  return -c * t*(t-2) + b;
};

    

// quadratic easing in/out - acceleration until halfway, then deceleration


Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};


// cubic easing in - accelerating from zero velocity


Math.easeInCubic = function (t, b, c, d) {
  t /= d;
  return c*t*t*t + b;
};

    

// cubic easing out - decelerating to zero velocity


Math.easeOutCubic = function (t, b, c, d) {
  t /= d;
  t--;
  return c*(t*t*t + 1) + b;
};

    

// cubic easing in/out - acceleration until halfway, then deceleration


Math.easeInOutCubic = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
};
  

// quartic easing in - accelerating from zero velocity


Math.easeInQuart = function (t, b, c, d) {
  t /= d;
  return c*t*t*t*t + b;
};

    

// quartic easing out - decelerating to zero velocity


Math.easeOutQuart = function (t, b, c, d) {
  t /= d;
  t--;
  return -c * (t*t*t*t - 1) + b;
};

    

// quartic easing in/out - acceleration until halfway, then deceleration


Math.easeInOutQuart = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t*t + b;
  t -= 2;
  return -c/2 * (t*t*t*t - 2) + b;
};


// quintic easing in - accelerating from zero velocity


Math.easeInQuint = function (t, b, c, d) {
  t /= d;
  return c*t*t*t*t*t + b;
};

    

// quintic easing out - decelerating to zero velocity


Math.easeOutQuint = function (t, b, c, d) {
  t /= d;
  t--;
  return c*(t*t*t*t*t + 1) + b;
};

    

// quintic easing in/out - acceleration until halfway, then deceleration


Math.easeInOutQuint = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t*t*t + 2) + b;
};
    

// sinusoidal easing in - accelerating from zero velocity


Math.easeInSine = function (t, b, c, d) {
  return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

    

// sinusoidal easing out - decelerating to zero velocity


Math.easeOutSine = function (t, b, c, d) {
  return c * Math.sin(t/d * (Math.PI/2)) + b;
};

    

// sinusoidal easing in/out - accelerating until halfway, then decelerating


Math.easeInOutSine = function (t, b, c, d) {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};

    

// exponential easing in - accelerating from zero velocity


Math.easeInExpo = function (t, b, c, d) {
  return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
};

    

// exponential easing out - decelerating to zero velocity


Math.easeOutExpo = function (t, b, c, d) {
  return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};

    

// exponential easing in/out - accelerating until halfway, then decelerating


Math.easeInOutExpo = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
  t--;
  return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};
    

// circular easing in - accelerating from zero velocity


Math.easeInCirc = function (t, b, c, d) {
  t /= d;
  return -c * (Math.sqrt(1 - t*t) - 1) + b;
};

    

// circular easing out - decelerating to zero velocity


Math.easeOutCirc = function (t, b, c, d) {
  t /= d;
  t--;
  return c * Math.sqrt(1 - t*t) + b;
};

    

// circular easing in/out - acceleration until halfway, then deceleration


Math.easeInOutCirc = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
  t -= 2;
  return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
};


var easeInElastic = function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
},


// Linear
y = x

// Ease_In
y = x^2

// Ease_In_2
y = x^3

// Ease_In_3
y = x^8

// Ease_Out
y = 1-(1-x)^2

// Ease_Out_2
y = 1-(1-x)^3

// Ease_Out_3
y = 1-(1-x)^8

// Ease_In_Out
y = (x<0.5) ? (2x)^2/2 : 0.5+(1-(2(1-x))^2)/2
y = (x<0.5) ? 2x^2 : -2x^2+4x-1

// Ease_In_Out_2
y = (x<0.5) ? (2x)^3/2 : 0.5+(1-(2(1-x))^3)/2
y = (x<0.5) ? 4x^3 : 4x^3-12x^2+12x-3

// Ease_In_Out_3
y = (x<0.5) ? (2x)^8/2 : 0.5+(1-(2(1-x))^8)/2
y = (x<0.5) ? 128x^8 : 0.5+(1-(2(1-x))^8)/2

// Ease_In_Circular
y = 1-sqrt(1-x^2)

// Ease_Out_Circular
y = sqrt(1-(1-x)^2)
y = sqrt(-(x-2)x)

// Ease_In_Out_Circular
y = (x<0.5) ? (1-sqrt(1-(2x)^2))/2 : 0.5+sqrt(1-((2(1-x))^2))/2
y = (x<0.5) ? 0.5(1-sqrt(1-4x^2)) : 0.5(sqrt(-4(x-2)x-3)+1)

// Ease_In_Bounce
y = 2x^3-x^2
y = x^2(2x-1)

// Ease_In_Bounce_2
y = 3x^3-2x^2
y = x^2(3x-2)

// Ease_In_Bounce_3
y = 4x^3-3x^2
y = x^2(4x-3)

// Ease_Out_Bounce
y = 1-(2(1-x)^3-(1-x)^2)
y = x(x(2x-5)+4)

// Ease_Out_Bounce_2
y = 1-(3(1-x)^3-2(1-x)^2)
y = x(x(3x-7)+5)

// Ease_Out_Bounce_3
y = 1-(4(1-x)^3-3(1-x)^2)
y = x(x(4x-9)+6)

// Ease_In_Out_Bounce
y = (x<0.5) ? (2(2x)^3-(2x)^2)*0.5 : 1-(2(2(1-x))^3-(2(1-x))^2)*0.5
y = (x<0.5) ? 8x^3-2x^2 : 8x^3-22x^2+20x-5

// Ease_In_Out_Bounce_2
y = (x<0.5) ? (3(2x)^3-2(2x)^2)*0.5 : 1-(3(2(1-x))^3-2(2(1-x))^2)*0.5
y = (x<0.5) ? 12x^3-4x^2 : 12x^3-32x^2+28x-7

// Ease_In_Out_Bounce_3
y = (x<0.5) ? (4(2x)^3-3(2x)^2)*0.5 : 1-(4(2(1-x))^3-3(2(1-x))^2)*0.5
y = (x<0.5) ? 16x^3-6x^2 : 16x^3-42x^2+36x-9

 */