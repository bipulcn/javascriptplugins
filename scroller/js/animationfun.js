"user strict";
// This is a first example
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
var box1 = document.querySelector('.bx1');
function bxstep(timestamp) {
  if(!start) start = timestamp;
  var progress = timestamp - start;
  box1.style.transform = 'rotateZ(' + Math.min(progress / 10, 300) + 'deg)';
  if(progress<3000) window.requestAnimationFrame(bxstep);
}

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
window.requestAnimationFrame(bxstep);

var box2 = document.querySelector('.bx2')
console.log(box2);
var leftpos = 0
function movediv(timestamp){
  leftpos += 5
  // console.log('called '+leftpos);
  box2.style.transform = 'translateX(' + leftpos + 'px)';
  if(leftpos<800) requestAnimationFrame(movediv) // call requestAnimationFrame again to animate next frame
}
requestAnimationFrame(movediv)


var box3 = document.querySelector('.bx3');
var box4 = document.querySelector('.bx4');

var starttime;
 
function moveit(timestamp, el, dist, duration){
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    el.style.transform = 'translateX(' + (dist * progress).toFixed(2) + 'px)';
    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            moveit(timestamp, el, dist, duration)
        })
    }
}
 
function startit(obj, dis){
  requestAnimationFrame(function(timestamp){
      starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
      moveit(timestamp, obj, dis, 2000) // dispx over 1 second
  });
  var timestamp = timestamp || new Date().getTime()
  moveit(timestamp, obj, dis, 2000) // dispx over 1 second

}
startit(box3, 400);
startit(box4, 600);


let str = '300em';
let p = str.replace(/[\d]/g, '');
console.log(p);