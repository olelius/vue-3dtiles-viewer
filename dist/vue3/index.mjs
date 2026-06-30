import { ref as _e, onMounted as Ve, onBeforeUnmount as qe, openBlock as Qe, createElementBlock as $e } from "vue";
import * as m from "three";
import { Ray as Je, Plane as et, MathUtils as tt, EventDispatcher as nt, Vector3 as I, MOUSE as N, TOUCH as F, Quaternion as Pe, Spherical as xe, Vector2 as T } from "three";
import { TilesRenderer as ot } from "3d-tiles-renderer";
const Re = { type: "change" }, te = { type: "start" }, De = { type: "end" }, Z = new Je(), Le = new et(), it = Math.cos(70 * tt.DEG2RAD);
class st extends nt {
  constructor(n, i) {
    super(), this.object = n, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new I(), this.cursor = new I(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: N.ROTATE, MIDDLE: N.DOLLY, RIGHT: N.PAN }, this.touches = { ONE: F.ROTATE, TWO: F.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(t) {
      t.addEventListener("keydown", ee), this._domElementKeyEvents = t;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ee), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Re), e.update(), a = o.NONE;
    }, this.update = function() {
      const t = new I(), s = new Pe().setFromUnitVectors(n.up, new I(0, 1, 0)), c = s.clone().invert(), u = new I(), E = new Pe(), L = new I(), M = 2 * Math.PI;
      return function(Ze = null) {
        const Me = e.object.position;
        t.copy(Me).sub(e.target), t.applyQuaternion(s), l.setFromVector3(t), e.autoRotate && a === o.NONE && Y(Se(Ze)), e.enableDamping ? (l.theta += d.theta * e.dampingFactor, l.phi += d.phi * e.dampingFactor) : (l.theta += d.theta, l.phi += d.phi);
        let P = e.minAzimuthAngle, x = e.maxAzimuthAngle;
        isFinite(P) && isFinite(x) && (P < -Math.PI ? P += M : P > Math.PI && (P -= M), x < -Math.PI ? x += M : x > Math.PI && (x -= M), P <= x ? l.theta = Math.max(P, Math.min(x, l.theta)) : l.theta = l.theta > (P + x) / 2 ? Math.max(P, l.theta) : Math.min(x, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(g, e.dampingFactor) : e.target.add(g), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let B = !1;
        if (e.zoomToCursor && G || e.object.isOrthographicCamera)
          l.radius = $(l.radius);
        else {
          const R = l.radius;
          l.radius = $(l.radius * p), B = R != l.radius;
        }
        if (t.setFromSpherical(l), t.applyQuaternion(c), Me.copy(e.target).add(t), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, g.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), g.set(0, 0, 0)), e.zoomToCursor && G) {
          let R = null;
          if (e.object.isPerspectiveCamera) {
            const U = t.length();
            R = $(U * p);
            const W = U - R;
            e.object.position.addScaledVector(oe, W), e.object.updateMatrixWorld(), B = !!W;
          } else if (e.object.isOrthographicCamera) {
            const U = new I(D.x, D.y, 0);
            U.unproject(e.object);
            const W = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), B = W !== e.object.zoom;
            const Te = new I(D.x, D.y, 0);
            Te.unproject(e.object), e.object.position.sub(Te).add(U), e.object.updateMatrixWorld(), R = t.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          R !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(R).add(e.object.position) : (Z.origin.copy(e.object.position), Z.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(Z.direction)) < it ? n.lookAt(e.target) : (Le.setFromNormalAndCoplanarPoint(e.object.up, e.target), Z.intersectPlane(Le, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const R = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), R !== e.object.zoom && (e.object.updateProjectionMatrix(), B = !0);
        }
        return p = 1, G = !1, B || u.distanceToSquared(e.object.position) > h || 8 * (1 - E.dot(e.object.quaternion)) > h || L.distanceToSquared(e.target) > h ? (e.dispatchEvent(Re), u.copy(e.object.position), E.copy(e.object.quaternion), L.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", we), e.domElement.removeEventListener("pointerdown", pe), e.domElement.removeEventListener("pointercancel", z), e.domElement.removeEventListener("wheel", ge), e.domElement.removeEventListener("pointermove", J), e.domElement.removeEventListener("pointerup", z), e.domElement.getRootNode().removeEventListener("keydown", be, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", ee), e._domElementKeyEvents = null);
    };
    const e = this, o = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let a = o.NONE;
    const h = 1e-6, l = new xe(), d = new xe();
    let p = 1;
    const g = new I(), r = new T(), y = new T(), f = new T(), w = new T(), S = new T(), C = new T(), A = new T(), j = new T(), O = new T(), oe = new I(), D = new T();
    let G = !1;
    const b = [], v = {};
    let V = !1;
    function Se(t) {
      return t !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * t : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function K(t) {
      const s = Math.abs(t * 0.01);
      return Math.pow(0.95, e.zoomSpeed * s);
    }
    function Y(t) {
      d.theta -= t;
    }
    function X(t) {
      d.phi -= t;
    }
    const ie = function() {
      const t = new I();
      return function(c, u) {
        t.setFromMatrixColumn(u, 0), t.multiplyScalar(-c), g.add(t);
      };
    }(), se = function() {
      const t = new I();
      return function(c, u) {
        e.screenSpacePanning === !0 ? t.setFromMatrixColumn(u, 1) : (t.setFromMatrixColumn(u, 0), t.crossVectors(e.object.up, t)), t.multiplyScalar(c), g.add(t);
      };
    }(), k = function() {
      const t = new I();
      return function(c, u) {
        const E = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const L = e.object.position;
          t.copy(L).sub(e.target);
          let M = t.length();
          M *= Math.tan(e.object.fov / 2 * Math.PI / 180), ie(2 * c * M / E.clientHeight, e.object.matrix), se(2 * u * M / E.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (ie(c * (e.object.right - e.object.left) / e.object.zoom / E.clientWidth, e.object.matrix), se(u * (e.object.top - e.object.bottom) / e.object.zoom / E.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function q(t) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function ae(t) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Q(t, s) {
      if (!e.zoomToCursor)
        return;
      G = !0;
      const c = e.domElement.getBoundingClientRect(), u = t - c.left, E = s - c.top, L = c.width, M = c.height;
      D.x = u / L * 2 - 1, D.y = -(E / M) * 2 + 1, oe.set(D.x, D.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function $(t) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, t));
    }
    function re(t) {
      r.set(t.clientX, t.clientY);
    }
    function Oe(t) {
      Q(t.clientX, t.clientX), A.set(t.clientX, t.clientY);
    }
    function le(t) {
      w.set(t.clientX, t.clientY);
    }
    function Ce(t) {
      y.set(t.clientX, t.clientY), f.subVectors(y, r).multiplyScalar(e.rotateSpeed);
      const s = e.domElement;
      Y(2 * Math.PI * f.x / s.clientHeight), X(2 * Math.PI * f.y / s.clientHeight), r.copy(y), e.update();
    }
    function Ae(t) {
      j.set(t.clientX, t.clientY), O.subVectors(j, A), O.y > 0 ? q(K(O.y)) : O.y < 0 && ae(K(O.y)), A.copy(j), e.update();
    }
    function je(t) {
      S.set(t.clientX, t.clientY), C.subVectors(S, w).multiplyScalar(e.panSpeed), k(C.x, C.y), w.copy(S), e.update();
    }
    function ke(t) {
      Q(t.clientX, t.clientY), t.deltaY < 0 ? ae(K(t.deltaY)) : t.deltaY > 0 && q(K(t.deltaY)), e.update();
    }
    function He(t) {
      let s = !1;
      switch (t.code) {
        case e.keys.UP:
          t.ctrlKey || t.metaKey || t.shiftKey ? X(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : k(0, e.keyPanSpeed), s = !0;
          break;
        case e.keys.BOTTOM:
          t.ctrlKey || t.metaKey || t.shiftKey ? X(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : k(0, -e.keyPanSpeed), s = !0;
          break;
        case e.keys.LEFT:
          t.ctrlKey || t.metaKey || t.shiftKey ? Y(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : k(e.keyPanSpeed, 0), s = !0;
          break;
        case e.keys.RIGHT:
          t.ctrlKey || t.metaKey || t.shiftKey ? Y(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : k(-e.keyPanSpeed, 0), s = !0;
          break;
      }
      s && (t.preventDefault(), e.update());
    }
    function ce(t) {
      if (b.length === 1)
        r.set(t.pageX, t.pageY);
      else {
        const s = H(t), c = 0.5 * (t.pageX + s.x), u = 0.5 * (t.pageY + s.y);
        r.set(c, u);
      }
    }
    function he(t) {
      if (b.length === 1)
        w.set(t.pageX, t.pageY);
      else {
        const s = H(t), c = 0.5 * (t.pageX + s.x), u = 0.5 * (t.pageY + s.y);
        w.set(c, u);
      }
    }
    function de(t) {
      const s = H(t), c = t.pageX - s.x, u = t.pageY - s.y, E = Math.sqrt(c * c + u * u);
      A.set(0, E);
    }
    function Ne(t) {
      e.enableZoom && de(t), e.enablePan && he(t);
    }
    function Fe(t) {
      e.enableZoom && de(t), e.enableRotate && ce(t);
    }
    function ue(t) {
      if (b.length == 1)
        y.set(t.pageX, t.pageY);
      else {
        const c = H(t), u = 0.5 * (t.pageX + c.x), E = 0.5 * (t.pageY + c.y);
        y.set(u, E);
      }
      f.subVectors(y, r).multiplyScalar(e.rotateSpeed);
      const s = e.domElement;
      Y(2 * Math.PI * f.x / s.clientHeight), X(2 * Math.PI * f.y / s.clientHeight), r.copy(y);
    }
    function me(t) {
      if (b.length === 1)
        S.set(t.pageX, t.pageY);
      else {
        const s = H(t), c = 0.5 * (t.pageX + s.x), u = 0.5 * (t.pageY + s.y);
        S.set(c, u);
      }
      C.subVectors(S, w).multiplyScalar(e.panSpeed), k(C.x, C.y), w.copy(S);
    }
    function fe(t) {
      const s = H(t), c = t.pageX - s.x, u = t.pageY - s.y, E = Math.sqrt(c * c + u * u);
      j.set(0, E), O.set(0, Math.pow(j.y / A.y, e.zoomSpeed)), q(O.y), A.copy(j);
      const L = (t.pageX + s.x) * 0.5, M = (t.pageY + s.y) * 0.5;
      Q(L, M);
    }
    function ve(t) {
      e.enableZoom && fe(t), e.enablePan && me(t);
    }
    function Ye(t) {
      e.enableZoom && fe(t), e.enableRotate && ue(t);
    }
    function pe(t) {
      e.enabled !== !1 && (b.length === 0 && (e.domElement.setPointerCapture(t.pointerId), e.domElement.addEventListener("pointermove", J), e.domElement.addEventListener("pointerup", z)), !We(t) && (Ke(t), t.pointerType === "touch" ? Ee(t) : ze(t)));
    }
    function J(t) {
      e.enabled !== !1 && (t.pointerType === "touch" ? Ge(t) : Be(t));
    }
    function z(t) {
      switch (Xe(t), b.length) {
        case 0:
          e.domElement.releasePointerCapture(t.pointerId), e.domElement.removeEventListener("pointermove", J), e.domElement.removeEventListener("pointerup", z), e.dispatchEvent(De), a = o.NONE;
          break;
        case 1:
          const s = b[0], c = v[s];
          Ee({ pointerId: s, pageX: c.x, pageY: c.y });
          break;
      }
    }
    function ze(t) {
      let s;
      switch (t.button) {
        case 0:
          s = e.mouseButtons.LEFT;
          break;
        case 1:
          s = e.mouseButtons.MIDDLE;
          break;
        case 2:
          s = e.mouseButtons.RIGHT;
          break;
        default:
          s = -1;
      }
      switch (s) {
        case N.DOLLY:
          if (e.enableZoom === !1)
            return;
          Oe(t), a = o.DOLLY;
          break;
        case N.ROTATE:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enablePan === !1)
              return;
            le(t), a = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            re(t), a = o.ROTATE;
          }
          break;
        case N.PAN:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enableRotate === !1)
              return;
            re(t), a = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            le(t), a = o.PAN;
          }
          break;
        default:
          a = o.NONE;
      }
      a !== o.NONE && e.dispatchEvent(te);
    }
    function Be(t) {
      switch (a) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          Ce(t);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          Ae(t);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          je(t);
          break;
      }
    }
    function ge(t) {
      e.enabled === !1 || e.enableZoom === !1 || a !== o.NONE || (t.preventDefault(), e.dispatchEvent(te), ke(Ue(t)), e.dispatchEvent(De));
    }
    function Ue(t) {
      const s = t.deltaMode, c = {
        clientX: t.clientX,
        clientY: t.clientY,
        deltaY: t.deltaY
      };
      switch (s) {
        case 1:
          c.deltaY *= 16;
          break;
        case 2:
          c.deltaY *= 100;
          break;
      }
      return t.ctrlKey && !V && (c.deltaY *= 10), c;
    }
    function be(t) {
      t.key === "Control" && (V = !0, e.domElement.getRootNode().addEventListener("keyup", ye, { passive: !0, capture: !0 }));
    }
    function ye(t) {
      t.key === "Control" && (V = !1, e.domElement.getRootNode().removeEventListener("keyup", ye, { passive: !0, capture: !0 }));
    }
    function ee(t) {
      e.enabled === !1 || e.enablePan === !1 || He(t);
    }
    function Ee(t) {
      switch (Ie(t), b.length) {
        case 1:
          switch (e.touches.ONE) {
            case F.ROTATE:
              if (e.enableRotate === !1)
                return;
              ce(t), a = o.TOUCH_ROTATE;
              break;
            case F.PAN:
              if (e.enablePan === !1)
                return;
              he(t), a = o.TOUCH_PAN;
              break;
            default:
              a = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case F.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              Ne(t), a = o.TOUCH_DOLLY_PAN;
              break;
            case F.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              Fe(t), a = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = o.NONE;
          }
          break;
        default:
          a = o.NONE;
      }
      a !== o.NONE && e.dispatchEvent(te);
    }
    function Ge(t) {
      switch (Ie(t), a) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ue(t), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          me(t), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          ve(t), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          Ye(t), e.update();
          break;
        default:
          a = o.NONE;
      }
    }
    function we(t) {
      e.enabled !== !1 && t.preventDefault();
    }
    function Ke(t) {
      b.push(t.pointerId);
    }
    function Xe(t) {
      delete v[t.pointerId];
      for (let s = 0; s < b.length; s++)
        if (b[s] == t.pointerId) {
          b.splice(s, 1);
          return;
        }
    }
    function We(t) {
      for (let s = 0; s < b.length; s++)
        if (b[s] == t.pointerId)
          return !0;
      return !1;
    }
    function Ie(t) {
      let s = v[t.pointerId];
      s === void 0 && (s = new T(), v[t.pointerId] = s), s.set(t.pageX, t.pageY);
    }
    function H(t) {
      const s = t.pointerId === b[0] ? b[1] : b[0];
      return v[s];
    }
    e.domElement.addEventListener("contextmenu", we), e.domElement.addEventListener("pointerdown", pe), e.domElement.addEventListener("pointercancel", z), e.domElement.addEventListener("wheel", ge, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", be, { passive: !0, capture: !0 }), this.update();
  }
}
class at {
  constructor(n) {
    const {
      container: i,
      tilesetUrl: e,
      onSelect: o,
      onReady: a,
      onError: h
    } = n;
    this.container = i, this.onSelect = o, this.onReady = a, this.onError = h, this.globalFeatures = [], this.meshColorMap = /* @__PURE__ */ new WeakMap(), this.globalIdToMeshes = /* @__PURE__ */ new Map(), this.hiddenGlobalIds = /* @__PURE__ */ new Set(), this.businessHighlightIds = /* @__PURE__ */ new Set(), this.clickHighlightId = null, this.isFirstLoad = !0, this.pointerDownPos = { x: 0, y: 0 }, this.isPointerDown = !1, this._initScene(), this._initTiles(e), this._bindEvents(), this._animate();
  }
  _initScene() {
    this.scene = new m.Scene(), this.scene.background = new m.Color(1118498), this.scene.fog = new m.FogExp2(1118498, 3e-4), this.camera = new m.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      5e3
    ), this.camera.position.set(10, 10, 10), this.renderer = new m.WebGLRenderer({ antialias: !0 }), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.container.appendChild(this.renderer.domElement), this.controls = new st(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.screenSpacePanning = !0;
    const n = new m.GridHelper(200, 20, 8956671, 3364232);
    n.position.y = -1, this.scene.add(n);
    const i = new m.AxesHelper(50);
    this.scene.add(i);
    const e = new m.Mesh(
      new m.SphereGeometry(0.5, 16, 16),
      new m.MeshStandardMaterial({ color: 16724787, emissive: 3342336 })
    );
    this.scene.add(e);
    const o = new m.AmbientLight(16777215, 0.65);
    this.scene.add(o);
    const a = new m.HemisphereLight(9156095, 3877407, 0.9);
    this.scene.add(a);
    const h = new m.DirectionalLight(16774630, 1.4);
    h.position.set(6, 12, 8), h.castShadow = !0, this.scene.add(h);
    const l = new m.DirectionalLight(8956671, 0.6);
    l.position.set(-4, 5, -6), this.scene.add(l);
    const d = new m.DirectionalLight(16755336, 0.5);
    d.position.set(4, 3, 5), this.scene.add(d);
    const p = new m.PointLight(16755302, 0.35);
    p.position.set(2, 3, 2), this.scene.add(p);
    const g = new m.DirectionalLight(11193599, 0.4);
    g.position.set(-3, 4, 3), this.scene.add(g);
  }
  _initTiles(n) {
    this.tilesRenderer = new ot(n), this.tilesRenderer.maximumScreenSpaceError = 16, this.tilesRenderer.maxCacheSize = 200, this.tilesRenderer.displayActiveTiles = !0, this.tilesRenderer.fetchOptions = { mode: "cors", cache: "no-store" }, this.tilesRenderer.setCamera(this.camera), this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer), this.tilesRenderer.group.rotation.x = Math.PI, this.scene.add(this.tilesRenderer.group), this.tilesRenderer.addEventListener("load-model", (i) => {
      this._onLoadModel(i);
    }), this.tilesRenderer.addEventListener("load-root-tileset", () => {
      this.isFirstLoad && setTimeout(() => {
        this._fitCamera(), this.isFirstLoad = !1, this.onReady && this.onReady();
      }, 100);
    }), this.tilesRenderer.addEventListener("load-error", (i) => {
      console.error("Tileset 加载错误:", i.url, i.error), this.onError && this.onError(i);
    });
  }
  _onLoadModel(n) {
    var g;
    const { scene: i } = n, e = i.batchTable || ((g = i.userData) == null ? void 0 : g.batchTable), o = e == null ? void 0 : e.header;
    if (!o || !o.GlobalId) {
      console.warn("BatchTable 缺少 GlobalId 字段");
      return;
    }
    const a = o.GlobalId, h = o.Name || [], l = o.Type || [], d = a.length, p = this.globalFeatures.length;
    for (let r = 0; r < d; r++)
      this.globalFeatures.push({
        globalId: a[r],
        name: h[r] || "",
        type: l[r] || ""
      });
    i.userData.featureOffset = p, i.traverse((r) => {
      if (r.isMesh) {
        r.frustumCulled = !1, r.userData.batchTable = e, r.userData.featureOffset = p;
        const y = this._getFeatureIdFromMesh(r), f = this.globalFeatures[y];
        if (f != null && f.globalId) {
          const w = f.globalId;
          this.globalIdToMeshes.has(w) || this.globalIdToMeshes.set(w, []), this.globalIdToMeshes.get(w).push(r);
        }
        if (this._prepareMeshMaterial(r), f && this.hiddenGlobalIds.has(f.globalId) && (r.visible = !1), f && this.businessHighlightIds.has(f.globalId)) {
          const w = Array.isArray(r.material) ? r.material[0] : r.material;
          w && w.color.set(16746496);
        }
      }
    });
  }
  _getFeatureIdFromMesh(n) {
    var h, l, d;
    const i = n.geometry, e = ((h = i == null ? void 0 : i.attributes) == null ? void 0 : h._BATCHID) || ((l = i == null ? void 0 : i.attributes) == null ? void 0 : l._batchid);
    if (!e)
      return;
    const o = e.getX(0), a = (d = n.userData) == null ? void 0 : d.featureOffset;
    if (!(!Number.isInteger(o) || !Number.isInteger(a)))
      return a + o;
  }
  _getBatchIdFromHit(n) {
    var h, l, d, p;
    if (Number.isInteger(n.batchId))
      return n.batchId;
    if (Number.isInteger(n.featureId))
      return n.featureId;
    const i = (h = n.object) == null ? void 0 : h.geometry, e = ((l = i == null ? void 0 : i.attributes) == null ? void 0 : l._BATCHID) || ((d = i == null ? void 0 : i.attributes) == null ? void 0 : d._batchid);
    if (!e)
      return;
    const o = n.faceIndex, a = ((p = n.face) == null ? void 0 : p.a) ?? (Number.isInteger(o) ? o * 3 : 0);
    if (!(a < 0 || a >= e.count))
      return e.getX(a);
  }
  _getFeatureIdFromHit(n) {
    var a;
    const i = n.object, e = this._getBatchIdFromHit(n), o = (a = i.userData) == null ? void 0 : a.featureOffset;
    if (!(!Number.isInteger(e) || !Number.isInteger(o)))
      return o + e;
  }
  _getMaterials(n) {
    return n.material ? Array.isArray(n.material) ? n.material : [n.material] : [];
  }
  _prepareMeshMaterial(n) {
    const i = this._getMaterials(n);
    i.length !== 0 && (i.forEach((e) => {
      e.side = m.DoubleSide, e.depthTest = !0, e.depthWrite = !0;
    }), this.meshColorMap.has(n) || this.meshColorMap.set(n, i.map((e) => e.color.clone())));
  }
  _setMeshColor(n, i) {
    this._getMaterials(n).forEach((e) => {
      e.color.set(i);
    });
  }
  _restoreMeshColor(n) {
    const i = this.meshColorMap.get(n);
    i && this._getMaterials(n).forEach((e, o) => {
      const a = i[o] || i[0];
      a && e.color.copy(a);
    });
  }
  _bindEvents() {
    this._handlePointerDownBound = this._handlePointerDown.bind(this), this._handlePointerUpBound = this._handlePointerUp.bind(this), this._handleResizeBound = this._handleResize.bind(this), this.renderer.domElement.addEventListener("pointerdown", this._handlePointerDownBound), this.renderer.domElement.addEventListener("pointerup", this._handlePointerUpBound), window.addEventListener("resize", this._handleResizeBound);
  }
  _handlePointerDown(n) {
    this.pointerDownPos.x = n.clientX, this.pointerDownPos.y = n.clientY, this.isPointerDown = !0;
  }
  _handlePointerUp(n) {
    if (!this.isPointerDown)
      return;
    this.isPointerDown = !1;
    const i = n.clientX - this.pointerDownPos.x, e = n.clientY - this.pointerDownPos.y;
    Math.sqrt(i * i + e * e) > 5 || this._handleClick(n);
  }
  _handleClick(n) {
    const i = this.renderer.domElement.getBoundingClientRect(), e = new m.Vector2(
      (n.clientX - i.left) / i.width * 2 - 1,
      -((n.clientY - i.top) / i.height) * 2 + 1
    ), o = new m.Raycaster();
    o.setFromCamera(e, this.camera), this.tilesRenderer.group.updateWorldMatrix(!0, !0);
    const a = [];
    this.tilesRenderer.raycast(o, a);
    const h = a.filter((y) => {
      var f;
      return ((f = y.object) == null ? void 0 : f.isMesh) && this._getFeatureIdFromHit(y) !== void 0;
    }), l = h.length > 0 ? [] : o.intersectObject(this.tilesRenderer.group, !0).filter((y) => {
      var f;
      return ((f = y.object) == null ? void 0 : f.isMesh) && this._getFeatureIdFromHit(y) !== void 0;
    }), d = h.length > 0 ? h : l;
    if (d.length === 0) {
      this._clearClickHighlight();
      return;
    }
    const p = d[0], g = this._getFeatureIdFromHit(p);
    if (g === void 0 || g >= this.globalFeatures.length)
      return;
    const r = this.globalFeatures[g];
    r && this.onSelect && this.onSelect({
      globalId: r.globalId,
      name: r.name,
      type: r.type
    }), this._applyClickHighlight(g);
  }
  _handleResize() {
    const n = this.container.clientWidth, i = this.container.clientHeight;
    this.camera.aspect = n / i, this.camera.updateProjectionMatrix(), this.renderer.setSize(n, i), this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer);
  }
  _applyClickHighlight(n) {
    this._clearClickHighlight();
    const i = this.globalFeatures[n];
    if (this.businessHighlightIds.has(i.globalId))
      return;
    const e = this.globalIdToMeshes.get(i.globalId);
    e && e.forEach((o) => {
      o.material && this._setMeshColor(o, 16755200);
    }), this.clickHighlightId = n;
  }
  _clearClickHighlight() {
    if (this.clickHighlightId !== null) {
      const n = this.globalFeatures[this.clickHighlightId];
      if (n && !this.businessHighlightIds.has(n.globalId)) {
        const i = this.globalIdToMeshes.get(n.globalId);
        i && i.forEach((e) => {
          this._restoreMeshColor(e);
        });
      }
      this.clickHighlightId = null;
    }
  }
  _fitCamera() {
    const n = this._getWorldBoundingSphere();
    if (n && n.radius > 0 && !isNaN(n.center.x)) {
      const e = m.MathUtils.degToRad(this.camera.fov), o = 2 * Math.atan(Math.tan(e / 2) * this.camera.aspect), a = Math.min(e, o), h = n.radius / Math.sin(a / 2) * 1.15, l = new m.Vector3(1, 0.3, 1).normalize(), d = this.controls.enableDamping;
      this.controls.enableDamping = !1, this.controls.update(), this.camera.position.copy(n.center).addScaledVector(l, h), this.camera.near = Math.max(h / 1e3, 0.1), this.camera.far = Math.max(h + n.radius * 4, 5e3), this.camera.updateProjectionMatrix(), this.controls.target.copy(n.center), this.controls.update(), this.controls.enableDamping = d;
    }
  }
  _animate() {
    this._animationId = requestAnimationFrame(() => this._animate()), this.camera.updateMatrixWorld(), this.tilesRenderer.update(), this.controls.update(), this.renderer.render(this.scene, this.camera);
  }
  resetCamera() {
    this._fitCamera();
  }
  _getWorldBoundingSphere() {
    const n = new m.Sphere();
    return !this.tilesRenderer.getBoundingSphere(n) || n.radius <= 0 || isNaN(n.center.x) ? null : (this.tilesRenderer.group.updateWorldMatrix(!0, !0), n.applyMatrix4(this.tilesRenderer.group.matrixWorld), n);
  }
  getBoundingSphere() {
    const n = this._getWorldBoundingSphere();
    return n ? {
      center: n.center.clone(),
      radius: n.radius
    } : null;
  }
  hideByGlobalIds(n) {
    n.forEach((i) => {
      const e = this.globalIdToMeshes.get(i);
      e && e.forEach((o) => {
        o.visible = !1;
      }), this.hiddenGlobalIds.add(i);
    });
  }
  showByGlobalIds(n) {
    n.forEach((i) => {
      const e = this.globalIdToMeshes.get(i);
      e && e.forEach((o) => {
        o.visible = !0;
      }), this.hiddenGlobalIds.delete(i);
    });
  }
  highlightByGlobalIds(n) {
    this.clearHighlight(), n.forEach((i) => {
      const e = this.globalIdToMeshes.get(i);
      e && e.forEach((o) => {
        o.material && this._setMeshColor(o, 16746496);
      }), this.businessHighlightIds.add(i);
    });
  }
  clearHighlight() {
    this.businessHighlightIds.forEach((n) => {
      const i = this.globalIdToMeshes.get(n);
      i && i.forEach((e) => {
        this._restoreMeshColor(e);
      });
    }), this.businessHighlightIds.clear();
  }
  destroy() {
    this._animationId && cancelAnimationFrame(this._animationId), this.renderer.domElement.removeEventListener("pointerdown", this._handlePointerDownBound), this.renderer.domElement.removeEventListener("pointerup", this._handlePointerUpBound), window.removeEventListener("resize", this._handleResizeBound), this.tilesRenderer.dispose(), this.renderer.dispose(), this.container.contains(this.renderer.domElement) && this.container.removeChild(this.renderer.domElement), this.globalFeatures = [], this.globalIdToMeshes.clear(), this.hiddenGlobalIds.clear(), this.businessHighlightIds.clear(), this.meshColorMap = null;
  }
}
const rt = (_, n) => {
  const i = _.__vccOpts || _;
  for (const [e, o] of n)
    i[e] = o;
  return i;
}, lt = {
  name: "ThreeTilesViewer",
  props: {
    tilesetUrl: {
      type: String,
      required: !0
    }
  },
  emits: ["select", "ready", "error"],
  setup(_, { emit: n, expose: i }) {
    const e = _e(null), o = _e(null);
    return Ve(() => {
      o.value = new at({
        container: e.value,
        tilesetUrl: _.tilesetUrl,
        onSelect: (r) => {
          n("select", r);
        },
        onReady: () => {
          n("ready");
        },
        onError: (r) => {
          n("error", r);
        }
      });
    }), qe(() => {
      o.value && o.value.destroy();
    }), i({
      viewer: o,
      resetCamera: () => {
        o.value && o.value.resetCamera();
      },
      getBoundingSphere: () => o.value ? o.value.getBoundingSphere() : null,
      hideByGlobalIds: (r) => {
        o.value && o.value.hideByGlobalIds(r);
      },
      showByGlobalIds: (r) => {
        o.value && o.value.showByGlobalIds(r);
      },
      highlightByGlobalIds: (r) => {
        o.value && o.value.highlightByGlobalIds(r);
      },
      clearHighlight: () => {
        o.value && o.value.clearHighlight();
      }
    }), {
      container: e
    };
  }
}, ct = {
  ref: "container",
  class: "tiles-viewer"
};
function ht(_, n, i, e, o, a) {
  return Qe(), $e("div", ct, null, 512);
}
const ne = /* @__PURE__ */ rt(lt, [["render", ht], ["__scopeId", "data-v-eb13a5cd"]]);
ne.install = function(_) {
  _.component(ne.name, ne);
};
export {
  ne as default
};
