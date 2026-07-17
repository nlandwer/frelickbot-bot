import "dotenv/config";

import { RealClient } from "./core/RealClient";
import { handleActivity } from "./handlers/ActivityHandler";

const client = new RealClient();
client.loadSession();

const handledActivityIds = new Set<string>();

function getActivities(response: any): any[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.activities)) return response.activities;
  if (Array.isArray(response?.results)) return response.results;
  if (Array.isArray(response?.data)) return response.data;

  return [];
}

async function checkActivities(): Promise<void> {
  try {
    const response = await client.getActivity();
    const activities = getActivities(response);

    console.log(`Found ${activities.length} activities.`);

    for (const activity of activities) {
      const activityId = String(
        activity.id ??
        activity.activityId ??
        activity.commentId ??
        ""
      );

      if (!activityId) continue;
      if (handledActivityIds.has(activityId)) continue;

      handledActivityIds.add(activityId);

      await handleActivity(client, activity);
    }

    if (handledActivityIds.size > 500) {
      handledActivityIds.clear();
    }
  } catch (error) {
    console.error("Activity check failed:", error);
  }
}

console.log("FrelickBot command listener is running.");

void checkActivities();

setInterval(() => {
  void checkActivities();
}, 15_000);