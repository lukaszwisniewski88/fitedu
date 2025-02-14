import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IUserService } from "src/user/user.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  users: IUserService;
  constructor(users: IUserService) {
    super();
    this.users = users;
  }

  validate(username: string, password: string) {
    return this.users.verifyCredentials(username, password);
  }
}
