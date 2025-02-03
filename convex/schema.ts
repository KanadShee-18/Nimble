import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    uid: v.string(),
  }),
  workspace: defineTable({
    fileData: v.optional(v.any()),
    messages: v.any(),
    user: v.id("users"),
  }),
});
