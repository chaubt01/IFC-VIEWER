import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext', // để hỗ trợ top-level await
  }
});
