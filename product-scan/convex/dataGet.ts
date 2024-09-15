import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    console.log("getting data from Convex...");
    return await ctx.db.query("user_data").collect();
  },
});
