import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";
export default defineSchema({
  files: defineTable({
    fileId: v.id("_storage"),
    name: v.string(),
    orgId: v.string(),
    type: v.union(v.literal("image"), v.literal("csv"), v.literal("pdf")),
  })
    .index("by_orgId", ["orgId"])
    .index("by_fileId", ["fileId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  favorites: defineTable({
    fileId: v.id("_storage"),
    name: v.string(),
    orgId: v.string(),
    type: v.union(v.literal("image"), v.literal("csv"), v.literal("pdf")),
    userId:v.id("users")
  }).index("by_orgId", ["orgId"]),
});
