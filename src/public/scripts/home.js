let hpinput		 = document.querySelector("#sb_react");


hpinput.addEventListener("mouseover", ()=>{
		hpinput.classList.remove("border-dark");
		hpinput.classList.add("border-info", "shadow");
});

hpinput.addEventListener("mouseout", ()=>{
		hpinput.classList.remove("border-info", "shadow");
	    hpinput.classList.add("border-dark");
});

