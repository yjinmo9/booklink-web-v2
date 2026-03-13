import { z } from "zod";

export const homeSearchSchema = z.object({
  searchQuery: z.string().optional(),
});

export type HomeSearch = z.infer<typeof homeSearchSchema>;

export const recentBookSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  author: z.string().nullable(),
});

export type RecentBook = z.infer<typeof recentBookSchema>;
