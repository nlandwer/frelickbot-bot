import { handleCommand } from "../CommandHandler";

export async function handleActivity(
  client: any,
  activity: any
): Promise<void> {
  // Only process mentions
  if (activity.type !== "mention") {
    return;
  }

  // Ignore our own comments
  const session = client.getSession();

  if (activity.createdBy?.id === session?.userId) {
    return;
  }

  // Pass the activity to the command handler
  await handleCommand(client, activity);
}