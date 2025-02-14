import { Global, Module } from "@nestjs/common";
import { DrizzleService } from "./drizzle.service";
import { ConfigModule } from "src/config/config.module";

@Global()
@Module({
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DatabaseModule {}
