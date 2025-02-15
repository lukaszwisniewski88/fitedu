import { v4 as uuid } from "uuid";
import { CreateUserDTO } from "../dto/create.dto";
import type { IUserService, User } from "../user.interface";

export class UserMockService implements IUserService {
  getUserById(_id: string): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }
  getUserByEmail(_email: string): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }
  registerUser(_data: CreateUserDTO): Promise<User["id"]> {
    return new Promise((resolve) => resolve(uuid()));
  }
  verifyCredentials(_email: string, _password: string): Promise<User | null> {
    return new Promise((resolve) => resolve(null));
  }
}
