import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TilesRenderer } from '3d-tiles-renderer';

class TilesViewer {
  constructor(options) {
    const {
      container,
      tilesetUrl,
      onSelect,
      onReady,
      onError,
    } = options;

    this.container = container;
    this.onSelect = onSelect;
    this.onReady = onReady;
    this.onError = onError;

    // 状态管理
    this.globalFeatures = [];
    this.meshColorMap = new WeakMap();
    this.globalIdToMeshes = new Map();
    this.hiddenGlobalIds = new Set();
    this.businessHighlightIds = new Set();
    this.clickHighlightId = null;
    this.isFirstLoad = true;
    this.pointerDownPos = { x: 0, y: 0 };
    this.isPointerDown = false;

    this._initScene();
    this._initTiles(tilesetUrl);
    this._bindEvents();
    this._animate();
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111122);
    this.scene.fog = new THREE.FogExp2(0x111122, 0.0003);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      5000
    );
    this.camera.position.set(10, 10, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.screenSpacePanning = true;

    const gridHelper = new THREE.GridHelper(200, 20, 0x88aaff, 0x335588);
    gridHelper.position.y = -1;
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(50);
    this.scene.add(axesHelper);

    const originSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xff3333, emissive: 0x330000 })
    );
    this.scene.add(originSphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);
    const hemiLight = new THREE.HemisphereLight(0x8bb5ff, 0x3b2a1f, 0.9);
    this.scene.add(hemiLight);
    const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
    mainLight.position.set(6, 12, 8);
    mainLight.castShadow = true;
    this.scene.add(mainLight);
    const backLight = new THREE.DirectionalLight(0x88aaff, 0.6);
    backLight.position.set(-4, 5, -6);
    this.scene.add(backLight);
    const rightFill = new THREE.DirectionalLight(0xffaa88, 0.5);
    rightFill.position.set(4, 3, 5);
    this.scene.add(rightFill);
    const fillPoint = new THREE.PointLight(0xffaa66, 0.35);
    fillPoint.position.set(2, 3, 2);
    this.scene.add(fillPoint);
    const leftFill = new THREE.DirectionalLight(0xaaccff, 0.4);
    leftFill.position.set(-3, 4, 3);
    this.scene.add(leftFill);
  }

  _initTiles(tilesetUrl) {
    this.tilesRenderer = new TilesRenderer(tilesetUrl);
    this.tilesRenderer.maximumScreenSpaceError = 16;
    this.tilesRenderer.maxCacheSize = 200;
    this.tilesRenderer.displayActiveTiles = true;
    this.tilesRenderer.fetchOptions = { mode: 'cors', cache: 'no-store' };
    this.tilesRenderer.setCamera(this.camera);
    this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer);
    this.tilesRenderer.group.rotation.x = Math.PI;
    this.scene.add(this.tilesRenderer.group);

    this.tilesRenderer.addEventListener('load-model', (event) => {
      this._onLoadModel(event);
    });

    this.tilesRenderer.addEventListener('load-root-tileset', () => {
      if (this.isFirstLoad) {
        setTimeout(() => {
          this._fitCamera();
          this.isFirstLoad = false;
          if (this.onReady) this.onReady();
        }, 100);
      }
    });

    this.tilesRenderer.addEventListener('load-error', (e) => {
      console.error('Tileset 加载错误:', e.url, e.error);
      if (this.onError) this.onError(e);
    });
  }

  _onLoadModel(event) {
    const { scene: modelScene } = event;
    const batchTable = modelScene.batchTable || modelScene.userData?.batchTable;
    const header = batchTable?.header;

    if (!header || !header.GlobalId) {
      console.warn('BatchTable 缺少 GlobalId 字段');
      return;
    }

    const globalIds = header.GlobalId;
    const names = header.Name || [];
    const types = header.Type || [];
    const count = globalIds.length;
    const startIdx = this.globalFeatures.length;

    for (let i = 0; i < count; i++) {
      this.globalFeatures.push({
        globalId: globalIds[i],
        name: names[i] || '',
        type: types[i] || ''
      });
    }

    modelScene.userData.featureOffset = startIdx;

    modelScene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false;
        child.userData.batchTable = batchTable;
        child.userData.featureOffset = startIdx;

        const featureId = this._getFeatureIdFromMesh(child);
        const feature = this.globalFeatures[featureId];

        if (feature?.globalId) {
          const globalId = feature.globalId;
          if (!this.globalIdToMeshes.has(globalId)) {
            this.globalIdToMeshes.set(globalId, []);
          }
          this.globalIdToMeshes.get(globalId).push(child);
        }

        this._prepareMeshMaterial(child);

        if (feature && this.hiddenGlobalIds.has(feature.globalId)) {
          child.visible = false;
        }

        if (feature && this.businessHighlightIds.has(feature.globalId)) {
          const mat = Array.isArray(child.material) ? child.material[0] : child.material;
          if (mat) mat.color.set(0xff8800);
        }
      }
    });
  }

  _getFeatureIdFromMesh(mesh) {
    const geometry = mesh.geometry;
    const batchIdAttr = geometry?.attributes?._BATCHID || geometry?.attributes?._batchid;
    if (!batchIdAttr) return undefined;

    const batchId = batchIdAttr.getX(0);
    const featureOffset = mesh.userData?.featureOffset;

    if (!Number.isInteger(batchId) || !Number.isInteger(featureOffset)) {
      return undefined;
    }

    return featureOffset + batchId;
  }

  _getBatchIdFromHit(hit) {
    if (Number.isInteger(hit.batchId)) return hit.batchId;
    if (Number.isInteger(hit.featureId)) return hit.featureId;

    const geometry = hit.object?.geometry;
    const batchIdAttr = geometry?.attributes?._BATCHID || geometry?.attributes?._batchid;
    if (!batchIdAttr) return undefined;

    const faceIndex = hit.faceIndex;
    const vertexIndex = hit.face?.a ?? (Number.isInteger(faceIndex) ? faceIndex * 3 : 0);
    if (vertexIndex < 0 || vertexIndex >= batchIdAttr.count) return undefined;

    return batchIdAttr.getX(vertexIndex);
  }

  _getFeatureIdFromHit(hit) {
    const mesh = hit.object;
    const batchId = this._getBatchIdFromHit(hit);
    const featureOffset = mesh.userData?.featureOffset;

    if (!Number.isInteger(batchId) || !Number.isInteger(featureOffset)) {
      return undefined;
    }

    return featureOffset + batchId;
  }

  _getMaterials(mesh) {
    if (!mesh.material) return [];
    return Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  }

  _prepareMeshMaterial(mesh) {
    const materials = this._getMaterials(mesh);
    if (materials.length === 0) return;

    materials.forEach((material) => {
      material.side = THREE.DoubleSide;
      material.depthTest = true;
      material.depthWrite = true;
    });

    if (!this.meshColorMap.has(mesh)) {
      this.meshColorMap.set(mesh, materials.map((material) => material.color.clone()));
    }
  }

  _setMeshColor(mesh, color) {
    this._getMaterials(mesh).forEach((material) => {
      material.color.set(color);
    });
  }

  _restoreMeshColor(mesh) {
    const originalColors = this.meshColorMap.get(mesh);
    if (!originalColors) return;

    this._getMaterials(mesh).forEach((material, index) => {
      const originalColor = originalColors[index] || originalColors[0];
      if (originalColor) {
        material.color.copy(originalColor);
      }
    });
  }

  _bindEvents() {
    this._handlePointerDownBound = this._handlePointerDown.bind(this);
    this._handlePointerUpBound = this._handlePointerUp.bind(this);
    this._handleResizeBound = this._handleResize.bind(this);

    this.renderer.domElement.addEventListener('pointerdown', this._handlePointerDownBound);
    this.renderer.domElement.addEventListener('pointerup', this._handlePointerUpBound);
    window.addEventListener('resize', this._handleResizeBound);
  }

  _handlePointerDown(event) {
    this.pointerDownPos.x = event.clientX;
    this.pointerDownPos.y = event.clientY;
    this.isPointerDown = true;
  }

  _handlePointerUp(event) {
    if (!this.isPointerDown) return;

    this.isPointerDown = false;
    const dx = event.clientX - this.pointerDownPos.x;
    const dy = event.clientY - this.pointerDownPos.y;
    if (Math.sqrt(dx * dx + dy * dy) > 5) return;

    this._handleClick(event);
  }

  _handleClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    this.tilesRenderer.group.updateWorldMatrix(true, true);
    const hits = [];
    this.tilesRenderer.raycast(raycaster, hits);

    const validHits = hits.filter((hit) => hit.object?.isMesh && this._getFeatureIdFromHit(hit) !== undefined);
    const backupHits = validHits.length > 0
      ? []
      : raycaster
        .intersectObject(this.tilesRenderer.group, true)
        .filter((hit) => hit.object?.isMesh && this._getFeatureIdFromHit(hit) !== undefined);
    const candidates = validHits.length > 0 ? validHits : backupHits;

    if (candidates.length === 0) {
      this._clearClickHighlight();
      return;
    }

    const hit = candidates[0];
    const featureId = this._getFeatureIdFromHit(hit);

    if (featureId === undefined || featureId >= this.globalFeatures.length) {
      return;
    }

    const feature = this.globalFeatures[featureId];

    if (feature && this.onSelect) {
      this.onSelect({
        globalId: feature.globalId,
        name: feature.name,
        type: feature.type
      });
    }

    this._applyClickHighlight(featureId);
  }

  _handleResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer);
  }

  _applyClickHighlight(featureId) {
    this._clearClickHighlight();

    const feature = this.globalFeatures[featureId];
    if (this.businessHighlightIds.has(feature.globalId)) {
      return;
    }

    const meshes = this.globalIdToMeshes.get(feature.globalId);
    if (meshes) {
      meshes.forEach(mesh => {
        if (mesh.material) {
          this._setMeshColor(mesh, 0xffaa00);
        }
      });
    }

    this.clickHighlightId = featureId;
  }

  _clearClickHighlight() {
    if (this.clickHighlightId !== null) {
      const feature = this.globalFeatures[this.clickHighlightId];
      if (feature && !this.businessHighlightIds.has(feature.globalId)) {
        const meshes = this.globalIdToMeshes.get(feature.globalId);
        if (meshes) {
          meshes.forEach(mesh => {
            this._restoreMeshColor(mesh);
          });
        }
      }
      this.clickHighlightId = null;
    }
  }

  _fitCamera() {
    const sphere = this._getWorldBoundingSphere();

    if (sphere && sphere.radius > 0 && !isNaN(sphere.center.x)) {
      const fitOffset = 1.15;
      const verticalFov = THREE.MathUtils.degToRad(this.camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * this.camera.aspect);
      const fitFov = Math.min(verticalFov, horizontalFov);
      const distance = (sphere.radius / Math.sin(fitFov / 2)) * fitOffset;
      const direction = new THREE.Vector3(1, 0.3, 1).normalize();
      const enableDamping = this.controls.enableDamping;

      this.controls.enableDamping = false;
      this.controls.update();
      this.camera.position.copy(sphere.center).addScaledVector(direction, distance);
      this.camera.near = Math.max(distance / 1000, 0.1);
      this.camera.far = Math.max(distance + sphere.radius * 4, 5000);
      this.camera.updateProjectionMatrix();
      this.controls.target.copy(sphere.center);
      this.controls.update();
      this.controls.enableDamping = enableDamping;
    }
  }

  _animate() {
    this._animationId = requestAnimationFrame(() => this._animate());
    this.camera.updateMatrixWorld();
    this.tilesRenderer.update();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  resetCamera() {
    this._fitCamera();
  }

  _getWorldBoundingSphere() {
    const sphere = new THREE.Sphere();
    const hasSphere = this.tilesRenderer.getBoundingSphere(sphere);
    if (!hasSphere || sphere.radius <= 0 || isNaN(sphere.center.x)) {
      return null;
    }

    this.tilesRenderer.group.updateWorldMatrix(true, true);
    sphere.applyMatrix4(this.tilesRenderer.group.matrixWorld);
    return sphere;
  }

  getBoundingSphere() {
    const sphere = this._getWorldBoundingSphere();
    if (!sphere) return null;

    return {
      center: sphere.center.clone(),
      radius: sphere.radius
    };
  }

  hideByGlobalIds(globalIds) {
    globalIds.forEach(globalId => {
      const meshes = this.globalIdToMeshes.get(globalId);
      if (meshes) {
        meshes.forEach(mesh => {
          mesh.visible = false;
        });
      }
      this.hiddenGlobalIds.add(globalId);
    });
  }

  showByGlobalIds(globalIds) {
    globalIds.forEach(globalId => {
      const meshes = this.globalIdToMeshes.get(globalId);
      if (meshes) {
        meshes.forEach(mesh => {
          mesh.visible = true;
        });
      }
      this.hiddenGlobalIds.delete(globalId);
    });
  }

  highlightByGlobalIds(globalIds) {
    this.clearHighlight();

    globalIds.forEach(globalId => {
      const meshes = this.globalIdToMeshes.get(globalId);
      if (meshes) {
        meshes.forEach(mesh => {
          if (mesh.material) {
            this._setMeshColor(mesh, 0xff8800);
          }
        });
      }
      this.businessHighlightIds.add(globalId);
    });
  }

  clearHighlight() {
    this.businessHighlightIds.forEach(globalId => {
      const meshes = this.globalIdToMeshes.get(globalId);
      if (meshes) {
        meshes.forEach(mesh => {
          this._restoreMeshColor(mesh);
        });
      }
    });
    this.businessHighlightIds.clear();
  }

  destroy() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }

    this.renderer.domElement.removeEventListener('pointerdown', this._handlePointerDownBound);
    this.renderer.domElement.removeEventListener('pointerup', this._handlePointerUpBound);
    window.removeEventListener('resize', this._handleResizeBound);

    this.tilesRenderer.dispose();
    this.renderer.dispose();

    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }

    this.globalFeatures = [];
    this.globalIdToMeshes.clear();
    this.hiddenGlobalIds.clear();
    this.businessHighlightIds.clear();
    this.meshColorMap = null;
  }
}

