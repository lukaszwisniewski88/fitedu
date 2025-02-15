import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local.guard";
import { LoginPasswordDTO } from "./dto/PasswordLogin";
import { LoginEmailDTO } from "./dto/EmailLogin";
import { MagicLinkStrategy } from "./strategies/link";
import { IUserService } from "src/user/user.interface";
import type { Request } from "express";
import { MagicLinkAuthGuard } from "./guards/mail-token.guard";

const LoginErrorResponse = "Email or password is incorrect";

@Controller("auth")
export class AuthenticationController {
  emailLinkService: MagicLinkStrategy;
  users: IUserService;
  constructor(magicStrategy: MagicLinkStrategy, users: IUserService) {
    this.emailLinkService = magicStrategy;
    this.users = users;
  }
  // login with password
  @UseGuards(new LocalAuthGuard())
  @Post("login")
  async login(@Body() body: LoginPasswordDTO, @Req() req: Request) {
    // logged in as a email in body.email
    const user = await this.users.getUserByEmail(body.email);
    if (!user) throw new UnauthorizedException(LoginErrorResponse);
    if (!user.is_active) {
      throw new UnauthorizedException(LoginErrorResponse);
    }
    req.session.user = user;
    req.session.save();
    return { user };
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

  @Get("magic-link")
  @UseGuards(new MagicLinkAuthGuard())
  async magicLink(@Req() req: Request) {
    console.log(req.user);
    const user = await this.users.getUserByEmail(req.user?.email || "");
    if (!user) throw new UnauthorizedException("Token is invalid");
    if (!user.is_active) {
      throw new UnauthorizedException("Token is invalid");
    }
    req.session.user = user;
    req.session.save();
    return { user };
  }

  // login with email magic link
  //
}
