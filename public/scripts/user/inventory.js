(function(){
	var mib		=	document.querySelector('a#manageitemsbtn'),
		nib		=	document.querySelector('a#newitembtn'),
		ivp		=	document.querySelector('div#inventoryplug'),
		spp		=	document.querySelector('div#spinnerplug');
	

	function mngitms(b){
		spp.removeAttribute('hidden');
		var c = new XMLHttpRequest();
		c.onreadystatechange = ()=>{
			if(c.readyState === XMLHttpRequest.DONE && c.status === 200){
																			
																			ivp.lastChild.remove();
																			ivp.append(c.responseXML.querySelector('div#listitemsdiv'));
																			spp.setAttribute('hidden', '');
																			var w = ivp.querySelectorAll('a#itemdetailsbtn');
																			w.forEach((r)=>{
																				r.onclick = (e)=>{
																					geitm(e.target.dataset.id);
																				}
																			})
			}
		}
		var d = `/inventory/${b.dataset.storeId}/storeitems/${b.dataset.id}/manageitems`;
		c.open('GET', d, true);
		c.setRequestHeader('Content-Type'	, 	'application/x-www-form-urlencoded');
		c.setRequestHeader('Cache-Control'	,	'no-cache');
		c.responseType = "document";
		c.send();
	}
	function additms(h){
		spp.removeAttribute('hidden');
		var f = new XMLHttpRequest();
		f.onreadystatechange = ()=>{
			if(f.readyState === XMLHttpRequest.DONE && f.status === 200){
																			ivp.lastChild.remove();
																			ivp.append(f.responseXML.querySelector('div#additemdiv'));
																			spp.setAttribute('hidden', '');
																			var z = ivp.querySelector('form#addnewitem');
																			var y = ivp.querySelector('button');
																			
																				if(z){
																					z.onsubmit = (event)=>{
																						event.preventDefault();
																						var x = new FormData(z);
																						psitm(x, y);
																						
																					}
																				}
																		 }
		}
		var g = `/inventory/${h.dataset.storeid}/storeitems/${h.dataset.id}/addnewitem`;
		
		f.open('GET', g, true);
		f.setRequestHeader(	'Content-Type'	, 	'multipart/form-data');
		f.setRequestHeader(	'Cache-Control'	,	'no-cache');
		f.responseType = "document";
		f.send();
	}
	
	function psitm(p, u){
		spp.removeAttribute('hidden');
		ivp.querySelector('form#addnewitem').setAttribute('hidden', ' ');
		var i = new XMLHttpRequest();
		i.onreadystatechange = ()=>{
			if(i.readyState === XMLHttpRequest.DONE && i.status === 200){
																			ivp.lastChild.remove();
																			ivp.append(i.responseXML.querySelector('div#listitemsdiv'));
																			spp.setAttribute('hidden', '');
			}
		}
		var j = `/inventory/${u.dataset.storeid}/storeitems/${u.dataset.inventoryid}/addnewitem`;
		i.open('POST', j, true);
		i.setRequestHeader('Cache-Control', 'no-cache');
		i.responseType = "document";
		i.send(p);
	}
	function geitm(v){		
		spp.removeAttribute('hidden');
		var g = new XMLHttpRequest();
		g.onreadystatechange = ()=>{
			if(g.readyState === XMLHttpRequest.DONE && g.status === 200 ){
																			ivp.lastChild.remove();
																			ivp.append(g.responseXML.querySelector('div#detailitemdiv'));
																			spp.setAttribute('hidden', '');
																			var w = ivp.querySelector('button#edititem');
																			var t = ivp.querySelector('button#deleteitem');
																			if(w && t){
																				w.onclick = (event)=>{
																					editm(event.target.dataset.productid);
																				}
																				t.onclick = (event)=>{
																					console.log(event.target.dataset.productid);
																				}
																			}
			}
		}
		var k = `/products/${v}/itemdetails`
		g.open('GET', k, true);
		g.setRequestHeader('Cache-Control', 'no-cache');
		g.responseType = "document";
		g.send();
	}
	function editm(s){
		spp.removeAttribute('hidden');
		var h = new XMLHttpRequest();
		h.onreadystatechange = ()=>{
			if(h.readyState === XMLHttpRequest.DONE && h.status === 200 ){
																			ivp.lastChild.remove();
																			ivp.append(h.responseXML.querySelector('div#edititemdiv'));
																			spp.setAttribute('hidden', '');
																			var u = ivp.querySelector("input#promobox"),
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
																						var o = new FormData(p);
																						addimg(o, s, j);
																					}
																				}
																			if(n){
																					n.onsubmit = (event)=>{
																						event.preventDefault();
																						var d = new FormData(n);
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
		var l = `/products/${s}/edititem`;
		h.open('GET', l, true);
		h.setRequestHeader('Cache-Control', 'no-cache');
		h.responseType = "document";
		h.send();
	}
	function addimg(v, u, t){
		var n = new XMLHttpRequest();
		n.onreadystatechange = ()=>{
			if(n.readyState === XMLHttpRequest.DONE && n.status === 200){
																			t.firstElementChild.remove();
																			t.append(n.responseXML.querySelector('div#modcont'));
																			t.onclick = ()=>{
																				geitm(u);
																			}
																			
			}
		}
		var k = `/products/${u}/edititem/image`;
		n.open('POST', k, true);
		n.setRequestHeader('Cache-Control', 'no-cache');
		n.responseType = "document";
		n.send(v);
	}
	function upditm(c, i){
		var b = new XMLHttpRequest();
		b.onreadystatechange = ()=>{
			if(b.readyState === XMLHttpRequest.DONE && b.status === 200){
																			geitm(i)
			}
		}
		var a = `/products/${i}/updateitem`;
		b.open('POST', a, true);
		b.setRequestHeader('Cache-Control', 'no-cache');
		b.responseType = 'text';
		b.send(c);
	}
	function delitm(z){
		var az = new XMLHttpRequest();
		az.onreadystatechange = ()=>{
			if(az.readyState === XMLHttpRequest.DONE && az.status === 200){
				
			}
		}
	}
	mib.addEventListener('click', (j)=>{
		mngitms(j.target);
	})
	nib.addEventListener('click', (e)=>{
		additms(e.target);
	})
	

}())