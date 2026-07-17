export async function handleActivity(client: any, activity: any) {
  if (activity.type !== "mention") return;

  const session = client.getSession();

  if (activity.createdBy?.id === session?.userId) {
    return;
  }

  const children =
    activity.additionalInfo?.comment?.content?.nodes?.[0]?.children ?? [];

  const textNode = children.find((c: any) => c.type === "Text");

  if (!textNode) return;

  const command = textNode.text
    .trim()
    .split(/\s+/)[0]
    .toLowerCase();

  console.log("Command received:", command);

  switch (command) {
    case "$help":
      await client.replyToComment(
        activity.commentId,
`📖 FrelickBot Commands

$help - Show this menu
$ping - Test the bot
$ev - EV calculator
$mlb - MLB tools`
      );
      break;

    case "$ping":
      await client.replyToComment(activity.commentId, "🏓 Pong!");
      break;

    default:
      console.log("Unknown command:", command);
  }
}