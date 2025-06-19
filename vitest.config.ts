export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  // This is crucial!
    setupFiles: ['./src/test/setup.ts'],
  },
});