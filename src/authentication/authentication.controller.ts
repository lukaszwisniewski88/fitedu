import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "./local.guard";
import { LoginPasswordDTO } from "./dto/PasswordLogin";
import { LoginEmailDTO } from "./dto/EmailLogin";
import { MagicLinkStrategy } from "./strategies/link";

@Controller("auth")
export class AuthenticationController {
  emailLinkService: MagicLinkStrategy;
  constructor(magicStrategy: MagicLinkStrategy) {
    this.emailLinkService = magicStrategy;
  }
  // login with password
  @UseGuards(new LocalAuthGuard())
  @Post("login")
  login(@Body() body: LoginPasswordDTO) {
    return body;
  }

  @Post("login/email")
  async loginWithEmail(@Body() body: LoginEmailDTO) {
    try {
      await this.emailLinkService.sendMagicLink(body.email);
      return { success: true };
    } catch (e) {
      throw new InternalServerErrorException("Error sending email", e.message);
    }
  }

  // login with email magic link
  //
}
