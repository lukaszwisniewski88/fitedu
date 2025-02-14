import { Inject, Injectable, Logger } from "@nestjs/common";
import path from "node:path";
import { cwd } from "node:process";
import dotenv from "dotenv";
import fs from "node:fs";
import { CONFIG_OPTIONS } from "./config.options";
import { EnvConfig, envConfigSchema } from "./types";

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  logger = new Logger("ConfigService");
  constructor(@Inject(CONFIG_OPTIONS) private options: { folder: string }) {
    const filePath = `.env.${process.env.NODE_ENV || "development"}.local`;
    const envFile = path.resolve(cwd(), options.folder, filePath);
    this.envConfig = envConfigSchema.parse(
      dotenv.parse(fs.readFileSync(envFile)),
    );
    dotenv.config({
      path: envFile,
    });
    this.logger.log(`Loaded environment variables from ${envFile}`);
    this.logger.debug(this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
