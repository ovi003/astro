import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const [owner = '', repository = ''] = (
  process.env.GITHUB_REPOSITORY ?? '/'
).split('/');
const isUserOrOrganizationSite = repository === `${owner}.github.io`;

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? `https://${owner}.github.io` : undefined,
  base: isGitHubPages && !isUserOrOrganizationSite ? `/${repository}` : '/',
  output: isGitHubPages ? 'static' : 'server',
  adapter: isGitHubPages ? undefined : node({ mode: 'standalone' }),
  integrations: [
    react(),
    markdoc(),
    ...(isGitHubPages ? [] : [keystatic()]),
  ],
});
