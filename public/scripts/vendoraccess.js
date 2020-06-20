var a 	=	document.querySelector('div#allvendors');
let e	=	document.querySelector('div#approvedvendors');
let i	=	document.querySelector('div#unapprovedvendors');
let o	=	document.querySelector('div#suspendedvendors');
let u	=	document.querySelectorAll('div#form-id');

function l(b, c, f, g, h){
	n	=	new XMLHttpRequest();
	n.onreadystatechange = ()=>{
			if(n.readyState === XMLHttpRequest.DONE){
		     b.innerHTML=n.responseText;
			 r(f, g);
			}
		}
	var d = `/admin/c10/vendor/${c}/${h}`;
	n.open('POST', d, true);
	n.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	n.send();
} 
function r(v, y){
	let w  = v.querySelector('data#vendor-header').innerHTML;
	let s  = v.querySelector('button').innerHTML;
	let g  = v.querySelector('p#vendor-status').innerHTML;
	
	y.forEach((k)=>{
		let j  = k.querySelector('data#vendor-header').innerHTML;
		if(w === j && !v.isEqualNode(k)){
			k.querySelector('button').innerHTML = s;
			k.querySelector('p#vendor-status').innerHTML = g;
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
	var w 	=	p.querySelector('button');
	var f 	=	p.querySelector('p#vendor-status');
	var z	=	p.querySelector('data#vendor-header').getAttribute('value');
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