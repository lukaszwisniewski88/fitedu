import { relations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const profilesTable = pgTable("profiles", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  firstName: text().notNull(),
  lastName: text().notNull(),
  phoneNumber: text(),
});
