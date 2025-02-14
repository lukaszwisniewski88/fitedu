import { Injectable } from "@nestjs/common";
import { IUserRepository, IUserService, User } from "./user.interface";
import { CreateUserDTO } from "./dto/create.dto";
import { AuthenticationService } from "src/authentication/authentication.service";

@Injectable()
export class UserService implements IUserService {
  repository: IUserRepository;
  authService: AuthenticationService;
  constructor(repository: IUserRepository, authService: AuthenticationService) {
    this.repository = repository;
    this.authService = authService;
  }
  getUserByEmail(email: string) {
    return this.repository.findByEmail(email);
  }
  async registerUser(data: CreateUserDTO) {
    const newPassword = await this.authService.hashPassword(data.password);
    const userId = await this.repository.save({
      ...data,
      password: newPassword,
    });
    return userId;
  }
  async verifyCredentials(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) return null;
    const passwordHash = await this.repository.findUserPasswordHash(email);
    const isValid = await this.authService.verifyPassword(
      password,
      passwordHash || "",
    );
    if (!isValid) return null;
    return user;
  }
}
