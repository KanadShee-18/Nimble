import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkspace = mutation({
  args: {
    message: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.message,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkSpace = query({
  args: {
    workspaceId: v.string(),
  }, 
  handler: async(ctx, args) => {
    const result = await ctx.db.get(args.workspaceId as Id<"workspace">);
    return result;
  }
})