import * as d3 from 'd3';
import * as offset from './offset.js' 
import math from './libs/math.min.js';
//#pragma: main start
let container;
let camera, scene, renderer, raycaster, controls;
let windowHalfX = window.innerWidth / 2;
let mouse = new THREE.Vector2();
let bracket = [];
let bracketfaces = [];
let svgSeletedfaces =null;

//init();
//animate();

//#pragma function start
export function init() {

	let svg_container = document.getElementById('svgCavas');
	svg_container.setAttribute("width", windowHalfX);
	svg_container.setAttribute("height", window.innerHeight);
	container = document.getElementById('threejs_view');


	camera = new THREE.PerspectiveCamera(75, windowHalfX / window.innerHeight, 0.1, 1000);
	camera.position.z = 10;
	camera.position.y = 10;
	//#pragma: scene


	scene = new THREE.Scene();
	window.scene = scene;
	//set lighting
	let ambient = new THREE.AmbientLight(0xbbbbbb);
	ambient.name = "ambient";
	scene.add(ambient);

	let directionalLight = new THREE.DirectionalLight(0x666666);
	directionalLight.position.set(1, 1, 1);
	directionalLight.name = "directionalLight-1";
	scene.add(directionalLight);

	let directionalLight2 = new THREE.DirectionalLight(0x666666);
	directionalLight2.position.set(-1, -1, -1);
	directionalLight2.name = "directionalLight-2";
	scene.add(directionalLight2);


	//#pragma:texture

	let manager = new THREE.LoadingManager();
	manager.onProgress = function(item, loaded, total) {

		console.log(item, loaded, total);

	};

	let texture = new THREE.Texture();

	let onProgress = function(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};

	let onError = function(xhr) {};


	let loader = new THREE.ImageLoader(manager);
	loader.load('./models/UV_Grid_Sm.jpg', function(image) {

		texture.image = image;
		texture.needsUpdate = true;

	});

	//#pragma:model
	loader = new THREE.OBJLoader(manager);
	// loader.load('./models/32_deleteLine.obj', function(object) {
	loader.load('./models/32_deleteLine.obj.gz', function(object) {
		for(let i in object.children){
			object.children[i].geometry = new THREE.Geometry().fromBufferGeometry(object.children[i].geometry);
			//make sure smooth
			object.children[i].geometry.computeVertexNormals();
		}
		
		let _material = new THREE.MeshPhongMaterial({
			 color: 0x614641
		});
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				
				child.material.map = texture;
				child.material = _material;
			}
		});
		
		object.name = "WholeModel";
		bracket.push(object);
		scene.add( object );

	}, onProgress, onError);


	//#pragma: render
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(windowHalfX, window.innerHeight);
	container.appendChild(renderer.domElement);
	//change background color
	renderer.setClearColor(0xffffff, 0.5);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
	SetControls();

	//#pragma: raycaster
	raycaster = new THREE.Raycaster();
	// document.addEventListener('dblclick', setRaycast, false);
	document.getElementById('threejs_view').addEventListener('dblclick', setRaycast, false);
	 initTJstyle()
}
function initTJstyle(){
	scene.fog = new THREE.Fog( 0x72645b, 1, 0.5 );
	renderer.setClearColor( scene.fog.color, 1 );
	let plane = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500 ), new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } ) );
				plane.rotation.x = -Math.PI/2;
				plane.position.y = -0.5;
				scene.add( plane );

				plane.receiveShadow = true;
	// addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
	addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );
	function addShadowedLight( x, y, z, color, intensity ) {

				let directionalLight = new THREE.DirectionalLight( color, intensity );
				directionalLight.position.set( x, y, z )
				scene.add( directionalLight );

				directionalLight.castShadow = true;
				// directionalLight.shadowCameraVisible = true;

				let d = 1;
				directionalLight.shadowCameraLeft = -d;
				directionalLight.shadowCameraRight = d;
				directionalLight.shadowCameraTop = d;
				directionalLight.shadowCameraBottom = -d;

				directionalLight.shadowCameraNear = 1;
				directionalLight.shadowCameraFar = 4;

				directionalLight.shadowMapWidth = 1024;
				directionalLight.shadowMapHeight = 1024;

				directionalLight.shadowBias = -0.005;
				directionalLight.shadowDarkness = 0.15;

			}

}
function createBracketfaces(object){
	
	let _group = new THREE.Group();
	
	let _geometry = object.geometry;
	for (let i in _geometry.faces) {

		let _mesh = new THREE.Mesh(new THREE.Geometry(), new THREE.MeshPhongMaterial({
			/*color: 0xf0f0f0*/ color: 0x614641, specular: 0x111111, shininess: 200
		}));

		_mesh.geometry.faces.push(_geometry.faces[i]);

		for (let j in _geometry.vertices) {
			_mesh.geometry.vertices.push(_geometry.vertices[j]);
		}
		bracketfaces.push(_mesh);
		//remesh object from loader and gruop it
		_group.add(_mesh);
	
	}
	_group.name = "PeaceModel";
	scene.add(_group);
}

