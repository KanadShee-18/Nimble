import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      console.log("User already exists in Convex:", existingUser);
      return existingUser;
    }

    const newUserId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      image: args.image,
      uid: args.uid,
      token: 50000,
    });

    const newUser = {
      _id: newUserId,
      ...args,
    };

    console.log("New user created in Convex:", newUser);
    return newUser;
  },
});

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    return user || null;
  },
});

export const UpdateTokenUsed = mutation({
  args: {
    token: v.number(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.userId, {
      token: args.token,
    });
    return result;
  },
});
