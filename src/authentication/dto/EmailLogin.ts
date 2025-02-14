import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const EmailLoginSchema = z.object({
  email: z.string().email(),
});

export class LoginEmailDTO extends createZodDto(EmailLoginSchema) {}