function empty(array) {
	while (array.length != 0)
		array.pop();
}

function onWindowResize() {


	camera.aspect = windowHalfX / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(windowHalfX, window.innerHeight);

}

function onDocumentMouseMove(event) {
	// calculate mouse position in normalized (-1 to +1) for both components

	mouse.x = ((event.clientX - windowHalfX) / windowHalfX) * 2 - 1;;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

export function animate() {
	requestAnimationFrame(animate);
	render();
}

function SetControls() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 2;
	controls.maxDistance = 500;
	scene.add(new THREE.AxisHelper(20));
}

function render() {
	renderer.render(scene, camera);
}

function setRaycast(event) {
	
	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);
	let intersects;
	if(bracketfaces.length == 0){
		intersects = raycaster.intersectObjects(bracket, true);
		if (intersects.length == 0) return;

		createBracketfaces( intersects[0].object );
		scene.getObjectByName("WholeModel").visible = false;
		intersects[0].object.geometry.computeBoundingBox();
		let lookAtPoint = intersects[0].object.geometry.boundingBox.center();

		camera.lookAt( lookAtPoint );
		
		camera.zoom = 30; // zoom <=10 is fine 

		camera.updateProjectionMatrix ()
		controls.target = lookAtPoint;
		controls.object.updateProjectionMatrix ()

		return;
	}
	// calculate objects intersecting the picking ray
	intersects = raycaster.intersectObjects(bracketfaces, true);
	if (intersects.length == 0) return;

	/************************
	//show single face
	for ( let i = 0; i < intersects.length; i++ ) {
		//intersects[ i ].children[0].geometry.faces[0].color.set( Math.random()*0xffffff);
		
		intersects[ i ].object.material.color.set( Math.random()*0xffffff);
		console.log(intersects[i].object.geometry.faces[0]);
		
	}
	*************************/
	//show connect face
	if(bracketfaces.length != 0){
		if(scene.getObjectByName("WholeModel").visible){
			scene.getObjectByName("WholeModel").visible = false;
			// console.log(scene.getObjectByName("WholeModel").visible);
		}

		let color = Math.random() * 0xffffff;
		let selectedfaces = [];
		for (let i in bracketfaces) {
			let normal1 = bracketfaces[i].geometry.faces[0].normal;
			let normal2 = intersects[0].object.geometry.faces[0].normal;
			let face1 = bracketfaces[i].geometry.faces;
			let face2 = intersects[0].object.geometry.faces;
			if (sameNormal(normal1, normal2) && sameplane(face1, face2, intersects[0].object.geometry.vertices) <= 0.00000001) {
				selectedfaces.push(bracketfaces[i]);
			}

		}
		let svgVertices = [];
		let verticesRelation = [];

		//remove disconnect faces
		selectedfaces = dfs(selectedfaces,intersects[0].object);
		
		for(let i in selectedfaces){
			selectedfaces[i].material.color.set( color);
			createSvgVertices(selectedfaces[i].geometry.clone(), svgVertices);
		}

		setSvgVerticesOrder(selectedfaces, svgVertices, verticesRelation);
		//console.log("selectedfaces = ");console.log( selectedfaces);

		// offset.setData(svgVertices);
		

		if(event.shiftKey && svgSeletedfaces != null)
			combineSelectedfaces(svgVertices);
		else
			svgSeletedfaces=svgVertices;

		if(svgSeletedfaces == null)
			svgSeletedfaces=svgVertices;
		
		offset.setData(svgSeletedfaces);
	}
}
function faceWithSamePoint(connect, selectedfaces ){
	let _vertices = selectedfaces.geometry.vertices;
	let face2 = selectedfaces.geometry.faces[0];
	let face1 = connect.geometry.faces[0];
	if ( _vertices[face1.a].equals(_vertices[face2.a]))
		return true;
	else if ( _vertices[face1.a].equals(_vertices[face2.b]) )
		return true;
	else if ( _vertices[face1.a].equals( _vertices[face2.c]))
		return true;
	else if ( _vertices[face1.b].equals(_vertices[face2.a]))
		return true;
	else if ( _vertices[face1.b].equals(_vertices[face2.b]))
		return true;
	else if ( _vertices[face1.b].equals(_vertices[face2.c]))
		return true;
	else if ( _vertices[face1.c].equals(_vertices[face2.a]))
		return true;
	else if ( _vertices[face1.c].equals(_vertices[face2.b]))
		return true;
	else if ( _vertices[face1.c] .equals(_vertices[face2.c]))
		return true;
	return false;
}

