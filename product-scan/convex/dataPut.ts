import { mutation } from "./_generated/server";

export const addData = mutation(async ({ db }, newEntry) => {
  await db.insert("user_data", newEntry);
});
