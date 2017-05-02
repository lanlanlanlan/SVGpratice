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
let boundingBox = {oldSharp:{width:null, height:null},
		newSharp:{width:null, height:null} };
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
		'stroke-width': '1px',
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
	vectorData[0] = computeCrossVector(computeVector(p1, p2));
	vectorData[1] = computeCrossVector(computeVector(p2, p3));

	let lineData = [],
		linePx, linePy;

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

function setBoundingBox(){
	let maximumX =  data[data.length-1][0].x; 
	let minimumX =  data[data.length-1][0].x;
	let maximumY =  data[data.length-1][0].y;
	let minimumY =  data[data.length-1][0].y;


	for(let i = 1; i < data[data.length-1].length ; i++ ){
		if(maximumX <= data[data.length-1][ i ].x)
			maximumX = data[data.length-1][ i ].x;
		if(minimumX >= data[data.length-1][ i ].x)
			minimumX = data[data.length-1][ i ].x;
		if(maximumY <= data[data.length-1][ i ].y)
			maximumY = data[data.length-1][ i ].y;
		if(minimumY >= data[data.length-1][ i ].y)
			minimumY = data[data.length-1][ i ].y;
	
	}

	if(data.length == 1){
		boundingBox.newSharp.width = maximumX - minimumX;
		boundingBox.newSharp.height = maximumY - minimumY;
		
	}
	else {
		boundingBox.oldSharp.width = boundingBox.newSharp.width;
		boundingBox.oldSharp.height = boundingBox.newSharp.height;

		boundingBox.newSharp.width = maximumX - minimumX;
		boundingBox.newSharp.height = maximumY - minimumY;
	}
	
	console.log("maximumX=" + maximumX);
	console.log("maximumY=" + maximumY);
	console.log("minimumX=" + minimumX);
	console.log("minimumY=" + minimumY);
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
	for (let i = 0; i < data.length; i++) {
		_svg.append('path')
			.attr({
				'd': line(data[i]),
				'y': 0,
				'stroke': '#000',
				'stroke-width': '1px',
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
					x: svgVertices[j].svgPoint.x * 100 + window.innerWidth / 4,
					y: svgVertices[j].svgPoint.y * 100 + window.innerHeight / 2
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
	console.log(data);
	setBoundingBox();
	updateData();

}