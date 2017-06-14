import * as d3 from 'd3';
import math from './libs/math.min.js';
import * as main from '../main.js';
const colorMap = require('../json/colorHex.json'); 
const bigMap = require('../json/level3_blue_green.json');
//bigMap['三暈']['青緣綠地'].offsetColor[i]; // 大青
//逆時針內縮 順時針放大
var data = [
	[{
		x: 50,
		y: 50
	}, {
		x: 50,
		y: 100
	}, {
		x: 100,
		y: 100
	}, {
		x: 100,
		y: 50
	}],
];

let center = {x: null , y: null};
let bounding = {width: null , height: null};
var offset = 3; //line offset 
var _svg = d3.select('#svg_view')
	.append('svg')
	.attr({
		'width': 400,
		'height': 400,
		'id': 'svgCavas'
	});
var line = d3.svg.line()
	.x(function(d) {
		return d.x;
	})
	.y(function(d) {
		return d.y;
	}).interpolate('linear-closed');

_svg.append('path')
	.attr({
		'd': line(data[0]),
		'y': 0,
		'stroke': '#000',
		'stroke-width': '0px',
		'fill': 'none'
	});

export function saveSVG() {
	//get svg element.
	var svg = document.getElementById("svg");

	//get svg source.
	var serializer = new XMLSerializer();
	var source = serializer.serializeToString(svg);

	//add name spaces.
	if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
		source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
	}
	if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
		source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
	}

	//add xml declaration
	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

	//convert svg source to URI data scheme.
	var url = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(source);

	//set url value to a element's href attribute.
	var link = document.getElementById("link");
	link.href = url;
	link.download = 'save.svg';
	//you can download svg file by right click menu.

}


function computeNewNode(p1, p2, p3) {

	let vectorData = [{
		x: 0,
		y: 0
	}, {
		x: 0,
		y: 0
	}];
	let vectorP1P2 = computeVector(p1, p2);
	let vectorP2P3 = computeVector(p2, p3);
	vectorData[0] = computeCrossVector(vectorP1P2);
	vectorData[1] = computeCrossVector(vectorP2P3);

	let lineData = [], linePx, linePy, crossUnitVector;

	let _vectorP1P2 = new THREE.Vector2(vectorP1P2.x , vectorP1P2.y);
	let _vectorP2P3 = new THREE.Vector2(vectorP2P3.x , vectorP2P3.y);
	if (math.abs(_vectorP1P2.normalize().dot(_vectorP2P3.normalize()) -1) <= 0.00000001){
		linePx = p2.x + computeUnitVector(vectorData[0]).x * offset;
		linePy = p2.y + computeUnitVector(vectorData[0]).y * offset;
		lineData.push( linePx);
		lineData.push( linePy);
		return lineData;
		
	}

	//first point of line1
	linePx = p1.x + computeUnitVector(vectorData[0]).x * offset;
	linePy = p1.y + computeUnitVector(vectorData[0]).y * offset;
	lineData.push({
		x: linePx,
		y: linePy
	});
	//end point of line1
	linePx = p2.x + computeUnitVector(vectorData[0]).x * offset;
	linePy = p2.y + computeUnitVector(vectorData[0]).y * offset;
	lineData.push({
		x: linePx,
		y: linePy
	});
	//first point of line2
	linePx = p2.x + computeUnitVector(vectorData[1]).x * offset;
	linePy = p2.y + computeUnitVector(vectorData[1]).y * offset;
	lineData.push({
		x: linePx,
		y: linePy
	});
	//end point of line2
	linePx = p3.x + computeUnitVector(vectorData[1]).x * offset;
	linePy = p3.y + computeUnitVector(vectorData[1]).y * offset;
	lineData.push({
		x: linePx,
		y: linePy
	});
	//console.log(math.intersect([lineData[0].x, lineData[0].y], [lineData[1].x, lineData[1].y], [lineData[1].x, lineData[1].y], [lineData[2].x, lineData[2].y]));
	return math.intersect([lineData[0].x, lineData[0].y], [lineData[1].x, lineData[1].y], [lineData[2].x, lineData[2].y], [lineData[3].x, lineData[3].y]);

}

