import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js';
import { STLLoader }     from 'https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 2000);
camera.position.set(0,0,200);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.HemisphereLight(0xffffff,0x444444,1));

function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}animate();

document.getElementById('file').addEventListener('change', e=>{
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload = ev => {
    const loader=new STLLoader();
    const geo = loader.parse(ev.target.result);
    const mat = new THREE.MeshStandardMaterial({color:0x607d8b});
    const mesh = new THREE.Mesh(geo,mat);
    // remove previous meshes
    [...scene.children].forEach(o=>{ if(o.isMesh) scene.remove(o); });
    scene.add(mesh);
    geo.computeBoundingBox();
    const size = geo.boundingBox.getSize(new THREE.Vector3()).length();
    geo.center();
    camera.position.set(0,0,size*1.5);
    controls.target.set(0,0,0);
    controls.update();
  };
  reader.readAsArrayBuffer(file);
});