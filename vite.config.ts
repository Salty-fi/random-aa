import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  
  // remove base in development to avoid file path issue
  // DO NOT FORGET to put it back in production
  //
  // base: "/random-aa",
  //
});
