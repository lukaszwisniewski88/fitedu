import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const LoginSchema = z.object({
  login: z.string().email(),
  password: z.string().min(6),
});

export class LoginPasswordDTO extends createZodDto(LoginSchema) {}
