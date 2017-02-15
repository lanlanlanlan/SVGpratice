import * as offset from './js/offset.js';

//let offset = require('./js/offset.js');
let slide = document.getElementById("slide");
slide.onclick = function(event){
	offset.realtimeRending(event.target.value);
}
let saveSVG = document.getElementById("saveSVG");
saveSVG.onclick = offset.saveSVG();