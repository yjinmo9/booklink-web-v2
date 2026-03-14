import { z } from "zod";

export const sellBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
});

export type SellBook = z.infer<typeof sellBookSchema>;
