import * as d3 from 'd3';
import math from './libs/math.min.js';
import * as main from '../main.js';
import * as blob from './libs/blob.js';
// import * as inside from 'point-in-polygon';
const colorMap = require('../json/colorHex.json'); 
const styleMap = require('../json/superimposedStyle.json');
var inside = require('point-in-polygon');
//styleMap['三暈']['青緣綠地'].offsetColor[i]; // 大青
//逆時針內縮 順時針放大
var data = [
	[/*{
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
	}*/],
];


let NOToffsetLines =[] , selectedEdge =[];
let _lastNOToffsetLines ;
let changeList = [];
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

// _svg.append('path')
// 	.attr({
// 		'd': line(data[0]),
// 		'y': 0,
// 		'stroke': '#000',
// 		'stroke-width': '5px',
// 		'fill': 'none',
// 	});
let g = _svg.append('g').attr({
		'id':'group'
	});
for(let i = 0;  i< data[0].length;i++){
	let  u = [data[0][i], data[0][(i+1)%data[0].length]];
g.append('path')
	.attr({
		'd': line(u),
		'y': 0,
		'stroke': '#000',
		'stroke-width': '5px',
		'fill': 'none',
		'id':'path' + i
	});
}
 d3.selectAll('path')
		.on("dblclick", handleMouseDblClick)
		.on( "click", handleMouseClick )
		


 function handleMouseDblClick(){
	d3.select(this).attr({
	              stroke: "red",
	        
	            });
	let indexP1 = Number(this.id.slice(4));
	let indexP2 = (indexP1+1)%data[0].length;
	let P1 = data[0][indexP1];
	let P2 = data[0][indexP2];
	let L1 =[P1, P2];

	
	for(let i = 0 ; i <NOToffsetLines.length;i++){
		let L2 = NOToffsetLines[i];
		if(sameLine(L1, L2))
			NOToffsetLines.splice(i,1);			
	}
	
	console.log(NOToffsetLines);
	selectedEdge = NOToffsetLines.slice();
 }
 function handleMouseClick() {  //雙及包含單及,及連續執行兩次

            d3.select(this).attr({
              stroke: "orange",
        
            });
      	let indexP1 = Number(this.id.slice(4));
	let indexP2 = (indexP1+1)%data[0].length;
	let P1 = data[0][indexP1];
	let P2 = data[0][indexP2];
	let L1 =[P1, P2];
	let exist=false;
	for(let i = 0 ; i <NOToffsetLines.length;i++){
		let L2 = NOToffsetLines[i];
		if(sameLine(L1, L2))
			exist=true;			
	}
	if(!exist)
		NOToffsetLines.push(L1);
	console.log(NOToffsetLines);
	selectedEdge = NOToffsetLines.slice();
 }
