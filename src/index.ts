import "dotenv/config";

import { ActivityService } from "./activity";
import { RealClient } from "./core/RealClient";

async function main() {
  const client = new RealClient();

  client.loadSession();

  console.log("==========================");
  console.log("FrelickBot Bot Started");
  console.log("==========================");

  const activityService = new ActivityService(client);

  setInterval(async () => {
    const activities = await activityService.fetchActivities();

    console.log("Activities:");
    console.log(activities);
  }, 5000);
}

main().catch(console.error);