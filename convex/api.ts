import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { createId } from "@paralleldrive/cuid2";
import { maskString } from "../lib/utils";

export const createApiKey = mutation({
  args: { name: v.string(), orgId: v.optional(v.string()) },
  async handler(ctx, args) {
    console.log(`creating api key ${args.name}`);
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return;
    const user = await getUser(ctx, identity.tokenIdentifier);
    const key = `sk-${createId()}`;
    const apiKey = await ctx.db.insert("apiKeys", {
      name: args.name,
      key,
      ...(args.orgId && {
        orgId: args.orgId,
      }),
      userId: user._id,
      active: true,
    });
    console.log(apiKey);
    return key;
  },
});

export const getApiKeys = query({
  args: { orgId: v.optional(v.string()) },
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return;
    const user = await getUser(ctx, identity.tokenIdentifier);
    const apiKeys = await ctx.db
      .query("apiKeys")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
    const maskedApiKeys = apiKeys.map((key) => ({
      ...key,
      key: maskString(key?.key),
    }));
    return maskedApiKeys;
  },
});

// users should not be allowed to update their API keys, this will only be allowed through HTTP API actions
export const updateApiKeys = internalMutation({
  args: {
    id: v.id("apiKeys"),
    rerollKey: v.optional(v.boolean()),
    name: v.optional(v.string()),
    disable: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    let newKey: string = "";
    if (args.rerollKey) {
      newKey = `sk-${createId()}`;
    }
    const updatedApiKey = await ctx.db.patch(args.id, {
      ...(args.name && { name: args.name }),
      ...(args.rerollKey && newKey && { key: newKey }),
      ...(args.disable && {
        active: false,
        disabledAt: new Date().getTime(),
      }),
      updatedAt: new Date().getTime(),
    });
    return updatedApiKey;
  },
});

export const deleteApiKeys = mutation({
  args: { id: v.id("apiKeys") },
  async handler(ctx, args) {
    const deletedApiKey = await ctx.db.delete(args.id);
    return deletedApiKey;
  },
});
