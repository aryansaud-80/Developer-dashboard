import cron from 'node-cron';
import { fetchAndSaveGithubActivity } from '../controllers/github.controller.js';
import { User } from '../models/user.model.js';

export const startCronJobs = () => {
  cron.schedule('0 /6 * * *', async () => {
    console.log('Running GitHub data sync cron job...');
    const users = await User.find({ githubUsername: { $ne: null } });

    for (const user of users) {
      try {
        const mockReq = { user: { id: user._id } };
        const mockRes = {
          status: () => ({ json: () => {} }),
        };
        await fetchAndSaveGithubActivity(mockReq, mockRes);
      } catch (err) {
        console.error(`Error syncing user ${user.username}:`, err.message);
      }
    }
  });
};
