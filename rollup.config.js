import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/core/index.js',
  output: [
    {
      file: 'dist/core/index.cjs.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/core/index.esm.js',
      format: 'esm'
    }
  ],
  external: ['three', '3d-tiles-renderer'],
  plugins: [resolve(), commonjs()]
};