function sameLine(L1, L2){
	return samePoint(L1[0], L2[0]) && samePoint(L1[1], L2[1]); 
}
function samePoint(p1, p2){
	// let sx = math.abs(p1.x-p2.x)<=0.0000001;
	// let sy = math.abs(p1.y-p2.y)<=0.0000001;
	// return sx&&sy;
	return (p1.x==p2.x&&p1.y==p2.y);
}
export function saveSVG() {
	//get svg element.
	var svg = document.getElementById("svgCavas");

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

	//you can download svg file
	let html = d3.select('#svgCavas').node().parentNode.innerHTML;
 	let blob = new Blob([html], {type: "image/svg+xml"});
 	
   
    	let saveData = (function () {
		let a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		return function (data, fileName) {
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
			};
		}());

	saveData(blob, "superimposed halo.svg");
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

	let lineData = [], linePx, linePy, crossUnitVector,crossP;

	function handlePointsRelation(){
		let _lineData=[];
		//vectors dot = 1
		let _vectorP1P2 = new THREE.Vector2(vectorP1P2.x , vectorP1P2.y);
		let _vectorP2P3 = new THREE.Vector2(vectorP2P3.x , vectorP2P3.y);
		if (math.abs(_vectorP1P2.normalize().dot(_vectorP2P3.normalize()) -1) <= 0.00000001){
			linePx = p2.x + computeUnitVector(vectorData[0]).x * offset;
			linePy = p2.y + computeUnitVector(vectorData[0]).y * offset;
			_lineData.push( linePx);
			_lineData.push( linePy);
			return _lineData;
			
		}
		//vectors dot = -1
		else if (math.abs(_vectorP1P2.normalize().dot(_vectorP2P3.normalize()) + 1) <= 0.00000001){
			linePx = p2.x - computeUnitVector(vectorData[0]).x * offset;
			linePy = p2.y - computeUnitVector(vectorData[0]).y * offset;
			_lineData.push( linePx);
			_lineData.push( linePy);
			return _lineData;
			
		}
		return null;
	}
	function setLineData(){
		lineData = [];
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
	}
	
	///////////////////////////////////////////////////
	let L1 = [p1, p2];
	let L2 = [p2, p3];
	let exist = [false,false];
	for(let i of NOToffsetLines){
		if(sameLine(i,L1))
			exist[0] = true;
		else if(sameLine(i,L2))
			exist[1] = true; 
	}
	// if(samePoint(NOToffsetLines[0][0], p2) || samePoint(NOToffsetLines[0][1], p3))
	// 	console.log("Line2-stop");
	// if(samePoint(NOToffsetLines[0][0], p1) || samePoint(NOToffsetLines[0][1], p2))
	// 	console.log("Line1-stop");
	setLineData();
	if(exist[0] && exist[1])
		return [p2.x, p2.y];
	else if(exist[0]){
		crossP = math.intersect([p1.x, p1.y], [p2.x, p2.y],  [lineData[2].x, lineData[2].y], [lineData[3].x, lineData[3].y]);
		
		if(crossP!= null)
			changeList.push({old:p2, new:{x:crossP[0],y:crossP[1]}});
		else
			console.log("exist[0] null");
		// if(handlePointsRelation()!=null)
		// 	crossP =handlePointsRelation();
	}
	else if(exist[1]){
		crossP = math.intersect([lineData[0].x, lineData[0].y], [lineData[1].x, lineData[1].y] ,[p2.x, p2.y], [p3.x, p3.y]);
		
		if(crossP!=null)
			changeList.push({old:p2, new:{x:crossP[0],y:crossP[1]}});
		else
			console.log("exist[1] null");
		// if(handlePointsRelation()!=null)
		// 	crossP =handlePointsRelation();
	}
	else{
		if(handlePointsRelation()==null){
			// setLineData();
			crossP = math.intersect([lineData[0].x, lineData[0].y], [lineData[1].x, lineData[1].y], [lineData[2].x, lineData[2].y], [lineData[3].x, lineData[3].y]);
		}
		else
			crossP = handlePointsRelation();
		//changeList.push({old:p2, new:{x:crossP[0],y:crossP[1]}});			
	}

	if(crossP == null && exist[0]){
		console.log("computeNewNode-null"); // 三點共線導致null
		crossP = [p2.x,p2.y];
		NOToffsetLines.push([ p2,p3] );
	}
	else if(crossP == null && exist[1]){
		console.log("computeNewNode-null"); // 三點共線導致null
		// crossP = [p2.x, p2.y];
		// NOToffsetLines.push([p1 ,p2] );
		let _target = data[data.length-1];
		let index = _target.length -1;
		crossP = math.intersect([_target[index].x, _target[index].y] , [_target[index-1].x , _target[index-1].y] , [p2.x, p2.y], [p3.x, p3.y]);  
			changeList.push({old:p2, new:{x:crossP[0],y:crossP[1]}});
		
		
	}
	if(isNaN(crossP[0]) && !crossP )
		console.log("computeNewNode - stop"); 
	return crossP;


}


