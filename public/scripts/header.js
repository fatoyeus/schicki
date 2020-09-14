var a = document.querySelectorAll('div#dropMenu a');


a.forEach((a)=>{
	a.addEventListener("mouseover", ()=>{
		a.classList.add('bg-secondary');
	});
	a.addEventListener("mouseout", ()=>{
		a.classList.remove('bg-secondary');
	});
});

var b = document.querySelector('#navalign');
var c = document.querySelector('#brandmove');



if(!(document.title === 'schicki')){

	b.classList.remove("justify-content-end");
	c.removeAttribute('hidden');
	
}