function createOffsetPoint() {
	let sourceData = data.length - 2,
		targetData = data.length - 1;
		

	if (data[sourceData].length < 2)
		console.log("node <= 2");
	
	else {

		data[targetData].push({
			x: computeNewNode(data[sourceData][data[sourceData].length - 1], data[sourceData][0], data[sourceData][1])[0],
			y: computeNewNode(data[sourceData][data[sourceData].length - 1], data[sourceData][0], data[sourceData][1])[1]
		});
		for (let i = 0; i < data[sourceData].length - 1; i++) {
			if ((i + 2) > data[sourceData].length - 1) {
				data[targetData].push({
					x: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][0])[0],
					y: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][0])[1]
				})
			} else {
				data[targetData].push({
					x: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][i + 2])[0],
					y: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][i + 2])[1]
				})
			}

		}

	}
	//
	// console.log("targetData = " + targetData);
	//restructureNode(data[targetData]);
}

function setBounding(){
	let max = {x : -Infinity  , y:-Infinity  };
	let min = {x:Infinity  , y:Infinity  };
	for(let i of data[0]){
		if(i.x < min.x)
			min.x = i.x;
		if(i.x > max.x)
			max.x = i.x;
		if(i.y < min.y)
			min.y = i.y;
		if(i.y > max.y)
			max.y = i.y;
	}

	bounding.width = max.x-min.x;
	bounding.height = max.y-min.y;
}
function setCenter(){
	let max = {x : -Infinity  , y:-Infinity  };
	let min = {x:Infinity  , y:Infinity  };
	for(let i of data[0]){
		if(i.x < min.x)
			min.x = i.x;
		if(i.x > max.x)
			max.x = i.x;
		if(i.y < min.y)
			min.y = i.y;
		if(i.y > max.y)
			max.y = i.y;
	}
	center.x = (max.x + min.x ) /2;
	center.y = (max.y + min.y) / 2;
}
 
export function getCenter(){
	if(center.x == null || center.y == null)
		setCenter();
	return center;
}

export function getBounding(){
	if(bounding.width == null || bounding.height == null)
		setBounding();
	return bounding;
}
function polygon_area(){
    let area = 0;
    let N = data[data.length-1].length;
    for (let i=0; i<data[data.length-1].length; ++i){
        area += data[data.length-1][i].x * data[data.length-1][(i+1)%N].y;
        area -= data[data.length-1][i].y * data[data.length-1][(i+1)%N].x;
    }
    console.log(math.abs(area) / 2);
}
function computeVector(p1, p2) {
	return {
		x: (p2.x - p1.x),
		y: (p2.y - p1.y)
	};
}

function computeCrossVector(p) {
	var temp = -p.x;
	p.x = p.y;
	p.y = temp;
	return p;
}

function computeUnitVector(p) {
	var v = {
		x: p.x,
		y: p.y
	};
	var length = Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
	v.x /= length;
	v.y /= length;
	return v;
}

function computeSlope(p1, p2) {
	return ((p2.y - p1.y) / (p2.x - p1.x));
}
//update()
function updateData() {

	_svg.selectAll("*").remove();
	let g = _svg.append('g').attr({
		'id':'group'
	});
	for (let i = 0; i < data.length; i++) {		
		g.append('path')
			.attr({
				'd': line(data[i]),
				'y': 0,
				'stroke': '#000',
				'stroke-width': '1px',
				'vector-effect':'non-scaling-stroke',
				'fill': '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
				// 'fill': 'rgb(255,0,0)'
			});
	}


}
export function realtimeRending(d) {
	
	polygon_area();
	offset = d;
	data.push([]);
	createOffsetPoint();
	updateData();

}

export function setData(svgVertices) {

	let arr = [];

	for (let i = 0; i < svgVertices.length; i++) {

		for (let j in svgVertices) {

			if (svgVertices[j].order == i + 1) {

				arr.push({
					x: svgVertices[j].svgPoint.x *200   ,
					y: svgVertices[j].svgPoint.y  *200 
					
				})
			}
		}
	}

	/*data[0] = arr;
	console.log(data);
	updateData();*/
	while(data.length != 0)
		data.pop();
	data.push(arr);
	setBounding();
	setCenter();
	console.log(data);
	
	updateData();
	let scale =  getDefaultScale();
	main.setSvgSize(scale, center);

}

function getDefaultScale(){
	
	let width = bounding.width;
	let height = bounding.height;

	const svgViewWidth = window.innerWidth / 2;
	const svgViewHeight = window.innerHeight;
	let scale = (svgViewWidth/width < svgViewHeight/height ) ? svgViewWidth/width:svgViewHeight/height
	//0.618黃金比例
	return scale*0.618 ;
}

