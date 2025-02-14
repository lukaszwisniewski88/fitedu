import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema";

export const credentialsTable = pgTable("credentials", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  hash: text().notNull(),
  createAt: timestamp()
    .notNull()
    .default(sql`now()`),
  deletedAt: timestamp(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const credentialsRelations = relations(credentialsTable, (rel) => ({
  user: rel.one(usersTable, {
    fields: [credentialsTable.userId],
    references: [usersTable.id],
  }),
}));
