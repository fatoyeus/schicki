(function(){
	var mib		=	document.querySelector('a#manageitemsbtn'),
		nib		=	document.querySelector('a#newitembtn'),
		ivp		=	document.querySelector('div#inventoryplug'),
		spp		=	document.querySelector('div#spinnerplug');
		
/*	function newitem(){
						var	adit =	document.querySelector('form#addnewitem');
						var	sbtn =  document.querySelector('button#additem');
						if(adit){
									sbtn.onclick = (k)=>{
															console.log(k.target);
															k.preventDefault();
															psitm(k.target);
														}
								}

					} 
	document.onreadystatechange = function(){
		if(document.readyState === 'complete'){
			console.log('document is ready');
			newitem()
		}
		
	}
	function newadd(){
				var	adit =	document.querySelector('form#addnewitem');
				var	sbtn =  document.querySelector('button#additem');
						if(adit){
									sbtn.onclick = (k)=>{
															console.log(k.target);
															k.preventDefault();
															psitm(k.target);
														}
								}
			} */
	function mngitms(b){
		ivp.lastChild.remove();
		spp.removeAttribute('hidden');
		var c = new XMLHttpRequest();
		c.onreadystatechange = ()=>{
			if(c.readyState === XMLHttpRequest.DONE && c.status === 200){
																			spp.setAttribute('hidden', '');
																			ivp.append(c.responseXML.querySelector('div#listitemsdiv'));
																			var w = ivp.querySelectorAll('a#itemdetailsbtn');
																			w.forEach((r)=>{
																				r.onclick = (e)=>{
																					console.log(e.target.dataset.id);
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
		ivp.lastChild.remove();
		spp.removeAttribute('hidden');
		var f = new XMLHttpRequest();
		f.onreadystatechange = ()=>{
			if(f.readyState === XMLHttpRequest.DONE && f.status === 200){
																			spp.setAttribute('hidden', '');
																			ivp.append(f.responseXML.querySelector('div#additemdiv'));
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
		ivp.querySelector('form#addnewitem').setAttribute('hidden', ' ');
		spp.removeAttribute('hidden');
		var i = new XMLHttpRequest();
		i.onreadystatechange = ()=>{
			if(i.readyState === XMLHttpRequest.DONE && i.status === 200){
																			spp.setAttribute('hidden', '');
																			ivp.lastChild.remove();
																			ivp.append(i.responseXML.querySelector('div#listitemsdiv'));
																		
																			
			}
		}
		var j = `/inventory/${u.dataset.storeid}/storeitems/${u.dataset.inventoryid}/addnewitem`;
	//	var boundary = '------------------------------------------';
	//	boundary += Math.floor(Math.random()*78699);
	//	boundary += Math.floor(Math.random()*78899);
	//	boundary += Math.floor(Math.random()*90099);
		i.open('POST', j, true);
		i.setRequestHeader('Cache-Control', 'no-cache');
		i.responseType = "document";
		i.send(p);
	}
	function geitm(v){
		ivp.lastChild.remove();
		spp.removeAttribute('hidden');
		var g = new XMLHttpRequest();
		g.onreadystatechange = ()=>{
			if(g.readyState === XMLHttpRequest.DONE && g.status === 200 ){
																			spp.setAttribute('hidden', '');
																			ivp.append(g.responseXML.querySelector('div#detailitemdiv'));
			}
		}
		var k = `/products/${v}/itemdetails`
		g.open('GET', k, true);
		g.setRequestHeader('Cache-Control', 'no-cache');
		g.responseType = "document";
		g.send();
	}
	mib.addEventListener('click', (j)=>{
		mngitms(j.target);
	})
	nib.addEventListener('click', (e)=>{
		additms(e.target);
	})
	

}())