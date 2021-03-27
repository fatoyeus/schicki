(function(global){
 
 	let _i 				= function (){
	 								return new _i.init();
 							}
	var nameexists = "Already in use";
 	_i.prototype		= {
	checkallinputs 	: async function(z, y, v, r, ...names){ 
													console.log('this is r: '+ r );
													z.forEach((x)=>{
														 if(names.includes(x.name) && x.value.length > 0){
															 if(x.name === r){
															console.log('checking '+ x.value + ' for ' + x.name);															 			    this.checkvalue(x.value, x.name, y, v, x);
															 			}
															 		}
																});
												},
	checkvalue		: function(q, r, s, u, y){	
						var self = this;
										console.log('checkvalue called for ' + r);
										w = new XMLHttpRequest();
										w.onreadystatechange	=	function(){
											if(this.readyState === XMLHttpRequest.DONE){
												console.log(w.responseText);
											    self.checkstatus(w.responseText, r, s, u, y);
											}
										}
										var v = `/${r}/search/${q}/check`;
										w.open('GET', v, true);
										w.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
										w.send();
									},
	alertwarning	: function(s, t){
										console.log('alertwarning called for ' + t);
										s.forEach((u)=>{
													 if(u.id === t ){
														 u.innerHTML	=	nameexists;
													 }
												 });
									},
	removewarning	: function(o, p){
										console.log('removewarning called for ' + p);
										o.forEach((u)=>{
													 if(u.id === p ){
														 u.innerHTML	=	"";
													 }
												 });
									},
	stopsubmit		: function(m){
									console.log('stopsubmit called');
									m.onsubmit = function (event){
	  								event.preventDefault();
												}
									},
	allowsubmit		: function(l){
									console.log('allowsubmit called');
									l.onsubmit = function (event){
									event;
												}
									},
	addoutline		: function(c){
									c.classList.add('border-danger')
									},
	removeoutline	: function(d){
									d.classList.remove('border-danger')
									},
	checkstatus		: function(d, e, f, g, h){
									console.log('checkstatus called');
		 							if (d === ("true" || null)){
										this.alertwarning(f, e);
										this.stopsubmit(g);
										this.addoutline(h);
									}else if(d ==="false"){
										this.removewarning(f, e);
										this.allowsubmit(g);
										this.removeoutline(h);
									}
	 }

							};
	_i.init 			= function(){
	 								var self	=	this;
		  							}
	_i.init.prototype 	= _i.prototype;

	global._i 			= _i;
 
 }(window))