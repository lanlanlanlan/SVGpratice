import * as offset from './js/offset.js';
import * as threejsView from './js/threejsView.js';


threejsView.init();
threejsView.animate();


let model  = {
	offset : 0.5, // free offset 
	defaultScale:100,
	wholeModel :function(){
		threejsView.showWholeModel();
	},
	viewFit :function(){
		threejsView.viewFitModel();
	}
};
let svg  = {
	offset : 5,
	
	scale :1,
	//yyhh:1,
	// get scale(){return svg.yygg;},
	// set scale(value){svg.yygg=value;},

	"兩暈- 青緣綠地":function(){
		drawWithStyle('兩暈','青緣綠地')
	},
	"兩暈- 綠緣青地":function(){
		drawWithStyle('兩暈','綠緣青地')
	},
	"碾玉- 青緣綠地":function(){
		drawWithStyle('碾玉','青緣綠地')
	},
	"碾玉- 綠緣青地":function(){
		drawWithStyle('碾玉','綠緣青地')
	},
	"五彩- 綠緣青地":function(){
		drawWithStyle('五彩','綠緣青地')
	},
	"五彩- 紅緣綠地":function(){
		drawWithStyle('五彩','紅緣綠地')
	},
	"五彩- 青緣紅地":function(){
		drawWithStyle('五彩','青緣紅地')
	},
	"三暈- 青綠緣青地":function(){
		drawWithStyle('三暈','青綠緣青地')
	},
	"三暈- 綠青緣綠地":function(){
		drawWithStyle('三暈','綠青緣綠地')
	},
	"三暈- 綠紅緣綠地":function(){
		drawWithStyle('三暈','綠紅緣綠地')
	},
	"三暈- 青紅緣青地":function(){
		drawWithStyle('三暈','青紅緣青地')
	},
	"解綠- 青緣道":function(){
		drawWithStyle('解綠','青緣道')
	},
	"解綠- 綠緣道":function(){
		drawWithStyle('解綠','綠緣道')
	},
	"丹粉- 身內刷朱":function(){
		drawWithStyle('丹粉','身內刷朱')
	},
	"丹粉- 身內刷丹":function(){
		drawWithStyle('丹粉','身內刷丹')
	},
	"黃土- 身內刷土黃":function(){
		drawWithStyle('黃土','身內刷土黃')
	},
	"黃土- 解墨緣道":function(){
		drawWithStyle('黃土','解墨緣道')
	},
	saveSVG:function(){
		offset.saveSVG();
	},
	gui:undefined
};
function drawWithStyle(category, style){
	offset.clearSuperimposed();
		let superimposedStyle = [category, style];
		offset.autoDraw(superimposedStyle);
		drawWithScale(svg.scale);
}

window.onload =  function(){
	// right gui - 3D
	let modelGUI = new dat.GUI();
	// let controller = modelGUI.add( model, 'offset', 0.1,5 );
	// controller.onFinishChange(function(value) {
	// 	offset.realtimeRending(value);
	// 	});
	modelGUI.add( model, 'defaultScale', 200,200 );		
	modelGUI.add( model, 'wholeModel' );
	modelGUI.add( model, 'viewFit' );


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

	let folder = svgGUI.addFolder('SuperimposedStyle');
	folder.add(svg,'五彩- 綠緣青地');
	folder.add(svg,'五彩- 紅緣綠地');
	folder.add(svg,'五彩- 青緣紅地');
	folder.add(svg,'碾玉- 綠緣青地');
	folder.add(svg,'碾玉- 青緣綠地');
	folder.add(svg,'兩暈- 綠緣青地');
	folder.add(svg,'兩暈- 青緣綠地');
	folder.add(svg,'三暈- 綠青緣綠地');
	folder.add(svg,'三暈- 青綠緣青地');
	folder.add(svg,'三暈- 綠紅緣綠地');
	folder.add(svg,'三暈- 青紅緣青地');
	folder.add(svg,'解綠- 青緣道');
	folder.add(svg,'解綠- 綠緣道');
	folder.add(svg,'丹粉- 身內刷朱');
	folder.add(svg,'丹粉- 身內刷丹');
	folder.add(svg,'黃土- 身內刷土黃');
	folder.add(svg,'黃土- 解墨緣道');

	svgGUI.add(svg,'saveSVG');

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

function drawWithScale(scale){
	let center = offset.getCenter();
		document.getElementById('group').setAttribute('transform',
			 'translate(' + window.innerWidth / 4 + ',' + window.innerHeight / 2 +') '
			+ 'scale(' + scale + ') '  + 'translate(' + -center.x + ',' + -center.y +')' );

}