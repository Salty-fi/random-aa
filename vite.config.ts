import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [react(),tailwindcss(),],
  base: "/random-aa",

  // remove base to workaround file path issue
  // always reload when you put/take it
  // DO NOT FORGET to put it back in production
  //
  // base: "/random-aa",
  //
  // Tips: before publish, reload dev env and trigger reverse,
  // if it shouts "เอ็งโง่!", it means you forgot to reconfig here
});
