import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { Doc, Id } from "./_generated/dataModel";
export const hasAccessToOrg = async (
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) => {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.tokenIdentifier.includes(orgId) || user.orgIds.includes(orgId);
  if (!hasAccess) {
    return null;
  }
  return user;
};

export const getFavFiles = async (
  ctx: QueryCtx | MutationCtx,
  hasAccess: Id<"users">,
  orgId: string
) => {
  const favFile = await ctx.db
    .query("favorites")
    .withIndex("by_userId_orgId_fileId", (q) =>
      q.eq("userId", hasAccess).eq("orgId", orgId)
    )
    .collect();
  if (!favFile) {
    throw new Error("No favorite files exist yet");
  }
  return favFile;
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
      userId: user._id,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
    type: v.optional(v.string()),
    favorite: v.optional(v.boolean()),
    trash: v.optional(v.boolean()),
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

    let files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
    const query = args.query;
    const type = args.type;
    if (query) {
      return (await files).filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (type && !args.trash) {
      if (type === "all") {
        return files.filter(
          (file) =>
            file.shouldDelete !==true
        );
      }
      return (await files).filter((file) => file.type.includes(type) && file.shouldDelete!==true);
    }

    if (args.trash) {
      files = files.filter((file) => file.shouldDelete);
      if(type){
        if(type==="all"){
       return files;
        }
        files = files.filter((file) => files.some((delFile)=>delFile.type.includes(type) && file.shouldDelete));
      }
    //  if(type)return files.filter((file)=> file.type.includes(type)).some((fileDel)=> fileDel.shouldDelete);
      return files;
    }

    if (args.favorite) {
      const getFavFile = await getFavFiles(ctx, hasAccess._id, args.orgId);
      files = (await files).filter((file) =>
        getFavFile.some((favorite) => favorite.fileId === file._id)
      );
    }
    return files.filter(
      (file) => file.shouldDelete === undefined || file.shouldDelete === false
    );
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return;
  }

  return await ctx.storage.generateUploadUrl();
});
export const moveToTrash = mutation({
  args: {
    fileId: v.id("files"),
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

    await ctx.db.patch(file._id, {
      shouldDelete: true,
    });
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
    file_id: v.id("files"),
    orgId: v.string(),
    userId: v.id("users"),
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
    const favFiles = await getFavFiles(ctx, hasAccess._id, args.orgId);

    favFiles.map((favFile) => {
      if (favFile.fileId === args.file_id) {
        throw new Error("Already in your favorites");
      }
    });

    await ctx.db.insert("favorites", {
      fileId: file?._id,
      orgId: file.orgId,
      userId: file.userId,
    });
  },
});

// export const getFavoriteFiles = query({
//   args: {
//     orgId: v.string(),
//   },
//   async handler(ctx, args) {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       return [];
//     }

//     const hasAccess = await hasAccessToOrg(
//       ctx,
//       identity.tokenIdentifier,
//       args.orgId
//     );
//     if (!hasAccess) {
//       return [];
//     }
//     return await ctx.db
//       .query("favorites")
//       .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
//       .collect();
//   },
// });

export const deleteFavFile = mutation({
  args: {
    fileId: v.id("files"),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You must login first");
    }
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );
    if (!hasAccess) {
      throw new Error("You do not have access to delete this file");
    }

    const favFiles = await getFavFiles(ctx, hasAccess._id, args.orgId);

    if (!favFiles) {
      throw new Error("File does not exist");
    }
    favFiles.map(async (favFile) => {
      if (favFile.fileId === args.fileId) {
        await ctx.db.delete(favFile._id);
      }
    });
  },
});

export const restoreFile = mutation({
  args: {
    fileId: v.id("files"),
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

    await ctx.db.patch(file._id, {
      shouldDelete: false,
    });
  },
});
