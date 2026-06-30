export default {
  input: 'src/vue2/index.js',
  output: {
    file: 'dist/vue2/index.esm.js',
    format: 'esm'
  },
  external: [
    'vue',
    'three',
    '3d-tiles-renderer',
    'three/examples/jsm/controls/OrbitControls.js'
  ]
};
