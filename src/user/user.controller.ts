import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { TokenAuthGuard } from "src/authentication/guards/token.guard";
import { CreateUserDTO } from "./dto/create.dto";
import { IUserService } from "./user.interface";
import { MailerService } from "src/mailer/interface";

@Controller("users")
export class UserController {
  service: IUserService;
  mailer: MailerService;
  constructor(service: IUserService, mailer: MailerService) {
    this.service = service;
    this.mailer = mailer;
  }
  @UseGuards(TokenAuthGuard)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    await this.mailer.sendMail({
      to_email: body.email,
      subject: "Welcome to our platform",
      from_email: "system@system.pl",
      data: { name: body.profile.firstName },
      templateFn: (data: { name: string }) => ({
        text: `Hello ${data.name}, welcome to our platform!`,
        html: `<p>Hello ${data.name}, welcome to our platform!</p>`,
      }),
    });
    return this.service.registerUser(body);
  }
}
