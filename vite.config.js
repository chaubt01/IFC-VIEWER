import basicSsl from '@vitejs/plugin-basic-ssl';

export default {
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  plugins: [basicSsl()],
  server: {
    https: true
  }
}
