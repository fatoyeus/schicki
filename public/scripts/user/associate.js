(function (){
	var a = document.querySelector('input#vendorname'),
		b = document.querySelector('span#vendorsearch'),
    	d = document.querySelector('#storedescr'),
    	e = document.querySelector('#storecat'),
    	f = document.querySelector('button#assocbtn'),
    	g = document.querySelector('div#vendorassoc'),	
		j = document.querySelector('div#parsedvendors'),
		k = document.querySelector('h4#assoc-vendor'),
		l = document.querySelector('div#associatedvendor'),
		m = document.querySelector('button#assocancel'),
		n = document.querySelector('button#assoaccept'),
		c;
function stringToHTML(str) {
								var parser = new DOMParser();
								var doc = parser.parseFromString(str, 'text/html');
								return doc.body;
								}
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
			var w =(q[k].getAttribute('data'));
			var textN = document.createTextNode(q[k].innerHTML);
			let aN = document.createElement("a");
			 aN.appendChild(textN);
			 aN.classList.add('dropdown-item');
			 aN.classList.add('font-italic');
			 aN.classList.add('text-light');
			 aN.setAttribute('data', w)
			  j.append(aN);
			}
	let h = document.querySelectorAll('div#parsedvendors a');
	h.forEach((i)=>{
	i.addEventListener("mouseover", ()=>{
		i.classList.add('bg-secondary');
	});
	i.addEventListener("mouseout", ()=>{
		i.classList.remove('bg-secondary');
		});
	i.addEventListener("click", ()=>{
		a.value = i.innerHTML;
		c		= i.getAttribute('data');
		j.setAttribute('hidden', '');
		rr();
				});
		});
	
			   }

function xz(v, s){
	if( !v.response.includes('name')){ 
										rr();
										b.innerHTML = (s.length === 0 ? 'Name cannot be empty': 'No Vendor Matched');
										b.classList.remove('text-success');
										b.classList.add('text-danger');
										f.onsubmit = (fp)=>{
											fp;
										}
										setTimeout(() => {
														 ba();
														}, 100);
											return;
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
																}
											
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
function nn(){
				var qm = new XMLHttpRequest();
				qm.onreadystatechange	=	()=>{
					if(qm.readyState === XMLHttpRequest.DONE && qm.status === 200){												
									 n.setAttribute('disabled', '');
									 document.querySelector('p#assn-status').innerHTML = 'Accepted';
													}
												}
				var om = `/user/vendor/associationaccept`;
				qm.open('POST', om, true);
				qm.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				qm.send();
				}
function mm(){
				var qn = new XMLHttpRequest();
				qn.onreadystatechange	=	()=>{
					if(qn.readyState === XMLHttpRequest.DONE && qn.status === 200){												
									  document.querySelector('div#associationsnip').remove();
															   f.removeAttribute('disabled');
															   a.removeAttribute('disabled');
													}
												}
				var o = `/user/vendor/disassociate`;
				qn.open('POST', o, true);
				qn.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				qn.send();
}
function ff(){
				
				var pf = new XMLHttpRequest();
				pf.onreadystatechange	=	()=>{
					if(pf.readyState === XMLHttpRequest.DONE && pf.status === 200){											
									  l.append(stringToHTML( pf.responseText).querySelector('div#associationsnip'));
									  									m = document.querySelector('a#assocancel');
																		m.onclick 	=	mm;	
																		f.setAttribute('disabled', '');
																		a.setAttribute('disabled', '');
													}
												}
				var o = `/user/vendor/${c}/associate`;
				pf.open('POST', o, true);
				pf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				pf.send();
				a.value = null;
				}
function aa(event){
  	let s = event.target.value;
	b.classList.remove('text-success')||b.classList.remove('text-danger');
	b.removeAttribute('hidden');
	b.innerHTML = 'Searching';
	
	if(s.length !== 0){
		 xy(s);
	}else{
		rr();
		setTimeout(() => {
						 b.setAttribute('hidden', '');
						 f.setAttribute('disabled', '');
						 j.setAttribute('hidden', '');
						 }, 300);
		}
 					}

a.oninput	=	aa;
f.onclick	=	ff;	
if(m){
		m.onclick 	=	mm;	
	}
	
if(n){
		n.onclick 	=	nn;	
		}
})();

