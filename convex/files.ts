import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";
export const hasAccessToOrg = async (
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) => {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.tokenIdentifier.includes(orgId) || user.orgIds.includes(orgId);

  return hasAccess;
};
const typeFile = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf"),
  v.literal("video")
);
export const createFile = mutation({
  args: {
    fileId: v.id("_storage"),
    name: v.string(),
    orgId: v.string(),
    type: typeFile,
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new ConvexError("You must login first");
    }
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) {
      return new ConvexError("You do not have acess to this organization");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();
    if (!user) {
      return;
    }

    await ctx.db.insert("files", {
      fileId: args.fileId,
      name: args.name,
      orgId: args.orgId,
      type: args.type,
      userId:user._id,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );
    if (!hasAccess) {
      return [];
    }
    const files = ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
    const query = args.query;
    if (query) {
      return (await files).filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return files;
    }
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return;
  }

  return await ctx.storage.generateUploadUrl();
});
export const deleteFile = mutation({
  args: {
    fileId: v.union(v.id("files"), v.id("favorites")),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You must login first");
    }
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new Error("File does not exist");
    }
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      file?.orgId
    );
    if (!hasAccess) {
      throw new Error("You do not have access to delete this file");
    }

    await ctx.db.delete(file._id);
  },
});

export const getImage = query({
  args: {
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const file = await ctx.db
      .query("files")
      .withIndex("by_fileId", (q) => q.eq("fileId", args.fileId))
      .first();
    if (!file) {
      throw new Error("No files Image available");
    }
    return { url: await ctx.storage.getUrl(file.fileId) };
  },
});

export const createFavoriteFile = mutation({
  args: {
    file_id: v.union(v.id("files"), v.id("favorites")),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new ConvexError("You must login first");
    }
    const file = await ctx.db.get(args.file_id);
    if (!file) {
      return;
    }
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      file.orgId
    );

    if (!hasAccess) {
      return new ConvexError("You do not have acess to this organization");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();
    if (!user) {
      return;
    }
    const favFile = await ctx.db
      .query("favorites")
      .withIndex("by_fileId", (q) => q.eq("fileId", file.fileId))
      .first();
    if (favFile) {
      throw new Error("Already in your favorites");
    }

    await ctx.db.insert("favorites", {
      fileId: file?.fileId,
      name: file.name,
      orgId: file.orgId,
      type: file.type,
      userId: user?._id,
    });
  },
});

export const getFavoriteFiles = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );
    if (!hasAccess) {
      return [];
    }
    return await ctx.db
      .query("favorites")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});

export const deleteFavFile = mutation({
  args: {
    fileId: v.id("favorites"),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You must login first");
    }
    const favFile = await ctx.db.get(args.fileId);
    if (!favFile) {
      throw new Error("File does not exist");
    }
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      favFile?.orgId
    );
    if (!hasAccess) {
      throw new Error("You do not have access to delete this file");
    }

    await ctx.db.delete(favFile._id);
  },
});
