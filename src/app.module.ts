import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.register({
      folder: "",
    }),
    DatabaseModule,
    UserModule,
    AuthenticationModule,
    MailerModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
