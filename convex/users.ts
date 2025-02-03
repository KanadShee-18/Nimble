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
      .first(); // Use .first() instead of .collect()

    if (existingUser) {
      console.log("User already exists in Convex:", existingUser);
      return existingUser; // Return existing user instead of doing nothing
    }

    // Create new user if not found
    const newUserId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      image: args.image,
      uid: args.uid,
    });

    const newUser = {
      _id: newUserId,
      ...args, // Include all user details
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
      .first(); // Use .first() to return a single user or null

    return user || null; // Explicitly return null if the user is not found
  },
});
