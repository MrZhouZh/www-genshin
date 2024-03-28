import path from 'node:path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { dependencies } from './package.json'

function renderChunks(deps: Record<string, string>) {
  let chunks = {}
  Object.keys(deps).forEach(key => {
    if (['react', 'react-dom'].includes(key)) return
    chunks[key] = [key]
  })

  return chunks
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ...renderChunks(dependencies)
        }
      }
    }
  }
})
