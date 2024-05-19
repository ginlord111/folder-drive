import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";
export default defineSchema({
  files: defineTable({
    fileId: v.id("_storage"),
    name: v.string(),
    orgId: v.string(),
    type: v.union(
      v.literal("image"),
      v.literal("csv"),
      v.literal("pdf"),
      v.literal("video"),
    ),
    userId: v.id("users"),
    shouldDelete: v.optional(v.boolean()),
  })
    .index("by_orgId", ["orgId"])
    .index("by_fileId", ["fileId"])
    .index("by_shouldDelete", ["shouldDelete"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
    name: v.string(),
    image: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  favorites: defineTable({
    fileId: v.id("files"),
    // name: v.string(),
    orgId: v.string(),
    // type: v.union(v.literal("image"), v.literal("csv"), v.literal("pdf"), v.literal("video")),
    userId: v.id("users"),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),
  apiKeys: defineTable({
    name: v.string(),
    key: v.string(),
    orgId: v.optional(v.string()),
    userId: v.id("users"),
    active: v.boolean(),
    lastUsedAt: v.optional(v.number()), //timestamp
    updatedAt: v.optional(v.number()), //timestamp
    disabledAt: v.optional(v.number()), //timestamp
  })
    .index("by_userId", ["userId"])
    .index("by_orgId", ["orgId"]),
});
