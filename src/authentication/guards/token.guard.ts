import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/** A token set in the env file for the administrative tasks
mainly automated usage. Returns a fake user object. Which has a role of SUPER_ADMIN
*/
@Injectable()
export class TokenAuthGuard extends AuthGuard("token") {}
