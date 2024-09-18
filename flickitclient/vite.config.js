import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),    Unfonts({
    custom: {
      families: [
        {
          name: 'fellFrench',
          src: './src/assets/fonts/IMFellFrenchCanonSC-Regular.woff',
        },
        {
          name: 'dancingScript',
          src: './src/assets/fonts/DancingScript-VariableFont_wght.woff',
        },
      ],
    },
  })],
})
