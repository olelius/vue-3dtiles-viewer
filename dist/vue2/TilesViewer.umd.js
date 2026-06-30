(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["three"], factory);
	else if(typeof exports === 'object')
		exports["TilesViewer"] = factory(require("three"));
	else
		root["TilesViewer"] = factory(root["three"]);
})((typeof self !== 'undefined' ? self : this), (__WEBPACK_EXTERNAL_MODULE__604__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 604:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__604__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ entry_lib)
});

;// ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ const setPublicPath = (null);

// EXTERNAL MODULE: external "three"
var external_three_ = __webpack_require__(604);
;// ./node_modules/three/examples/jsm/controls/OrbitControls.js


// OrbitControls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

const _changeEvent = { type: 'change' };
const _startEvent = { type: 'start' };
const _endEvent = { type: 'end' };
const _ray = new external_three_.Ray();
const _plane = new external_three_.Plane();
const TILT_LIMIT = Math.cos( 70 * external_three_.MathUtils.DEG2RAD );

class OrbitControls extends external_three_.EventDispatcher {

	constructor( object, domElement ) {

		super();

		this.object = object;
		this.domElement = domElement;
		this.domElement.style.touchAction = 'none'; // disable touch scroll

		// Set to false to disable this control
		this.enabled = true;

		// "target" sets the location of focus, where the object orbits around
		this.target = new external_three_.Vector3();

		// Sets the 3D cursor (similar to Blender), from which the maxTargetRadius takes effect
		this.cursor = new external_three_.Vector3();

		// How far you can dolly in and out ( PerspectiveCamera only )
		this.minDistance = 0;
		this.maxDistance = Infinity;

		// How far you can zoom in and out ( OrthographicCamera only )
		this.minZoom = 0;
		this.maxZoom = Infinity;

		// Limit camera target within a spherical area around the cursor
		this.minTargetRadius = 0;
		this.maxTargetRadius = Infinity;

		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		// How far you can orbit horizontally, upper and lower limits.
		// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
		this.minAzimuthAngle = - Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians

		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.05;

		// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
		// Set to false to disable zooming
		this.enableZoom = true;
		this.zoomSpeed = 1.0;

		// Set to false to disable rotating
		this.enableRotate = true;
		this.rotateSpeed = 1.0;

		// Set to false to disable panning
		this.enablePan = true;
		this.panSpeed = 1.0;
		this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
		this.keyPanSpeed = 7.0;	// pixels moved per arrow key push
		this.zoomToCursor = false;

		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60

		// The four arrow keys
		this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };

		// Mouse buttons
		this.mouseButtons = { LEFT: external_three_.MOUSE.ROTATE, MIDDLE: external_three_.MOUSE.DOLLY, RIGHT: external_three_.MOUSE.PAN };

		// Touch fingers
		this.touches = { ONE: external_three_.TOUCH.ROTATE, TWO: external_three_.TOUCH.DOLLY_PAN };

		// for reset
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;

		// the target DOM element for key events
		this._domElementKeyEvents = null;

		//
		// public methods
		//

		this.getPolarAngle = function () {

			return spherical.phi;

		};

		this.getAzimuthalAngle = function () {

			return spherical.theta;

		};

		this.getDistance = function () {

			return this.object.position.distanceTo( this.target );

		};

		this.listenToKeyEvents = function ( domElement ) {

			domElement.addEventListener( 'keydown', onKeyDown );
			this._domElementKeyEvents = domElement;

		};

		this.stopListenToKeyEvents = function () {

			this._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );
			this._domElementKeyEvents = null;

		};

		this.saveState = function () {

			scope.target0.copy( scope.target );
			scope.position0.copy( scope.object.position );
			scope.zoom0 = scope.object.zoom;

		};

		this.reset = function () {

			scope.target.copy( scope.target0 );
			scope.object.position.copy( scope.position0 );
			scope.object.zoom = scope.zoom0;

			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( _changeEvent );

			scope.update();

			state = STATE.NONE;

		};

		// this method is exposed, but perhaps it would be better if we can make it private...
		this.update = function () {

			const offset = new external_three_.Vector3();

			// so camera.up is the orbit axis
			const quat = new external_three_.Quaternion().setFromUnitVectors( object.up, new external_three_.Vector3( 0, 1, 0 ) );
			const quatInverse = quat.clone().invert();

			const lastPosition = new external_three_.Vector3();
			const lastQuaternion = new external_three_.Quaternion();
			const lastTargetPosition = new external_three_.Vector3();

			const twoPI = 2 * Math.PI;

			return function update( deltaTime = null ) {

				const position = scope.object.position;

				offset.copy( position ).sub( scope.target );

				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion( quat );

				// angle from z-axis around y-axis
				spherical.setFromVector3( offset );

				if ( scope.autoRotate && state === STATE.NONE ) {

					rotateLeft( getAutoRotationAngle( deltaTime ) );

				}

				if ( scope.enableDamping ) {

					spherical.theta += sphericalDelta.theta * scope.dampingFactor;
					spherical.phi += sphericalDelta.phi * scope.dampingFactor;

				} else {

					spherical.theta += sphericalDelta.theta;
					spherical.phi += sphericalDelta.phi;

				}

				// restrict theta to be between desired limits

				let min = scope.minAzimuthAngle;
				let max = scope.maxAzimuthAngle;

				if ( isFinite( min ) && isFinite( max ) ) {

					if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;

					if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

					if ( min <= max ) {

						spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

					} else {

						spherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?
							Math.max( min, spherical.theta ) :
							Math.min( max, spherical.theta );

					}

				}

				// restrict phi to be between desired limits
				spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

				spherical.makeSafe();


				// move target to panned location

				if ( scope.enableDamping === true ) {

					scope.target.addScaledVector( panOffset, scope.dampingFactor );

				} else {

					scope.target.add( panOffset );

				}

				// Limit the target distance from the cursor to create a sphere around the center of interest
				scope.target.sub( scope.cursor );
				scope.target.clampLength( scope.minTargetRadius, scope.maxTargetRadius );
				scope.target.add( scope.cursor );

				let zoomChanged = false;
				// adjust the camera position based on zoom only if we're not zooming to the cursor or if it's an ortho camera
				// we adjust zoom later in these cases
				if ( scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera ) {

					spherical.radius = clampDistance( spherical.radius );

				} else {

					const prevRadius = spherical.radius;
					spherical.radius = clampDistance( spherical.radius * scale );
					zoomChanged = prevRadius != spherical.radius;

				}

				offset.setFromSpherical( spherical );

				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion( quatInverse );

				position.copy( scope.target ).add( offset );

				scope.object.lookAt( scope.target );

				if ( scope.enableDamping === true ) {

					sphericalDelta.theta *= ( 1 - scope.dampingFactor );
					sphericalDelta.phi *= ( 1 - scope.dampingFactor );

					panOffset.multiplyScalar( 1 - scope.dampingFactor );

				} else {

					sphericalDelta.set( 0, 0, 0 );

					panOffset.set( 0, 0, 0 );

				}

				// adjust camera position
				if ( scope.zoomToCursor && performCursorZoom ) {

					let newRadius = null;
					if ( scope.object.isPerspectiveCamera ) {

						// move the camera down the pointer ray
						// this method avoids floating point error
						const prevRadius = offset.length();
						newRadius = clampDistance( prevRadius * scale );

						const radiusDelta = prevRadius - newRadius;
						scope.object.position.addScaledVector( dollyDirection, radiusDelta );
						scope.object.updateMatrixWorld();

						zoomChanged = !! radiusDelta;

					} else if ( scope.object.isOrthographicCamera ) {

						// adjust the ortho camera position based on zoom changes
						const mouseBefore = new external_three_.Vector3( mouse.x, mouse.y, 0 );
						mouseBefore.unproject( scope.object );

						const prevZoom = scope.object.zoom;
						scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / scale ) );
						scope.object.updateProjectionMatrix();

						zoomChanged = prevZoom !== scope.object.zoom;

						const mouseAfter = new external_three_.Vector3( mouse.x, mouse.y, 0 );
						mouseAfter.unproject( scope.object );

						scope.object.position.sub( mouseAfter ).add( mouseBefore );
						scope.object.updateMatrixWorld();

						newRadius = offset.length();

					} else {

						console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.' );
						scope.zoomToCursor = false;

					}

					// handle the placement of the target
					if ( newRadius !== null ) {

						if ( this.screenSpacePanning ) {

							// position the orbit target in front of the new camera position
							scope.target.set( 0, 0, - 1 )
								.transformDirection( scope.object.matrix )
								.multiplyScalar( newRadius )
								.add( scope.object.position );

						} else {

							// get the ray and translation plane to compute target
							_ray.origin.copy( scope.object.position );
							_ray.direction.set( 0, 0, - 1 ).transformDirection( scope.object.matrix );

							// if the camera is 20 degrees above the horizon then don't adjust the focus target to avoid
							// extremely large values
							if ( Math.abs( scope.object.up.dot( _ray.direction ) ) < TILT_LIMIT ) {

								object.lookAt( scope.target );

							} else {

								_plane.setFromNormalAndCoplanarPoint( scope.object.up, scope.target );
								_ray.intersectPlane( _plane, scope.target );

							}

						}

					}

				} else if ( scope.object.isOrthographicCamera ) {

					const prevZoom = scope.object.zoom;
					scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / scale ) );

					if ( prevZoom !== scope.object.zoom ) {

						scope.object.updateProjectionMatrix();
						zoomChanged = true;

					}

				}

				scale = 1;
				performCursorZoom = false;

				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8

				if ( zoomChanged ||
					lastPosition.distanceToSquared( scope.object.position ) > EPS ||
					8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ||
					lastTargetPosition.distanceToSquared( scope.target ) > EPS ) {

					scope.dispatchEvent( _changeEvent );

					lastPosition.copy( scope.object.position );
					lastQuaternion.copy( scope.object.quaternion );
					lastTargetPosition.copy( scope.target );

					return true;

				}

				return false;

			};

		}();

		this.dispose = function () {

			scope.domElement.removeEventListener( 'contextmenu', onContextMenu );

			scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
			scope.domElement.removeEventListener( 'pointercancel', onPointerUp );
			scope.domElement.removeEventListener( 'wheel', onMouseWheel );

			scope.domElement.removeEventListener( 'pointermove', onPointerMove );
			scope.domElement.removeEventListener( 'pointerup', onPointerUp );

			const document = scope.domElement.getRootNode(); // offscreen canvas compatibility

			document.removeEventListener( 'keydown', interceptControlDown, { capture: true } );

			if ( scope._domElementKeyEvents !== null ) {

				scope._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );
				scope._domElementKeyEvents = null;

			}

			//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

		};

		//
		// internals
		//

		const scope = this;

		const STATE = {
			NONE: - 1,
			ROTATE: 0,
			DOLLY: 1,
			PAN: 2,
			TOUCH_ROTATE: 3,
			TOUCH_PAN: 4,
			TOUCH_DOLLY_PAN: 5,
			TOUCH_DOLLY_ROTATE: 6
		};

		let state = STATE.NONE;

		const EPS = 0.000001;

		// current position in spherical coordinates
		const spherical = new external_three_.Spherical();
		const sphericalDelta = new external_three_.Spherical();

		let scale = 1;
		const panOffset = new external_three_.Vector3();

		const rotateStart = new external_three_.Vector2();
		const rotateEnd = new external_three_.Vector2();
		const rotateDelta = new external_three_.Vector2();

		const panStart = new external_three_.Vector2();
		const panEnd = new external_three_.Vector2();
		const panDelta = new external_three_.Vector2();

		const dollyStart = new external_three_.Vector2();
		const dollyEnd = new external_three_.Vector2();
		const dollyDelta = new external_three_.Vector2();

		const dollyDirection = new external_three_.Vector3();
		const mouse = new external_three_.Vector2();
		let performCursorZoom = false;

		const pointers = [];
		const pointerPositions = {};

		let controlActive = false;

		function getAutoRotationAngle( deltaTime ) {

			if ( deltaTime !== null ) {

				return ( 2 * Math.PI / 60 * scope.autoRotateSpeed ) * deltaTime;

			} else {

				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

			}

		}

		function getZoomScale( delta ) {

			const normalizedDelta = Math.abs( delta * 0.01 );
			return Math.pow( 0.95, scope.zoomSpeed * normalizedDelta );

		}

		function rotateLeft( angle ) {

			sphericalDelta.theta -= angle;

		}

		function rotateUp( angle ) {

			sphericalDelta.phi -= angle;

		}

		const panLeft = function () {

			const v = new external_three_.Vector3();

			return function panLeft( distance, objectMatrix ) {

				v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
				v.multiplyScalar( - distance );

				panOffset.add( v );

			};

		}();

		const panUp = function () {

			const v = new external_three_.Vector3();

			return function panUp( distance, objectMatrix ) {

				if ( scope.screenSpacePanning === true ) {

					v.setFromMatrixColumn( objectMatrix, 1 );

				} else {

					v.setFromMatrixColumn( objectMatrix, 0 );
					v.crossVectors( scope.object.up, v );

				}

				v.multiplyScalar( distance );

				panOffset.add( v );

			};

		}();

		// deltaX and deltaY are in pixels; right and down are positive
		const pan = function () {

			const offset = new external_three_.Vector3();

			return function pan( deltaX, deltaY ) {

				const element = scope.domElement;

				if ( scope.object.isPerspectiveCamera ) {

					// perspective
					const position = scope.object.position;
					offset.copy( position ).sub( scope.target );
					let targetDistance = offset.length();

					// half of the fov is center to top of screen
					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

					// we use only clientHeight here so aspect ratio does not distort speed
					panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
					panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

				} else if ( scope.object.isOrthographicCamera ) {

					// orthographic
					panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
					panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

				} else {

					// camera neither orthographic nor perspective
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
					scope.enablePan = false;

				}

			};

		}();

		function dollyOut( dollyScale ) {

			if ( scope.object.isPerspectiveCamera || scope.object.isOrthographicCamera ) {

				scale /= dollyScale;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;

			}

		}

		function dollyIn( dollyScale ) {

			if ( scope.object.isPerspectiveCamera || scope.object.isOrthographicCamera ) {

				scale *= dollyScale;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;

			}

		}

		function updateZoomParameters( x, y ) {

			if ( ! scope.zoomToCursor ) {

				return;

			}

			performCursorZoom = true;

			const rect = scope.domElement.getBoundingClientRect();
			const dx = x - rect.left;
			const dy = y - rect.top;
			const w = rect.width;
			const h = rect.height;

			mouse.x = ( dx / w ) * 2 - 1;
			mouse.y = - ( dy / h ) * 2 + 1;

			dollyDirection.set( mouse.x, mouse.y, 1 ).unproject( scope.object ).sub( scope.object.position ).normalize();

		}

		function clampDistance( dist ) {

			return Math.max( scope.minDistance, Math.min( scope.maxDistance, dist ) );

		}

		//
		// event callbacks - update the object state
		//

		function handleMouseDownRotate( event ) {

			rotateStart.set( event.clientX, event.clientY );

		}

		function handleMouseDownDolly( event ) {

			updateZoomParameters( event.clientX, event.clientX );
			dollyStart.set( event.clientX, event.clientY );

		}

		function handleMouseDownPan( event ) {

			panStart.set( event.clientX, event.clientY );

		}

		function handleMouseMoveRotate( event ) {

			rotateEnd.set( event.clientX, event.clientY );

			rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

			const element = scope.domElement;

			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

			rotateStart.copy( rotateEnd );

			scope.update();

		}

		function handleMouseMoveDolly( event ) {

			dollyEnd.set( event.clientX, event.clientY );

			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				dollyOut( getZoomScale( dollyDelta.y ) );

			} else if ( dollyDelta.y < 0 ) {

				dollyIn( getZoomScale( dollyDelta.y ) );

			}

			dollyStart.copy( dollyEnd );

			scope.update();

		}

		function handleMouseMovePan( event ) {

			panEnd.set( event.clientX, event.clientY );

			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

			scope.update();

		}

		function handleMouseWheel( event ) {

			updateZoomParameters( event.clientX, event.clientY );

			if ( event.deltaY < 0 ) {

				dollyIn( getZoomScale( event.deltaY ) );

			} else if ( event.deltaY > 0 ) {

				dollyOut( getZoomScale( event.deltaY ) );

			}

			scope.update();

		}

		function handleKeyDown( event ) {

			let needsUpdate = false;

			switch ( event.code ) {

				case scope.keys.UP:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateUp( 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( 0, scope.keyPanSpeed );

					}

					needsUpdate = true;
					break;

				case scope.keys.BOTTOM:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateUp( - 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( 0, - scope.keyPanSpeed );

					}

					needsUpdate = true;
					break;

				case scope.keys.LEFT:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateLeft( 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( scope.keyPanSpeed, 0 );

					}

					needsUpdate = true;
					break;

				case scope.keys.RIGHT:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateLeft( - 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( - scope.keyPanSpeed, 0 );

					}

					needsUpdate = true;
					break;

			}

			if ( needsUpdate ) {

				// prevent the browser from scrolling on cursor keys
				event.preventDefault();

				scope.update();

			}


		}

		function handleTouchStartRotate( event ) {

			if ( pointers.length === 1 ) {

				rotateStart.set( event.pageX, event.pageY );

			} else {

				const position = getSecondPointerPosition( event );

				const x = 0.5 * ( event.pageX + position.x );
				const y = 0.5 * ( event.pageY + position.y );

				rotateStart.set( x, y );

			}

		}

		function handleTouchStartPan( event ) {

			if ( pointers.length === 1 ) {

				panStart.set( event.pageX, event.pageY );

			} else {

				const position = getSecondPointerPosition( event );

				const x = 0.5 * ( event.pageX + position.x );
				const y = 0.5 * ( event.pageY + position.y );

				panStart.set( x, y );

			}

		}

		function handleTouchStartDolly( event ) {

			const position = getSecondPointerPosition( event );

			const dx = event.pageX - position.x;
			const dy = event.pageY - position.y;

			const distance = Math.sqrt( dx * dx + dy * dy );

			dollyStart.set( 0, distance );

		}

		function handleTouchStartDollyPan( event ) {

			if ( scope.enableZoom ) handleTouchStartDolly( event );

			if ( scope.enablePan ) handleTouchStartPan( event );

		}

		function handleTouchStartDollyRotate( event ) {

			if ( scope.enableZoom ) handleTouchStartDolly( event );

			if ( scope.enableRotate ) handleTouchStartRotate( event );

		}

		function handleTouchMoveRotate( event ) {

			if ( pointers.length == 1 ) {

				rotateEnd.set( event.pageX, event.pageY );

			} else {

				const position = getSecondPointerPosition( event );

				const x = 0.5 * ( event.pageX + position.x );
				const y = 0.5 * ( event.pageY + position.y );

				rotateEnd.set( x, y );

			}

			rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

			const element = scope.domElement;

			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

			rotateStart.copy( rotateEnd );

		}

		function handleTouchMovePan( event ) {

			if ( pointers.length === 1 ) {

				panEnd.set( event.pageX, event.pageY );

			} else {

				const position = getSecondPointerPosition( event );

				const x = 0.5 * ( event.pageX + position.x );
				const y = 0.5 * ( event.pageY + position.y );

				panEnd.set( x, y );

			}

			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

		}

		function handleTouchMoveDolly( event ) {

			const position = getSecondPointerPosition( event );

			const dx = event.pageX - position.x;
			const dy = event.pageY - position.y;

			const distance = Math.sqrt( dx * dx + dy * dy );

			dollyEnd.set( 0, distance );

			dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

			dollyOut( dollyDelta.y );

			dollyStart.copy( dollyEnd );

			const centerX = ( event.pageX + position.x ) * 0.5;
			const centerY = ( event.pageY + position.y ) * 0.5;

			updateZoomParameters( centerX, centerY );

		}

		function handleTouchMoveDollyPan( event ) {

			if ( scope.enableZoom ) handleTouchMoveDolly( event );

			if ( scope.enablePan ) handleTouchMovePan( event );

		}

		function handleTouchMoveDollyRotate( event ) {

			if ( scope.enableZoom ) handleTouchMoveDolly( event );

			if ( scope.enableRotate ) handleTouchMoveRotate( event );

		}

		//
		// event handlers - FSM: listen for events and reset state
		//

		function onPointerDown( event ) {

			if ( scope.enabled === false ) return;

			if ( pointers.length === 0 ) {

				scope.domElement.setPointerCapture( event.pointerId );

				scope.domElement.addEventListener( 'pointermove', onPointerMove );
				scope.domElement.addEventListener( 'pointerup', onPointerUp );

			}

			//

			if ( isTrackingPointer( event ) ) return;

			//

			addPointer( event );

			if ( event.pointerType === 'touch' ) {

				onTouchStart( event );

			} else {

				onMouseDown( event );

			}

		}

		function onPointerMove( event ) {

			if ( scope.enabled === false ) return;

			if ( event.pointerType === 'touch' ) {

				onTouchMove( event );

			} else {

				onMouseMove( event );

			}

		}

		function onPointerUp( event ) {

			removePointer( event );

			switch ( pointers.length ) {

				case 0:

					scope.domElement.releasePointerCapture( event.pointerId );

					scope.domElement.removeEventListener( 'pointermove', onPointerMove );
					scope.domElement.removeEventListener( 'pointerup', onPointerUp );

					scope.dispatchEvent( _endEvent );

					state = STATE.NONE;

					break;

				case 1:

					const pointerId = pointers[ 0 ];
					const position = pointerPositions[ pointerId ];

					// minimal placeholder event - allows state correction on pointer-up
					onTouchStart( { pointerId: pointerId, pageX: position.x, pageY: position.y } );

					break;

			}

		}

		function onMouseDown( event ) {

			let mouseAction;

			switch ( event.button ) {

				case 0:

					mouseAction = scope.mouseButtons.LEFT;
					break;

				case 1:

					mouseAction = scope.mouseButtons.MIDDLE;
					break;

				case 2:

					mouseAction = scope.mouseButtons.RIGHT;
					break;

				default:

					mouseAction = - 1;

			}

			switch ( mouseAction ) {

				case external_three_.MOUSE.DOLLY:

					if ( scope.enableZoom === false ) return;

					handleMouseDownDolly( event );

					state = STATE.DOLLY;

					break;

				case external_three_.MOUSE.ROTATE:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						if ( scope.enablePan === false ) return;

						handleMouseDownPan( event );

						state = STATE.PAN;

					} else {

						if ( scope.enableRotate === false ) return;

						handleMouseDownRotate( event );

						state = STATE.ROTATE;

					}

					break;

				case external_three_.MOUSE.PAN:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						if ( scope.enableRotate === false ) return;

						handleMouseDownRotate( event );

						state = STATE.ROTATE;

					} else {

						if ( scope.enablePan === false ) return;

						handleMouseDownPan( event );

						state = STATE.PAN;

					}

					break;

				default:

					state = STATE.NONE;

			}

			if ( state !== STATE.NONE ) {

				scope.dispatchEvent( _startEvent );

			}

		}

		function onMouseMove( event ) {

			switch ( state ) {

				case STATE.ROTATE:

					if ( scope.enableRotate === false ) return;

					handleMouseMoveRotate( event );

					break;

				case STATE.DOLLY:

					if ( scope.enableZoom === false ) return;

					handleMouseMoveDolly( event );

					break;

				case STATE.PAN:

					if ( scope.enablePan === false ) return;

					handleMouseMovePan( event );

					break;

			}

		}

		function onMouseWheel( event ) {

			if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;

			event.preventDefault();

			scope.dispatchEvent( _startEvent );

			handleMouseWheel( customWheelEvent( event ) );

			scope.dispatchEvent( _endEvent );

		}

		function customWheelEvent( event ) {

			const mode = event.deltaMode;

			// minimal wheel event altered to meet delta-zoom demand
			const newEvent = {
				clientX: event.clientX,
				clientY: event.clientY,
				deltaY: event.deltaY,
			};

			switch ( mode ) {

				case 1: // LINE_MODE
					newEvent.deltaY *= 16;
					break;

				case 2: // PAGE_MODE
					newEvent.deltaY *= 100;
					break;

			}

			// detect if event was triggered by pinching
			if ( event.ctrlKey && ! controlActive ) {

				newEvent.deltaY *= 10;

			}

			return newEvent;

		}

		function interceptControlDown( event ) {

			if ( event.key === 'Control' ) {

				controlActive = true;


				const document = scope.domElement.getRootNode(); // offscreen canvas compatibility

				document.addEventListener( 'keyup', interceptControlUp, { passive: true, capture: true } );

			}

		}

		function interceptControlUp( event ) {

			if ( event.key === 'Control' ) {

				controlActive = false;


				const document = scope.domElement.getRootNode(); // offscreen canvas compatibility

				document.removeEventListener( 'keyup', interceptControlUp, { passive: true, capture: true } );

			}

		}

		function onKeyDown( event ) {

			if ( scope.enabled === false || scope.enablePan === false ) return;

			handleKeyDown( event );

		}

		function onTouchStart( event ) {

			trackPointer( event );

			switch ( pointers.length ) {

				case 1:

					switch ( scope.touches.ONE ) {

						case external_three_.TOUCH.ROTATE:

							if ( scope.enableRotate === false ) return;

							handleTouchStartRotate( event );

							state = STATE.TOUCH_ROTATE;

							break;

						case external_three_.TOUCH.PAN:

							if ( scope.enablePan === false ) return;

							handleTouchStartPan( event );

							state = STATE.TOUCH_PAN;

							break;

						default:

							state = STATE.NONE;

					}

					break;

				case 2:

					switch ( scope.touches.TWO ) {

						case external_three_.TOUCH.DOLLY_PAN:

							if ( scope.enableZoom === false && scope.enablePan === false ) return;

							handleTouchStartDollyPan( event );

							state = STATE.TOUCH_DOLLY_PAN;

							break;

						case external_three_.TOUCH.DOLLY_ROTATE:

							if ( scope.enableZoom === false && scope.enableRotate === false ) return;

							handleTouchStartDollyRotate( event );

							state = STATE.TOUCH_DOLLY_ROTATE;

							break;

						default:

							state = STATE.NONE;

					}

					break;

				default:

					state = STATE.NONE;

			}

			if ( state !== STATE.NONE ) {

				scope.dispatchEvent( _startEvent );

			}

		}

		function onTouchMove( event ) {

			trackPointer( event );

			switch ( state ) {

				case STATE.TOUCH_ROTATE:

					if ( scope.enableRotate === false ) return;

					handleTouchMoveRotate( event );

					scope.update();

					break;

				case STATE.TOUCH_PAN:

					if ( scope.enablePan === false ) return;

					handleTouchMovePan( event );

					scope.update();

					break;

				case STATE.TOUCH_DOLLY_PAN:

					if ( scope.enableZoom === false && scope.enablePan === false ) return;

					handleTouchMoveDollyPan( event );

					scope.update();

					break;

				case STATE.TOUCH_DOLLY_ROTATE:

					if ( scope.enableZoom === false && scope.enableRotate === false ) return;

					handleTouchMoveDollyRotate( event );

					scope.update();

					break;

				default:

					state = STATE.NONE;

			}

		}

		function onContextMenu( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();

		}

		function addPointer( event ) {

			pointers.push( event.pointerId );

		}

		function removePointer( event ) {

			delete pointerPositions[ event.pointerId ];

			for ( let i = 0; i < pointers.length; i ++ ) {

				if ( pointers[ i ] == event.pointerId ) {

					pointers.splice( i, 1 );
					return;

				}

			}

		}

		function isTrackingPointer( event ) {

			for ( let i = 0; i < pointers.length; i ++ ) {

				if ( pointers[ i ] == event.pointerId ) return true;

			}

			return false;

		}

		function trackPointer( event ) {

			let position = pointerPositions[ event.pointerId ];

			if ( position === undefined ) {

				position = new external_three_.Vector2();
				pointerPositions[ event.pointerId ] = position;

			}

			position.set( event.pageX, event.pageY );

		}

		function getSecondPointerPosition( event ) {

			const pointerId = ( event.pointerId === pointers[ 0 ] ) ? pointers[ 1 ] : pointers[ 0 ];

			return pointerPositions[ pointerId ];

		}

		//

		scope.domElement.addEventListener( 'contextmenu', onContextMenu );

		scope.domElement.addEventListener( 'pointerdown', onPointerDown );
		scope.domElement.addEventListener( 'pointercancel', onPointerUp );
		scope.domElement.addEventListener( 'wheel', onMouseWheel, { passive: false } );

		const document = scope.domElement.getRootNode(); // offscreen canvas compatibility

		document.addEventListener( 'keydown', interceptControlDown, { passive: true, capture: true } );

		// force an update at start

		this.update();

	}

}



;// ./node_modules/3d-tiles-renderer/build/constants-CBDAm28G.js
var z = Object.defineProperty;
var J = (r, e, t) => e in r ? z(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var U = (r, e, t) => J(r, typeof e != "symbol" ? e + "" : e, t);
class S {
  /**
   * Sets the active "XRSession" value to use to scheduling rAF callbacks.
   * @param {XRSession} session
   */
  static setXRSession(e) {
    e !== this.session && (this.flushPending(), this.session = e);
  }
  /**
   * Request animation frame (defer to XR session if set)
   * @param {Function} cb
   * @returns {number}
   */
  static requestAnimationFrame(e) {
    const { session: t, pending: s } = this;
    let i;
    const a = () => {
      s.delete(i), e();
    };
    return t ? i = t.requestAnimationFrame(a) : i = requestAnimationFrame(a), s.set(i, e), i;
  }
  /**
   * Cancel animation frame via handle (defer to XR session if set)
   * @param {number} handle
   */
  static cancelAnimationFrame(e) {
    const { pending: t, session: s } = this;
    t.delete(e), s ? s.cancelAnimationFrame(e) : cancelAnimationFrame(e);
  }
  /**
   * Flush and complete pending AFs (defer to XR session if set)
   */
  static flushPending() {
    this.pending.forEach((e, t) => {
      e(), this.cancelAnimationFrame(t);
    });
  }
}
U(S, "pending", /* @__PURE__ */ new Map()), U(S, "session", null);
const A = 2 ** 30;
class T {
  /**
   * Comparator used to determine eviction order. Items that sort last are evicted first.
   * When `null`, eviction order is by last-used time.
   * @type {UnloadPriorityCallback|null}
   * @default null
   */
  get unloadPriorityCallback() {
    return this._unloadPriorityCallback;
  }
  set unloadPriorityCallback(e) {
    e.length === 1 ? (console.warn('LRUCache: "unloadPriorityCallback" function has been changed to take two arguments.'), this._unloadPriorityCallback = (t, s) => {
      const i = e(t), a = e(s);
      return i < a ? -1 : i > a ? 1 : 0;
    }) : this._unloadPriorityCallback = e;
  }
  constructor() {
    this.minSize = 6e3, this.maxSize = 8e3, this.minBytesSize = 0.3 * A, this.maxBytesSize = 0.4 * A, this.unloadPercent = 0.05, this.autoMarkUnused = !0, this.itemSet = /* @__PURE__ */ new Map(), this.itemList = [], this.usedSet = /* @__PURE__ */ new Set(), this.callbacks = /* @__PURE__ */ new Map(), this.unloadingHandle = -1, this.cachedBytes = 0, this.bytesMap = /* @__PURE__ */ new Map(), this.loadedSet = /* @__PURE__ */ new Set(), this._unloadPriorityCallback = null;
    const e = this.itemSet;
    this.defaultPriorityCallback = (t) => e.get(t);
  }
  /**
   * Returns whether the cache has reached its maximum item count or byte size.
   * @returns {boolean}
   */
  isFull() {
    return this.itemSet.size >= this.maxSize || this.cachedBytes >= this.maxBytesSize;
  }
  /**
   * Returns the byte size registered for the given item, or 0 if not tracked.
   * @param {any} item
   * @returns {number}
   */
  getMemoryUsage(e) {
    return this.bytesMap.get(e) || 0;
  }
  /**
   * Sets the byte size for the given item, updating the total `cachedBytes` count.
   * @param {any} item
   * @param {number} bytes
   */
  setMemoryUsage(e, t) {
    const { bytesMap: s, itemSet: i } = this;
    i.has(e) && (this.cachedBytes -= s.get(e) || 0, s.set(e, t), this.cachedBytes += t);
  }
  /**
   * Adds an item to the cache. Returns false if the item already exists or the cache is full.
   * @param {any} item
   * @param {RemoveCallback} removeCb - Called with the item when it is evicted
   * @returns {boolean}
   */
  add(e, t) {
    const s = this.itemSet;
    if (s.has(e) || this.isFull())
      return !1;
    const i = this.usedSet, a = this.itemList, n = this.callbacks;
    return a.push(e), i.add(e), s.set(e, Date.now()), n.set(e, t), !0;
  }
  /**
   * Returns whether the given item is in the cache.
   * @param {any} item
   * @returns {boolean}
   */
  has(e) {
    return this.itemSet.has(e);
  }
  /**
   * Removes an item from the cache immediately, invoking its removal callback.
   * Returns false if the item was not in the cache.
   * @param {any} item
   * @returns {boolean}
   */
  remove(e) {
    const t = this.usedSet, s = this.itemSet, i = this.itemList, a = this.bytesMap, n = this.callbacks, c = this.loadedSet;
    if (s.has(e)) {
      this.cachedBytes -= a.get(e) || 0, a.delete(e), n.get(e)(e);
      const o = i.indexOf(e);
      return i.splice(o, 1), t.delete(e), s.delete(e), n.delete(e), c.delete(e), !0;
    }
    return !1;
  }
  /**
   * Marks whether an item has finished loading. Unloaded items may be evicted early
   * when the cache is over its max size limits, even if they are marked as used.
   * @param {any} item
   * @param {boolean} value
   */
  setLoaded(e, t) {
    const { itemSet: s, loadedSet: i } = this;
    s.has(e) && (t === !0 ? i.add(e) : i.delete(e));
  }
  /**
   * Marks an item as used in the current frame, preventing it from being evicted.
   * @param {any} item
   */
  markUsed(e) {
    const t = this.itemSet, s = this.usedSet;
    t.has(e) && !s.has(e) && (t.set(e, Date.now()), s.add(e));
  }
  /**
   * Marks an item as unused, making it eligible for eviction.
   * @param {any} item
   */
  markUnused(e) {
    this.usedSet.delete(e);
  }
  /**
   * Marks all items in the cache as unused.
   */
  markAllUnused() {
    this.usedSet.clear();
  }
  /**
   * Returns whether the given item is currently marked as used.
   * @param {any} item
   * @returns {boolean}
   */
  isUsed(e) {
    return this.usedSet.has(e);
  }
  /**
   * Evicts unused items until the cache is within its min size and byte limits.
   * Items are sorted by `unloadPriorityCallback` before eviction.
   */
  // TODO: this should be renamed because it's not necessarily unloading all unused content
  // Maybe call it "cleanup" or "unloadToMinSize"
  unloadUnusedContent() {
    const {
      unloadPercent: e,
      minSize: t,
      maxSize: s,
      itemList: i,
      itemSet: a,
      usedSet: n,
      loadedSet: c,
      callbacks: o,
      bytesMap: d,
      minBytesSize: u,
      maxBytesSize: f
    } = this, y = i.length - n.size, B = i.length - c.size, g = Math.max(Math.min(i.length - t, y), 0), p = this.cachedBytes - u, w = this.unloadPriorityCallback || this.defaultPriorityCallback;
    let k = !1;
    const F = g > 0 && y > 0 || B && i.length > s;
    if (y && this.cachedBytes > u || B && this.cachedBytes > f || F) {
      i.sort((l, m) => {
        const P = n.has(l), R = n.has(m);
        if (P === R) {
          const x = c.has(l), _ = c.has(m);
          return x === _ ? -w(l, m) : x ? 1 : -1;
        } else
          return P ? 1 : -1;
      });
      const v = Math.max(t * e, g * e), C = Math.ceil(Math.min(v, y, g)), L = Math.max(e * p, e * u), E = Math.min(L, p);
      let h = 0, b = 0;
      for (; this.cachedBytes - b > f || i.length - h > s; ) {
        const l = i[h], m = d.get(l) || 0;
        if (n.has(l) && c.has(l) || this.cachedBytes - b - m < f && i.length - h <= s)
          break;
        b += m, h++;
      }
      for (; b < E || h < C; ) {
        const l = i[h], m = d.get(l) || 0;
        if (n.has(l) || this.cachedBytes - b - m < u && h >= C)
          break;
        b += m, h++;
      }
      i.splice(0, h).forEach((l) => {
        this.cachedBytes -= d.get(l) || 0, o.get(l)(l), d.delete(l), a.delete(l), o.delete(l), c.delete(l), n.delete(l);
      }), k = h < g || b < p && h < y, k = k && h > 0;
    }
    k && (this.unloadingHandle = S.requestAnimationFrame(() => this.scheduleUnload()));
  }
  /**
   * Schedules `unloadUnusedContent` to run asynchronously via microtask.
   */
  scheduleUnload() {
    S.cancelAnimationFrame(this.unloadingHandle), this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
      this.scheduled = !1, this.unloadUnusedContent();
    }));
  }
}
class M extends Error {
  constructor() {
    super("PriorityQueue: Item removed"), this.name = "PriorityQueueItemRemovedError";
  }
}
class G {
  /**
   * returns whether tasks are queued or actively running
   * @readonly
   * @type {boolean}
   */
  get running() {
    return this.items.length !== 0 || this.currJobs !== 0;
  }
  /**
   * Callback used to schedule when to run jobs next, so more work doesn't happen in a
   * single frame than there is time for. Should be overridden in scenarios where
   * `requestAnimationFrame` is not reliable, such as when running in WebXR.
   * @type {SchedulingCallback}
   * @default requestAnimationFrame
   * @deprecated
   */
  get schedulingCallback() {
    return this._schedulingCallback;
  }
  set schedulingCallback(e) {
    console.log('PriorityQueue: Setting "schedulingCallback" has been deprecated. Use Scheduler to switch to an XRSession rAF, instead.'), this._schedulingCallback = e;
  }
  constructor() {
    this.maxJobs = 6, this.items = [], this.callbacks = /* @__PURE__ */ new Map(), this.currJobs = 0, this.scheduled = !1, this.autoUpdate = !0, this.priorityCallback = null, this._schedulingCallback = (e) => {
      S.requestAnimationFrame(e);
    }, this._runjobs = () => {
      this.scheduled = !1, this.tryRunJobs();
    };
  }
  /**
   * Sorts the pending item list using `priorityCallback`, if set.
   */
  sort() {
    const e = this.priorityCallback, t = this.items;
    e !== null && t.sort(e);
  }
  /**
   * Returns whether the given item is currently queued.
   * @param {any} item
   * @returns {boolean}
   */
  has(e) {
    return this.callbacks.has(e);
  }
  /**
   * Adds an item to the queue and returns a Promise that resolves when the item's
   * callback completes, or rejects if the item is removed before running.
   * @param {any} item
   * @param {ItemCallback} callback - Invoked with `item` when it is dequeued; may return a Promise
   * @returns {Promise<any>}
   */
  add(e, t) {
    const s = {
      callback: t,
      reject: null,
      resolve: null,
      promise: null
    };
    return s.promise = new Promise((i, a) => {
      const n = this.items, c = this.callbacks;
      s.resolve = i, s.reject = a, n.unshift(e), c.set(e, s), this.autoUpdate && this.scheduleJobRun();
    }), s.promise;
  }
  /**
   * Removes an item from the queue, rejecting its promise with `PriorityQueueItemRemovedError`.
   * @param {any} item
   */
  remove(e) {
    const t = this.items, s = this.callbacks, i = t.indexOf(e);
    if (i !== -1) {
      const a = s.get(e);
      a.promise.catch((n) => {
        if (!(n instanceof M))
          throw n;
      }), a.reject(new M()), t.splice(i, 1), s.delete(e);
    }
  }
  /**
   * Removes all queued items for which `filter` returns true.
   * @param {FilterCallback} filter - Called with each item; return true to remove
   */
  removeByFilter(e) {
    const { items: t } = this;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      e(i) && (this.remove(i), s--);
    }
  }
  /**
   * Immediately attempts to dequeue and run pending jobs up to `maxJobs` concurrency.
   */
  tryRunJobs() {
    this.sort();
    const e = this.items, t = this.callbacks, s = this.maxJobs;
    let i = 0;
    const a = () => {
      this.currJobs--, this.autoUpdate && this.scheduleJobRun();
    };
    for (; s > this.currJobs && e.length > 0 && i < s; ) {
      this.currJobs++, i++;
      const n = e.pop(), { callback: c, resolve: o, reject: d } = t.get(n);
      t.delete(n);
      let u;
      try {
        u = c(n);
      } catch (f) {
        d(f), a();
      }
      u instanceof Promise ? u.then(o).catch(d).finally(a) : (o(u), a());
    }
  }
  /**
   * Immediately runs the callback for the given item, removing it from the queue.
   * Does nothing if the item is not queued.
   * @param {any} item
   * @returns {Promise<any>|any}
   */
  flush(e) {
    const { items: t, callbacks: s } = this, i = t.indexOf(e);
    if (!s.has(e))
      return;
    const { callback: a, resolve: n, reject: c } = s.get(e);
    s.delete(e), t.splice(i, 1);
    let o;
    try {
      o = a(e);
    } catch (d) {
      c(d);
      return;
    }
    return o instanceof Promise ? o.then(n).catch(c) : n(o), o;
  }
  /**
   * Schedules a deferred call to `tryRunJobs` via `schedulingCallback`.
   */
  scheduleJobRun() {
    this.scheduled || (this._schedulingCallback(this._runjobs), this.scheduled = !0);
  }
}
const N = -1, j = 0, Q = 1, q = 2, O = 3, H = 4, W = 6378137, X = (/* unused pure expression or super */ null && (1 / 298.257223563)), Y = 6356752314245179e-9;

//# sourceMappingURL=constants-CBDAm28G.js.map

;// ./node_modules/3d-tiles-renderer/build/LoaderBase-ATuDWTDB.js
function h(r, e = null, t = null) {
  const n = [];
  for (n.push(r), n.push(null), n.push(0); n.length > 0; ) {
    const o = n.pop(), i = n.pop(), s = n.pop();
    if (e && e(s, i, o)) {
      t && t(s, i, o);
      return;
    }
    const a = s.children;
    if (a)
      for (let l = a.length - 1; l >= 0; l--)
        n.push(a[l]), n.push(s), n.push(o + 1);
    t && t(s, i, o);
  }
}
function u(r, e = null) {
  let t = r;
  for (; t; ) {
    const n = t.internal.depth, o = t.parent;
    e && e(t, o, n), t = o;
  }
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  traverseAncestors: u,
  traverseSet: h
}, Symbol.toStringTag, { value: "Module" }));
function LoaderBase_ATuDWTDB_d(r) {
  if (r === null || r.byteLength < 4)
    return "";
  let e;
  if (r instanceof DataView ? e = r : e = new DataView(r), String.fromCharCode(e.getUint8(0)) === "{")
    return null;
  let t = "";
  for (let n = 0; n < 4; n++)
    t += String.fromCharCode(e.getUint8(n));
  return t;
}
const p = new TextDecoder();
function f(r) {
  return p.decode(r);
}
function LoaderBase_ATuDWTDB_c(r) {
  return r.replace(/[\\/][^\\/]+$/, "") + "/";
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arrayToString: f,
  getWorkingPath: LoaderBase_ATuDWTDB_c,
  readMagicBytes: LoaderBase_ATuDWTDB_d
}, Symbol.toStringTag, { value: "Module" }));
class y {
  constructor() {
    this.fetchOptions = {}, this.workingPath = "";
  }
  /**
   * @deprecated Use `loadAsync` instead.
   * @param {string} url
   * @returns {Promise<any>}
   */
  load(...e) {
    return console.warn('Loader: "load" function has been deprecated in favor of "loadAsync".'), this.loadAsync(...e);
  }
  /**
   * Fetches and parses content from the given URL.
   * @param {string} url
   * @returns {Promise<any>}
   */
  loadAsync(e) {
    return fetch(e, this.fetchOptions).then((t) => {
      if (!t.ok)
        throw new Error(`Failed to load file "${e}" with status ${t.status} : ${t.statusText}`);
      return t.arrayBuffer();
    }).then((t) => (this.workingPath === "" && (this.workingPath = LoaderBase_ATuDWTDB_c(e)), this.parse(t)));
  }
  /**
   * Resolves a relative URL against `workingPath`.
   * @param {string} url
   * @returns {string}
   */
  resolveExternalURL(e) {
    return new URL(e, this.workingPath).href;
  }
  /**
   * Parses a raw buffer into a tile result object. Must be implemented by subclasses.
   * @param {ArrayBuffer} buffer
   * @returns {any}
   */
  parse(e) {
    throw new Error("LoaderBase: Parse not implemented.");
  }
}

//# sourceMappingURL=LoaderBase-ATuDWTDB.js.map

;// ./node_modules/3d-tiles-renderer/build/B3DMLoaderBase-p2hcBFT-.js


function B3DMLoaderBase_p2hcBFT_M(t) {
  if (!t)
    return null;
  let e = t.length;
  const s = t.indexOf("?"), n = t.indexOf("#");
  s !== -1 && (e = Math.min(e, s)), n !== -1 && (e = Math.min(e, n));
  const r = t.lastIndexOf(".", e), a = t.lastIndexOf("/", e), i = t.indexOf("://");
  return i !== -1 && i + 2 === a || r === -1 || r < a ? null : t.substring(r + 1, e) || null;
}
const B3DMLoaderBase_p2hcBFT_U = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
};
function B3DMLoaderBase_p2hcBFT_A(t) {
  return t === H || t === N;
}
function B3DMLoaderBase_p2hcBFT_g(t, e) {
  return B3DMLoaderBase_p2hcBFT_N(t) && t.traversal.lastFrameVisited === e && t.traversal.used;
}
function B3DMLoaderBase_p2hcBFT_N(t) {
  return !!t.traversal;
}
function P(t) {
  const { children: e } = t, s = e.length === 0 || B3DMLoaderBase_p2hcBFT_N(e[e.length - 1]), n = !t.internal.hasUnrenderableContent || B3DMLoaderBase_p2hcBFT_A(t.internal.loadingState);
  return s && n;
}
function B3DMLoaderBase_p2hcBFT_w(t) {
  return t.internal.hasUnrenderableContent || t.parent && t.parent.geometricError < t.geometricError;
}
function k(t, e) {
  e.ensureChildrenArePreprocessed(t), t.traversal.lastFrameVisited !== e.frameCount && (t.traversal.lastFrameVisited = e.frameCount, t.traversal.used = !1, t.traversal.inFrustum = !1, t.traversal.isLeaf = !1, t.traversal.visible = !1, t.traversal.active = !1, t.traversal.error = 1 / 0, t.traversal.distanceFromCamera = 1 / 0, t.traversal.allChildrenReady = !1, t.traversal.allChildrenLoaded = !1, t.traversal.kicked = !1, t.traversal.allUsedChildrenProcessed = !1, e.calculateTileViewErrorWithPlugin(t, B3DMLoaderBase_p2hcBFT_U), t.traversal.inFrustum = B3DMLoaderBase_p2hcBFT_U.inView, t.traversal.error = B3DMLoaderBase_p2hcBFT_U.error, t.traversal.distanceFromCamera = B3DMLoaderBase_p2hcBFT_U.distanceFromCamera);
}
function V(t, e, s = !1) {
  if (k(t, e), s ? e.markTileUsed(t) : E(t), B3DMLoaderBase_p2hcBFT_w(t) && P(t)) {
    const n = t.children;
    for (let r = 0, a = n.length; r < a; r++)
      V(n[r], e, s);
  }
}
function B3DMLoaderBase_p2hcBFT_H(t, e) {
  if (k(t, e), t.traversal.usedLastFrame && (E(t), t.traversal.wasSetActive && (t.traversal.active = !0), (!t.traversal.active || B3DMLoaderBase_p2hcBFT_w(t)) && P(t))) {
    const s = t.children;
    for (let n = 0, r = s.length; n < r; n++)
      B3DMLoaderBase_p2hcBFT_H(s[n], e);
  }
}
function E(t) {
  t.traversal.used = !0;
}
function pe(t, e) {
  return !(t.traversal.error <= e.errorTarget && !B3DMLoaderBase_p2hcBFT_w(t) || e.maxDepth > 0 && t.internal.depth + 1 >= e.maxDepth || !P(t));
}
function B3DMLoaderBase_p2hcBFT_J(t, e) {
  const { frameCount: s } = e, { children: n } = t;
  for (let r = 0, a = n.length; r < a; r++) {
    const i = n[r];
    B3DMLoaderBase_p2hcBFT_g(i, s) && (i.traversal.active && (i.traversal.kicked = !0, i.traversal.active = !1), B3DMLoaderBase_p2hcBFT_J(i, e));
  }
}
function B3DMLoaderBase_p2hcBFT_j(t) {
  return !B3DMLoaderBase_p2hcBFT_w(t) && (!t.internal.hasContent || B3DMLoaderBase_p2hcBFT_A(t.internal.loadingState));
}
function B3DMLoaderBase_p2hcBFT_W(t, e) {
  if (k(t, e), !t.traversal.inFrustum)
    return;
  if (!pe(t, e)) {
    E(t);
    return;
  }
  let s = !1, n = !1;
  const r = t.children;
  for (let a = 0, i = r.length; a < i; a++) {
    const l = r[a];
    B3DMLoaderBase_p2hcBFT_W(l, e), s = s || B3DMLoaderBase_p2hcBFT_g(l, e.frameCount), n = n || l.traversal.inFrustum;
  }
  if (t.refine === "REPLACE" && !n && r.length !== 0) {
    t.traversal.inFrustum = !1, e.markTileUsed(t);
    for (let a = 0, i = r.length; a < i; a++)
      V(r[a], e, !0);
    return;
  }
  if (E(t), t.refine === "REPLACE" && s && (e.loadSiblings || e.loadAncestors))
    for (let a = 0, i = r.length; a < i; a++)
      V(r[a], e);
}
function K(t, e) {
  const s = e.frameCount;
  if (!B3DMLoaderBase_p2hcBFT_g(t, s))
    return;
  const n = t.children;
  let r = !1;
  for (let i = 0, l = n.length; i < l; i++) {
    const o = n[i];
    r = r || B3DMLoaderBase_p2hcBFT_g(o, s);
  }
  if (!r)
    t.traversal.isLeaf = !0;
  else {
    for (let l = 0, o = n.length; l < o; l++)
      K(n[l], e);
    let i = !0;
    for (let l = 0, o = n.length; l < o; l++) {
      const c = n[l];
      if (B3DMLoaderBase_p2hcBFT_g(c, s)) {
        const u = !B3DMLoaderBase_p2hcBFT_w(c), v = !c.internal.hasContent || B3DMLoaderBase_p2hcBFT_A(c.internal.loadingState);
        u && v || c.traversal.allChildrenLoaded || (i = !1);
      }
    }
    t.traversal.allChildrenLoaded = i;
  }
  let a = !0;
  for (let i = 0, l = n.length; i < l; i++) {
    const o = n[i];
    B3DMLoaderBase_p2hcBFT_g(o, e.frameCount) && !o.traversal.allUsedChildrenProcessed && (a = !1);
  }
  t.traversal.allUsedChildrenProcessed = a && P(t);
}
function B3DMLoaderBase_p2hcBFT_Y(t, e) {
  if (!B3DMLoaderBase_p2hcBFT_g(t, e.frameCount))
    return;
  const s = t.children;
  if (e.loadAncestors && !t.traversal.allChildrenLoaded && !B3DMLoaderBase_p2hcBFT_w(t) && (t.traversal.isLeaf = !0), t.traversal.isLeaf) {
    if (!B3DMLoaderBase_p2hcBFT_w(t) && (t.traversal.active = !0, P(t) && t.internal.hasContent && !B3DMLoaderBase_p2hcBFT_A(t.internal.loadingState)))
      for (let r = 0, a = s.length; r < a; r++)
        B3DMLoaderBase_p2hcBFT_H(s[r], e);
    return;
  }
  let n = s.length > 0;
  for (let r = 0, a = s.length; r < a; r++) {
    const i = s[r];
    B3DMLoaderBase_p2hcBFT_Y(i, e), B3DMLoaderBase_p2hcBFT_g(i, e.frameCount) && !(i.traversal.active && B3DMLoaderBase_p2hcBFT_j(i)) && !i.traversal.allChildrenReady && (n = !1);
  }
  t.traversal.allChildrenReady = n, !n && t.traversal.wasSetActive && B3DMLoaderBase_p2hcBFT_j(t) && (t.traversal.active = !0, B3DMLoaderBase_p2hcBFT_J(t, e));
}
function B3DMLoaderBase_p2hcBFT_X(t, e) {
  const s = B3DMLoaderBase_p2hcBFT_g(t, e.frameCount);
  if (s && ((t.internal.hasUnrenderableContent || t.internal.hasRenderableContent && t.refine === "ADD") && (t.traversal.active = !0), (t.traversal.active || t.traversal.kicked) && t.internal.hasContent && (e.markTileUsed(t), (t.internal.hasUnrenderableContent || t.traversal.allUsedChildrenProcessed) && e.queueTileForDownload(t), t.internal.loadingState !== H && (t.traversal.active = !1)), e.loadAncestors && t.internal.hasContent && (e.markTileUsed(t), e.queueTileForDownload(t)), t.internal.virtualChildCount > 0 && t.internal.hasContent && e.markTileUsed(t), t.traversal.visible = t.internal.hasRenderableContent && t.traversal.active && t.traversal.inFrustum && t.internal.loadingState === H, e.stats.used++, t.traversal.inFrustum && e.stats.inFrustum++), s || B3DMLoaderBase_p2hcBFT_N(t) && t.traversal.usedLastFrame) {
    let n = !1, r = !1;
    s ? (n = t.traversal.active, e.displayActiveTiles ? r = t.traversal.active || t.traversal.visible : r = t.traversal.visible) : k(t, e), t.internal.hasRenderableContent && t.internal.loadingState === H ? (n && e.stats.active++, r && e.stats.visible++, t.traversal.wasSetActive !== n && e.invokeOnePlugin((i) => i.setTileActive && i.setTileActive(t, n)), t.traversal.wasSetVisible !== r && e.invokeOnePlugin((i) => i.setTileVisible && i.setTileVisible(t, r))) : t.internal.hasRenderableContent || (r = t.traversal.isLeaf, t.traversal.wasSetVisible !== r && e.invokeOnePlugin((i) => i.setEmptyTileVisible && i.setEmptyTileVisible(t, r))), t.traversal.wasSetActive = n, t.traversal.wasSetVisible = r, t.traversal.usedLastFrame = s;
    const a = t.children;
    for (let i = 0, l = a.length; i < l; i++) {
      const o = a[i];
      B3DMLoaderBase_p2hcBFT_X(o, e);
    }
  }
}
function me(t, e) {
  B3DMLoaderBase_p2hcBFT_W(t, e), K(t, e), B3DMLoaderBase_p2hcBFT_Y(t, e), B3DMLoaderBase_p2hcBFT_X(t, e);
}
const L = {
  inView: !1,
  error: 1 / 0,
  distanceFromCamera: 1 / 0
}, Z = !0;
function ee(t) {
  return t === H || t === N;
}
function b(t, e) {
  return _(t) && t.traversal.lastFrameVisited === e && t.traversal.used;
}
function _(t) {
  return !!t.traversal;
}
function $(t) {
  const e = t.children;
  return e.length === 0 || _(e[e.length - 1]);
}
function B3DMLoaderBase_p2hcBFT_q(t) {
  return t.internal.hasUnrenderableContent || t.parent && t.parent.geometricError < t.geometricError;
}
function B3DMLoaderBase_p2hcBFT_Q(t, e) {
  t.traversal.lastFrameVisited !== e.frameCount && (t.traversal.lastFrameVisited = e.frameCount, t.traversal.used = !1, t.traversal.inFrustum = !1, t.traversal.isLeaf = !1, t.traversal.visible = !1, t.traversal.active = !1, t.traversal.error = 1 / 0, t.traversal.distanceFromCamera = 1 / 0, t.traversal.allChildrenReady = !1, e.calculateTileViewErrorWithPlugin(t, L), t.traversal.inFrustum = L.inView, t.traversal.error = L.error, t.traversal.distanceFromCamera = L.distanceFromCamera);
}
function B3DMLoaderBase_p2hcBFT_O(t, e, s = !1) {
  if (e.ensureChildrenArePreprocessed(t), B3DMLoaderBase_p2hcBFT_Q(t, e), x(t, e, s), B3DMLoaderBase_p2hcBFT_q(t) && $(t)) {
    const n = t.children;
    for (let r = 0, a = n.length; r < a; r++)
      B3DMLoaderBase_p2hcBFT_O(n[r], e, s);
  }
}
function te(t, e) {
  if (e.ensureChildrenArePreprocessed(t), b(t, e.frameCount) && (t.internal.hasContent && e.queueTileForDownload(t), $(t))) {
    const s = t.children;
    for (let n = 0, r = s.length; n < r; n++)
      te(s[n], e);
  }
}
function x(t, e, s = !1) {
  t.traversal.used || (s || (t.traversal.used = !0, e.stats.used++), e.markTileUsed(t), t.traversal.inFrustum === !0 && e.stats.inFrustum++);
}
function ge(t, e) {
  return !(t.traversal.error <= e.errorTarget && !B3DMLoaderBase_p2hcBFT_q(t) || e.maxDepth > 0 && t.internal.depth + 1 >= e.maxDepth || !$(t));
}
function se(t, e) {
  if (e.ensureChildrenArePreprocessed(t), B3DMLoaderBase_p2hcBFT_Q(t, e), !t.traversal.inFrustum)
    return;
  if (!ge(t, e)) {
    x(t, e);
    return;
  }
  let s = !1, n = !1;
  const r = t.children;
  for (let a = 0, i = r.length; a < i; a++) {
    const l = r[a];
    se(l, e), s = s || b(l, e.frameCount), n = n || l.traversal.inFrustum;
  }
  if (t.refine === "REPLACE" && !n && r.length !== 0) {
    t.traversal.inFrustum = !1;
    for (let a = 0, i = r.length; a < i; a++)
      B3DMLoaderBase_p2hcBFT_O(r[a], e, !0);
    return;
  }
  if (x(t, e), t.refine === "REPLACE" && (s && t.internal.depth !== 0 || Z))
    for (let a = 0, i = r.length; a < i; a++)
      B3DMLoaderBase_p2hcBFT_O(r[a], e);
}
function re(t, e) {
  const s = e.frameCount;
  if (!b(t, s))
    return;
  const n = t.children;
  let r = !1;
  for (let a = 0, i = n.length; a < i; a++) {
    const l = n[a];
    r = r || b(l, s);
  }
  if (!r)
    t.traversal.isLeaf = !0;
  else {
    let a = !0;
    for (let i = 0, l = n.length; i < l; i++) {
      const o = n[i];
      if (re(o, e), b(o, s)) {
        const c = !B3DMLoaderBase_p2hcBFT_q(o);
        let u = !o.internal.hasContent || o.internal.hasRenderableContent && ee(o.internal.loadingState) || o.internal.hasUnrenderableContent && o.internal.loadingState === N;
        u = c && u || o.traversal.allChildrenReady, a = a && u;
      }
    }
    t.traversal.allChildrenReady = a;
  }
}
function ne(t, e) {
  const s = e.stats;
  if (!b(t, e.frameCount))
    return;
  if (t.traversal.isLeaf) {
    t.internal.loadingState === H ? (t.traversal.inFrustum && (t.traversal.visible = !0, s.visible++), t.traversal.active = !0, s.active++) : t.internal.hasContent && e.queueTileForDownload(t);
    return;
  }
  const n = t.children, r = t.internal.hasContent, a = ee(t.internal.loadingState) && r, i = (e.errorTarget + 1) * e.errorThreshold, l = t.traversal.error <= i, o = t.refine === "ADD", c = t.traversal.allChildrenReady || t.internal.depth === 0 && !Z;
  if (r && (l || o) && e.queueTileForDownload(t), (l && a && !c || a && o) && (t.traversal.inFrustum && (t.traversal.visible = !0, s.visible++), t.traversal.active = !0, s.active++), !o && l && !c)
    for (let u = 0, v = n.length; u < v; u++) {
      const h = n[u];
      b(h, e.frameCount) && te(h, e);
    }
  else
    for (let u = 0, v = n.length; u < v; u++)
      ne(n[u], e);
}
function ae(t, e) {
  const s = b(t, e.frameCount);
  if (s || _(t) && t.traversal.usedLastFrame) {
    let n = !1, r = !1;
    s ? (n = t.traversal.active, e.displayActiveTiles ? r = t.traversal.active || t.traversal.visible : r = t.traversal.visible) : B3DMLoaderBase_p2hcBFT_Q(t, e), t.internal.hasRenderableContent && t.internal.loadingState === H && (t.traversal.wasSetActive !== n && e.invokeOnePlugin((i) => i.setTileActive && i.setTileActive(t, n)), t.traversal.wasSetVisible !== r && e.invokeOnePlugin((i) => i.setTileVisible && i.setTileVisible(t, r))), t.traversal.wasSetActive = n, t.traversal.wasSetVisible = r, t.traversal.usedLastFrame = s;
    const a = t.children;
    for (let i = 0, l = a.length; i < l; i++) {
      const o = a[i];
      ae(o, e);
    }
  }
}
function Te(t, e) {
  se(t, e), re(t, e), ne(t, e), ae(t, e);
}
function ye(t) {
  let e = null;
  return () => {
    e === null && (e = S.requestAnimationFrame(() => {
      e = null, t();
    }));
  };
}
const B3DMLoaderBase_p2hcBFT_z = Symbol("PLUGIN_REGISTERED"), C = {
  inView: !0,
  error: 0,
  distance: 1 / 0
}, B = (t, e) => {
  const s = t.priority || 0, n = e.priority || 0;
  return s !== n ? s > n ? 1 : -1 : !t.traversal || !e.traversal ? 0 : t.traversal.used !== e.traversal.used ? t.traversal.used ? 1 : -1 : t.traversal.error !== e.traversal.error ? t.traversal.error > e.traversal.error ? 1 : -1 : t.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? t.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : t.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? t.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0;
}, Ce = (t, e) => t.traversal.used !== e.traversal.used ? t.traversal.used ? 1 : -1 : t.traversal.inFrustum !== e.traversal.inFrustum ? t.traversal.inFrustum ? 1 : -1 : t.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? t.internal.hasUnrenderableContent ? 1 : -1 : t.traversal.distanceFromCamera !== e.traversal.distanceFromCamera ? t.traversal.distanceFromCamera > e.traversal.distanceFromCamera ? -1 : 1 : t.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? t.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? -1 : 1 : 0, be = (t, e) => t.traversal.lastFrameVisited !== e.traversal.lastFrameVisited ? t.traversal.lastFrameVisited > e.traversal.lastFrameVisited ? -1 : 1 : t.internal.depthFromRenderedParent !== e.internal.depthFromRenderedParent ? t.internal.depthFromRenderedParent > e.internal.depthFromRenderedParent ? 1 : -1 : t.internal.loadingState !== e.internal.loadingState ? t.internal.loadingState > e.internal.loadingState ? -1 : 1 : t.internal.hasUnrenderableContent !== e.internal.hasUnrenderableContent ? t.internal.hasUnrenderableContent ? -1 : 1 : t.traversal.error !== e.traversal.error ? t.traversal.error > e.traversal.error ? -1 : 1 : 0, B3DMLoaderBase_p2hcBFT_G = (t, e) => {
  const s = t.priority ?? 1 / 0, n = e.priority ?? 1 / 0;
  if (s !== n)
    return s > n ? 1 : -1;
  if (!t.internal || !e.internal)
    return 0;
  const r = t.internal.renderer, a = e.internal.renderer, i = r.optimizedLoadStrategy && !r.loadAncestors, l = a.optimizedLoadStrategy && !a.loadAncestors;
  return i && l ? Ce(t, e) : B(t, e);
};
class Re {
  /**
   * Root tile of the loaded root tileset, or null if not yet loaded.
   * @type {Tile|null}
   * @readonly
   */
  get root() {
    const e = this.rootTileset;
    return e ? e.root : null;
  }
  get rootTileSet() {
    return console.warn('TilesRenderer: "rootTileSet" has been deprecated. Use "rootTileset" instead.'), this.rootTileset;
  }
  /**
   * Fraction of tiles loaded since the last idle state, from 0 (nothing loaded) to 1 (all loaded).
   * @type {number}
   * @readonly
   */
  get loadProgress() {
    const { stats: e, isLoading: s } = this, n = e.queued + e.downloading + e.parsing, r = e.inCacheSinceLoad + (s ? 1 : 0);
    return r === 0 ? 1 : 1 - n / r;
  }
  get errorThreshold() {
    return this._errorThreshold;
  }
  set errorThreshold(e) {
    console.warn('TilesRenderer: The "errorThreshold" option has been deprecated.'), this._errorThreshold = e;
  }
  /**
   * Enables an optimized tile loading strategy that loads only the tiles
   * needed for the current view, reducing memory usage and improving initial load times.
   * Tiles are loaded independently based on screen-space error without requiring all parent
   * tiles to load first. Prevents visual gaps and flashing during camera movement.
   *
   * Based in part on {@link https://cesium.com/learn/cesium-native/ref-doc/selection-algorithm-details.html Cesium Native tile selection}.
   *
   * @warn This option has been deprecated and will be removed in upcoming releases. The "optimized
   * load strategy" will be the only option with "loadSiblings" and "loadAncestors" as toggles.
   * @type {boolean}
   * @default true
   */
  get optimizedLoadStrategy() {
    return this._optimizedLoadStrategy;
  }
  set optimizedLoadStrategy(e) {
    console.warn('TilesRenderer: "optimizedLoadStrategy" has been deprecated. Please toggle "loadAncestors" to adjust the tile load behavior.'), this._optimizedLoadStrategy = e;
  }
  /**
   * @param {string} [url] - URL of the root tileset JSON to load.
   */
  constructor(e = null) {
    this.rootLoadingState = j, this.rootTileset = null, this.rootURL = e, this.fetchOptions = {}, this.plugins = [], this.queuedTiles = [], this.cachedSinceLoadComplete = /* @__PURE__ */ new Set(), this.isLoading = !1;
    const s = new T();
    s.unloadPriorityCallback = be;
    const n = new G();
    n.maxJobs = 25, n.priorityCallback = B;
    const r = new G();
    r.maxJobs = 5, r.priorityCallback = B;
    const a = new G();
    a.maxJobs = 25, a.priorityCallback = (i, l) => {
      const o = i.parent, c = l.parent;
      return o === c ? 0 : o ? c ? n.priorityCallback(o, c) : -1 : 1;
    }, this.processedTiles = /* @__PURE__ */ new WeakSet(), this.visibleTiles = /* @__PURE__ */ new Set(), this.activeTiles = /* @__PURE__ */ new Set(), this.usedSet = /* @__PURE__ */ new Set(), this.loadingTiles = /* @__PURE__ */ new Set(), this.lruCache = s, this.downloadQueue = n, this.downloadQueue.priorityCallback = B3DMLoaderBase_p2hcBFT_G, this.parseQueue = r, this.parseQueue.priorityCallback = B3DMLoaderBase_p2hcBFT_G, this.processNodeQueue = a, this.stats = {
      inCacheSinceLoad: 0,
      inCache: 0,
      queued: 0,
      downloading: 0,
      parsing: 0,
      loaded: 0,
      failed: 0,
      inFrustum: 0,
      used: 0,
      active: 0,
      visible: 0,
      tilesProcessed: 0
    }, this.frameCount = 0, this._dispatchNeedsUpdateEvent = ye(() => {
      this.dispatchEvent({ type: "needs-update" });
    }), this.errorTarget = 16, this._errorThreshold = 1 / 0, this.displayActiveTiles = !1, this.maxDepth = 1 / 0, this._optimizedLoadStrategy = !0, this.loadSiblings = !0, this.loadAncestors = !0, this.maxTilesProcessed = 250;
  }
  // Plugins
  /**
   * Registers a plugin with this renderer. Plugins are inserted in priority order and
   * receive lifecycle callbacks throughout the tile loading and rendering process.
   * A plugin instance may only be registered to one renderer at a time.
   * @param {Object} plugin
   */
  registerPlugin(e) {
    if (e[B3DMLoaderBase_p2hcBFT_z] === !0)
      throw new Error("TilesRendererBase: A plugin can only be registered to a single tileset");
    e.loadRootTileSet && !e.loadRootTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "loadRootTileSet" method. Please rename to "loadRootTileset".'), e.loadRootTileset = e.loadRootTileSet), e.preprocessTileSet && !e.preprocessTileset && (console.warn('TilesRendererBase: Plugin implements deprecated "preprocessTileSet" method. Please rename to "preprocessTileset".'), e.preprocessTileset = e.preprocessTileSet);
    const s = this.plugins, n = e.priority || 0;
    let r = s.length;
    for (let a = 0; a < s.length; a++)
      if ((s[a].priority || 0) > n) {
        r = a;
        break;
      }
    s.splice(r, 0, e), e[B3DMLoaderBase_p2hcBFT_z] = !0, e.init && e.init(this);
  }
  /**
   * Removes a registered plugin. Calls `plugin.dispose()` if defined.
   * Accepts either the plugin instance or its string name.
   * Returns true if the plugin was found and removed.
   * @param {Object|string} plugin
   * @returns {boolean}
   */
  unregisterPlugin(e) {
    const s = this.plugins;
    if (typeof e == "string" && (e = this.getPluginByName(e)), s.includes(e)) {
      const n = s.indexOf(e);
      return s.splice(n, 1), e.dispose && e.dispose(), !0;
    }
    return !1;
  }
  /**
   * Returns the first registered plugin whose `name` property matches, or null.
   * @param {string} name
   * @returns {Object|null}
   */
  getPluginByName(e) {
    return this.plugins.find((s) => s.name === e) || null;
  }
  invokeOnePlugin(e) {
    const s = [...this.plugins, this];
    for (let n = 0; n < s.length; n++) {
      const r = e(s[n]);
      if (r)
        return r;
    }
    return null;
  }
  invokeAllPlugins(e) {
    const s = [...this.plugins, this], n = [];
    for (let r = 0; r < s.length; r++) {
      const a = e(s[r]);
      a && n.push(a);
    }
    return n.length === 0 ? null : Promise.all(n);
  }
  // Public API
  /**
   * Iterates over all tiles in the loaded hierarchy. `beforecb` is called before
   * descending into a tile's children; returning true from it skips the subtree.
   * `aftercb` is called after all children have been visited.
   * @param {TileBeforeCallback|null} [beforecb]
   * @param {TileAfterCallback|null} [aftercb]
   */
  traverse(e, s, n = !0) {
    this.root && h(this.root, (r, ...a) => (n && this.ensureChildrenArePreprocessed(r, !0), e ? e(r, ...a) : !1), s);
  }
  /**
   * Collects attribution data from all registered plugins into `target` and returns it.
   * @param {Array<{type: string, value: any}>} [target]
   * @returns {Array<{type: string, value: any}>}
   */
  getAttributions(e = []) {
    return this.invokeAllPlugins((s) => s !== this && s.getAttributions && s.getAttributions(e)), e;
  }
  /**
   * Runs the tile traversal and update loop. Should be called once per frame after
   * camera matrices have been updated. Triggers tile loading, visibility updates,
   * and LRU cache eviction.
   */
  update() {
    const { lruCache: e, usedSet: s, stats: n, root: r, downloadQueue: a, parseQueue: i, processNodeQueue: l, optimizedLoadStrategy: o } = this;
    if (this.rootLoadingState === j && (this.rootLoadingState = q, this.invokeOnePlugin((h) => h.loadRootTileset && h.loadRootTileset()).then((h) => {
      let f = this.rootURL;
      f !== null && this.invokeAllPlugins((d) => f = d.preprocessURL ? d.preprocessURL(f, null) : f), this.rootLoadingState = H, this.rootTileset = h, this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({ type: "load-content" }), this.dispatchEvent({
        type: "load-tileset",
        tileset: h,
        url: f
      }), this.dispatchEvent({
        type: "load-root-tileset",
        tileset: h,
        url: f
      });
    }).catch((h) => {
      this.rootLoadingState = N, console.error(h), this.rootTileset = null, this.dispatchEvent({
        type: "load-error",
        tile: null,
        error: h,
        url: this.rootURL
      });
    })), !r)
      return;
    let c = null;
    if (this.invokeAllPlugins((h) => {
      if (h.doTilesNeedUpdate) {
        const f = h.doTilesNeedUpdate();
        c === null ? c = f : c = !!(c || f);
      }
    }), c === !1) {
      this.dispatchEvent({ type: "update-before" }), this.dispatchEvent({ type: "update-after" });
      return;
    }
    this.dispatchEvent({ type: "update-before" }), n.inFrustum = 0, n.used = 0, n.active = 0, n.visible = 0, n.tilesProcessed = 0, this.frameCount++, s.forEach((h) => e.markUnused(h)), s.clear(), this.prepareForTraversal(), o ? me(r, this) : Te(r, this), this.removeUnusedPendingTiles();
    const u = this.queuedTiles;
    u.sort(e.unloadPriorityCallback);
    for (let h = 0, f = u.length; h < f && !e.isFull(); h++)
      this.requestTileContents(u[h]);
    u.length = 0, e.scheduleUnload(), (a.running || i.running || l.running) === !1 && this.isLoading === !0 && (this.cachedSinceLoadComplete.clear(), n.inCacheSinceLoad = 0, this.dispatchEvent({ type: "tiles-load-end" }), this.isLoading = !1), this.dispatchEvent({ type: "update-after" });
  }
  /**
   * Resets any tiles that previously failed to load so they will be retried on the next `update`.
   */
  resetFailedTiles() {
    this.rootLoadingState === N && (this.rootLoadingState = j);
    const e = this.stats;
    e.failed !== 0 && (this.traverse((s) => {
      s.internal.loadingState === N && (s.internal.loadingState = j);
    }, null, !1), e.failed = 0);
  }
  calculateTileViewErrorWithPlugin(e, s) {
    this.calculateTileViewError(e, s);
    let n = null, r = 0, a = 1 / 0;
    this.invokeAllPlugins((i) => {
      i !== this && i.calculateTileViewError && (C.inView = !0, C.error = 0, C.distance = 1 / 0, i.calculateTileViewError(e, C) && (n === null && (n = !0), n = n && C.inView, C.inView && (a = Math.min(a, C.distance), r = Math.max(r, C.error))));
    }), s.inView && n !== !1 ? (s.error = Math.max(s.error, r), s.distanceFromCamera = Math.min(s.distanceFromCamera, a)) : n ? (s.inView = !0, s.error = r, s.distanceFromCamera = a) : s.inView = !1;
  }
  /**
   * Disposes all loaded tiles and unregisters all plugins. The renderer should not
   * be used after calling this.
   */
  dispose() {
    [...this.plugins].forEach((r) => {
      this.unregisterPlugin(r);
    });
    const s = this.lruCache, n = [];
    this.traverse((r) => (n.push(r), !1), null, !1);
    for (let r = 0, a = n.length; r < a; r++)
      s.remove(n[r]);
    this.stats = {
      queued: 0,
      parsing: 0,
      downloading: 0,
      failed: 0,
      inFrustum: 0,
      traversed: 0,
      used: 0,
      active: 0,
      visible: 0
    }, this.frameCount = 0, this.loadingTiles.clear();
  }
  // Overrideable
  calculateBytesUsed(e, s) {
    return 0;
  }
  /**
   * Dispatches an event to all registered listeners for the given event type.
   * @param {{ type: string }} e
   */
  dispatchEvent(e) {
  }
  /**
   * Registers a listener for the given event type.
   * @param {string} name
   * @param {EventCallback} callback
   */
  addEventListener(e, s) {
  }
  /**
   * Removes a previously registered event listener.
   * @param {string} name
   * @param {EventCallback} callback
   */
  removeEventListener(e, s) {
  }
  parseTile(e, s, n) {
    return null;
  }
  prepareForTraversal() {
  }
  disposeTile(e) {
    e.traversal.visible && (this.invokeOnePlugin((n) => n.setTileVisible && n.setTileVisible(e, !1)), e.traversal.visible = !1), e.traversal.active && (this.invokeOnePlugin((n) => n.setTileActive && n.setTileActive(e, !1)), e.traversal.active = !1);
    const { scene: s } = e.engineData;
    s && this.dispatchEvent({
      type: "dispose-model",
      scene: s,
      tile: e
    });
  }
  preprocessNode(e, s, n = null) {
    var r;
    if (this.processedTiles.add(e), this.stats.tilesProcessed++, e.content && (!("uri" in e.content) && "url" in e.content && (e.content.uri = e.content.url, delete e.content.url), e.content.boundingVolume && !("box" in e.content.boundingVolume || "sphere" in e.content.boundingVolume || "region" in e.content.boundingVolume) && delete e.content.boundingVolume), e.parent = n, e.children = e.children || [], e.internal = {
      hasContent: !1,
      hasRenderableContent: !1,
      hasUnrenderableContent: !1,
      loadingState: j,
      basePath: s,
      depth: -1,
      depthFromRenderedParent: -1,
      isVirtual: !1,
      virtualChildCount: 0,
      renderer: this,
      // preserve any pre-seeded fields
      ...e.internal
    }, (r = e.content) != null && r.uri) {
      const a = B3DMLoaderBase_p2hcBFT_M(e.content.uri), i = !!(a && /json$/.test(a));
      e.internal.hasContent = !0, e.internal.hasUnrenderableContent = i, e.internal.hasRenderableContent = !i;
    } else
      e.internal.hasContent = !1, e.internal.hasUnrenderableContent = !1, e.internal.hasRenderableContent = !1;
    n ? (e.internal.depth = n.internal.depth + 1, e.internal.depthFromRenderedParent = n.internal.depthFromRenderedParent + (e.internal.hasRenderableContent ? 1 : 0)) : (e.internal.depth = 0, e.internal.depthFromRenderedParent = e.internal.hasRenderableContent ? 1 : 0), e.traversal = {
      distanceFromCamera: 1 / 0,
      error: 1 / 0,
      inFrustum: !1,
      isLeaf: !1,
      used: !1,
      usedLastFrame: !1,
      visible: !1,
      wasSetVisible: !1,
      active: !1,
      wasSetActive: !1,
      allChildrenReady: !1,
      allChildrenLoaded: !1,
      kicked: !1,
      allUsedChildrenProcessed: !1,
      lastFrameVisited: -1
    }, n === null ? e.refine = e.refine || "REPLACE" : e.refine = e.refine || n.refine, e.engineData = {
      scene: null,
      metadata: null,
      boundingVolume: null
    }, Object.defineProperty(e, "cached", {
      get() {
        return console.warn('TilesRenderer: "tile.cached" field has been renamed to "tile.engineData".'), this.engineData;
      },
      enumerable: !1,
      configurable: !0
    }), this.invokeAllPlugins((a) => {
      a !== this && a.preprocessNode && a.preprocessNode(e, s, n);
    });
  }
  setTileActive(e, s) {
    s ? this.activeTiles.add(e) : this.activeTiles.delete(e);
  }
  setTileVisible(e, s) {
    s ? this.visibleTiles.add(e) : this.visibleTiles.delete(e), this.dispatchEvent({
      type: "tile-visibility-change",
      scene: e.engineData.scene,
      tile: e,
      visible: s
    });
  }
  calculateTileViewError(e, s) {
  }
  removeUnusedPendingTiles() {
    const { lruCache: e, loadingTiles: s } = this, n = [];
    for (const r of s)
      !e.isUsed(r) && r.internal.loadingState === Q && n.push(r);
    for (let r = 0; r < n.length; r++)
      e.remove(n[r]);
  }
  // Private Functions
  queueTileForDownload(e) {
    e.internal.loadingState !== j || this.lruCache.isFull() || this.queuedTiles.push(e);
  }
  markTileUsed(e) {
    this.usedSet.add(e), this.lruCache.markUsed(e);
  }
  fetchData(e, s) {
    return fetch(e, s);
  }
  ensureChildrenArePreprocessed(e, s = this.stats.tilesProcessed < this.maxTilesProcessed) {
    const n = e.children;
    if (n.length === 0 || n[n.length - 1].traversal)
      return;
    const r = (a) => {
      for (let i = 0, l = a.length; i < l; i++) {
        const o = a[i];
        o && !o.traversal && this.preprocessNode(o, e.internal.basePath, e);
      }
    };
    s ? (this.processNodeQueue.remove(e), r(n)) : this.processNodeQueue.has(e) || this.processNodeQueue.add(e, (a) => {
      r(a.children), this._dispatchNeedsUpdateEvent();
    });
  }
  // returns the total bytes used for by the given tile as reported by all plugins
  getBytesUsed(e) {
    let s = 0;
    return this.invokeAllPlugins((n) => {
      n.calculateBytesUsed && (s += n.calculateBytesUsed(e, e.engineData.scene) || 0);
    }), s;
  }
  // force a recalculation of the tile or all tiles if no tile is provided
  recalculateBytesUsed(e = null) {
    const { lruCache: s, processedTiles: n } = this;
    e === null ? s.itemSet.forEach((r) => {
      n.has(r) && s.setMemoryUsage(r, this.getBytesUsed(r));
    }) : s.setMemoryUsage(e, this.getBytesUsed(e));
  }
  preprocessTileset(e, s, n = null) {
    const r = Object.getPrototypeOf(this);
    Object.hasOwn(r, "preprocessTileSet") && console.warn(`${r.constructor.name}: Class overrides deprecated "preprocessTileSet" method. Please rename to "preprocessTileset".`);
    const a = e.asset.version, [i, l] = a.split(".").map((c) => parseInt(c));
    console.assert(
      i <= 1,
      "TilesRenderer: asset.version is expected to be a 1.x or a compatible version."
    ), i === 1 && l > 0 && console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");
    let o = s.replace(/\/[^/]*$/, "");
    o = new URL(o, window.location.href).toString(), this.preprocessNode(e.root, o, n);
  }
  preprocessTileSet(...e) {
    return console.warn('TilesRenderer: "preprocessTileSet" has been deprecated. Use "preprocessTileset" instead.'), this.preprocessTileset(...e);
  }
  loadRootTileset() {
    const e = Object.getPrototypeOf(this);
    Object.hasOwn(e, "loadRootTileSet") && console.warn(`${e.constructor.name}: Class overrides deprecated "loadRootTileSet" method. Please rename to "loadRootTileset".`);
    let s = this.rootURL;
    return this.invokeAllPlugins((r) => s = r.preprocessURL ? r.preprocessURL(s, null) : s), this.invokeOnePlugin((r) => r.fetchData && r.fetchData(s, this.fetchOptions)).then((r) => {
      if (r instanceof Response) {
        if (r.ok)
          return r.json();
        throw new Error(`TilesRenderer: Failed to load tileset "${s}" with status ${r.status} : ${r.statusText}`);
      } else return r;
    }).then((r) => (this.preprocessTileset(r, s), r));
  }
  loadRootTileSet(...e) {
    return console.warn('TilesRenderer: "loadRootTileSet" has been deprecated. Use "loadRootTileset" instead.'), this.loadRootTileSet(...e);
  }
  requestTileContents(e) {
    if (e.internal.loadingState !== j)
      return;
    let s = !1, n = null, r = new URL(e.content.uri, e.internal.basePath + "/").toString();
    this.invokeAllPlugins((d) => r = d.preprocessURL ? d.preprocessURL(r, e) : r);
    const a = this.stats, i = this.lruCache, l = this.downloadQueue, o = this.parseQueue, c = this.loadingTiles, u = B3DMLoaderBase_p2hcBFT_M(r), v = new AbortController(), h = v.signal;
    if (i.add(e, (d) => {
      v.abort(), s ? d.children.length = 0 : this.invokeAllPlugins((m) => {
        m.disposeTile && m.disposeTile(d);
      }), a.inCache--, this.cachedSinceLoadComplete.has(e) && (this.cachedSinceLoadComplete.delete(e), a.inCacheSinceLoad--), d.internal.loadingState === Q ? a.queued-- : d.internal.loadingState === q ? a.downloading-- : d.internal.loadingState === O ? a.parsing-- : d.internal.loadingState === H && a.loaded--, d.internal.loadingState = j, o.remove(d), l.remove(d), c.delete(d);
    }))
      return this.isLoading || (this.isLoading = !0, this.dispatchEvent({ type: "tiles-load-start" })), i.setMemoryUsage(e, this.getBytesUsed(e)), this.cachedSinceLoadComplete.add(e), a.inCacheSinceLoad++, a.inCache++, a.queued++, e.internal.loadingState = Q, c.add(e), l.add(e, (d) => {
        if (h.aborted)
          return Promise.resolve();
        e.internal.loadingState = q, a.downloading++, a.queued--;
        const m = this.invokeOnePlugin((T) => T.fetchData && T.fetchData(r, { ...this.fetchOptions, signal: h }));
        return this.dispatchEvent({
          type: "tile-download-start",
          tile: e,
          url: r,
          get uri() {
            return console.warn('tile-download-start event: "uri" has been renamed to "url".'), this.url;
          }
        }), m;
      }).then((d) => {
        if (!h.aborted)
          if (d instanceof Response) {
            if (d.ok)
              return u === "json" ? d.json() : d.arrayBuffer();
            throw new Error(`Failed to load model with error code ${d.status}`);
          } else return d;
      }).then((d) => {
        if (!h.aborted)
          return a.downloading--, a.parsing++, e.internal.loadingState = O, o.add(e, (m) => h.aborted ? Promise.resolve() : u === "json" && d.root ? (this.preprocessTileset(d, r, e), e.children.push(d.root), n = d, s = !0, Promise.resolve()) : this.invokeOnePlugin((T) => T.parseTile && T.parseTile(d, m, u, r, h)));
      }).then(() => {
        if (h.aborted)
          return;
        a.parsing--, a.loaded++, e.internal.loadingState = H, c.delete(e), i.setLoaded(e, !0);
        const d = this.getBytesUsed(e);
        if (i.getMemoryUsage(e) === 0 && d > 0 && i.isFull()) {
          i.remove(e);
          return;
        }
        i.setMemoryUsage(e, d), this.dispatchEvent({ type: "needs-update" }), this.dispatchEvent({ type: "load-content" }), s && this.dispatchEvent({
          type: "load-tileset",
          tileset: n,
          url: r
        }), e.engineData.scene && this.dispatchEvent({
          type: "load-model",
          scene: e.engineData.scene,
          tile: e,
          url: r
        });
      }).catch((d) => {
        h.aborted || (d.name !== "AbortError" ? (o.remove(e), l.remove(e), e.internal.loadingState === Q ? a.queued-- : e.internal.loadingState === q ? a.downloading-- : e.internal.loadingState === O ? a.parsing-- : e.internal.loadingState === H && a.loaded--, a.failed++, console.error(`TilesRenderer : Failed to load tile at url "${e.content.uri}".`), console.error(d), e.internal.loadingState = N, c.delete(e), i.setLoaded(e, !0), this.dispatchEvent({
          type: "load-error",
          tile: e,
          error: d,
          url: r
        })) : i.remove(e));
      });
  }
}
function ie(t, e, s, n, r, a) {
  let i;
  switch (n) {
    case "SCALAR":
      i = 1;
      break;
    case "VEC2":
      i = 2;
      break;
    case "VEC3":
      i = 3;
      break;
    case "VEC4":
      i = 4;
      break;
    default:
      throw new Error(`FeatureTable : Feature type not provided for "${a}".`);
  }
  let l;
  const o = s * i;
  switch (r) {
    case "BYTE":
      l = new Int8Array(t, e, o);
      break;
    case "UNSIGNED_BYTE":
      l = new Uint8Array(t, e, o);
      break;
    case "SHORT":
      l = new Int16Array(t, e, o);
      break;
    case "UNSIGNED_SHORT":
      l = new Uint16Array(t, e, o);
      break;
    case "INT":
      l = new Int32Array(t, e, o);
      break;
    case "UNSIGNED_INT":
      l = new Uint32Array(t, e, o);
      break;
    case "FLOAT":
      l = new Float32Array(t, e, o);
      break;
    case "DOUBLE":
      l = new Float64Array(t, e, o);
      break;
    default:
      throw new Error(`FeatureTable : Feature component type not provided for "${a}".`);
  }
  return l;
}
class oe {
  /**
   * @param {ArrayBuffer} buffer
   * @param {number} start - Byte offset of the feature table within the buffer
   * @param {number} headerLength - Byte length of the JSON header
   * @param {number} binLength - Byte length of the binary body
   */
  constructor(e, s, n, r) {
    this.buffer = e, this.binOffset = s + n, this.binLength = r;
    let a = null;
    if (n !== 0) {
      const i = new Uint8Array(e, s, n);
      a = JSON.parse(f(i));
    } else
      a = {};
    this.header = a;
  }
  /**
   * Returns all property key names defined in the feature table header, excluding `extensions`.
   * @returns {Array<string>}
   */
  getKeys() {
    return Object.keys(this.header).filter((e) => e !== "extensions");
  }
  /**
   * Returns the value for the given property key. For binary properties, reads typed array data
   * from the binary body using the provided count, component type, and vector type.
   * @param {string} key
   * @param {number} count - Number of elements to read for binary properties
   * @param {string | null} [defaultComponentType] - Fallback component type (e.g. `'FLOAT'`, `'UNSIGNED_SHORT'`)
   * @param {string | null} [defaultType] - Fallback vector type (e.g. `'SCALAR'`, `'VEC3'`)
   * @returns {number | string | ArrayBufferView | null}
   */
  getData(e, s, n = null, r = null) {
    const a = this.header;
    if (!(e in a))
      return null;
    const i = a[e];
    if (i instanceof Object) {
      if (Array.isArray(i))
        return i;
      {
        const { buffer: l, binOffset: o, binLength: c } = this, u = i.byteOffset || 0, v = i.type || r, h = i.componentType || n;
        if ("type" in i && r && i.type !== r)
          throw new Error("FeatureTable: Specified type does not match expected type.");
        const f = o + u, d = ie(l, f, s, v, h, e);
        if (f + d.byteLength > o + c)
          throw new Error("FeatureTable: Feature data read outside binary body length.");
        return d;
      }
    } else return i;
  }
  /**
   * Returns a slice of the binary body at the given offset and length.
   * @param {number} byteOffset
   * @param {number} byteLength
   * @returns {ArrayBuffer}
   */
  getBuffer(e, s) {
    const { buffer: n, binOffset: r } = this;
    return n.slice(r + e, r + e + s);
  }
}
class Se {
  constructor(e) {
    this.batchTable = e;
    const s = e.header.extensions["3DTILES_batch_table_hierarchy"];
    this.classes = s.classes;
    for (const r of this.classes) {
      const a = r.instances;
      for (const i in a)
        r.instances[i] = this._parseProperty(a[i], r.length, i);
    }
    if (this.instancesLength = s.instancesLength, this.classIds = this._parseProperty(s.classIds, this.instancesLength, "classIds"), s.parentCounts ? this.parentCounts = this._parseProperty(s.parentCounts, this.instancesLength, "parentCounts") : this.parentCounts = new Array(this.instancesLength).fill(1), s.parentIds) {
      const r = this.parentCounts.reduce((a, i) => a + i, 0);
      this.parentIds = this._parseProperty(s.parentIds, r, "parentIds");
    } else
      this.parentIds = null;
    this.instancesIds = [];
    const n = {};
    for (const r of this.classIds)
      n[r] = n[r] ?? 0, this.instancesIds.push(n[r]), n[r]++;
  }
  _parseProperty(e, s, n) {
    if (Array.isArray(e))
      return e;
    {
      const { buffer: r, binOffset: a } = this.batchTable, i = e.byteOffset, l = e.componentType || "UNSIGNED_SHORT", o = a + i;
      return ie(r, o, s, "SCALAR", l, n);
    }
  }
  getDataFromId(e, s = {}) {
    const n = this.parentCounts[e];
    if (this.parentIds && n > 0) {
      let o = 0;
      for (let c = 0; c < e; c++)
        o += this.parentCounts[c];
      for (let c = 0; c < n; c++) {
        const u = this.parentIds[o + c];
        u !== e && this.getDataFromId(u, s);
      }
    }
    const r = this.classIds[e], a = this.classes[r].instances, i = this.classes[r].name, l = this.instancesIds[e];
    for (const o in a)
      s[i] = s[i] || {}, s[i][o] = a[o][l];
    return s;
  }
}
class we extends oe {
  get batchSize() {
    return console.warn("BatchTable.batchSize has been deprecated and replaced with BatchTable.count."), this.count;
  }
  /**
   * @param {ArrayBuffer} buffer
   * @param {number} count - Number of features in the batch
   * @param {number} start - Byte offset of the batch table within the buffer
   * @param {number} headerLength - Byte length of the JSON header
   * @param {number} binLength - Byte length of the binary body
   */
  constructor(e, s, n, r, a) {
    super(e, n, r, a), this.count = s, this.extensions = {};
    const i = this.header.extensions;
    i && i["3DTILES_batch_table_hierarchy"] && (this.extensions["3DTILES_batch_table_hierarchy"] = new Se(this));
  }
  /**
   * @deprecated Use `getDataFromId` or `getPropertyArray` instead.
   * @param {string} key
   * @param {string | null} [componentType]
   * @param {string | null} [type]
   * @returns {number | string | ArrayBufferView | null}
   */
  getData(e, s = null, n = null) {
    return console.warn("BatchTable: BatchTable.getData is deprecated. Use BatchTable.getDataFromId to get allproperties for an id or BatchTable.getPropertyArray for getting an array of value for a property."), super.getData(e, this.count, s, n);
  }
  /**
   * Returns an object with all properties of the batch table and its extensions for the
   * given feature id. A `target` object can be specified to store the result. Throws if
   * `id` is out of bounds.
   * @param {number} id - Feature index (0 to count - 1)
   * @param {Object} [target={}] - Optional object to write properties into
   * @returns {Object}
   */
  getDataFromId(e, s = {}) {
    if (e < 0 || e >= this.count)
      throw new Error(`BatchTable: id value "${e}" out of bounds for "${this.count}" features number.`);
    for (const n of this.getKeys())
      s[n] = super.getData(n, this.count)[e];
    for (const n in this.extensions) {
      const r = this.extensions[n];
      r.getDataFromId instanceof Function && (s[n] = s[n] || {}, r.getDataFromId(e, s[n]));
    }
    return s;
  }
  /**
   * Returns the array of values for the given property key across all features. Returns
   * `null` if the key is not in the table.
   * @param {string} key
   * @returns {Array | TypedArray | null}
   */
  getPropertyArray(e) {
    return super.getData(e, this.count);
  }
}
class Ue extends y {
  /**
   * Parses a B3DM buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {{ version: string, featureTable: FeatureTable, batchTable: BatchTable, glbBytes: Uint8Array }}
   */
  parse(e) {
    const s = new DataView(e), n = LoaderBase_ATuDWTDB_d(s);
    console.assert(n === "b3dm");
    const r = s.getUint32(4, !0);
    console.assert(r === 1);
    const a = s.getUint32(8, !0);
    console.assert(a === e.byteLength);
    const i = s.getUint32(12, !0), l = s.getUint32(16, !0), o = s.getUint32(20, !0), c = s.getUint32(24, !0), u = 28, v = e.slice(
      u,
      u + i + l
    ), h = new oe(
      v,
      0,
      i,
      l
    ), f = u + i + l, d = e.slice(
      f,
      f + o + c
    ), m = new we(
      d,
      h.getData("BATCH_LENGTH"),
      0,
      o,
      c
    ), T = f + o + c, le = new Uint8Array(e, T, a - T);
    return {
      version: r,
      featureTable: h,
      batchTable: m,
      glbBytes: le
    };
  }
}

//# sourceMappingURL=B3DMLoaderBase-p2hcBFT-.js.map

;// ./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js


function computeMikkTSpaceTangents( geometry, MikkTSpace, negateSign = true ) {

	if ( ! MikkTSpace || ! MikkTSpace.isReady ) {

		throw new Error( 'BufferGeometryUtils: Initialized MikkTSpace library required.' );

	}

	if ( ! geometry.hasAttribute( 'position' ) || ! geometry.hasAttribute( 'normal' ) || ! geometry.hasAttribute( 'uv' ) ) {

		throw new Error( 'BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.' );

	}

	function getAttributeArray( attribute ) {

		if ( attribute.normalized || attribute.isInterleavedBufferAttribute ) {

			const dstArray = new Float32Array( attribute.count * attribute.itemSize );

			for ( let i = 0, j = 0; i < attribute.count; i ++ ) {

				dstArray[ j ++ ] = attribute.getX( i );
				dstArray[ j ++ ] = attribute.getY( i );

				if ( attribute.itemSize > 2 ) {

					dstArray[ j ++ ] = attribute.getZ( i );

				}

			}

			return dstArray;

		}

		if ( attribute.array instanceof Float32Array ) {

			return attribute.array;

		}

		return new Float32Array( attribute.array );

	}

	// MikkTSpace algorithm requires non-indexed input.

	const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;

	// Compute vertex tangents.

	const tangents = MikkTSpace.generateTangents(

		getAttributeArray( _geometry.attributes.position ),
		getAttributeArray( _geometry.attributes.normal ),
		getAttributeArray( _geometry.attributes.uv )

	);

	// Texture coordinate convention of glTF differs from the apparent
	// default of the MikkTSpace library; .w component must be flipped.

	if ( negateSign ) {

		for ( let i = 3; i < tangents.length; i += 4 ) {

			tangents[ i ] *= - 1;

		}

	}

	//

	_geometry.setAttribute( 'tangent', new BufferAttribute( tangents, 4 ) );

	if ( geometry !== _geometry ) {

		geometry.copy( _geometry );

	}

	return geometry;

}

/**
 * @param  {Array<BufferGeometry>} geometries
 * @param  {Boolean} useGroups
 * @return {BufferGeometry}
 */
function mergeGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {BufferAttribute}
 */
function mergeAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let gpuType = - 1;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		if ( gpuType === - 1 ) gpuType = attribute.gpuType;
		if ( gpuType !== attribute.gpuType ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.count * itemSize;

	}

	const array = new TypedArray( arrayLength );
	const result = new BufferAttribute( array, itemSize, normalized );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];
		if ( attribute.isInterleavedBufferAttribute ) {

			const tupleOffset = offset / itemSize;
			for ( let j = 0, l = attribute.count; j < l; j ++ ) {

				for ( let c = 0; c < itemSize; c ++ ) {

					const value = attribute.getComponent( j, c );
					result.setComponent( j + tupleOffset, c, value );

				}

			}

		} else {

			array.set( attribute.array, offset );

		}

		offset += attribute.count * itemSize;

	}

	if ( gpuType !== undefined ) {

		result.gpuType = gpuType;

	}

	return result;

}

/**
 * @param {BufferAttribute}
 * @return {BufferAttribute}
 */
function deepCloneAttribute( attribute ) {

	if ( attribute.isInstancedInterleavedBufferAttribute || attribute.isInterleavedBufferAttribute ) {

		return deinterleaveAttribute( attribute );

	}

	if ( attribute.isInstancedBufferAttribute ) {

		return new InstancedBufferAttribute().copy( attribute );

	}

	return new BufferAttribute().copy( attribute );

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {Array<InterleavedBufferAttribute>}
 */
function interleaveAttributes( attributes ) {

	// Interleaves the provided attributes into an InterleavedBuffer and returns
	// a set of InterleavedBufferAttributes for each attribute
	let TypedArray;
	let arrayLength = 0;
	let stride = 0;

	// calculate the length and type of the interleavedBuffer
	for ( let i = 0, l = attributes.length; i < l; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'AttributeBuffers of different types cannot be interleaved' );
			return null;

		}

		arrayLength += attribute.array.length;
		stride += attribute.itemSize;

	}

	// Create the set of buffer attributes
	const interleavedBuffer = new InterleavedBuffer( new TypedArray( arrayLength ), stride );
	let offset = 0;
	const res = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	for ( let j = 0, l = attributes.length; j < l; j ++ ) {

		const attribute = attributes[ j ];
		const itemSize = attribute.itemSize;
		const count = attribute.count;
		const iba = new InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, attribute.normalized );
		res.push( iba );

		offset += itemSize;

		// Move the data for each attribute into the new interleavedBuffer
		// at the appropriate offset
		for ( let c = 0; c < count; c ++ ) {

			for ( let k = 0; k < itemSize; k ++ ) {

				iba[ setters[ k ] ]( c, attribute[ getters[ k ] ]( c ) );

			}

		}

	}

	return res;

}

// returns a new, non-interleaved version of the provided attribute
function deinterleaveAttribute( attribute ) {

	const cons = attribute.data.array.constructor;
	const count = attribute.count;
	const itemSize = attribute.itemSize;
	const normalized = attribute.normalized;

	const array = new cons( count * itemSize );
	let newAttribute;
	if ( attribute.isInstancedInterleavedBufferAttribute ) {

		newAttribute = new InstancedBufferAttribute( array, itemSize, normalized, attribute.meshPerAttribute );

	} else {

		newAttribute = new BufferAttribute( array, itemSize, normalized );

	}

	for ( let i = 0; i < count; i ++ ) {

		newAttribute.setX( i, attribute.getX( i ) );

		if ( itemSize >= 2 ) {

			newAttribute.setY( i, attribute.getY( i ) );

		}

		if ( itemSize >= 3 ) {

			newAttribute.setZ( i, attribute.getZ( i ) );

		}

		if ( itemSize >= 4 ) {

			newAttribute.setW( i, attribute.getW( i ) );

		}

	}

	return newAttribute;

}

// deinterleaves all attributes on the geometry
function deinterleaveGeometry( geometry ) {

	const attributes = geometry.attributes;
	const morphTargets = geometry.morphTargets;
	const attrMap = new Map();

	for ( const key in attributes ) {

		const attr = attributes[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			attributes[ key ] = attrMap.get( attr );

		}

	}

	for ( const key in morphTargets ) {

		const attr = morphTargets[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			morphTargets[ key ] = attrMap.get( attr );

		}

	}

}

/**
 * @param {BufferGeometry} geometry
 * @return {number}
 */
function estimateBytesUsed( geometry ) {

	// Return the estimated memory used by this geometry in bytes
	// Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
	// for InterleavedBufferAttributes.
	let mem = 0;
	for ( const name in geometry.attributes ) {

		const attr = geometry.getAttribute( name );
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;

	}

	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} tolerance
 * @return {BufferGeometry}
 */
function mergeVertices( geometry, tolerance = 1e-4 ) {

	tolerance = Math.max( tolerance, Number.EPSILON );

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute( 'position' );
	const vertexCount = indices ? indices.count : positions.count;

	// next value for triangle indices
	let nextIndex = 0;

	// attributes and new attribute arrays
	const attributeNames = Object.keys( geometry.attributes );
	const tmpAttributes = {};
	const tmpMorphAttributes = {};
	const newIndices = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	// Initialize the arrays, allocating space conservatively. Extra
	// space will be trimmed in the last step.
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];
		const attr = geometry.attributes[ name ];

		tmpAttributes[ name ] = new attr.constructor(
			new attr.array.constructor( attr.count * attr.itemSize ),
			attr.itemSize,
			attr.normalized
		);

		const morphAttributes = geometry.morphAttributes[ name ];
		if ( morphAttributes ) {

			if ( ! tmpMorphAttributes[ name ] ) tmpMorphAttributes[ name ] = [];
			morphAttributes.forEach( ( morphAttr, i ) => {

				const array = new morphAttr.array.constructor( morphAttr.count * morphAttr.itemSize );
				tmpMorphAttributes[ name ][ i ] = new morphAttr.constructor( array, morphAttr.itemSize, morphAttr.normalized );

			} );

		}

	}

	// convert the error tolerance to an amount of decimal places to truncate to
	const halfTolerance = tolerance * 0.5;
	const exponent = Math.log10( 1 / tolerance );
	const hashMultiplier = Math.pow( 10, exponent );
	const hashAdditive = halfTolerance * hashMultiplier;
	for ( let i = 0; i < vertexCount; i ++ ) {

		const index = indices ? indices.getX( i ) : i;

		// Generate a hash for the vertex attributes at the current index 'i'
		let hash = '';
		for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.getAttribute( name );
			const itemSize = attribute.itemSize;

			for ( let k = 0; k < itemSize; k ++ ) {

				// double tilde truncates the decimal value
				hash += `${ ~ ~ ( attribute[ getters[ k ] ]( index ) * hashMultiplier + hashAdditive ) },`;

			}

		}

		// Add another reference to the vertex if it's already
		// used by another index
		if ( hash in hashToIndex ) {

			newIndices.push( hashToIndex[ hash ] );

		} else {

			// copy data to the new index in the temporary attributes
			for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

				const name = attributeNames[ j ];
				const attribute = geometry.getAttribute( name );
				const morphAttributes = geometry.morphAttributes[ name ];
				const itemSize = attribute.itemSize;
				const newArray = tmpAttributes[ name ];
				const newMorphArrays = tmpMorphAttributes[ name ];

				for ( let k = 0; k < itemSize; k ++ ) {

					const getterFunc = getters[ k ];
					const setterFunc = setters[ k ];
					newArray[ setterFunc ]( nextIndex, attribute[ getterFunc ]( index ) );

					if ( morphAttributes ) {

						for ( let m = 0, ml = morphAttributes.length; m < ml; m ++ ) {

							newMorphArrays[ m ][ setterFunc ]( nextIndex, morphAttributes[ m ][ getterFunc ]( index ) );

						}

					}

				}

			}

			hashToIndex[ hash ] = nextIndex;
			newIndices.push( nextIndex );
			nextIndex ++;

		}

	}

	// generate result BufferGeometry
	const result = geometry.clone();
	for ( const name in geometry.attributes ) {

		const tmpAttribute = tmpAttributes[ name ];

		result.setAttribute( name, new tmpAttribute.constructor(
			tmpAttribute.array.slice( 0, nextIndex * tmpAttribute.itemSize ),
			tmpAttribute.itemSize,
			tmpAttribute.normalized,
		) );

		if ( ! ( name in tmpMorphAttributes ) ) continue;

		for ( let j = 0; j < tmpMorphAttributes[ name ].length; j ++ ) {

			const tmpMorphAttribute = tmpMorphAttributes[ name ][ j ];

			result.morphAttributes[ name ][ j ] = new tmpMorphAttribute.constructor(
				tmpMorphAttribute.array.slice( 0, nextIndex * tmpMorphAttribute.itemSize ),
				tmpMorphAttribute.itemSize,
				tmpMorphAttribute.normalized,
			);

		}

	}

	// indices

	result.setIndex( newIndices );

	return result;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} drawMode
 * @return {BufferGeometry}
 */
function toTrianglesDrawMode( geometry, drawMode ) {

	if ( drawMode === external_three_.TrianglesDrawMode ) {

		console.warn( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.' );
		return geometry;

	}

	if ( drawMode === external_three_.TriangleFanDrawMode || drawMode === external_three_.TriangleStripDrawMode ) {

		let index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			const indices = [];

			const position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( let i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		const numberOfTriangles = index.count - 2;
		const newIndices = [];

		if ( drawMode === external_three_.TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( let i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( let i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );

				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		const newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );
		newGeometry.clearGroups();

		return newGeometry;

	} else {

		console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', drawMode );
		return geometry;

	}

}

/**
 * Calculates the morphed attributes of a morphed/skinned BufferGeometry.
 * Helpful for Raytracing or Decals.
 * @param {Mesh | Line | Points} object An instance of Mesh, Line or Points.
 * @return {Object} An Object with original position/normal attributes and morphed ones.
 */
function computeMorphedAttributes( object ) {

	const _vA = new Vector3();
	const _vB = new Vector3();
	const _vC = new Vector3();

	const _tempA = new Vector3();
	const _tempB = new Vector3();
	const _tempC = new Vector3();

	const _morphA = new Vector3();
	const _morphB = new Vector3();
	const _morphC = new Vector3();

	function _calculateMorphedAttributeData(
		object,
		attribute,
		morphAttribute,
		morphTargetsRelative,
		a,
		b,
		c,
		modifiedAttributeArray
	) {

		_vA.fromBufferAttribute( attribute, a );
		_vB.fromBufferAttribute( attribute, b );
		_vC.fromBufferAttribute( attribute, c );

		const morphInfluences = object.morphTargetInfluences;

		if ( morphAttribute && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const influence = morphInfluences[ i ];
				const morph = morphAttribute[ i ];

				if ( influence === 0 ) continue;

				_tempA.fromBufferAttribute( morph, a );
				_tempB.fromBufferAttribute( morph, b );
				_tempC.fromBufferAttribute( morph, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.applyBoneTransform( a, _vA );
			object.applyBoneTransform( b, _vB );
			object.applyBoneTransform( c, _vC );

		}

		modifiedAttributeArray[ a * 3 + 0 ] = _vA.x;
		modifiedAttributeArray[ a * 3 + 1 ] = _vA.y;
		modifiedAttributeArray[ a * 3 + 2 ] = _vA.z;
		modifiedAttributeArray[ b * 3 + 0 ] = _vB.x;
		modifiedAttributeArray[ b * 3 + 1 ] = _vB.y;
		modifiedAttributeArray[ b * 3 + 2 ] = _vB.z;
		modifiedAttributeArray[ c * 3 + 0 ] = _vC.x;
		modifiedAttributeArray[ c * 3 + 1 ] = _vC.y;
		modifiedAttributeArray[ c * 3 + 2 ] = _vC.z;

	}

	const geometry = object.geometry;
	const material = object.material;

	let a, b, c;
	const index = geometry.index;
	const positionAttribute = geometry.attributes.position;
	const morphPosition = geometry.morphAttributes.position;
	const morphTargetsRelative = geometry.morphTargetsRelative;
	const normalAttribute = geometry.attributes.normal;
	const morphNormal = geometry.morphAttributes.position;

	const groups = geometry.groups;
	const drawRange = geometry.drawRange;
	let i, j, il, jl;
	let group;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = index.getX( i );
				b = index.getX( i + 1 );
				c = index.getX( i + 2 );

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( positionAttribute.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = i;
				b = i + 1;
				c = i + 2;

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	}

	const morphedPositionAttribute = new Float32BufferAttribute( modifiedPosition, 3 );
	const morphedNormalAttribute = new Float32BufferAttribute( modifiedNormal, 3 );

	return {

		positionAttribute: positionAttribute,
		normalAttribute: normalAttribute,
		morphedPositionAttribute: morphedPositionAttribute,
		morphedNormalAttribute: morphedNormalAttribute

	};

}

function mergeGroups( geometry ) {

	if ( geometry.groups.length === 0 ) {

		console.warn( 'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.' );
		return geometry;

	}

	let groups = geometry.groups;

	// sort groups by material index

	groups = groups.sort( ( a, b ) => {

		if ( a.materialIndex !== b.materialIndex ) return a.materialIndex - b.materialIndex;

		return a.start - b.start;

	} );

	// create index for non-indexed geometries

	if ( geometry.getIndex() === null ) {

		const positionAttribute = geometry.getAttribute( 'position' );
		const indices = [];

		for ( let i = 0; i < positionAttribute.count; i += 3 ) {

			indices.push( i, i + 1, i + 2 );

		}

		geometry.setIndex( indices );

	}

	// sort index

	const index = geometry.getIndex();

	const newIndices = [];

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const groupStart = group.start;
		const groupLength = groupStart + group.count;

		for ( let j = groupStart; j < groupLength; j ++ ) {

			newIndices.push( index.getX( j ) );

		}

	}

	geometry.dispose(); // Required to force buffer recreation
	geometry.setIndex( newIndices );

	// update groups indices

	let start = 0;

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		group.start = start;
		start += group.count;

	}

	// merge groups

	let currentGroup = groups[ 0 ];

	geometry.groups = [ currentGroup ];

	for ( let i = 1; i < groups.length; i ++ ) {

		const group = groups[ i ];

		if ( currentGroup.materialIndex === group.materialIndex ) {

			currentGroup.count += group.count;

		} else {

			currentGroup = group;
			geometry.groups.push( currentGroup );

		}

	}

	return geometry;

}


/**
 * Modifies the supplied geometry if it is non-indexed, otherwise creates a new,
 * non-indexed geometry. Returns the geometry with smooth normals everywhere except
 * faces that meet at an angle greater than the crease angle.
 *
 * @param {BufferGeometry} geometry
 * @param {number} [creaseAngle]
 * @return {BufferGeometry}
 */
function toCreasedNormals( geometry, creaseAngle = Math.PI / 3 /* 60 degrees */ ) {

	const creaseDot = Math.cos( creaseAngle );
	const hashMultiplier = ( 1 + 1e-10 ) * 1e2;

	// reusable vectors
	const verts = [ new Vector3(), new Vector3(), new Vector3() ];
	const tempVec1 = new Vector3();
	const tempVec2 = new Vector3();
	const tempNorm = new Vector3();
	const tempNorm2 = new Vector3();

	// hashes a vector
	function hashVertex( v ) {

		const x = ~ ~ ( v.x * hashMultiplier );
		const y = ~ ~ ( v.y * hashMultiplier );
		const z = ~ ~ ( v.z * hashMultiplier );
		return `${x},${y},${z}`;

	}

	// BufferGeometry.toNonIndexed() warns if the geometry is non-indexed
	// and returns the original geometry
	const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
	const posAttr = resultGeometry.attributes.position;
	const vertexMap = {};

	// find all the normals shared by commonly located vertices
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		// add the normal to the map for all vertices
		const normal = new Vector3().crossVectors( tempVec1, tempVec2 ).normalize();
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			if ( ! ( hash in vertexMap ) ) {

				vertexMap[ hash ] = [];

			}

			vertexMap[ hash ].push( normal );

		}

	}

	// average normals from all vertices that share a common location if they are within the
	// provided crease threshold
	const normalArray = new Float32Array( posAttr.count * 3 );
	const normAttr = new BufferAttribute( normalArray, 3, false );
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		// get the face normal for this vertex
		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		tempNorm.crossVectors( tempVec1, tempVec2 ).normalize();

		// average all normals that meet the threshold and set the normal value
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			const otherNormals = vertexMap[ hash ];
			tempNorm2.set( 0, 0, 0 );

			for ( let k = 0, lk = otherNormals.length; k < lk; k ++ ) {

				const otherNorm = otherNormals[ k ];
				if ( tempNorm.dot( otherNorm ) > creaseDot ) {

					tempNorm2.add( otherNorm );

				}

			}

			tempNorm2.normalize();
			normAttr.setXYZ( i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z );

		}

	}

	resultGeometry.setAttribute( 'normal', normAttr );
	return resultGeometry;

}



;// ./node_modules/three/examples/jsm/loaders/GLTFLoader.js



class GLTFLoader extends external_three_.Loader {

	constructor( manager ) {

		super( manager );

		this.dracoLoader = null;
		this.ktx2Loader = null;
		this.meshoptDecoder = null;

		this.pluginCallbacks = [];

		this.register( function ( parser ) {

			return new GLTFMaterialsClearcoatExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsDispersionExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureBasisUExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureWebPExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureAVIFExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsSheenExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsTransmissionExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsVolumeExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsIorExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsEmissiveStrengthExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsSpecularExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsIridescenceExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsAnisotropyExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsBumpExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFLightsExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMeshoptCompression( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMeshGpuInstancing( parser );

		} );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		let resourcePath;

		if ( this.resourcePath !== '' ) {

			resourcePath = this.resourcePath;

		} else if ( this.path !== '' ) {

			// If a base path is set, resources will be relative paths from that plus the relative path of the gltf file
			// Example  path = 'https://my-cnd-server.com/', url = 'assets/models/model.gltf'
			// resourcePath = 'https://my-cnd-server.com/assets/models/'
			// referenced resource 'model.bin' will be loaded from 'https://my-cnd-server.com/assets/models/model.bin'
			// referenced resource '../textures/texture.png' will be loaded from 'https://my-cnd-server.com/assets/textures/texture.png'
			const relativeUrl = external_three_.LoaderUtils.extractUrlBase( url );
			resourcePath = external_three_.LoaderUtils.resolveURL( relativeUrl, this.path );

		} else {

			resourcePath = external_three_.LoaderUtils.extractUrlBase( url );

		}

		// Tells the LoadingManager to track an extra item, which resolves after
		// the model is fully loaded. This means the count of items loaded will
		// be incorrect, but ensures manager.onLoad() does not fire early.
		this.manager.itemStart( url );

		const _onError = function ( e ) {

			if ( onError ) {

				onError( e );

			} else {

				console.error( e );

			}

			scope.manager.itemError( url );
			scope.manager.itemEnd( url );

		};

		const loader = new external_three_.FileLoader( this.manager );

		loader.setPath( this.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );

		loader.load( url, function ( data ) {

			try {

				scope.parse( data, resourcePath, function ( gltf ) {

					onLoad( gltf );

					scope.manager.itemEnd( url );

				}, _onError );

			} catch ( e ) {

				_onError( e );

			}

		}, onProgress, _onError );

	}

	setDRACOLoader( dracoLoader ) {

		this.dracoLoader = dracoLoader;
		return this;

	}

	setDDSLoader() {

		throw new Error(

			'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'

		);

	}

	setKTX2Loader( ktx2Loader ) {

		this.ktx2Loader = ktx2Loader;
		return this;

	}

	setMeshoptDecoder( meshoptDecoder ) {

		this.meshoptDecoder = meshoptDecoder;
		return this;

	}

	register( callback ) {

		if ( this.pluginCallbacks.indexOf( callback ) === - 1 ) {

			this.pluginCallbacks.push( callback );

		}

		return this;

	}

	unregister( callback ) {

		if ( this.pluginCallbacks.indexOf( callback ) !== - 1 ) {

			this.pluginCallbacks.splice( this.pluginCallbacks.indexOf( callback ), 1 );

		}

		return this;

	}

	parse( data, path, onLoad, onError ) {

		let json;
		const extensions = {};
		const plugins = {};
		const textDecoder = new TextDecoder();

		if ( typeof data === 'string' ) {

			json = JSON.parse( data );

		} else if ( data instanceof ArrayBuffer ) {

			const magic = textDecoder.decode( new Uint8Array( data, 0, 4 ) );

			if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

				try {

					extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );

				} catch ( error ) {

					if ( onError ) onError( error );
					return;

				}

				json = JSON.parse( extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content );

			} else {

				json = JSON.parse( textDecoder.decode( data ) );

			}

		} else {

			json = data;

		}

		if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

			if ( onError ) onError( new Error( 'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.' ) );
			return;

		}

		const parser = new GLTFParser( json, {

			path: path || this.resourcePath || '',
			crossOrigin: this.crossOrigin,
			requestHeader: this.requestHeader,
			manager: this.manager,
			ktx2Loader: this.ktx2Loader,
			meshoptDecoder: this.meshoptDecoder

		} );

		parser.fileLoader.setRequestHeader( this.requestHeader );

		for ( let i = 0; i < this.pluginCallbacks.length; i ++ ) {

			const plugin = this.pluginCallbacks[ i ]( parser );

			if ( ! plugin.name ) console.error( 'THREE.GLTFLoader: Invalid plugin found: missing name' );

			plugins[ plugin.name ] = plugin;

			// Workaround to avoid determining as unknown extension
			// in addUnknownExtensionsToUserData().
			// Remove this workaround if we move all the existing
			// extension handlers to plugin system
			extensions[ plugin.name ] = true;

		}

		if ( json.extensionsUsed ) {

			for ( let i = 0; i < json.extensionsUsed.length; ++ i ) {

				const extensionName = json.extensionsUsed[ i ];
				const extensionsRequired = json.extensionsRequired || [];

				switch ( extensionName ) {

					case EXTENSIONS.KHR_MATERIALS_UNLIT:
						extensions[ extensionName ] = new GLTFMaterialsUnlitExtension();
						break;

					case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
						extensions[ extensionName ] = new GLTFDracoMeshCompressionExtension( json, this.dracoLoader );
						break;

					case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
						extensions[ extensionName ] = new GLTFTextureTransformExtension();
						break;

					case EXTENSIONS.KHR_MESH_QUANTIZATION:
						extensions[ extensionName ] = new GLTFMeshQuantizationExtension();
						break;

					default:

						if ( extensionsRequired.indexOf( extensionName ) >= 0 && plugins[ extensionName ] === undefined ) {

							console.warn( 'THREE.GLTFLoader: Unknown extension "' + extensionName + '".' );

						}

				}

			}

		}

		parser.setExtensions( extensions );
		parser.setPlugins( plugins );
		parser.parse( onLoad, onError );

	}

	parseAsync( data, path ) {

		const scope = this;

		return new Promise( function ( resolve, reject ) {

			scope.parse( data, path, resolve, reject );

		} );

	}

}

/* GLTFREGISTRY */

function GLTFRegistry() {

	let objects = {};

	return	{

		get: function ( key ) {

			return objects[ key ];

		},

		add: function ( key, object ) {

			objects[ key ] = object;

		},

		remove: function ( key ) {

			delete objects[ key ];

		},

		removeAll: function () {

			objects = {};

		}

	};

}

/*********************************/
/********** EXTENSIONS ***********/
/*********************************/

const EXTENSIONS = {
	KHR_BINARY_GLTF: 'KHR_binary_glTF',
	KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
	KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
	KHR_MATERIALS_CLEARCOAT: 'KHR_materials_clearcoat',
	KHR_MATERIALS_DISPERSION: 'KHR_materials_dispersion',
	KHR_MATERIALS_IOR: 'KHR_materials_ior',
	KHR_MATERIALS_SHEEN: 'KHR_materials_sheen',
	KHR_MATERIALS_SPECULAR: 'KHR_materials_specular',
	KHR_MATERIALS_TRANSMISSION: 'KHR_materials_transmission',
	KHR_MATERIALS_IRIDESCENCE: 'KHR_materials_iridescence',
	KHR_MATERIALS_ANISOTROPY: 'KHR_materials_anisotropy',
	KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
	KHR_MATERIALS_VOLUME: 'KHR_materials_volume',
	KHR_TEXTURE_BASISU: 'KHR_texture_basisu',
	KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
	KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
	KHR_MATERIALS_EMISSIVE_STRENGTH: 'KHR_materials_emissive_strength',
	EXT_MATERIALS_BUMP: 'EXT_materials_bump',
	EXT_TEXTURE_WEBP: 'EXT_texture_webp',
	EXT_TEXTURE_AVIF: 'EXT_texture_avif',
	EXT_MESHOPT_COMPRESSION: 'EXT_meshopt_compression',
	EXT_MESH_GPU_INSTANCING: 'EXT_mesh_gpu_instancing'
};

/**
 * Punctual Lights Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 */
class GLTFLightsExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

		// Object3D instance caches
		this.cache = { refs: {}, uses: {} };

	}

	_markDefs() {

		const parser = this.parser;
		const nodeDefs = this.parser.json.nodes || [];

		for ( let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			const nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.extensions
					&& nodeDef.extensions[ this.name ]
					&& nodeDef.extensions[ this.name ].light !== undefined ) {

				parser._addNodeRef( this.cache, nodeDef.extensions[ this.name ].light );

			}

		}

	}

	_loadLight( lightIndex ) {

		const parser = this.parser;
		const cacheKey = 'light:' + lightIndex;
		let dependency = parser.cache.get( cacheKey );

		if ( dependency ) return dependency;

		const json = parser.json;
		const extensions = ( json.extensions && json.extensions[ this.name ] ) || {};
		const lightDefs = extensions.lights || [];
		const lightDef = lightDefs[ lightIndex ];
		let lightNode;

		const color = new external_three_.Color( 0xffffff );

		if ( lightDef.color !== undefined ) color.setRGB( lightDef.color[ 0 ], lightDef.color[ 1 ], lightDef.color[ 2 ], external_three_.LinearSRGBColorSpace );

		const range = lightDef.range !== undefined ? lightDef.range : 0;

		switch ( lightDef.type ) {

			case 'directional':
				lightNode = new external_three_.DirectionalLight( color );
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			case 'point':
				lightNode = new external_three_.PointLight( color );
				lightNode.distance = range;
				break;

			case 'spot':
				lightNode = new external_three_.SpotLight( color );
				lightNode.distance = range;
				// Handle spotlight properties.
				lightDef.spot = lightDef.spot || {};
				lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
				lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
				lightNode.angle = lightDef.spot.outerConeAngle;
				lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			default:
				throw new Error( 'THREE.GLTFLoader: Unexpected light type: ' + lightDef.type );

		}

		// Some lights (e.g. spot) default to a position other than the origin. Reset the position
		// here, because node-level parsing will only override position if explicitly specified.
		lightNode.position.set( 0, 0, 0 );

		lightNode.decay = 2;

		assignExtrasToUserData( lightNode, lightDef );

		if ( lightDef.intensity !== undefined ) lightNode.intensity = lightDef.intensity;

		lightNode.name = parser.createUniqueName( lightDef.name || ( 'light_' + lightIndex ) );

		dependency = Promise.resolve( lightNode );

		parser.cache.add( cacheKey, dependency );

		return dependency;

	}

	getDependency( type, index ) {

		if ( type !== 'light' ) return;

		return this._loadLight( index );

	}

	createNodeAttachment( nodeIndex ) {

		const self = this;
		const parser = this.parser;
		const json = parser.json;
		const nodeDef = json.nodes[ nodeIndex ];
		const lightDef = ( nodeDef.extensions && nodeDef.extensions[ this.name ] ) || {};
		const lightIndex = lightDef.light;

		if ( lightIndex === undefined ) return null;

		return this._loadLight( lightIndex ).then( function ( light ) {

			return parser._getNodeRef( self.cache, lightIndex, light );

		} );

	}

}

/**
 * Unlit Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 */
class GLTFMaterialsUnlitExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;

	}

	getMaterialType() {

		return external_three_.MeshBasicMaterial;

	}

	extendParams( materialParams, materialDef, parser ) {

		const pending = [];

		materialParams.color = new external_three_.Color( 1.0, 1.0, 1.0 );
		materialParams.opacity = 1.0;

		const metallicRoughness = materialDef.pbrMetallicRoughness;

		if ( metallicRoughness ) {

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				const array = metallicRoughness.baseColorFactor;

				materialParams.color.setRGB( array[ 0 ], array[ 1 ], array[ 2 ], external_three_.LinearSRGBColorSpace );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture, external_three_.SRGBColorSpace ) );

			}

		}

		return Promise.all( pending );

	}

}

/**
 * Materials Emissive Strength Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/blob/5768b3ce0ef32bc39cdf1bef10b948586635ead3/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md
 */
class GLTFMaterialsEmissiveStrengthExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const emissiveStrength = materialDef.extensions[ this.name ].emissiveStrength;

		if ( emissiveStrength !== undefined ) {

			materialParams.emissiveIntensity = emissiveStrength;

		}

		return Promise.resolve();

	}

}

/**
 * Clearcoat Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
 */
class GLTFMaterialsClearcoatExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.clearcoatFactor !== undefined ) {

			materialParams.clearcoat = extension.clearcoatFactor;

		}

		if ( extension.clearcoatTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatMap', extension.clearcoatTexture ) );

		}

		if ( extension.clearcoatRoughnessFactor !== undefined ) {

			materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;

		}

		if ( extension.clearcoatRoughnessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatRoughnessMap', extension.clearcoatRoughnessTexture ) );

		}

		if ( extension.clearcoatNormalTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatNormalMap', extension.clearcoatNormalTexture ) );

			if ( extension.clearcoatNormalTexture.scale !== undefined ) {

				const scale = extension.clearcoatNormalTexture.scale;

				materialParams.clearcoatNormalScale = new external_three_.Vector2( scale, scale );

			}

		}

		return Promise.all( pending );

	}

}

/**
 * Materials dispersion Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_dispersion
 */
class GLTFMaterialsDispersionExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const extension = materialDef.extensions[ this.name ];

		materialParams.dispersion = extension.dispersion !== undefined ? extension.dispersion : 0;

		return Promise.resolve();

	}

}

/**
 * Iridescence Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_iridescence
 */
class GLTFMaterialsIridescenceExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.iridescenceFactor !== undefined ) {

			materialParams.iridescence = extension.iridescenceFactor;

		}

		if ( extension.iridescenceTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'iridescenceMap', extension.iridescenceTexture ) );

		}

		if ( extension.iridescenceIor !== undefined ) {

			materialParams.iridescenceIOR = extension.iridescenceIor;

		}

		if ( materialParams.iridescenceThicknessRange === undefined ) {

			materialParams.iridescenceThicknessRange = [ 100, 400 ];

		}

		if ( extension.iridescenceThicknessMinimum !== undefined ) {

			materialParams.iridescenceThicknessRange[ 0 ] = extension.iridescenceThicknessMinimum;

		}

		if ( extension.iridescenceThicknessMaximum !== undefined ) {

			materialParams.iridescenceThicknessRange[ 1 ] = extension.iridescenceThicknessMaximum;

		}

		if ( extension.iridescenceThicknessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'iridescenceThicknessMap', extension.iridescenceThicknessTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Sheen Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 */
class GLTFMaterialsSheenExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		materialParams.sheenColor = new external_three_.Color( 0, 0, 0 );
		materialParams.sheenRoughness = 0;
		materialParams.sheen = 1;

		const extension = materialDef.extensions[ this.name ];

		if ( extension.sheenColorFactor !== undefined ) {

			const colorFactor = extension.sheenColorFactor;
			materialParams.sheenColor.setRGB( colorFactor[ 0 ], colorFactor[ 1 ], colorFactor[ 2 ], external_three_.LinearSRGBColorSpace );

		}

		if ( extension.sheenRoughnessFactor !== undefined ) {

			materialParams.sheenRoughness = extension.sheenRoughnessFactor;

		}

		if ( extension.sheenColorTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'sheenColorMap', extension.sheenColorTexture, external_three_.SRGBColorSpace ) );

		}

		if ( extension.sheenRoughnessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'sheenRoughnessMap', extension.sheenRoughnessTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Transmission Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_transmission
 * Draft: https://github.com/KhronosGroup/glTF/pull/1698
 */
class GLTFMaterialsTransmissionExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.transmissionFactor !== undefined ) {

			materialParams.transmission = extension.transmissionFactor;

		}

		if ( extension.transmissionTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'transmissionMap', extension.transmissionTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Materials Volume Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_volume
 */
class GLTFMaterialsVolumeExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.thickness = extension.thicknessFactor !== undefined ? extension.thicknessFactor : 0;

		if ( extension.thicknessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'thicknessMap', extension.thicknessTexture ) );

		}

		materialParams.attenuationDistance = extension.attenuationDistance || Infinity;

		const colorArray = extension.attenuationColor || [ 1, 1, 1 ];
		materialParams.attenuationColor = new external_three_.Color().setRGB( colorArray[ 0 ], colorArray[ 1 ], colorArray[ 2 ], external_three_.LinearSRGBColorSpace );

		return Promise.all( pending );

	}

}

/**
 * Materials ior Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_ior
 */
class GLTFMaterialsIorExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_IOR;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const extension = materialDef.extensions[ this.name ];

		materialParams.ior = extension.ior !== undefined ? extension.ior : 1.5;

		return Promise.resolve();

	}

}

/**
 * Materials specular Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_specular
 */
class GLTFMaterialsSpecularExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.specularIntensity = extension.specularFactor !== undefined ? extension.specularFactor : 1.0;

		if ( extension.specularTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularIntensityMap', extension.specularTexture ) );

		}

		const colorArray = extension.specularColorFactor || [ 1, 1, 1 ];
		materialParams.specularColor = new external_three_.Color().setRGB( colorArray[ 0 ], colorArray[ 1 ], colorArray[ 2 ], external_three_.LinearSRGBColorSpace );

		if ( extension.specularColorTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularColorMap', extension.specularColorTexture, external_three_.SRGBColorSpace ) );

		}

		return Promise.all( pending );

	}

}


/**
 * Materials bump Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/EXT_materials_bump
 */
class GLTFMaterialsBumpExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_MATERIALS_BUMP;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.bumpScale = extension.bumpFactor !== undefined ? extension.bumpFactor : 1.0;

		if ( extension.bumpTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'bumpMap', extension.bumpTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Materials anisotropy Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_anisotropy
 */
class GLTFMaterialsAnisotropyExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return external_three_.MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.anisotropyStrength !== undefined ) {

			materialParams.anisotropy = extension.anisotropyStrength;

		}

		if ( extension.anisotropyRotation !== undefined ) {

			materialParams.anisotropyRotation = extension.anisotropyRotation;

		}

		if ( extension.anisotropyTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'anisotropyMap', extension.anisotropyTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * BasisU Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_basisu
 */
class GLTFTextureBasisUExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_TEXTURE_BASISU;

	}

	loadTexture( textureIndex ) {

		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ this.name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ this.name ];
		const loader = parser.options.ktx2Loader;

		if ( ! loader ) {

			if ( json.extensionsRequired && json.extensionsRequired.indexOf( this.name ) >= 0 ) {

				throw new Error( 'THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures' );

			} else {

				// Assumes that the extension is optional and that a fallback texture is present
				return null;

			}

		}

		return parser.loadTextureImage( textureIndex, extension.source, loader );

	}

}

/**
 * WebP Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_webp
 */
class GLTFTextureWebPExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
		this.isSupported = null;

	}

	loadTexture( textureIndex ) {

		const name = this.name;
		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ name ];
		const source = json.images[ extension.source ];

		let loader = parser.textureLoader;
		if ( source.uri ) {

			const handler = parser.options.manager.getHandler( source.uri );
			if ( handler !== null ) loader = handler;

		}

		return this.detectSupport().then( function ( isSupported ) {

			if ( isSupported ) return parser.loadTextureImage( textureIndex, extension.source, loader );

			if ( json.extensionsRequired && json.extensionsRequired.indexOf( name ) >= 0 ) {

				throw new Error( 'THREE.GLTFLoader: WebP required by asset but unsupported.' );

			}

			// Fall back to PNG or JPEG.
			return parser.loadTexture( textureIndex );

		} );

	}

	detectSupport() {

		if ( ! this.isSupported ) {

			this.isSupported = new Promise( function ( resolve ) {

				const image = new Image();

				// Lossy test image. Support for lossy images doesn't guarantee support for all
				// WebP images, unfortunately.
				image.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

				image.onload = image.onerror = function () {

					resolve( image.height === 1 );

				};

			} );

		}

		return this.isSupported;

	}

}

/**
 * AVIF Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_avif
 */
class GLTFTextureAVIFExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_TEXTURE_AVIF;
		this.isSupported = null;

	}

	loadTexture( textureIndex ) {

		const name = this.name;
		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ name ];
		const source = json.images[ extension.source ];

		let loader = parser.textureLoader;
		if ( source.uri ) {

			const handler = parser.options.manager.getHandler( source.uri );
			if ( handler !== null ) loader = handler;

		}

		return this.detectSupport().then( function ( isSupported ) {

			if ( isSupported ) return parser.loadTextureImage( textureIndex, extension.source, loader );

			if ( json.extensionsRequired && json.extensionsRequired.indexOf( name ) >= 0 ) {

				throw new Error( 'THREE.GLTFLoader: AVIF required by asset but unsupported.' );

			}

			// Fall back to PNG or JPEG.
			return parser.loadTexture( textureIndex );

		} );

	}

	detectSupport() {

		if ( ! this.isSupported ) {

			this.isSupported = new Promise( function ( resolve ) {

				const image = new Image();

				// Lossy test image.
				image.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
				image.onload = image.onerror = function () {

					resolve( image.height === 1 );

				};

			} );

		}

		return this.isSupported;

	}

}

/**
 * meshopt BufferView Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_meshopt_compression
 */
class GLTFMeshoptCompression {

	constructor( parser ) {

		this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
		this.parser = parser;

	}

	loadBufferView( index ) {

		const json = this.parser.json;
		const bufferView = json.bufferViews[ index ];

		if ( bufferView.extensions && bufferView.extensions[ this.name ] ) {

			const extensionDef = bufferView.extensions[ this.name ];

			const buffer = this.parser.getDependency( 'buffer', extensionDef.buffer );
			const decoder = this.parser.options.meshoptDecoder;

			if ( ! decoder || ! decoder.supported ) {

				if ( json.extensionsRequired && json.extensionsRequired.indexOf( this.name ) >= 0 ) {

					throw new Error( 'THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files' );

				} else {

					// Assumes that the extension is optional and that fallback buffer data is present
					return null;

				}

			}

			return buffer.then( function ( res ) {

				const byteOffset = extensionDef.byteOffset || 0;
				const byteLength = extensionDef.byteLength || 0;

				const count = extensionDef.count;
				const stride = extensionDef.byteStride;

				const source = new Uint8Array( res, byteOffset, byteLength );

				if ( decoder.decodeGltfBufferAsync ) {

					return decoder.decodeGltfBufferAsync( count, stride, source, extensionDef.mode, extensionDef.filter ).then( function ( res ) {

						return res.buffer;

					} );

				} else {

					// Support for MeshoptDecoder 0.18 or earlier, without decodeGltfBufferAsync
					return decoder.ready.then( function () {

						const result = new ArrayBuffer( count * stride );
						decoder.decodeGltfBuffer( new Uint8Array( result ), count, stride, source, extensionDef.mode, extensionDef.filter );
						return result;

					} );

				}

			} );

		} else {

			return null;

		}

	}

}

/**
 * GPU Instancing Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 *
 */
class GLTFMeshGpuInstancing {

	constructor( parser ) {

		this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
		this.parser = parser;

	}

	createNodeMesh( nodeIndex ) {

		const json = this.parser.json;
		const nodeDef = json.nodes[ nodeIndex ];

		if ( ! nodeDef.extensions || ! nodeDef.extensions[ this.name ] ||
			nodeDef.mesh === undefined ) {

			return null;

		}

		const meshDef = json.meshes[ nodeDef.mesh ];

		// No Points or Lines + Instancing support yet

		for ( const primitive of meshDef.primitives ) {

			if ( primitive.mode !== WEBGL_CONSTANTS.TRIANGLES &&
				 primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP &&
				 primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN &&
				 primitive.mode !== undefined ) {

				return null;

			}

		}

		const extensionDef = nodeDef.extensions[ this.name ];
		const attributesDef = extensionDef.attributes;

		// @TODO: Can we support InstancedMesh + SkinnedMesh?

		const pending = [];
		const attributes = {};

		for ( const key in attributesDef ) {

			pending.push( this.parser.getDependency( 'accessor', attributesDef[ key ] ).then( accessor => {

				attributes[ key ] = accessor;
				return attributes[ key ];

			} ) );

		}

		if ( pending.length < 1 ) {

			return null;

		}

		pending.push( this.parser.createNodeMesh( nodeIndex ) );

		return Promise.all( pending ).then( results => {

			const nodeObject = results.pop();
			const meshes = nodeObject.isGroup ? nodeObject.children : [ nodeObject ];
			const count = results[ 0 ].count; // All attribute counts should be same
			const instancedMeshes = [];

			for ( const mesh of meshes ) {

				// Temporal variables
				const m = new external_three_.Matrix4();
				const p = new external_three_.Vector3();
				const q = new external_three_.Quaternion();
				const s = new external_three_.Vector3( 1, 1, 1 );

				const instancedMesh = new external_three_.InstancedMesh( mesh.geometry, mesh.material, count );

				for ( let i = 0; i < count; i ++ ) {

					if ( attributes.TRANSLATION ) {

						p.fromBufferAttribute( attributes.TRANSLATION, i );

					}

					if ( attributes.ROTATION ) {

						q.fromBufferAttribute( attributes.ROTATION, i );

					}

					if ( attributes.SCALE ) {

						s.fromBufferAttribute( attributes.SCALE, i );

					}

					instancedMesh.setMatrixAt( i, m.compose( p, q, s ) );

				}

				// Add instance attributes to the geometry, excluding TRS.
				for ( const attributeName in attributes ) {

					if ( attributeName === '_COLOR_0' ) {

						const attr = attributes[ attributeName ];
						instancedMesh.instanceColor = new external_three_.InstancedBufferAttribute( attr.array, attr.itemSize, attr.normalized );

					} else if ( attributeName !== 'TRANSLATION' &&
						 attributeName !== 'ROTATION' &&
						 attributeName !== 'SCALE' ) {

						mesh.geometry.setAttribute( attributeName, attributes[ attributeName ] );

					}

				}

				// Just in case
				external_three_.Object3D.prototype.copy.call( instancedMesh, mesh );

				this.parser.assignFinalMaterial( instancedMesh );

				instancedMeshes.push( instancedMesh );

			}

			if ( nodeObject.isGroup ) {

				nodeObject.clear();

				nodeObject.add( ... instancedMeshes );

				return nodeObject;

			}

			return instancedMeshes[ 0 ];

		} );

	}

}

/* BINARY EXTENSION */
const BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

class GLTFBinaryExtension {

	constructor( data ) {

		this.name = EXTENSIONS.KHR_BINARY_GLTF;
		this.content = null;
		this.body = null;

		const headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );
		const textDecoder = new TextDecoder();

		this.header = {
			magic: textDecoder.decode( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'THREE.GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'THREE.GLTFLoader: Legacy binary file detected.' );

		}

		const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
		const chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
		let chunkIndex = 0;

		while ( chunkIndex < chunkContentsLength ) {

			const chunkLength = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			const chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

				const contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
				this.content = textDecoder.decode( contentArray );

			} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

				const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
				this.body = data.slice( byteOffset, byteOffset + chunkLength );

			}

			// Clients must ignore chunks with unknown types.

			chunkIndex += chunkLength;

		}

		if ( this.content === null ) {

			throw new Error( 'THREE.GLTFLoader: JSON content not found.' );

		}

	}

}

/**
 * DRACO Mesh Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
 */
class GLTFDracoMeshCompressionExtension {

	constructor( json, dracoLoader ) {

		if ( ! dracoLoader ) {

			throw new Error( 'THREE.GLTFLoader: No DRACOLoader instance provided.' );

		}

		this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
		this.json = json;
		this.dracoLoader = dracoLoader;
		this.dracoLoader.preload();

	}

	decodePrimitive( primitive, parser ) {

		const json = this.json;
		const dracoLoader = this.dracoLoader;
		const bufferViewIndex = primitive.extensions[ this.name ].bufferView;
		const gltfAttributeMap = primitive.extensions[ this.name ].attributes;
		const threeAttributeMap = {};
		const attributeNormalizedMap = {};
		const attributeTypeMap = {};

		for ( const attributeName in gltfAttributeMap ) {

			const threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			threeAttributeMap[ threeAttributeName ] = gltfAttributeMap[ attributeName ];

		}

		for ( const attributeName in primitive.attributes ) {

			const threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			if ( gltfAttributeMap[ attributeName ] !== undefined ) {

				const accessorDef = json.accessors[ primitive.attributes[ attributeName ] ];
				const componentType = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

				attributeTypeMap[ threeAttributeName ] = componentType.name;
				attributeNormalizedMap[ threeAttributeName ] = accessorDef.normalized === true;

			}

		}

		return parser.getDependency( 'bufferView', bufferViewIndex ).then( function ( bufferView ) {

			return new Promise( function ( resolve, reject ) {

				dracoLoader.decodeDracoFile( bufferView, function ( geometry ) {

					for ( const attributeName in geometry.attributes ) {

						const attribute = geometry.attributes[ attributeName ];
						const normalized = attributeNormalizedMap[ attributeName ];

						if ( normalized !== undefined ) attribute.normalized = normalized;

					}

					resolve( geometry );

				}, threeAttributeMap, attributeTypeMap, external_three_.LinearSRGBColorSpace, reject );

			} );

		} );

	}

}

/**
 * Texture Transform Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
 */
class GLTFTextureTransformExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;

	}

	extendTexture( texture, transform ) {

		if ( ( transform.texCoord === undefined || transform.texCoord === texture.channel )
			&& transform.offset === undefined
			&& transform.rotation === undefined
			&& transform.scale === undefined ) {

			// See https://github.com/mrdoob/three.js/issues/21819.
			return texture;

		}

		texture = texture.clone();

		if ( transform.texCoord !== undefined ) {

			texture.channel = transform.texCoord;

		}

		if ( transform.offset !== undefined ) {

			texture.offset.fromArray( transform.offset );

		}

		if ( transform.rotation !== undefined ) {

			texture.rotation = transform.rotation;

		}

		if ( transform.scale !== undefined ) {

			texture.repeat.fromArray( transform.scale );

		}

		texture.needsUpdate = true;

		return texture;

	}

}

/**
 * Mesh Quantization Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization
 */
class GLTFMeshQuantizationExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;

	}

}

/*********************************/
/********** INTERPOLATION ********/
/*********************************/

// Spline Interpolation
// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
class GLTFCubicSplineInterpolant extends external_three_.Interpolant {

	constructor( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		super( parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	copySampleValue_( index ) {

		// Copies a sample value to the result buffer. See description of glTF
		// CUBICSPLINE values layout in interpolate_() function below.

		const result = this.resultBuffer,
			values = this.sampleValues,
			valueSize = this.valueSize,
			offset = index * valueSize * 3 + valueSize;

		for ( let i = 0; i !== valueSize; i ++ ) {

			result[ i ] = values[ offset + i ];

		}

		return result;

	}

	interpolate_( i1, t0, t, t1 ) {

		const result = this.resultBuffer;
		const values = this.sampleValues;
		const stride = this.valueSize;

		const stride2 = stride * 2;
		const stride3 = stride * 3;

		const td = t1 - t0;

		const p = ( t - t0 ) / td;
		const pp = p * p;
		const ppp = pp * p;

		const offset1 = i1 * stride3;
		const offset0 = offset1 - stride3;

		const s2 = - 2 * ppp + 3 * pp;
		const s3 = ppp - pp;
		const s0 = 1 - s2;
		const s1 = s3 - pp + p;

		// Layout of keyframe output values for CUBICSPLINE animations:
		//   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
		for ( let i = 0; i !== stride; i ++ ) {

			const p0 = values[ offset0 + i + stride ]; // splineVertex_k
			const m0 = values[ offset0 + i + stride2 ] * td; // outTangent_k * (t_k+1 - t_k)
			const p1 = values[ offset1 + i + stride ]; // splineVertex_k+1
			const m1 = values[ offset1 + i ] * td; // inTangent_k+1 * (t_k+1 - t_k)

			result[ i ] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

		}

		return result;

	}

}

const _q = new external_three_.Quaternion();

class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {

	interpolate_( i1, t0, t, t1 ) {

		const result = super.interpolate_( i1, t0, t, t1 );

		_q.fromArray( result ).normalize().toArray( result );

		return result;

	}

}


/*********************************/
/********** INTERNALS ************/
/*********************************/

/* CONSTANTS */

const WEBGL_CONSTANTS = {
	FLOAT: 5126,
	//FLOAT_MAT2: 35674,
	FLOAT_MAT3: 35675,
	FLOAT_MAT4: 35676,
	FLOAT_VEC2: 35664,
	FLOAT_VEC3: 35665,
	FLOAT_VEC4: 35666,
	LINEAR: 9729,
	REPEAT: 10497,
	SAMPLER_2D: 35678,
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	UNSIGNED_BYTE: 5121,
	UNSIGNED_SHORT: 5123
};

const WEBGL_COMPONENT_TYPES = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
};

const WEBGL_FILTERS = {
	9728: external_three_.NearestFilter,
	9729: external_three_.LinearFilter,
	9984: external_three_.NearestMipmapNearestFilter,
	9985: external_three_.LinearMipmapNearestFilter,
	9986: external_three_.NearestMipmapLinearFilter,
	9987: external_three_.LinearMipmapLinearFilter
};

const WEBGL_WRAPPINGS = {
	33071: external_three_.ClampToEdgeWrapping,
	33648: external_three_.MirroredRepeatWrapping,
	10497: external_three_.RepeatWrapping
};

const WEBGL_TYPE_SIZES = {
	'SCALAR': 1,
	'VEC2': 2,
	'VEC3': 3,
	'VEC4': 4,
	'MAT2': 4,
	'MAT3': 9,
	'MAT4': 16
};

const ATTRIBUTES = {
	POSITION: 'position',
	NORMAL: 'normal',
	TANGENT: 'tangent',
	TEXCOORD_0: 'uv',
	TEXCOORD_1: 'uv1',
	TEXCOORD_2: 'uv2',
	TEXCOORD_3: 'uv3',
	COLOR_0: 'color',
	WEIGHTS_0: 'skinWeight',
	JOINTS_0: 'skinIndex',
};

const PATH_PROPERTIES = {
	scale: 'scale',
	translation: 'position',
	rotation: 'quaternion',
	weights: 'morphTargetInfluences'
};

const INTERPOLATION = {
	CUBICSPLINE: undefined, // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
		                        // keyframe track will be initialized with a default interpolation type, then modified.
	LINEAR: external_three_.InterpolateLinear,
	STEP: external_three_.InterpolateDiscrete
};

const ALPHA_MODES = {
	OPAQUE: 'OPAQUE',
	MASK: 'MASK',
	BLEND: 'BLEND'
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
 */
function createDefaultMaterial( cache ) {

	if ( cache[ 'DefaultMaterial' ] === undefined ) {

		cache[ 'DefaultMaterial' ] = new external_three_.MeshStandardMaterial( {
			color: 0xFFFFFF,
			emissive: 0x000000,
			metalness: 1,
			roughness: 1,
			transparent: false,
			depthTest: true,
			side: external_three_.FrontSide
		} );

	}

	return cache[ 'DefaultMaterial' ];

}

function addUnknownExtensionsToUserData( knownExtensions, object, objectDef ) {

	// Add unknown glTF extensions to an object's userData.

	for ( const name in objectDef.extensions ) {

		if ( knownExtensions[ name ] === undefined ) {

			object.userData.gltfExtensions = object.userData.gltfExtensions || {};
			object.userData.gltfExtensions[ name ] = objectDef.extensions[ name ];

		}

	}

}

/**
 * @param {Object3D|Material|BufferGeometry} object
 * @param {GLTF.definition} gltfDef
 */
function assignExtrasToUserData( object, gltfDef ) {

	if ( gltfDef.extras !== undefined ) {

		if ( typeof gltfDef.extras === 'object' ) {

			Object.assign( object.userData, gltfDef.extras );

		} else {

			console.warn( 'THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras );

		}

	}

}

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
 *
 * @param {BufferGeometry} geometry
 * @param {Array<GLTF.Target>} targets
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */
function addMorphTargets( geometry, targets, parser ) {

	let hasMorphPosition = false;
	let hasMorphNormal = false;
	let hasMorphColor = false;

	for ( let i = 0, il = targets.length; i < il; i ++ ) {

		const target = targets[ i ];

		if ( target.POSITION !== undefined ) hasMorphPosition = true;
		if ( target.NORMAL !== undefined ) hasMorphNormal = true;
		if ( target.COLOR_0 !== undefined ) hasMorphColor = true;

		if ( hasMorphPosition && hasMorphNormal && hasMorphColor ) break;

	}

	if ( ! hasMorphPosition && ! hasMorphNormal && ! hasMorphColor ) return Promise.resolve( geometry );

	const pendingPositionAccessors = [];
	const pendingNormalAccessors = [];
	const pendingColorAccessors = [];

	for ( let i = 0, il = targets.length; i < il; i ++ ) {

		const target = targets[ i ];

		if ( hasMorphPosition ) {

			const pendingAccessor = target.POSITION !== undefined
				? parser.getDependency( 'accessor', target.POSITION )
				: geometry.attributes.position;

			pendingPositionAccessors.push( pendingAccessor );

		}

		if ( hasMorphNormal ) {

			const pendingAccessor = target.NORMAL !== undefined
				? parser.getDependency( 'accessor', target.NORMAL )
				: geometry.attributes.normal;

			pendingNormalAccessors.push( pendingAccessor );

		}

		if ( hasMorphColor ) {

			const pendingAccessor = target.COLOR_0 !== undefined
				? parser.getDependency( 'accessor', target.COLOR_0 )
				: geometry.attributes.color;

			pendingColorAccessors.push( pendingAccessor );

		}

	}

	return Promise.all( [
		Promise.all( pendingPositionAccessors ),
		Promise.all( pendingNormalAccessors ),
		Promise.all( pendingColorAccessors )
	] ).then( function ( accessors ) {

		const morphPositions = accessors[ 0 ];
		const morphNormals = accessors[ 1 ];
		const morphColors = accessors[ 2 ];

		if ( hasMorphPosition ) geometry.morphAttributes.position = morphPositions;
		if ( hasMorphNormal ) geometry.morphAttributes.normal = morphNormals;
		if ( hasMorphColor ) geometry.morphAttributes.color = morphColors;
		geometry.morphTargetsRelative = true;

		return geometry;

	} );

}

/**
 * @param {Mesh} mesh
 * @param {GLTF.Mesh} meshDef
 */
function updateMorphTargets( mesh, meshDef ) {

	mesh.updateMorphTargets();

	if ( meshDef.weights !== undefined ) {

		for ( let i = 0, il = meshDef.weights.length; i < il; i ++ ) {

			mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

		}

	}

	// .extras has user-defined data, so check that .extras.targetNames is an array.
	if ( meshDef.extras && Array.isArray( meshDef.extras.targetNames ) ) {

		const targetNames = meshDef.extras.targetNames;

		if ( mesh.morphTargetInfluences.length === targetNames.length ) {

			mesh.morphTargetDictionary = {};

			for ( let i = 0, il = targetNames.length; i < il; i ++ ) {

				mesh.morphTargetDictionary[ targetNames[ i ] ] = i;

			}

		} else {

			console.warn( 'THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.' );

		}

	}

}

function createPrimitiveKey( primitiveDef ) {

	let geometryKey;

	const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ];

	if ( dracoExtension ) {

		geometryKey = 'draco:' + dracoExtension.bufferView
				+ ':' + dracoExtension.indices
				+ ':' + createAttributesKey( dracoExtension.attributes );

	} else {

		geometryKey = primitiveDef.indices + ':' + createAttributesKey( primitiveDef.attributes ) + ':' + primitiveDef.mode;

	}

	if ( primitiveDef.targets !== undefined ) {

		for ( let i = 0, il = primitiveDef.targets.length; i < il; i ++ ) {

			geometryKey += ':' + createAttributesKey( primitiveDef.targets[ i ] );

		}

	}

	return geometryKey;

}

function createAttributesKey( attributes ) {

	let attributesKey = '';

	const keys = Object.keys( attributes ).sort();

	for ( let i = 0, il = keys.length; i < il; i ++ ) {

		attributesKey += keys[ i ] + ':' + attributes[ keys[ i ] ] + ';';

	}

	return attributesKey;

}

function getNormalizedComponentScale( constructor ) {

	// Reference:
	// https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#encoding-quantized-data

	switch ( constructor ) {

		case Int8Array:
			return 1 / 127;

		case Uint8Array:
			return 1 / 255;

		case Int16Array:
			return 1 / 32767;

		case Uint16Array:
			return 1 / 65535;

		default:
			throw new Error( 'THREE.GLTFLoader: Unsupported normalized accessor component type.' );

	}

}

function getImageURIMimeType( uri ) {

	if ( uri.search( /\.jpe?g($|\?)/i ) > 0 || uri.search( /^data\:image\/jpeg/ ) === 0 ) return 'image/jpeg';
	if ( uri.search( /\.webp($|\?)/i ) > 0 || uri.search( /^data\:image\/webp/ ) === 0 ) return 'image/webp';

	return 'image/png';

}

const _identityMatrix = new external_three_.Matrix4();

/* GLTF PARSER */

class GLTFParser {

	constructor( json = {}, options = {} ) {

		this.json = json;
		this.extensions = {};
		this.plugins = {};
		this.options = options;

		// loader object cache
		this.cache = new GLTFRegistry();

		// associations between Three.js objects and glTF elements
		this.associations = new Map();

		// BufferGeometry caching
		this.primitiveCache = {};

		// Node cache
		this.nodeCache = {};

		// Object3D instance caches
		this.meshCache = { refs: {}, uses: {} };
		this.cameraCache = { refs: {}, uses: {} };
		this.lightCache = { refs: {}, uses: {} };

		this.sourceCache = {};
		this.textureCache = {};

		// Track node names, to ensure no duplicates
		this.nodeNamesUsed = {};

		// Use an ImageBitmapLoader if imageBitmaps are supported. Moves much of the
		// expensive work of uploading a texture to the GPU off the main thread.

		let isSafari = false;
		let safariVersion = - 1;
		let isFirefox = false;
		let firefoxVersion = - 1;

		if ( typeof navigator !== 'undefined' ) {

			const userAgent = navigator.userAgent;

			isSafari = /^((?!chrome|android).)*safari/i.test( userAgent ) === true;
			const safariMatch = userAgent.match( /Version\/(\d+)/ );
			safariVersion = isSafari && safariMatch ? parseInt( safariMatch[ 1 ], 10 ) : - 1;

			isFirefox = userAgent.indexOf( 'Firefox' ) > - 1;
			firefoxVersion = isFirefox ? userAgent.match( /Firefox\/([0-9]+)\./ )[ 1 ] : - 1;

		}

		if ( typeof createImageBitmap === 'undefined' || ( isSafari && safariVersion < 17 ) || ( isFirefox && firefoxVersion < 98 ) ) {

			this.textureLoader = new external_three_.TextureLoader( this.options.manager );

		} else {

			this.textureLoader = new external_three_.ImageBitmapLoader( this.options.manager );

		}

		this.textureLoader.setCrossOrigin( this.options.crossOrigin );
		this.textureLoader.setRequestHeader( this.options.requestHeader );

		this.fileLoader = new external_three_.FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

		if ( this.options.crossOrigin === 'use-credentials' ) {

			this.fileLoader.setWithCredentials( true );

		}

	}

	setExtensions( extensions ) {

		this.extensions = extensions;

	}

	setPlugins( plugins ) {

		this.plugins = plugins;

	}

	parse( onLoad, onError ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;

		// Clear the loader cache
		this.cache.removeAll();
		this.nodeCache = {};

		// Mark the special nodes/meshes in json for efficient parse
		this._invokeAll( function ( ext ) {

			return ext._markDefs && ext._markDefs();

		} );

		Promise.all( this._invokeAll( function ( ext ) {

			return ext.beforeRoot && ext.beforeRoot();

		} ) ).then( function () {

			return Promise.all( [

				parser.getDependencies( 'scene' ),
				parser.getDependencies( 'animation' ),
				parser.getDependencies( 'camera' ),

			] );

		} ).then( function ( dependencies ) {

			const result = {
				scene: dependencies[ 0 ][ json.scene || 0 ],
				scenes: dependencies[ 0 ],
				animations: dependencies[ 1 ],
				cameras: dependencies[ 2 ],
				asset: json.asset,
				parser: parser,
				userData: {}
			};

			addUnknownExtensionsToUserData( extensions, result, json );

			assignExtrasToUserData( result, json );

			return Promise.all( parser._invokeAll( function ( ext ) {

				return ext.afterRoot && ext.afterRoot( result );

			} ) ).then( function () {

				for ( const scene of result.scenes ) {

					scene.updateMatrixWorld();

				}

				onLoad( result );

			} );

		} ).catch( onError );

	}

	/**
	 * Marks the special nodes/meshes in json for efficient parse.
	 */
	_markDefs() {

		const nodeDefs = this.json.nodes || [];
		const skinDefs = this.json.skins || [];
		const meshDefs = this.json.meshes || [];

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex ++ ) {

			const joints = skinDefs[ skinIndex ].joints;

			for ( let i = 0, il = joints.length; i < il; i ++ ) {

				nodeDefs[ joints[ i ] ].isBone = true;

			}

		}

		// Iterate over all nodes, marking references to shared resources,
		// as well as skeleton joints.
		for ( let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			const nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				this._addNodeRef( this.meshCache, nodeDef.mesh );

				// Nothing in the mesh definition indicates whether it is
				// a SkinnedMesh or Mesh. Use the node's mesh reference
				// to mark SkinnedMesh if node has skin.
				if ( nodeDef.skin !== undefined ) {

					meshDefs[ nodeDef.mesh ].isSkinnedMesh = true;

				}

			}

			if ( nodeDef.camera !== undefined ) {

				this._addNodeRef( this.cameraCache, nodeDef.camera );

			}

		}

	}

	/**
	 * Counts references to shared node / Object3D resources. These resources
	 * can be reused, or "instantiated", at multiple nodes in the scene
	 * hierarchy. Mesh, Camera, and Light instances are instantiated and must
	 * be marked. Non-scenegraph resources (like Materials, Geometries, and
	 * Textures) can be reused directly and are not marked here.
	 *
	 * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
	 */
	_addNodeRef( cache, index ) {

		if ( index === undefined ) return;

		if ( cache.refs[ index ] === undefined ) {

			cache.refs[ index ] = cache.uses[ index ] = 0;

		}

		cache.refs[ index ] ++;

	}

	/** Returns a reference to a shared resource, cloning it if necessary. */
	_getNodeRef( cache, index, object ) {

		if ( cache.refs[ index ] <= 1 ) return object;

		const ref = object.clone();

		// Propagates mappings to the cloned object, prevents mappings on the
		// original object from being lost.
		const updateMappings = ( original, clone ) => {

			const mappings = this.associations.get( original );
			if ( mappings != null ) {

				this.associations.set( clone, mappings );

			}

			for ( const [ i, child ] of original.children.entries() ) {

				updateMappings( child, clone.children[ i ] );

			}

		};

		updateMappings( object, ref );

		ref.name += '_instance_' + ( cache.uses[ index ] ++ );

		return ref;

	}

	_invokeOne( func ) {

		const extensions = Object.values( this.plugins );
		extensions.push( this );

		for ( let i = 0; i < extensions.length; i ++ ) {

			const result = func( extensions[ i ] );

			if ( result ) return result;

		}

		return null;

	}

	_invokeAll( func ) {

		const extensions = Object.values( this.plugins );
		extensions.unshift( this );

		const pending = [];

		for ( let i = 0; i < extensions.length; i ++ ) {

			const result = func( extensions[ i ] );

			if ( result ) pending.push( result );

		}

		return pending;

	}

	/**
	 * Requests the specified dependency asynchronously, with caching.
	 * @param {string} type
	 * @param {number} index
	 * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
	 */
	getDependency( type, index ) {

		const cacheKey = type + ':' + index;
		let dependency = this.cache.get( cacheKey );

		if ( ! dependency ) {

			switch ( type ) {

				case 'scene':
					dependency = this.loadScene( index );
					break;

				case 'node':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadNode && ext.loadNode( index );

					} );
					break;

				case 'mesh':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadMesh && ext.loadMesh( index );

					} );
					break;

				case 'accessor':
					dependency = this.loadAccessor( index );
					break;

				case 'bufferView':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadBufferView && ext.loadBufferView( index );

					} );
					break;

				case 'buffer':
					dependency = this.loadBuffer( index );
					break;

				case 'material':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadMaterial && ext.loadMaterial( index );

					} );
					break;

				case 'texture':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadTexture && ext.loadTexture( index );

					} );
					break;

				case 'skin':
					dependency = this.loadSkin( index );
					break;

				case 'animation':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadAnimation && ext.loadAnimation( index );

					} );
					break;

				case 'camera':
					dependency = this.loadCamera( index );
					break;

				default:
					dependency = this._invokeOne( function ( ext ) {

						return ext != this && ext.getDependency && ext.getDependency( type, index );

					} );

					if ( ! dependency ) {

						throw new Error( 'Unknown type: ' + type );

					}

					break;

			}

			this.cache.add( cacheKey, dependency );

		}

		return dependency;

	}

	/**
	 * Requests all dependencies of the specified type asynchronously, with caching.
	 * @param {string} type
	 * @return {Promise<Array<Object>>}
	 */
	getDependencies( type ) {

		let dependencies = this.cache.get( type );

		if ( ! dependencies ) {

			const parser = this;
			const defs = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

			dependencies = Promise.all( defs.map( function ( def, index ) {

				return parser.getDependency( type, index );

			} ) );

			this.cache.add( type, dependencies );

		}

		return dependencies;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	loadBuffer( bufferIndex ) {

		const bufferDef = this.json.buffers[ bufferIndex ];
		const loader = this.fileLoader;

		if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

			throw new Error( 'THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

		}

		// If present, GLB container is required to be the first buffer.
		if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

			return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

		}

		const options = this.options;

		return new Promise( function ( resolve, reject ) {

			loader.load( external_three_.LoaderUtils.resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

				reject( new Error( 'THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

			} );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferViewIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	loadBufferView( bufferViewIndex ) {

		const bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			const byteLength = bufferViewDef.byteLength || 0;
			const byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
	 * @param {number} accessorIndex
	 * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
	 */
	loadAccessor( accessorIndex ) {

		const parser = this;
		const json = this.json;

		const accessorDef = this.json.accessors[ accessorIndex ];

		if ( accessorDef.bufferView === undefined && accessorDef.sparse === undefined ) {

			const itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			const TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];
			const normalized = accessorDef.normalized === true;

			const array = new TypedArray( accessorDef.count * itemSize );
			return Promise.resolve( new external_three_.BufferAttribute( array, itemSize, normalized ) );

		}

		const pendingBufferViews = [];

		if ( accessorDef.bufferView !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.bufferView ) );

		} else {

			pendingBufferViews.push( null );

		}

		if ( accessorDef.sparse !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.indices.bufferView ) );
			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.values.bufferView ) );

		}

		return Promise.all( pendingBufferViews ).then( function ( bufferViews ) {

			const bufferView = bufferViews[ 0 ];

			const itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			const TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

			// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
			const elementBytes = TypedArray.BYTES_PER_ELEMENT;
			const itemBytes = elementBytes * itemSize;
			const byteOffset = accessorDef.byteOffset || 0;
			const byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[ accessorDef.bufferView ].byteStride : undefined;
			const normalized = accessorDef.normalized === true;
			let array, bufferAttribute;

			// The buffer is not interleaved if the stride is the item size in bytes.
			if ( byteStride && byteStride !== itemBytes ) {

				// Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
				// This makes sure that IBA.count reflects accessor.count properly
				const ibSlice = Math.floor( byteOffset / byteStride );
				const ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
				let ib = parser.cache.get( ibCacheKey );

				if ( ! ib ) {

					array = new TypedArray( bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					ib = new external_three_.InterleavedBuffer( array, byteStride / elementBytes );

					parser.cache.add( ibCacheKey, ib );

				}

				bufferAttribute = new external_three_.InterleavedBufferAttribute( ib, itemSize, ( byteOffset % byteStride ) / elementBytes, normalized );

			} else {

				if ( bufferView === null ) {

					array = new TypedArray( accessorDef.count * itemSize );

				} else {

					array = new TypedArray( bufferView, byteOffset, accessorDef.count * itemSize );

				}

				bufferAttribute = new external_three_.BufferAttribute( array, itemSize, normalized );

			}

			// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
			if ( accessorDef.sparse !== undefined ) {

				const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
				const TypedArrayIndices = WEBGL_COMPONENT_TYPES[ accessorDef.sparse.indices.componentType ];

				const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
				const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

				const sparseIndices = new TypedArrayIndices( bufferViews[ 1 ], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices );
				const sparseValues = new TypedArray( bufferViews[ 2 ], byteOffsetValues, accessorDef.sparse.count * itemSize );

				if ( bufferView !== null ) {

					// Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
					bufferAttribute = new external_three_.BufferAttribute( bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized );

				}

				for ( let i = 0, il = sparseIndices.length; i < il; i ++ ) {

					const index = sparseIndices[ i ];

					bufferAttribute.setX( index, sparseValues[ i * itemSize ] );
					if ( itemSize >= 2 ) bufferAttribute.setY( index, sparseValues[ i * itemSize + 1 ] );
					if ( itemSize >= 3 ) bufferAttribute.setZ( index, sparseValues[ i * itemSize + 2 ] );
					if ( itemSize >= 4 ) bufferAttribute.setW( index, sparseValues[ i * itemSize + 3 ] );
					if ( itemSize >= 5 ) throw new Error( 'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.' );

				}

			}

			return bufferAttribute;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
	 * @param {number} textureIndex
	 * @return {Promise<THREE.Texture|null>}
	 */
	loadTexture( textureIndex ) {

		const json = this.json;
		const options = this.options;
		const textureDef = json.textures[ textureIndex ];
		const sourceIndex = textureDef.source;
		const sourceDef = json.images[ sourceIndex ];

		let loader = this.textureLoader;

		if ( sourceDef.uri ) {

			const handler = options.manager.getHandler( sourceDef.uri );
			if ( handler !== null ) loader = handler;

		}

		return this.loadTextureImage( textureIndex, sourceIndex, loader );

	}

	loadTextureImage( textureIndex, sourceIndex, loader ) {

		const parser = this;
		const json = this.json;

		const textureDef = json.textures[ textureIndex ];
		const sourceDef = json.images[ sourceIndex ];

		const cacheKey = ( sourceDef.uri || sourceDef.bufferView ) + ':' + textureDef.sampler;

		if ( this.textureCache[ cacheKey ] ) {

			// See https://github.com/mrdoob/three.js/issues/21559.
			return this.textureCache[ cacheKey ];

		}

		const promise = this.loadImageSource( sourceIndex, loader ).then( function ( texture ) {

			texture.flipY = false;

			texture.name = textureDef.name || sourceDef.name || '';

			if ( texture.name === '' && typeof sourceDef.uri === 'string' && sourceDef.uri.startsWith( 'data:image/' ) === false ) {

				texture.name = sourceDef.uri;

			}

			const samplers = json.samplers || {};
			const sampler = samplers[ textureDef.sampler ] || {};

			texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || external_three_.LinearFilter;
			texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || external_three_.LinearMipmapLinearFilter;
			texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || external_three_.RepeatWrapping;
			texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || external_three_.RepeatWrapping;

			parser.associations.set( texture, { textures: textureIndex } );

			return texture;

		} ).catch( function () {

			return null;

		} );

		this.textureCache[ cacheKey ] = promise;

		return promise;

	}

	loadImageSource( sourceIndex, loader ) {

		const parser = this;
		const json = this.json;
		const options = this.options;

		if ( this.sourceCache[ sourceIndex ] !== undefined ) {

			return this.sourceCache[ sourceIndex ].then( ( texture ) => texture.clone() );

		}

		const sourceDef = json.images[ sourceIndex ];

		const URL = self.URL || self.webkitURL;

		let sourceURI = sourceDef.uri || '';
		let isObjectURL = false;

		if ( sourceDef.bufferView !== undefined ) {

			// Load binary image data from bufferView, if provided.

			sourceURI = parser.getDependency( 'bufferView', sourceDef.bufferView ).then( function ( bufferView ) {

				isObjectURL = true;
				const blob = new Blob( [ bufferView ], { type: sourceDef.mimeType } );
				sourceURI = URL.createObjectURL( blob );
				return sourceURI;

			} );

		} else if ( sourceDef.uri === undefined ) {

			throw new Error( 'THREE.GLTFLoader: Image ' + sourceIndex + ' is missing URI and bufferView' );

		}

		const promise = Promise.resolve( sourceURI ).then( function ( sourceURI ) {

			return new Promise( function ( resolve, reject ) {

				let onLoad = resolve;

				if ( loader.isImageBitmapLoader === true ) {

					onLoad = function ( imageBitmap ) {

						const texture = new external_three_.Texture( imageBitmap );
						texture.needsUpdate = true;

						resolve( texture );

					};

				}

				loader.load( external_three_.LoaderUtils.resolveURL( sourceURI, options.path ), onLoad, undefined, reject );

			} );

		} ).then( function ( texture ) {

			// Clean up resources and configure Texture.

			if ( isObjectURL === true ) {

				URL.revokeObjectURL( sourceURI );

			}

			assignExtrasToUserData( texture, sourceDef );

			texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType( sourceDef.uri );

			return texture;

		} ).catch( function ( error ) {

			console.error( 'THREE.GLTFLoader: Couldn\'t load texture', sourceURI );
			throw error;

		} );

		this.sourceCache[ sourceIndex ] = promise;
		return promise;

	}

	/**
	 * Asynchronously assigns a texture to the given material parameters.
	 * @param {Object} materialParams
	 * @param {string} mapName
	 * @param {Object} mapDef
	 * @return {Promise<Texture>}
	 */
	assignTexture( materialParams, mapName, mapDef, colorSpace ) {

		const parser = this;

		return this.getDependency( 'texture', mapDef.index ).then( function ( texture ) {

			if ( ! texture ) return null;

			if ( mapDef.texCoord !== undefined && mapDef.texCoord > 0 ) {

				texture = texture.clone();
				texture.channel = mapDef.texCoord;

			}

			if ( parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] ) {

				const transform = mapDef.extensions !== undefined ? mapDef.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] : undefined;

				if ( transform ) {

					const gltfReference = parser.associations.get( texture );
					texture = parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ].extendTexture( texture, transform );
					parser.associations.set( texture, gltfReference );

				}

			}

			if ( colorSpace !== undefined ) {

				texture.colorSpace = colorSpace;

			}

			materialParams[ mapName ] = texture;

			return texture;

		} );

	}

	/**
	 * Assigns final material to a Mesh, Line, or Points instance. The instance
	 * already has a material (generated from the glTF material options alone)
	 * but reuse of the same glTF material may require multiple threejs materials
	 * to accommodate different primitive types, defines, etc. New materials will
	 * be created if necessary, and reused from a cache.
	 * @param  {Object3D} mesh Mesh, Line, or Points instance.
	 */
	assignFinalMaterial( mesh ) {

		const geometry = mesh.geometry;
		let material = mesh.material;

		const useDerivativeTangents = geometry.attributes.tangent === undefined;
		const useVertexColors = geometry.attributes.color !== undefined;
		const useFlatShading = geometry.attributes.normal === undefined;

		if ( mesh.isPoints ) {

			const cacheKey = 'PointsMaterial:' + material.uuid;

			let pointsMaterial = this.cache.get( cacheKey );

			if ( ! pointsMaterial ) {

				pointsMaterial = new external_three_.PointsMaterial();
				external_three_.Material.prototype.copy.call( pointsMaterial, material );
				pointsMaterial.color.copy( material.color );
				pointsMaterial.map = material.map;
				pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

				this.cache.add( cacheKey, pointsMaterial );

			}

			material = pointsMaterial;

		} else if ( mesh.isLine ) {

			const cacheKey = 'LineBasicMaterial:' + material.uuid;

			let lineMaterial = this.cache.get( cacheKey );

			if ( ! lineMaterial ) {

				lineMaterial = new external_three_.LineBasicMaterial();
				external_three_.Material.prototype.copy.call( lineMaterial, material );
				lineMaterial.color.copy( material.color );
				lineMaterial.map = material.map;

				this.cache.add( cacheKey, lineMaterial );

			}

			material = lineMaterial;

		}

		// Clone the material if it will be modified
		if ( useDerivativeTangents || useVertexColors || useFlatShading ) {

			let cacheKey = 'ClonedMaterial:' + material.uuid + ':';

			if ( useDerivativeTangents ) cacheKey += 'derivative-tangents:';
			if ( useVertexColors ) cacheKey += 'vertex-colors:';
			if ( useFlatShading ) cacheKey += 'flat-shading:';

			let cachedMaterial = this.cache.get( cacheKey );

			if ( ! cachedMaterial ) {

				cachedMaterial = material.clone();

				if ( useVertexColors ) cachedMaterial.vertexColors = true;
				if ( useFlatShading ) cachedMaterial.flatShading = true;

				if ( useDerivativeTangents ) {

					// https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995
					if ( cachedMaterial.normalScale ) cachedMaterial.normalScale.y *= - 1;
					if ( cachedMaterial.clearcoatNormalScale ) cachedMaterial.clearcoatNormalScale.y *= - 1;

				}

				this.cache.add( cacheKey, cachedMaterial );

				this.associations.set( cachedMaterial, this.associations.get( material ) );

			}

			material = cachedMaterial;

		}

		mesh.material = material;

	}

	getMaterialType( /* materialIndex */ ) {

		return external_three_.MeshStandardMaterial;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
	 * @param {number} materialIndex
	 * @return {Promise<Material>}
	 */
	loadMaterial( materialIndex ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;
		const materialDef = json.materials[ materialIndex ];

		let materialType;
		const materialParams = {};
		const materialExtensions = materialDef.extensions || {};

		const pending = [];

		if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ] ) {

			const kmuExtension = extensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ];
			materialType = kmuExtension.getMaterialType();
			pending.push( kmuExtension.extendParams( materialParams, materialDef, parser ) );

		} else {

			// Specification:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

			const metallicRoughness = materialDef.pbrMetallicRoughness || {};

			materialParams.color = new external_three_.Color( 1.0, 1.0, 1.0 );
			materialParams.opacity = 1.0;

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				const array = metallicRoughness.baseColorFactor;

				materialParams.color.setRGB( array[ 0 ], array[ 1 ], array[ 2 ], external_three_.LinearSRGBColorSpace );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture, external_three_.SRGBColorSpace ) );

			}

			materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
			materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

			if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'metalnessMap', metallicRoughness.metallicRoughnessTexture ) );
				pending.push( parser.assignTexture( materialParams, 'roughnessMap', metallicRoughness.metallicRoughnessTexture ) );

			}

			materialType = this._invokeOne( function ( ext ) {

				return ext.getMaterialType && ext.getMaterialType( materialIndex );

			} );

			pending.push( Promise.all( this._invokeAll( function ( ext ) {

				return ext.extendMaterialParams && ext.extendMaterialParams( materialIndex, materialParams );

			} ) ) );

		}

		if ( materialDef.doubleSided === true ) {

			materialParams.side = external_three_.DoubleSide;

		}

		const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

		if ( alphaMode === ALPHA_MODES.BLEND ) {

			materialParams.transparent = true;

			// See: https://github.com/mrdoob/three.js/issues/17706
			materialParams.depthWrite = false;

		} else {

			materialParams.transparent = false;

			if ( alphaMode === ALPHA_MODES.MASK ) {

				materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

			}

		}

		if ( materialDef.normalTexture !== undefined && materialType !== external_three_.MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'normalMap', materialDef.normalTexture ) );

			materialParams.normalScale = new external_three_.Vector2( 1, 1 );

			if ( materialDef.normalTexture.scale !== undefined ) {

				const scale = materialDef.normalTexture.scale;

				materialParams.normalScale.set( scale, scale );

			}

		}

		if ( materialDef.occlusionTexture !== undefined && materialType !== external_three_.MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'aoMap', materialDef.occlusionTexture ) );

			if ( materialDef.occlusionTexture.strength !== undefined ) {

				materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

			}

		}

		if ( materialDef.emissiveFactor !== undefined && materialType !== external_three_.MeshBasicMaterial ) {

			const emissiveFactor = materialDef.emissiveFactor;
			materialParams.emissive = new external_three_.Color().setRGB( emissiveFactor[ 0 ], emissiveFactor[ 1 ], emissiveFactor[ 2 ], external_three_.LinearSRGBColorSpace );

		}

		if ( materialDef.emissiveTexture !== undefined && materialType !== external_three_.MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'emissiveMap', materialDef.emissiveTexture, external_three_.SRGBColorSpace ) );

		}

		return Promise.all( pending ).then( function () {

			const material = new materialType( materialParams );

			if ( materialDef.name ) material.name = materialDef.name;

			assignExtrasToUserData( material, materialDef );

			parser.associations.set( material, { materials: materialIndex } );

			if ( materialDef.extensions ) addUnknownExtensionsToUserData( extensions, material, materialDef );

			return material;

		} );

	}

	/** When Object3D instances are targeted by animation, they need unique names. */
	createUniqueName( originalName ) {

		const sanitizedName = external_three_.PropertyBinding.sanitizeNodeName( originalName || '' );

		if ( sanitizedName in this.nodeNamesUsed ) {

			return sanitizedName + '_' + ( ++ this.nodeNamesUsed[ sanitizedName ] );

		} else {

			this.nodeNamesUsed[ sanitizedName ] = 0;

			return sanitizedName;

		}

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
	 *
	 * Creates BufferGeometries from primitives.
	 *
	 * @param {Array<GLTF.Primitive>} primitives
	 * @return {Promise<Array<BufferGeometry>>}
	 */
	loadGeometries( primitives ) {

		const parser = this;
		const extensions = this.extensions;
		const cache = this.primitiveCache;

		function createDracoPrimitive( primitive ) {

			return extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ]
				.decodePrimitive( primitive, parser )
				.then( function ( geometry ) {

					return addPrimitiveAttributes( geometry, primitive, parser );

				} );

		}

		const pending = [];

		for ( let i = 0, il = primitives.length; i < il; i ++ ) {

			const primitive = primitives[ i ];
			const cacheKey = createPrimitiveKey( primitive );

			// See if we've already created this geometry
			const cached = cache[ cacheKey ];

			if ( cached ) {

				// Use the cached geometry if it exists
				pending.push( cached.promise );

			} else {

				let geometryPromise;

				if ( primitive.extensions && primitive.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ] ) {

					// Use DRACO geometry if available
					geometryPromise = createDracoPrimitive( primitive );

				} else {

					// Otherwise create a new geometry
					geometryPromise = addPrimitiveAttributes( new external_three_.BufferGeometry(), primitive, parser );

				}

				// Cache this geometry
				cache[ cacheKey ] = { primitive: primitive, promise: geometryPromise };

				pending.push( geometryPromise );

			}

		}

		return Promise.all( pending );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
	 * @param {number} meshIndex
	 * @return {Promise<Group|Mesh|SkinnedMesh>}
	 */
	loadMesh( meshIndex ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;

		const meshDef = json.meshes[ meshIndex ];
		const primitives = meshDef.primitives;

		const pending = [];

		for ( let i = 0, il = primitives.length; i < il; i ++ ) {

			const material = primitives[ i ].material === undefined
				? createDefaultMaterial( this.cache )
				: this.getDependency( 'material', primitives[ i ].material );

			pending.push( material );

		}

		pending.push( parser.loadGeometries( primitives ) );

		return Promise.all( pending ).then( function ( results ) {

			const materials = results.slice( 0, results.length - 1 );
			const geometries = results[ results.length - 1 ];

			const meshes = [];

			for ( let i = 0, il = geometries.length; i < il; i ++ ) {

				const geometry = geometries[ i ];
				const primitive = primitives[ i ];

				// 1. create Mesh

				let mesh;

				const material = materials[ i ];

				if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
						primitive.mode === undefined ) {

					// .isSkinnedMesh isn't in glTF spec. See ._markDefs()
					mesh = meshDef.isSkinnedMesh === true
						? new external_three_.SkinnedMesh( geometry, material )
						: new external_three_.Mesh( geometry, material );

					if ( mesh.isSkinnedMesh === true ) {

						// normalize skin weights to fix malformed assets (see #15319)
						mesh.normalizeSkinWeights();

					}

					if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, external_three_.TriangleStripDrawMode );

					} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, external_three_.TriangleFanDrawMode );

					}

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

					mesh = new external_three_.LineSegments( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

					mesh = new external_three_.Line( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

					mesh = new external_three_.LineLoop( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

					mesh = new external_three_.Points( geometry, material );

				} else {

					throw new Error( 'THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode );

				}

				if ( Object.keys( mesh.geometry.morphAttributes ).length > 0 ) {

					updateMorphTargets( mesh, meshDef );

				}

				mesh.name = parser.createUniqueName( meshDef.name || ( 'mesh_' + meshIndex ) );

				assignExtrasToUserData( mesh, meshDef );

				if ( primitive.extensions ) addUnknownExtensionsToUserData( extensions, mesh, primitive );

				parser.assignFinalMaterial( mesh );

				meshes.push( mesh );

			}

			for ( let i = 0, il = meshes.length; i < il; i ++ ) {

				parser.associations.set( meshes[ i ], {
					meshes: meshIndex,
					primitives: i
				} );

			}

			if ( meshes.length === 1 ) {

				if ( meshDef.extensions ) addUnknownExtensionsToUserData( extensions, meshes[ 0 ], meshDef );

				return meshes[ 0 ];

			}

			const group = new external_three_.Group();

			if ( meshDef.extensions ) addUnknownExtensionsToUserData( extensions, group, meshDef );

			parser.associations.set( group, { meshes: meshIndex } );

			for ( let i = 0, il = meshes.length; i < il; i ++ ) {

				group.add( meshes[ i ] );

			}

			return group;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
	 * @param {number} cameraIndex
	 * @return {Promise<THREE.Camera>}
	 */
	loadCamera( cameraIndex ) {

		let camera;
		const cameraDef = this.json.cameras[ cameraIndex ];
		const params = cameraDef[ cameraDef.type ];

		if ( ! params ) {

			console.warn( 'THREE.GLTFLoader: Missing camera parameters.' );
			return;

		}

		if ( cameraDef.type === 'perspective' ) {

			camera = new external_three_.PerspectiveCamera( external_three_.MathUtils.radToDeg( params.yfov ), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new external_three_.OrthographicCamera( - params.xmag, params.xmag, params.ymag, - params.ymag, params.znear, params.zfar );

		}

		if ( cameraDef.name ) camera.name = this.createUniqueName( cameraDef.name );

		assignExtrasToUserData( camera, cameraDef );

		return Promise.resolve( camera );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
	 * @param {number} skinIndex
	 * @return {Promise<Skeleton>}
	 */
	loadSkin( skinIndex ) {

		const skinDef = this.json.skins[ skinIndex ];

		const pending = [];

		for ( let i = 0, il = skinDef.joints.length; i < il; i ++ ) {

			pending.push( this._loadNodeShallow( skinDef.joints[ i ] ) );

		}

		if ( skinDef.inverseBindMatrices !== undefined ) {

			pending.push( this.getDependency( 'accessor', skinDef.inverseBindMatrices ) );

		} else {

			pending.push( null );

		}

		return Promise.all( pending ).then( function ( results ) {

			const inverseBindMatrices = results.pop();
			const jointNodes = results;

			// Note that bones (joint nodes) may or may not be in the
			// scene graph at this time.

			const bones = [];
			const boneInverses = [];

			for ( let i = 0, il = jointNodes.length; i < il; i ++ ) {

				const jointNode = jointNodes[ i ];

				if ( jointNode ) {

					bones.push( jointNode );

					const mat = new external_three_.Matrix4();

					if ( inverseBindMatrices !== null ) {

						mat.fromArray( inverseBindMatrices.array, i * 16 );

					}

					boneInverses.push( mat );

				} else {

					console.warn( 'THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[ i ] );

				}

			}

			return new external_three_.Skeleton( bones, boneInverses );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
	 * @param {number} animationIndex
	 * @return {Promise<AnimationClip>}
	 */
	loadAnimation( animationIndex ) {

		const json = this.json;
		const parser = this;

		const animationDef = json.animations[ animationIndex ];
		const animationName = animationDef.name ? animationDef.name : 'animation_' + animationIndex;

		const pendingNodes = [];
		const pendingInputAccessors = [];
		const pendingOutputAccessors = [];
		const pendingSamplers = [];
		const pendingTargets = [];

		for ( let i = 0, il = animationDef.channels.length; i < il; i ++ ) {

			const channel = animationDef.channels[ i ];
			const sampler = animationDef.samplers[ channel.sampler ];
			const target = channel.target;
			const name = target.node;
			const input = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.input ] : sampler.input;
			const output = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.output ] : sampler.output;

			if ( target.node === undefined ) continue;

			pendingNodes.push( this.getDependency( 'node', name ) );
			pendingInputAccessors.push( this.getDependency( 'accessor', input ) );
			pendingOutputAccessors.push( this.getDependency( 'accessor', output ) );
			pendingSamplers.push( sampler );
			pendingTargets.push( target );

		}

		return Promise.all( [

			Promise.all( pendingNodes ),
			Promise.all( pendingInputAccessors ),
			Promise.all( pendingOutputAccessors ),
			Promise.all( pendingSamplers ),
			Promise.all( pendingTargets )

		] ).then( function ( dependencies ) {

			const nodes = dependencies[ 0 ];
			const inputAccessors = dependencies[ 1 ];
			const outputAccessors = dependencies[ 2 ];
			const samplers = dependencies[ 3 ];
			const targets = dependencies[ 4 ];

			const tracks = [];

			for ( let i = 0, il = nodes.length; i < il; i ++ ) {

				const node = nodes[ i ];
				const inputAccessor = inputAccessors[ i ];
				const outputAccessor = outputAccessors[ i ];
				const sampler = samplers[ i ];
				const target = targets[ i ];

				if ( node === undefined ) continue;

				if ( node.updateMatrix ) {

					node.updateMatrix();

				}

				const createdTracks = parser._createAnimationTracks( node, inputAccessor, outputAccessor, sampler, target );

				if ( createdTracks ) {

					for ( let k = 0; k < createdTracks.length; k ++ ) {

						tracks.push( createdTracks[ k ] );

					}

				}

			}

			return new external_three_.AnimationClip( animationName, undefined, tracks );

		} );

	}

	createNodeMesh( nodeIndex ) {

		const json = this.json;
		const parser = this;
		const nodeDef = json.nodes[ nodeIndex ];

		if ( nodeDef.mesh === undefined ) return null;

		return parser.getDependency( 'mesh', nodeDef.mesh ).then( function ( mesh ) {

			const node = parser._getNodeRef( parser.meshCache, nodeDef.mesh, mesh );

			// if weights are provided on the node, override weights on the mesh.
			if ( nodeDef.weights !== undefined ) {

				node.traverse( function ( o ) {

					if ( ! o.isMesh ) return;

					for ( let i = 0, il = nodeDef.weights.length; i < il; i ++ ) {

						o.morphTargetInfluences[ i ] = nodeDef.weights[ i ];

					}

				} );

			}

			return node;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
	 * @param {number} nodeIndex
	 * @return {Promise<Object3D>}
	 */
	loadNode( nodeIndex ) {

		const json = this.json;
		const parser = this;

		const nodeDef = json.nodes[ nodeIndex ];

		const nodePending = parser._loadNodeShallow( nodeIndex );

		const childPending = [];
		const childrenDef = nodeDef.children || [];

		for ( let i = 0, il = childrenDef.length; i < il; i ++ ) {

			childPending.push( parser.getDependency( 'node', childrenDef[ i ] ) );

		}

		const skeletonPending = nodeDef.skin === undefined
			? Promise.resolve( null )
			: parser.getDependency( 'skin', nodeDef.skin );

		return Promise.all( [
			nodePending,
			Promise.all( childPending ),
			skeletonPending
		] ).then( function ( results ) {

			const node = results[ 0 ];
			const children = results[ 1 ];
			const skeleton = results[ 2 ];

			if ( skeleton !== null ) {

				// This full traverse should be fine because
				// child glTF nodes have not been added to this node yet.
				node.traverse( function ( mesh ) {

					if ( ! mesh.isSkinnedMesh ) return;

					mesh.bind( skeleton, _identityMatrix );

				} );

			}

			for ( let i = 0, il = children.length; i < il; i ++ ) {

				node.add( children[ i ] );

			}

			return node;

		} );

	}

	// ._loadNodeShallow() parses a single node.
	// skin and child nodes are created and added in .loadNode() (no '_' prefix).
	_loadNodeShallow( nodeIndex ) {

		const json = this.json;
		const extensions = this.extensions;
		const parser = this;

		// This method is called from .loadNode() and .loadSkin().
		// Cache a node to avoid duplication.

		if ( this.nodeCache[ nodeIndex ] !== undefined ) {

			return this.nodeCache[ nodeIndex ];

		}

		const nodeDef = json.nodes[ nodeIndex ];

		// reserve node's name before its dependencies, so the root has the intended name.
		const nodeName = nodeDef.name ? parser.createUniqueName( nodeDef.name ) : '';

		const pending = [];

		const meshPromise = parser._invokeOne( function ( ext ) {

			return ext.createNodeMesh && ext.createNodeMesh( nodeIndex );

		} );

		if ( meshPromise ) {

			pending.push( meshPromise );

		}

		if ( nodeDef.camera !== undefined ) {

			pending.push( parser.getDependency( 'camera', nodeDef.camera ).then( function ( camera ) {

				return parser._getNodeRef( parser.cameraCache, nodeDef.camera, camera );

			} ) );

		}

		parser._invokeAll( function ( ext ) {

			return ext.createNodeAttachment && ext.createNodeAttachment( nodeIndex );

		} ).forEach( function ( promise ) {

			pending.push( promise );

		} );

		this.nodeCache[ nodeIndex ] = Promise.all( pending ).then( function ( objects ) {

			let node;

			// .isBone isn't in glTF spec. See ._markDefs
			if ( nodeDef.isBone === true ) {

				node = new external_three_.Bone();

			} else if ( objects.length > 1 ) {

				node = new external_three_.Group();

			} else if ( objects.length === 1 ) {

				node = objects[ 0 ];

			} else {

				node = new external_three_.Object3D();

			}

			if ( node !== objects[ 0 ] ) {

				for ( let i = 0, il = objects.length; i < il; i ++ ) {

					node.add( objects[ i ] );

				}

			}

			if ( nodeDef.name ) {

				node.userData.name = nodeDef.name;
				node.name = nodeName;

			}

			assignExtrasToUserData( node, nodeDef );

			if ( nodeDef.extensions ) addUnknownExtensionsToUserData( extensions, node, nodeDef );

			if ( nodeDef.matrix !== undefined ) {

				const matrix = new external_three_.Matrix4();
				matrix.fromArray( nodeDef.matrix );
				node.applyMatrix4( matrix );

			} else {

				if ( nodeDef.translation !== undefined ) {

					node.position.fromArray( nodeDef.translation );

				}

				if ( nodeDef.rotation !== undefined ) {

					node.quaternion.fromArray( nodeDef.rotation );

				}

				if ( nodeDef.scale !== undefined ) {

					node.scale.fromArray( nodeDef.scale );

				}

			}

			if ( ! parser.associations.has( node ) ) {

				parser.associations.set( node, {} );

			}

			parser.associations.get( node ).nodes = nodeIndex;

			return node;

		} );

		return this.nodeCache[ nodeIndex ];

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
	 * @param {number} sceneIndex
	 * @return {Promise<Group>}
	 */
	loadScene( sceneIndex ) {

		const extensions = this.extensions;
		const sceneDef = this.json.scenes[ sceneIndex ];
		const parser = this;

		// Loader returns Group, not Scene.
		// See: https://github.com/mrdoob/three.js/issues/18342#issuecomment-578981172
		const scene = new external_three_.Group();
		if ( sceneDef.name ) scene.name = parser.createUniqueName( sceneDef.name );

		assignExtrasToUserData( scene, sceneDef );

		if ( sceneDef.extensions ) addUnknownExtensionsToUserData( extensions, scene, sceneDef );

		const nodeIds = sceneDef.nodes || [];

		const pending = [];

		for ( let i = 0, il = nodeIds.length; i < il; i ++ ) {

			pending.push( parser.getDependency( 'node', nodeIds[ i ] ) );

		}

		return Promise.all( pending ).then( function ( nodes ) {

			for ( let i = 0, il = nodes.length; i < il; i ++ ) {

				scene.add( nodes[ i ] );

			}

			// Removes dangling associations, associations that reference a node that
			// didn't make it into the scene.
			const reduceAssociations = ( node ) => {

				const reducedAssociations = new Map();

				for ( const [ key, value ] of parser.associations ) {

					if ( key instanceof external_three_.Material || key instanceof external_three_.Texture ) {

						reducedAssociations.set( key, value );

					}

				}

				node.traverse( ( node ) => {

					const mappings = parser.associations.get( node );

					if ( mappings != null ) {

						reducedAssociations.set( node, mappings );

					}

				} );

				return reducedAssociations;

			};

			parser.associations = reduceAssociations( scene );

			return scene;

		} );

	}

	_createAnimationTracks( node, inputAccessor, outputAccessor, sampler, target ) {

		const tracks = [];

		const targetName = node.name ? node.name : node.uuid;
		const targetNames = [];

		if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

			node.traverse( function ( object ) {

				if ( object.morphTargetInfluences ) {

					targetNames.push( object.name ? object.name : object.uuid );

				}

			} );

		} else {

			targetNames.push( targetName );

		}

		let TypedKeyframeTrack;

		switch ( PATH_PROPERTIES[ target.path ] ) {

			case PATH_PROPERTIES.weights:

				TypedKeyframeTrack = external_three_.NumberKeyframeTrack;
				break;

			case PATH_PROPERTIES.rotation:

				TypedKeyframeTrack = external_three_.QuaternionKeyframeTrack;
				break;

			case PATH_PROPERTIES.position:
			case PATH_PROPERTIES.scale:

				TypedKeyframeTrack = external_three_.VectorKeyframeTrack;
				break;

			default:

				switch ( outputAccessor.itemSize ) {

					case 1:
						TypedKeyframeTrack = external_three_.NumberKeyframeTrack;
						break;
					case 2:
					case 3:
					default:
						TypedKeyframeTrack = external_three_.VectorKeyframeTrack;
						break;

				}

				break;

		}

		const interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : external_three_.InterpolateLinear;


		const outputArray = this._getArrayFromAccessor( outputAccessor );

		for ( let j = 0, jl = targetNames.length; j < jl; j ++ ) {

			const track = new TypedKeyframeTrack(
				targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
				inputAccessor.array,
				outputArray,
				interpolation
			);

			// Override interpolation with custom factory method.
			if ( sampler.interpolation === 'CUBICSPLINE' ) {

				this._createCubicSplineTrackInterpolant( track );

			}

			tracks.push( track );

		}

		return tracks;

	}

	_getArrayFromAccessor( accessor ) {

		let outputArray = accessor.array;

		if ( accessor.normalized ) {

			const scale = getNormalizedComponentScale( outputArray.constructor );
			const scaled = new Float32Array( outputArray.length );

			for ( let j = 0, jl = outputArray.length; j < jl; j ++ ) {

				scaled[ j ] = outputArray[ j ] * scale;

			}

			outputArray = scaled;

		}

		return outputArray;

	}

	_createCubicSplineTrackInterpolant( track ) {

		track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline( result ) {

			// A CUBICSPLINE keyframe in glTF has three output values for each input value,
			// representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
			// must be divided by three to get the interpolant's sampleSize argument.

			const interpolantType = ( this instanceof external_three_.QuaternionKeyframeTrack ) ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;

			return new interpolantType( this.times, this.values, this.getValueSize() / 3, result );

		};

		// Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.
		track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;

	}

}

/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 */
function computeBounds( geometry, primitiveDef, parser ) {

	const attributes = primitiveDef.attributes;

	const box = new external_three_.Box3();

	if ( attributes.POSITION !== undefined ) {

		const accessor = parser.json.accessors[ attributes.POSITION ];

		const min = accessor.min;
		const max = accessor.max;

		// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

		if ( min !== undefined && max !== undefined ) {

			box.set(
				new external_three_.Vector3( min[ 0 ], min[ 1 ], min[ 2 ] ),
				new external_three_.Vector3( max[ 0 ], max[ 1 ], max[ 2 ] )
			);

			if ( accessor.normalized ) {

				const boxScale = getNormalizedComponentScale( WEBGL_COMPONENT_TYPES[ accessor.componentType ] );
				box.min.multiplyScalar( boxScale );
				box.max.multiplyScalar( boxScale );

			}

		} else {

			console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

			return;

		}

	} else {

		return;

	}

	const targets = primitiveDef.targets;

	if ( targets !== undefined ) {

		const maxDisplacement = new external_three_.Vector3();
		const vector = new external_three_.Vector3();

		for ( let i = 0, il = targets.length; i < il; i ++ ) {

			const target = targets[ i ];

			if ( target.POSITION !== undefined ) {

				const accessor = parser.json.accessors[ target.POSITION ];
				const min = accessor.min;
				const max = accessor.max;

				// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

				if ( min !== undefined && max !== undefined ) {

					// we need to get max of absolute components because target weight is [-1,1]
					vector.setX( Math.max( Math.abs( min[ 0 ] ), Math.abs( max[ 0 ] ) ) );
					vector.setY( Math.max( Math.abs( min[ 1 ] ), Math.abs( max[ 1 ] ) ) );
					vector.setZ( Math.max( Math.abs( min[ 2 ] ), Math.abs( max[ 2 ] ) ) );


					if ( accessor.normalized ) {

						const boxScale = getNormalizedComponentScale( WEBGL_COMPONENT_TYPES[ accessor.componentType ] );
						vector.multiplyScalar( boxScale );

					}

					// Note: this assumes that the sum of all weights is at most 1. This isn't quite correct - it's more conservative
					// to assume that each target can have a max weight of 1. However, for some use cases - notably, when morph targets
					// are used to implement key-frame animations and as such only two are active at a time - this results in very large
					// boxes. So for now we make a box that's sometimes a touch too small but is hopefully mostly of reasonable size.
					maxDisplacement.max( vector );

				} else {

					console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

				}

			}

		}

		// As per comment above this box isn't conservative, but has a reasonable size for a very large number of morph targets.
		box.expandByVector( maxDisplacement );

	}

	geometry.boundingBox = box;

	const sphere = new external_three_.Sphere();

	box.getCenter( sphere.center );
	sphere.radius = box.min.distanceTo( box.max ) / 2;

	geometry.boundingSphere = sphere;

}

/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */
function addPrimitiveAttributes( geometry, primitiveDef, parser ) {

	const attributes = primitiveDef.attributes;

	const pending = [];

	function assignAttributeAccessor( accessorIndex, attributeName ) {

		return parser.getDependency( 'accessor', accessorIndex )
			.then( function ( accessor ) {

				geometry.setAttribute( attributeName, accessor );

			} );

	}

	for ( const gltfAttributeName in attributes ) {

		const threeAttributeName = ATTRIBUTES[ gltfAttributeName ] || gltfAttributeName.toLowerCase();

		// Skip attributes already provided by e.g. Draco extension.
		if ( threeAttributeName in geometry.attributes ) continue;

		pending.push( assignAttributeAccessor( attributes[ gltfAttributeName ], threeAttributeName ) );

	}

	if ( primitiveDef.indices !== undefined && ! geometry.index ) {

		const accessor = parser.getDependency( 'accessor', primitiveDef.indices ).then( function ( accessor ) {

			geometry.setIndex( accessor );

		} );

		pending.push( accessor );

	}

	if ( external_three_.ColorManagement.workingColorSpace !== external_three_.LinearSRGBColorSpace && 'COLOR_0' in attributes ) {

		console.warn( `THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${external_three_.ColorManagement.workingColorSpace}" not supported.` );

	}

	assignExtrasToUserData( geometry, primitiveDef );

	computeBounds( geometry, primitiveDef, parser );

	return Promise.all( pending ).then( function () {

		return primitiveDef.targets !== undefined
			? addMorphTargets( geometry, primitiveDef.targets, parser )
			: geometry;

	} );

}



;// ./node_modules/3d-tiles-renderer/build/index.core.js





class index_core_x extends y {
  /**
   * Parses an I3DM buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ version: string, featureTable: FeatureTable, batchTable: BatchTable, glbBytes: Uint8Array, gltfWorkingPath: string }>}
   */
  parse(t) {
    const e = new DataView(t), L = LoaderBase_ATuDWTDB_d(e);
    console.assert(L === "i3dm");
    const i = e.getUint32(4, !0);
    console.assert(i === 1);
    const u = e.getUint32(8, !0);
    console.assert(u === t.byteLength);
    const n = e.getUint32(12, !0), a = e.getUint32(16, !0), s = e.getUint32(20, !0), r = e.getUint32(24, !0), o = e.getUint32(28, !0), l = 32, g = t.slice(
      l,
      l + n + a
    ), c = new oe(
      g,
      0,
      n,
      a
    ), h = l + n + a, y = t.slice(
      h,
      h + s + r
    ), E = new we(
      y,
      c.getData("INSTANCES_LENGTH"),
      0,
      s,
      r
    ), m = h + s + r, S = new Uint8Array(t, m, u - m);
    let B = null, U = null, D = null;
    if (o)
      B = S, U = Promise.resolve();
    else {
      const d = this.resolveExternalURL(f(S));
      D = LoaderBase_ATuDWTDB_c(d), U = fetch(d, this.fetchOptions).then((T) => {
        if (!T.ok)
          throw new Error(`I3DMLoaderBase : Failed to load file "${d}" with status ${T.status} : ${T.statusText}`);
        return T.arrayBuffer();
      }).then((T) => {
        B = new Uint8Array(T);
      });
    }
    return U.then(() => ({
      version: i,
      featureTable: c,
      batchTable: E,
      glbBytes: B,
      gltfWorkingPath: D
    }));
  }
}
class index_core_G extends y {
  /**
   * Parses a PNTS buffer and returns the raw tile data.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ version: string, featureTable: FeatureTable, batchTable: BatchTable }>}
   */
  parse(t) {
    const e = new DataView(t), L = LoaderBase_ATuDWTDB_d(e);
    console.assert(L === "pnts");
    const i = e.getUint32(4, !0);
    console.assert(i === 1);
    const u = e.getUint32(8, !0);
    console.assert(u === t.byteLength);
    const n = e.getUint32(12, !0), a = e.getUint32(16, !0), s = e.getUint32(20, !0), r = e.getUint32(24, !0), o = 28, l = t.slice(
      o,
      o + n + a
    ), g = new oe(
      l,
      0,
      n,
      a
    ), c = o + n + a, h = t.slice(
      c,
      c + s + r
    ), y = new we(
      h,
      g.getData("BATCH_LENGTH") || g.getData("POINTS_LENGTH"),
      0,
      s,
      r
    );
    return Promise.resolve({
      version: i,
      featureTable: g,
      batchTable: y
    });
  }
}
class index_core_M extends y {
  /**
   * Parses a CMPT buffer and returns an object containing each inner tile's type and raw buffer.
   * @param {ArrayBuffer} buffer
   * @returns {{ version: string, tiles: Array<{ type: string, buffer: Uint8Array, version: number }> }}
   */
  parse(t) {
    const e = new DataView(t), L = LoaderBase_ATuDWTDB_d(e);
    console.assert(L === "cmpt", 'CMPTLoader: The magic bytes equal "cmpt".');
    const i = e.getUint32(4, !0);
    console.assert(i === 1, 'CMPTLoader: The version listed in the header is "1".');
    const u = e.getUint32(8, !0);
    console.assert(u === t.byteLength, "CMPTLoader: The contents buffer length listed in the header matches the file.");
    const n = e.getUint32(12, !0), a = [];
    let s = 16;
    for (let r = 0; r < n; r++) {
      const o = new DataView(t, s, 12), l = LoaderBase_ATuDWTDB_d(o), g = o.getUint32(4, !0), c = o.getUint32(8, !0), h = new Uint8Array(t, s, c);
      a.push({
        type: l,
        buffer: h,
        version: g
      }), s += c;
    }
    return {
      version: i,
      tiles: a
    };
  }
}

//# sourceMappingURL=index.core.js.map

;// ./node_modules/3d-tiles-renderer/build/MemoryUtils-DdeKsIT5.js



const MemoryUtils_DdeKsIT5_b = /* @__PURE__ */ new external_three_.Spherical(), st = /* @__PURE__ */ new external_three_.Vector3(), Rt = {};
function ft(c) {
  const { x: t, y: i, z: e } = c;
  c.x = e, c.y = t, c.z = i;
}
function bt(c) {
  const { x: t, y: i, z: e } = c;
  c.z = t, c.x = i, c.y = e;
}
function Mt(c) {
  return -(c - Math.PI / 2);
}
function MemoryUtils_DdeKsIT5_K(c) {
  return -c + Math.PI / 2;
}
function At(c, t, i = {}) {
  return MemoryUtils_DdeKsIT5_b.theta = t, MemoryUtils_DdeKsIT5_b.phi = MemoryUtils_DdeKsIT5_K(c), st.setFromSpherical(MemoryUtils_DdeKsIT5_b), MemoryUtils_DdeKsIT5_b.setFromVector3(st), i.lat = Mt(MemoryUtils_DdeKsIT5_b.phi), i.lon = MemoryUtils_DdeKsIT5_b.theta, i;
}
function nt(c, t = "E", i = "W") {
  const e = c < 0 ? i : t;
  c = Math.abs(c);
  const o = ~~c, s = (c - o) * 60, n = ~~s, l = ~~((s - n) * 60);
  return `${o}° ${n}' ${l}" ${e}`;
}
function vt(c, t, i = !1) {
  const e = At(c, t, Rt);
  let o, s;
  return i ? (o = `${(external_three_.MathUtils.RAD2DEG * e.lat).toFixed(4)}°`, s = `${(external_three_.MathUtils.RAD2DEG * e.lon).toFixed(4)}°`) : (o = nt(external_three_.MathUtils.RAD2DEG * e.lat, "N", "S"), s = nt(external_three_.MathUtils.RAD2DEG * e.lon, "E", "W")), `${o} ${s}`;
}
const jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  latitudeToSphericalPhi: MemoryUtils_DdeKsIT5_K,
  sphericalPhiToLatitude: Mt,
  swapToGeoFrame: ft,
  swapToThreeFrame: bt,
  toLatLonString: vt
}, Symbol.toStringTag, { value: "Module" })), rt = /* @__PURE__ */ new external_three_.Spherical(), MemoryUtils_DdeKsIT5_z = /* @__PURE__ */ new external_three_.Vector3(), d = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_V = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_P = /* @__PURE__ */ new external_three_.Matrix4(), MemoryUtils_DdeKsIT5_S = /* @__PURE__ */ new external_three_.Matrix4(), at = /* @__PURE__ */ new external_three_.Matrix4(), MemoryUtils_DdeKsIT5_W = /* @__PURE__ */ new external_three_.Sphere(), MemoryUtils_DdeKsIT5_x = /* @__PURE__ */ new external_three_.Euler(), lt = /* @__PURE__ */ new external_three_.Vector3(), ct = /* @__PURE__ */ new external_three_.Vector3(), ht = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_ = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_O = /* @__PURE__ */ new external_three_.Ray(), Nt = 1e-12, Bt = 0.1, MemoryUtils_DdeKsIT5_q = 0, pt = 1, MemoryUtils_DdeKsIT5_U = 2;
class Pt {
  constructor(t = 1, i = 1, e = 1) {
    this.name = "", this.radius = new external_three_.Vector3(t, i, e);
  }
  /**
   * Returns the point where the given ray intersects the ellipsoid surface, or null if no
   * intersection exists. Writes the result into `target`.
   * @param {Ray} ray
   * @param {Vector3} target
   * @returns {Vector3|null}
   */
  intersectRay(t, i) {
    return MemoryUtils_DdeKsIT5_P.makeScale(...this.radius).invert(), MemoryUtils_DdeKsIT5_W.center.set(0, 0, 0), MemoryUtils_DdeKsIT5_W.radius = 1, MemoryUtils_DdeKsIT5_O.copy(t).applyMatrix4(MemoryUtils_DdeKsIT5_P), MemoryUtils_DdeKsIT5_O.intersectSphere(MemoryUtils_DdeKsIT5_W, i) ? (MemoryUtils_DdeKsIT5_P.makeScale(...this.radius), i.applyMatrix4(MemoryUtils_DdeKsIT5_P), i) : null;
  }
  /**
   * Returns a Matrix4 representing the East-North-Up (ENU) frame at the given geographic
   * position: X points east, Y points north, Z points up. Writes the result into `target`.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {Matrix4} target
   * @returns {Matrix4}
   */
  getEastNorthUpFrame(t, i, e, o) {
    return e.isMatrix4 && (o = e, e = 0, console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')), this.getEastNorthUpAxes(t, i, lt, ct, ht), this.getCartographicToPosition(t, i, e, MemoryUtils_DdeKsIT5_), o.makeBasis(lt, ct, ht).setPosition(MemoryUtils_DdeKsIT5_);
  }
  /**
   * Returns a Matrix4 representing the ENU frame at the given position, rotated by the given
   * azimuth, elevation, and roll. Equivalent to `getObjectFrame` with `ENU_FRAME`.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {number} az Azimuth in radians, measured from true north towards east.
   * @param {number} el Elevation in radians, measured from the horizon upward.
   * @param {number} roll Roll in radians around the north axis.
   * @param {Matrix4} target
   * @returns {Matrix4}
   */
  getOrientedEastNorthUpFrame(t, i, e, o, s, n, r) {
    return this.getObjectFrame(t, i, e, o, s, n, r, MemoryUtils_DdeKsIT5_q);
  }
  /**
   * Returns a Matrix4 representing a frame at the given geographic position, rotated by the
   * given azimuth, elevation, and roll, and adjusted to match the three.js `frame` convention.
   * `OBJECT_FRAME` orients with "+Y" up and "+Z" forward; `CAMERA_FRAME` orients with "+Y" up
   * and "-Z" forward; `ENU_FRAME` returns the raw ENU-relative rotation.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {number} az Azimuth in radians, measured from true north towards east.
   * @param {number} el Elevation in radians, measured from the horizon upward.
   * @param {number} roll Roll in radians around the north axis.
   * @param {Matrix4} target
   * @param {Frames} [frame=OBJECT_FRAME]
   * @returns {Matrix4}
   */
  getObjectFrame(t, i, e, o, s, n, r, l = MemoryUtils_DdeKsIT5_U) {
    return this.getEastNorthUpFrame(t, i, e, MemoryUtils_DdeKsIT5_P), MemoryUtils_DdeKsIT5_x.set(s, n, -o, "ZXY"), r.makeRotationFromEuler(MemoryUtils_DdeKsIT5_x).premultiply(MemoryUtils_DdeKsIT5_P), l === pt ? (MemoryUtils_DdeKsIT5_x.set(Math.PI / 2, 0, 0, "XYZ"), MemoryUtils_DdeKsIT5_S.makeRotationFromEuler(MemoryUtils_DdeKsIT5_x), r.multiply(MemoryUtils_DdeKsIT5_S)) : l === MemoryUtils_DdeKsIT5_U && (MemoryUtils_DdeKsIT5_x.set(-Math.PI / 2, 0, Math.PI, "XYZ"), MemoryUtils_DdeKsIT5_S.makeRotationFromEuler(MemoryUtils_DdeKsIT5_x), r.multiply(MemoryUtils_DdeKsIT5_S)), r;
  }
  /**
   * Extracts geographic position and orientation (lat, lon, height, azimuth, elevation, roll)
   * from the given object/camera frame matrix. The inverse of `getObjectFrame`. Writes the
   * result into `target` and returns it.
   * @param {Matrix4} matrix
   * @param {Object} target
   * @param {Frames} [frame=OBJECT_FRAME]
   * @returns {{ lat: number, lon: number, height: number, azimuth: number, elevation: number, roll: number }}
   */
  getCartographicFromObjectFrame(t, i, e = MemoryUtils_DdeKsIT5_U) {
    return e === pt ? (MemoryUtils_DdeKsIT5_x.set(-Math.PI / 2, 0, 0, "XYZ"), MemoryUtils_DdeKsIT5_S.makeRotationFromEuler(MemoryUtils_DdeKsIT5_x).premultiply(t)) : e === MemoryUtils_DdeKsIT5_U ? (MemoryUtils_DdeKsIT5_x.set(-Math.PI / 2, 0, Math.PI, "XYZ"), MemoryUtils_DdeKsIT5_S.makeRotationFromEuler(MemoryUtils_DdeKsIT5_x).premultiply(t)) : MemoryUtils_DdeKsIT5_S.copy(t), MemoryUtils_DdeKsIT5_.setFromMatrixPosition(MemoryUtils_DdeKsIT5_S), this.getPositionToCartographic(MemoryUtils_DdeKsIT5_, i), this.getEastNorthUpFrame(i.lat, i.lon, 0, MemoryUtils_DdeKsIT5_P).invert(), MemoryUtils_DdeKsIT5_S.premultiply(MemoryUtils_DdeKsIT5_P), MemoryUtils_DdeKsIT5_x.setFromRotationMatrix(MemoryUtils_DdeKsIT5_S, "ZXY"), i.azimuth = -MemoryUtils_DdeKsIT5_x.z, i.elevation = MemoryUtils_DdeKsIT5_x.x, i.roll = MemoryUtils_DdeKsIT5_x.y, i;
  }
  /**
   * Fills in the east, north, and up unit vectors for the ENU frame at the given latitude and
   * longitude. Optionally writes the surface position into `point`.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {Vector3} vecEast
   * @param {Vector3} vecNorth
   * @param {Vector3} vecUp
   * @param {Vector3} [point]
   */
  getEastNorthUpAxes(t, i, e, o, s, n = MemoryUtils_DdeKsIT5_) {
    this.getCartographicToPosition(t, i, 0, n), this.getCartographicToNormal(t, i, s), e.set(-n.y, n.x, 0).normalize(), o.crossVectors(s, e).normalize();
  }
  /**
   * @deprecated Use `getCartographicFromObjectFrame` instead.
   * @param {number} lat
   * @param {number} lon
   * @param {Matrix4} rotationMatrix
   * @param {Object} target
   * @param {Frames} frame
   * @returns {{ azimuth: number, elevation: number, roll: number }}
   */
  getAzElRollFromRotationMatrix(t, i, e, o, s = MemoryUtils_DdeKsIT5_q) {
    return console.warn('Ellipsoid: "getAzElRollFromRotationMatrix" is deprecated. Use "getCartographicFromObjectFrame", instead.'), this.getCartographicToPosition(t, i, 0, MemoryUtils_DdeKsIT5_), at.copy(e).setPosition(MemoryUtils_DdeKsIT5_), this.getCartographicFromObjectFrame(at, o, s), delete o.height, delete o.lat, delete o.lon, o;
  }
  /**
   * @deprecated Use `getObjectFrame` instead.
   * @param {number} lat
   * @param {number} lon
   * @param {number} az
   * @param {number} el
   * @param {number} roll
   * @param {Matrix4} target
   * @param {Frames} frame
   * @returns {Matrix4}
   */
  getRotationMatrixFromAzElRoll(t, i, e, o, s, n, r = MemoryUtils_DdeKsIT5_q) {
    return console.warn('Ellipsoid: "getRotationMatrixFromAzElRoll" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(t, i, 0, e, o, s, n, r), n.setPosition(0, 0, 0), n;
  }
  /**
   * @deprecated Use `getObjectFrame` instead.
   * @param {number} lat
   * @param {number} lon
   * @param {number} az
   * @param {number} el
   * @param {number} roll
   * @param {number} height
   * @param {Matrix4} target
   * @param {Frames} frame
   * @returns {Matrix4}
   */
  getFrame(t, i, e, o, s, n, r, l = MemoryUtils_DdeKsIT5_q) {
    return console.warn('Ellipsoid: "getFrame" function has been deprecated. Use "getObjectFrame", instead.'), this.getObjectFrame(t, i, n, e, o, s, r, l);
  }
  /**
   * Converts geographic coordinates to a 3D Cartesian position on the ellipsoid surface
   * (plus the given height offset). Writes the result into `target` and returns it.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {number} height Height above the ellipsoid surface in meters.
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getCartographicToPosition(t, i, e, o) {
    this.getCartographicToNormal(t, i, MemoryUtils_DdeKsIT5_z);
    const s = this.radius;
    d.copy(MemoryUtils_DdeKsIT5_z), d.x *= s.x ** 2, d.y *= s.y ** 2, d.z *= s.z ** 2;
    const n = Math.sqrt(MemoryUtils_DdeKsIT5_z.dot(d));
    return d.divideScalar(n), o.copy(d).addScaledVector(MemoryUtils_DdeKsIT5_z, e);
  }
  /**
   * Converts a 3D Cartesian position to geographic coordinates (lat, lon, height). Writes the
   * result into `target` and returns it.
   * @param {Vector3} pos
   * @param {Object} target
   * @returns {{ lat: number, lon: number, height: number }}
   */
  getPositionToCartographic(t, i) {
    this.getPositionToSurfacePoint(t, d), this.getPositionToNormal(d, MemoryUtils_DdeKsIT5_z);
    const e = MemoryUtils_DdeKsIT5_V.subVectors(t, d);
    return i.lon = Math.atan2(MemoryUtils_DdeKsIT5_z.y, MemoryUtils_DdeKsIT5_z.x), i.lat = Math.asin(MemoryUtils_DdeKsIT5_z.z), i.height = Math.sign(e.dot(t)) * e.length(), i;
  }
  /**
   * Returns the surface normal of the ellipsoid at the given latitude and longitude. Writes the
   * result into `target` and returns it.
   * @param {number} lat Latitude in radians.
   * @param {number} lon Longitude in radians.
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getCartographicToNormal(t, i, e) {
    return rt.set(1, MemoryUtils_DdeKsIT5_K(t), i), e.setFromSpherical(rt).normalize(), ft(e), e;
  }
  /**
   * Returns the surface normal of the ellipsoid at the given 3D Cartesian position. Writes the
   * result into `target` and returns it.
   * @param {Vector3} pos
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getPositionToNormal(t, i) {
    const e = this.radius;
    return i.copy(t), i.x /= e.x ** 2, i.y /= e.y ** 2, i.z /= e.z ** 2, i.normalize(), i;
  }
  /**
   * Projects the given 3D position onto the ellipsoid surface along the geodetic normal.
   * Returns null if the position is at or near the center. Writes the result into `target`.
   * @param {Vector3} pos
   * @param {Vector3} target
   * @returns {Vector3|null}
   */
  getPositionToSurfacePoint(t, i) {
    const e = this.radius, o = 1 / e.x ** 2, s = 1 / e.y ** 2, n = 1 / e.z ** 2, r = t.x * t.x * o, l = t.y * t.y * s, h = t.z * t.z * n, p = r + l + h, w = Math.sqrt(1 / p), M = d.copy(t).multiplyScalar(w);
    if (p < Bt)
      return isFinite(w) ? i.copy(M) : null;
    const E = MemoryUtils_DdeKsIT5_V.set(
      M.x * o * 2,
      M.y * s * 2,
      M.z * n * 2
    );
    let m = (1 - w) * t.length() / (0.5 * E.length()), g = 0, $, Q, A, v, N, k, X, Y, tt, it, et;
    do {
      m -= g, A = 1 / (1 + m * o), v = 1 / (1 + m * s), N = 1 / (1 + m * n), k = A * A, X = v * v, Y = N * N, tt = k * A, it = X * v, et = Y * N, $ = r * k + l * X + h * Y - 1, Q = r * tt * o + l * it * s + h * et * n;
      const Et = -2 * Q;
      g = $ / Et;
    } while (Math.abs($) > Nt);
    return i.set(
      t.x * A,
      t.y * v,
      t.z * N
    );
  }
  /**
   * Returns the geometric distance to the horizon from the given latitude and elevation above
   * the ellipsoid surface.
   * @param {number} latitude Latitude in degrees.
   * @param {number} elevation Height above the ellipsoid surface in meters.
   * @returns {number}
   */
  calculateHorizonDistance(t, i) {
    const e = this.calculateEffectiveRadius(t);
    return Math.sqrt(2 * e * i + i ** 2);
  }
  /**
   * Returns the prime vertical radius of curvature (distance from the center of the ellipsoid
   * to the surface along the normal) at the given latitude.
   * @param {number} latitude Latitude in degrees.
   * @returns {number}
   */
  calculateEffectiveRadius(t) {
    const i = this.radius.x, o = 1 - this.radius.z ** 2 / i ** 2, s = t * external_three_.MathUtils.DEG2RAD, n = Math.sin(s) ** 2;
    return i / Math.sqrt(1 - o * n);
  }
  /**
   * Returns the height of the given 3D position above (or below) the ellipsoid surface.
   * @param {Vector3} pos
   * @returns {number}
   */
  getPositionElevation(t) {
    this.getPositionToSurfacePoint(t, d);
    const i = MemoryUtils_DdeKsIT5_V.subVectors(t, d);
    return Math.sign(i.dot(t)) * i.length();
  }
  /**
   * Returns an estimate of the closest point on the ellipsoid surface to the given ray.
   * Returns the exact surface intersection point if the ray intersects the ellipsoid.
   * @param {Ray} ray
   * @param {Vector3} target
   * @returns {Vector3}
   */
  closestPointToRayEstimate(t, i) {
    return this.intersectRay(t, i) ? i : (MemoryUtils_DdeKsIT5_P.makeScale(...this.radius).invert(), MemoryUtils_DdeKsIT5_O.copy(t).applyMatrix4(MemoryUtils_DdeKsIT5_P), d.set(0, 0, 0), MemoryUtils_DdeKsIT5_O.closestPointToPoint(d, i).normalize(), MemoryUtils_DdeKsIT5_P.makeScale(...this.radius), i.applyMatrix4(MemoryUtils_DdeKsIT5_P));
  }
  /**
   * Copies the radius from the given ellipsoid into this one.
   * @param {Ellipsoid} source
   * @returns {this}
   */
  copy(t) {
    return this.radius.copy(t.radius), this;
  }
  /**
   * Returns a new Ellipsoid with the same radius as this one.
   * @returns {Ellipsoid}
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const Dt = new Pt(W, W, Y);
Dt.name = "WGS84 Earth";
const MemoryUtils_DdeKsIT5_L = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_j = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_f = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_G = /* @__PURE__ */ new external_three_.Ray();
class Gt {
  constructor(t = new external_three_.Box3(), i = new external_three_.Matrix4()) {
    this.box = t.clone(), this.transform = i.clone(), this.inverseTransform = new external_three_.Matrix4(), this.points = new Array(8).fill().map(() => new external_three_.Vector3()), this.planes = new Array(6).fill().map(() => new external_three_.Plane());
  }
  copy(t) {
    return this.box.copy(t.box), this.transform.copy(t.transform), this.update(), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Clamps the given point within the bounds of this OBB
   * @param {Vector3} point
   * @param {Vector3} result
   * @returns {Vector3}
   */
  clampPoint(t, i) {
    return i.copy(t).applyMatrix4(this.inverseTransform).clamp(this.box.min, this.box.max).applyMatrix4(this.transform);
  }
  /**
   * Returns the distance from any edge of this OBB to the specified point.
   * If the point lies inside of this box, the distance will be 0.
   * @param {Vector3} point
   * @returns {number}
   */
  distanceToPoint(t) {
    return this.clampPoint(t, MemoryUtils_DdeKsIT5_f).distanceTo(t);
  }
  containsPoint(t) {
    return MemoryUtils_DdeKsIT5_f.copy(t).applyMatrix4(this.inverseTransform), this.box.containsPoint(MemoryUtils_DdeKsIT5_f);
  }
  // returns boolean indicating whether the ray has intersected the obb
  intersectsRay(t) {
    return MemoryUtils_DdeKsIT5_G.copy(t).applyMatrix4(this.inverseTransform), MemoryUtils_DdeKsIT5_G.intersectsBox(this.box);
  }
  // Sets "target" equal to the intersection point.
  // Returns "null" if no intersection found.
  intersectRay(t, i) {
    return MemoryUtils_DdeKsIT5_G.copy(t).applyMatrix4(this.inverseTransform), MemoryUtils_DdeKsIT5_G.intersectBox(this.box, i) ? (i.applyMatrix4(this.transform), i) : null;
  }
  update() {
    const { points: t, inverseTransform: i, transform: e, box: o } = this;
    i.copy(e).invert();
    const { min: s, max: n } = o;
    let r = 0;
    for (let l = -1; l <= 1; l += 2)
      for (let h = -1; h <= 1; h += 2)
        for (let p = -1; p <= 1; p += 2)
          t[r].set(
            l < 0 ? s.x : n.x,
            h < 0 ? s.y : n.y,
            p < 0 ? s.z : n.z
          ).applyMatrix4(e), r++;
    this.updatePlanes();
  }
  updatePlanes() {
    MemoryUtils_DdeKsIT5_L.copy(this.box.min).applyMatrix4(this.transform), MemoryUtils_DdeKsIT5_j.copy(this.box.max).applyMatrix4(this.transform), MemoryUtils_DdeKsIT5_f.set(0, 0, 1).transformDirection(this.transform), this.planes[0].setFromNormalAndCoplanarPoint(MemoryUtils_DdeKsIT5_f, MemoryUtils_DdeKsIT5_L), this.planes[1].setFromNormalAndCoplanarPoint(MemoryUtils_DdeKsIT5_f, MemoryUtils_DdeKsIT5_j).negate(), MemoryUtils_DdeKsIT5_f.set(0, 1, 0).transformDirection(this.transform), this.planes[2].setFromNormalAndCoplanarPoint(MemoryUtils_DdeKsIT5_f, MemoryUtils_DdeKsIT5_L), this.planes[3].setFromNormalAndCoplanarPoint(MemoryUtils_DdeKsIT5_f, MemoryUtils_DdeKsIT5_j).negate(), MemoryUtils_DdeKsIT5_f.set(1, 0, 0).transformDirection(this.transform), this.planes[4].setFromNormalAndCoplanarPoint(MemoryUtils_DdeKsIT5_f, MemoryUtils_DdeKsIT5_L), this.planes[5].setFromNormalAndCoplanarPoint(MemoryUtils_DdeKsIT5_f, MemoryUtils_DdeKsIT5_j).negate();
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, MemoryUtils_DdeKsIT5_f), MemoryUtils_DdeKsIT5_f.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsFrustum(t) {
    return this._intersectsPlaneShape(t.planes, t.points);
  }
  intersectsOBB(t) {
    return this._intersectsPlaneShape(t.planes, t.points);
  }
  // takes a series of 6 planes that define and enclosed shape and the 8 points that lie at the corners
  // of that shape to determine whether the OBB is intersected with.
  _intersectsPlaneShape(t, i) {
    const e = this.points, o = this.planes;
    for (let s = 0; s < 6; s++) {
      const n = t[s];
      let r = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const h = e[l], p = n.distanceToPoint(h);
        r = r < p ? p : r;
      }
      if (r < 0)
        return !1;
    }
    for (let s = 0; s < 6; s++) {
      const n = o[s];
      let r = -1 / 0;
      for (let l = 0; l < 8; l++) {
        const h = i[l], p = n.distanceToPoint(h);
        r = r < p ? p : r;
      }
      if (r < 0)
        return !1;
    }
    return !0;
  }
}
const MemoryUtils_DdeKsIT5_Z = 1e-13, I = Math.PI, MemoryUtils_DdeKsIT5_H = I / 2, MemoryUtils_DdeKsIT5_B = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_C = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_T = /* @__PURE__ */ new external_three_.Vector3(), a = /* @__PURE__ */ new external_three_.Vector3(), MemoryUtils_DdeKsIT5_y = /* @__PURE__ */ new external_three_.Matrix4(), It = /* @__PURE__ */ new external_three_.Box3(), ut = /* @__PURE__ */ new external_three_.Matrix4();
function F(c, t) {
  t.radius = Math.max(t.radius, c.distanceToSquared(t.center));
}
function mt(c) {
  return c.x !== c.y;
}
class $t extends Pt {
  constructor(t = 1, i = 1, e = 1, o = -MemoryUtils_DdeKsIT5_H, s = MemoryUtils_DdeKsIT5_H, n = 0, r = 2 * I, l = 0, h = 0) {
    super(t, i, e), this.latStart = o, this.latEnd = s, this.lonStart = n, this.lonEnd = r, this.heightStart = l, this.heightEnd = h;
  }
  /**
   * Computes an oriented bounding box for this region. Writes the box extents into `box` and
   * the orientation frame into `matrix`.
   * @param {Box3} box
   * @param {Matrix4} matrix
   */
  getBoundingBox(t, i) {
    mt(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");
    const {
      latStart: e,
      latEnd: o,
      lonStart: s,
      lonEnd: n,
      heightStart: r,
      heightEnd: l
    } = this, h = (e + o) * 0.5, p = (s + n) * 0.5, w = e > 0, M = o < 0;
    let E;
    w ? E = e : M ? E = o : E = 0;
    const { min: m, max: g } = t;
    m.setScalar(1 / 0), g.setScalar(-1 / 0), n - s <= I ? (this.getCartographicToNormal(h, p, MemoryUtils_DdeKsIT5_T), MemoryUtils_DdeKsIT5_C.set(0, 0, 1), MemoryUtils_DdeKsIT5_B.crossVectors(MemoryUtils_DdeKsIT5_C, MemoryUtils_DdeKsIT5_T).normalize(), MemoryUtils_DdeKsIT5_C.crossVectors(MemoryUtils_DdeKsIT5_T, MemoryUtils_DdeKsIT5_B).normalize(), i.makeBasis(MemoryUtils_DdeKsIT5_B, MemoryUtils_DdeKsIT5_C, MemoryUtils_DdeKsIT5_T), MemoryUtils_DdeKsIT5_y.copy(i).invert(), this.getCartographicToPosition(E, s, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), g.x = Math.abs(a.x), m.x = -g.x, this.getCartographicToPosition(o, s, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), g.y = a.y, this.getCartographicToPosition(o, p, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), g.y = Math.max(a.y, g.y), this.getCartographicToPosition(e, s, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), m.y = a.y, this.getCartographicToPosition(e, p, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), m.y = Math.min(a.y, m.y), this.getCartographicToPosition(h, p, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), g.z = a.z, this.getCartographicToPosition(e, s, r, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), m.z = a.z, this.getCartographicToPosition(o, s, r, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), m.z = Math.min(a.z, m.z)) : (this.getCartographicToPosition(E, p, l, MemoryUtils_DdeKsIT5_T), MemoryUtils_DdeKsIT5_T.z = 0, MemoryUtils_DdeKsIT5_T.length() < 1e-10 ? MemoryUtils_DdeKsIT5_T.set(1, 0, 0) : MemoryUtils_DdeKsIT5_T.normalize(), MemoryUtils_DdeKsIT5_C.set(0, 0, 1), MemoryUtils_DdeKsIT5_B.crossVectors(MemoryUtils_DdeKsIT5_T, MemoryUtils_DdeKsIT5_C).normalize(), i.makeBasis(MemoryUtils_DdeKsIT5_B, MemoryUtils_DdeKsIT5_C, MemoryUtils_DdeKsIT5_T), MemoryUtils_DdeKsIT5_y.copy(i).invert(), this.getCartographicToPosition(E, p + MemoryUtils_DdeKsIT5_H, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), g.x = Math.abs(a.x), m.x = -g.x, this.getCartographicToPosition(o, 0, M ? r : l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), g.y = a.y, this.getCartographicToPosition(e, 0, w ? r : l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), m.y = a.y, this.getCartographicToPosition(E, p, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), g.z = a.z, this.getCartographicToPosition(E, n, l, a).applyMatrix4(MemoryUtils_DdeKsIT5_y), m.z = a.z), t.getCenter(a), t.min.sub(a).multiplyScalar(1 + MemoryUtils_DdeKsIT5_Z), t.max.sub(a).multiplyScalar(1 + MemoryUtils_DdeKsIT5_Z), a.applyMatrix4(i), i.setPosition(a);
  }
  /**
   * Computes a bounding sphere for this region. Writes the result into `sphere`.
   * @param {Sphere} sphere
   */
  getBoundingSphere(t) {
    mt(this.radius) && console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."), this.getBoundingBox(It, ut), t.center.setFromMatrixPosition(ut), t.radius = 0;
    const {
      latStart: i,
      latEnd: e,
      lonStart: o,
      lonEnd: s,
      heightStart: n,
      heightEnd: r
    } = this, l = (i + e) * 0.5, h = (o + s) * 0.5, p = i > 0, w = e < 0;
    let M;
    p ? M = i : w ? M = e : M = 0, this.getCartographicToPosition(M, o, r, a), F(a, t), this.getCartographicToPosition(e, o, r, a), F(a, t), this.getCartographicToPosition(e, h, r, a), F(a, t), this.getCartographicToPosition(i, o, r, a), F(a, t), this.getCartographicToPosition(i, h, r, a), F(a, t), this.getCartographicToPosition(l, h, r, a), F(a, t), this.getCartographicToPosition(i, o, n, a), F(a, t), s - o > I && (this.getCartographicToPosition(M, h + I, r, a), F(a, t)), t.radius = Math.sqrt(t.radius) * (1 + MemoryUtils_DdeKsIT5_Z);
  }
}
const MemoryUtils_DdeKsIT5_J = 0;
function dt(c, t, i, e) {
  try {
    return external_three_.TextureUtils.getByteLength(c, t, i, e);
  } catch {
    return MemoryUtils_DdeKsIT5_J;
  }
}
function Tt(c) {
  var n, r;
  if (!c)
    return 0;
  if (c.isExternalTexture)
    return ((n = c.userData) == null ? void 0 : n.byteLength) ?? MemoryUtils_DdeKsIT5_J;
  const { format: t, type: i, image: e, mipmaps: o } = c;
  if (c.isCompressedTexture && Array.isArray(o) && o.length > 0) {
    let l = 0;
    for (const h of o)
      (r = h == null ? void 0 : h.data) != null && r.byteLength ? l += h.data.byteLength : l += dt(h.width, h.height, t, i);
    return l;
  }
  if (!e)
    return MemoryUtils_DdeKsIT5_J;
  let s = dt(e.width, e.height, t, i);
  return s *= c.generateMipmaps ? 4 / 3 : 1, s;
}
function Ot(c) {
  const t = /* @__PURE__ */ new Set();
  let i = 0;
  return c.traverse((e) => {
    if (e.geometry && !t.has(e.geometry) && (i += estimateBytesUsed(e.geometry), t.add(e.geometry)), e.material) {
      const o = e.material;
      for (const s in o) {
        const n = o[s];
        n && n.isTexture && !t.has(n) && (i += Tt(n), t.add(n));
      }
    }
  }), i;
}
const kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  estimateBytesUsed: Ot,
  getTextureByteLength: Tt
}, Symbol.toStringTag, { value: "Module" }));

//# sourceMappingURL=MemoryUtils-DdeKsIT5.js.map

;// ./node_modules/3d-tiles-renderer/build/CameraTransitionManager-53n8z_Xc.js






class Ee extends Ue {
  constructor(t = external_three_.DefaultLoadingManager) {
    super(), this.manager = t, this.adjustmentTransform = new external_three_.Matrix4();
  }
  /**
   * Parses a b3dm buffer and resolves to a GLTF result object extended with legacy
   * tile metadata. Both `model` and `model.scene` receive the extra fields.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, scenes: Array, batchTable: BatchTable, featureTable: FeatureTable }>}
   */
  parse(t) {
    const e = super.parse(t), i = e.glbBytes.slice().buffer;
    return new Promise((s, o) => {
      const n = this.manager, r = this.fetchOptions, a = n.getHandler("path.gltf") || new GLTFLoader(n);
      r.credentials === "include" && r.mode === "cors" && a.setCrossOrigin("use-credentials"), "credentials" in r && a.setWithCredentials(r.credentials === "include"), r.headers && a.setRequestHeader(r.headers);
      let c = this.workingPath;
      !/[\\/]$/.test(c) && c.length && (c += "/");
      const p = this.adjustmentTransform;
      a.parse(i, c, (h) => {
        const { batchTable: m, featureTable: u } = e, { scene: l } = h, d = u.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
        d && (l.position.x += d[0], l.position.y += d[1], l.position.z += d[2]), h.scene.updateMatrix(), h.scene.matrix.multiply(p), h.scene.matrix.decompose(h.scene.position, h.scene.quaternion, h.scene.scale), h.batchTable = m, h.featureTable = u, l.batchTable = m, l.featureTable = u, s(h);
      }, o);
    });
  }
}
function pi(f) {
  const t = f >> 11, e = f >> 5 & 63, i = f & 31, s = Math.round(t / 31 * 255), o = Math.round(e / 63 * 255), n = Math.round(i / 31 * 255);
  return [s, o, n];
}
const CameraTransitionManager_53n8z_Xc_bt = /* @__PURE__ */ new external_three_.Vector2();
function di(f, t, e = new external_three_.Vector3()) {
  CameraTransitionManager_53n8z_Xc_bt.set(f, t).divideScalar(256).multiplyScalar(2).subScalar(1), e.set(CameraTransitionManager_53n8z_Xc_bt.x, CameraTransitionManager_53n8z_Xc_bt.y, 1 - Math.abs(CameraTransitionManager_53n8z_Xc_bt.x) - Math.abs(CameraTransitionManager_53n8z_Xc_bt.y));
  const i = external_three_.MathUtils.clamp(-e.z, 0, 1);
  return e.x >= 0 ? e.setX(e.x - i) : e.setX(e.x + i), e.y >= 0 ? e.setY(e.y - i) : e.setY(e.y + i), e.normalize(), e;
}
const CameraTransitionManager_53n8z_Xc_ne = {
  RGB: "color",
  POSITION: "position"
};
class CameraTransitionManager_53n8z_Xc_Re extends index_core_G {
  constructor(t = external_three_.DefaultLoadingManager) {
    super(), this.manager = t;
  }
  /**
   * Parses a pnts buffer and resolves to a result object containing a constructed
   * three.js `Points` scene with metadata attached.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Points, batchTable: BatchTable, featureTable: FeatureTable }>}
   */
  parse(t) {
    return super.parse(t).then(async (e) => {
      const { featureTable: i, batchTable: s } = e, o = new external_three_.PointsMaterial(), n = i.header.extensions, r = new external_three_.Vector3();
      let a;
      if (n && n["3DTILES_draco_point_compression"]) {
        const { byteOffset: h, byteLength: m, properties: u } = n["3DTILES_draco_point_compression"], l = this.manager.getHandler("draco.drc");
        if (l == null)
          throw new Error("PNTSLoader: dracoLoader not available.");
        const d = {};
        for (const M in u)
          if (M in CameraTransitionManager_53n8z_Xc_ne && M in u) {
            const P = CameraTransitionManager_53n8z_Xc_ne[M];
            d[P] = u[M];
          }
        const x = {
          attributeIDs: d,
          attributeTypes: {
            position: "Float32Array",
            color: "Uint8Array"
          },
          useUniqueIDs: !0
        }, O = i.getBuffer(h, m);
        a = await l.decodeGeometry(O, x), a.attributes.color && (o.vertexColors = !0);
      } else {
        const h = i.getData("POINTS_LENGTH"), m = i.getData("POSITION", h, "FLOAT", "VEC3"), u = i.getData("NORMAL", h, "FLOAT", "VEC3"), l = i.getData("NORMAL", h, "UNSIGNED_BYTE", "VEC2"), d = i.getData("RGB", h, "UNSIGNED_BYTE", "VEC3"), x = i.getData("RGBA", h, "UNSIGNED_BYTE", "VEC4"), O = i.getData("RGB565", h, "UNSIGNED_SHORT", "SCALAR"), M = i.getData("CONSTANT_RGBA", h, "UNSIGNED_BYTE", "VEC4"), P = i.getData("POSITION_QUANTIZED", h, "UNSIGNED_SHORT", "VEC3"), g = i.getData("QUANTIZED_VOLUME_SCALE", h, "FLOAT", "VEC3"), R = i.getData("QUANTIZED_VOLUME_OFFSET", h, "FLOAT", "VEC3");
        if (a = new external_three_.BufferGeometry(), P) {
          const D = new Float32Array(h * 3);
          for (let v = 0; v < h; v++)
            for (let C = 0; C < 3; C++) {
              const F = 3 * v + C;
              D[F] = P[F] / 65535 * g[C];
            }
          r.x = R[0], r.y = R[1], r.z = R[2], a.setAttribute("position", new external_three_.BufferAttribute(D, 3, !1));
        } else
          a.setAttribute("position", new external_three_.BufferAttribute(m, 3, !1));
        if (u !== null)
          a.setAttribute("normal", new external_three_.BufferAttribute(u, 3, !1));
        else if (l !== null) {
          const D = new Float32Array(h * 3), v = new external_three_.Vector3();
          for (let C = 0; C < h; C++) {
            const F = l[C * 2], ot = l[C * 2 + 1], A = di(F, ot, v);
            D[C * 3] = A.x, D[C * 3 + 1] = A.y, D[C * 3 + 2] = A.z;
          }
          a.setAttribute("normal", new external_three_.BufferAttribute(D, 3, !1));
        }
        if (x !== null)
          a.setAttribute("color", new external_three_.BufferAttribute(x, 4, !0)), o.vertexColors = !0, o.transparent = !0, o.depthWrite = !1;
        else if (d !== null)
          a.setAttribute("color", new external_three_.BufferAttribute(d, 3, !0)), o.vertexColors = !0;
        else if (O !== null) {
          const D = new Uint8Array(h * 3);
          for (let v = 0; v < h; v++) {
            const C = pi(O[v]);
            for (let F = 0; F < 3; F++) {
              const ot = 3 * v + F;
              D[ot] = C[F];
            }
          }
          a.setAttribute("color", new external_three_.BufferAttribute(D, 3, !0)), o.vertexColors = !0;
        } else if (M !== null) {
          const D = new external_three_.Color(M[0], M[1], M[2]);
          o.color = D;
          const v = M[3] / 255;
          v < 1 && (o.opacity = v, o.transparent = !0, o.depthWrite = !1);
        }
      }
      const c = new external_three_.Points(a, o);
      c.position.copy(r), e.scene = c, e.scene.featureTable = i, e.scene.batchTable = s;
      const p = i.getData("RTC_CENTER", 1, "FLOAT", "VEC3");
      return p && (e.scene.position.x += p[0], e.scene.position.y += p[1], e.scene.position.z += p[2]), e;
    });
  }
}
const CameraTransitionManager_53n8z_Xc_Dt = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_ht = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_pt = /* @__PURE__ */ new external_three_.Vector3(), Ht = /* @__PURE__ */ new external_three_.Vector3(), Ct = /* @__PURE__ */ new external_three_.Quaternion(), St = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_dt = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_re = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_ae = /* @__PURE__ */ new external_three_.Vector3(), ce = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_jt = /* @__PURE__ */ new external_three_.Quaternion(), CameraTransitionManager_53n8z_Xc_Gt = {};
function le(f, t, e, i) {
  if (f = f / e * 2 - 1, t = t / e * 2 - 1, i.x = f, i.y = t, i.z = 1 - Math.abs(f) - Math.abs(t), i.z < 0) {
    const s = i.x;
    i.x = (1 - Math.abs(i.y)) * (s >= 0 ? 1 : -1), i.y = (1 - Math.abs(s)) * (i.y >= 0 ? 1 : -1);
  }
  return i.normalize(), i;
}
class Oe extends index_core_x {
  constructor(t = external_three_.DefaultLoadingManager) {
    super(), this.manager = t, this.adjustmentTransform = new external_three_.Matrix4(), this.ellipsoid = Dt.clone();
  }
  resolveExternalURL(t) {
    return this.manager.resolveURL(super.resolveExternalURL(t));
  }
  /**
   * Parses an i3dm buffer and resolves to a GLTF result object where the scene's
   * meshes have been replaced with `InstancedMesh` objects (one per GLTF mesh), with
   * metadata attached to both `model` and `model.scene`.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, batchTable: BatchTable, featureTable: FeatureTable }>}
   */
  parse(t) {
    return super.parse(t).then((e) => {
      const { featureTable: i, batchTable: s } = e, o = e.glbBytes.slice().buffer;
      return new Promise((n, r) => {
        const a = this.fetchOptions, c = this.manager, p = c.getHandler("path.gltf") || new GLTFLoader(c);
        a.credentials === "include" && a.mode === "cors" && p.setCrossOrigin("use-credentials"), "credentials" in a && p.setWithCredentials(a.credentials === "include"), a.headers && p.setRequestHeader(a.headers);
        let h = e.gltfWorkingPath ?? this.workingPath;
        /[\\/]$/.test(h) || (h += "/");
        const m = this.adjustmentTransform;
        p.parse(o, h, (u) => {
          const l = i.getData("INSTANCES_LENGTH");
          let d = i.getData("POSITION", l, "FLOAT", "VEC3");
          const x = i.getData("POSITION_QUANTIZED", l, "UNSIGNED_SHORT", "VEC3"), O = i.getData("QUANTIZED_VOLUME_OFFSET", 1, "FLOAT", "VEC3"), M = i.getData("QUANTIZED_VOLUME_SCALE", 1, "FLOAT", "VEC3"), P = i.getData("NORMAL_UP", l, "FLOAT", "VEC3"), g = i.getData("NORMAL_RIGHT", l, "FLOAT", "VEC3"), R = i.getData("NORMAL_UP_OCT32P", l, "UNSIGNED_SHORT", "VEC2"), D = i.getData("NORMAL_RIGHT_OCT32P", l, "UNSIGNED_SHORT", "VEC2"), v = i.getData("SCALE_NON_UNIFORM", l, "FLOAT", "VEC3"), C = i.getData("SCALE", l, "FLOAT", "SCALAR"), F = i.getData("RTC_CENTER", 1, "FLOAT", "VEC3"), ot = i.getData("EAST_NORTH_UP");
          if (!d && x) {
            d = new Float32Array(l * 3);
            for (let b = 0; b < l; b++)
              d[b * 3 + 0] = O[0] + x[b * 3 + 0] / 65535 * M[0], d[b * 3 + 1] = O[1] + x[b * 3 + 1] / 65535 * M[1], d[b * 3 + 2] = O[2] + x[b * 3 + 2] / 65535 * M[2];
          }
          const A = new external_three_.Vector3();
          for (let b = 0; b < l; b++)
            A.x += d[b * 3 + 0] / l, A.y += d[b * 3 + 1] / l, A.z += d[b * 3 + 2] / l;
          const vt = [], ie = [];
          u.scene.updateMatrixWorld(), u.scene.traverse((b) => {
            if (b.isMesh) {
              ie.push(b);
              const { geometry: lt, material: Bt } = b, Q = new external_three_.InstancedMesh(lt, Bt, l);
              Q.position.copy(A), F && (Q.position.x += F[0], Q.position.y += F[1], Q.position.z += F[2]), vt.push(Q);
            }
          });
          for (let b = 0; b < l; b++) {
            Ht.set(
              d[b * 3 + 0] - A.x,
              d[b * 3 + 1] - A.y,
              d[b * 3 + 2] - A.z
            ), Ct.identity(), P && g ? (CameraTransitionManager_53n8z_Xc_ht.set(
              P[b * 3 + 0],
              P[b * 3 + 1],
              P[b * 3 + 2]
            ), CameraTransitionManager_53n8z_Xc_pt.set(
              g[b * 3 + 0],
              g[b * 3 + 1],
              g[b * 3 + 2]
            ), CameraTransitionManager_53n8z_Xc_Dt.crossVectors(CameraTransitionManager_53n8z_Xc_pt, CameraTransitionManager_53n8z_Xc_ht).normalize(), CameraTransitionManager_53n8z_Xc_dt.makeBasis(
              CameraTransitionManager_53n8z_Xc_pt,
              CameraTransitionManager_53n8z_Xc_ht,
              CameraTransitionManager_53n8z_Xc_Dt
            ), Ct.setFromRotationMatrix(CameraTransitionManager_53n8z_Xc_dt)) : R && D && (le(
              R[b * 2 + 0],
              R[b * 2 + 1],
              65535,
              CameraTransitionManager_53n8z_Xc_ht
            ), le(
              D[b * 2 + 0],
              D[b * 2 + 1],
              65535,
              CameraTransitionManager_53n8z_Xc_pt
            ), CameraTransitionManager_53n8z_Xc_Dt.crossVectors(CameraTransitionManager_53n8z_Xc_pt, CameraTransitionManager_53n8z_Xc_ht).normalize(), CameraTransitionManager_53n8z_Xc_dt.makeBasis(
              CameraTransitionManager_53n8z_Xc_pt,
              CameraTransitionManager_53n8z_Xc_ht,
              CameraTransitionManager_53n8z_Xc_Dt
            ), Ct.setFromRotationMatrix(CameraTransitionManager_53n8z_Xc_dt)), St.set(1, 1, 1), v && St.set(
              v[b * 3 + 0],
              v[b * 3 + 1],
              v[b * 3 + 2]
            ), C && St.multiplyScalar(C[b]);
            for (let lt = 0, Bt = vt.length; lt < Bt; lt++) {
              const Q = vt[lt];
              CameraTransitionManager_53n8z_Xc_jt.copy(Ct), ot && (Q.updateMatrixWorld(), CameraTransitionManager_53n8z_Xc_ae.copy(Ht).applyMatrix4(Q.matrixWorld), this.ellipsoid.getPositionToCartographic(CameraTransitionManager_53n8z_Xc_ae, CameraTransitionManager_53n8z_Xc_Gt), this.ellipsoid.getEastNorthUpFrame(CameraTransitionManager_53n8z_Xc_Gt.lat, CameraTransitionManager_53n8z_Xc_Gt.lon, ce), CameraTransitionManager_53n8z_Xc_jt.setFromRotationMatrix(ce)), CameraTransitionManager_53n8z_Xc_dt.compose(Ht, CameraTransitionManager_53n8z_Xc_jt, St).multiply(m);
              const Ve = ie[lt];
              CameraTransitionManager_53n8z_Xc_re.multiplyMatrices(CameraTransitionManager_53n8z_Xc_dt, Ve.matrixWorld), Q.setMatrixAt(b, CameraTransitionManager_53n8z_Xc_re);
            }
          }
          u.scene.clear(), u.scene.add(...vt), u.batchTable = s, u.featureTable = i, u.scene.batchTable = s, u.scene.featureTable = i, n(u);
        }, r);
      });
    });
  }
}
class ui extends index_core_M {
  constructor(t = external_three_.DefaultLoadingManager) {
    super(), this.manager = t, this.adjustmentTransform = new external_three_.Matrix4(), this.ellipsoid = Dt.clone();
  }
  /**
   * Parses a cmpt buffer and resolves to an object containing a `Group` with all
   * sub-tile scenes added as children, and the individual sub-tile results.
   * @param {ArrayBuffer} buffer
   * @returns {Promise<{ scene: Group, tiles: Array }>}
   */
  parse(t) {
    const e = super.parse(t), { manager: i, ellipsoid: s, adjustmentTransform: o } = this, n = [];
    for (const r in e.tiles) {
      const { type: a, buffer: c } = e.tiles[r];
      switch (a) {
        case "b3dm": {
          const p = c.slice(), h = new Ee(i);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.adjustmentTransform.copy(o);
          const m = h.parse(p.buffer);
          n.push(m);
          break;
        }
        case "pnts": {
          const p = c.slice(), h = new CameraTransitionManager_53n8z_Xc_Re(i);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions;
          const m = h.parse(p.buffer);
          n.push(m);
          break;
        }
        case "i3dm": {
          const p = c.slice(), h = new Oe(i);
          h.workingPath = this.workingPath, h.fetchOptions = this.fetchOptions, h.ellipsoid.copy(s), h.adjustmentTransform.copy(o);
          const m = h.parse(p.buffer);
          n.push(m);
          break;
        }
      }
    }
    return Promise.all(n).then((r) => {
      const a = new external_three_.Group();
      return r.forEach((c) => {
        a.add(c.scene);
      }), {
        tiles: r,
        scene: a
      };
    });
  }
}
const _t = /* @__PURE__ */ new external_three_.Matrix4();
class mi extends external_three_.Group {
  constructor(t) {
    super(), this.isTilesGroup = !0, this.name = "TilesRenderer.TilesGroup", this.tilesRenderer = t, this.matrixWorldInverse = new external_three_.Matrix4();
  }
  raycast(t, e) {
    return this.tilesRenderer.optimizeRaycast ? (this.tilesRenderer.raycast(t, e), !1) : !0;
  }
  updateMatrixWorld(t) {
    if (this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldNeedsUpdate || t) {
      this.parent === null ? _t.copy(this.matrix) : _t.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1;
      const e = _t.elements, i = this.matrixWorld.elements;
      let s = !1;
      for (let o = 0; o < 16; o++) {
        const n = e[o], r = i[o];
        if (Math.abs(n - r) > Number.EPSILON) {
          s = !0;
          break;
        }
      }
      if (s) {
        this.matrixWorld.copy(_t), this.matrixWorldInverse.copy(_t).invert();
        const o = this.children;
        for (let n = 0, r = o.length; n < r; n++)
          o[n].updateMatrixWorld();
      }
    }
  }
  updateWorldMatrix(t, e) {
    this.parent && t && this.parent.updateWorldMatrix(t, !1), this.updateMatrixWorld(!0);
  }
}
const Ie = /* @__PURE__ */ new external_three_.Ray(), Zt = /* @__PURE__ */ new external_three_.Vector3(), Et = [];
function ze(f, t) {
  return f.distance - t.distance;
}
function Fe(f, t, e, i) {
  const { scene: s } = f.engineData;
  e.invokeOnePlugin((n) => n.raycastTile && n.raycastTile(f, s, t, i)) || t.intersectObject(s, !0, i);
}
function fi(f, t, e) {
  Fe(f, t, e, Et), Et.sort(ze);
  const i = Et[0] || null;
  return Et.length = 0, i;
}
function Ae(f) {
  return "traversal" in f;
}
function Le(f, t, e, i = null) {
  const { group: s, activeTiles: o } = f;
  i === null && (i = Ie, i.copy(e.ray).applyMatrix4(s.matrixWorldInverse));
  const n = [], r = t.children;
  for (let p = 0, h = r.length; p < h; p++) {
    const m = r[p];
    if (!Ae(m) || !m.traversal.used)
      continue;
    m.engineData.boundingVolume.intersectRay(i, Zt) !== null && (Zt.applyMatrix4(s.matrixWorld), n.push({
      distance: Zt.distanceToSquared(e.ray.origin),
      tile: m
    }));
  }
  n.sort(ze);
  let a = null, c = 1 / 0;
  if (o.has(t)) {
    const p = fi(t, e, f);
    p && (a = p, c = p.distance * p.distance);
  }
  for (let p = 0, h = n.length; p < h; p++) {
    const m = n[p], u = m.distance, l = m.tile;
    if (u > c)
      break;
    const d = Le(f, l, e, i);
    if (d) {
      const x = d.distance * d.distance;
      x < c && (a = d, c = x);
    }
  }
  return a;
}
function We(f, t, e, i, s = null) {
  if (!Ae(t))
    return;
  const { group: o, activeTiles: n } = f, { boundingVolume: r } = t.engineData;
  if (s === null && (s = Ie, s.copy(e.ray).applyMatrix4(o.matrixWorldInverse)), !t.traversal.used || !r.intersectsRay(s))
    return;
  n.has(t) && Fe(t, e, f, i);
  const a = t.children;
  for (let c = 0, p = a.length; c < p; c++)
    We(f, a[c], e, i, s);
}
const CameraTransitionManager_53n8z_Xc_$ = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_Y = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_X = /* @__PURE__ */ new external_three_.Vector3(), he = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_pe = /* @__PURE__ */ new external_three_.Vector3();
class gi {
  constructor() {
    this.sphere = null, this.obb = null, this.region = null, this.regionObb = null;
  }
  intersectsRay(t) {
    const e = this.sphere, i = this.obb || this.regionObb;
    return !(e && !t.intersectsSphere(e) || i && !i.intersectsRay(t));
  }
  intersectRay(t, e = null) {
    const i = this.sphere, s = this.obb || this.regionObb;
    let o = -1 / 0, n = -1 / 0;
    i && t.intersectSphere(i, he) && (o = i.containsPoint(t.origin) ? 0 : t.origin.distanceToSquared(he)), s && s.intersectRay(t, CameraTransitionManager_53n8z_Xc_pe) && (n = s.containsPoint(t.origin) ? 0 : t.origin.distanceToSquared(CameraTransitionManager_53n8z_Xc_pe));
    const r = Math.max(o, n);
    return r === -1 / 0 ? null : (t.at(Math.sqrt(r), e), e);
  }
  distanceToPoint(t) {
    const e = this.sphere, i = this.obb || this.regionObb;
    let s = -1 / 0, o = -1 / 0;
    return e && (s = Math.max(e.distanceToPoint(t), 0)), i && (o = i.distanceToPoint(t)), s > o ? s : o;
  }
  intersectsFrustum(t) {
    const e = this.obb || this.regionObb, i = this.sphere;
    return i && !t.intersectsSphere(i) || e && !e.intersectsFrustum(t) ? !1 : !!(i || e);
  }
  intersectsSphere(t) {
    const e = this.obb || this.regionObb, i = this.sphere;
    return i && !i.intersectsSphere(t) || e && !e.intersectsSphere(t) ? !1 : !!(i || e);
  }
  intersectsOBB(t) {
    const e = this.obb || this.regionObb, i = this.sphere;
    return i && !t.intersectsSphere(i) || e && !e.intersectsOBB(t) ? !1 : !!(i || e);
  }
  getOBB(t, e) {
    const i = this.obb || this.regionObb;
    i ? (t.copy(i.box), e.copy(i.transform)) : (this.getAABB(t), e.identity());
  }
  getAABB(t) {
    if (this.sphere)
      this.sphere.getBoundingBox(t);
    else {
      const e = this.obb || this.regionObb;
      t.copy(e.box).applyMatrix4(e.transform);
    }
  }
  getSphere(t) {
    if (this.sphere)
      t.copy(this.sphere);
    else if (this.region)
      this.region.getBoundingSphere(t);
    else {
      const e = this.obb || this.regionObb;
      e.box.getBoundingSphere(t), t.applyMatrix4(e.transform);
    }
  }
  setObbData(t, e) {
    const i = new Gt();
    CameraTransitionManager_53n8z_Xc_$.set(t[3], t[4], t[5]), CameraTransitionManager_53n8z_Xc_Y.set(t[6], t[7], t[8]), CameraTransitionManager_53n8z_Xc_X.set(t[9], t[10], t[11]);
    const s = CameraTransitionManager_53n8z_Xc_$.length(), o = CameraTransitionManager_53n8z_Xc_Y.length(), n = CameraTransitionManager_53n8z_Xc_X.length();
    CameraTransitionManager_53n8z_Xc_$.normalize(), CameraTransitionManager_53n8z_Xc_Y.normalize(), CameraTransitionManager_53n8z_Xc_X.normalize(), s === 0 && CameraTransitionManager_53n8z_Xc_$.crossVectors(CameraTransitionManager_53n8z_Xc_Y, CameraTransitionManager_53n8z_Xc_X), o === 0 && CameraTransitionManager_53n8z_Xc_Y.crossVectors(CameraTransitionManager_53n8z_Xc_$, CameraTransitionManager_53n8z_Xc_X), n === 0 && CameraTransitionManager_53n8z_Xc_X.crossVectors(CameraTransitionManager_53n8z_Xc_$, CameraTransitionManager_53n8z_Xc_Y), i.transform.set(
      CameraTransitionManager_53n8z_Xc_$.x,
      CameraTransitionManager_53n8z_Xc_Y.x,
      CameraTransitionManager_53n8z_Xc_X.x,
      t[0],
      CameraTransitionManager_53n8z_Xc_$.y,
      CameraTransitionManager_53n8z_Xc_Y.y,
      CameraTransitionManager_53n8z_Xc_X.y,
      t[1],
      CameraTransitionManager_53n8z_Xc_$.z,
      CameraTransitionManager_53n8z_Xc_Y.z,
      CameraTransitionManager_53n8z_Xc_X.z,
      t[2],
      0,
      0,
      0,
      1
    ).premultiply(e), i.box.min.set(-s, -o, -n), i.box.max.set(s, o, n), i.update(), this.obb = i;
  }
  setSphereData(t, e, i, s, o) {
    const n = new external_three_.Sphere();
    n.center.set(t, e, i), n.radius = s, n.applyMatrix4(o), this.sphere = n;
  }
  setRegionData(t, e, i, s, o, n, r) {
    const a = new $t(
      ...t.radius,
      i,
      o,
      e,
      s,
      n,
      r
    ), c = new Gt();
    a.getBoundingBox(c.box, c.transform), c.update(), this.region = a, this.regionObb = c;
  }
}
const yi = /* @__PURE__ */ new external_three_.Matrix3();
function xi(f, t, e, i) {
  const s = yi.set(
    f.normal.x,
    f.normal.y,
    f.normal.z,
    t.normal.x,
    t.normal.y,
    t.normal.z,
    e.normal.x,
    e.normal.y,
    e.normal.z
  );
  return i.set(-f.constant, -t.constant, -e.constant), i.applyMatrix3(s.invert()), i;
}
class bi extends external_three_.Frustum {
  constructor() {
    super(), this.points = Array(8).fill().map(() => new external_three_.Vector3());
  }
  setFromProjectionMatrix(...t) {
    return super.setFromProjectionMatrix(...t), this.calculateFrustumPoints(), this;
  }
  calculateFrustumPoints() {
    const { planes: t, points: e } = this;
    [
      [t[0], t[3], t[4]],
      // Near top left
      [t[1], t[3], t[4]],
      // Near top right
      [t[0], t[2], t[4]],
      // Near bottom left
      [t[1], t[2], t[4]],
      // Near bottom right
      [t[0], t[3], t[5]],
      // Far top left
      [t[1], t[3], t[5]],
      // Far top right
      [t[0], t[2], t[5]],
      // Far bottom left
      [t[1], t[2], t[5]]
      // Far bottom right
    ].forEach((s, o) => {
      xi(s[0], s[1], s[2], e[o]);
    });
  }
}
const de = /* @__PURE__ */ new external_three_.Matrix4(), ue = /* @__PURE__ */ new external_three_.Euler(), CameraTransitionManager_53n8z_Xc_Ue = Symbol("INITIAL_FRUSTUM_CULLED"), CameraTransitionManager_53n8z_Xc_Rt = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_Mt = /* @__PURE__ */ new external_three_.Vector3(), qt = /* @__PURE__ */ new external_three_.Vector2(), _i = /* @__PURE__ */ new external_three_.Vector3(1, 0, 0), Mi = /* @__PURE__ */ new external_three_.Vector3(0, 1, 0);
function CameraTransitionManager_53n8z_Xc_me(f, t) {
  f.traverse((e) => {
    e.frustumCulled = e[CameraTransitionManager_53n8z_Xc_Ue] && t;
  });
}
class Vi extends Re {
  /**
   * If `true`, all tile meshes automatically have `frustumCulled` set to `false` since the
   * tiles renderer performs its own frustum culling. If `displayActiveTiles` is `true` or
   * multiple cameras are being used, consider setting this to `false`.
   * @type {boolean}
   * @default true
   */
  get autoDisableRendererCulling() {
    return this._autoDisableRendererCulling;
  }
  set autoDisableRendererCulling(t) {
    this._autoDisableRendererCulling !== t && (super._autoDisableRendererCulling = t, this.forEachLoadedModel((e) => {
      CameraTransitionManager_53n8z_Xc_me(e, !t);
    }));
  }
  get optimizeRaycast() {
    return this._optimizeRaycast;
  }
  set optimizeRaycast(t) {
    console.warn('TilesRenderer: The "optimizeRaycast" option has been deprecated.'), this._optimizeRaycast = t;
  }
  constructor(...t) {
    super(...t), this.group = new mi(this), this.ellipsoid = Dt.clone(), this.cameras = [], this.cameraMap = /* @__PURE__ */ new Map(), this.cameraInfo = [], this._optimizeRaycast = !0, this._upRotationMatrix = new external_three_.Matrix4(), this._bytesUsed = /* @__PURE__ */ new WeakMap(), this._autoDisableRendererCulling = !0, this.manager = new external_three_.LoadingManager(), this._listeners = {};
  }
  addEventListener(t, e) {
    t === "load-tile-set" ? (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), t = "load-tileset") : t === "load-content" && console.warn('TilesRenderer: "load-content" event has been deprecated. Use "load-model" or "load-tileset" instead.'), external_three_.EventDispatcher.prototype.addEventListener.call(this, t, e);
  }
  hasEventListener(t, e) {
    return t === "load-tile-set" ? (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), t = "load-tileset") : t === "load-content" && console.warn('TilesRenderer: "load-content" event has been deprecated. Use "load-model" or "load-tileset" instead.'), external_three_.EventDispatcher.prototype.hasEventListener.call(this, t, e);
  }
  removeEventListener(t, e) {
    t === "load-tile-set" ? (console.warn('TilesRenderer: "load-tile-set" event has been deprecated. Use "load-tileset" instead.'), t = "load-tileset") : t === "load-content" && console.warn('TilesRenderer: "load-content" event has been deprecated. Use "load-model" or "load-tileset" instead.'), external_three_.EventDispatcher.prototype.removeEventListener.call(this, t, e);
  }
  dispatchEvent(t) {
    "tileset" in t && Object.defineProperty(t, "tileSet", {
      get() {
        return console.warn('TilesRenderer: "event.tileSet" has been deprecated. Use "event.tileset" instead.'), t.tileset;
      },
      enumerable: !1,
      configurable: !0
    }), external_three_.EventDispatcher.prototype.dispatchEvent.call(this, t);
  }
  /* Public API */
  /**
   * Returns the axis-aligned bounding box of the root tile in the group's local space.
   * @param {Box3} target - Target box to write into.
   * @returns {boolean} Whether the tileset is loaded and a bounding box is available.
   */
  getBoundingBox(t) {
    if (!this.root)
      return !1;
    const e = this.root.engineData.boundingVolume;
    return e ? (e.getAABB(t), !0) : !1;
  }
  /**
   * Returns the oriented bounding box and transform of the root tile.
   * @param {Box3} targetBox - Target box to write into (in local OBB space).
   * @param {Matrix4} targetMatrix - Transform from OBB local space to group local space.
   * @returns {boolean} Whether the tileset is loaded and an OBB is available.
   */
  getOrientedBoundingBox(t, e) {
    if (!this.root)
      return !1;
    const i = this.root.engineData.boundingVolume;
    return i ? (i.getOBB(t, e), !0) : !1;
  }
  /**
   * Returns the bounding sphere of the root tile in the group's local space.
   * @param {Sphere} target - Target sphere to write into.
   * @returns {boolean} Whether the tileset is loaded and a bounding sphere is available.
   */
  getBoundingSphere(t) {
    if (!this.root)
      return !1;
    const e = this.root.engineData.boundingVolume;
    return e ? (e.getSphere(t), !0) : !1;
  }
  /**
   * Iterates over all currently loaded tile scenes.
   * @param {Function} callback - Called with `( scene: Object3D, tile: object )` for each loaded tile.
   */
  forEachLoadedModel(t) {
    this.traverse((e) => {
      const i = e.engineData && e.engineData.scene;
      i && t(i, e);
    }, null, !1);
  }
  /**
   * Performs a raycast against all loaded tile scenes. Compatible with Three.js raycasting.
   * Supports `raycaster.firstHitOnly` for early termination.
   * @param {Raycaster} raycaster
   * @param {Array} intersects - Array to push intersection results into.
   */
  raycast(t, e) {
    if (this.root)
      if (t.firstHitOnly) {
        const i = Le(this, this.root, t);
        i && e.push(i);
      } else
        We(this, this.root, t, e);
  }
  /**
   * Returns whether the given camera is registered with this renderer.
   * @param {Camera} camera
   * @returns {boolean}
   */
  hasCamera(t) {
    return this.cameraMap.has(t);
  }
  /**
   * Registers a camera with the renderer so it is used for tile selection and screen-space error
   * calculation. Use `setResolution` or `setResolutionFromRenderer` to provide the camera's resolution.
   * @param {Camera} camera
   * @returns {boolean} Whether the camera was newly added.
   */
  setCamera(t) {
    const e = this.cameras, i = this.cameraMap;
    return i.has(t) ? !1 : (i.set(t, new external_three_.Vector2()), e.push(t), this.dispatchEvent({ type: "add-camera", camera: t }), !0);
  }
  /**
   * Sets the render resolution for a registered camera, used for screen-space error calculation.
   * @param {Camera} camera - A previously registered camera.
   * @param {number|Vector2} xOrVec - Render width in pixels, or a Vector2 containing width and height.
   * @param {number} [y] - Render height in pixels when `xOrVec` is a number.
   * @returns {boolean} Whether the camera is registered and the resolution was updated.
   */
  setResolution(t, e, i) {
    const s = this.cameraMap;
    if (!s.has(t))
      return !1;
    const o = e.isVector2 ? e.x : e, n = e.isVector2 ? e.y : i, r = s.get(t);
    return (r.width !== o || r.height !== n) && (r.set(o, n), this.dispatchEvent({ type: "camera-resolution-change" })), !0;
  }
  /**
   * Sets the render resolution for a camera by reading the current size from a WebGLRenderer.
   * @param {Camera} camera - A previously registered camera.
   * @param {WebGLRenderer} renderer
   * @returns {boolean} Whether the camera is registered and the resolution was updated.
   */
  setResolutionFromRenderer(t, e) {
    return e.getSize(qt), this.setResolution(t, qt.x, qt.y);
  }
  /**
   * Unregisters a camera from the renderer.
   * @param {Camera} camera
   * @returns {boolean} Whether the camera was found and removed.
   */
  deleteCamera(t) {
    const e = this.cameras, i = this.cameraMap;
    if (i.has(t)) {
      const s = e.indexOf(t);
      return e.splice(s, 1), i.delete(t), this.dispatchEvent({ type: "delete-camera", camera: t }), !0;
    }
    return !1;
  }
  /* Overriden */
  loadRootTileset(...t) {
    return super.loadRootTileset(...t).then((e) => {
      const { asset: i, extensions: s = {} } = e;
      switch ((i && i.gltfUpAxis || "y").toLowerCase()) {
        case "x":
          this._upRotationMatrix.makeRotationAxis(Mi, -Math.PI / 2);
          break;
        case "y":
          this._upRotationMatrix.makeRotationAxis(_i, Math.PI / 2);
          break;
      }
      if ("3DTILES_ellipsoid" in s) {
        const n = s["3DTILES_ellipsoid"], { ellipsoid: r } = this;
        r.name = n.body, n.radii ? r.radius.set(...n.radii) : r.radius.set(1, 1, 1);
      }
      return e;
    });
  }
  prepareForTraversal() {
    const t = this.group, e = this.cameras, i = this.cameraMap, s = this.cameraInfo;
    for (; s.length > e.length; )
      s.pop();
    for (; s.length < e.length; )
      s.push({
        frustum: new bi(),
        isOrthographic: !1,
        sseDenominator: -1,
        // used if isOrthographic:false
        position: new external_three_.Vector3(),
        invScale: -1,
        pixelSize: 0
        // used if isOrthographic:true
      });
    CameraTransitionManager_53n8z_Xc_Mt.setFromMatrixScale(t.matrixWorldInverse), Math.abs(Math.max(CameraTransitionManager_53n8z_Xc_Mt.x - CameraTransitionManager_53n8z_Xc_Mt.y, CameraTransitionManager_53n8z_Xc_Mt.x - CameraTransitionManager_53n8z_Xc_Mt.z)) > 1e-6 && console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");
    for (let o = 0, n = s.length; o < n; o++) {
      const r = e[o], a = s[o], c = a.frustum, p = a.position, h = i.get(r);
      (h.width === 0 || h.height === 0) && console.warn("TilesRenderer: resolution for camera error calculation is not set.");
      const m = r.projectionMatrix.elements;
      if (a.isOrthographic = m[15] === 1, a.isOrthographic) {
        const u = 2 / m[0], l = 2 / m[5];
        a.pixelSize = Math.max(l / h.height, u / h.width);
      } else
        a.sseDenominator = 2 / m[5] / h.height;
      CameraTransitionManager_53n8z_Xc_Rt.copy(t.matrixWorld), CameraTransitionManager_53n8z_Xc_Rt.premultiply(r.matrixWorldInverse), CameraTransitionManager_53n8z_Xc_Rt.premultiply(r.projectionMatrix), c.setFromProjectionMatrix(CameraTransitionManager_53n8z_Xc_Rt, r.coordinateSystem, r.reversedDepth), p.set(0, 0, 0), p.applyMatrix4(r.matrixWorld), p.applyMatrix4(t.matrixWorldInverse);
    }
  }
  update() {
    if (super.update(), this.cameras.length === 0 && this.root) {
      let t = !1;
      this.invokeAllPlugins((e) => t = t || !!(e !== this && e.calculateTileViewError)), t === !1 && console.warn("TilesRenderer: no cameras defined. Cannot update 3d tiles.");
    }
  }
  preprocessNode(t, e, i = null) {
    super.preprocessNode(t, e, i);
    const s = new external_three_.Matrix4();
    if (t.transform) {
      const r = t.transform;
      for (let a = 0; a < 16; a++)
        s.elements[a] = r[a];
    }
    i && s.premultiply(i.engineData.transform);
    const o = new external_three_.Matrix4().copy(s).invert(), n = new gi();
    "sphere" in t.boundingVolume && n.setSphereData(...t.boundingVolume.sphere, s), "box" in t.boundingVolume && n.setObbData(t.boundingVolume.box, s), "region" in t.boundingVolume && n.setRegionData(this.ellipsoid, ...t.boundingVolume.region), t.engineData.transform = s, t.engineData.transformInverse = o, t.engineData.boundingVolume = n, t.engineData.geometry = null, t.engineData.materials = null, t.engineData.textures = null;
  }
  async parseTile(t, e, i, s, o) {
    const n = e.engineData, r = LoaderBase_ATuDWTDB_c(s), a = this.fetchOptions, c = this.manager;
    let p = null;
    const h = n.transform, m = this._upRotationMatrix, u = (LoaderBase_ATuDWTDB_d(t) || i).toLowerCase();
    switch (u) {
      case "b3dm": {
        const g = new Ee(c);
        g.workingPath = r, g.fetchOptions = a, g.adjustmentTransform.copy(m), p = g.parse(t);
        break;
      }
      case "pnts": {
        const g = new CameraTransitionManager_53n8z_Xc_Re(c);
        g.workingPath = r, g.fetchOptions = a, p = g.parse(t);
        break;
      }
      case "i3dm": {
        const g = new Oe(c);
        g.workingPath = r, g.fetchOptions = a, g.adjustmentTransform.copy(m), g.ellipsoid.copy(this.ellipsoid), p = g.parse(t);
        break;
      }
      case "cmpt": {
        const g = new ui(c);
        g.workingPath = r, g.fetchOptions = a, g.adjustmentTransform.copy(m), g.ellipsoid.copy(this.ellipsoid), p = g.parse(t).then((R) => R.scene);
        break;
      }
      // 3DTILES_content_gltf
      case "gltf":
      case "glb": {
        const g = c.getHandler("path.gltf") || c.getHandler("path.glb") || new GLTFLoader(c);
        g.setWithCredentials(a.credentials === "include"), g.setRequestHeader(a.headers || {}), a.credentials === "include" && a.mode === "cors" && g.setCrossOrigin("use-credentials");
        let R = g.resourcePath || g.path || r;
        !/[\\/]$/.test(R) && R.length && (R += "/"), p = g.parseAsync(t, R).then((D) => {
          D.scene = D.scene || new external_three_.Group();
          const { scene: v } = D;
          return v.updateMatrix(), v.matrix.multiply(m).decompose(v.position, v.quaternion, v.scale), D;
        });
        break;
      }
      default: {
        p = this.invokeOnePlugin((g) => g.parseToMesh && g.parseToMesh(t, e, i, s, o));
        break;
      }
    }
    const l = await p;
    if (l === null)
      throw new Error(`TilesRenderer: Content type "${u}" not supported.`);
    let d, x;
    l.isObject3D ? (d = l, x = null) : (d = l.scene, x = l), d.updateMatrix(), d.matrix.premultiply(h), d.matrix.decompose(d.position, d.quaternion, d.scale), await this.invokeAllPlugins((g) => g.processTileModel && g.processTileModel(d, e)), d.traverse((g) => {
      g[CameraTransitionManager_53n8z_Xc_Ue] = g.frustumCulled;
    }), CameraTransitionManager_53n8z_Xc_me(d, !this.autoDisableRendererCulling);
    const O = [], M = [], P = [];
    if (d.traverse((g) => {
      if (g.geometry && M.push(g.geometry), g.material) {
        const R = g.material;
        O.push(g.material);
        for (const D in R) {
          const v = R[D];
          v && v.isTexture && P.push(v);
        }
      }
    }), o.aborted) {
      for (let g = 0, R = P.length; g < R; g++) {
        const D = P[g];
        D.image instanceof ImageBitmap && D.image.close(), D.dispose();
      }
      return;
    }
    n.materials = O, n.geometry = M, n.textures = P, n.scene = d, n.metadata = x;
  }
  disposeTile(t) {
    super.disposeTile(t);
    const e = t.engineData;
    if (e.scene) {
      const i = e.materials, s = e.geometry, o = e.textures, n = e.scene.parent;
      e.scene.traverse((r) => {
        r.userData.meshFeatures && r.userData.meshFeatures.dispose(), r.userData.structuralMetadata && r.userData.structuralMetadata.dispose();
      });
      for (let r = 0, a = s.length; r < a; r++)
        s[r].dispose();
      for (let r = 0, a = i.length; r < a; r++)
        i[r].dispose();
      for (let r = 0, a = o.length; r < a; r++) {
        const c = o[r];
        c.image instanceof ImageBitmap && c.image.close(), c.dispose();
      }
      n && n.remove(e.scene), e.scene = null, e.materials = null, e.textures = null, e.geometry = null, e.metadata = null;
    }
  }
  setTileVisible(t, e) {
    const i = t.engineData.scene, s = this.group;
    e ? i && (s.add(i), i.updateMatrixWorld(!0)) : i && s.remove(i), super.setTileVisible(t, e);
  }
  calculateBytesUsed(t, e) {
    const i = this._bytesUsed;
    return !i.has(t) && e && i.set(t, Ot(e)), i.get(t) ?? null;
  }
  calculateTileViewError(t, e) {
    const i = t.engineData, s = this.cameras, o = this.cameraInfo, n = i.boundingVolume;
    let r = !1, a = 0, c = 1 / 0, p = 0, h = 1 / 0;
    for (let m = 0, u = s.length; m < u; m++) {
      const l = o[m];
      let d, x;
      if (l.isOrthographic) {
        const M = l.pixelSize;
        d = t.geometricError / M, x = 1 / 0;
      } else {
        const M = l.sseDenominator;
        x = n.distanceToPoint(l.position), d = x === 0 ? 1 / 0 : t.geometricError / (x * M);
      }
      const O = o[m].frustum;
      n.intersectsFrustum(O) && (r = !0, a = Math.max(a, d), c = Math.min(c, x)), p = Math.max(p, d), h = Math.min(h, x);
    }
    r ? (e.inView = !0, e.error = a, e.distanceFromCamera = c) : (e.inView = !1, e.error = p, e.distanceFromCamera = h);
  }
  // adjust the rotation of the group such that Y is altitude, X is North, and Z is East
  setLatLonToYUp(t, e) {
    console.warn("TilesRenderer: setLatLonToYUp is deprecated. Use the ReorientationPlugin, instead.");
    const { ellipsoid: i, group: s } = this;
    ue.set(Math.PI / 2, Math.PI / 2, 0), de.makeRotationFromEuler(ue), i.getEastNorthUpFrame(t, e, 0, s.matrix).multiply(de).invert().decompose(
      s.position,
      s.quaternion,
      s.scale
    ), s.updateMatrixWorld(!0);
  }
  dispose() {
    super.dispose(), this.group.removeFromParent();
  }
}
class Pi extends external_three_.Mesh {
  constructor() {
    super(new external_three_.PlaneGeometry(0, 0), new wi()), this.renderOrder = 1 / 0;
  }
  onBeforeRender(t) {
    const e = this.material.uniforms;
    t.getSize(e.resolution.value);
  }
  updateMatrixWorld() {
    this.matrixWorld.makeTranslation(this.position);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class wi extends external_three_.ShaderMaterial {
  constructor() {
    super({
      depthWrite: !1,
      depthTest: !1,
      transparent: !0,
      uniforms: {
        resolution: { value: new external_three_.Vector2() },
        size: { value: 15 },
        thickness: { value: 2 },
        opacity: { value: 1 }
      },
      vertexShader: (
        /* glsl */
        `

				uniform float size;
				uniform float thickness;
				uniform vec2 resolution;
				varying vec2 vUv;

				void main() {

					vUv = uv;

					float aspect = resolution.x / resolution.y;
					vec2 offset = uv * 2.0 - vec2( 1.0 );
					offset.y *= aspect;

					vec4 screenPoint = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
					screenPoint.xy += offset * ( size + thickness ) * screenPoint.w / resolution.x;

					gl_Position = screenPoint;

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform float size;
				uniform float thickness;
				uniform float opacity;

				varying vec2 vUv;
				void main() {

					float ht = 0.5 * thickness;
					float planeDim = size + thickness;
					float offset = ( planeDim - ht - 2.0 ) / planeDim;
					float texelThickness = ht / planeDim;

					vec2 vec = vUv * 2.0 - vec2( 1.0 );
					float dist = abs( length( vec ) - offset );
					float fw = fwidth( dist ) * 0.5;
					float a = smoothstep( texelThickness - fw, texelThickness + fw, dist );

					gl_FragColor = vec4( 1, 1, 1, opacity * ( 1.0 - a ) );

				}
			`
      )
    });
  }
}
const fe = /* @__PURE__ */ new external_three_.Vector2(), CameraTransitionManager_53n8z_Xc_ge = /* @__PURE__ */ new external_three_.Vector2();
class Ti {
  constructor() {
    this.domElement = null, this.buttons = 0, this.pointerType = null, this.pointerOrder = [], this.previousPositions = {}, this.pointerPositions = {}, this.startPositions = {}, this.pointerSetThisFrame = {}, this.hoverPosition = new external_three_.Vector2(), this.hoverSet = !1;
  }
  reset() {
    this.buttons = 0, this.pointerType = null, this.pointerOrder = [], this.previousPositions = {}, this.pointerPositions = {}, this.startPositions = {}, this.pointerSetThisFrame = {}, this.hoverPosition = new external_three_.Vector2(), this.hoverSet = !1;
  }
  // The pointers can be set multiple times per frame so track whether the pointer has
  // been set this frame or not so we don't overwrite the previous position and lose information
  // about pointer movement
  updateFrame() {
    const { previousPositions: t, pointerPositions: e } = this;
    for (const i in e)
      t[i].copy(e[i]);
  }
  setHoverEvent(t) {
    (t.pointerType === "mouse" || t.type === "wheel") && (this.getAdjustedPointer(t, this.hoverPosition), this.hoverSet = !0);
  }
  getLatestPoint(t) {
    return this.pointerType !== null ? (this.getCenterPoint(t), t) : this.hoverSet ? (t.copy(this.hoverPosition), t) : null;
  }
  // get the pointer position in the coordinate system of the target element
  getAdjustedPointer(t, e) {
    const s = (this.domElement ? this.domElement : t.target).getBoundingClientRect(), o = t.clientX - s.left, n = t.clientY - s.top;
    e.set(o, n);
  }
  addPointer(t) {
    const e = t.pointerId, i = new external_three_.Vector2();
    this.getAdjustedPointer(t, i), this.pointerOrder.push(e), this.pointerPositions[e] = i, this.previousPositions[e] = i.clone(), this.startPositions[e] = i.clone(), this.getPointerCount() === 1 && (this.pointerType = t.pointerType, this.buttons = t.buttons);
  }
  updatePointer(t) {
    const e = t.pointerId;
    return e in this.pointerPositions ? (this.getAdjustedPointer(t, this.pointerPositions[e]), !0) : !1;
  }
  deletePointer(t) {
    const e = t.pointerId, i = this.pointerOrder;
    i.splice(i.indexOf(e), 1), delete this.pointerPositions[e], delete this.previousPositions[e], delete this.startPositions[e], this.getPointerCount() === 0 && (this.buttons = 0, this.pointerType = null);
  }
  getPointerCount() {
    return this.pointerOrder.length;
  }
  getCenterPoint(t, e = this.pointerPositions) {
    const i = this.pointerOrder;
    if (this.getPointerCount() === 1 || this.getPointerType() === "mouse") {
      const s = i[0];
      return t.copy(e[s]), t;
    } else if (this.getPointerCount() === 2) {
      const s = this.pointerOrder[0], o = this.pointerOrder[1], n = e[s], r = e[o];
      return t.addVectors(n, r).multiplyScalar(0.5), t;
    }
    return null;
  }
  getPreviousCenterPoint(t) {
    return this.getCenterPoint(t, this.previousPositions);
  }
  getStartCenterPoint(t) {
    return this.getCenterPoint(t, this.startPositions);
  }
  getMoveDistance() {
    return this.getCenterPoint(fe), this.getPreviousCenterPoint(CameraTransitionManager_53n8z_Xc_ge), fe.sub(CameraTransitionManager_53n8z_Xc_ge).length();
  }
  getTouchPointerDistance(t = this.pointerPositions) {
    if (this.getPointerCount() <= 1 || this.getPointerType() === "mouse")
      return 0;
    const { pointerOrder: e } = this, i = e[0], s = e[1], o = t[i], n = t[s];
    return o.distanceTo(n);
  }
  getPreviousTouchPointerDistance() {
    return this.getTouchPointerDistance(this.previousPositions);
  }
  getStartTouchPointerDistance() {
    return this.getTouchPointerDistance(this.startPositions);
  }
  getPointerType() {
    return this.pointerType;
  }
  isPointerTouch() {
    return this.getPointerType() === "touch";
  }
  getPointerButtons() {
    return this.buttons;
  }
  isLeftClicked() {
    return !!(this.buttons & 1);
  }
  isRightClicked() {
    return !!(this.buttons & 2);
  }
}
const CameraTransitionManager_53n8z_Xc_Ot = /* @__PURE__ */ new external_three_.Matrix4();
function xt(f, t, e) {
  return e.makeTranslation(-f.x, -f.y, -f.z), CameraTransitionManager_53n8z_Xc_Ot.makeRotationFromQuaternion(t), e.premultiply(CameraTransitionManager_53n8z_Xc_Ot), CameraTransitionManager_53n8z_Xc_Ot.makeTranslation(f.x, f.y, f.z), e.premultiply(CameraTransitionManager_53n8z_Xc_Ot), e;
}
function CameraTransitionManager_53n8z_Xc_ft(f, t, e) {
  e.x = f.x / t.clientWidth * 2 - 1, e.y = -(f.y / t.clientHeight) * 2 + 1, e.isVector3 && (e.z = 0);
}
function CameraTransitionManager_53n8z_Xc_j(f, t, e) {
  const i = f instanceof external_three_.Ray ? f : f.ray, { origin: s, direction: o } = i;
  s.set(t.x, t.y, -1).unproject(e), o.set(t.x, t.y, 1).unproject(e).sub(s), f.isRay || (f.near = 0, f.far = o.length(), f.camera = e), o.normalize();
}
const CameraTransitionManager_53n8z_Xc_Z = 0, it = 1, CameraTransitionManager_53n8z_Xc_K = 2, gt = 3, Qt = 4, CameraTransitionManager_53n8z_Xc_q = 5, CameraTransitionManager_53n8z_Xc_$t = 0.05, Yt = 0.025, et = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_It = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_k = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_ = /* @__PURE__ */ new external_three_.Vector3(), zt = /* @__PURE__ */ new external_three_.Vector3(), Ft = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_L = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_H = /* @__PURE__ */ new external_three_.Vector3(), Xt = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_At = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_G = /* @__PURE__ */ new external_three_.Quaternion(), CameraTransitionManager_53n8z_Xc_ye = /* @__PURE__ */ new external_three_.Plane(), CameraTransitionManager_53n8z_Xc_I = /* @__PURE__ */ new external_three_.Vector3(), Lt = /* @__PURE__ */ new external_three_.Vector3(), Kt = /* @__PURE__ */ new external_three_.Vector3(), vi = /* @__PURE__ */ new external_three_.Quaternion(), CameraTransitionManager_53n8z_Xc_S = /* @__PURE__ */ new external_three_.Ray(), Wt = /* @__PURE__ */ new external_three_.Vector3(), Ut = /* @__PURE__ */ new external_three_.Vector2(), CameraTransitionManager_53n8z_Xc_V = /* @__PURE__ */ new external_three_.Vector2(), xe = /* @__PURE__ */ new external_three_.Vector2(), CameraTransitionManager_53n8z_Xc_Pt = /* @__PURE__ */ new external_three_.Vector2(), Jt = /* @__PURE__ */ new external_three_.Vector2(), CameraTransitionManager_53n8z_Xc_be = /* @__PURE__ */ new external_three_.Vector2(), CameraTransitionManager_53n8z_Xc_te = { type: "change" }, _e = { type: "start" }, Me = { type: "end" };
class Di extends external_three_.EventDispatcher {
  /**
   * Whether the controls are active. When set to false, all input is ignored
   * and inertia is cleared.
   * @type {boolean}
   * @default true
   */
  get enabled() {
    return this._enabled;
  }
  set enabled(t) {
    t !== this.enabled && (this._enabled = t, this.resetState(), this.pointerTracker.reset(), this.enabled || (this.dragInertia.set(0, 0, 0), this.rotationInertia.set(0, 0)));
  }
  constructor(t = null, e = null, i = null, s = null) {
    super(), this.isEnvironmentControls = !0, this.domElement = null, this.camera = null, this.scene = null, this.tilesRenderer = null, this._enabled = !0, this.cameraRadius = 5, this.rotationSpeed = 1, this.minAltitude = 0, this.maxAltitude = 0.45 * Math.PI, this.minDistance = 10, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.zoomSpeed = 1, this.adjustHeight = !0, this.enableDamping = !1, this.dampingFactor = 0.15, this.fallbackPlane = new external_three_.Plane(new external_three_.Vector3(0, 1, 0), 0), this.useFallbackPlane = !0, this.enableFlight = !1, this.flightSpeed = 10, this.flightSpeedMultiplier = 4, this.scaleZoomOrientationAtEdges = !1, this.autoAdjustCameraRotation = !0, this.state = CameraTransitionManager_53n8z_Xc_Z, this.pointerTracker = new Ti(), this.needsUpdate = !1, this.actionHeightOffset = 0, this.pivotPoint = new external_three_.Vector3(), this.zoomDirectionSet = !1, this.zoomPointSet = !1, this.zoomDirection = new external_three_.Vector3(), this.zoomPoint = new external_three_.Vector3(), this.zoomDelta = 0, this.rotationInertiaPivot = new external_three_.Vector3(), this.rotationInertia = new external_three_.Vector2(), this.dragInertia = new external_three_.Vector3(), this.inertiaTargetDistance = 1 / 0, this.inertiaStableFrames = 0, this.pivotMesh = new Pi(), this.pivotMesh.raycast = () => {
    }, this.pivotMesh.scale.setScalar(0.25), this.raycaster = new external_three_.Raycaster(), this.raycaster.firstHitOnly = !0, this.up = new external_three_.Vector3(0, 1, 0), this._lastTime = performance.now(), this._keysDown = /* @__PURE__ */ new Set(), this._detachCallback = null, this._upInitialized = !1, this._lastUsedState = CameraTransitionManager_53n8z_Xc_Z, this._zoomPointWasSet = !1, this._tilesOnChangeCallback = () => this.zoomPointSet = !1, i && this.attach(i), e && this.setCamera(e), t && this.setScene(t), s && this.setTilesRenderer(s);
  }
  _getDeltaTime() {
    const t = performance.now(), e = t - this._lastTime;
    return this._lastTime = t, e * 1e-3;
  }
  /**
   * Sets the scene to raycast against for surface-based interaction.
   * @param {Object3D} scene
   */
  setScene(t) {
    this.scene = t;
  }
  /**
   * Sets the camera to control.
   * @param {Camera} camera
   */
  setCamera(t) {
    this.camera = t, this._upInitialized = !1, this.zoomDirectionSet = !1, this.zoomPointSet = !1, this.needsUpdate = !0, this.raycaster.camera = t, this.resetState();
  }
  setTilesRenderer(t) {
    console.warn('EnvironmentControls: "setTilesRenderer" has been deprecated. Use "setScene" and "setEllipsoid", instead.'), this.tilesRenderer = t, this.tilesRenderer !== null && this.setScene(this.tilesRenderer.group);
  }
  /**
   * Attaches the controls to a DOM element, registering all pointer and keyboard event listeners.
   * @param {HTMLElement} domElement
   */
  attach(t) {
    if (this.domElement)
      throw new Error("EnvironmentControls: Controls already attached to element");
    this.domElement = t, this.pointerTracker.domElement = t, t.style.touchAction = "none", t.hasAttribute("tabindex") || (t.tabIndex = -1);
    const e = (u) => {
      this.enabled && u.preventDefault();
    }, i = (u) => {
      const {
        camera: l,
        raycaster: d,
        domElement: x,
        up: O,
        pivotMesh: M,
        pointerTracker: P,
        scene: g,
        pivotPoint: R,
        enabled: D,
        enableFlight: v,
        _keysDown: C
      } = this;
      if (!this.enabled)
        return;
      if (u.preventDefault(), x.focus(), P.addPointer(u), this.needsUpdate = !0, P.isPointerTouch()) {
        if (M.visible = !1, P.getPointerCount() === 0)
          x.setPointerCapture(u.pointerId);
        else if (P.getPointerCount() > 2) {
          this.resetState();
          return;
        }
      }
      P.getCenterPoint(CameraTransitionManager_53n8z_Xc_V), CameraTransitionManager_53n8z_Xc_ft(CameraTransitionManager_53n8z_Xc_V, x, CameraTransitionManager_53n8z_Xc_V), CameraTransitionManager_53n8z_Xc_j(d, CameraTransitionManager_53n8z_Xc_V, l);
      const F = Math.abs(d.ray.direction.dot(O));
      if (F < CameraTransitionManager_53n8z_Xc_$t || F < Yt)
        return;
      const ot = C.has("w") || C.has("s") || C.has("a") || C.has("d") || C.has("q") || C.has("e") || C.has("arrowup") || C.has("arrowdown") || C.has("arrowleft") || C.has("arrowright") || C.has("shift");
      if (v && ot && !P.isPointerTouch() && (P.isRightClicked() || P.isLeftClicked())) {
        R.copy(l.position), this.setState(CameraTransitionManager_53n8z_Xc_q);
        return;
      }
      const A = this._raycast(d);
      A && (P.getPointerCount() === 2 || P.isRightClicked() || P.isLeftClicked() && u.shiftKey ? (R.copy(A.point), M.position.copy(A.point), M.visible = P.isPointerTouch() ? !1 : D, M.updateMatrixWorld(), g.add(M), this.setState(P.isPointerTouch() ? Qt : CameraTransitionManager_53n8z_Xc_K)) : P.isLeftClicked() && (R.copy(A.point), M.position.copy(A.point), M.updateMatrixWorld(), g.add(M), this.setState(it)));
    };
    let s = !1;
    const o = (u) => {
      const { pointerTracker: l } = this;
      if (!this.enabled)
        return;
      u.preventDefault();
      const {
        pivotMesh: d,
        enabled: x
      } = this;
      this.zoomDirectionSet = !1, this.zoomPointSet = !1, this.state !== CameraTransitionManager_53n8z_Xc_Z && (this.needsUpdate = !0), l.setHoverEvent(u), l.updatePointer(u) && (l.isPointerTouch() && l.getPointerCount() === 2 && (s || (s = !0, queueMicrotask(() => {
        s = !1, l.getCenterPoint(Jt);
        const O = l.getStartTouchPointerDistance(), M = l.getTouchPointerDistance(), P = M - O;
        if (this.state === CameraTransitionManager_53n8z_Xc_Z || this.state === Qt) {
          l.getCenterPoint(Jt), l.getStartCenterPoint(CameraTransitionManager_53n8z_Xc_be);
          const g = 2 * window.devicePixelRatio, R = Jt.distanceTo(CameraTransitionManager_53n8z_Xc_be);
          (Math.abs(P) > g || R > g) && (Math.abs(P) > R ? (this.setState(gt), this.zoomDirectionSet = !1) : this.setState(CameraTransitionManager_53n8z_Xc_K));
        }
        if (this.state === gt) {
          const g = l.getPreviousTouchPointerDistance();
          this.zoomDelta += M - g, d.visible = !1;
        } else this.state === CameraTransitionManager_53n8z_Xc_K && (d.visible = x);
      }))), this.dispatchEvent(CameraTransitionManager_53n8z_Xc_te));
    }, n = (u) => {
      const { pointerTracker: l } = this;
      !this.enabled || l.getPointerCount() === 0 || (l.deletePointer(u), l.getPointerType() === "touch" && l.getPointerCount() === 0 && t.releasePointerCapture(u.pointerId), this.resetState(), this.needsUpdate = !0);
    }, r = (u) => {
      if (!this.enabled)
        return;
      u.preventDefault();
      const { pointerTracker: l } = this;
      l.setHoverEvent(u), l.updatePointer(u), this.dispatchEvent(_e);
      let d;
      switch (u.deltaMode) {
        case 2:
          d = u.deltaY * 800;
          break;
        case 1:
          d = u.deltaY * 40;
          break;
        case 0:
          d = u.deltaY;
          break;
      }
      const x = Math.sign(d), O = Math.abs(d);
      this.zoomDelta -= 0.25 * x * O, this.needsUpdate = !0, this._lastUsedState = gt, this.dispatchEvent(Me);
    }, a = (u) => {
      this.enabled && this.resetState();
    };
    t.addEventListener("contextmenu", e), t.addEventListener("pointerdown", i), t.addEventListener("wheel", r, { passive: !1 });
    const c = t.getRootNode();
    c.addEventListener("pointermove", o), c.addEventListener("pointerup", n), c.addEventListener("pointerleave", a);
    const p = (u) => {
      const { _keysDown: l, state: d } = this;
      l.add(u.key.toLowerCase()), (l.has("w") || l.has("s") || l.has("a") || l.has("d") || l.has("q") || l.has("e") || l.has("arrowup") || l.has("arrowdown") || l.has("arrowleft") || l.has("arrowright")) && d !== CameraTransitionManager_53n8z_Xc_q && this.resetState();
    }, h = (u) => {
      this._keysDown.delete(u.key.toLowerCase());
    }, m = () => {
      this._keysDown.clear();
    };
    t.addEventListener("keydown", p), window.addEventListener("keyup", h), window.addEventListener("blur", m), this._detachCallback = () => {
      t.removeEventListener("contextmenu", e), t.removeEventListener("pointerdown", i), t.removeEventListener("wheel", r), c.removeEventListener("pointermove", o), c.removeEventListener("pointerup", n), c.removeEventListener("pointerleave", a), t.removeEventListener("keydown", p), window.removeEventListener("keyup", h), window.removeEventListener("blur", m);
    };
  }
  /**
   * Detaches the controls from the DOM element, removing all event listeners.
   */
  detach() {
    this.domElement = null, this._detachCallback && (this._detachCallback(), this._detachCallback = null, this.pointerTracker.reset());
  }
  /**
   * Returns the local up direction at a world-space point. Override to provide terrain-aware
   * up vectors (e.g. ellipsoid normals). Default returns the controls' `up` vector.
   * @param {Vector3} point - World-space point to query.
   * @param {Vector3} target - Target vector to write the result into.
   */
  getUpDirection(t, e) {
    e.copy(this.up);
  }
  /**
   * Returns the local up direction at the camera's current position.
   * @param {Vector3} target - Target vector to write the result into.
   */
  getCameraUpDirection(t) {
    this.getUpDirection(this.camera.position, t);
  }
  /**
   * Returns the current drag or rotation pivot point in world space.
   * @param {Vector3} target - Target vector to write the result into.
   * @returns {Vector3|null} The target vector, or null if no pivot is active.
   */
  getPivotPoint(t) {
    let e = null;
    this._lastUsedState === gt ? this._zoomPointWasSet && (e = t.copy(this.zoomPoint)) : (this._lastUsedState === CameraTransitionManager_53n8z_Xc_K || this._lastUsedState === it) && (e = t.copy(this.pivotPoint));
    const { camera: i, raycaster: s } = this;
    e !== null && (CameraTransitionManager_53n8z_Xc_.copy(e).project(i), (CameraTransitionManager_53n8z_Xc_.x < -1 || CameraTransitionManager_53n8z_Xc_.x > 1 || CameraTransitionManager_53n8z_Xc_.y < -1 || CameraTransitionManager_53n8z_Xc_.y > 1) && (e = null)), CameraTransitionManager_53n8z_Xc_j(s, { x: 0, y: 0 }, i);
    const o = this._raycast(s);
    return o && (e === null || o.distance < e.distanceTo(s.ray.origin)) && (e = t.copy(o.point)), e;
  }
  /**
   * Clears the current interaction state, cancelling any active drag, rotate, or zoom.
   */
  resetState() {
    this.state !== CameraTransitionManager_53n8z_Xc_Z && this.dispatchEvent(Me), this.state = CameraTransitionManager_53n8z_Xc_Z, this.pivotMesh.removeFromParent(), this.pivotMesh.visible = this.enabled, this.actionHeightOffset = 0, this.pointerTracker.reset();
  }
  /**
   * Sets the current control state (e.g. `NONE`, `DRAG`, `ROTATE`, `ZOOM`).
   * @param {number} [state] - One of the exported state constants. Defaults to current state.
   * @param {boolean} [fireEvent=true] - Whether to dispatch `'start'` and `'end'` events.
   */
  setState(t = this.state, e = !0) {
    this.state !== t && (this.state === CameraTransitionManager_53n8z_Xc_Z && e && this.dispatchEvent(_e), this.pivotMesh.visible = this.enabled, this.dragInertia.set(0, 0, 0), this.rotationInertia.set(0, 0), this.inertiaStableFrames = 0, this.state = t, t !== CameraTransitionManager_53n8z_Xc_Z && t !== Qt && (this._lastUsedState = t));
  }
  /**
   * Applies pending input and inertia to the camera. Must be called each frame.
   * @param {number} [deltaTime] - Time in seconds since the last frame. Defaults to the clock delta, capped at 64ms.
   */
  update(t = Math.min(this._getDeltaTime(), 64 / 1e3)) {
    if (!this.enabled || !this.camera || t === 0)
      return;
    const {
      camera: e,
      cameraRadius: i,
      pivotPoint: s,
      up: o,
      state: n,
      adjustHeight: r,
      autoAdjustCameraRotation: a
    } = this;
    e.updateMatrixWorld(), this.getCameraUpDirection(CameraTransitionManager_53n8z_Xc_I), this._upInitialized || (this._upInitialized = !0, this.up.copy(CameraTransitionManager_53n8z_Xc_I)), this.zoomPointSet = !1;
    const c = this._inertiaNeedsUpdate(), p = this.needsUpdate || c;
    if (this.needsUpdate || c) {
      const u = this.zoomDelta;
      this._updateZoom(), this._updatePosition(t), this._updateRotation(t), n === it || n === CameraTransitionManager_53n8z_Xc_K || n === CameraTransitionManager_53n8z_Xc_q ? (CameraTransitionManager_53n8z_Xc_L.set(0, 0, -1).transformDirection(e.matrixWorld), this.inertiaTargetDistance = CameraTransitionManager_53n8z_Xc_.copy(s).sub(e.position).dot(CameraTransitionManager_53n8z_Xc_L)) : n === CameraTransitionManager_53n8z_Xc_Z && this._updateInertia(t), (n !== CameraTransitionManager_53n8z_Xc_Z || u !== 0 || c) && this.dispatchEvent(CameraTransitionManager_53n8z_Xc_te), this.needsUpdate = !1;
    }
    const h = this._updateFlight(t);
    h && (this.dragInertia.set(0, 0, 0), this.rotationInertia.set(0, 0, 0), this.dispatchEvent(CameraTransitionManager_53n8z_Xc_te));
    const m = e.isOrthographicCamera ? null : r && !h && this._getPointBelowCamera() || null;
    if (this.getCameraUpDirection(CameraTransitionManager_53n8z_Xc_I), this._setFrame(CameraTransitionManager_53n8z_Xc_I), (this.state === it || this.state === CameraTransitionManager_53n8z_Xc_K || this.state === CameraTransitionManager_53n8z_Xc_q) && this.actionHeightOffset !== 0) {
      const { actionHeightOffset: u } = this;
      e.position.addScaledVector(o, -u), s.addScaledVector(o, -u), m && (m.distance -= u);
    }
    if (this.actionHeightOffset = 0, m) {
      const u = m.distance;
      if (u < i) {
        const l = i - u;
        e.position.addScaledVector(o, l), s.addScaledVector(o, l), this.actionHeightOffset = l;
      }
    }
    this.pointerTracker.updateFrame(), (p && a || h) && (this.getCameraUpDirection(CameraTransitionManager_53n8z_Xc_I), this._alignCameraUp(CameraTransitionManager_53n8z_Xc_I, 1), this.getCameraUpDirection(CameraTransitionManager_53n8z_Xc_I), this._clampRotation(CameraTransitionManager_53n8z_Xc_I));
  }
  /**
   * Adjusts the camera to satisfy altitude and distance constraints. Called automatically by `update`.
   * Override in subclasses to add custom camera adjustment behaviour (e.g. near/far plane updates).
   * @param {Camera} camera
   */
  adjustCamera(t) {
    const { adjustHeight: e, cameraRadius: i } = this;
    if (t.isPerspectiveCamera) {
      this.getUpDirection(t.position, CameraTransitionManager_53n8z_Xc_I);
      const s = e && this._getPointBelowCamera(t.position, CameraTransitionManager_53n8z_Xc_I) || null;
      if (s) {
        const o = s.distance;
        o < i && t.position.addScaledVector(CameraTransitionManager_53n8z_Xc_I, i - o);
      }
    }
  }
  /**
   * Disposes of event listeners and internal resources. Calls `detach` if currently attached.
   */
  dispose() {
    this.detach();
  }
  // private
  _updateInertia(t) {
    const {
      rotationInertia: e,
      pivotPoint: i,
      dragInertia: s,
      enableDamping: o,
      dampingFactor: n,
      camera: r,
      cameraRadius: a,
      minDistance: c,
      inertiaTargetDistance: p
    } = this;
    if (!this.enableDamping || this.inertiaStableFrames > 1) {
      s.set(0, 0, 0), e.set(0, 0, 0);
      return;
    }
    const h = Math.pow(2, -t / n), m = Math.max(r.near, a, c, p), d = 0.25 * (2 / (2 * 1e3));
    if (e.lengthSq() > 0) {
      CameraTransitionManager_53n8z_Xc_j(CameraTransitionManager_53n8z_Xc_S, CameraTransitionManager_53n8z_Xc_.set(0, 0, -1), r), CameraTransitionManager_53n8z_Xc_S.applyMatrix4(r.matrixWorldInverse), CameraTransitionManager_53n8z_Xc_S.direction.normalize(), CameraTransitionManager_53n8z_Xc_S.recast(-CameraTransitionManager_53n8z_Xc_S.direction.dot(CameraTransitionManager_53n8z_Xc_S.origin)).at(m / CameraTransitionManager_53n8z_Xc_S.direction.z, CameraTransitionManager_53n8z_Xc_), CameraTransitionManager_53n8z_Xc_.applyMatrix4(r.matrixWorld), CameraTransitionManager_53n8z_Xc_j(CameraTransitionManager_53n8z_Xc_S, CameraTransitionManager_53n8z_Xc_k.set(d, d, -1), r), CameraTransitionManager_53n8z_Xc_S.applyMatrix4(r.matrixWorldInverse), CameraTransitionManager_53n8z_Xc_S.direction.normalize(), CameraTransitionManager_53n8z_Xc_S.recast(-CameraTransitionManager_53n8z_Xc_S.direction.dot(CameraTransitionManager_53n8z_Xc_S.origin)).at(m / CameraTransitionManager_53n8z_Xc_S.direction.z, CameraTransitionManager_53n8z_Xc_k), CameraTransitionManager_53n8z_Xc_k.applyMatrix4(r.matrixWorld), CameraTransitionManager_53n8z_Xc_.sub(i).normalize(), CameraTransitionManager_53n8z_Xc_k.sub(i).normalize();
      const x = CameraTransitionManager_53n8z_Xc_.angleTo(CameraTransitionManager_53n8z_Xc_k) / t;
      e.multiplyScalar(h), (e.lengthSq() < x ** 2 || !o) && e.set(0, 0);
    }
    if (s.lengthSq() > 0) {
      CameraTransitionManager_53n8z_Xc_j(CameraTransitionManager_53n8z_Xc_S, CameraTransitionManager_53n8z_Xc_.set(0, 0, -1), r), CameraTransitionManager_53n8z_Xc_S.applyMatrix4(r.matrixWorldInverse), CameraTransitionManager_53n8z_Xc_S.direction.normalize(), CameraTransitionManager_53n8z_Xc_S.recast(-CameraTransitionManager_53n8z_Xc_S.direction.dot(CameraTransitionManager_53n8z_Xc_S.origin)).at(m / CameraTransitionManager_53n8z_Xc_S.direction.z, CameraTransitionManager_53n8z_Xc_), CameraTransitionManager_53n8z_Xc_.applyMatrix4(r.matrixWorld), CameraTransitionManager_53n8z_Xc_j(CameraTransitionManager_53n8z_Xc_S, CameraTransitionManager_53n8z_Xc_k.set(d, d, -1), r), CameraTransitionManager_53n8z_Xc_S.applyMatrix4(r.matrixWorldInverse), CameraTransitionManager_53n8z_Xc_S.direction.normalize(), CameraTransitionManager_53n8z_Xc_S.recast(-CameraTransitionManager_53n8z_Xc_S.direction.dot(CameraTransitionManager_53n8z_Xc_S.origin)).at(m / CameraTransitionManager_53n8z_Xc_S.direction.z, CameraTransitionManager_53n8z_Xc_k), CameraTransitionManager_53n8z_Xc_k.applyMatrix4(r.matrixWorld);
      const x = CameraTransitionManager_53n8z_Xc_.distanceTo(CameraTransitionManager_53n8z_Xc_k) / t;
      s.multiplyScalar(h), (s.lengthSq() < x ** 2 || !o) && s.set(0, 0, 0);
    }
    e.lengthSq() > 0 && this._applyRotation(e.x * t, e.y * t, i), s.lengthSq() > 0 && (r.position.addScaledVector(s, t), r.updateMatrixWorld());
  }
  _inertiaNeedsUpdate() {
    const { rotationInertia: t, dragInertia: e } = this;
    return t.lengthSq() !== 0 || e.lengthSq() !== 0;
  }
  _getFlightSpeedScale() {
    return 1;
  }
  _updateFlight(t) {
    const {
      camera: e,
      enableFlight: i,
      flightSpeed: s,
      flightSpeedMultiplier: o,
      _keysDown: n
    } = this;
    if (!i || e.isOrthographicCamera)
      return !1;
    const r = n.has("w") || n.has("arrowup"), a = n.has("s") || n.has("arrowdown"), c = n.has("a") || n.has("arrowleft"), p = n.has("d") || n.has("arrowright"), h = n.has("q"), m = n.has("e"), l = (n.has("shift") ? o : 1) * s * this._getFlightSpeedScale() * t;
    return Wt.set(
      (p ? 1 : 0) - (c ? 1 : 0),
      (h ? 1 : 0) - (m ? 1 : 0),
      (a ? 1 : 0) - (r ? 1 : 0)
    ), Wt.lengthSq() === 0 ? !1 : (Wt.normalize().transformDirection(e.matrixWorld), e.position.addScaledVector(Wt, l), e.updateMatrixWorld(), !0);
  }
  _updateZoom() {
    const {
      zoomPoint: t,
      zoomDirection: e,
      camera: i,
      minDistance: s,
      maxDistance: o,
      pointerTracker: n,
      domElement: r,
      minZoom: a,
      maxZoom: c,
      zoomSpeed: p,
      state: h
    } = this;
    let m = this.zoomDelta;
    if (this.zoomDelta = 0, !(!n.getLatestPoint(CameraTransitionManager_53n8z_Xc_V) || m === 0 && h !== gt))
      if (this.rotationInertia.set(0, 0), this.dragInertia.set(0, 0, 0), i.isOrthographicCamera) {
        this._updateZoomDirection();
        const u = this.zoomPointSet || this._updateZoomPoint();
        Lt.unproject(i);
        const l = Math.pow(0.95, Math.abs(m * 0.05));
        let d = m > 0 ? 1 / Math.abs(l) : l;
        d *= p, d > 1 ? c < i.zoom * d && (d = 1) : a > i.zoom * d && (d = 1), i.zoom *= d, i.updateProjectionMatrix(), u && (CameraTransitionManager_53n8z_Xc_ft(CameraTransitionManager_53n8z_Xc_V, r, Kt), Kt.unproject(i), i.position.sub(Kt).add(Lt), i.updateMatrixWorld());
      } else {
        this._updateZoomDirection();
        const u = CameraTransitionManager_53n8z_Xc_.copy(e);
        if (this.zoomPointSet || this._updateZoomPoint()) {
          const l = t.distanceTo(i.position);
          if (m < 0) {
            const d = Math.min(0, l - o);
            m = m * l * p * 25e-4, m = Math.max(m, d);
          } else {
            const d = Math.max(0, l - s);
            m = m * Math.max(l - s, 0) * p * 25e-4, m = Math.min(m, d);
          }
          i.position.addScaledVector(e, m), i.updateMatrixWorld();
        } else {
          const l = this._getPointBelowCamera();
          if (l) {
            const d = l.distance;
            u.set(0, 0, -1).transformDirection(i.matrixWorld), i.position.addScaledVector(u, m * d * 0.01), i.updateMatrixWorld();
          } else
            i.position.addScaledVector(e, m), i.updateMatrixWorld();
        }
      }
  }
  _updateZoomDirection() {
    if (this.zoomDirectionSet)
      return;
    const { domElement: t, raycaster: e, camera: i, zoomDirection: s, pointerTracker: o } = this;
    o.getLatestPoint(CameraTransitionManager_53n8z_Xc_V), CameraTransitionManager_53n8z_Xc_ft(CameraTransitionManager_53n8z_Xc_V, t, Lt), CameraTransitionManager_53n8z_Xc_j(e, Lt, i), s.copy(e.ray.direction).normalize(), this.zoomDirectionSet = !0;
  }
  // update the point being zoomed in to based on the zoom direction
  _updateZoomPoint() {
    const {
      camera: t,
      zoomDirectionSet: e,
      zoomDirection: i,
      raycaster: s,
      zoomPoint: o,
      pointerTracker: n,
      domElement: r
    } = this;
    if (this._zoomPointWasSet = !1, !e)
      return !1;
    t.isOrthographicCamera && n.getLatestPoint(Ut) ? (CameraTransitionManager_53n8z_Xc_ft(Ut, r, Ut), CameraTransitionManager_53n8z_Xc_j(s, Ut, t)) : (s.ray.origin.copy(t.position), s.ray.direction.copy(i), s.near = 0, s.far = 1 / 0);
    const a = this._raycast(s);
    return a ? (o.copy(a.point), this.zoomPointSet = !0, this._zoomPointWasSet = !0, !0) : !1;
  }
  // returns the point below the camera
  _getPointBelowCamera(t = this.camera.position, e = this.up) {
    const { raycaster: i } = this;
    i.ray.direction.copy(e).multiplyScalar(-1), i.ray.origin.copy(t).addScaledVector(e, 1e5), i.near = 0, i.far = 1 / 0;
    const s = this._raycast(i);
    return s && (s.distance -= 1e5), s;
  }
  // update the drag action
  _updatePosition(t) {
    const {
      raycaster: e,
      camera: i,
      pivotPoint: s,
      up: o,
      pointerTracker: n,
      domElement: r,
      state: a,
      dragInertia: c
    } = this;
    if (a === it) {
      if (n.getCenterPoint(CameraTransitionManager_53n8z_Xc_V), CameraTransitionManager_53n8z_Xc_ft(CameraTransitionManager_53n8z_Xc_V, r, CameraTransitionManager_53n8z_Xc_V), CameraTransitionManager_53n8z_Xc_ye.setFromNormalAndCoplanarPoint(o, s), CameraTransitionManager_53n8z_Xc_j(e, CameraTransitionManager_53n8z_Xc_V, i), Math.abs(e.ray.direction.dot(o)) < CameraTransitionManager_53n8z_Xc_$t) {
        const p = Math.acos(CameraTransitionManager_53n8z_Xc_$t);
        CameraTransitionManager_53n8z_Xc_At.crossVectors(e.ray.direction, o).normalize(), e.ray.direction.copy(o).applyAxisAngle(CameraTransitionManager_53n8z_Xc_At, p).multiplyScalar(-1);
      }
      if (this.getUpDirection(s, CameraTransitionManager_53n8z_Xc_I), Math.abs(e.ray.direction.dot(CameraTransitionManager_53n8z_Xc_I)) < Yt) {
        const p = Math.acos(Yt);
        CameraTransitionManager_53n8z_Xc_At.crossVectors(e.ray.direction, CameraTransitionManager_53n8z_Xc_I).normalize(), e.ray.direction.copy(CameraTransitionManager_53n8z_Xc_I).applyAxisAngle(CameraTransitionManager_53n8z_Xc_At, p).multiplyScalar(-1);
      }
      e.ray.intersectPlane(CameraTransitionManager_53n8z_Xc_ye, CameraTransitionManager_53n8z_Xc_) && (CameraTransitionManager_53n8z_Xc_k.subVectors(s, CameraTransitionManager_53n8z_Xc_), i.position.add(CameraTransitionManager_53n8z_Xc_k), i.updateMatrixWorld(), CameraTransitionManager_53n8z_Xc_k.multiplyScalar(1 / t), n.getMoveDistance() / t < 2 * window.devicePixelRatio ? this.inertiaStableFrames++ : (c.copy(CameraTransitionManager_53n8z_Xc_k), this.inertiaStableFrames = 0));
    }
  }
  _updateRotation(t) {
    const {
      pivotPoint: e,
      pointerTracker: i,
      domElement: s,
      state: o,
      rotationInertia: n
    } = this;
    (o === CameraTransitionManager_53n8z_Xc_K || o === CameraTransitionManager_53n8z_Xc_q) && (o === CameraTransitionManager_53n8z_Xc_q && e.copy(this.camera.position), i.getCenterPoint(CameraTransitionManager_53n8z_Xc_V), i.getPreviousCenterPoint(xe), CameraTransitionManager_53n8z_Xc_Pt.subVectors(CameraTransitionManager_53n8z_Xc_V, xe).multiplyScalar(2 * Math.PI / s.clientHeight), this._applyRotation(CameraTransitionManager_53n8z_Xc_Pt.x, CameraTransitionManager_53n8z_Xc_Pt.y, e), CameraTransitionManager_53n8z_Xc_Pt.multiplyScalar(1 / t), i.getMoveDistance() / t < 2 * window.devicePixelRatio ? this.inertiaStableFrames++ : (n.copy(CameraTransitionManager_53n8z_Xc_Pt), this.inertiaStableFrames = 0));
  }
  _applyRotation(t, e, i) {
    if (t === 0 && e === 0)
      return;
    const {
      camera: s,
      minAltitude: o,
      maxAltitude: n,
      rotationSpeed: r
    } = this, a = -t * r;
    let c = e * r;
    CameraTransitionManager_53n8z_Xc_L.set(0, 0, 1).transformDirection(s.matrixWorld), CameraTransitionManager_53n8z_Xc_H.set(1, 0, 0).transformDirection(s.matrixWorld), this.getUpDirection(i, CameraTransitionManager_53n8z_Xc_I);
    let p;
    CameraTransitionManager_53n8z_Xc_I.dot(CameraTransitionManager_53n8z_Xc_L) > 1 - 1e-10 ? p = 0 : (CameraTransitionManager_53n8z_Xc_.crossVectors(CameraTransitionManager_53n8z_Xc_I, CameraTransitionManager_53n8z_Xc_L).normalize(), p = Math.sign(CameraTransitionManager_53n8z_Xc_.dot(CameraTransitionManager_53n8z_Xc_H)) * CameraTransitionManager_53n8z_Xc_I.angleTo(CameraTransitionManager_53n8z_Xc_L)), c > 0 ? (c = Math.min(p - o, c), c = Math.max(0, c)) : (c = Math.max(p - n, c), c = Math.min(0, c)), CameraTransitionManager_53n8z_Xc_G.setFromAxisAngle(CameraTransitionManager_53n8z_Xc_I, a), xt(i, CameraTransitionManager_53n8z_Xc_G, et), s.matrixWorld.premultiply(et), CameraTransitionManager_53n8z_Xc_H.set(1, 0, 0).transformDirection(s.matrixWorld), CameraTransitionManager_53n8z_Xc_G.setFromAxisAngle(CameraTransitionManager_53n8z_Xc_H, -c), xt(i, CameraTransitionManager_53n8z_Xc_G, et), s.matrixWorld.premultiply(et), s.matrixWorld.decompose(s.position, s.quaternion, CameraTransitionManager_53n8z_Xc_);
  }
  // sets the "up" axis for the current surface of the tileset
  _setFrame(t) {
    const {
      up: e,
      camera: i,
      zoomPoint: s,
      zoomDirectionSet: o,
      zoomPointSet: n,
      scaleZoomOrientationAtEdges: r
    } = this;
    if (o && (n || this._updateZoomPoint())) {
      if (CameraTransitionManager_53n8z_Xc_G.setFromUnitVectors(e, t), r) {
        this.getUpDirection(s, CameraTransitionManager_53n8z_Xc_);
        let a = Math.max(CameraTransitionManager_53n8z_Xc_.dot(e) - 0.6, 0) / 0.4;
        a = external_three_.MathUtils.mapLinear(a, 0, 0.5, 0, 1), a = Math.min(a, 1), i.isOrthographicCamera && (a *= 0.1), CameraTransitionManager_53n8z_Xc_G.slerp(vi, 1 - a);
      }
      xt(s, CameraTransitionManager_53n8z_Xc_G, et), i.updateMatrixWorld(), i.matrixWorld.premultiply(et), i.matrixWorld.decompose(i.position, i.quaternion, CameraTransitionManager_53n8z_Xc_), this.zoomDirectionSet = !1, this._updateZoomDirection();
    }
    e.copy(t), i.updateMatrixWorld();
  }
  _raycast(t) {
    const { scene: e, useFallbackPlane: i, fallbackPlane: s } = this, o = t.intersectObject(e)[0] || null;
    if (o)
      return o;
    if (i) {
      const n = s;
      if (t.ray.intersectPlane(n, CameraTransitionManager_53n8z_Xc_))
        return {
          point: CameraTransitionManager_53n8z_Xc_.clone(),
          distance: t.ray.origin.distanceTo(CameraTransitionManager_53n8z_Xc_)
        };
    }
    return null;
  }
  // tilt the camera to align with the provided "up" value
  _alignCameraUp(t, e = 1) {
    const { camera: i, state: s, pivotPoint: o, zoomPoint: n, zoomPointSet: r } = this;
    i.updateMatrixWorld(), CameraTransitionManager_53n8z_Xc_L.set(0, 0, -1).transformDirection(i.matrixWorld), CameraTransitionManager_53n8z_Xc_H.set(-1, 0, 0).transformDirection(i.matrixWorld);
    let a = external_three_.MathUtils.mapLinear(1 - Math.abs(CameraTransitionManager_53n8z_Xc_L.dot(t)), 0, 0.2, 0, 1);
    a = external_three_.MathUtils.clamp(a, 0, 1), e *= a, Xt.crossVectors(t, CameraTransitionManager_53n8z_Xc_L), Xt.lerp(CameraTransitionManager_53n8z_Xc_H, 1 - e).normalize(), CameraTransitionManager_53n8z_Xc_G.setFromUnitVectors(CameraTransitionManager_53n8z_Xc_H, Xt), i.quaternion.premultiply(CameraTransitionManager_53n8z_Xc_G);
    let c = null;
    s === it || s === CameraTransitionManager_53n8z_Xc_K || s === CameraTransitionManager_53n8z_Xc_q ? c = zt.copy(o) : r && (c = zt.copy(n)), c && (CameraTransitionManager_53n8z_Xc_It.copy(i.matrixWorld).invert(), CameraTransitionManager_53n8z_Xc_.copy(c).applyMatrix4(CameraTransitionManager_53n8z_Xc_It), i.updateMatrixWorld(), CameraTransitionManager_53n8z_Xc_.applyMatrix4(i.matrixWorld), Ft.subVectors(c, CameraTransitionManager_53n8z_Xc_), i.position.add(Ft)), i.updateMatrixWorld();
  }
  // clamp rotation to the given "up" vector
  _clampRotation(t) {
    const { camera: e, minAltitude: i, maxAltitude: s, state: o, pivotPoint: n, zoomPoint: r, zoomPointSet: a } = this;
    e.updateMatrixWorld(), CameraTransitionManager_53n8z_Xc_L.set(0, 0, 1).transformDirection(e.matrixWorld), CameraTransitionManager_53n8z_Xc_H.set(1, 0, 0).transformDirection(e.matrixWorld);
    let c;
    t.dot(CameraTransitionManager_53n8z_Xc_L) > 1 - 1e-10 ? c = 0 : (CameraTransitionManager_53n8z_Xc_.crossVectors(t, CameraTransitionManager_53n8z_Xc_L), c = Math.sign(CameraTransitionManager_53n8z_Xc_.dot(CameraTransitionManager_53n8z_Xc_H)) * t.angleTo(CameraTransitionManager_53n8z_Xc_L));
    let p;
    if (c > s)
      p = s;
    else if (c < i)
      p = i;
    else
      return;
    CameraTransitionManager_53n8z_Xc_L.copy(t), CameraTransitionManager_53n8z_Xc_G.setFromAxisAngle(CameraTransitionManager_53n8z_Xc_H, p), CameraTransitionManager_53n8z_Xc_L.applyQuaternion(CameraTransitionManager_53n8z_Xc_G).normalize(), CameraTransitionManager_53n8z_Xc_.crossVectors(CameraTransitionManager_53n8z_Xc_L, CameraTransitionManager_53n8z_Xc_H).normalize(), et.makeBasis(CameraTransitionManager_53n8z_Xc_H, CameraTransitionManager_53n8z_Xc_, CameraTransitionManager_53n8z_Xc_L), e.quaternion.setFromRotationMatrix(et);
    let h = null;
    o === it || o === CameraTransitionManager_53n8z_Xc_K || o === CameraTransitionManager_53n8z_Xc_q ? h = zt.copy(n) : a && (h = zt.copy(r)), h && (CameraTransitionManager_53n8z_Xc_It.copy(e.matrixWorld).invert(), CameraTransitionManager_53n8z_Xc_.copy(h).applyMatrix4(CameraTransitionManager_53n8z_Xc_It), e.updateMatrixWorld(), CameraTransitionManager_53n8z_Xc_.applyMatrix4(e.matrixWorld), Ft.subVectors(h, CameraTransitionManager_53n8z_Xc_), e.position.add(Ft)), e.updateMatrixWorld();
  }
}
const Pe = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_ut = /* @__PURE__ */ new external_three_.Matrix4(), CameraTransitionManager_53n8z_Xc_N = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_w = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_J = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_B = /* @__PURE__ */ new external_three_.Vector3(), Ci = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_mt = /* @__PURE__ */ new external_three_.Vector3(), tt = /* @__PURE__ */ new external_three_.Quaternion(), CameraTransitionManager_53n8z_Xc_we = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_rt = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_E = /* @__PURE__ */ new external_three_.Ray(), CameraTransitionManager_53n8z_Xc_Te = /* @__PURE__ */ new Pt(), Vt = /* @__PURE__ */ new external_three_.Vector2(), ve = {}, Si = 2550;
class ki extends Di {
  get tilesGroup() {
    return console.warn('GlobeControls: "tilesGroup" has been deprecated. Use "ellipsoidGroup", instead.'), this.ellipsoidFrame;
  }
  /**
   * The world matrix of `ellipsoidGroup`, representing the ellipsoid's coordinate frame.
   * @type {Matrix4}
   * @readonly
   */
  get ellipsoidFrame() {
    return this.ellipsoidGroup.matrixWorld;
  }
  /**
   * The inverse of `ellipsoidFrame`.
   * @type {Matrix4}
   * @readonly
   */
  get ellipsoidFrameInverse() {
    const { ellipsoidGroup: t, ellipsoidFrame: e, _ellipsoidFrameInverse: i } = this;
    return t.matrixWorldInverse ? t.matrixWorldInverse : i.copy(e).invert();
  }
  constructor(t = null, e = null, i = null, s = null) {
    super(t, e, i), this.isGlobeControls = !0, this._dragMode = 0, this._rotationMode = 0, this.maxZoom = 0.01, this.nearMargin = 0.25, this.farMargin = 0, this.useFallbackPlane = !1, this.autoAdjustCameraRotation = !1, this.globeInertia = new external_three_.Quaternion(), this.globeInertiaFactor = 0, this.ellipsoid = Dt.clone(), this.ellipsoidGroup = new external_three_.Group(), this._ellipsoidFrameInverse = new external_three_.Matrix4(), s !== null && this.setTilesRenderer(s);
  }
  setTilesRenderer(t) {
    super.setTilesRenderer(t), t !== null && this.setEllipsoid(t.ellipsoid, t.group);
  }
  /**
   * Sets the ellipsoid model and its scene group for globe-aware interaction.
   * @param {Ellipsoid} [ellipsoid] - Ellipsoid to use. Defaults to a WGS84 clone.
   * @param {Group} [ellipsoidGroup] - Group whose world matrix defines the ellipsoid frame.
   */
  setEllipsoid(t, e) {
    this.ellipsoid = t || Dt.clone(), this.ellipsoidGroup = e || new external_three_.Group();
  }
  getPivotPoint(t) {
    const { camera: e, ellipsoidFrame: i, ellipsoidFrameInverse: s, ellipsoid: o } = this;
    return CameraTransitionManager_53n8z_Xc_B.set(0, 0, -1).transformDirection(e.matrixWorld), CameraTransitionManager_53n8z_Xc_E.origin.copy(e.position), CameraTransitionManager_53n8z_Xc_E.direction.copy(CameraTransitionManager_53n8z_Xc_B), CameraTransitionManager_53n8z_Xc_E.applyMatrix4(s), o.closestPointToRayEstimate(CameraTransitionManager_53n8z_Xc_E, CameraTransitionManager_53n8z_Xc_w).applyMatrix4(i), (super.getPivotPoint(t) === null || CameraTransitionManager_53n8z_Xc_N.subVectors(t, CameraTransitionManager_53n8z_Xc_E.origin).dot(CameraTransitionManager_53n8z_Xc_E.direction) > CameraTransitionManager_53n8z_Xc_N.subVectors(CameraTransitionManager_53n8z_Xc_w, CameraTransitionManager_53n8z_Xc_E.origin).dot(CameraTransitionManager_53n8z_Xc_E.direction)) && t.copy(CameraTransitionManager_53n8z_Xc_w), t;
  }
  /**
   * Returns the vector from the camera to the center of the ellipsoid in world space.
   * @param {Vector3} target
   * @returns {Vector3}
   */
  getVectorToCenter(t) {
    const { ellipsoidFrame: e, camera: i } = this;
    return t.setFromMatrixPosition(e).sub(i.position);
  }
  /**
   * Returns the distance from the camera to the center of the ellipsoid.
   * @returns {number}
   */
  getDistanceToCenter() {
    return this.getVectorToCenter(CameraTransitionManager_53n8z_Xc_w).length();
  }
  getUpDirection(t, e) {
    const { ellipsoidFrame: i, ellipsoidFrameInverse: s, ellipsoid: o } = this;
    CameraTransitionManager_53n8z_Xc_w.copy(t).applyMatrix4(s), o.getPositionToNormal(CameraTransitionManager_53n8z_Xc_w, e), e.transformDirection(i);
  }
  getCameraUpDirection(t) {
    const { ellipsoidFrame: e, ellipsoidFrameInverse: i, ellipsoid: s, camera: o } = this;
    o.isOrthographicCamera ? (this._getVirtualOrthoCameraPosition(CameraTransitionManager_53n8z_Xc_w), CameraTransitionManager_53n8z_Xc_w.applyMatrix4(i), s.getPositionToNormal(CameraTransitionManager_53n8z_Xc_w, t), t.transformDirection(e)) : this.getUpDirection(o.position, t);
  }
  update(t = Math.min(this._getDeltaTime(), 64 / 1e3)) {
    if (!this.enabled || !this.camera || t === 0)
      return;
    const { camera: e, pivotMesh: i } = this;
    this._isNearControls() ? this.scaleZoomOrientationAtEdges = this.zoomDelta < 0 : (this.state !== CameraTransitionManager_53n8z_Xc_Z && this._dragMode !== 1 && this._rotationMode !== 1 && (i.visible = !1), this.scaleZoomOrientationAtEdges = !1);
    const s = this.needsUpdate || this._inertiaNeedsUpdate();
    super.update(t), this.adjustCamera(e), s && (this._isNearControls() || this.state === CameraTransitionManager_53n8z_Xc_q) && (this.getCameraUpDirection(CameraTransitionManager_53n8z_Xc_mt), this._alignCameraUp(CameraTransitionManager_53n8z_Xc_mt, 1), this.getCameraUpDirection(CameraTransitionManager_53n8z_Xc_mt), this._clampRotation(CameraTransitionManager_53n8z_Xc_mt));
  }
  // Updates the passed camera near and far clip planes to encapsulate the ellipsoid from the
  // current position in addition to adjusting the height.
  adjustCamera(t) {
    super.adjustCamera(t);
    const { ellipsoidFrame: e, ellipsoidFrameInverse: i, ellipsoid: s, nearMargin: o, farMargin: n } = this, r = this._getMaxWorldRadius();
    if (t.isPerspectiveCamera) {
      const a = CameraTransitionManager_53n8z_Xc_w.setFromMatrixPosition(e).sub(t.position).length(), c = o * r, p = external_three_.MathUtils.clamp((a - r) / c, 0, 1), h = external_three_.MathUtils.lerp(1, 1e3, p);
      t.near = Math.max(h, a - r - c), CameraTransitionManager_53n8z_Xc_N.copy(t.position).applyMatrix4(i), s.getPositionToCartographic(CameraTransitionManager_53n8z_Xc_N, ve);
      const m = Math.max(s.getPositionElevation(CameraTransitionManager_53n8z_Xc_N), Si), u = s.calculateHorizonDistance(ve.lat, m);
      t.far = u + 0.1 + r * n, t.updateProjectionMatrix();
    } else {
      this._getVirtualOrthoCameraPosition(t.position, t), t.updateMatrixWorld(), Pe.copy(t.matrixWorld).invert(), CameraTransitionManager_53n8z_Xc_w.setFromMatrixPosition(e).applyMatrix4(Pe);
      const a = -CameraTransitionManager_53n8z_Xc_w.z;
      t.near = a - r * (1 + o), t.far = a + 0.1 + r * n, t.position.addScaledVector(CameraTransitionManager_53n8z_Xc_B, t.near), t.far -= t.near, t.near = 0, t.updateProjectionMatrix(), t.updateMatrixWorld();
    }
  }
  // resets the "stuck" drag modes
  setState(...t) {
    super.setState(...t), this._dragMode = 0, this._rotationMode = 0;
  }
  _updateInertia(t) {
    super._updateInertia(t);
    const {
      globeInertia: e,
      enableDamping: i,
      dampingFactor: s,
      camera: o,
      cameraRadius: n,
      minDistance: r,
      inertiaTargetDistance: a,
      ellipsoidFrame: c
    } = this;
    if (!this.enableDamping || this.inertiaStableFrames > 1) {
      this.globeInertiaFactor = 0, this.globeInertia.identity();
      return;
    }
    const p = Math.pow(2, -t / s), h = Math.max(o.near, n, r, a), l = 0.25 * (2 / (2 * 1e3));
    if (CameraTransitionManager_53n8z_Xc_J.setFromMatrixPosition(c), this.globeInertiaFactor !== 0) {
      CameraTransitionManager_53n8z_Xc_j(CameraTransitionManager_53n8z_Xc_E, CameraTransitionManager_53n8z_Xc_w.set(0, 0, -1), o), CameraTransitionManager_53n8z_Xc_E.applyMatrix4(o.matrixWorldInverse), CameraTransitionManager_53n8z_Xc_E.direction.normalize(), CameraTransitionManager_53n8z_Xc_E.recast(-CameraTransitionManager_53n8z_Xc_E.direction.dot(CameraTransitionManager_53n8z_Xc_E.origin)).at(h / CameraTransitionManager_53n8z_Xc_E.direction.z, CameraTransitionManager_53n8z_Xc_w), CameraTransitionManager_53n8z_Xc_w.applyMatrix4(o.matrixWorld), CameraTransitionManager_53n8z_Xc_j(CameraTransitionManager_53n8z_Xc_E, CameraTransitionManager_53n8z_Xc_N.set(l, l, -1), o), CameraTransitionManager_53n8z_Xc_E.applyMatrix4(o.matrixWorldInverse), CameraTransitionManager_53n8z_Xc_E.direction.normalize(), CameraTransitionManager_53n8z_Xc_E.recast(-CameraTransitionManager_53n8z_Xc_E.direction.dot(CameraTransitionManager_53n8z_Xc_E.origin)).at(h / CameraTransitionManager_53n8z_Xc_E.direction.z, CameraTransitionManager_53n8z_Xc_N), CameraTransitionManager_53n8z_Xc_N.applyMatrix4(o.matrixWorld), CameraTransitionManager_53n8z_Xc_w.sub(CameraTransitionManager_53n8z_Xc_J).normalize(), CameraTransitionManager_53n8z_Xc_N.sub(CameraTransitionManager_53n8z_Xc_J).normalize(), this.globeInertiaFactor *= p;
      const d = CameraTransitionManager_53n8z_Xc_w.angleTo(CameraTransitionManager_53n8z_Xc_N) / t;
      (2 * Math.acos(e.w) * this.globeInertiaFactor < d || !i) && (this.globeInertiaFactor = 0, e.identity());
    }
    this.globeInertiaFactor !== 0 && (e.w === 1 && (e.x !== 0 || e.y !== 0 || e.z !== 0) && (e.w = Math.min(e.w, 1 - 1e-9)), CameraTransitionManager_53n8z_Xc_J.setFromMatrixPosition(c), tt.identity().slerp(e, this.globeInertiaFactor * t), xt(CameraTransitionManager_53n8z_Xc_J, tt, CameraTransitionManager_53n8z_Xc_ut), o.matrixWorld.premultiply(CameraTransitionManager_53n8z_Xc_ut), o.matrixWorld.decompose(o.position, o.quaternion, CameraTransitionManager_53n8z_Xc_w));
  }
  _inertiaNeedsUpdate() {
    return super._inertiaNeedsUpdate() || this.globeInertiaFactor !== 0;
  }
  _getFlightSpeedScale() {
    const t = this.getDistanceToCenter() - this._getMaxWorldRadius();
    return 2 * Math.max(t, 1e3);
  }
  _updateFlight(t) {
    const { camera: e } = this, i = super._updateFlight(t);
    if (i) {
      const s = this._getMaxPerspectiveDistance(), o = this.getDistanceToCenter();
      if (o > s && (this.getVectorToCenter(CameraTransitionManager_53n8z_Xc_w).normalize(), e.position.addScaledVector(CameraTransitionManager_53n8z_Xc_w, o - s), e.updateMatrixWorld()), !this._isNearControls()) {
        const n = external_three_.MathUtils.clamp(
          external_three_.MathUtils.mapLinear(this.getDistanceToCenter(), this._getPerspectiveTransitionDistance(), s, 0, 1),
          0,
          1
        );
        this._tiltTowardsCenter(0.02 * n), this._alignCameraUpToNorth(0.01 * n);
      }
    }
    return i;
  }
  _updatePosition(t) {
    if (this.state === it) {
      this._dragMode === 0 && (this._dragMode = this._isNearControls() ? 1 : -1);
      const {
        raycaster: e,
        camera: i,
        pivotPoint: s,
        pointerTracker: o,
        domElement: n,
        ellipsoidFrame: r,
        ellipsoidFrameInverse: a
      } = this, c = CameraTransitionManager_53n8z_Xc_N, p = Ci;
      o.getCenterPoint(Vt), CameraTransitionManager_53n8z_Xc_ft(Vt, n, Vt), CameraTransitionManager_53n8z_Xc_j(e, Vt, i), e.ray.applyMatrix4(a);
      const h = CameraTransitionManager_53n8z_Xc_w.copy(s).applyMatrix4(a).length();
      if (CameraTransitionManager_53n8z_Xc_Te.radius.setScalar(h), !CameraTransitionManager_53n8z_Xc_Te.intersectRay(e.ray, CameraTransitionManager_53n8z_Xc_w)) {
        this.resetState(), this._updateInertia(t);
        return;
      }
      CameraTransitionManager_53n8z_Xc_w.applyMatrix4(r), CameraTransitionManager_53n8z_Xc_J.setFromMatrixPosition(r), c.subVectors(s, CameraTransitionManager_53n8z_Xc_J).normalize(), p.subVectors(CameraTransitionManager_53n8z_Xc_w, CameraTransitionManager_53n8z_Xc_J).normalize(), tt.setFromUnitVectors(p, c), xt(CameraTransitionManager_53n8z_Xc_J, tt, CameraTransitionManager_53n8z_Xc_ut), i.matrixWorld.premultiply(CameraTransitionManager_53n8z_Xc_ut), i.matrixWorld.decompose(i.position, i.quaternion, CameraTransitionManager_53n8z_Xc_w), o.getMoveDistance() / t < 2 * window.devicePixelRatio ? this.inertiaStableFrames++ : (this.globeInertia.copy(tt), this.globeInertiaFactor = 1 / t, this.inertiaStableFrames = 0);
    }
  }
  // disable rotation once we're outside the control transition
  _updateRotation(...t) {
    if (this.state === CameraTransitionManager_53n8z_Xc_q) {
      super._updateRotation(...t);
      return;
    }
    this._rotationMode === 1 || this._isNearControls() ? (this._rotationMode = 1, super._updateRotation(...t)) : (this.pivotMesh.visible = !1, this._rotationMode = -1);
  }
  _updateZoom() {
    const { zoomDelta: t, zoomSpeed: e, zoomPoint: i, camera: s, maxZoom: o, state: n } = this;
    if (n !== gt && t === 0)
      return;
    this.rotationInertia.set(0, 0), this.dragInertia.set(0, 0, 0), this.globeInertia.identity(), this.globeInertiaFactor = 0;
    const r = external_three_.MathUtils.clamp(external_three_.MathUtils.mapLinear(Math.abs(t), 0, 20, 0, 1), 0, 1);
    if (this._isNearControls() || t > 0) {
      if (this._updateZoomDirection(), t < 0 && (this.zoomPointSet || this._updateZoomPoint())) {
        CameraTransitionManager_53n8z_Xc_B.set(0, 0, -1).transformDirection(s.matrixWorld).normalize(), CameraTransitionManager_53n8z_Xc_rt.copy(this.up).multiplyScalar(-1), this.getUpDirection(i, CameraTransitionManager_53n8z_Xc_we);
        const a = external_three_.MathUtils.clamp(external_three_.MathUtils.mapLinear(-CameraTransitionManager_53n8z_Xc_we.dot(CameraTransitionManager_53n8z_Xc_rt), 1, 0.95, 0, 1), 0, 1), c = 1 - CameraTransitionManager_53n8z_Xc_B.dot(CameraTransitionManager_53n8z_Xc_rt), p = s.isOrthographicCamera ? 0.05 : 1, h = external_three_.MathUtils.clamp(r * 3, 0, 1), m = Math.min(a * c * p * h, 0.1);
        CameraTransitionManager_53n8z_Xc_rt.lerpVectors(CameraTransitionManager_53n8z_Xc_B, CameraTransitionManager_53n8z_Xc_rt, m).normalize(), tt.setFromUnitVectors(CameraTransitionManager_53n8z_Xc_B, CameraTransitionManager_53n8z_Xc_rt), xt(i, tt, CameraTransitionManager_53n8z_Xc_ut), s.matrixWorld.premultiply(CameraTransitionManager_53n8z_Xc_ut), s.matrixWorld.decompose(s.position, s.quaternion, CameraTransitionManager_53n8z_Xc_rt), this.zoomDirection.subVectors(i, s.position).normalize();
      }
      super._updateZoom();
    } else if (s.isPerspectiveCamera) {
      const a = this._getPerspectiveTransitionDistance(), c = this._getMaxPerspectiveDistance(), p = external_three_.MathUtils.mapLinear(this.getDistanceToCenter(), a, c, 0, 1);
      this._tiltTowardsCenter(external_three_.MathUtils.lerp(0, 0.4, p * r)), this._alignCameraUpToNorth(external_three_.MathUtils.lerp(0, 0.2, p * r));
      const h = this.getDistanceToCenter() - this._getMaxWorldRadius(), m = t * h * e * 25e-4, u = Math.max(m, Math.min(this.getDistanceToCenter() - c, 0));
      this.getVectorToCenter(CameraTransitionManager_53n8z_Xc_w).normalize(), this.camera.position.addScaledVector(CameraTransitionManager_53n8z_Xc_w, u), this.camera.updateMatrixWorld(), this.zoomDelta = 0;
    } else {
      const a = this._getOrthographicTransitionZoom(), c = this._getMinOrthographicZoom(), p = external_three_.MathUtils.mapLinear(s.zoom, a, c, 0, 1);
      this._tiltTowardsCenter(external_three_.MathUtils.lerp(0, 0.4, p * r)), this._alignCameraUpToNorth(external_three_.MathUtils.lerp(0, 0.2, p * r));
      const h = this.zoomDelta, m = Math.pow(0.95, Math.abs(h * 0.05)), u = h > 0 ? 1 / Math.abs(m) : m, l = c / s.zoom, d = Math.max(u * e, Math.min(l, 1));
      s.zoom = Math.min(o, s.zoom * d), s.updateProjectionMatrix(), this.zoomDelta = 0, this.zoomDirectionSet = !1;
    }
  }
  // tilt the camera to align with north
  _alignCameraUpToNorth(t) {
    const { ellipsoidFrame: e } = this;
    CameraTransitionManager_53n8z_Xc_mt.set(0, 0, 1).transformDirection(e), this._alignCameraUp(CameraTransitionManager_53n8z_Xc_mt, t);
  }
  // tilt the camera to look at the center of the globe
  _tiltTowardsCenter(t) {
    const {
      camera: e,
      ellipsoidFrame: i
    } = this;
    CameraTransitionManager_53n8z_Xc_B.set(0, 0, -1).transformDirection(e.matrixWorld).normalize(), CameraTransitionManager_53n8z_Xc_w.setFromMatrixPosition(i).sub(e.position).normalize(), CameraTransitionManager_53n8z_Xc_w.lerp(CameraTransitionManager_53n8z_Xc_B, 1 - t).normalize(), tt.setFromUnitVectors(CameraTransitionManager_53n8z_Xc_B, CameraTransitionManager_53n8z_Xc_w), e.quaternion.premultiply(tt), e.updateMatrixWorld();
  }
  // returns the perspective camera transition distance can move to based on globe size and fov
  _getPerspectiveTransitionDistance() {
    const { camera: t } = this;
    if (!t.isPerspectiveCamera)
      throw new Error();
    const e = this._getMaxWorldRadius(), i = 2 * Math.atan(Math.tan(external_three_.MathUtils.DEG2RAD * t.fov * 0.5) * t.aspect), s = e / Math.tan(external_three_.MathUtils.DEG2RAD * t.fov * 0.5), o = e / Math.tan(i * 0.5);
    return Math.max(s, o);
  }
  // returns the max distance the perspective camera can move to based on globe size and fov
  _getMaxPerspectiveDistance() {
    const { camera: t } = this;
    if (!t.isPerspectiveCamera)
      throw new Error();
    const e = this._getMaxWorldRadius(), i = 2 * Math.atan(Math.tan(external_three_.MathUtils.DEG2RAD * t.fov * 0.5) * t.aspect), s = e / Math.tan(external_three_.MathUtils.DEG2RAD * t.fov * 0.5), o = e / Math.tan(i * 0.5);
    return 2 * Math.max(s, o);
  }
  // returns the transition threshold for orthographic zoom based on the globe size and camera settings
  _getOrthographicTransitionZoom() {
    const { camera: t } = this;
    if (!t.isOrthographicCamera)
      throw new Error();
    const e = t.top - t.bottom, i = t.right - t.left, s = Math.max(e, i), n = 2 * this._getMaxWorldRadius();
    return 2 * s / n;
  }
  // returns the minimum allowed orthographic zoom based on the globe size and camera settings
  _getMinOrthographicZoom() {
    const { camera: t } = this;
    if (!t.isOrthographicCamera)
      throw new Error();
    const e = t.top - t.bottom, i = t.right - t.left, s = Math.min(e, i), n = 2 * this._getMaxWorldRadius();
    return 0.7 * s / n;
  }
  // returns the "virtual position" of the orthographic based on where it is and
  // where it's looking primarily so we can reasonably position the camera object
  // in space and derive a reasonable "up" value.
  _getVirtualOrthoCameraPosition(t, e = this.camera) {
    const { ellipsoidFrame: i, ellipsoidFrameInverse: s, ellipsoid: o } = this;
    if (!e.isOrthographicCamera)
      throw new Error();
    CameraTransitionManager_53n8z_Xc_E.origin.copy(e.position), CameraTransitionManager_53n8z_Xc_E.direction.set(0, 0, -1).transformDirection(e.matrixWorld), CameraTransitionManager_53n8z_Xc_E.applyMatrix4(s), o.closestPointToRayEstimate(CameraTransitionManager_53n8z_Xc_E, CameraTransitionManager_53n8z_Xc_N).applyMatrix4(i);
    const n = e.top - e.bottom, r = e.right - e.left, a = Math.max(n, r) / e.zoom;
    CameraTransitionManager_53n8z_Xc_B.set(0, 0, -1).transformDirection(e.matrixWorld);
    const c = CameraTransitionManager_53n8z_Xc_N.sub(e.position).dot(CameraTransitionManager_53n8z_Xc_B);
    t.copy(e.position).addScaledVector(CameraTransitionManager_53n8z_Xc_B, c - a * 4);
  }
  _isNearControls() {
    const { camera: t } = this;
    return t.isPerspectiveCamera ? this.getDistanceToCenter() < this._getPerspectiveTransitionDistance() : t.zoom > this._getOrthographicTransitionZoom();
  }
  _raycast(t) {
    const e = super._raycast(t);
    if (e === null) {
      const { ellipsoid: i, ellipsoidFrame: s, ellipsoidFrameInverse: o } = this;
      CameraTransitionManager_53n8z_Xc_E.copy(t.ray).applyMatrix4(o);
      const n = i.intersectRay(CameraTransitionManager_53n8z_Xc_E, CameraTransitionManager_53n8z_Xc_w);
      return n !== null ? (n.applyMatrix4(s), {
        point: n.clone(),
        distance: n.distanceTo(t.ray.origin)
      }) : null;
    } else
      return e;
  }
  _getMaxWorldRadius() {
    const { ellipsoid: t, ellipsoidFrame: e } = this;
    return Math.max(...t.radius) * e.getMaxScaleOnAxis();
  }
}
const CameraTransitionManager_53n8z_Xc_U = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_at = /* @__PURE__ */ new external_three_.Vector3(), CameraTransitionManager_53n8z_Xc_ct = /* @__PURE__ */ new external_three_.OrthographicCamera(), Ei = /* @__PURE__ */ new external_three_.Vector3(), Ri = /* @__PURE__ */ new external_three_.Vector3(), Oi = /* @__PURE__ */ new external_three_.Vector3(), De = /* @__PURE__ */ new external_three_.Quaternion(), Ii = /* @__PURE__ */ new external_three_.Quaternion();
class Ni extends external_three_.EventDispatcher {
  /**
   * Whether a transition animation is currently in progress.
   * @type {boolean}
   * @readonly
   */
  get animating() {
    return this._alpha !== 0 && this._alpha !== 1;
  }
  /**
   * Transition progress from 0 (at perspective) to 1 (at orthographic).
   * @type {number}
   * @readonly
   */
  get alpha() {
    return this._target === 0 ? 1 - this._alpha : this._alpha;
  }
  /**
   * The currently active camera. Returns `perspectiveCamera`, `orthographicCamera`, or the
   * blended `transitionCamera` depending on the current transition state.
   * @type {Camera}
   * @readonly
   */
  get camera() {
    return this._alpha === 0 ? this.perspectiveCamera : this._alpha === 1 ? this.orthographicCamera : this.transitionCamera;
  }
  /**
   * The target camera mode. Set to `'perspective'` or `'orthographic'` to jump instantly without
   * animation. Use `toggle()` to animate the transition.
   * @type {string}
   */
  get mode() {
    return this._target === 0 ? "perspective" : "orthographic";
  }
  set mode(t) {
    if (t === this.mode)
      return;
    const e = this.camera;
    t === "perspective" ? (this._target = 0, this._alpha = 0) : (this._target = 1, this._alpha = 1), this.dispatchEvent({ type: "camera-change", camera: this.camera, prevCamera: e });
  }
  constructor(t = new external_three_.PerspectiveCamera(), e = new external_three_.OrthographicCamera()) {
    super(), this.perspectiveCamera = t, this.orthographicCamera = e, this.transitionCamera = new external_three_.PerspectiveCamera(), this.orthographicPositionalZoom = !0, this.orthographicOffset = 50, this.fixedPoint = new external_three_.Vector3(), this.duration = 200, this.autoSync = !0, this.easeFunction = (i) => i, this._target = 0, this._alpha = 0, this._clock = new external_three_.Clock();
  }
  /**
   * Begins an animated transition to the opposite camera mode. Dispatches a `'toggle'` event.
   */
  toggle() {
    this._target = this._target === 1 ? 0 : 1, this._clock.getDelta(), this.dispatchEvent({ type: "toggle" });
  }
  /**
   * Advances the transition animation and updates the active camera. Must be called each frame.
   * @param {number} [deltaTime] - Time in seconds since the last frame. Defaults to the clock delta, capped at 64ms.
   */
  update(t = Math.min(this._clock.getDelta(), 64 / 1e3)) {
    this.autoSync && this.syncCameras();
    const { perspectiveCamera: e, orthographicCamera: i, transitionCamera: s, camera: o } = this, n = t * 1e3;
    if (this._alpha !== this._target) {
      const p = Math.sign(this._target - this._alpha) * n / this.duration;
      this._alpha = external_three_.MathUtils.clamp(this._alpha + p, 0, 1), this.dispatchEvent({ type: "change", alpha: this.alpha });
    }
    const r = o;
    let a = null;
    this._alpha === 0 ? a = e : this._alpha === 1 ? a = i : (a = s, this._updateTransitionCamera()), r !== a && (a === s && this.dispatchEvent({ type: "transition-start" }), this.dispatchEvent({ type: "camera-change", camera: a, prevCamera: r }), r === s && this.dispatchEvent({ type: "transition-end" }));
  }
  /**
   * Synchronises the non-active camera so that both cameras represent the same viewpoint.
   * Called automatically by `update` when `autoSync` is true.
   */
  syncCameras() {
    const t = this._getFromCamera(), { perspectiveCamera: e, orthographicCamera: i, transitionCamera: s, fixedPoint: o } = this;
    if (CameraTransitionManager_53n8z_Xc_U.set(0, 0, -1).transformDirection(t.matrixWorld).normalize(), t.isPerspectiveCamera) {
      if (this.orthographicPositionalZoom)
        i.position.copy(e.position).addScaledVector(CameraTransitionManager_53n8z_Xc_U, -this.orthographicOffset), i.rotation.copy(e.rotation), i.updateMatrixWorld();
      else {
        const c = CameraTransitionManager_53n8z_Xc_at.subVectors(o, i.position).dot(CameraTransitionManager_53n8z_Xc_U), p = CameraTransitionManager_53n8z_Xc_at.subVectors(o, e.position).dot(CameraTransitionManager_53n8z_Xc_U);
        CameraTransitionManager_53n8z_Xc_at.copy(e.position).addScaledVector(CameraTransitionManager_53n8z_Xc_U, p), i.rotation.copy(e.rotation), i.position.copy(CameraTransitionManager_53n8z_Xc_at).addScaledVector(CameraTransitionManager_53n8z_Xc_U, -c), i.updateMatrixWorld();
      }
      const n = Math.abs(CameraTransitionManager_53n8z_Xc_at.subVectors(e.position, o).dot(CameraTransitionManager_53n8z_Xc_U)), r = 2 * Math.tan(external_three_.MathUtils.DEG2RAD * e.fov * 0.5) * n, a = i.top - i.bottom;
      i.zoom = a / r, i.updateProjectionMatrix();
    } else {
      const n = Math.abs(CameraTransitionManager_53n8z_Xc_at.subVectors(i.position, o).dot(CameraTransitionManager_53n8z_Xc_U)), a = (i.top - i.bottom) / i.zoom * 0.5 / Math.tan(external_three_.MathUtils.DEG2RAD * e.fov * 0.5);
      e.rotation.copy(i.rotation), e.position.copy(i.position).addScaledVector(CameraTransitionManager_53n8z_Xc_U, n).addScaledVector(CameraTransitionManager_53n8z_Xc_U, -a), e.updateMatrixWorld(), this.orthographicPositionalZoom && (i.position.copy(e.position).addScaledVector(CameraTransitionManager_53n8z_Xc_U, -this.orthographicOffset), i.updateMatrixWorld());
    }
    s.position.copy(e.position), s.rotation.copy(e.rotation);
  }
  _getTransitionDirection() {
    return Math.sign(this._target - this._alpha);
  }
  _getToCamera() {
    const t = this._getTransitionDirection();
    return t === 0 ? this._target === 0 ? this.perspectiveCamera : this.orthographicCamera : t > 0 ? this.orthographicCamera : this.perspectiveCamera;
  }
  _getFromCamera() {
    const t = this._getTransitionDirection();
    return t === 0 ? this._target === 0 ? this.perspectiveCamera : this.orthographicCamera : t > 0 ? this.perspectiveCamera : this.orthographicCamera;
  }
  _updateTransitionCamera() {
    const { perspectiveCamera: t, orthographicCamera: e, transitionCamera: i, fixedPoint: s } = this, o = this.easeFunction(this._alpha);
    CameraTransitionManager_53n8z_Xc_U.set(0, 0, -1).transformDirection(e.matrixWorld).normalize(), CameraTransitionManager_53n8z_Xc_ct.copy(e), CameraTransitionManager_53n8z_Xc_ct.position.addScaledVector(CameraTransitionManager_53n8z_Xc_U, e.near), e.far -= e.near, e.near = 0, CameraTransitionManager_53n8z_Xc_U.set(0, 0, -1).transformDirection(t.matrixWorld).normalize();
    const n = Math.abs(CameraTransitionManager_53n8z_Xc_at.subVectors(t.position, s).dot(CameraTransitionManager_53n8z_Xc_U)), r = 2 * Math.tan(external_three_.MathUtils.DEG2RAD * t.fov * 0.5) * n, a = Ii.slerpQuaternions(t.quaternion, CameraTransitionManager_53n8z_Xc_ct.quaternion, o), c = external_three_.MathUtils.lerp(t.fov, 1, o), p = r * 0.5 / Math.tan(external_three_.MathUtils.DEG2RAD * c * 0.5), h = Oi.copy(CameraTransitionManager_53n8z_Xc_ct.position).sub(s).applyQuaternion(De.copy(CameraTransitionManager_53n8z_Xc_ct.quaternion).invert()), m = Ri.copy(t.position).sub(s).applyQuaternion(De.copy(t.quaternion).invert()), u = Ei.lerpVectors(m, h, o);
    u.z -= Math.abs(u.z) - p;
    const l = -(m.z - u.z), d = -(h.z - u.z), x = external_three_.MathUtils.lerp(l + t.near, d + CameraTransitionManager_53n8z_Xc_ct.near, o), O = external_three_.MathUtils.lerp(l + t.far, d + CameraTransitionManager_53n8z_Xc_ct.far, o), M = Math.max(O, 0) - Math.max(x, 0);
    i.aspect = t.aspect, i.fov = c, i.near = Math.max(x, M * 1e-5), i.far = O, i.position.copy(u).applyQuaternion(a).add(s), i.quaternion.copy(a), i.updateProjectionMatrix(), i.updateMatrixWorld();
  }
}

//# sourceMappingURL=CameraTransitionManager-53n8z_Xc.js.map

;// ./src/core/TilesViewer.js
﻿



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
    this.scene = new external_three_.Scene();
    this.scene.background = new external_three_.Color(0x111122);
    this.scene.fog = new external_three_.FogExp2(0x111122, 0.0003);

    this.camera = new external_three_.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      5000
    );
    this.camera.position.set(10, 10, 10);

    this.renderer = new external_three_.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.screenSpacePanning = true;

    const gridHelper = new external_three_.GridHelper(200, 20, 0x88aaff, 0x335588);
    gridHelper.position.y = -1;
    this.scene.add(gridHelper);

    const axesHelper = new external_three_.AxesHelper(50);
    this.scene.add(axesHelper);

    const originSphere = new external_three_.Mesh(
      new external_three_.SphereGeometry(0.5, 16, 16),
      new external_three_.MeshStandardMaterial({ color: 0xff3333, emissive: 0x330000 })
    );
    this.scene.add(originSphere);

    const ambientLight = new external_three_.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);
    const hemiLight = new external_three_.HemisphereLight(0x8bb5ff, 0x3b2a1f, 0.9);
    this.scene.add(hemiLight);
    const mainLight = new external_three_.DirectionalLight(0xfff5e6, 1.4);
    mainLight.position.set(6, 12, 8);
    mainLight.castShadow = true;
    this.scene.add(mainLight);
    const backLight = new external_three_.DirectionalLight(0x88aaff, 0.6);
    backLight.position.set(-4, 5, -6);
    this.scene.add(backLight);
    const rightFill = new external_three_.DirectionalLight(0xffaa88, 0.5);
    rightFill.position.set(4, 3, 5);
    this.scene.add(rightFill);
    const fillPoint = new external_three_.PointLight(0xffaa66, 0.35);
    fillPoint.position.set(2, 3, 2);
    this.scene.add(fillPoint);
    const leftFill = new external_three_.DirectionalLight(0xaaccff, 0.4);
    leftFill.position.set(-3, 4, 3);
    this.scene.add(leftFill);
  }

  _initTiles(tilesetUrl) {
    this.tilesRenderer = new Vi(tilesetUrl);
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
      material.side = external_three_.DoubleSide;
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
    const mouse = new external_three_.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new external_three_.Raycaster();
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
      const verticalFov = external_three_.MathUtils.degToRad(this.camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * this.camera.aspect);
      const fitFov = Math.min(verticalFov, horizontalFov);
      const distance = (sphere.radius / Math.sin(fitFov / 2)) * fitOffset;
      const direction = new external_three_.Vector3(1, 0.3, 1).normalize();
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
    const sphere = new external_three_.Sphere();
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

;// ./src/core/index.js
﻿

;// ./src/vue2/index.js


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

/* harmony default export */ const vue2 = (ThreeTilesViewer);

;// ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ const entry_lib = (vue2);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=TilesViewer.umd.js.map