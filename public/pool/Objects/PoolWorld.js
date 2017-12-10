tileMaterial = undefined;
causticsMaterial = undefined;

caustics = new Array(32);

function PoolWorld(){
	tileMaterial = Physijs.createMaterial(
			new THREE.MeshPhongMaterial({displacementScale: 0.0}),
			1.0, // high friction
			1.0, // low restitution
		);

	causticsMaterial = Physijs.createMaterial(
			new THREE.ShaderMaterial({
				uniforms:
					{
						map: { value: null },
					}
				,
				vertexShader: document.getElementById( 'causticsVertexShader' ).textContent,
				fragmentShader: document.getElementById( 'causticsFragmentShader' ).textContent
			}),
			1.0, // high friction
			1.0, // low restitution
		);
	causticsMaterial.transparent = true;

	this.init = function(){
		this.generateGeometry();
		this.addLights();
	};
	this.causticsInd = 0;
	this.update = function(){
		this.caustics.material.uniforms.map.value = caustics[this.causticsInd];
		this.caustics.material.needsUpdate = true;
		
		this.causticsInd = (this.causticsInd + 1)%32;
	}

	this.generateGeometry = function(){

		

		//add walls

		var wallMat = new THREE.MeshPhongMaterial({color: 0xCCCCCC});
		var geometry = new THREE.BoxGeometry(20, 10, 1, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, wallMat, 0)
		coll.position.z = -10;
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		

		var geometry = new THREE.BoxGeometry(20, 10, 1, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, wallMat, 0)
		coll.position.z = 10
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);


		var geometry = new THREE.BoxGeometry(1, 10, 20, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, wallMat, 0)
		coll.position.x = -10
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		var geometry = new THREE.BoxGeometry(1, 10, 20, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, wallMat, 0)
		coll.position.x = 10
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);


		//add floor for pool
		var geometry = new THREE.BoxGeometry(5, 1, 20, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.y = -5
		coll.position.x = -7.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		var geometry = new THREE.BoxGeometry(5, 1, 20, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.y = -5
		coll.position.x = 7.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		var geometry = new THREE.BoxGeometry(10, 1, 5, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.y = -5
		coll.position.z = -7.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		var geometry = new THREE.BoxGeometry(10, 1, 5, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.y = -5
		coll.position.z = 7.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);



		//add pool

		var geometry = new THREE.BoxGeometry(10, 5, 0.1, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.z = -5;
		coll.position.y = -6.5;
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		

		var geometry = new THREE.BoxGeometry(10, 5, 0.1, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.z = 5
		coll.position.y = -6.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);


		var geometry = new THREE.BoxGeometry(0.1, 5, 10, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.x = -5
		coll.position.y = -6.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		var geometry = new THREE.BoxGeometry(0.1, 5, 10, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.x = 5
		coll.position.y = -6.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);


		var geometry = new THREE.BoxGeometry(10, 0.1, 10, 1, 1, 1)
		coll = new Physijs.BoxMesh(geometry, tileMaterial, 0)
		coll.position.y = -6.5
		coll.castShadow = false;
		coll.receiveShadow = true;
		scene.add(coll);

		var causticsPlane = new THREE.PlaneGeometry(10, 0.1, 10, 1, 1, 1)
		coll = new Physijs.PlaneMesh(geometry, causticsMaterial);
		coll.position.y = -6.49
		coll.castShadow = false;
		coll.receiveShadow = true;
		this.caustics = coll;
		scene.add(coll);

		

		
		






	}
	this.addLights = function(){
		var light = new THREE.PointLight(0xAAAAAA, 1.0, 0, 2);
		light.position.x = 0;
		light.position.y = 10;
		light.position.z = 0;
		light.castShadow = true;
	   	light.shadow.bias = - 0.0001;
	    light.shadowCameraNear = 0.1;
	    light.shadowCameraFar = 100;
	    light.shadowMapWidth = 1024;
	    light.shadowMapHeight = 1024;
		scene.add( light );

		var light = new THREE.AmbientLight(0x404040);
		scene.add( light );
	}


	this.init();

}


var loader = new THREE.TextureLoader();
loader.load('/pool/textures/tiles/TilesSquarePoolMixed001_COL_3K.jpg',function ( texture ) {

	tileMaterial.map = adjustTexture(texture)
	tileMaterial.map.needsUpdate = true;
	tileMaterial.needsUpdate = true;
});
loader.load('/pool/textures/tiles/TilesSquarePoolMixed001_GLOSS_3K.jpg',function ( texture ) {
	tileMaterial.specularMap = adjustTexture(texture)
	tileMaterial.specularMap.needsUpdate = true;
	tileMaterial.needsUpdate = true;
});
loader.load('/pool/textures/tiles/TilesSquarePoolMixed001_NRM_3K.jpg',function ( texture ) {
	tileMaterial.normalMap  = adjustTexture(texture)
	tileMaterial.normalMap.needsUpdate = true;
	tileMaterial.needsUpdate = true;
});
loader.load('/pool/textures/tiles/TilesSquarePoolMixed001_DISP_3K.jpg',function ( texture ) {
	tileMaterial.displacementMap  = adjustTexture(texture)
	tileMaterial.displacementMap.needsUpdate = true;
	tileMaterial.needsUpdate = true;
});

for(var i = 0; i < 32; i++){
	var s = ""
	if(i + 1 < 10){
		s = "0" + (i + 1);
	}
	else{
		s = (i + 1);
	}
	loader.load('/pool/textures/caus8/save.' + s + '.jpeg',function ( texture , i) {
		var str = texture.image.currentSrc
		var substr = str.substr(str.length - 7);
		var num = parseInt(substr.split(".")[0]) -1;

		texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;



		texture.repeat.set(32, 32);

		texture.needsUpdate = true;
		
		caustics[num] = texture;
	});
}
function adjustTexture(texture){
	//texture.wrapS = THREE.RepeatWrapping;
    //texture.wrapT = THREE.RepeatWrapping;



    //texture.repeat.set(4, 4);

    //texture.needsUpdate = true;

    return texture;
}

