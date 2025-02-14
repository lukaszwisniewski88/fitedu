import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { credentialsTable } from "./credentials.schema";
import { profilesTable } from "./profile.schema";

export const usersTable = pgTable(
  "users",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text().notNull(),
    role: text("role").notNull(),
    deleted_at: timestamp("deleted_at"),
    is_active: boolean("is_active").notNull().default(false),
    profileId: uuid().references(() => profilesTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [uniqueIndex("emailUnique").on(sql`lower(${table.email})`)],
);

export const userRelations = relations(usersTable, (rel) => ({
  credentials: rel.many(credentialsTable),
  profile: rel.one(profilesTable, {
    fields: [usersTable.profileId],
    references: [profilesTable.id],
  }),
}));
