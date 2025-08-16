import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 

// https://vite.dev/config/
export default defineConfig({
   base: '/GROUP-PROJECT-1/',
  plugins: [
    react(),
    tailwindcss()
  ],
})