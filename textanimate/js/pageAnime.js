// document.addEventListener('click', fullView);

let cont = document.querySelectorAll('.contentBlock');
cont.forEach((v, k)=>{
	let itm = document.querySelectorAll('.items');
	let inf = document.querySelectorAll('.infors');
	let cn = 0;
	itm.forEach((it, c) => {
		// let el = document.createElement('button');
		// el.innerText = '+';
		// el.classList.add('close');
		// el.addEventListener('click', closeView);
		// it.parentElement.appendChild(el);
		let cx = (50 - Math.random()* 100 ) + (window.innerWidth/3) * ((cn%3) + 0.5),
			cy = (50 - Math.random()* 100) + (window.innerHeight/2) * (Math.floor(cn/3) + 0.5);
		it.dataset.posX = cx;
		it.dataset.posY = cy;
		it.style.clipPath = 'circle(50px at '+cx+'px '+cy+'px)';
		it.addEventListener('click', fullView);
		it.addEventListener('mouseover', showInfo);
		it.addEventListener('mouseout', hideInfo);
		cn++;
	});
	console.log('got a item');
});
function fullView(evt) {
	let tar = evt.target.parentElement;
	let cls = tar.className;
	if(!cls.includes('fullView')){
		tar.classList.add('fullView');
		tar.style.clipPath = 'circle(100%)';
		tar.style.zIndex = 10;
		let blk = document.querySelector('.showinfos');
		blk.style.display = 'none';
	}
	else {
		tar.classList.remove('fullView');
		tar.style.clipPath = 'circle(50px at '+tar.dataset.posX+'px '+tar.dataset.posY+'px)';
		tar.style.zIndex = 0;
	}
}
function showInfo(evt) {
	let tar = evt.target.parentElement, px = tar.dataset.posX, py = tar.dataset.posY;
	let blk = document.querySelector('.showinfos');
	let ind = document.querySelector('.indicator');
	blk.innerHTML = "<h6>"+tar.getAttribute('data-info')+"</h6>";
	blk.style.display = 'block';
	ind.style.display = 'block';
	blk.style.left = (px - blk.offsetWidth * 0.5)+'px';
	blk.style.top = (py - blk.offsetHeight - 63)+'px';
	ind.style.left = (px - 38) + 'px';
	ind.style.top = (py - 53) + 'px';	
	blk.style.opacity = '1';
	ind.style.transform = 'scale(1)';
}
function hideInfo(evt) {
	let blk = document.querySelector('.showinfos');
	blk.style.display = 'none';
	let ind = document.querySelector('.indicator');
	ind.style.display = 'none';
	blk.style.opacity = '0';
	ind.style.transform = 'scale(0)';
}
function closeView(evt) {
	// let tar = evt.target.parentElement;
	// let cls = tar.className;
	// if(cls.includes('fullView')){
	// 	let cx = Math.random()* window.innerWidth, cy = Math.random() * window.innerHeight;
	// 	tar.style.clipPath = 'circle(60px at '+cx+'px '+cy+'px)';
	// 	tar.classList.remove('fullView');
	// }
}