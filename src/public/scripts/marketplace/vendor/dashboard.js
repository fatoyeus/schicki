(function(){
	let z = document.querySelector('button#assocbutton');
//	let y = document.querySelector('');
//	let x = document.querySelector('');
	
	function qr (w){
	let p = new XMLHttpRequest();
	p.onreadystatechange	=	()=>{
		if(p.readyState === XMLHttpRequest.DONE){
			return p.responseText
		}
	}
	let o = `/vendor/${w}`;
	p.open('POST', o, true);
	p.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	p.send();
}
	function zz(){
		
		this.innerHTML = (this.innerHTML === 'Enable'? 'Disable': 'Enable');
		if(this.innerHTML === 'Enable'){
			qr('disassociation');
			this.classList.remove('btn-success');
			this.classList.add('btn-danger');
		}else{
			qr('association');
			this.classList.remove('btn-danger');
			this.classList.add('btn-success');
		}
	}
	
	z.onclick = zz;
}())