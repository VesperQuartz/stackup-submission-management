import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submissions: defineTable({
    body: v.id("_storage"),
    campaignTitle: v.string(),
    format: v.string(),
    id: v.string(),
    questTitle: v.string(),
  }),
});
