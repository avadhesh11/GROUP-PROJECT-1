import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

// https://vite.dev/config/
export default defineConfig({
   base: '/GROUP-PROJECT-1/',
  plugins: [
    react(),
    tailwindcss()
  ],
})
