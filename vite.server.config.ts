import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        server: path.resolve(__dirname, "server/index.ts"),
      },
      output: {
        entryFileNames: "index.js"
      }
    }
  }
})
