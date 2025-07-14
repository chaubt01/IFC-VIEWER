import * as OBC from "/libs/components.js";

async function startViewer() {
  const PROXY = import.meta.env.VITE_PROXY_URL;
  const file = new URLSearchParams(location.search).get('file');
  if (!file) {
    alert("Thiếu ?file="); return;
  }

  const container = document.getElementById('app');
  const components = new OBC.Components();

  components.add(OBC.SimpleScene);
  components.add(OBC.SimpleCamera);
  components.add(OBC.SimpleRenderer);
  components.add(OBC.FragmentsManager);
  components.add(OBC.IfcLoader);
  await components.init();

  const scene = components.get(OBC.SimpleScene);
  const camera = components.get(OBC.SimpleCamera);
  const loader = components.get(OBC.IfcLoader);

  scene.setup();
  camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
  await loader.setup();

  const res = await fetch(`${PROXY}/download-ifc?file=${encodeURIComponent(file)}`);
  const data = new Uint8Array(await res.arrayBuffer());
  const model = await loader.load(data);

  scene.three.add(model);
  camera.controls.fitToSphere();
}

startViewer();  // ✅ Gọi async function
