(function(){ 
	
let a = document.querySelectorAll('input'),
	b = document.querySelectorAll('span'),
	c = document.querySelector('form#profiledata'),
	g = document.querySelector('button#submitbtn');

function ca(){
					_i().checkallinputs(a, b, c, this.name, 'email', 'phone');
			}
a.forEach((w)=>{
				w.onchange		=	ca;
				})
})();

