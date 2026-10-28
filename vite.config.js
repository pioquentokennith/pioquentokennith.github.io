import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative URLs support both username.github.io and repository Pages sites.
  base: './',
  // Keep generated bundles distinct from the original capitalized Assets folder
  // on both case-sensitive hosts and Windows development machines.
  build: { assetsDir: 'bundles' },
});