function dfs(selectedfaces,intersect){
	let connectFaces = [];
	connectFaces.push(intersect);
	let done = false;
	let length = connectFaces.length;

	while(!done){
		for(let i = 0; i< connectFaces.length ; i++){
			for(let j in selectedfaces){
				if(connectFaces[i] == selectedfaces[j]) continue;
				if(faceWithSamePoint(connectFaces[ i ], selectedfaces[ j ] ) && !connectFaces.includes(selectedfaces[ j ]) ){
					connectFaces.push(selectedfaces[ j ]);
				}
			}
			length = connectFaces.length;
		}
		if(length == connectFaces.length)
			done = true;
	}

	//console.log("connectFaces = ");console.log( connectFaces);
	return connectFaces;
}



function setSvgVerticesOrder(selectedfaces, svgVertices, verticesRelation) {
	for (let i in svgVertices) {
		verticesRelation.push([]);
		for (let j in selectedfaces) {
			let vertices = selectedfaces[j].geometry.vertices;
			let faces = selectedfaces[j].geometry.faces[0];
			if (svgVertices[i].originPoint.equals(vertices[faces.a]) || svgVertices[i].originPoint.equals(vertices[faces.b]) || svgVertices[i].originPoint.equals(vertices[faces.c])) {
				verticesRelation[i].push(vertices[faces.a]);
				verticesRelation[i].push(vertices[faces.b]);
				verticesRelation[i].push(vertices[faces.c]);
			}
		}
		verticesRelation[i] = mergeRelation(svgVertices[i].originPoint, verticesRelation[i] );
	}
	for(let i in svgVertices){
		if(verticesRelation[i].length >2)
			verticesRelation[i] = restructureRelation(svgVertices , verticesRelation, i );
	}

	let order = 2;
	let current = 0;
	svgVertices[current].order = 1;
	let startOrder = 1;
	while (getNextPointIndex(svgVertices, verticesRelation[current], current) != null) {
		current = getNextPointIndex(svgVertices, verticesRelation[current], current);
		svgVertices[current].order = order;
		order++;
	}
	// console.log(svgVertices);
	//3.確保方向性為逆時針
	
	if(ClockwiseDirection(svgVertices,1 , order-1) >0 )
		reverseOrder(svgVertices);
	
	console.log(svgVertices);

}
function shiftOrder(svgVertices){
	let maxOrder = 0;
	for (let i of svgVertices){
		if(i.order > maxOrder ){
			maxOrder = i.order;
		}
	}
	for (let i in svgVertices){
		if(svgVertices[ i ].order != undefined){
			if(svgVertices[ i ].order - 1 == 0){
				svgVertices[ i ].order = maxOrder;
			}
			else
				svgVertices[ i ].order -= 1;
		}
	}

}
function RshiftOrder(svgVertices){
	let maxOrder = 0;
	for (let i of svgVertices){
		if(i.order > maxOrder ){
			maxOrder = i.order;
		}
	}
	for (let i in svgVertices){
		if(svgVertices[ i ].order != undefined){
			if(svgVertices[ i ].order  == maxOrder){
				svgVertices[ i ].order = 1;
			}
			else
				svgVertices[ i ].order += 1;
		}
	}

}

