(function(){
	var mib		=	document.querySelector('a#manageitemsbtn'),
		nib		=	document.querySelector('a#newitembtn');
	
	function mngitms(b){
		var c = new XMLHttpRequest();
		c.onreadystatechange = ()=>{
			if(c.readyState === XMLHttpRequest.DONE && c.status === 200){
				
			}
		}
		var d = `/inventory/${b.dataset.id}/manageitems`
		c.open('GET', d, true);
		c.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		c.responseType = "document";
		c.send();
	}
	
	mib.addEventListener('click', (e)=>{
		mngitms(e.target);
	})

}())