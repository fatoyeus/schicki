(function(){ 
	
var a = document.querySelectorAll('input'),
	b = document.querySelectorAll('span'),
	c = document.querySelector('form#profiledata'),
	g = document.querySelector('button#submitbtn');
/*
var a = document.querySelector('input#phone'),
	b = document.querySelector('input#email'),
	
	k = document.querySelector('form#profiledata');

function gg(){
	k.onsubmit = function (event){
	  event.preventDefault();
		}
}
function gh(){
	k.onsubmit = function (event){
		event;
		}
}
function ba(i, j){
	if(i == 222){
		document.querySelector(`span#${j}`).removeAttribute('hidden');
		return gg();
	}
	if(i == 220){
		document.querySelector(`span#${j}`).setAttribute('hidden', '');
		return gh();
	}
}
	
function ac(q, r){
	w = new XMLHttpRequest();
	w.onreadystatechange	=	function(){
		if(w.readyState === XMLHttpRequest.DONE){
			console.log(this);
			return ba(w.responseText, r);
		}
	}
	var v = `/${r}/search/${q}/check`;
	w.open('GET', v, true);
	w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	w.send();
}

function ab(e){
		return ac(e.target.value, this.name);
	}

/*	var vinput = {
		check	:  function(){
			
							},
				}; 
	function dd(){ 	
					if(b.value && a.value){
					 ac(b.value, 'email');
					 ac(a.value, 'phone');
					}
				}

	

*/
function ca(){
					_i().checkallinputs(a, b, c, this.name, 'email', 'phone');
			}
a.forEach((w)=>{
				w.onchange		=	ca;
				})
})();