/*********/
function getIndexOfWeirdPoint(svgVertices, startOrder, endOrder, verticesRelation){
	 
	let weirdPoint, weirdIndex, weirdVector;
	for(let i = startOrder;  i <= endOrder; i++){
		
		weirdPoint = getSvgVerticeByOrder(svgVertices, i).originPoint;
		weirdVector = new THREE.Vector3(weirdPoint.x , weirdPoint.y, weirdPoint.z);
		weirdIndex = getIndexOfsvgVertices(svgVertices, weirdVector);// weirdPoint need vector3
		if(verticesRelation[ weirdIndex ].length > 2 )
			return weirdIndex;
		

	}
	return null;
	 
}

function ClockwiseDirection(svgVertices, startOrder, endOrder){
	let total = 0;
	//shoeslace formula need compute all node-vector once
	for(let i = startOrder;  i <= endOrder; i++){
		total+=ShoelaceFormula(svgVertices, startOrder, i);
	}
	return total;
}
//shoeslace formula one step
function ShoelaceFormula(svgVertices , startOrder, currentOrder ){
	let p1, p2 = getSvgVerticeByOrder(svgVertices , startOrder);

	for (let i of svgVertices){
		if(i.order == currentOrder)
			p1 = i;
		else if(i.order == currentOrder+1)
			p2 = i;
	}
	let zVector = new THREE.Vector3(0, 0, 1);
	let vectorP1 = p1.svgPoint.clone();
	let vectorP2 = p2.svgPoint.clone();
	let crossVector = vectorP1.cross(vectorP2);
	
	// -1 is counterClockwise ; 1 is Clockwise
	return crossVector.dot(zVector);
}


//function reverseOrder(svgVertices , start order ,end order)
function reverseOrder(svgVertices){
	let maxOrder = 0;
	for (let i of svgVertices){
		if(i.order > maxOrder)
			maxOrder = i.order;
	}
	for (let i in svgVertices){
		svgVertices[ i ].order = math.abs(svgVertices[ i ].order - maxOrder -1);
	}
}



function getNextPointIndex(svgVertices, relation, currentIndex) {
	let pointA = getIndexOfsvgVertices(svgVertices, relation[0]);
	let pointB = getIndexOfsvgVertices(svgVertices, relation[1]);

	let current = svgVertices[currentIndex].svgPoint;
	if (svgVertices[pointA].order == undefined && svgVertices[pointB].order == undefined) {
		let xVector = new THREE.Vector3(1, 0, 0);
		let vectorA = svgVertices[pointA].svgPoint.clone().sub(current);
		let vectorB = svgVertices[pointB].svgPoint.clone().sub(current);
		if (xVector.angleTo(vectorA) < xVector.angleTo(vectorB))
			return pointA;
		else if (xVector.angleTo(vectorB) < xVector.angleTo(vectorA))
			return pointB;

		return (vectorA.y < 0) ? pointA : pointB;
	} else if (svgVertices[pointA].order != undefined && svgVertices[pointB].order != undefined)
		return null;
	else if (svgVertices[pointA].order != undefined)
		return pointB;
	else if (svgVertices[pointB].order != undefined)
		return pointA;

	return null;
}

function getIndexOfsvgVertices(svgVertices, vertice) {
	for (let i in svgVertices) {
		if (vertice.equals(svgVertices[i].originPoint))
			return i;
	}

	return null;
}
function getSvgVerticeByOrder(svgVertices, order) {
	for (let i of svgVertices) {
		if (i.order == order)
			return i;
	}

	return null;
}

