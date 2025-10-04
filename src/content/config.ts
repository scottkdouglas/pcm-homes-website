import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
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
