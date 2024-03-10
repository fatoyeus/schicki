(function(){
let l = document.querySelector('button#addbutton');
let r = document.querySelector('button#removebutton');

let i = document.querySelector('select#inactive');
let e = document.querySelector('select#active');
let d = document.querySelectorAll('select option')
let s = document.querySelector('button#stcbutton');
let j = document.querySelector('input#storecat');

function sx (f, l){
	let p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE){
			 let u = p.responseText;
			return l.setAttribute("value", u);
		}
	}
	let o = '/admin/c8/store/category';
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	p.send('categoryname='+ encodeURIComponent(f));
}
function lx (f){
	let p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE){
			console.log(p.responseText);
			return p.responseText
		}
	}
	let o = '/admin/c8/store/category/activate';
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	p.send('selectedcat='+ encodeURIComponent(f));
}
function rx (f){
	let p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE){
			console.log(p.responseText);
			return p.responseText
		}
	}
	let o = '/admin/c8/store/category/deactivate';
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	p.send('selectedcat='+ encodeURIComponent(f));
}
function cbtn (){
	if(i.childNodes.length < 2){
		l.setAttribute('disabled', '');
	}else if(e.childNodes.length < 2){
		r.setAttribute('disabled', '');
	}
}

async function ss(event){
	if(j.value.length <= 2){
			event.preventDefault();
		}else{
				let textN = document.createTextNode(j.value);
				let optN = document.createElement("option");
				optN.appendChild(textN);
				i.appendChild(optN);
				sx(j.value, optN);
				j.value = null;
			}	
	}		
function ll(event){
	if (i.selectedIndex < 0 ){
		
		event.preventDefault;
		
	}else{
	lx(i.selectedOptions[0].getAttribute('value'));
	e.appendChild(i.selectedOptions[0]); 
	r.removeAttribute('disabled');
	cbtn();
	}
}
function rr(event){
	if(e.selectedIndex < 0){
		event.preventDefault
	}else{
	rx(e.selectedOptions[0].getAttribute('value'));
	i.appendChild(e.selectedOptions[0]);
	l.removeAttribute('disabled');
	cbtn();
	}
}
function ee(event){
	i.selectedIndex = -1;
	l.setAttribute('disabled', '');
	r.removeAttribute('disabled');
	cbtn();
	}
function ii(event){
	e.selectedIndex = -1;
	r.setAttribute('disabled', '');
	l.removeAttribute('disabled');
	cbtn();
	}

s.onclick	=	ss;
l.onclick	=	ll;
r.onclick	=	rr;
e.onclick	=	ee;
i.onclick	=	ii;	

}())