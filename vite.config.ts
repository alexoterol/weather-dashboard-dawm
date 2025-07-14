import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  base: "/weather-dashboard-dawm",
  plugins: [
    react(),
    VitePWA({
         registerType: 'autoUpdate',
         devOptions: {
            enabled: true
         }
      })
  ],
})
