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

export const postId = integer("post_id").references(() => postsTable.id);
export const messageId = integer("message_id").references(
  () => messagesTable.id,
);
export const commentId = integer("comment_id").references(
  () => commentsTable.id,
);

export const usersTable = schema.table("users", {
  id,
  createdAt,
  avatarId: integer("avatar_id").references(() => imagesTable.id),
  username: varchar("username", { length: 256 }).notNull(),
  hashPassword: varchar("hash_password", { length: 256 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  avatar: one(imagesTable, {
    fields: [usersTable.avatarId],
    references: [imagesTable.id],
  }),
  sessions: many(sessionsTable),
  posts: many(postsTable),
  comments: many(commentsTable),
  reactions: many(reactionsTable),
  audios: many(audiosTable),
  videos: many(videosTable),
  incomingFollowRequests: many(followRequestsTable, {
    relationName: "target_follow_requests",
  }),
  outgoingFollowRequest: many(followRequestsTable, {
    relationName: "source_follow_requests",
  }),
  incomingFollows: many(followsTable, { relationName: "target_follows" }),
  outgoingFollows: many(followsTable, { relationName: "source_follows" }),
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

export const followsTable = schema.table("follows", {
  createdAt,
  sourceId: integer("source_id").references(() => usersTable.id),
  targetId: integer("target_id").references(() => usersTable.id),
});

export const followsRelations = relations(followsTable, ({ one, many }) => ({
  sourceUser: one(usersTable, {
    fields: [followsTable.sourceId],
    references: [usersTable.id],
    relationName: "source_follows",
  }),
  targetUser: one(usersTable, {
    fields: [followsTable.targetId],
    references: [usersTable.id],
    relationName: "target_follows",
  }),
}));

export const followRequestsTable = schema.table("follow_requests", {
  createdAt,
  sourceId: integer("source_id").references(() => usersTable.id),
  targetId: integer("target_id").references(() => usersTable.id),
});

export const followRequestsRelations = relations(
  followRequestsTable,
  ({ one }) => ({
    sourceUser: one(usersTable, {
      fields: [followRequestsTable.sourceId],
      references: [usersTable.id],
      relationName: "source_follow_requests",
    }),
    targetUser: one(usersTable, {
      fields: [followRequestsTable.targetId],
      references: [usersTable.id],
      relationName: "target_follow_requests",
    }),
  }),
);

export const chatsTable = schema.table("chats", {
  id,
  createdAt,
});

export const chatsRelations = relations(chatsTable, ({ many, one }) => ({
  users: many(usersTable),
  messages: many(messagesTable),
  images: many(imagesTable),
  audios: many(audiosTable),
  videos: many(videosTable),
}));

export const messagesTable = schema.table("messages", {
  id,
  createdAt,
  updatedAt,
  userId,
  forwardedMessageId: messageId,
  forwardedPostId: postId,
  content: text("content"),
});

export const messagesRelations = relations(messagesTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [messagesTable.userId],
    references: [usersTable.id],
  }),
  imagesTable: many(imagesTable),
  audiosTable: many(audiosTable),
  videosTable: many(videosTable),
  reactionsTable: many(reactionsTable),
  forwardedMessage: one(messagesTable, {
    fields: [messagesTable.forwardedMessageId],
    references: [messagesTable.id],
  }),
  forwardedPost: one(postsTable, {
    fields: [messagesTable.forwardedPostId],
    references: [postsTable.id],
  }),
}));

export const postsTable = schema.table("posts", {
  id,
  createdAt,
  updatedAt,
  userId,
  content: text("content"),
});

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
  comments: many(commentsTable),
  reactions: many(reactionsTable),
  images: many(imagesTable),
  videos: many(videosTable),
}));

export const imagesTable = schema.table("images", {
  id,
  createdAt,
  userId,
  postId,
  commentId,
  messageId,
  url: varchar("url", { length: 256 }).notNull(),
});

export const audiosTable = schema.table("audios", {
  id,
  createdAt,
  userId,
  postId,
  messageId,
  commentId,
  url: varchar("url", { length: 256 }).notNull(),
});

export const videosTable = schema.table("videos", {
  id,
  createdAt,
  userId,
  postId,
  messageId,
  commentId,
  url: varchar("url", { length: 256 }).notNull(),
});

export const commentsTable = schema.table("comments", {
  id,
  createdAt,
  updatedAt,
  userId,
  postId: postId.notNull(),
  content: text("content"),
});

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [commentsTable.userId],
    references: [usersTable.id],
  }),
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
  }),
  reactions: many(reactionsTable),
  images: many(imagesTable),
  audios: many(audiosTable),
  videos: many(videosTable),
}));

export const reactionsTable = schema.table("reactions", {
  id,
  createdAt,
  userId,
  postId,
  commentId,
  messageId,
  code: varchar("code", { length: 256 }).notNull(),
});

export const reactionsRelations = relations(reactionsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [reactionsTable.userId],
    references: [usersTable.id],
  }),
  post: one(postsTable, {
    fields: [reactionsTable.postId],
    references: [postsTable.id],
  }),
  comment: one(commentsTable, {
    fields: [reactionsTable.commentId],
    references: [commentsTable.id],
  }),
}));
