(function(){
let a = document.querySelector('#storename');
let b = document.querySelector('span#storesearch');
let d = document.querySelector('#storedescr');
let e = document.querySelector('#storecat');
let f = document.querySelector('#submitButton');
let g = document.querySelector('form#storecreate');

const prtn = /[!@#$%&/*(){}+-/^//]/;
	
function ab(){
				d.removeAttribute('hidden');
				e.removeAttribute('hidden');
				f.removeAttribute('hidden');
			}
function ac(){
				 d.setAttribute('hidden', '');
				 e.setAttribute('hidden', '');
				 f.setAttribute('hidden', '');
}

function xy (z, o){
	
	w = new XMLHttpRequest();
	w.onreadystatechange	=	()=>{
		if(w.readyState === XMLHttpRequest.DONE){
			bb( w.responseText, o);
		}
			
	}
	let v = `/store/search/${z}/check`;
	w.open('GET', v, true);
	w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	w.send();
}

function qr (){
	let p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE){
			return p.responseText
		}
	}
	let o = '/store/create';
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'multipart/form-data');
	p.send(new FormData(g));
}

 function aa (event){
	let s = event.target.value;
	b.innerHTML = 'Searching';
	if(s.length > 0){
							let u =  xy(event.target.value, s);
					}else{
							bb(null, s);
					}
	}
function bb(v, u){
		if( v === 'false' || u.length === 0){
		b.innerHTML = (u.length === 0 ? 'Name cannot be empty': 'Already Taken');
		b.classList.remove('text-success');
		b.classList.add('text-danger');
		b.removeAttribute('hidden');
		setTimeout(() => {
						 b.setAttribute('hidden', '');
						 ac();
						}, 250);
		f.onsubmit = (fp)=>{
			fp.preventDefault();
		}
	}else {
		
		b.innerHTML 	= 'Name is Available';
		b.classList.remove('text-danger');
		b.classList.add('text-success');
		b.removeAttribute('hidden');
		setTimeout(() => {
						 b.setAttribute('hidden', '');
						 ab();
						}, 250);
		f.onsubmit = (fp)=>{
								fp;
								qr();
					}
			}
}

	a.oninput 		= aa;
	a.onkeydown     = function(event){if(event.key.match(prtn)){
						event.preventDefault();
	}}
	
}())

