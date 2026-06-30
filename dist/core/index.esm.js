import * as THREE from 'three';
import { Ray, Plane, MathUtils, EventDispatcher, Vector3, MOUSE, TOUCH, Quaternion, Spherical, Vector2 } from 'three';
import { TilesRenderer } from '3d-tiles-renderer';

// OrbitControls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

const _changeEvent = { type: 'change' };
const _startEvent = { type: 'start' };
const _endEvent = { type: 'end' };
const _ray = new Ray();
const _plane = new Plane();
const TILT_LIMIT = Math.cos( 70 * MathUtils.DEG2RAD );

class OrbitControls extends EventDispatcher {

	constructor( object, domElement ) {

		super();

		this.object = object;
		this.domElement = domElement;
		this.domElement.style.touchAction = 'none'; // disable touch scroll

		// Set to false to disable this control
		this.enabled = true;

		// "target" sets the location of focus, where the object orbits around
		this.target = new Vector3();

		// Sets the 3D cursor (similar to Blender), from which the maxTargetRadius takes effect
		this.cursor = new Vector3();

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
		this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

		// Touch fingers
		this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

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

			const offset = new Vector3();

			// so camera.up is the orbit axis
			const quat = new Quaternion().setFromUnitVectors( object.up, new Vector3( 0, 1, 0 ) );
			const quatInverse = quat.clone().invert();

			const lastPosition = new Vector3();
			const lastQuaternion = new Quaternion();
			const lastTargetPosition = new Vector3();

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
						const mouseBefore = new Vector3( mouse.x, mouse.y, 0 );
						mouseBefore.unproject( scope.object );

						const prevZoom = scope.object.zoom;
						scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / scale ) );
						scope.object.updateProjectionMatrix();

						zoomChanged = prevZoom !== scope.object.zoom;

						const mouseAfter = new Vector3( mouse.x, mouse.y, 0 );
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
		const spherical = new Spherical();
		const sphericalDelta = new Spherical();

		let scale = 1;
		const panOffset = new Vector3();

		const rotateStart = new Vector2();
		const rotateEnd = new Vector2();
		const rotateDelta = new Vector2();

		const panStart = new Vector2();
		const panEnd = new Vector2();
		const panDelta = new Vector2();

		const dollyStart = new Vector2();
		const dollyEnd = new Vector2();
		const dollyDelta = new Vector2();

		const dollyDirection = new Vector3();
		const mouse = new Vector2();
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

			const v = new Vector3();

			return function panLeft( distance, objectMatrix ) {

				v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
				v.multiplyScalar( - distance );

				panOffset.add( v );

			};

		}();

		const panUp = function () {

			const v = new Vector3();

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

			const offset = new Vector3();

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

				case MOUSE.DOLLY:

					if ( scope.enableZoom === false ) return;

					handleMouseDownDolly( event );

					state = STATE.DOLLY;

					break;

				case MOUSE.ROTATE:

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

				case MOUSE.PAN:

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

						case TOUCH.ROTATE:

							if ( scope.enableRotate === false ) return;

							handleTouchStartRotate( event );

							state = STATE.TOUCH_ROTATE;

							break;

						case TOUCH.PAN:

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

						case TOUCH.DOLLY_PAN:

							if ( scope.enableZoom === false && scope.enablePan === false ) return;

							handleTouchStartDollyPan( event );

							state = STATE.TOUCH_DOLLY_PAN;

							break;

						case TOUCH.DOLLY_ROTATE:

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

				position = new Vector2();
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

export { TilesViewer };
