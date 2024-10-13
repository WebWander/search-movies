import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
  },
  base: '/',
  test: {
    ...configDefaults,
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setUpTests.ts', 
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://flex-movies.onrender.com/',
        changeOrigin: true,
        secure: true
      }
    }
  }
})


