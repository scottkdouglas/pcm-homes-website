// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pcm.homes',
  // Emit about.html, not about/index.html, so URLs have no trailing slash.
  // Cloudflare serves /about from about.html without a redirect hop.
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
