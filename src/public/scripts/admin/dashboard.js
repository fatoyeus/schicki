(function(){
let e = document.querySelectorAll('div#dropdowndiv');


e.forEach((ee)=>{
	let a = ee.querySelector('div#dashmod-bg');
	a.addEventListener("mouseover", ()=>{
		a.classList.add('bg-secondary');
		a.classList.add('mx-2');
		a.classList.add('my-2');
	});
	a.addEventListener("mouseout", ()=>{
		a.classList.remove('bg-secondary');
		a.classList.remove('mx-2');
		a.classList.remove('my-2');
	});
	
	let cb = a.querySelector('div a#dashexp');
	let cc = a.querySelectorAll('div a#launch_btn');
	
			
			cb.onclick = ()=>{
							if(cb.innerHTML === 'Expand'){
							cb.innerHTML = 'Collapse';
							
							}else{
							cb.innerHTML = 'Expand';
							
								}
							};
					
				

});

}());




