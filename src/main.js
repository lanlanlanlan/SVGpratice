import * as offset from './js/offset.js';
import * as threejsView from './js/threejsView.js';
//let offset = require('./js/offset.js');
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