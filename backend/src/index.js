import app from "./app.js";
import connectDB from "./config/index.config.js";
import { startCronJobs } from "./service/cron.js";

const PORT = process.env.PORT || 4001;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on PORT: ${PORT}`);
      startCronJobs();
    });
  })
  .catch((err) => {
    console.log(`Server failed to start. Error: ${err}`);
    process.exit(1);
  });
