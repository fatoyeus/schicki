(function (){
	var a = document.querySelector('input#vendorname'),
	b = document.querySelector('span#vendorsearch'),
    d = document.querySelector('#storedescr'),
    e = document.querySelector('#storecat'),
    f = document.querySelector('#assocbtn'),
    g = document.querySelector('form#vendorassoc'),	
	j = document.querySelector('div#parsedvendors');

function rr(){
	var u = j.querySelectorAll('a');
	for(var x = 0;  x < u.length; x++){
		j.removeChild(u[x]);
	}
	return true;
			}	
function ab(){
				f.removeAttribute('disabled');
				j.removeAttribute('hidden');
			}
function ba(){
				f.setAttribute('disabled', '');
				j.setAttribute('hidden', '');
			}
function cd (s){
	rr();
	let q = s.responseXML.getElementsByTagName('name');
		for(var k = 0; k < q.length; k++){
			var textN = document.createTextNode(q[k].innerHTML);
			let aN = document.createElement("a");
			 aN.appendChild(textN);
			 aN.classList.add('dropdown-item');
			 aN.classList.add('font-italic');
			 aN.classList.add('text-light');
			j.append(aN);
		}
	h = document.querySelectorAll('div#parsedvendors a');
	h.forEach((b)=>{
	b.addEventListener("mouseover", ()=>{
		b.classList.add('bg-secondary');
	});
	b.addEventListener("mouseout", ()=>{
		b.classList.remove('bg-secondary');
		});
	b.addEventListener("click", ()=>{
		a.value = b.innerHTML;
		j.setAttribute('hidden', '');
		rr();
				});
		});
	
			   }
function xz(v, s){
		if( !v.response.includes('name')){
		b.innerHTML = (s.length === 0 ? 'Name cannot be empty': 'No Vendor Matched');
		b.classList.remove('text-success');
		b.classList.add('text-danger');
		f.onsubmit = (fp)=>{
			fp.preventDefault();
		}
		setTimeout(() => {
						 ba();
						}, 100);
	}else {
		var xw = cd(v);
		b.classList.remove('text-danger');
		b.innerHTML 	= 'Select Vendor';
		b.classList.add('text-success');
		setTimeout(() => {
						 b.setAttribute('hidden', '');
						 ab();
						}, 100);
		f.onsubmit = (fp)=>{
								fp;
								qr();
				}
		return xw;
			}
				}	
function xy (z){
	var w = new XMLHttpRequest();
	w.onreadystatechange	=	function(){
		if(w.readyState === XMLHttpRequest.DONE && w.status === 200){
			var e = xz( this, z);
			return e;
		}
			
	}
	var v = `/user/vendorsearch/${z}/check`;
	w.open('GET', v, true);
	w.setRequestHeader('Content-Type', 'text/xml');
	w.send();
				}
function qr (){
	p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE){
			return p.responseText;
		}
	}
	var o = '/user/vendor/associate';
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'multipart/form-data');
	p.send(new FormData(g));
				}
function aa (event){
	let s = event.target.value;
	b.classList.remove('text-success')||b.classList.remove('text-danger');
	b.removeAttribute('hidden');
	b.innerHTML = 'Searching';
	
	if(s.length !== 0){
		s = xy(s);
	}else{
		setTimeout(() => {
						 b.setAttribute('hidden', '');
						 f.setAttribute('disabled', '');
						 j.setAttribute('hidden', '');
						 }, 300);
		}
 					}

a.oninput	=	aa;
	
})();

