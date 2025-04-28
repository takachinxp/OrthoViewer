import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js';
import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/loaders/STLLoader.js';

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,100);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff,0x444444,1);
scene.add(light);

function animate(){requestAnimationFrame(animate);renderer.render(scene,camera);}animate();

document.getElementById('file').addEventListener('change', e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    const loader=new STLLoader();
    const geo= loader.parse(ev.target.result);
    const mat=new THREE.MeshStandardMaterial({color:0x607d8b});
    const mesh=new THREE.Mesh(geo,mat);
    scene.clear();
    scene.add(light);
    scene.add(mesh);
    const box=new THREE.Box3().setFromObject(mesh);
    const size=box.getSize(new THREE.Vector3()).length();
    const center=box.getCenter(new THREE.Vector3());
    mesh.geometry.center();
    camera.position.set(0,0,size*1.5);
    camera.lookAt(0,0,0);
  };
  reader.readAsArrayBuffer(file);
});