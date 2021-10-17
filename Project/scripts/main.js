 
var init = () => {
    var scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0xfffffff, 0.2);

    var box = getBox(1, 1, 1);

    var plane = getPlane(20);
    //The name can be called on the parent object
    plane.name = 'plane-1';

    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;

    scene.add(box);  
    scene.add(plane);
    

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1, 
        1000
    );
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 1;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xfffffff);

    document.getElementById('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera)

    return scene
}

// Creating shape function

function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);

    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function getPlane (size) {
    var geometry = new THREE.PlaneGeometry(size, size);

    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function getHeart (x, y) {
    const heartShape = new THREE.Shape();
    heartShape.moveTo( x + 5, y + 5 );

    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
    
    var geometry = new THREE.ShapeGeometry( heartShape );
    var material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00 
    });
    var mesh = new THREE.Mesh( geometry, material ) ;
}

function rotating(object, x = 0, y = 0, z = 0) {
    if (x != 0) {
        object.rotate.x += x;
    }
    if (y != 0) {
        object.rotate.y += y;
    }
    if(x != 0) {
        object.rotate.z += z;
    }
    return (x, y, z);
}



// Update function for continuosly rendering

function update(renderer, scene, camera) {

    renderer.render(
        scene,
        camera
    );
    var plane = scene.getObjectByName('plane-1');

    

    requestAnimationFrame(function() {

        //Get a callback in the recursive manner
        //Like the setInterval()
        //Continuosly rendering 

        update(renderer, scene, camera);
    })
}


var scene = init();

