(function(){
	var z = document.querySelectorAll('div#associateduser');
	
	
	function stringToHTML(str) {
								var parser = new DOMParser();
								var doc = parser.parseFromString(str, 'text/html');
								return doc.body;
								}
	
	function yy(){
		var q = this.parentNode.parentNode;
		this.parentNode.remove();
		var w = new XMLHttpRequest();
				w.onreadystatechange	=	()=>{
				if(w.readyState === XMLHttpRequest.DONE && w.status === 200){												
				q.append(stringToHTML( w.responseText).querySelector('div#btn-snip'));
			
													}
												}
				var o = `/vendor/user/${this.firstChild.value}/association/accept`;
				w.open('POST', o, true);
				w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				w.send();
	}
	function xx(){
		var r = this.parentNode.parentNode;
		this.parentNode.remove()
		console.log(r);
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
	})
/*	console.log('script loaded');
	
		var z = document.querySelectorAll('button#assoaccept');
		var y = document.querySelectorAll('button#assocancel');
	function zz(){
		var d = this.querySelector('data#user_accept_id').value;
		console.log(d);
	}
	function yy(){
		var e = this.querySelector('data#user_reject_id').value;
		console.log(e);
	}
	
	z.forEach((a)=>{
		a.onclick = zz;
	});
	y.forEach((b)=>{
		b.onclick = yy;
	});
	*/
}())
