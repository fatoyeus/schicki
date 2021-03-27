(function(){
	var ah = document.querySelectorAll('div#dropMenu a');

ah.forEach((a)=>{
	a.addEventListener("mouseover", ()=>{
		a.classList.add('bg-secondary');
	});
	a.addEventListener("mouseout", ()=>{
		a.classList.remove('bg-secondary');
	});
});

var bh = document.querySelector('#navalign');
var ch = document.querySelector('#brandmove');



if(!(document.title === 'schicki')){

	bh.classList.remove("justify-content-end");
	ch.removeAttribute('hidden');
	}
}());