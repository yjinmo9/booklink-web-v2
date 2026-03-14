import { z } from "zod";

export const wishListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string().nullable(),
  price: z.number(),
  status: z.string(),
  liked: z.boolean(),
});

export type WishListItem = z.infer<typeof wishListItemSchema>;
