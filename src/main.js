
import * as OBC from "/libs/components.js";

(async function() {
  const container = document.getElementById('app');
  if (!container) {
    console.error("❌ Không tìm thấy #container trong DOM.");
    return;
  }

  // Khởi tạo components
  const components = new OBC.Components();
  components.add(OBC.SimpleScene);
  components.add(OBC.SimpleCamera);
  components.add(OBC.SimpleRenderer);
  components.add(OBC.FragmentsManager);
  components.add(OBC.IfcLoader);
  await components.init();

  // Lấy các instance
  const scene = components.get(OBC.SimpleScene);
  const camera = components.get(OBC.SimpleCamera);
  const renderer = components.get(OBC.SimpleRenderer);
  const loader = components.get(OBC.IfcLoader);

  // Gắn renderer vào DOM
  if (renderer && renderer.three && container) {
    container.appendChild(renderer.three.domElement);
  }

  // Thiết lập scene, camera
  scene.setup();
  camera.controls?.setLookAt?.(10, 10, 10, 0, 0, 0);
  scene.three.background = null;
  await loader.setup();

  // Proxy server hiện tại
  const baseProxy = "https://my-ifc-project.onrender.com";

  // Lấy danh sách tên file IFC
  async function fetchAllFileNames() {
    const res = await fetch(`${baseProxy}/list-ifc`);
    const files = await res.json();
    return files;
  }

  // Load tất cả các file IFC
  async function loadAllIfcs() {
    try {
      const start = performance.now();
      const fileNames = await fetchAllFileNames();
      console.log("📂 Danh sách file IFC:", fileNames);
      for (const fileName of fileNames) {
        const fileRes = await fetch(`${baseProxy}/download-ifc?file=${encodeURIComponent(fileName)}`);
        const buffer = await fileRes.arrayBuffer();
        const model = await loader.load(new Uint8Array(buffer));
        model.name = fileName;
        scene.three.add(model);
      }
      camera.controls?.fitToSphere?.();
      const end = performance.now();
      console.log(`✅ Đã tải xong ${fileNames.length} file IFC trong ${(end - start).toFixed(2)} ms`);
    } catch (err) {
      console.error("❌ Lỗi khi tải IFC:", err);
    }
  }

  // Bắt đầu
  loadAllIfcs();
})();

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
