import { z } from "zod";

export const CreateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
