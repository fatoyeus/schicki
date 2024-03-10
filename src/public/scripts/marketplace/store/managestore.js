(function(){
	let cx = document.forms.namedItem('assignuser');
	let jq = document.forms.namedItem('removeuser');

	let ev = document.querySelector('data#store_id');
	let gt = document.querySelector('ul#lastuserul');
		
	
	function kp (v){
	let ir = document.querySelector('select#selectedremove'),
		gt = document.querySelector('ul#lastuserul'),
	 	nm = document.querySelector('div#r_storemanagers'),
		dw = document.querySelector('form#removeuser');
	let q = new XMLHttpRequest();
	q.onreadystatechange	=	()=>{
		if(q.readyState === XMLHttpRequest.DONE && q.status === 200){
			let textD = document.createTextNode(ir.options[ir.options.selectedIndex].innerHTML);
			let optD = document.createElement("li");
			optD.setAttribute('id', ir.value);
			optD.classList.add('nav-item');
			optD.classList.add('text-truncate');
		    optD.append(textD);
			let lo = gt.querySelectorAll('li');
			lo.forEach((li)=>{
				if(li.isEqualNode(optD)){
					gt.removeChild(li);
				}
			})
			console.log(q.responseXML.querySelector('form#removeuser'));
			nm.replaceChild(q.responseXML.querySelector('form#removeuser'), dw);
			nm.querySelector('form#removeuser').onsubmit = kp;
		}
	}
	let o = `/store/${ev.value}/removeuser/${ir.value}`;
	q.open('POST', o, true);
	q.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	q.responseType="document";
	q.send();
	v.preventDefault();
}
	
	function by (v){
	let fu = document.querySelector('select#selectedassign'),
	    ay = document.querySelector('div#r_storemanagers'),
	    dw = document.querySelector('form#removeuser');
	let p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE && p.status === 200){
			let textN = document.createTextNode(fu.options[fu.options.selectedIndex].innerHTML);
			let optN = document.createElement("li");
			optN.setAttribute('id', fu.value);
			optN.classList.add('nav-item');
			optN.classList.add('text-truncate');
		    optN.append(textN);
			gt.appendChild(optN);
			console.log(p.responseXML.querySelector('form#removeuser'));
			ay.replaceChild(p.responseXML.querySelector('form#removeuser'), dw);
			ay.querySelector('form#removeuser').onsubmit = kp;
		}
	}
	let o = `/store/${ev.value}/assignuser/${fu.value}`;
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	p.responseType="document";
	p.send();
	v.preventDefault();
}
	if(cx){
		cx.onsubmit = by;
	}
	if(jq){
		jq.onsubmit = kp;
	}
	
}())