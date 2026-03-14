import { z } from "zod";

export const purchaseItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string().nullable(),
  price: z.number(),
  status: z.string(),
  date: z.string(),
});

export type PurchaseItem = z.infer<typeof purchaseItemSchema>;
