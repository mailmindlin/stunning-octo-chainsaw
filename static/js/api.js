class API {
	static set title(value) {
		document.getElementById('title').innerText = value;
	}
}
setTimeout(()=>{
	document.querySelector('view-timer').lanes= [{number:1}];
}, 1000);