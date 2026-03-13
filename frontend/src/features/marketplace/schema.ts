import { z } from "zod";

export const filterSchema = z.object({
  searchQuery: z.string().optional(),
  selectedLocation: z.string(),
  selectedRadius: z.string(),
  selectedCategory: z.string(),
});

export type FilterState = z.infer<typeof filterSchema>;

export const listingSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string().nullable(),
  price: z.number(),
  condition: z.string().nullable(),
  location: z.string().nullable(),
  image_url: z.string().nullable(),
  category: z.string().nullable(),
});

export type Listing = z.infer<typeof listingSchema>;
