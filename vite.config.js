import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svelte({
      emitCss: true,
      include: [/\.svelte$/],
      compilerOptions: {
        dev: true,
        css: true
      }
    })
  ],
  server: {
    watch: {
      usePolling: true,
    }
  }
})
