(function(){
	let mib		=	document.querySelector('a#manageitemsbtn'),
		nib		=	document.querySelector('a#newitembtn'),
		ivp		=	document.querySelector('div#inventoryplug'),
		spp		=	document.querySelector('div#spinnerplug');
	

	function mngitms(b){
		spp.removeAttribute('hidden');
		let c = new XMLHttpRequest();
		c.onreadystatechange = ()=>{
			if(c.readyState === XMLHttpRequest.DONE && c.status === 200){
																			
																			ivp.lastChild.remove();
																			ivp.append(c.responseXML.querySelector('div#listitemsdiv'));
																			spp.setAttribute('hidden', '');
																			let w = ivp.querySelectorAll('a#itemdetailsbtn');
																			w.forEach((r)=>{
																				r.onclick = (e)=>{
																					geitm(e.target.dataset.id);
																				}
																			})
			}
		}
		let d = `/inventory/${b.dataset.storeId}/storeitems/${b.dataset.id}/manageitems`;
		c.open('GET', d, true);
		c.setRequestHeader('Content-Type'	, 	'application/x-www-form-urlencoded');
		c.setRequestHeader('Cache-Control'	,	'no-cache');
		c.responseType = "document";
		c.send();
	}
	function additms(h){
		spp.removeAttribute('hidden');
		let f = new XMLHttpRequest();
		f.onreadystatechange = ()=>{
			if(f.readyState === XMLHttpRequest.DONE && f.status === 200){
																			ivp.lastChild.remove();
																			ivp.append(f.responseXML.querySelector('div#additemdiv'));
																			spp.setAttribute('hidden', '');
																			let z = ivp.querySelector('form#addnewitem');
																			let y = ivp.querySelector('button');
																			
																				if(z){
																					z.onsubmit = (event)=>{
																						event.preventDefault();
																						let x = new FormData(z);
																						psitm(x, y);
																						
																					}
																				}
																		 }
		}
		let g = `/inventory/${h.dataset.storeid}/storeitems/${h.dataset.id}/addnewitem`;
		
		f.open('GET', g, true);
		f.setRequestHeader(	'Content-Type'	, 	'multipart/form-data');
		f.setRequestHeader(	'Cache-Control'	,	'no-cache');
		f.responseType = "document";
		f.send();
	}
	
	function psitm(p, u){
		spp.removeAttribute('hidden');
		ivp.querySelector('form#addnewitem').setAttribute('hidden', ' ');
		let i = new XMLHttpRequest();
		i.onreadystatechange = ()=>{
			if(i.readyState === XMLHttpRequest.DONE && i.status === 200){
																			ivp.lastChild.remove();
																			ivp.append(i.responseXML.querySelector('div#listitemsdiv'));
																			spp.setAttribute('hidden', '');
			}
		}
		let j = `/inventory/${u.dataset.storeid}/storeitems/${u.dataset.inventoryid}/addnewitem`;
		i.open('POST', j, true);
		i.setRequestHeader('Cache-Control', 'no-cache');
		i.responseType = "document";
		i.send(p);
	}
	function geitm(v){		
		spp.removeAttribute('hidden');
		let g = new XMLHttpRequest();
		g.onreadystatechange = ()=>{
			if(g.readyState === XMLHttpRequest.DONE && g.status === 200 ){
																			ivp.lastChild.remove();
																			ivp.append(g.responseXML.querySelector('div#detailitemdiv'));
																			spp.setAttribute('hidden', '');
																			let w	= ivp.querySelector('button#edititem'),
																				t	= ivp.querySelector('button#imgdeletebtn'),
																				ax	= ivp.querySelector("div#modalcont");
																			if(w && t){
																				w.onclick = (event)=>{
																					editm(event.target.dataset.productid);
																				}
																				t.onclick = (event)=>{
																					delitm(event.target.dataset.productid, ax);
																				}
																			}
			}
		}
		let k = `/products/${v}/itemdetails`
		g.open('GET', k, true);
		g.setRequestHeader('Cache-Control', 'no-cache');
		g.responseType = "document";
		g.send();
	}
	function editm(s){
		spp.removeAttribute('hidden');
		let h = new XMLHttpRequest();
		h.onreadystatechange = ()=>{
			if(h.readyState === XMLHttpRequest.DONE && h.status === 200 ){
																			ivp.lastChild.remove();
																			ivp.append(h.responseXML.querySelector('div#edititemdiv'));
																			spp.setAttribute('hidden', '');
																			let u = ivp.querySelector("input#promobox"),
																				r = ivp.querySelector("label#promotion"),
																			    q = ivp.querySelector("input#discount"),
																				p = ivp.querySelector("form#additionalimg"),
																				n = ivp.querySelector("form#edititem"),
																				m = ivp.querySelector("button#cancelitemupdate"),
																				j = ivp.querySelector("div#modalcont"),
																				e = ivp.querySelector("div#modalspinnerplug");
																				
																				
																			if(u){
																					
																					u.oninput = (event)=>{
																					r.innerHTML = event.target.checked ? "Remove item from promotion" : "Put this item on promotion";
																	event.target.checked ? q.removeAttribute("disabled"): q.setAttribute("disabled", " "),q.setAttribute("value", 0);
																					}
																				}
																			if(p){
																					p.onsubmit = (event)=>{
																						event.preventDefault();
																						e.removeAttribute('hidden');
																						let o = new FormData(p);
																						addimg(o, s, j);
																					}
																				}
																			if(n){
																					n.onsubmit = (event)=>{
																						event.preventDefault();
																						let d = new FormData(n);
																						upditm(d, s);
																					}
																			}
																			if(m){
																					m.onclick = (event)=>{
																						geitm(event.target.dataset.productid);
																					}
																				}
																			
			}
		}
		let l = `/products/${s}/edititem`;
		h.open('GET', l, true);
		h.setRequestHeader('Cache-Control', 'no-cache');
		h.responseType = "document";
		h.send();
	}
	function addimg(v, u, t){
		let n = new XMLHttpRequest();
		n.onreadystatechange = ()=>{
			if(n.readyState === XMLHttpRequest.DONE && n.status === 200){
																			t.firstElementChild.remove();
																			t.append(n.responseXML.querySelector('div#modcont'));
																			t.onclick = ()=>{
																				editm(u);
																			}
																			
			}
		}
		let k = `/products/${u}/edititem/image`;
		n.open('POST', k, true);
		n.setRequestHeader('Cache-Control', 'no-cache');
		n.responseType = "document";
		n.send(v);
	}
	function upditm(c, i){
		let b = new XMLHttpRequest();
		b.onreadystatechange = ()=>{
			if(b.readyState === XMLHttpRequest.DONE && b.status === 200){
																			geitm(i)
			}
		}
		let a = `/products/${i}/updateitem`;
		b.open('POST', a, true);
		b.setRequestHeader('Cache-Control', 'no-cache');
		b.responseType = 'text';
		b.send(c);
	}
	function delitm(z, y){
		let az = new XMLHttpRequest();
		az.onreadystatechange = ()=>{
			if(az.readyState === XMLHttpRequest.DONE && az.status === 200){
																			y.firstElementChild.remove();
																			y.append(az.responseXML.querySelector('div#modcont'));
																			y.onclick = ()=>{
																				mngitms(mib);
																			}
			}
		}
		
		let ay = `/products/${z}/delete?_method=DELETE`
		az.open('POST', ay, true);
		az.setRequestHeader('Cache-Control', 'no-cache');
		az.responseType = 'document';
		az.send();
	}
	mib.addEventListener('click', (j)=>{
		mngitms(j.target);
	})
	nib.addEventListener('click', (e)=>{
		additms(e.target);
	})
	

}())