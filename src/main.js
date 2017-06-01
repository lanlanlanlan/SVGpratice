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
let threeD_model  = {
	offset : 5,
	gg:100
};
let twoD_model  = {
	offset : 5,
	ggkk:100,
	scale: 1
};
window.onload =  function(){
	// right gui - 3D
	let threeD_gui = new dat.GUI();
	let controller = threeD_gui.add( threeD_model, 'offset', 0.1,5 );
	controller.onFinishChange(function(value) {
		offset.realtimeRending(value);
		});
	threeD_gui.add( threeD_model, 'gg', 1,5 );

	// left gui - 2D
	let twoD_gui = new dat.GUI({autoPlace:false});
	let scaleController = twoD_gui.add( twoD_model, 'scale', 1, 1000 );
	scaleController.onFinishChange(function(value){
		let center = offset.getCenter();
		document.getElementById('group').setAttribute('transform',
			 'translate(' + window.innerWidth / 4 + ',' + window.innerHeight / 2 +') '
			+ 'scale(' + value + ') '  + 'translate(' + -center.x + ',' + -center.y +')' );
		});

	twoD_gui.add( twoD_model, 'ggkk', 1,5 );
	let style = twoD_gui.domElement.style;

	Object.assign(style, {
		position: 'absolute',
		top: '0px',
		right: '50%'
	});

	document.getElementById('svg_view').appendChild(twoD_gui.domElement);
}

