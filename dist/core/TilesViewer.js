import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TilesRenderer } from '3d-tiles-renderer';

export class TilesViewer {
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

    this._initScene();
    this._initTiles(tilesetUrl);
    this._bindEvents();
    this._animate();
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111122);

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
    mainLight.position.set(6, 12, 8);
    this.scene.add(mainLight);

    const gridHelper = new THREE.GridHelper(200, 20, 0x88aaff, 0x335588);
    gridHelper.position.y = -1;
    this.scene.add(gridHelper);
  }

  _initTiles(tilesetUrl) {
    this.tilesRenderer = new TilesRenderer(tilesetUrl);
    this.tilesRenderer.maximumScreenSpaceError = 16;
    this.tilesRenderer.setCamera(this.camera);
    this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer);
    this.tilesRenderer.group.rotation.x = Math.PI;
    this.scene.add(this.tilesRenderer.group);

    this.tilesRenderer.addEventListener('load-model', (event) => {
      this._onLoadModel(event);
    });

    this.tilesRenderer.addEventListener('load-root-tileset', () => {
      this._fitCamera();
      if (this.onReady) this.onReady();
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
        child.rotation.x = Math.PI;
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

        if (child.material) {
          const mat = Array.isArray(child.material) ? child.material[0] : child.material;
          this.meshColorMap.set(child, mat.color.clone());
        }

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

  _getFeatureIdFromHit(hit) {
    const mesh = hit.object;
    const geometry = mesh.geometry;
    const batchIdAttr = geometry?.attributes?._BATCHID || geometry?.attributes?._batchid;

    if (!batchIdAttr) return undefined;

    const faceIndex = hit.faceIndex;
    const batchId = batchIdAttr.getX(faceIndex * 3);
    const featureOffset = mesh.userData?.featureOffset;

    if (!Number.isInteger(batchId) || !Number.isInteger(featureOffset)) {
      return undefined;
    }

    return featureOffset + batchId;
  }

  _bindEvents() {
    this._handleClickBound = this._handleClick.bind(this);
    this._handleResizeBound = this._handleResize.bind(this);

    this.renderer.domElement.addEventListener('click', this._handleClickBound);
    window.addEventListener('resize', this._handleResizeBound);
  }

  _handleClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    raycaster.firstHitOnly = true;

    const hits = this.tilesRenderer.raycast(raycaster);

    if (!hits || hits.length === 0) {
      this._clearClickHighlight();
      return;
    }

    const hit = hits[0];
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
          const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          mat.color.set(0x88ccff);
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
            const originalColor = this.meshColorMap.get(mesh);
            if (originalColor && mesh.material) {
              const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
              mat.color.copy(originalColor);
            }
          });
        }
      }
      this.clickHighlightId = null;
    }
  }

  _fitCamera() {
    const sphere = new THREE.Sphere();
    this.tilesRenderer.getBoundingSphere(sphere);

    if (sphere.radius > 0 && !isNaN(sphere.center.x)) {
      const distance = sphere.radius * 1.5;
      this.camera.position.set(
        sphere.center.x + distance,
        sphere.center.y + distance * 0.3,
        sphere.center.z + distance
      );
      this.controls.target.copy(sphere.center);
      this.controls.update();
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
            const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            mat.color.set(0xff8800);
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
          const originalColor = this.meshColorMap.get(mesh);
          if (originalColor && mesh.material) {
            const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            mat.color.copy(originalColor);
          }
        });
      }
    });
    this.businessHighlightIds.clear();
  }

  destroy() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }

    this.renderer.domElement.removeEventListener('click', this._handleClickBound);
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
