import { defineConfig } from 'astro/config';
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vercel from '@astrojs/vercel/serverless';
import { loadEnv } from 'vite';
import tailwind from "@astrojs/tailwind";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;


// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  integrations: [sanity({
    projectId,
    dataset,
    useCdn: false,
    studioBasePath: '/admin'
  }), react(), tailwind({applyBaseStyles: false})]
});