import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' set to './' ensures assets are loaded via relative paths, 
  // which prevents 404 errors on GitHub Pages subdirectories.
  base: './',
})