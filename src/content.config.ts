import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['custom-home', 'cottage', 'renovation', 'addition', 'icf-framing']),
    location: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    completedDate: z.date().optional(),
  }),
});

export const collections = {
  services: servicesCollection,
  projects: projectsCollection,
};
