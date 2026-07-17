import "dotenv/config";

import { RealClient } from "./core/RealClient";
import { handleActivity } from "./handlers/ActivityHandler";

const client = new RealClient();

client.loadSession();

const seenActivityIds = new Set<string>();
let initialized = false;

function getActivities(response: any): any[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.activities)) {
    return response.activities;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
}

function getActivityId(activity: any): string {
  return String(
    activity.id ??
      activity.activityId ??
      activity.commentId ??
      activity.additionalInfo?.comment?.id ??
      ""
  );
}

async function checkActivities(): Promise<void> {
  try {
    const response = await client.getActivity();
    const activities = getActivities(response);

    console.log(`Found ${activities.length} activities.`);

    // Remember old activities when the bot first starts.
    // This prevents it from replying to old mentions.
    if (!initialized) {
      for (const activity of activities) {
        const activityId = getActivityId(activity);

        if (activityId) {
          seenActivityIds.add(activityId);
        }
      }

      initialized = true;

      console.log(
        "Existing activities loaded. Waiting for new mentions."
      );

      return;
    }

    // Process oldest new activity first.
    for (const activity of [...activities].reverse()) {
      const activityId = getActivityId(activity);

      if (!activityId) {
        continue;
      }

      if (seenActivityIds.has(activityId)) {
        continue;
      }

      seenActivityIds.add(activityId);

      console.log("New activity received:", {
        id: activityId,
        type: activity.type,
        commentId:
          activity.commentId ??
          activity.additionalInfo?.comment?.id,
      });

      await handleActivity(client, activity);
    }

    // Prevent the set from growing forever.
    if (seenActivityIds.size > 500) {
      const recentIds = activities
        .map(getActivityId)
        .filter(Boolean);

      seenActivityIds.clear();

      for (const id of recentIds) {
        seenActivityIds.add(id);
      }
    }
  } catch (error) {
    console.error("Activity check failed:", error);
  }
}

console.log("============================");
console.log("FrelickBot Started");
console.log("============================");

void checkActivities();

setInterval(() => {
  void checkActivities();
}, 15_000);