import { ref as M, onMounted as x, onBeforeUnmount as L, openBlock as k, createElementBlock as j } from "vue";
import * as m from "three";
import { Ray as N, Plane as H, MathUtils as v, Vector3 as f, Controls as U, MOUSE as T, TOUCH as E, Quaternion as I, Spherical as S, Vector2 as _ } from "three";
import { TilesRenderer as Y } from "3d-tiles-renderer";
const R = { type: "change" }, w = { type: "start" }, C = { type: "end" }, P = new N(), O = new H(), z = Math.cos(70 * v.DEG2RAD), c = new f(), p = 2 * Math.PI, n = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, D = 1e-6;
class F extends U {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLElement} domElement - The HTML element used for event listeners.
   */
  constructor(t, e = null) {
    super(t, e), this.state = n.NONE, this.target = new f(), this.cursor = new f(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: T.ROTATE, MIDDLE: T.DOLLY, RIGHT: T.PAN }, this.touches = { ONE: E.ROTATE, TWO: E.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new f(), this._lastQuaternion = new I(), this._lastTargetPosition = new f(), this._quat = new I().setFromUnitVectors(t.up, new f(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new S(), this._sphericalDelta = new S(), this._scale = 1, this._panOffset = new f(), this._rotateStart = new _(), this._rotateEnd = new _(), this._rotateDelta = new _(), this._panStart = new _(), this._panEnd = new _(), this._panDelta = new _(), this._dollyStart = new _(), this._dollyEnd = new _(), this._dollyDelta = new _(), this._dollyDirection = new f(), this._mouse = new _(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = B.bind(this), this._onPointerDown = Z.bind(this), this._onPointerUp = K.bind(this), this._onContextMenu = $.bind(this), this._onMouseWheel = W.bind(this), this._onKeyDown = V.bind(this), this._onTouchStart = q.bind(this), this._onTouchMove = Q.bind(this), this._onMouseDown = G.bind(this), this._onMouseMove = X.bind(this), this._interceptControlDown = J.bind(this), this._interceptControlUp = tt.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  /**
   * Defines the visual representation of the cursor.
   *
   * @type {('auto'|'grab')}
   * @default 'auto'
   */
  set cursorStyle(t) {
    this._cursorStyle = t, t === "grab" ? this.domElement.style.cursor = "grab" : this.domElement.style.cursor = "auto";
  }
  get cursorStyle() {
    return this._cursorStyle;
  }
  connect(t) {
    super.connect(t), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLElement} domElement - The DOM element
   */
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(R), this.update(), this.state = n.NONE;
  }
  /**
   * Programmatically pan the camera.
   *
   * @param {number} deltaX - The horizontal pan amount in pixels.
   * @param {number} deltaY - The vertical pan amount in pixels.
   */
  pan(t, e) {
    this._pan(t, e), this.update();
  }
  /**
   * Programmatically dolly in (zoom in for perspective camera).
   *
   * @param {number} dollyScale - The dolly scale factor.
   */
  dollyIn(t) {
    this._dollyIn(t), this.update();
  }
  /**
   * Programmatically dolly out (zoom out for perspective camera).
   *
   * @param {number} dollyScale - The dolly scale factor.
   */
  dollyOut(t) {
    this._dollyOut(t), this.update();
  }
  /**
   * Programmatically rotate the camera left (around the vertical axis).
   *
   * @param {number} angle - The rotation angle in radians.
   */
  rotateLeft(t) {
    this._rotateLeft(t), this.update();
  }
  /**
   * Programmatically rotate the camera up (around the horizontal axis).
   *
   * @param {number} angle - The rotation angle in radians.
   */
  rotateUp(t) {
    this._rotateUp(t), this.update();
  }
  update(t = null) {
    const e = this.object.position;
    c.copy(e).sub(this.target), c.applyQuaternion(this._quat), this._spherical.setFromVector3(c), this.autoRotate && this.state === n.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(i) && isFinite(s) && (i < -Math.PI ? i += p : i > Math.PI && (i -= p), s < -Math.PI ? s += p : s > Math.PI && (s -= p), i <= s ? this._spherical.theta = Math.max(i, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + s) / 2 ? Math.max(i, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let a = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const h = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), a = h != this._spherical.radius;
    }
    if (c.setFromSpherical(this._spherical), c.applyQuaternion(this._quatInverse), e.copy(this.target).add(c), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let h = null;
      if (this.object.isPerspectiveCamera) {
        const r = c.length();
        h = this._clampDistance(r * this._scale);
        const d = r - h;
        this.object.position.addScaledVector(this._dollyDirection, d), this.object.updateMatrixWorld(), a = !!d;
      } else if (this.object.isOrthographicCamera) {
        const r = new f(this._mouse.x, this._mouse.y, 0);
        r.unproject(this.object);
        const d = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), a = d !== this.object.zoom;
        const g = new f(this._mouse.x, this._mouse.y, 0);
        g.unproject(this.object), this.object.position.sub(g).add(r), this.object.updateMatrixWorld(), h = c.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      h !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position) : (P.origin.copy(this.object.position), P.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(P.direction)) < z ? this.object.lookAt(this.target) : (O.setFromNormalAndCoplanarPoint(this.object.up, this.target), P.intersectPlane(O, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const h = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), h !== this.object.zoom && (this.object.updateProjectionMatrix(), a = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, a || this._lastPosition.distanceToSquared(this.object.position) > D || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > D || this._lastTargetPosition.distanceToSquared(this.target) > D ? (this.dispatchEvent(R), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? p / 60 * this.autoRotateSpeed * t : p / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * e);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, e) {
    c.setFromMatrixColumn(e, 0), c.multiplyScalar(-t), this._panOffset.add(c);
  }
  _panUp(t, e) {
    this.screenSpacePanning === !0 ? c.setFromMatrixColumn(e, 1) : (c.setFromMatrixColumn(e, 0), c.crossVectors(this.object.up, c)), c.multiplyScalar(t), this._panOffset.add(c);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(t, e) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      c.copy(s).sub(this.target);
      let a = c.length();
      a *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * a / i.clientHeight, this.object.matrix), this._panUp(2 * e * a / i.clientHeight, this.object.matrix);
    } else
      this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / i.clientWidth, this.object.matrix), this._panUp(e * (this.object.top - this.object.bottom) / this.object.zoom / i.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const i = this.domElement.getBoundingClientRect(), s = t - i.left, a = e - i.top, h = i.width, r = i.height;
    this._mouse.x = s / h * 2 - 1, this._mouse.y = -(a / r) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(p * this._rotateDelta.x / e.clientHeight), this._rotateUp(p * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let e = !1;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(p * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), e = !0;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(-p * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), e = !0;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(p * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), e = !0;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(-p * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), e = !0;
        break;
    }
    e && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1)
      this._rotateStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), i = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._rotateStart.set(i, s);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1)
      this._panStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), i = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panStart.set(i, s);
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t), i = t.pageX - e.x, s = t.pageY - e.y, a = Math.sqrt(i * i + s * s);
    this._dollyStart.set(0, a);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const i = this._getSecondPointerPosition(t), s = 0.5 * (t.pageX + i.x), a = 0.5 * (t.pageY + i.y);
      this._rotateEnd.set(s, a);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(p * this._rotateDelta.x / e.clientHeight), this._rotateUp(p * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1)
      this._panEnd.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), i = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panEnd.set(i, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t), i = t.pageX - e.x, s = t.pageY - e.y, a = Math.sqrt(i * i + s * s);
    this._dollyEnd.set(0, a), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const h = (t.pageX + e.x) * 0.5, r = (t.pageY + e.y) * 0.5;
    this._updateZoomParameters(h, r);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  // pointers
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) {
        this._pointers.splice(e, 1);
        return;
      }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId)
        return !0;
    return !1;
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId];
    e === void 0 && (e = new _(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const e = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[e];
  }
  //
  _customWheelEvent(t) {
    const e = t.deltaMode, i = {
      clientX: t.clientX,
      clientY: t.clientY,
      deltaY: t.deltaY
    };
    switch (e) {
      case 1:
        i.deltaY *= 16;
        break;
      case 2:
        i.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (i.deltaY *= 10), i;
  }
}
function Z(o) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(o.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(o) && (this._addPointer(o), o.pointerType === "touch" ? this._onTouchStart(o) : this._onMouseDown(o), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function B(o) {
  this.enabled !== !1 && (o.pointerType === "touch" ? this._onTouchMove(o) : this._onMouseMove(o));
}
function K(o) {
  switch (this._removePointer(o), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(o.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(C), this.state = n.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function G(o) {
  let t;
  switch (o.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case T.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(o), this.state = n.DOLLY;
      break;
    case T.ROTATE:
      if (o.ctrlKey || o.metaKey || o.shiftKey) {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(o), this.state = n.PAN;
      } else {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(o), this.state = n.ROTATE;
      }
      break;
    case T.PAN:
      if (o.ctrlKey || o.metaKey || o.shiftKey) {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(o), this.state = n.ROTATE;
      } else {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(o), this.state = n.PAN;
      }
      break;
    default:
      this.state = n.NONE;
  }
  this.state !== n.NONE && this.dispatchEvent(w);
}
function X(o) {
  switch (this.state) {
    case n.ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleMouseMoveRotate(o);
      break;
    case n.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseMoveDolly(o);
      break;
    case n.PAN:
      if (this.enablePan === !1)
        return;
      this._handleMouseMovePan(o);
      break;
  }
}
function W(o) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== n.NONE || (o.preventDefault(), this.dispatchEvent(w), this._handleMouseWheel(this._customWheelEvent(o)), this.dispatchEvent(C));
}
function V(o) {
  this.enabled !== !1 && this._handleKeyDown(o);
}
function q(o) {
  switch (this._trackPointer(o), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case E.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(o), this.state = n.TOUCH_ROTATE;
          break;
        case E.PAN:
          if (this.enablePan === !1)
            return;
          this._handleTouchStartPan(o), this.state = n.TOUCH_PAN;
          break;
        default:
          this.state = n.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case E.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1)
            return;
          this._handleTouchStartDollyPan(o), this.state = n.TOUCH_DOLLY_PAN;
          break;
        case E.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1)
            return;
          this._handleTouchStartDollyRotate(o), this.state = n.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = n.NONE;
      }
      break;
    default:
      this.state = n.NONE;
  }
  this.state !== n.NONE && this.dispatchEvent(w);
}
function Q(o) {
  switch (this._trackPointer(o), this.state) {
    case n.TOUCH_ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleTouchMoveRotate(o), this.update();
      break;
    case n.TOUCH_PAN:
      if (this.enablePan === !1)
        return;
      this._handleTouchMovePan(o), this.update();
      break;
    case n.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1)
        return;
      this._handleTouchMoveDollyPan(o), this.update();
      break;
    case n.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1)
        return;
      this._handleTouchMoveDollyRotate(o), this.update();
      break;
    default:
      this.state = n.NONE;
  }
}
function $(o) {
  this.enabled !== !1 && o.preventDefault();
}
function J(o) {
  o.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function tt(o) {
  o.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
class et {
  constructor(t) {
    const {
      container: e,
      tilesetUrl: i,
      onSelect: s,
      onReady: a,
      onError: h
    } = t;
    this.container = e, this.onSelect = s, this.onReady = a, this.onError = h, this.globalFeatures = [], this.meshColorMap = /* @__PURE__ */ new WeakMap(), this.globalIdToMeshes = /* @__PURE__ */ new Map(), this.hiddenGlobalIds = /* @__PURE__ */ new Set(), this.businessHighlightIds = /* @__PURE__ */ new Set(), this.clickHighlightId = null, this._initScene(), this._initTiles(i), this._bindEvents(), this._animate();
  }
  _initScene() {
    this.scene = new m.Scene(), this.scene.background = new m.Color(1118498), this.camera = new m.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      5e3
    ), this.camera.position.set(10, 10, 10), this.renderer = new m.WebGLRenderer({ antialias: !0 }), this.renderer.setSize(this.container.clientWidth, this.container.clientHeight), this.renderer.setPixelRatio(window.devicePixelRatio), this.container.appendChild(this.renderer.domElement), this.controls = new F(this.camera, this.renderer.domElement), this.controls.enableDamping = !0;
    const t = new m.AmbientLight(16777215, 0.65);
    this.scene.add(t);
    const e = new m.DirectionalLight(16774630, 1.4);
    e.position.set(6, 12, 8), this.scene.add(e);
    const i = new m.GridHelper(200, 20, 8956671, 3364232);
    i.position.y = -1, this.scene.add(i);
  }
  _initTiles(t) {
    this.tilesRenderer = new Y(t), this.tilesRenderer.maximumScreenSpaceError = 16, this.tilesRenderer.setCamera(this.camera), this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer), this.tilesRenderer.group.rotation.x = Math.PI, this.scene.add(this.tilesRenderer.group), this.tilesRenderer.addEventListener("load-model", (e) => {
      this._onLoadModel(e);
    }), this.tilesRenderer.addEventListener("load-root-tileset", () => {
      this._fitCamera(), this.onReady && this.onReady();
    }), this.tilesRenderer.addEventListener("load-error", (e) => {
      console.error("Tileset 加载错误:", e.url, e.error), this.onError && this.onError(e);
    });
  }
  _onLoadModel(t) {
    var u;
    const { scene: e } = t, i = e.batchTable || ((u = e.userData) == null ? void 0 : u.batchTable), s = i == null ? void 0 : i.header;
    if (!s || !s.GlobalId) {
      console.warn("BatchTable 缺少 GlobalId 字段");
      return;
    }
    const a = s.GlobalId, h = s.Name || [], r = s.Type || [], d = a.length, g = this.globalFeatures.length;
    for (let l = 0; l < d; l++)
      this.globalFeatures.push({
        globalId: a[l],
        name: h[l] || "",
        type: r[l] || ""
      });
    e.userData.featureOffset = g, e.traverse((l) => {
      if (l.isMesh) {
        l.rotation.x = Math.PI, l.userData.featureOffset = g;
        const A = this._getFeatureIdFromMesh(l), b = this.globalFeatures[A];
        if (b != null && b.globalId) {
          const y = b.globalId;
          this.globalIdToMeshes.has(y) || this.globalIdToMeshes.set(y, []), this.globalIdToMeshes.get(y).push(l);
        }
        if (l.material) {
          const y = Array.isArray(l.material) ? l.material[0] : l.material;
          this.meshColorMap.set(l, y.color.clone());
        }
        if (b && this.hiddenGlobalIds.has(b.globalId) && (l.visible = !1), b && this.businessHighlightIds.has(b.globalId)) {
          const y = Array.isArray(l.material) ? l.material[0] : l.material;
          y && y.color.set(16746496);
        }
      }
    });
  }
  _getFeatureIdFromMesh(t) {
    var h, r, d;
    const e = t.geometry, i = ((h = e == null ? void 0 : e.attributes) == null ? void 0 : h._BATCHID) || ((r = e == null ? void 0 : e.attributes) == null ? void 0 : r._batchid);
    if (!i)
      return;
    const s = i.getX(0), a = (d = t.userData) == null ? void 0 : d.featureOffset;
    if (!(!Number.isInteger(s) || !Number.isInteger(a)))
      return a + s;
  }
  _getFeatureIdFromHit(t) {
    var d, g, u;
    const e = t.object, i = e.geometry, s = ((d = i == null ? void 0 : i.attributes) == null ? void 0 : d._BATCHID) || ((g = i == null ? void 0 : i.attributes) == null ? void 0 : g._batchid);
    if (!s)
      return;
    const a = t.faceIndex, h = s.getX(a * 3), r = (u = e.userData) == null ? void 0 : u.featureOffset;
    if (!(!Number.isInteger(h) || !Number.isInteger(r)))
      return r + h;
  }
  _bindEvents() {
    this._handleClickBound = this._handleClick.bind(this), this._handleResizeBound = this._handleResize.bind(this), this.renderer.domElement.addEventListener("click", this._handleClickBound), window.addEventListener("resize", this._handleResizeBound);
  }
  _handleClick(t) {
    const e = this.renderer.domElement.getBoundingClientRect(), i = new m.Vector2(
      (t.clientX - e.left) / e.width * 2 - 1,
      -((t.clientY - e.top) / e.height) * 2 + 1
    ), s = new m.Raycaster();
    s.setFromCamera(i, this.camera), s.firstHitOnly = !0;
    const a = this.tilesRenderer.raycast(s);
    if (!a || a.length === 0) {
      this._clearClickHighlight();
      return;
    }
    const h = a[0], r = this._getFeatureIdFromHit(h);
    if (r === void 0 || r >= this.globalFeatures.length)
      return;
    const d = this.globalFeatures[r];
    d && this.onSelect && this.onSelect({
      globalId: d.globalId,
      name: d.name,
      type: d.type
    }), this._applyClickHighlight(r);
  }
  _handleResize() {
    const t = this.container.clientWidth, e = this.container.clientHeight;
    this.camera.aspect = t / e, this.camera.updateProjectionMatrix(), this.renderer.setSize(t, e), this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer);
  }
  _applyClickHighlight(t) {
    this._clearClickHighlight();
    const e = this.globalFeatures[t];
    if (this.businessHighlightIds.has(e.globalId))
      return;
    const i = this.globalIdToMeshes.get(e.globalId);
    i && i.forEach((s) => {
      s.material && (Array.isArray(s.material) ? s.material[0] : s.material).color.set(8965375);
    }), this.clickHighlightId = t;
  }
  _clearClickHighlight() {
    if (this.clickHighlightId !== null) {
      const t = this.globalFeatures[this.clickHighlightId];
      if (t && !this.businessHighlightIds.has(t.globalId)) {
        const e = this.globalIdToMeshes.get(t.globalId);
        e && e.forEach((i) => {
          const s = this.meshColorMap.get(i);
          s && i.material && (Array.isArray(i.material) ? i.material[0] : i.material).color.copy(s);
        });
      }
      this.clickHighlightId = null;
    }
  }
  _fitCamera() {
    const t = new m.Sphere();
    if (this.tilesRenderer.getBoundingSphere(t), t.radius > 0 && !isNaN(t.center.x)) {
      const e = t.radius * 1.5;
      this.camera.position.set(
        t.center.x + e,
        t.center.y + e * 0.3,
        t.center.z + e
      ), this.controls.target.copy(t.center), this.controls.update();
    }
  }
  _animate() {
    this._animationId = requestAnimationFrame(() => this._animate()), this.camera.updateMatrixWorld(), this.tilesRenderer.update(), this.controls.update(), this.renderer.render(this.scene, this.camera);
  }
  resetCamera() {
    this._fitCamera();
  }
  hideByGlobalIds(t) {
    t.forEach((e) => {
      const i = this.globalIdToMeshes.get(e);
      i && i.forEach((s) => {
        s.visible = !1;
      }), this.hiddenGlobalIds.add(e);
    });
  }
  showByGlobalIds(t) {
    t.forEach((e) => {
      const i = this.globalIdToMeshes.get(e);
      i && i.forEach((s) => {
        s.visible = !0;
      }), this.hiddenGlobalIds.delete(e);
    });
  }
  highlightByGlobalIds(t) {
    this.clearHighlight(), t.forEach((e) => {
      const i = this.globalIdToMeshes.get(e);
      i && i.forEach((s) => {
        s.material && (Array.isArray(s.material) ? s.material[0] : s.material).color.set(16746496);
      }), this.businessHighlightIds.add(e);
    });
  }
  clearHighlight() {
    this.businessHighlightIds.forEach((t) => {
      const e = this.globalIdToMeshes.get(t);
      e && e.forEach((i) => {
        const s = this.meshColorMap.get(i);
        s && i.material && (Array.isArray(i.material) ? i.material[0] : i.material).color.copy(s);
      });
    }), this.businessHighlightIds.clear();
  }
  destroy() {
    this._animationId && cancelAnimationFrame(this._animationId), this.renderer.domElement.removeEventListener("click", this._handleClickBound), window.removeEventListener("resize", this._handleResizeBound), this.tilesRenderer.dispose(), this.renderer.dispose(), this.container.contains(this.renderer.domElement) && this.container.removeChild(this.renderer.domElement), this.globalFeatures = [], this.globalIdToMeshes.clear(), this.hiddenGlobalIds.clear(), this.businessHighlightIds.clear(), this.meshColorMap = null;
  }
}
const it = (o, t) => {
  const e = o.__vccOpts || o;
  for (const [i, s] of t)
    e[i] = s;
  return e;
}, st = {
  name: "ThreeTilesViewer",
  props: {
    tilesetUrl: {
      type: String,
      required: !0
    }
  },
  emits: ["select", "ready", "error"],
  setup(o, { emit: t, expose: e }) {
    const i = M(null), s = M(null);
    return x(() => {
      s.value = new et({
        container: i.value,
        tilesetUrl: o.tilesetUrl,
        onSelect: (u) => {
          t("select", u);
        },
        onReady: () => {
          t("ready");
        },
        onError: (u) => {
          t("error", u);
        }
      });
    }), L(() => {
      s.value && s.value.destroy();
    }), e({
      resetCamera: () => {
        s.value && s.value.resetCamera();
      },
      hideByGlobalIds: (u) => {
        s.value && s.value.hideByGlobalIds(u);
      },
      showByGlobalIds: (u) => {
        s.value && s.value.showByGlobalIds(u);
      },
      highlightByGlobalIds: (u) => {
        s.value && s.value.highlightByGlobalIds(u);
      },
      clearHighlight: () => {
        s.value && s.value.clearHighlight();
      }
    }), {
      container: i
    };
  }
}, ot = {
  ref: "container",
  class: "tiles-viewer"
};
function at(o, t, e, i, s, a) {
  return k(), j("div", ot, null, 512);
}
const lt = /* @__PURE__ */ it(st, [["render", at], ["__scopeId", "data-v-7b772242"]]);
export {
  lt as default
};
