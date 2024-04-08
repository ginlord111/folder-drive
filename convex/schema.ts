import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";
let kekw = [];
export default defineSchema({
  files: defineTable({
    fileId: v.id("_storage"),
    name: v.string(),
    orgId: v.string(),
  }).index("by_orgId", ["orgId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
