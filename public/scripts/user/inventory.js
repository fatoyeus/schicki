(function(){
	var mib		=	document.querySelector('a#manageitemsbtn'),
		nib		=	document.querySelector('a#newitembtn'),
		ivp		=	document.querySelector('div#inventoryplug'),
		spp		=	document.querySelector('div#spinnerplug');

	
	function mngitms(b){
		ivp.lastChild.remove();
		spp.removeAttribute('hidden');
		var c = new XMLHttpRequest();
		c.onreadystatechange = ()=>{
			if(c.readyState === XMLHttpRequest.DONE && c.status === 200){
																			spp.setAttribute('hidden', '');
																			ivp.append(c.responseXML.querySelector('div#listitemsdiv'));
				
			}
		}
		var d = `/inventory/${b.dataset.id}/manageitems`;
		c.open('GET', d, true);
		c.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		c.responseType = "document";
		c.send();
	}
	function additms(){
		ivp.lastChild.remove();
		spp.removeAttribute('hidden');
		var f = new XMLHttpRequest();
		f.onreadystatechange = ()=>{
			if(f.readyState === XMLHttpRequest.DONE && f.status === 200){
																			spp.setAttribute('hidden', '');
																			ivp.append(f.responseXML.querySelector('div#additemdiv'));
			   
			   }
		}
		var g = '/inventory/addnewitem';
		f.open('GET', g, true);
		f.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		f.responseType = "document";
		f.send();
	}
	
	mib.addEventListener('click', (e)=>{
		mngitms(e.target);
	})
	nib.addEventListener('click', (e)=>{
		additms();
	})

}())