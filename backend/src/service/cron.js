import cron from "node-cron";
import { User } from "../models/user.model.js";
import { syncGithubDataForUser } from "./syncGithubService.js";
import mongoose from "mongoose";

export const startCronJobs = () => {
  // Only start cron if database is connected
  if (mongoose.connection.readyState !== 1) {
    console.log(
      "[CRON] Database not connected yet, skipping cron initialization"
    );
    return;
  }

  // GitHub sync every 6 hours
  cron.schedule("0 */6 * * *", async () => {
    try {
      console.log("[CRON] Starting GitHub data sync...");

      const users = await User.find({
        githubUsername: { $exists: true, $ne: null, $ne: "" },
      });

      if (users.length === 0) {
        console.log("[CRON] No users with GitHub username found");
        return;
      }

      console.log(`[CRON] Found ${users.length} users to sync GitHub data`);

      for (const user of users) {
        try {
          await syncGithubDataForUser(user._id, user.githubUsername);
          console.log(`[CRON] ✅ GitHub data synced for ${user.username}`);
        } catch (err) {
          console.error(
            `[CRON] ❌ Error syncing ${user.username}:`,
            err.message
          );
        }
      }

      console.log("[CRON] GitHub sync completed");
    } catch (err) {
      console.error("[CRON] Fatal error in cron job:", err.message);
    }
  });

  console.log("[CRON] ✅ Cron jobs initialized (GitHub sync every 6 hours)");
};
