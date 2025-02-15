import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
});

export class LoginPasswordDTO extends createZodDto(LoginSchema) {}
