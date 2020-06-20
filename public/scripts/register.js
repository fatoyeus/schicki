let p1 	 = document.querySelector('#pw1');
let p2 	 = document.querySelector('#pw2');

p1.oninput = c2;
p2.oninput = c1;

	
	function c2 (event){
						let y	 	=	document.querySelector('#pw2').value;
						let z	 	=	document.querySelector("form");

						let w		=	document.querySelectorAll('span#pwerror');
						if ( y !== event.target.value){
							w[1].removeAttribute('hidden');
							z.onsubmit = (e)=>{
								e.preventDefault();
									};
							}else if( y === event.target.value){
							w[1].setAttribute('hidden', '');
							z.onsubmit = (e)=>{
								e;
								}
							}
						};

function c1 (event){
					let y	=	document.querySelector('#pw1').value;
					let z	=	document.querySelector("form");
					let w	=	document.querySelectorAll('span#pwerror');
					if ( y !== event.target.value){
						w[1].removeAttribute('hidden');
						z.onsubmit = (e)=>{
							e.preventDefault();
								};
						}else if( y === event.target.value) {
						w[1].setAttribute('hidden', '');
						z.onsubmit = (e)=>{
							e;
								}
							}
						};