import { Injectable } from "@nestjs/common";
import argon2 from "argon2";
import { IAuthenticationService } from "./types";

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  hashPassword(password: string): Promise<string> {
    try {
      return argon2.hash(password);
    } catch {
      throw new Error("Error while hashing password");
    }
  }
  verifyPassword(input: { password: string; hash: string }): Promise<boolean> {
    try {
      return argon2.verify(input.hash, input.password);
    } catch {
      throw new Error("Error while verifying password");
    }
  }
}
