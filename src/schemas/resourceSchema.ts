import { z } from 'zod';

export const resourceSchema = z.object({
  title: z.string().min(3, 'Min 3 characters'),
  url: z.string().url('Should be a valid URL'),
  category: z.string().min(1, 'Select one category'),
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
  description: z.string().optional(),
});

export type ResourceFormValues = z.infer<typeof resourceSchema>;
