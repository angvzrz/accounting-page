import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'resources',
    rollupOptions: {
      main: 'index.html',
    },
  },
});
