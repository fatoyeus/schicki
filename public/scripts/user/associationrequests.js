(function(){
	var z = document.querySelectorAll('div#associateduser');
	
	
	/* function stringToHTML(str) {
								var parser = new DOMParser();
								var doc = parser.parseFromString(str, 'text/html');
								return doc.body;
								} */
	
	function ww(){
		var n = this.parentNode.parentNode.parentNode;
		var m = new XMLHttpRequest();
				m.onreadystatechange	=	()=>{
												if(m.readyState === XMLHttpRequest.DONE && m.status === 200){												
																											n.remove();
																											}
													}
																	var o = `/vendor/user/${this.firstChild.value}/association/admit`;
																	m.open('POST', o, true);
																	m.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
																	m.send();
		
					}
	function xx(){
		var p = this.parentNode.parentNode.parentNode;
		var v = new XMLHttpRequest();
				v.onreadystatechange	=	()=>{
												if(v.readyState === XMLHttpRequest.DONE && v.status === 200){												
																											p.remove();
																											}
													}
																	var o = `/vendor/user/${this.firstChild.value}/association/reject`;
																	v.open('POST', o, true);
																	v.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
																	v.send();
		
		
					}
	function yy(){
		var q = this.parentNode.parentNode;
		this.parentNode.remove();
		var w = new XMLHttpRequest();
				w.onreadystatechange	=	()=>{
													if(w.readyState === XMLHttpRequest.DONE && w.status === 200){												
																													q.append( w.responseXML.querySelector('div#btn-snip'));
																													var r = q.querySelector('button#assodis');
																													if(r){
																															r.onclick = xx;
																														}
																												}
												}
																	var o = `/vendor/user/${this.firstChild.value}/association/accept`;
																	w.open('POST', o, true);
																	w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
																	w.responseType = "document";
																	w.send();
					}
	z.forEach((x)=>{
		var t = x.querySelector('button#assoaccept');
		if(t){
			t.onclick = yy;
			}
		var s = x.querySelector('button#assocancel');
		if(s){
			s.onclick = xx;
			}
		var r = x.querySelector('button#assodis');
		if(r){
			r.onclick = xx;
		}
		var l = x.querySelector('button#assoadm');
		if(l){
			l.onclick = ww;
		}
	})
}())
