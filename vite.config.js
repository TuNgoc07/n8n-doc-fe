import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls during dev to your backend domain
      '/api': {
        target: 'https://api.n8n-group2.online',
        changeOrigin: true,
        // Allow self-signed/strict TLS in dev
        secure: false,
        // Rewrite cookie domain so browser accepts Set-Cookie from proxy
        cookieDomainRewrite: 'localhost',
        // Do NOT override Origin header to avoid triggering CORS in BE
        // Keep path as-is (no rewrite), since Nginx expects /api
      },
    },
  },
})
