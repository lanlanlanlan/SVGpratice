import * as offset from './js/offset.js';
import * as threejsView from './js/threejsView.js';


threejsView.init();
threejsView.animate();

/*
let slide = document.getElementById("slide");
slide.onclick = function(event){
	offset.realtimeRending(event.target.value);
}
let saveSVG = document.getElementById("saveSVG");
saveSVG.onclick = offset.saveSVG();
*/
let model  = {
	offset : 5,
	gg:100
};

window.onload =  function(){
	let gui = new dat.GUI();
	let controller =gui.add( model, 'offset', 0.1,5 );
	controller.onFinishChange(function(value) {
		offset.realtimeRending(value);
		});
	gui.add( model, 'gg', 1,5 );
}
