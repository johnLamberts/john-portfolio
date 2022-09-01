import * as THREE from "three";
import images from "./images";


// pre-variables
const container = document.querySelector(".three__bg")

// loader threejs
const loader = new THREE.TextureLoader();

//Scenario of threeJs

const scene = new THREE.Scene();

//Camera -> Perspective

const camera = new THREE.PerspectiveCamera(70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// rendeerer 

const renderer = new THREE.WebGL1Renderer({
    antialias: true,
});

// responsive

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(18, 10, 15, 9);
const material = new THREE.MeshBasicMaterial({
    wireframe: true,

    map: loader.load(images.bg4)
});


//second desgin
// const geometry = new THREE.PlaneGeometry(23, 22, 3, 1);
// const material = new THREE.MeshBasicMaterial({ 
//     wireframe: true, 

//     map: loader.load(images.bg5) 
// });


//First deisng I love
// const geometry = new THREE.PlaneGeometry(9, 18);
// const material = new THREE.MeshBasicMaterial({ 
//     wireframe: true, 
//     map: loader.load(images.bg2) 
// });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
camera.position.z = 5

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

const animation = () => {
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        
        //canimation
        // const anim1 = 0


        geometry.attributes.position.setZ(i, -y * time * 2);
        // geometry.attributes.position.setZ(i, 0.9 * Math.sin(-y * time * 0.8));
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
    }
    requestAnimationFrame(animation);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animation();