////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
function updateData_test(){

	
	// _svg.selectAll("*").remove();
	// let g = _svg.append('g').attr({
	// 	'id':'group'
	// });
	// for (let i = 0; i < data.length; i++) {		
	// 	g.append('path')
	// 		.attr({
	// 			'd': line(data[i]),
	// 			'y': 0,
	// 			'stroke': colorMap[level3_blue_green.strokeColor[i]],
	// 			'stroke-width': level3_blue_green.offsetStroke[i]+'px',
	// 			'vector-effect':'non-scaling-stroke',
	// 			'fill': colorMap[level3_blue_green.offsetColor[i]] 
	// 		});
	// }
	_svg.selectAll("*").remove();
	let g = _svg.append('g').attr({
		'id':'group'
	});
	let style = bigMap['兩暈']['青緣綠地'];
	for (let i = 0; i < data.length; i++) {		
		g.append('path')
			.attr({
				'd': line(data[i]),
				'y': 0,
				'stroke': colorMap[style.strokeColor[i]],
				'stroke-width': style.offsetStroke[i]+'px',
				'vector-effect':'non-scaling-stroke',
				'fill': colorMap[style.offsetColor[i]] 
			});
	}
}
function realtimeRending_test(d) {
	let total = (bounding.width<bounding.height)?bounding.width:bounding.height;
	//polygon_area();
	//offset = d*total;
	offset = d;
	data.push([]);
	createOffsetPoint();
	updateData_test();
}
//return math.intersect([p0.x, p0.y], [p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y]);
function restructureNode(data){
	
	for(let i = 0; i <data.length; i++){

		let indexP0 = i;
		let indexP1 = indexP0+1;
		
		if((i+1 )>data.length-1)
			indexP1 -= data.length;
		let P0 = data[indexP0];
		let P1 = data[indexP1];

		for(let j = 0; j<data.length-3; j++){
			let IndexP2 = (indexP0 +2+j) % data.length;
			let indexP3 = (IndexP2 +1)    % data.length;
			
			let P2 = data[IndexP2];
			let P3 = data[indexP3];
			
			let crossNode = math.intersect([P0.x, P0.y], [P1.x, P1.y], [P2.x, P2.y], [P3.x, P3.y]);
			
			if(crossNode!= null && pointAtLineFunction(P0,P1,P2,P3,crossNode)){	
				
				const shouldRemove = (indexP3-indexP1+data.length)%data.length;
				if(shouldRemove > data.length/2){
				
					break;
				}
				data.splice(indexP1, shouldRemove);//remove
				let arr = {x: crossNode[0], y: crossNode[1]};
				data.splice(indexP1, 0,arr );//insert
				break;
			}
		}
	}
}

function inrange(a,b,x){[a,b]=minmax(a,b);return a<=x && x<=b;}

function minmax(a,b){return [math.min(a,b),math.max(a,b)];}

function pointAtLineFunction(p0, p1, p2 , p3 , point){
	//check point at line by distance
	let crossP = {x:point[0] , y:point[1]};
	// let distanceP0P1 = distance(p0, p1);
	// let distanceP2P3 = distance(p2, p3);	
	// if(math.abs(distanceP0P1 - distance(p0,crossP) - distance(p1, crossP)) <= 0.000001){
	// 	if(math.abs(distanceP2P3 - distance(p2,crossP) - distance(p3, crossP))<=0.000001){
	// 		return true;
	// 	}
	// }

	//check point at line by p0 p1 p2 p3 range
	let {abs}=math;
	let b1 = abs(p0.x-p1.x)>abs(p0.y-p1.y)?"x":"y";
	let b2 = abs(p2.x-p3.x)>abs(p2.y-p3.y)?"x":"y";
	return inrange(p0[b1],p1[b1],crossP[b1])&&inrange(p2[b2],p3[b2],crossP[b2]);
}
function distance(p1, p2){
	return math.sqrt(math.pow(p2.x-p1.x , 2) + math.pow(p2.y-p1.y , 2) );
}
export function autoDraw(){
	
	for(let i = 0; i < level3_blue_green.offsetDistance.length ; i ++){
		realtimeRending_test(level3_blue_green.offsetDistance[i]);
	}
}
export function w(){
	
	for(let i of data){
		restructureNode(i);
		//console.log(i.length);
	}
	updateData_test();
}
// json
let level3_blue_green = {offsetDistance :[0.5, 
						0.5, 
						0.5, 
						0.5, 
						0.4167,
						0.4167,
						0.4167,
						0.4167],

				offsetStroke :[1,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0],
				offsetColor :[ 	
						 "大青",
						"二青",
						"青華",
						"粉暈",
						"綠華",
						"三綠",
						"二綠",
						"大綠",
						"草汁壓深"
					],
				strokeColor:[
				'深朱壓心',
				'none',
				'none',
				'none',
				'none',
				'none',
				'none',
				'none',
				'none'
				]

			}