import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  // Intelligent base resolution:
  // 1. If explicit BASE_PATH env var is set (e.g. '/' or custom domain), use it
  // 2. If running in GitHub Actions with GITHUB_REPOSITORY set (e.g. 'username/hotel-diamond')
  //    and not a user root site ('username.github.io'), set '/hotel-diamond/'
  // 3. Otherwise default to './' for portable relative asset resolution
  let base = './';
  if (process.env.BASE_PATH) {
    base = process.env.BASE_PATH;
  } else if (process.env.GITHUB_REPOSITORY && !process.env.GITHUB_REPOSITORY.endsWith('.github.io')) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repo) {
      base = `/${repo}/`;
    }
  }

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
