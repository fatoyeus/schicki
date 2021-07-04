(function(ww){
	var ah 	= document.querySelectorAll('div#dropMenu a'),
		bh 	= document.querySelector('#navalign'),
		ch 	= document.querySelector('#brandmove'),
		ai 	= document.querySelector('div#pbar'),
		dh	= document.querySelectorAll('div#NotDropMenu a'),
		ej  = document.querySelector('div#notificationdiv'),
		prg = document.getElementById('spl');

const notEvts = new EventSource("/notify/notStream.js");
	
	notEvts.addEventListener("usermessage", function(event) {
  console.log('event received');
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

ah.forEach((a)=>{
	a.addEventListener("mouseover", ()=>{
		a.classList.add('bg-secondary');
	});
	a.addEventListener("mouseout", ()=>{
		a.classList.remove('bg-secondary');
	});
});
dh.forEach((a)=>{
	a.addEventListener("mouseover", ()=>{
		a.classList.remove('bg-dark')
		a.classList.add('bg-secondary');
	});
	a.addEventListener("mouseout", ()=>{
		a.classList.add('bg-dark');
		a.classList.remove('bg-secondary');
	});
});



ww.addEventListener('load', ()=>{
	progressBar(ww.location.pathname);
})

ww.addEventListener('unload', ()=>{
	ai.removeAttribute('hidden');
	ai.classList.remove('w-*');
	ai.classList.add( 'w-25');
})
	
if(ej){
		document.querySelector('a#notificationdropdown').addEventListener('click', ()=>{
			ej.setAttribute('hidden', '');
		})
	}


if(!(document.title === 'schicki')){

	bh.classList.remove("justify-content-end");
	ch.removeAttribute('hidden');
	}
}(window));