"user strict";
document.onreadystatechange = () => {
  console.log(document.readyState);
  if (document.readyState === 'complete') {
    console.log('DOM is ready.');
    listenevent();
  }
};


  function addEventListener(){
    document.addEventListener("touchstart", listenevent);
    document.addEventListener("mousedown", listenevent);
  }
  function listenevent() {
	let sv = document.getElementById('svgcliper');
	let obj = document.querySelectorAll('.tileclip');
	let ind = 1;
	obj.forEach((v, k)=>{
		let isv = sv.getElementById('clip'+ind);
		if (isv==null) {
			isv = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
			isv.id = 'clip'+ind;
			let dsv = sv.getElementsByTagName('defs');
			dsv[0].appendChild(isv);
		}
		
		isv.innerHTML = '';
		let w = v.offsetWidth, h = v.offsetHeight;
		let pad = 1, unit, li, lj;
		let knd = Math.floor(Math.random()*2)+1;
		if(knd==1) {
			let num = 10;
			unit = w/num-pad;
			li = Math.floor(h/(unit*1.732+pad));
			lj = Math.floor(w/(unit+pad)) - 1;
		}
		if(knd==2){
			let num = 7;
			unit = Math.floor(w/(num*10+pad));
			console.log(unit, num*5);
			li = Math.floor(h/(unit*5+pad))-1;
			lj = Math.floor(w/(unit*18+pad));
		}
		console.log((li+lj)*0.5);
		for (var i = 0; i < li; i++) {
			let out = '';
			for (var j = 0; j < lj; j++) {
				let pro = Math.floor((li+lj)*0.5 - (Math.abs(li*0.5-i)+Math.abs(lj*0.5-j)));
				out += pro+", ";
				if(Math.floor(Math.random()*pro)%pro>=1) 
					createShape(isv, knd, unit, pad, i, j, Math.random()*1000);
			}
			console.log(out);
		}
		
		v.style.clipPath = 'url(#clip'+ind+')';

		anime({
		  targets: "#clip"+ind+" polygon",
		  translateY: [-500, 0],
		  rotate: [60, 0],
		  duration: 800,
		  easing: 'easeOutSine',
		  delay: anime.stagger(50, {from: 'last'})
		});
		ind++;
	});
	function createShape(isv, knd, unit, pad, i, j, time) {
		// setTimeout(function(){ 
		let ply = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
			if(knd==1){
				let x = 1+j*unit+pad*j, y = 1+1.732*unit*i+pad*i;
				let ps;
				if((j+i)%2==1) ps = x+" "+y+", "+(x+unit*2)+" "+y+", "+(x+unit)+" "+(y+1.732*unit);
				else ps = x+" "+(y+1.732*unit)+", "+(x+unit*2)+" "+(y+1.732*unit)+", "+(x+unit)+" "+(y);
				ply.setAttributeNS(null, 'points', ps);
				isv.appendChild(ply);
			}
			if(knd==2){
				let x = 10 + (unit*18+pad)*(j), y = 0+(unit*5+pad*0.25)*(i);
				if(i%2==1) x+=unit*9+pad*0.5;
				let ps = x+" "+(y+5*unit)+", "+(x+3*unit)+" "+y+", "+(x+9*unit)+" "+y+", "+(x+12*unit)+" "+(y+5*unit)+", "+(x+9*unit)+" "+(y+1*unit*10)+", "+(x+3*unit)+" "+(y+1*unit*10);
				// let ply = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
				ply.setAttributeNS(null, 'points', ps);
				isv.appendChild(ply);
			}
		// ply.style.opacity = 0;
		// }, time);
	}
	
	
	/*
	130   160 220 250 220 160
	x=130 30  90  120 90  30
	50    0   0   50  100 100

	*/
	// let path = document.createElement('polygon'); 
	// path.setAttribute('points', '130 50, 160 0, 220 0, 250 50, 220 100, 160 100');

	// sv.appendChild(path);      	
  }
// sv.appendChild("<polygon points='0 50, 30 0, 90 0, 120 50, 90 100, 30 100'/>");