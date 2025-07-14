export default {
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  optimizeDeps: {
    exclude: ['@thatopen/components']
  }
}