function restructureRelation(svgVertices, verticesRelation, currentIndex) {
	
	let vertice = svgVertices[currentIndex].originPoint ;
	let _relation = verticesRelation[currentIndex]
			
	
	let current = svgVertices[currentIndex].svgPoint;
	let pointA, pointB, pointC, pointD, vectorA, vectorB, vectorC, vectorD;
	pointA = getIndexOfsvgVertices(svgVertices, _relation[0]);
	pointB = getIndexOfsvgVertices(svgVertices, _relation[1]);
	pointC = getIndexOfsvgVertices(svgVertices, _relation[2]);
	pointD = getIndexOfsvgVertices(svgVertices, _relation[3]);

	vectorA = svgVertices[pointA].svgPoint.clone().sub(current).normalize();
	vectorB = svgVertices[pointB].svgPoint.clone().sub(current).normalize();
	vectorC = svgVertices[pointC].svgPoint.clone().sub(current).normalize();
	vectorD = svgVertices[pointD].svgPoint.clone().sub(current).normalize();
////
////
////

	let points = [pointA,pointB,pointC,pointD];
	let vectors = points.map(x=>svgVertices[x].svgPoint.clone().sub(current).normalize());
	
	function handleWierdPoint(index1,index2){

		let a = points[index1];
		let b = points[index2];
		if (math.abs(vectors[index1].dot(vectors[index2]) -1) <= 0.00000001){
			for(let i in verticesRelation[a]){
				if( getIndexOfsvgVertices(svgVertices, verticesRelation[a][i]) == currentIndex ){
					
					verticesRelation[a][i] = _relation[index2];
					break;
				}
			}
			for(let i in verticesRelation[b]){
				if( getIndexOfsvgVertices(svgVertices, verticesRelation[b][i]) == currentIndex ){
					
					verticesRelation[b][i] = _relation[index1];
					break;
				}
			}
			_relation.splice(index2, 1);
			_relation.splice(index1,1);
		}
	}

	handleWierdPoint(0 ,1);
	handleWierdPoint(0 ,2);
	handleWierdPoint(0 ,3);
	handleWierdPoint(1 ,2);
	handleWierdPoint(1 ,3);
	handleWierdPoint(2 ,3);
	
	return _relation; 
}


function mergeRelation(vertice, relation) {
	//remove vertice self
	for (let i = relation.length - 1; i >= 0; i--) {
		if (relation[i].equals(vertice))
			relation.splice(i, 1);
	}
	//collect repeat vertice
	let dup = [];
	for (let i of relation) {
		let count = 0;
		for (let j of relation) {
			if ( i.equals( j ) )
				count++;
		}
		if (count == 2) {
			dup.push(i);
		}
	}

	
	return relation.filter(x=>!dup.find( v=>v.equals(x) ) );
}

function sameNormal(normal1, normal2) {
	let check = 0;
	if (normal1.x == normal2.x && normal1.y == normal2.y && normal1.z == normal2.z)
		check = 1;
	else if (Math.abs(normal1.x - normal2.x) <= 0.00000001 &&
		Math.abs(normal1.y - normal2.y) <= 0.00000001 &&
		Math.abs(normal1.z - normal2.z) <= 0.00000001)
		check = 1;

	else
		check = 0;
	return Boolean(check);

}

function sameplane(face1, face2, vertices) {
	let L1 = {
		x: 0,
		y: 0,
		z: 0,
		d: 0
	};
	let L2 = {
		x: 0,
		y: 0,
		z: 0,
		d: 0
	};
	L1.x = face1[0].normal.x;
	L1.y = face1[0].normal.y;
	L1.z = face1[0].normal.z;
	let vertice1 = vertices[face1[0].a];

	L1.d = -L1.x * vertice1.x - L1.y * vertice1.y - L1.z * vertice1.z;
	L2.x = face2[0].normal.x;
	L2.y = face2[0].normal.y;
	L2.z = face2[0].normal.z;
	let vertice2 = vertices[face2[0].a];
	L2.d = -L2.x * vertice2.x - L2.y * vertice2.y - L2.z * vertice2.z;
	let up = Math.abs(L2.d - L1.d);
	let down = Math.sqrt(Math.pow(L1.x, 2) + Math.pow(L1.y, 2) + Math.pow(L1.z, 2));
	return up / down;
}

