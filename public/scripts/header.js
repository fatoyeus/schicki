(function(ww){
	var bh 	= document.querySelector('#navalign'),
		ch 	= document.querySelector('#brandmove'),
		ai 	= document.querySelector('div#pbar'),
		ej  = document.querySelector('div#notificationdiv'),
		fj  = document.querySelector('div#NotDropMenu'),
		gj  = document.querySelector('div#spinnerdiv'),
		kj	= document.querySelector('div#menuspinnerdiv'),
		hj	= document.querySelector('div#dropdowndiv'),
		ij	= document.querySelector('div#dropMenu'),
		prg = document.getElementById('spl'),
		notfPH = null,
		menu  = null;

const notEvts = new EventSource("/notStream");



notEvts.addEventListener("notify", function(e){
	
});
	

notEvts.onmessage = function(e){
	console.log('received notification');
	let notdiv = document.querySelector('div#unreadnotDiv');
	if(notdiv){
		notdiv.querySelector('div#unreadNotCount').innerHTML = e.data;
		notdiv.removeAttribute('hidden');
		
	}else{
			document.querySelector('div#unreadNotCount').innerHTML = e.data;
			}
}
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
			notfPH = null;
		}
		fj.append(gj);
		
		
		var w = new XMLHttpRequest();
		w.onreadystatechange	=	()=>{
										if(w.readyState === XMLHttpRequest.DONE && w.status === 200){	
																										notfPH = w.responseXML.querySelectorAll('a');
																										notfPH.forEach((x)=>{
																											gj.remove();
																											fj.append(x);
																										 })
																									
																									var dh	= document.querySelectorAll('div#NotDropMenu a');
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
															}
										}								
		var j = `/notf/${i.dataset.id}`;
		w.open('GET', j, true);
		w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		w.responseType = "document";
		w.send();
}
function menuitm(k){
	/*if(menu){
		menu.forEach((item)=>{
			kj.removeChild
		})
		menu = null;
	}*/
	var u = new XMLHttpRequest();
	u.onreadystatechange	=	()=>{
										if(u.readyState === XMLHttpRequest.DONE && u.status === 200){	
																										menu = u.responseXML.querySelectorAll('div, a');
																										menu.forEach((item)=>{
																											kj.remove();
																											ij.append(item);
																											console.log(item);
																										})
																									var	ah 	= document.querySelectorAll('div#dropMenu a');
																									ah.forEach((a)=>{
																														a.addEventListener("mouseover", ()=>{
																															a.classList.add('bg-secondary');
																														});
																														a.addEventListener("mouseout", ()=>{
																															a.classList.remove('bg-secondary');
																														});
																													});
																									}
										}
									
										
	var j = '/menuitems';
		u.open('GET', j, true);									
		u.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		u.responseType = "document";
		u.send();
				}





/*ww.addEventListener('load', ()=>{
	progressBar(ww.location.pathname);
})*/

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
if(hj){
		hj.addEventListener('click', (e)=>{
			menuitm()
		})
	}

if(!(document.title === 'schicki')){

	bh.classList.remove("justify-content-end");
	ch.removeAttribute('hidden');
	}
}(window));