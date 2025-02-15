export interface IAuthenticationService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(input: { hash: string; password: string }): Promise<boolean>;
}
