import { z } from "zod";

export const myPageListingSchema = z.object({
  title: z.string(),
  price: z.number(),
  status: z.string(),
});

export type MyPageListing = z.infer<typeof myPageListingSchema>;
