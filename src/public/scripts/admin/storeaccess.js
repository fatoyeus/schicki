(function(){
let a 	=	document.querySelector('div#allstores');
let e	=	document.querySelector('div#approvedstores');
let i	=	document.querySelector('div#unapprovedstores');
let o	=	document.querySelector('div#suspendedstores');
let u	=	document.querySelectorAll('div#form-id');

function l(b, c, f, g, h){
	let n	=	new XMLHttpRequest();
	n.onreadystatechange = ()=>{
			if(n.readyState === XMLHttpRequest.DONE){
		     b.innerHTML=n.responseText;
			 r(f, g);
			}
		}
	let d = `/admin/c8/store/${c}/${h}`;
	n.open('POST', d, true);
	n.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	n.send();
						} 
function r(v, y){
	let w  = v.querySelector('data#store-header').innerHTML;
	let s  = v.querySelector('button').innerHTML;
	let g  = v.querySelector('p#store-status').innerHTML;
	
	y.forEach((k)=>{
		let j  = k.querySelector('data#store-header').innerHTML;
		if(w === j && !v.isEqualNode(k)){
			k.querySelector('button').innerHTML = s;
			k.querySelector('p#store-status').innerHTML = g;
					  if(s==='Block'){
							if(v.parentNode === a){
								e.appendChild(k);
							}else if(v.parentNode !== a){
								e.appendChild(v);
							}
				}else if(s==='Unblock'){
					  		if(v.parentNode === a){
					   			o.appendChild(k);
							}else if(v.parentNode !== a){
								o.appendChild(v);
					}
				}
			}
		});
	
	return y;
				}
u.forEach((p)=>{
	let w 	=	p.querySelector('button');
	let f 	=	p.querySelector('p#store-status');
	let z	=	p.querySelector('data#store-header').getAttribute('value');
	w.onclick = function(){
								  if(w.innerHTML === 'Approve'){
									 w.innerHTML = 'Block';
									 f.innerHTML = 'Status: Approval In Process';
									 l(f, z, p, u, 'approve');
							}else if(w.innerHTML ===	'Block'){
									 w.innerHTML =	'Unblock';
									 f.innerHTML = 'Status: Block In Process';
									 l(f, z, p, u, 'block');
							}else if(w.innerHTML ===	'Unblock'){
									 w.innerHTML = 'Block';
									 f.innerHTML = 'Status: Unblock In Process';
									 l(f, z, p, u, 'unblock');
							}
						}
				});
}())