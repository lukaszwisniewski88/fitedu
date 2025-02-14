import { Injectable } from "@nestjs/common";
import { IUserRepository, type User } from "./user.interface";
import { DrizzleService } from "src/database/drizzle.service";
import { profilesTable, usersTable } from "src/database/schema";
import { desc, eq, isNull } from "drizzle-orm";
import { credentialsTable } from "src/database/schema/credentials.schema";
import { CreateUserDTO } from "./dto/create.dto";

@Injectable()
export class UserRepository implements IUserRepository {
  private db: DrizzleService["db"];
  constructor(drizzle: DrizzleService) {
    this.db = drizzle.db;
  }
  async save(user: CreateUserDTO) {
    const { profile, password, ...userData } = user;
    const profileQuery = await this.db
      .insert(profilesTable)
      .values({
        ...profile,
      })
      .returning();
    const query = await this.db
      .insert(usersTable)
      .values({
        ...userData,
        profileId: profileQuery[0].id,
      })
      .returning();
    await this.db.insert(credentialsTable).values({
      userId: query[0].id,
      hash: password,
    });
    return query[0].id;
  }
  async findById(id: string) {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
    });
    if (!user) return null;
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!user) return null;
    return user;
  }
  async findUserPasswordHash(email: string) {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: {
        id: true,
      },
      with: {
        credentials: {
          where: isNull(credentialsTable.deletedAt),
          orderBy: desc(credentialsTable.createAt),
          limit: 1,
        },
      },
    });
    if (!user) return null;
    return user.credentials[0].hash;
  }
  async softDelete(id: string) {
    await this.db
      .update(usersTable)
      .set({
        deleted_at: new Date(),
      })
      .where(eq(usersTable.id, id));
  }
  async updateStatus(id: string, isActive: boolean) {
    const user = await this.db
      .update(usersTable)
      .set({
        is_active: isActive,
      })
      .where(eq(usersTable.id, id))
      .returning();
    return user[0];
  }
}
