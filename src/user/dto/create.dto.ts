import { z } from "zod";
import { createZodDto } from "nestjs-zod";

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "user"]),
  profile: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    phoneNumber: z.string(),
  }),
});
export class CreateUserDTO extends createZodDto(CreateUserSchema) {}
