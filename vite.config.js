export default {
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'thatopen': ['@thatopen/components']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@thatopen/components']
  }
}
