import { usersTable } from "src/database/schema";
import { CreateUserDTO } from "./dto/create.dto";

export type User = typeof usersTable.$inferSelect;
export interface IUserService {
  registerUser(data: CreateUserDTO): Promise<User["id"]>;
  // updateProfile(userId: string, profile: Partial<Profile>): Promise<User>;
  // changePassword(
  //   userId: string,
  //   oldPassword: string,
  //   newPassword: string,
  // ): Promise<void>;
  // deactivateUser(userId: string): Promise<void>;
  // getUserProfile(userId: string): Promise<{
  //   user: User;
  //   profile: Profile;
  // }>;
  getUserByEmail(email: string): Promise<User | null>;
  verifyCredentials(email: string, password: string): Promise<User | null>;
}

export interface IUserRepository {
  save(user: CreateUserDTO): Promise<User["id"]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findUserPasswordHash(email: string): Promise<string | null>;
  softDelete(id: string): Promise<void>;
  updateStatus(id: string, isActive: boolean): Promise<User>;
}
export const IUserService = Symbol("IUserService");
export const IUserRepository = Symbol("IUserRepository");
