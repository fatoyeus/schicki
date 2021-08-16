(function(ww){
	var ah 	= document.querySelectorAll('div#dropMenu a'),
		bh 	= document.querySelector('#navalign'),
		ch 	= document.querySelector('#brandmove'),
		ai 	= document.querySelector('div#pbar'),
		dh	= document.querySelectorAll('div#NotDropMenu a'),
		ej  = document.querySelector('div#notificationdiv'),
		fj  = document.querySelector('div#NotDropMenu'),
		prg = document.getElementById('spl'),
		notfPH = null;

const notEvts = new EventSource("/notStream");
	
notEvts.onmessage = (event)=> {
  console.log(JSON.parse(event.data))
};
	
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
function notfn(i){
		if(notfPH){
					notfPH.forEach((l)=>{
						fj.removeChild(l);
					})
		}
		
		var w = new XMLHttpRequest();
		w.onreadystatechange	=	()=>{
										if(w.readyState === XMLHttpRequest.DONE && w.status === 200){	
																										notfPH = w.responseXML.querySelectorAll('a');
																										notfPH.forEach((x)=>{
																											fj.append(x);
																										 })
																									}
									}								
																	var j = `/notf/${i.dataset.id}`;
																	w.open('GET', j, true);
																	w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
																	w.responseType = "document";
																	w.send();
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
		document.querySelector('a#notificationdropdown').addEventListener('click', (e)=>{
			ej.setAttribute('hidden', '');
			notfn(e.target);
		})
	}


if(!(document.title === 'schicki')){

	bh.classList.remove("justify-content-end");
	ch.removeAttribute('hidden');
	}
}(window));