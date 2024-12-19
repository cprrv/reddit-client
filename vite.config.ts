import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/r': {
        target: 'https://www.reddit.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/r/, ''),
      },
    },
  },
});
