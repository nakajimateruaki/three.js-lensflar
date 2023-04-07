import * as THREE from "./build/three.module.js";
// import { FlyControls } from "./jsm/controls/FlyControls.js";

window.addEventListener("load", init);

const clock = new THREE.Clock();
let controls;

function init() {
  //レンダラー作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#vmCanvas"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  //カメラを作成
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    15000
  );
  camera.position.z = 250;

  //シーンを作成
  const scene = new THREE.Scene();

  //光源
  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 白色の光源を作成
  // scene.add(ambientLight);

  //ボックスを作成
  const size = 250;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 50,
  });
  for (let i = 0; i < 2500; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
    //回転をランダムに決める
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    scene.add(mesh);
  }

  // 3D素材を作成
  // const gltfLoader = new THREE.GLTFLoader();
  // gltfLoader.load("vw.glb", function (data) {
  //   const gltf = data;
  //   const obj = gltf.scene;
  //   // スケールの設定
  //   obj.scale.set(50, 50, 50); // 0.5倍に縮小
  //   scene.add(obj);

  //   // 回転の設定
  //   function animate() {
  //     obj.rotation.y += 0.01; // Y軸周りに回転
  //     requestAnimationFrame(animate);
  //   }
  //    animate();
  // });

  //平行光源
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.03);
  scene.add(dirLight);

  addLight(0.08, 0.3, 0.9, 0, 0, -1000);

  //ポイント光源
  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);
  }

  //マウスコントロール
  // controls = new FlyControls(camera, renderer.domElement);

  //レンダリング
  renderer.render(scene, camera);
}
