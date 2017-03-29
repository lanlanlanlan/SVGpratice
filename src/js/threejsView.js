import * as d3 from 'd3';
import * as offset from './offset.js' 
//#pragma: main start
let container;
let camera, scene, renderer, raycaster;
let windowHalfX = window.innerWidth / 2;
let mouse = new THREE.Vector2();
let bracket = [];
let bracketfaces = [];


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
	scene.add(ambient);

	let directionalLight = new THREE.DirectionalLight(0x666666);
	directionalLight.position.set(1, 1, 1);
	scene.add(directionalLight);

	let directionalLight2 = new THREE.DirectionalLight(0x666666);
	directionalLight2.position.set(-1, -1, -1);
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
	loader.load('./models/SD.obj', function(object) {

		object.children[0].geometry = new THREE.Geometry().fromBufferGeometry(object.children[0].geometry);
		//make sure smooth
		object.children[0].geometry.computeVertexNormals();

		object.traverse(function(child) {

			if (child instanceof THREE.Mesh) {

				child.material.map = texture;

			}

		});

		/************************
		//full object
		object.position.y = 5;
		scene.add( object );
		*************************/

		let _group = new THREE.Group();
		bracket.push(object);
		let _geometry = object.children[0].geometry;
		for (let i in _geometry.faces) {

			let _mesh = new THREE.Mesh(new THREE.Geometry(), new THREE.MeshPhongMaterial({
				color: 0xf0f0f0
			}));

			_mesh.geometry.faces.push(_geometry.faces[i]);

			for (let j in _geometry.vertices) {
				_mesh.geometry.vertices.push(_geometry.vertices[j]);
			}
			bracketfaces.push(_mesh);
			//remesh object from loader and gruop it
			_group.add(_mesh);
		}
		//_group.position.x = 580;
		//_group.position.z = -110;
		scene.add(_group);

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
	document.addEventListener('dblclick', setRaycast, false);

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
	let controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 2;
	controls.maxDistance = 50;
	scene.add(new THREE.AxisHelper(20));
}

function render() {
	renderer.render(scene, camera);
}

function setRaycast() {
	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
	let intersects = raycaster.intersectObjects(bracketfaces, true);
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

	for (let i in selectedfaces) {
		let minLimit = intersects[0].object.geometry.faces[0].a - selectedfaces.length * 2.5;
		let maxLimit = intersects[0].object.geometry.faces[0].c + selectedfaces.length * 2.5;
		if (selectedfaces[i].geometry.faces[0].a >= minLimit) {
			if (selectedfaces[i].geometry.faces[0].c <= maxLimit) {
				selectedfaces[i].material.color.set(color);
				createSvgVertices(selectedfaces[i].geometry.clone(), svgVertices);

			}
		} else {
			//remove disconnect face
			selectedfaces.splice(i, 1);
		}

	}
	setSvgVerticesOrder(selectedfaces, svgVertices, verticesRelation);
	

	offset.setData(svgVertices);
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
		restructureRelation(svgVertices[i].originPoint, verticesRelation[i]);
	}

	let order = 2;
	let current = 0;
	svgVertices[current].order = 1;
	while (getNextPointIndex(svgVertices, verticesRelation[current], current) != null) {
		current = getNextPointIndex(svgVertices, verticesRelation[current], current);
		svgVertices[current].order = order;
		order++;
	}
	console.log(svgVertices);
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

function restructureRelation(vertice, relation) {
	//remove face self
	for (let i = relation.length - 1; i >= 0; i--) {
		if (relation[i].equals(vertice))
			relation.splice(i, 1);
	}
	//remove face with repeat 
	for (let i in relation) {
		let count = 0;
		let current = relation[i];
		for (let j in relation) {
			if (relation[i].equals(relation[j]))
				count++;
		}
		if (count == 2) {
			for (let k = relation.length - 1; k >= 0; k--) {
				if (relation[k].equals(current))
					relation.splice(k, 1);
			}
		}
	}


}

function clipface(faces) {
	for (let i in faces) {
		if (faces[i].normal.x == -0)
			faces[i].normal.x = faces[i].normal.x * (-1);

		if (faces[i].normal.y == -0)
			faces[i].normal.y = faces[i].normal.y * (-1);

		if (faces[i].normal.z == -0)
			faces[i].normal.z = faces[i].normal.z * (-1);
	}
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
	if (isNaN(_angle))
		return vertice;
	
	return vertice.clone().applyAxisAngle(_cross, _angle);
}