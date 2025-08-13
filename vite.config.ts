import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths({ projects: ['tsconfig.app.json'] }), // to avoid aliases duplication
    tailwindcss()
  ],
})
