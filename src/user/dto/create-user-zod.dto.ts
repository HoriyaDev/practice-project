import { z } from "zod";

export const CreateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
