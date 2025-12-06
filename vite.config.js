import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: {
        // Dev proxy: target theo biến môi trường để tách local/prod
        // Lưu ý: KHÔNG xoá prefix /api cho các route chung
        // Chỉ rewrite cho nhánh /api/auth -> /auth
        '/api/auth': {
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:8083',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost',
          rewrite: (path) => path.replace(/^\/api\/auth/, '/auth'),
        },
        '/api': {
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:8083',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost',
          // Không rewrite để giữ nguyên /api/* (ví dụ /api/jobs)
        },
      },
    },
  }
})
