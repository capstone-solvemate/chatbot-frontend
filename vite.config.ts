import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, "index.html"),
        chatbot: path.resolve(__dirname, "parent/parent-scripts.ts")
      },
      output: {
        entryFileNames: (chunk) => {
          if(chunk.name == "chatbot") {
            return "scripts/chatbot.js"
          }
          return "assets/[name].js"
        }
      }
    }
  }
})
