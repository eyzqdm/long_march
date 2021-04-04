import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components"),
      "type": path.resolve(__dirname, "src/types"),
      "layouts": path.resolve(__dirname, "src/layouts")
    }
  }
})
