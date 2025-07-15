export default {
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  server: {
    cors: true
  },
  optimizeDeps: {
    exclude: ['three', 'web-ifc', 'web-ifc-three', 'web-ifc-viewer']
  }
}
