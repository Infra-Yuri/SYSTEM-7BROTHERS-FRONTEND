// vite.config.js na raiz
import { defineConfig } from 'vite';
import react       from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',           // define que a raiz de onde o Vite serve é esta pasta
  publicDir: 'public', // arquivos estáticos continuam em public/
  server: {
    port: 5173         // ou a porta que você preferir
  }
});
