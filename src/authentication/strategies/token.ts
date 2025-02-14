import { Strategy } from "passport-strategy";
import { PassportStrategy } from "@nestjs/passport";
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, "token") {
  logger = new Logger("TokenStrategy");
  headerPrefix: string;
  headerKey: string;
  urlParamKey: string | undefined;
  config: ConfigService;
  constructor(config: ConfigService) {
    super();
    this.headerKey = "authorization";
    this.headerPrefix = "Bearer";
    this.urlParamKey = "token";
    this.config = config;
  }
  authenticate(req: Request): void {
    let token: string | undefined = undefined;
    const extractedHeader = req.headers[this.headerKey] as string;
    if (extractedHeader) {
      const prefixRegex = new RegExp("^" + this.headerPrefix, "i");
      if (this.headerPrefix && extractedHeader.match(prefixRegex)) {
        token = extractedHeader.replace(prefixRegex, "").trim();
      } else {
        token = extractedHeader;
      }
    }
    if (!token && this.urlParamKey) {
      token = (req.params[this.urlParamKey] || "") as string;
    }

    try {
      const user = this.validate(token || "");
      if (!user) {
        this.fail("", 401);
      }
      this.success(user);
    } catch {
      this.fail("", 401);
    }
  }
  validate(token: string) {
    const configToken = this.config.get("API_TOKEN");
    if (token !== configToken) {
      throw new UnauthorizedException();
    }
    return { id: 1, username: "test" };
  }
}
