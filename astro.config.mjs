// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

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
  // Keep v5 whitespace handling. Astro 7 defaults to 'jsx', which strips spaces between inline elements.
  compressHTML: true,
  // Self-hosted and preloaded. Loading them from Google via CSS @import made
  // the hero h1 swap fonts (and jump size) after it was visible. Headings
  // use display 'block' so they wait for Cormorant instead of swapping.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-cormorant',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
      display: 'block',
    },
    {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
