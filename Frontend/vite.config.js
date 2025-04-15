import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173, // Ensure this matches your frontend port
    proxy: {
      '/user': {  // Proxy all "/user" requests to the backend
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
  
})
