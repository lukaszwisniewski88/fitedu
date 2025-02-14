import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./strategies/local";
import { TokenStrategy } from "./strategies/token";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { LocalAuthGuard } from "./local.guard";
import { TokenAuthGuard } from "./token.guard";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "src/mailer/mailer.module";
import { MagicLinkStrategy } from "./strategies/link";

@Global()
@Module({
  imports: [
    MailerModule.register(),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.APP_JWT_SECRET,
      signOptions: { expiresIn: "2h" },
    }),
  ],
  providers: [
    LocalStrategy,
    TokenStrategy,
    AuthenticationService,
    MagicLinkStrategy,
    LocalAuthGuard,
    TokenAuthGuard,
  ],
  exports: [AuthenticationService, LocalAuthGuard, TokenAuthGuard],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
