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
	offset : 0.5,
	defaultScale:200,
	wholeModel :function(){
		threejsView.showWholeModel();
	}
};
let svg  = {
	offset : 5,
	fix:false,
	scale :1,
	//yyhh:1,
	// get scale(){return svg.yygg;},
	// set scale(value){svg.yygg=value;},
	青綠疊兩暈:function(){
		offset.autoDraw();
	},
	gui:undefined
};
window.onload =  function(){
	// right gui - 3D
	let modelGUI = new dat.GUI();
	let controller = modelGUI.add( model, 'offset', 0.1,5 );
	controller.onFinishChange(function(value) {
		offset.realtimeRending(value);
		});
	modelGUI.add( model, 'defaultScale', 200,200 );		
	modelGUI.add( model, 'wholeModel' );


	// left gui - 2D
	let svgGUI = new dat.GUI({autoPlace:false});
	svg.gui = svgGUI;
	let scaleController = svgGUI.add( svg, 'scale', 1, 1000 );
	scaleController.onFinishChange(function(value){
		let center = offset.getCenter();
		document.getElementById('group').setAttribute('transform',
			 'translate(' + window.innerWidth / 4 + ',' + window.innerHeight / 2 +') '
			+ 'scale(' + value + ') '  + 'translate(' + -center.x + ',' + -center.y +')' );
		});

	let ggkkController = svgGUI.add( svg, 'fix');
	ggkkController.onFinishChange(function(v){
		offset.autoDraw();
		offset.w();
		});
	svgGUI.add(svg,'青綠疊兩暈');

	let style = svgGUI.domElement.style;

	Object.assign(style, {
		position: 'absolute',
		top: '0px',
		right: '50%'
	});

	document.getElementById('svg_view').appendChild(svgGUI.domElement);
}

export function setSvgSize(scale, center){
	svg.scale = scale;
	document.getElementById('group').setAttribute('transform',
		 'translate(' + window.innerWidth / 4 + ',' + window.innerHeight / 2 +') '
		+ 'scale(' + scale + ') '  + 'translate(' + -center.x + ',' + -center.y +')' );
	for (let slot of svg.gui.__controllers) {
	  slot.updateDisplay();
	}
}

