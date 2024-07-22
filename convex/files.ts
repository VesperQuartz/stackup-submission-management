import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const addASubmission = mutation({
  args: {
    id: v.optional(v.string()),
    campaignTitle: v.string(),
    questTitle: v.string(),
    imageKey: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    await ctx.db.insert('submissions', {
      id: identity?.tokenIdentifier,
      campaignTitle: args.campaignTitle,
      questTitle: args.questTitle,
      body: args.imageKey,
      format: "image",
    })
  }
})

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    throw new Error("Not authenticated");
  }
  return await ctx.storage.generateUploadUrl();
});

export const getAllSubmission = query({
  args: {
    campaignTitle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return []
    }
    const submission = args.campaignTitle?.length! > 2 ? await ctx.db.query("submissions").withSearchIndex("campaign_body", (q) => q.search("campaignTitle", args.campaignTitle!)).filter((q) => q.eq(q.field("id"), identity.tokenIdentifier)).collect()
      : await ctx.db.query("submissions").filter((q) => q.eq(q.field("id"), identity.tokenIdentifier)).order("desc").collect();
    return Promise.all(submission?.map(async (sub) => {
      return { ...sub, imageUrl: await ctx.storage.getUrl(sub.body) }
    }));
  }
})

export const deletedSubmission = mutation({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  }
})
