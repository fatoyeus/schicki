(function(){
	let z = document.querySelectorAll('div#associateduser');
	
	
	
	function ww(){
		let n = this.parentNode.parentNode.parentNode;
		let m = new XMLHttpRequest();
				m.onreadystatechange	=	()=>{
												if(m.readyState === XMLHttpRequest.DONE && m.status === 200){												
																											n.remove();
																											}
													}
																	let o = `/vendor/user/${this.firstChild.value}/association/admit`;
																	m.open('POST', o, true);
																	m.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
																	m.send();
		
					}
	function xx(){
		let p = this.parentNode.parentNode.parentNode;
		let v = new XMLHttpRequest();
				v.onreadystatechange	=	()=>{
													if(v.readyState === XMLHttpRequest.DONE && v.status === 200){												
																													p.remove();
																												}
													}
																	let o = `/vendor/user/${this.firstChild.value}/association/reject`;
																	v.open('POST', o, true);
																	v.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
																	v.send();
		
		
					}
	function yy(){
		let q = this.parentNode.parentNode;
		this.parentNode.remove();
		let w = new XMLHttpRequest();
				w.onreadystatechange	=	()=>{
													if(w.readyState === XMLHttpRequest.DONE && w.status === 200){												
																													q.append( w.responseXML.querySelector('div#btn-snip'));
																													let r = q.querySelector('button#assodis');
																													if(r){
																															r.onclick = xx;
																														}
																												}
												}
																	let o = `/vendor/user/${this.firstChild.value}/association/accept`;
																	w.open('POST', o, true);
																	w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
																	w.responseType = "document";
																	w.send();
					}
	z.forEach((x)=>{
		let t = x.querySelector('button#assoaccept');
		if(t){
			t.onclick = yy;
			}
		let s = x.querySelector('button#assocancel');
		if(s){
			s.onclick = xx;
			}
		let r = x.querySelector('button#assodis');
		if(r){
			r.onclick = xx;
		}
		let l = x.querySelector('button#assoadm');
		if(l){
			l.onclick = ww;
		}
	})
}())
