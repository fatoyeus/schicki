var a = document.querySelector('#storename');
var b = document.querySelector('span#storesearch');
var d = document.querySelector('#storedescr');
var e = document.querySelector('#storecat');
var f = document.querySelector('#submitButton');
var g = document.querySelector('form#storecreate');

	
function ab(){
				d.removeAttribute('hidden');
				e.removeAttribute('hidden');
				f.removeAttribute('hidden');
			}


function xy (z){
	
	w = new XMLHttpRequest();
	w.onreadystatechange	=	()=>{
		if(w.readyState === XMLHttpRequest.DONE){
			return w.responseText
		}
			
	}
	var v = `/store/search/${z}/check`;
	w.open('GET', v, true);
	w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	w.send();
}

function qr (){
	p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE){
			return p.responseText
		}
	}
	var o = '/store/create';
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'multipart/form-data');
	p.send(new FormData(g));
}

 async function aa (event){
	let s = event.target.value;
	b.innerHTML = 'Searching';
	var u = await xy(event.target.value);
	
	 if( u === 440 || s.length === 0){
		
		b.innerHTML = (s.length === 0 ? 'Name cannot be empty': 'Already Taken');
		b.classList.remove('text-success');
		b.classList.add('text-danger');
		b.removeAttribute('hidden');
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
	


