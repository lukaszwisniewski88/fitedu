import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-strategy";
import { MailerService } from "src/mailer/interface";
import { IUserService, User } from "src/user/user.interface";

type MagicTokenPayload = {
  user: User;
};

@Injectable()
export class MagicLinkStrategy extends PassportStrategy(
  Strategy,
  "magic-link"
) {
  users: IUserService;
  jwts: JwtService;
  emails: MailerService;
  constructor(users: IUserService, jwts: JwtService, emails: MailerService) {
    super();
    this.users = users;
    this.jwts = jwts;
    this.emails = emails;
  }
  getEmailTemplate(data: { token: string }): { html: string; text: string } {
    return {
      html: `<a href="http://localhost:3000/auth/magic-link?token=${data.token}">Click here to login</a>`,
      text: `Click here to login: http://localhost:3000/auth/magic-link?token=${data.token}`,
    };
  }
  async sendMagicLink(email: string): Promise<void> {
    // check the user if exists

    const user = await this.users.getUserByEmail(email);
    if (!user) {
      // throw an error
      throw new Error("User not found");
    }
    const payload: MagicTokenPayload = {
      user,
    };
    const token = this.jwts.sign(payload);
    await this.emails.sendMail({
      from_email: "system@system.pl",
      subject: "Magic Link",
      templateFn: this.getEmailTemplate,
      to_email: email,
      data: {
        token,
      },
    });
  }
  validate(token: string): User | null {
    try {
      const payload = this.jwts.verify<MagicTokenPayload>(token);
      return payload.user;
    } catch {
      return null;
    }
  }
  authenticate(req: Request): void {
    const token = req.query.token as string;
    console.log("Validating user credentials");
    console.log("Token:", token);
    if (!token) {
      return this.fail("Token invalid", 401);
    }
    try {
      const user = this.validate(token);
      if (!user) {
        return this.fail("Token invalid", 401);
      }
      this.success(user);
    } catch (error) {
      this.fail(error);
    }
  }
}
