(function(ww){
	var ah 	= document.querySelectorAll('div#dropMenu a'),
		bh 	= document.querySelector('#navalign'),
		ch 	= document.querySelector('#brandmove'),
		ai 	= document.querySelector('div#pbar'),
		prg = document.getElementById('spl');
		

ah.forEach((a)=>{
	a.addEventListener("mouseover", ()=>{
		a.classList.add('bg-secondary');
	});
	a.addEventListener("mouseout", ()=>{
		a.classList.remove('bg-secondary');
	});
});
function progressBar(o){
		var f = new XMLHttpRequest();
		f.onloadstart = function (ode){
										ai.classList.add( 'w-25');
										//	ai.classList.add( `w-${(cde.loaded/cde.total) * 100}`);
										}
		f.onprogress = function (cde){
										if(cde.lengthComputable){
												ai.classList.remove('w-*');
												ai.classList.add( `w-${Math.trunc((cde.loaded/cde.total) * 100)}`);
											//	ai.classList.add( `w-${(cde.loaded/cde.total) * 100}`);
																}
										}
		f.onloadend  = function(dde){
										ai.classList.remove('w-*');
										ai.classList.add( `w-${Math.trunc(dde.loaded * 100)}`);
										setTimeout(()=>{
											ai.setAttribute('hidden', '')
										}, 250)  
										}
		f.open('GET', o, true);
		f.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		f.send();
		}


ww.addEventListener('load', ()=>{
	progressBar(ww.location.pathname);
})

ww.addEventListener('unload', ()=>{
	ai.removeAttribute('hidden');
	ai.classList.remove('w-*');
	ai.classList.add( 'w-25');
})




if(!(document.title === 'schicki')){

	bh.classList.remove("justify-content-end");
	ch.removeAttribute('hidden');
	}
}(window));