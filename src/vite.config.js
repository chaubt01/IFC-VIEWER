import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',       // ✅ Cho phép top-level await
    outDir: 'dist'
  }
});
