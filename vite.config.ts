import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { // Add this resolve block
    alias: {
      '~': '/src', // Map the '~' alias to the '/src' directory
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 4200,
    open: true,
  },
  preview: {
    port: 4200,
    open: true,
  },
});