function createSvgVertices(faceGeometry, svgVertices) {

	let face = faceGeometry.faces[0];
	let vertices = faceGeometry.vertices;
	let exist = {
		a: false,
		b: false,
		c: false
	};
	if (svgVertices.length == 0) {
		svgVertices.push({
			originPoint: vertices[face.a],
			svgPoint: rotateVertices(face, vertices[face.a])
		});
		svgVertices.push({
			originPoint: vertices[face.b],
			svgPoint: rotateVertices(face, vertices[face.b])
		});
		svgVertices.push({
			originPoint: vertices[face.c],
			svgPoint: rotateVertices(face, vertices[face.c])
		});

	} else {

		for (let i in svgVertices) {

			if (svgVertices[i].originPoint.equals(vertices[face.a]))
				exist.a = true;

			else if (svgVertices[i].originPoint.equals(vertices[face.b]))
				exist.b = true;

			else if (svgVertices[i].originPoint.equals(vertices[face.c]))
				exist.c = true;

		}
		if (!exist.a) {
			svgVertices.push({
				originPoint: vertices[face.a],
				svgPoint: rotateVertices(face, vertices[face.a])
			});
		}
		if (!exist.b) {
			svgVertices.push({
				originPoint: vertices[face.b],
				svgPoint: rotateVertices(face, vertices[face.b])
			});
		}
		if (!exist.c) {
			svgVertices.push({
				originPoint: vertices[face.c],
				svgPoint: rotateVertices(face, vertices[face.c])
			});
		}


	}

}

function rotateVertices(faces, vertice) {
	let zVector = new THREE.Vector3(0, 0, 1);
	let _cross = faces.normal.clone().cross(zVector).normalize();
	let _angle = faces.normal.clone().angleTo(zVector);
	
	if (isNaN(_angle) || _angle == math.PI){
		return vertice;
	}
	let xVector = new THREE.Vector3(1,0,0);
	let rotateVector = vertice.clone().applyAxisAngle(_cross, _angle);
	let ang = faces.normal.clone().angleTo(xVector);
	//adjust start
	if(faces.normal.clone().x >0)
		return rotateVector.clone().applyAxisAngle(zVector, ang-math.PI);
	if(faces.normal.clone().z >0)
		return rotateVector.clone().applyAxisAngle(zVector, ang+math.PI/2);
	if(faces.normal.clone().z <0)
		return rotateVector.clone().applyAxisAngle(zVector, ang-math.PI/2);
	//adjust end

	return rotateVector.clone().applyAxisAngle(zVector, ang);
	//return  vertice.clone().applyAxisAngle(_cross, _angle);
}

export function showWholeModel(){
	if(!scene.getObjectByName("WholeModel").visible){
		scene.getObjectByName("WholeModel").visible = true;
		scene.remove(scene.getObjectByName("PeaceModel"));
		// empty(bracket);
		empty(bracketfaces);
		svgSeletedfaces =null;
	}
}
export function viewFitModel(){
	if(scene.getObjectByName("WholeModel").visible){
		scene.getObjectByName("WholeModel").children[0].geometry.computeBoundingBox();
		let lookAtPoint = scene.getObjectByName("WholeModel").children[0].geometry.boundingBox.center();
		camera.lookAt( lookAtPoint );
		camera.zoom = 1; 
	}
	else{
		scene.getObjectByName("PeaceModel").children[0].geometry.computeBoundingBox();
		let lookAtPoint = scene.getObjectByName("PeaceModel").children[0].geometry.boundingBox.center();
		camera.lookAt( lookAtPoint );
		camera.zoom = 30; 
	}
	camera.updateProjectionMatrix ()
		controls.target = lookAtPoint;
		controls.object.updateProjectionMatrix ()
}

