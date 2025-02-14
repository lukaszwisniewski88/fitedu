import z from "zod";

export const envConfigSchema = z.object({
  DATABASE_URL: z.string(),
  API_TOKEN: z.string(),
});

export type EnvConfig = z.infer<typeof envConfigSchema>;
