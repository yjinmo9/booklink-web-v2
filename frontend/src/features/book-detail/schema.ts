import { z } from "zod";

export const bookDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string().nullable(),
  price: z.number(),
  condition: z.string().nullable(),
  location: z.string().nullable(),
  seller: z.string().nullable(),
  description: z.string().nullable(),
});

export type BookDetail = z.infer<typeof bookDetailSchema>;
