
function socketLoop(){
	 socket.emit('testMessage', "hi");
	// setTimeout(socketLoop, 30);
}
quaternion = new THREE.Quaternion();
$(document).ready(function(){
	lastTime = 0;
	
	socket.on('testMessage', function(data){

		var time = data.t;
	
		if(time > lastTime){
			if(curs != undefined){
				if(data.p != undefined){
					curs.obj.position.x  = data.p.x;
					curs.obj.position.y  = data.p.y;
					curs.obj.position.z  = data.p.z;
				}
				

				input = data.i;

				checkHover();

				prevTime = time;
			}
			

		}
	});
	socket.on('newpage', function(page){
		var page = page + "phone";
		window.location = page;

	});

	controls = new DeviceOrientationController( cameraVR, renderer.domElement );
	controls.connect();
})



$(document).on("click", function(){
	console.log("going full screen")
	document.documentElement.webkitRequestFullScreen()
})
$(document).on("tap", function(){
	console.log("going full screen")
	document.documentElement.webkitRequestFullScreen()
	renderer.width
})