const ThreeTilesViewer = {
  name: 'ThreeTilesViewer',

  props: {
    tilesetUrl: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      viewer: null
    };
  },

  mounted() {
    this.viewer = new TilesViewer({
      container: this.$refs.container,
      tilesetUrl: this.tilesetUrl,
      onSelect: (feature) => {
        this.$emit('select', feature);
      },
      onReady: () => {
        this.$emit('ready');
      },
      onError: (error) => {
        this.$emit('error', error);
      }
    });
  },

  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  },

  methods: {
    resetCamera() {
      if (this.viewer) {
        this.viewer.resetCamera();
      }
    },

    getBoundingSphere() {
      if (this.viewer) {
        return this.viewer.getBoundingSphere();
      }
      return null;
    },

    hideByGlobalIds(globalIds) {
      if (this.viewer) {
        this.viewer.hideByGlobalIds(globalIds);
      }
    },

    showByGlobalIds(globalIds) {
      if (this.viewer) {
        this.viewer.showByGlobalIds(globalIds);
      }
    },

    highlightByGlobalIds(globalIds) {
      if (this.viewer) {
        this.viewer.highlightByGlobalIds(globalIds);
      }
    },

    clearHighlight() {
      if (this.viewer) {
        this.viewer.clearHighlight();
      }
    }
  },

  render(h) {
    return h('div', {
      ref: 'container',
      class: 'tiles-viewer',
      style: {
        width: '100%',
        height: '100%',
        position: 'relative'
      }
    });
  }
};

ThreeTilesViewer.install = function(Vue) {
  Vue.component(ThreeTilesViewer.name, ThreeTilesViewer);
};

export { ThreeTilesViewer as default };
