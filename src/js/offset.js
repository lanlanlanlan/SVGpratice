import * as d3 from 'd3';
import math from './libs/math.min.js';

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

function polygon_area()
{
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
				'stroke-width': '0px',
				'fill': '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
			});
	}


}
export function realtimeRending(d) {
	//setBoundingBox();
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
	setCenter();
	console.log(data);
	//setBoundingBox();
	updateData();

}