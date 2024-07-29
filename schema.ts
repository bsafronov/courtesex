import { relations } from "drizzle-orm";
import {
  integer,
  pgSchema,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("courtesex");
export const id = serial("id").primaryKey();
export const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();

export const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const userId = integer("user_id")
  .notNull()
  .references(() => usersTable.id);

export const usersTable = schema.table("users", {
  id,
  createdAt,
  username: varchar("username", { length: 256 }).notNull(),
  hashPassword: varchar("hash_password", { length: 256 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
}));

export const sessionsTable = schema.table("sessions", {
  id: text("id").primaryKey(),
  userId,
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));
