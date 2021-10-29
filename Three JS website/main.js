import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

// kamera perspektywa, 75 - FOV, window/window - RATIO, 1000 - dystans
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderowanie do canvas
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
 
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30); // do lepszej perspektwywy

  renderer.render(scene, camera);

// dodawanie object
  const geometry = new THREE.TorusGeometry(10,3,16,100);
  const material  = new  THREE.MeshBasicMaterial({color: 0xffff99, wireframe: true});
  const torus = new THREE.Mesh(geometry,material); // laczenie ze soba figury oraz materialu

  scene.add(torus);
  

  function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;


    renderer.render(scene,camera);
  }

  animate();