function combineSelectedfaces(svgVertices){
	svgSeletedfaces = restructureSvgSelectfaces(svgSeletedfaces);
	svgVertices = restructureSvgSelectfaces(svgVertices);
	
	let startIndex = null, endIndex = null , startPointOfSvgVertices = null;
	for(let i of svgSeletedfaces){
		for(let j of svgVertices){
			if(i.originPoint.equals(j.originPoint)&&startIndex == null){
				startIndex = getIndexOfsvgVertices(svgSeletedfaces,i.originPoint);
				startPointOfSvgVertices = j;
			}
			else if(i.originPoint.equals(j.originPoint) && svgSeletedfaces[startIndex].order < i.order)
				endIndex = getIndexOfsvgVertices(svgSeletedfaces,i.originPoint);
				
			else if (i.originPoint.equals(j.originPoint)){
				let temp = startIndex;
				startIndex = getIndexOfsvgVertices(svgSeletedfaces,i.originPoint);
				endIndex = temp;
				startPointOfSvgVertices = j;
			}
		}
	}
	if(endIndex==null || startIndex == null){
		console.log("cant combine!");
		return;
	}
	
	let startPoint = svgSeletedfaces[startIndex];
	let endPoint = svgSeletedfaces[endIndex];

	while(endPoint.order != svgSeletedfaces.length ){
		RshiftOrder(svgSeletedfaces);
		startPoint = getSvgVerticeByOrder(svgSeletedfaces, startPoint.order);
		endPoint = getSvgVerticeByOrder(svgSeletedfaces, endPoint.order);
	}

	while(startPointOfSvgVertices.order != 1)
		RshiftOrder(svgVertices);
	
	let vectorV = startPoint.svgPoint.clone().sub(startPointOfSvgVertices.svgPoint);
	
	for(let i of svgVertices){
		if(!i.originPoint.equals(startPoint.originPoint) &&  !i.originPoint.equals(endPoint.originPoint)){
			if(startPoint.order!=1)
				i.order += (startPoint.order-1);
			else{
				let _order = i.order + endPoint.order;
				i.order = (_order >2 )? _order-2 : _order;
			}
			i.svgPoint.add(vectorV);
			svgSeletedfaces.push(i);
		}
	}
	if(startPoint.order!=1)
		endPoint.order+= svgVertices.length-2;
}

function restructureSvgSelectfaces(svgVertices){
	let waitDeleteIndex=[];
	for(let i = 0 ,order = 1; i < svgVertices.length; i++ , order++){
		let currentPoint = getSvgVerticeByOrder(svgVertices, order);
		let lastPoint = getSvgVerticeByOrder(svgVertices, svgVertices.length);
		if(order-1 > 0)
			lastPoint = getSvgVerticeByOrder(svgVertices, order-1);
		let nextPoint = getSvgVerticeByOrder(svgVertices, 1);
		if(order+1 < svgVertices.length)
			nextPoint = getSvgVerticeByOrder(svgVertices, order+1);

		if(threePointsAtOneLine(lastPoint.originPoint, currentPoint.originPoint, nextPoint.originPoint))
			waitDeleteIndex.push(getIndexOfsvgVertices(svgVertices, currentPoint.originPoint));

	}
	console.log(waitDeleteIndex);
	

	let _filterSvg = svgVertices.filter(x=>!waitDeleteIndex.map(q=>svgVertices[q]).includes(x));
	 _filterSvg.sort(function(a,b){
		return (a.order - b.order);
	}).map((value, index)=>{
		value.order = index+1;
		return value;
	});
	
	return _filterSvg;
}

function threePointsAtOneLine(p1,p2,p3){
	let vectorP1P2 = p2.clone().sub(p1).normalize();
	let vectorP2P3 = p3.clone().sub(p2).normalize();
	if (math.abs(vectorP1P2.dot(vectorP2P3) -1) <= 0.00000001)
		return true;
	return false;
}

