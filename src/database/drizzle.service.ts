import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class DrizzleService {
  private readonly dbUrl: string;
  db: NeonHttpDatabase<typeof schema>;
  constructor(appConfig: ConfigService) {
    this.dbUrl = appConfig.get("DATABASE_URL");
    this.db = drizzle(this.dbUrl, {
      logger: false,
      schema,
    });
  }
}
