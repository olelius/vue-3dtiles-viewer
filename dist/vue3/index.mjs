import { ref as Te, onMounted as Ze, onBeforeUnmount as Ve, openBlock as qe, createElementBlock as Qe } from "vue";
import * as f from "three";
import { Ray as $e, Plane as Je, MathUtils as et, EventDispatcher as tt, Vector3 as I, MOUSE as N, TOUCH as F, Quaternion as _e, Spherical as Pe, Vector2 as T } from "three";
import { TilesRenderer as nt } from "3d-tiles-renderer";
const xe = { type: "change" }, te = { type: "start" }, Re = { type: "end" }, Z = new $e(), De = new Je(), ot = Math.cos(70 * et.DEG2RAD);
class it extends tt {
  constructor(n, i) {
    super(), this.object = n, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new I(), this.cursor = new I(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: N.ROTATE, MIDDLE: N.DOLLY, RIGHT: N.PAN }, this.touches = { ONE: F.ROTATE, TWO: F.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(t) {
      t.addEventListener("keydown", ee), this._domElementKeyEvents = t;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ee), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(xe), e.update(), a = o.NONE;
    }, this.update = function() {
      const t = new I(), s = new _e().setFromUnitVectors(n.up, new I(0, 1, 0)), l = s.clone().invert(), m = new I(), E = new _e(), D = new I(), M = 2 * Math.PI;
      return function(We = null) {
        const Ie = e.object.position;
        t.copy(Ie).sub(e.target), t.applyQuaternion(s), r.setFromVector3(t), e.autoRotate && a === o.NONE && Y(Le(We)), e.enableDamping ? (r.theta += u.theta * e.dampingFactor, r.phi += u.phi * e.dampingFactor) : (r.theta += u.theta, r.phi += u.phi);
        let _ = e.minAzimuthAngle, P = e.maxAzimuthAngle;
        isFinite(_) && isFinite(P) && (_ < -Math.PI ? _ += M : _ > Math.PI && (_ -= M), P < -Math.PI ? P += M : P > Math.PI && (P -= M), _ <= P ? r.theta = Math.max(_, Math.min(P, r.theta)) : r.theta = r.theta > (_ + P) / 2 ? Math.max(_, r.theta) : Math.min(P, r.theta)), r.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, r.phi)), r.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(h, e.dampingFactor) : e.target.add(h), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let B = !1;
        if (e.zoomToCursor && G || e.object.isOrthographicCamera)
          r.radius = $(r.radius);
        else {
          const x = r.radius;
          r.radius = $(r.radius * g), B = x != r.radius;
        }
        if (t.setFromSpherical(r), t.applyQuaternion(l), Ie.copy(e.target).add(t), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, h.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), h.set(0, 0, 0)), e.zoomToCursor && G) {
          let x = null;
          if (e.object.isPerspectiveCamera) {
            const U = t.length();
            x = $(U * g);
            const W = U - x;
            e.object.position.addScaledVector(ne, W), e.object.updateMatrixWorld(), B = !!W;
          } else if (e.object.isOrthographicCamera) {
            const U = new I(R.x, R.y, 0);
            U.unproject(e.object);
            const W = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / g)), e.object.updateProjectionMatrix(), B = W !== e.object.zoom;
            const Me = new I(R.x, R.y, 0);
            Me.unproject(e.object), e.object.position.sub(Me).add(U), e.object.updateMatrixWorld(), x = t.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          x !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(x).add(e.object.position) : (Z.origin.copy(e.object.position), Z.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(Z.direction)) < ot ? n.lookAt(e.target) : (De.setFromNormalAndCoplanarPoint(e.object.up, e.target), Z.intersectPlane(De, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const x = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / g)), x !== e.object.zoom && (e.object.updateProjectionMatrix(), B = !0);
        }
        return g = 1, G = !1, B || m.distanceToSquared(e.object.position) > d || 8 * (1 - E.dot(e.object.quaternion)) > d || D.distanceToSquared(e.target) > d ? (e.dispatchEvent(xe), m.copy(e.object.position), E.copy(e.object.quaternion), D.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Ee), e.domElement.removeEventListener("pointerdown", fe), e.domElement.removeEventListener("pointercancel", z), e.domElement.removeEventListener("wheel", pe), e.domElement.removeEventListener("pointermove", J), e.domElement.removeEventListener("pointerup", z), e.domElement.getRootNode().removeEventListener("keydown", ge, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", ee), e._domElementKeyEvents = null);
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
    const d = 1e-6, r = new Pe(), u = new Pe();
    let g = 1;
    const h = new I(), c = new T(), y = new T(), p = new T(), w = new T(), O = new T(), C = new T(), A = new T(), j = new T(), S = new T(), ne = new I(), R = new T();
    let G = !1;
    const b = [], v = {};
    let V = !1;
    function Le(t) {
      return t !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * t : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function K(t) {
      const s = Math.abs(t * 0.01);
      return Math.pow(0.95, e.zoomSpeed * s);
    }
    function Y(t) {
      u.theta -= t;
    }
    function X(t) {
      u.phi -= t;
    }
    const oe = function() {
      const t = new I();
      return function(l, m) {
        t.setFromMatrixColumn(m, 0), t.multiplyScalar(-l), h.add(t);
      };
    }(), ie = function() {
      const t = new I();
      return function(l, m) {
        e.screenSpacePanning === !0 ? t.setFromMatrixColumn(m, 1) : (t.setFromMatrixColumn(m, 0), t.crossVectors(e.object.up, t)), t.multiplyScalar(l), h.add(t);
      };
    }(), k = function() {
      const t = new I();
      return function(l, m) {
        const E = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const D = e.object.position;
          t.copy(D).sub(e.target);
          let M = t.length();
          M *= Math.tan(e.object.fov / 2 * Math.PI / 180), oe(2 * l * M / E.clientHeight, e.object.matrix), ie(2 * m * M / E.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (oe(l * (e.object.right - e.object.left) / e.object.zoom / E.clientWidth, e.object.matrix), ie(m * (e.object.top - e.object.bottom) / e.object.zoom / E.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function q(t) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? g /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function se(t) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? g *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Q(t, s) {
      if (!e.zoomToCursor)
        return;
      G = !0;
      const l = e.domElement.getBoundingClientRect(), m = t - l.left, E = s - l.top, D = l.width, M = l.height;
      R.x = m / D * 2 - 1, R.y = -(E / M) * 2 + 1, ne.set(R.x, R.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function $(t) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, t));
    }
    function ae(t) {
      c.set(t.clientX, t.clientY);
    }
    function Oe(t) {
      Q(t.clientX, t.clientX), A.set(t.clientX, t.clientY);
    }
    function re(t) {
      w.set(t.clientX, t.clientY);
    }
    function Se(t) {
      y.set(t.clientX, t.clientY), p.subVectors(y, c).multiplyScalar(e.rotateSpeed);
      const s = e.domElement;
      Y(2 * Math.PI * p.x / s.clientHeight), X(2 * Math.PI * p.y / s.clientHeight), c.copy(y), e.update();
    }
    function Ce(t) {
      j.set(t.clientX, t.clientY), S.subVectors(j, A), S.y > 0 ? q(K(S.y)) : S.y < 0 && se(K(S.y)), A.copy(j), e.update();
    }
    function Ae(t) {
      O.set(t.clientX, t.clientY), C.subVectors(O, w).multiplyScalar(e.panSpeed), k(C.x, C.y), w.copy(O), e.update();
    }
    function je(t) {
      Q(t.clientX, t.clientY), t.deltaY < 0 ? se(K(t.deltaY)) : t.deltaY > 0 && q(K(t.deltaY)), e.update();
    }
    function ke(t) {
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
    function le(t) {
      if (b.length === 1)
        c.set(t.pageX, t.pageY);
      else {
        const s = H(t), l = 0.5 * (t.pageX + s.x), m = 0.5 * (t.pageY + s.y);
        c.set(l, m);
      }
    }
    function ce(t) {
      if (b.length === 1)
        w.set(t.pageX, t.pageY);
      else {
        const s = H(t), l = 0.5 * (t.pageX + s.x), m = 0.5 * (t.pageY + s.y);
        w.set(l, m);
      }
    }
    function he(t) {
      const s = H(t), l = t.pageX - s.x, m = t.pageY - s.y, E = Math.sqrt(l * l + m * m);
      A.set(0, E);
    }
    function He(t) {
      e.enableZoom && he(t), e.enablePan && ce(t);
    }
    function Ne(t) {
      e.enableZoom && he(t), e.enableRotate && le(t);
    }
    function de(t) {
      if (b.length == 1)
        y.set(t.pageX, t.pageY);
      else {
        const l = H(t), m = 0.5 * (t.pageX + l.x), E = 0.5 * (t.pageY + l.y);
        y.set(m, E);
      }
      p.subVectors(y, c).multiplyScalar(e.rotateSpeed);
      const s = e.domElement;
      Y(2 * Math.PI * p.x / s.clientHeight), X(2 * Math.PI * p.y / s.clientHeight), c.copy(y);
    }
    function ue(t) {
      if (b.length === 1)
        O.set(t.pageX, t.pageY);
      else {
        const s = H(t), l = 0.5 * (t.pageX + s.x), m = 0.5 * (t.pageY + s.y);
        O.set(l, m);
      }
      C.subVectors(O, w).multiplyScalar(e.panSpeed), k(C.x, C.y), w.copy(O);
    }
    function me(t) {
      const s = H(t), l = t.pageX - s.x, m = t.pageY - s.y, E = Math.sqrt(l * l + m * m);
      j.set(0, E), S.set(0, Math.pow(j.y / A.y, e.zoomSpeed)), q(S.y), A.copy(j);
      const D = (t.pageX + s.x) * 0.5, M = (t.pageY + s.y) * 0.5;
      Q(D, M);
    }
    function Fe(t) {
      e.enableZoom && me(t), e.enablePan && ue(t);
    }
    function ve(t) {
      e.enableZoom && me(t), e.enableRotate && de(t);
    }
    function fe(t) {
      e.enabled !== !1 && (b.length === 0 && (e.domElement.setPointerCapture(t.pointerId), e.domElement.addEventListener("pointermove", J), e.domElement.addEventListener("pointerup", z)), !Xe(t) && (Ge(t), t.pointerType === "touch" ? ye(t) : Ye(t)));
    }
    function J(t) {
      e.enabled !== !1 && (t.pointerType === "touch" ? Ue(t) : ze(t));
    }
    function z(t) {
      switch (Ke(t), b.length) {
        case 0:
          e.domElement.releasePointerCapture(t.pointerId), e.domElement.removeEventListener("pointermove", J), e.domElement.removeEventListener("pointerup", z), e.dispatchEvent(Re), a = o.NONE;
          break;
        case 1:
          const s = b[0], l = v[s];
          ye({ pointerId: s, pageX: l.x, pageY: l.y });
          break;
      }
    }
    function Ye(t) {
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
            re(t), a = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            ae(t), a = o.ROTATE;
          }
          break;
        case N.PAN:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enableRotate === !1)
              return;
            ae(t), a = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            re(t), a = o.PAN;
          }
          break;
        default:
          a = o.NONE;
      }
      a !== o.NONE && e.dispatchEvent(te);
    }
    function ze(t) {
      switch (a) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          Se(t);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          Ce(t);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          Ae(t);
          break;
      }
    }
    function pe(t) {
      e.enabled === !1 || e.enableZoom === !1 || a !== o.NONE || (t.preventDefault(), e.dispatchEvent(te), je(Be(t)), e.dispatchEvent(Re));
    }
    function Be(t) {
      const s = t.deltaMode, l = {
        clientX: t.clientX,
        clientY: t.clientY,
        deltaY: t.deltaY
      };
      switch (s) {
        case 1:
          l.deltaY *= 16;
          break;
        case 2:
          l.deltaY *= 100;
          break;
      }
      return t.ctrlKey && !V && (l.deltaY *= 10), l;
    }
    function ge(t) {
      t.key === "Control" && (V = !0, e.domElement.getRootNode().addEventListener("keyup", be, { passive: !0, capture: !0 }));
    }
    function be(t) {
      t.key === "Control" && (V = !1, e.domElement.getRootNode().removeEventListener("keyup", be, { passive: !0, capture: !0 }));
    }
    function ee(t) {
      e.enabled === !1 || e.enablePan === !1 || ke(t);
    }
    function ye(t) {
      switch (we(t), b.length) {
        case 1:
          switch (e.touches.ONE) {
            case F.ROTATE:
              if (e.enableRotate === !1)
                return;
              le(t), a = o.TOUCH_ROTATE;
              break;
            case F.PAN:
              if (e.enablePan === !1)
                return;
              ce(t), a = o.TOUCH_PAN;
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
              He(t), a = o.TOUCH_DOLLY_PAN;
              break;
            case F.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              Ne(t), a = o.TOUCH_DOLLY_ROTATE;
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
    function Ue(t) {
      switch (we(t), a) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          de(t), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          ue(t), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Fe(t), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          ve(t), e.update();
          break;
        default:
          a = o.NONE;
      }
    }
    function Ee(t) {
      e.enabled !== !1 && t.preventDefault();
    }
    function Ge(t) {
      b.push(t.pointerId);
    }
    function Ke(t) {
      delete v[t.pointerId];
      for (let s = 0; s < b.length; s++)
        if (b[s] == t.pointerId) {
          b.splice(s, 1);
          return;
        }
    }
    function Xe(t) {
      for (let s = 0; s < b.length; s++)
        if (b[s] == t.pointerId)
          return !0;
      return !1;
    }
    function we(t) {
      let s = v[t.pointerId];
      s === void 0 && (s = new T(), v[t.pointerId] = s), s.set(t.pageX, t.pageY);
    }
    function H(t) {
      const s = t.pointerId === b[0] ? b[1] : b[0];
      return v[s];
    }
    e.domElement.addEventListener("contextmenu", Ee), e.domElement.addEventListener("pointerdown", fe), e.domElement.addEventListener("pointercancel", z), e.domElement.addEventListener("wheel", pe, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", ge, { passive: !0, capture: !0 }), this.update();
  }
}
class st {
  constructor(n) {
    const {
      container: i,
      tilesetUrl: e,
      onSelect: o,
      onReady: a,
      onError: d
    } = n;
    this.container = i, this.onSelect = o, this.onReady = a, this.onError = d, this.globalFeatures = [], this.meshColorMap = /* @__PURE__ */ new WeakMap(), this.globalIdToMeshes = /* @__PURE__ */ new Map(), this.hiddenGlobalIds = /* @__PURE__ */ new Set(), this.businessHighlightIds = /* @__PURE__ */ new Set(), this.clickHighlightId = null, this.isFirstLoad = !0, this.pointerDownPos = { x: 0, y: 0 }, this.isPointerDown = !1, this._initScene(), this._initTiles(e), this._bindEvents(), this._animate();
  }
  _initScene() {
    this.scene = new f.Scene(), this.scene.background = new f.Color(1118498), this.scene.fog = new f.FogExp2(1118498, 3e-4), this.camera = new f.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      5e3
    ), this.camera.position.set(10, 10, 10), this.renderer = new f.WebGLRenderer({ antialias: !0 }), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.container.appendChild(this.renderer.domElement), this.controls = new it(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.screenSpacePanning = !0;
    const n = new f.GridHelper(200, 20, 8956671, 3364232);
    n.position.y = -1, this.scene.add(n);
    const i = new f.AxesHelper(50);
    this.scene.add(i);
    const e = new f.Mesh(
      new f.SphereGeometry(0.5, 16, 16),
      new f.MeshStandardMaterial({ color: 16724787, emissive: 3342336 })
    );
    this.scene.add(e);
    const o = new f.AmbientLight(16777215, 0.65);
    this.scene.add(o);
    const a = new f.HemisphereLight(9156095, 3877407, 0.9);
    this.scene.add(a);
    const d = new f.DirectionalLight(16774630, 1.4);
    d.position.set(6, 12, 8), d.castShadow = !0, this.scene.add(d);
    const r = new f.DirectionalLight(8956671, 0.6);
    r.position.set(-4, 5, -6), this.scene.add(r);
    const u = new f.DirectionalLight(16755336, 0.5);
    u.position.set(4, 3, 5), this.scene.add(u);
    const g = new f.PointLight(16755302, 0.35);
    g.position.set(2, 3, 2), this.scene.add(g);
    const h = new f.DirectionalLight(11193599, 0.4);
    h.position.set(-3, 4, 3), this.scene.add(h);
  }
  _initTiles(n) {
    this.tilesRenderer = new nt(n), this.tilesRenderer.maximumScreenSpaceError = 16, this.tilesRenderer.maxCacheSize = 200, this.tilesRenderer.displayActiveTiles = !0, this.tilesRenderer.fetchOptions = { mode: "cors", cache: "no-store" }, this.tilesRenderer.setCamera(this.camera), this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer), this.tilesRenderer.group.rotation.x = Math.PI, this.scene.add(this.tilesRenderer.group), this.tilesRenderer.addEventListener("load-model", (i) => {
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
    var h;
    const { scene: i } = n, e = i.batchTable || ((h = i.userData) == null ? void 0 : h.batchTable), o = e == null ? void 0 : e.header;
    if (!o || !o.GlobalId) {
      console.warn("BatchTable 缺少 GlobalId 字段");
      return;
    }
    const a = o.GlobalId, d = o.Name || [], r = o.Type || [], u = a.length, g = this.globalFeatures.length;
    for (let c = 0; c < u; c++)
      this.globalFeatures.push({
        globalId: a[c],
        name: d[c] || "",
        type: r[c] || ""
      });
    i.userData.featureOffset = g, i.traverse((c) => {
      if (c.isMesh) {
        c.frustumCulled = !1, c.userData.batchTable = e, c.userData.featureOffset = g;
        const y = this._getFeatureIdFromMesh(c), p = this.globalFeatures[y];
        if (p != null && p.globalId) {
          const w = p.globalId;
          this.globalIdToMeshes.has(w) || this.globalIdToMeshes.set(w, []), this.globalIdToMeshes.get(w).push(c);
        }
        if (this._prepareMeshMaterial(c), p && this.hiddenGlobalIds.has(p.globalId) && (c.visible = !1), p && this.businessHighlightIds.has(p.globalId)) {
          const w = Array.isArray(c.material) ? c.material[0] : c.material;
          w && w.color.set(16746496);
        }
      }
    });
  }
  _getFeatureIdFromMesh(n) {
    var d, r, u;
    const i = n.geometry, e = ((d = i == null ? void 0 : i.attributes) == null ? void 0 : d._BATCHID) || ((r = i == null ? void 0 : i.attributes) == null ? void 0 : r._batchid);
    if (!e)
      return;
    const o = e.getX(0), a = (u = n.userData) == null ? void 0 : u.featureOffset;
    if (!(!Number.isInteger(o) || !Number.isInteger(a)))
      return a + o;
  }
  _getBatchIdFromHit(n) {
    var d, r, u, g;
    if (Number.isInteger(n.batchId))
      return n.batchId;
    if (Number.isInteger(n.featureId))
      return n.featureId;
    const i = (d = n.object) == null ? void 0 : d.geometry, e = ((r = i == null ? void 0 : i.attributes) == null ? void 0 : r._BATCHID) || ((u = i == null ? void 0 : i.attributes) == null ? void 0 : u._batchid);
    if (!e)
      return;
    const o = n.faceIndex, a = ((g = n.face) == null ? void 0 : g.a) ?? (Number.isInteger(o) ? o * 3 : 0);
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
      e.side = f.DoubleSide, e.depthTest = !0, e.depthWrite = !0;
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
    const i = this.renderer.domElement.getBoundingClientRect(), e = new f.Vector2(
      (n.clientX - i.left) / i.width * 2 - 1,
      -((n.clientY - i.top) / i.height) * 2 + 1
    ), o = new f.Raycaster();
    o.setFromCamera(e, this.camera), this.tilesRenderer.group.updateWorldMatrix(!0, !0);
    const a = [];
    this.tilesRenderer.raycast(o, a);
    const d = a.filter((y) => {
      var p;
      return ((p = y.object) == null ? void 0 : p.isMesh) && this._getFeatureIdFromHit(y) !== void 0;
    }), r = d.length > 0 ? [] : o.intersectObject(this.tilesRenderer.group, !0).filter((y) => {
      var p;
      return ((p = y.object) == null ? void 0 : p.isMesh) && this._getFeatureIdFromHit(y) !== void 0;
    }), u = d.length > 0 ? d : r;
    if (u.length === 0) {
      this._clearClickHighlight();
      return;
    }
    const g = u[0], h = this._getFeatureIdFromHit(g);
    if (h === void 0 || h >= this.globalFeatures.length)
      return;
    const c = this.globalFeatures[h];
    c && this.onSelect && this.onSelect({
      globalId: c.globalId,
      name: c.name,
      type: c.type
    }), this._applyClickHighlight(h);
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
      const e = f.MathUtils.degToRad(this.camera.fov), o = 2 * Math.atan(Math.tan(e / 2) * this.camera.aspect), a = Math.min(e, o), d = n.radius / Math.sin(a / 2) * 1.15, r = new f.Vector3(1, 0.3, 1).normalize(), u = this.controls.enableDamping;
      this.controls.enableDamping = !1, this.controls.update(), this.camera.position.copy(n.center).addScaledVector(r, d), this.camera.near = Math.max(d / 1e3, 0.1), this.camera.far = Math.max(d + n.radius * 4, 5e3), this.camera.updateProjectionMatrix(), this.controls.target.copy(n.center), this.controls.update(), this.controls.enableDamping = u;
    }
  }
  _animate() {
    this._animationId = requestAnimationFrame(() => this._animate()), this.camera.updateMatrixWorld(), this.tilesRenderer.update(), this.controls.update(), this.renderer.render(this.scene, this.camera);
  }
  resetCamera() {
    this._fitCamera();
  }
  _getWorldBoundingSphere() {
    const n = new f.Sphere();
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
const at = (L, n) => {
  const i = L.__vccOpts || L;
  for (const [e, o] of n)
    i[e] = o;
  return i;
}, rt = {
  name: "ThreeTilesViewer",
  props: {
    tilesetUrl: {
      type: String,
      required: !0
    }
  },
  emits: ["select", "ready", "error"],
  setup(L, { emit: n, expose: i }) {
    const e = Te(null), o = Te(null);
    return Ze(() => {
      o.value = new st({
        container: e.value,
        tilesetUrl: L.tilesetUrl,
        onSelect: (h) => {
          n("select", h);
        },
        onReady: () => {
          n("ready");
        },
        onError: (h) => {
          n("error", h);
        }
      });
    }), Ve(() => {
      o.value && o.value.destroy();
    }), i({
      resetCamera: () => {
        o.value && o.value.resetCamera();
      },
      hideByGlobalIds: (h) => {
        o.value && o.value.hideByGlobalIds(h);
      },
      showByGlobalIds: (h) => {
        o.value && o.value.showByGlobalIds(h);
      },
      highlightByGlobalIds: (h) => {
        o.value && o.value.highlightByGlobalIds(h);
      },
      clearHighlight: () => {
        o.value && o.value.clearHighlight();
      }
    }), {
      container: e
    };
  }
}, lt = {
  ref: "container",
  class: "tiles-viewer"
};
function ct(L, n, i, e, o, a) {
  return qe(), Qe("div", lt, null, 512);
}
const pt = /* @__PURE__ */ at(rt, [["render", ct], ["__scopeId", "data-v-7b772242"]]);
export {
  pt as default
};
