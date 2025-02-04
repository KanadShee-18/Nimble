import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    uid: v.string(),
    token: v.optional(v.number()),
  }),
  workspace: defineTable({
    fileData: v.optional(v.any()),
    messages: v.optional(
      v.array(v.object({ role: v.string(), content: v.string() }))
    ),
    user: v.id("users"),
  }),
});
