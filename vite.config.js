import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  css: {
    // Turn off CSS source maps in development to avoid these warnings.
    devSourcemap: false
  }
})
