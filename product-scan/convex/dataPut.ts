import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addData = mutation(async ({ db }, newEntry) => {
  console.log("adding data to Convex...");
  await db.insert("user_data", newEntry);
});
