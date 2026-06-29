import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/vue3/index.js',
      name: 'TilesViewer',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    outDir: 'dist/vue3',
    rollupOptions: {
      external: ['vue', 'three', '3d-tiles-renderer'],
      output: {
        globals: {
          vue: 'Vue',
          three: 'THREE'
        }
      }
    }
  }
});