function createOffsetPoint(superimposedStyle) {
	function handleLineTooShort(){
		//short than offset
		let tooShort = false, q, j, k;
		let _temData =[],crossP;
		for(let i = 0 ; i< _data.length ; i++){
			if(i== 0)
				q = _data.length-1 ;
			else
				q = i-1;
			j = (i+1)%_data.length;
			k = (j+1)%_data.length; 

			_temData.push(_data[i]);
			
			if(distance(_data[i], _data[j])<  offset ){
				crossP = math.intersect([_data[q].x,_data[q].y],[_data[i].x,_data[i].y],[_data[j].x,_data[j].y],[_data[k].x,_data[k].y]);
				if(isNaN(crossP[0]) ||  isNaN(crossP[1]) || !crossP)
					break;
				if(pointAtLineFunctionOR(_data[q],_data[i],_data[j],_data[k],crossP) ){
					_temData.pop();
					_temData.push({x:crossP[0],y:crossP[1]});
					
				}
				
			}
			
		}
		_data = _temData;
	}
	function handleTargetDataOffset(_sourceData){
			if (data[sourceData].length < 2){
				console.log("node <= 2");
				return;
			}
			
			else {
				let newP = computeNewNode(_sourceData[data[sourceData].length - 1], _sourceData[0], _sourceData[1]);
				data[targetData].push({
					x: newP[0],
					y: newP[1]
				});
				for (let i = 0; i < data[sourceData].length - 1; i++) {
					if ((i + 2) > data[sourceData].length - 1) 
						newP = computeNewNode(_sourceData[i], _sourceData[i + 1], _sourceData[0]);	
					else
						newP = computeNewNode(_sourceData[i], _sourceData[i + 1], _sourceData[i + 2]);
					if(isNaN(newP[0]) && !newP )
						console.log("handleTargetDataOffset-stop");
					data[targetData].push({
							x: newP[0],
							y: newP[1]
						})

				}

			}
	}
	function handleOverLap(){
		let q ,j, k,crossP;
		_data = data[targetData];
		for(let n = 0 ; n <  _data.length ; n++){
			if(pointOverlapLastSharp(_data[n], offset ,data[sourceData])){
				
				q = (n -1)<0 ? (_data.length-1) : (n-1);
				j = (n+1) % _data.length;
				k = (j+1) % _data.length;
				crossP = math.intersect([_data[q].x,_data[q].y],[_data[n].x,_data[n].y],[_data[j].x,_data[j].y],[_data[k].x,_data[k].y]);
				if(crossP!= null){
					if(pointAtLineFunctionOR(_data[q],_data[n],_data[j],_data[k],crossP) ){
						
						let _p = {x:crossP[0], y:crossP[1]};
						if(pointOverlapLastSharp(_p, offset ,data[sourceData]) ){
							console.log("case3");//交點仍然overlap
							let m = (q-1)<0 ? (_data.length-1) : (q-1);
							crossP = math.intersect([_data[m].x,_data[m].y],[_data[q].x,_data[q].y],[_data[n].x,_data[n].y],[_data[j].x,_data[j].y]);
						
						}
						else
							console.log("case1");
						_data[n] = { x: crossP[0], y:crossP[1]};

						console.log(_data[n]);
						
					}
					else if (!pointAtLineFunction(_data[q],_data[n],_data[j],_data[k],crossP)){
						let m = (q-1)<0 ? (_data.length-1) : (q-1);
						crossP = math.intersect([_data[m].x,_data[m].y],[_data[q].x,_data[q].y],[_data[n].x,_data[n].y],[_data[j].x,_data[j].y]);
						if(crossP!= null && !pointAtLineFunction(_data[q],_data[n],_data[j],_data[k],crossP)){
							_data[n] = { x: crossP[0], y:crossP[1]};
						console.log("case2");
						console.log(_data[n]);
						}	
						
					}
				}
			
			}
		}
	}
	
	let sourceData = data.length - 2,
		targetData = data.length - 1;
	let _data = data[sourceData];


	// if(superimposedStyle[0] =="解綠" || superimposedStyle[0] =="丹粉" || superimposedStyle[0] =="黃土")
	// 	_data = data[sourceData];
	// else
	// 	handleLineTooShort();

	handleTargetDataOffset(_data);

	_lastNOToffsetLines = NOToffsetLines.slice();
	//////////
	// NOToffsetLines = NOToffsetLines.map(v=>v.map(p => changeList.find(x =>samePoint(x.old, p)) ? changeList.find(x =>samePoint(x.old, p)).new :p));
	NOToffsetLines = NOToffsetLines.map(updateOffsetPoint);
	function updateOffsetPoint(line) {
		return line.map(p => changeList.find(x =>samePoint(x.old, p)) ? changeList.find(x =>samePoint(x.old, p)).new :p);
	}
	// console.log("NOT=");
	// console.log(NOToffsetLines);
	console.log("changeList=");
	console.log(changeList);
	
	
	
	restructureNode(data[targetData]);
	console.log(data);
	handleOverLap();
	
	
}
function transferToInsideFormate(sourceData){
	let _data = [];
	for(let i of sourceData){
		_data.push([i.x, i.y]);
	}
	return _data;
}
function pointOverlapLastSharp(point, r ,lastData){
	let A, B, C;
	//point =X3,y3
	//p1 = x1,y1;
	//p2 =x2,y2
	let p1,p2,delta, p3;
	let _data = transferToInsideFormate(lastData);
	for(let i = 0; i <lastData.length ; i++){
		p1 = lastData[ i ];
		p2 = lastData[ (i+1)%lastData.length ];
		let _overlap = false;
		for(let n of _lastNOToffsetLines){
			if(sameLine([p1, p2] ,n) && (inside([point.x , point.y], _data)|| handleAlmostInside() ) ){ // find why return false,sholud be true
				_overlap = true;
				console.log("DO NOT OVERLAP");
				break;
			}
		}
		if(_overlap)
			continue;
		// if(sameLine([p1, p2] ,_lastNOToffsetLines[0]) && (inside([point.x , point.y], _data)|| handleAlmostInside() ) ){ // find why return false,sholud be true
		// 	console.log("DO NOT OVERLAP");
		// 	continue;
		// }
		A = math.pow(( p2.x - p1.x), 2) + math.pow(( p2.y-p1.y), 2);
		B = 2*( ( p2.x-p1.x) *( p1.x-point.x) + ( p2.y-p1.y) *( p1.y - point.y)) ;
		C = math.pow(point.x, 2) + math.pow(point.y, 2) + math.pow(p1.x, 2)+ math.pow(p1.y, 2) 
			- 2*( point.x*p1.x + point.y*p1.y) - math.pow(r, 2);
		delta = math.pow(B, 2) - 4*A*C;
		if(delta > 0.1){
			let u1 = (-B+math.sqrt( delta)) / (2*A);
			let u2 = (-B -math.sqrt( delta)) / (2*A);
			if(u1<=1 && u1 >= 0 && u2<=1 && u2 >=0 )
				return true;

		} 
	}
	return false;

	function handleAlmostInside(){
		let vectorP1P2 = computeVector(p1, p2);
		let vectorPointP2 = computeVector(point, p2);
		let _vectorP1P2 = new THREE.Vector2(vectorP1P2.x , vectorP1P2.y);
		let _vectorPointP3 = new THREE.Vector2(vectorPointP2.x , vectorPointP2.y);
		if (math.abs(_vectorP1P2.normalize().dot(_vectorPointP3.normalize()) -1) <= 0.00000001){
			return true;
		}
		return false;
	}
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
	// for (let i = 0; i < data.length; i++) {		
	// 	g.append('path')
	// 		.attr({
	// 			'd': line(data[i]),
	// 			'y': 0,
	// 			'stroke': '#000',
	// 			'stroke-width': '1px',
	// 			'vector-effect':'non-scaling-stroke',
	// 			'fill': '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
	// 			// 'fill': 'rgb(255,0,0)'
	// 		});
	// }
	for(let i = 0;  i< data[0].length;i++){
		let  u = [data[0][i], data[0][(i+1)%data[0].length]];
		g.append('path')
			.attr({
				'd': line(u),
				'y': 0,
				'stroke': '#000',
				'stroke-width': '1px',
				'fill': 'none',
				'id':'path' + i
			});
	}
d3.selectAll('path')
		.on("dblclick", handleMouseDblClick)
		.on( "click", handleMouseClick )
		

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
					x: svgVertices[j].svgPoint.x *100   ,
					y: svgVertices[j].svgPoint.y  *100 
				})
			}
		}
	}

	
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
function updateData_test(superimposedStyle){

	
	
	_svg.selectAll("*").remove();
	let g = _svg.append('g').attr({
		'id':'group'
	});
	// let style = styleMap['兩暈']['青緣綠地'];
	let style = styleMap[ superimposedStyle[0] ][ superimposedStyle[1] ];
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

function realtimeRending_test(d, superimposedStyle) {
	let total = (bounding.width<bounding.height)?bounding.width:bounding.height;
	//polygon_area();
	offset = d*total/15;
	 offset = d* 0.9090916315714518;//從令拱換算
	 // offset = d;
	data.push([]);
	createOffsetPoint(superimposedStyle);
	updateData_test(superimposedStyle);
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
			let crossNode =  math.intersect([P0.x, P0.y], [P1.x, P1.y], [P2.x, P2.y], [P3.x, P3.y]);
			if(crossNode!= null && pointAtLineFunction(P0,P1,P2,P3,crossNode)){	
				
				const shouldRemove = (indexP3-indexP1+data.length)%data.length;
				if(shouldRemove > data.length/2){
				
					break;
				}
				for(let k = indexP1; k< indexP3 ; k++){
					for(let n = 0; n < NOToffsetLines.length; n++){
						if(samePoint(data[k], NOToffsetLines[n][1])  )
							NOToffsetLines[n][1] = {x:crossNode[0] , y:crossNode[1]};				
						else if( samePoint(data[k], NOToffsetLines[n][0]) )
							NOToffsetLines[n][0] = {x:crossNode[0] , y:crossNode[1]};
					}
					// if(samePoint(data[k], NOToffsetLines[0][1])  )
					// 	NOToffsetLines[0][1] = {x:crossNode[0] , y:crossNode[1]};				
					// else if( samePoint(data[k], NOToffsetLines[0][0]) )
					// 	NOToffsetLines[0][0] = {x:crossNode[0] , y:crossNode[1]};
					
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
function pointAtLineFunctionOR(p0, p1, p2 , p3 , point){

	let crossP = {x:point[0] , y:point[1]};
	
	let {abs}=math;
	let b1 = abs(p0.x-p1.x)>abs(p0.y-p1.y)?"x":"y";
	let b2 = abs(p2.x-p3.x)>abs(p2.y-p3.y)?"x":"y";
	return inrange(p0[b1],p1[b1],crossP[b1])||inrange(p2[b2],p3[b2],crossP[b2]);
}
function distance(p1, p2){
	return math.sqrt(math.pow(p2.x-p1.x , 2) + math.pow(p2.y-p1.y , 2) );
}
export function autoDraw(superimposedStyle){
	let style = styleMap[ superimposedStyle[0] ][ superimposedStyle[1] ];
	for(let i = 0; i < style.offsetDistance.length ; i ++){
		realtimeRending_test(style.offsetDistance[i] , superimposedStyle);
	}
}
export function w(superimposedStyle){
	
	for(let i of data){
		restructureNode(i);
		//console.log(i.length);
	}
	updateData_test(superimposedStyle);
}
export function clearSuperimposed(){
	while(data.length != 1){
		data.pop();
	}
	if(selectedEdge.length != 0)
		NOToffsetLines = selectedEdge.slice();
	changeList = [];
}
