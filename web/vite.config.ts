
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from '@tailwindcss/vite'

const chunkGroups: Record<string, string[]> = {
  index: [
    'react',
    'react-dom',
    'sonner',
    'driver.js',
    'sweetalert2',
    'path',
  ],
  index2: [
    'chart.js',
    'zustand',
    'react-icons',
    'react-router-dom',
  ],
  index1: [
    '@mui/material',
    '@emotion/react',
    '@emotion/styled',
  ],
}

const manualChunks = (id: string) => {
  for (const [chunkName, packages] of Object.entries(chunkGroups)) {
    if (packages.some((pkg) => id.includes(`/node_modules/${pkg}/`) || id.includes(`\\node_modules\\${pkg}\\`))) {
      return chunkName
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base:'/sis',
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    }//[{find:'@',replacement:path.resolve(__dirname,"src")}]
  },
  build: {
    outDir: "dist/sis/",
    minify: true,
    //chunkSizeWarningLimit:1000
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  }
})
