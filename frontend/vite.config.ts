import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ svgr(), react(), tsconfigPaths({root: __dirname})],
  resolve: {
    alias: {
      $fonts: resolve('./src/vendor/fonts'),
      $assets: resolve('./src/assets'),
    }
  },
  build: {
    assetsInlineLimit:0,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${resolve(__dirname, 'src/scss/_variables.scss').replace(/\\/g, '/')}" as *;\n@use "${resolve(__dirname, 'src/scss/mixins').replace(/\\/g, '/')}";`,
      },

    }
  },

})
