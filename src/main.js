import * as OBC from "@thatopen/components";

const container = document.getElementById("viewer-container");

const components = new OBC.Components();
components.scene = new OBC.SimpleScene(components);
components.renderer = new OBC.SimpleRenderer(components, container);
components.camera = new OBC.SimpleCamera(components);
components.init();

components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
components.scene.three.background = null;

const fragmentLoader = components.get(OBC.IfcLoader);
await fragmentLoader.setup();
fragmentLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;

// Lấy file từ URL ?file=...
const urlParams = new URLSearchParams(window.location.search);
const fileName = urlParams.get("file");
if (!fileName) {
  alert("Không có file IFC được chỉ định!");
  throw new Error("Thiếu query ?file=");
}

// Proxy URL
const proxyUrl = "https://my-ifc-project.onrender.com";

const fileRes = await fetch(`${proxyUrl}/download-ifc?file=${encodeURIComponent(fileName)}`);
if (!fileRes.ok) {
  alert("Lỗi tải file từ proxy!");
  throw new Error("Lỗi tải file");
}
const buffer = await fileRes.arrayBuffer();
const model = await fragmentLoader.load(new Uint8Array(buffer));
model.name = fileName;

components.scene.three.add(model);
components.camera.controls.fitToSphere();
