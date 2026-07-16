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

  async function pollActivities(): Promise<void> {
  try {
    const activities = await activityService.fetchActivities();

    console.log("Activities:");
    console.log(activities);
  } catch (error) {
    console.error("Failed to fetch activities:", error);
  }
}

void pollActivities();
setInterval(() => {
  void pollActivities();
}, 5000);
}

main().catch(console.error);
