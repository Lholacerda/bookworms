import { z } from 'zod';

export const Post = z.object({
  title: z.string({required_error: 'Title is required'}),
  body: z.string().optional(),
  image: z.string({required_error: 'Image is required'}),
  numPages: z.number(),
  content: z.string(),
});
