import { Injectable } from "@nestjs/common";
import argon2 from "argon2";

@Injectable()
export class AuthenticationService {
  hashPassword(password: string): Promise<string> {
    try {
      return argon2.hash(password);
    } catch {
      throw new Error("Error while hashing password");
    }
  }
  verifyPassword(hash: string, password: string): Promise<boolean> {
    try {
      return argon2.verify(hash, password);
    } catch {
      throw new Error("Error while verifying password");
    }
  }
}
