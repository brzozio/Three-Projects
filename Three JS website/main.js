import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

// kamera perspektywa, 75 - FOV, window/window - RATIO, 1000 - max dystans renderowania
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderowanie do canvas
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
 
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(150); // do lepszej perspektwywy
    const cameraPosition = camera.position.z;

  renderer.render(scene, camera);

// dodawanie object
  const geometry = new THREE.TorusGeometry(20,3,16,100);
  const material  = new  THREE.MeshStandardMaterial({color: 0xffff99});
  const torus = new THREE.Mesh(geometry,material); // laczenie ze soba figury oraz materialu
    scene.add(torus);
  
    const pointLight = new THREE.PointLight(0xEA8417);
      pointLight.position.set(20,20,20);
      scene.add(pointLight);

       // const lightHelper = new THREE.PointLightHelper(pointLight);
        //  scene.add(lightHelper);
    const gridHelper = new THREE.GridHelper(); // linie wysweitlajace siatke, pomagajace w orientacji w przestrzenii
      //scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement); // mozliwosc obracania sie w przestrzenii
  // another light
    const anotherLight = THREE.ligh

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const ligthStar = new THREE.PointLight({color: 0xEA3})
      const star = new THREE.Mesh(geometry, material, ligthStar); // laczenie ze soba elementow geometry oraz material
    
    const [x,y,z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    
      scene.add(star); 
  }
    Array(200).fill().forEach(addStar);

  
// adding a scene background
  /*const spaceTexture = new THREE.TextureLoader().load('oad.jpg');
    scene.background = spaceTexture;
  */

// Moon
  const moonTexture = new THREE.TextureLoader().load('moon.jfif');
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(8, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
    })
  );
    scene.add(moon);



// ----------------- Scrollowanie tekstu --------------------
    //moon.position.z = 30;
    //moon.position.setX(-10);
    function moveCamera(){
      camera.position.z = cameraPosition;
      const temp = document.body.getBoundingClientRect().top;
        moon.rotation.x += 0.02;
        moon.rotation.y += 0.04;
        moon.rotation.z += 0.02;

        camera.position.z = -temp * -0.002;
        camera.position.x = -temp * -0.0002;
        camera.position.y = -temp * -0.0002;
    }

    document.body.onscroll = moveCamera; // odpalanie funckji moveCamera przy kazdym scrollu


// ----------------------------------------------------------

  function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    moon.rotation.y += 0.008;
    
    renderer.render(scene,camera);
  }

  animate();
