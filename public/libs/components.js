import * as THREE from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { IfcAPI } from 'web-ifc';
import { IFCLoader } from 'web-ifc-three';

const OBC = {
  Components: class Components {
    constructor() {
      this.components = new Map();
    }

    add(component) {
      this.components.set(component.name, component);
    }

    async init() {
      for (const component of this.components.values()) {
        if (component.init) {
          await component.init();
        }
      }
    }

    get(component) {
      return this.components.get(component.name);
    }
  },

  SimpleScene: class SimpleScene {
    static name = 'SimpleScene';
    
    setup() {
      this.three = new THREE.Scene();
      this.three.background = new THREE.Color(0xffffff);
    }
  },

  SimpleCamera: class SimpleCamera {
    static name = 'SimpleCamera';
    
    constructor() {
      this.three = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.controls = new THREE.OrbitControls(this.three);
    }
  },

  SimpleRenderer: class SimpleRenderer {
    static name = 'SimpleRenderer';
    
    constructor() {
      this.three = new THREE.WebGLRenderer({ antialias: true });
      this.three.setSize(window.innerWidth, window.innerHeight);
    }
  },

  FragmentsManager: class FragmentsManager {
    static name = 'FragmentsManager';
  },

  IfcLoader: class IfcLoader {
    static name = 'IfcLoader';
    
    constructor() {
      this.ifcLoader = new IFCLoader();
    }

    async setup() {
      await this.ifcLoader.ifcManager.setWasmPath('./');
    }

    async load(data) {
      return await this.ifcLoader.parse(data);
    }
  }
};

export default OBC;
