import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./strategies/local";
import { TokenStrategy } from "./strategies/token";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { LocalAuthGuard } from "./guards/local.guard";
import { TokenAuthGuard } from "./guards/token.guard";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "src/mailer/mailer.module";
import { MagicLinkStrategy } from "./strategies/link";
import { MagicLinkAuthGuard } from "./guards/mail-token.guard";

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
    MagicLinkAuthGuard,
  ],
  exports: [
    AuthenticationService,
    LocalAuthGuard,
    TokenAuthGuard,
    MagicLinkAuthGuard,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
