import "dotenv/config";

import { RealClient } from "../core/RealClient";
import { getSchedule } from "../google/ScheduleService";

function getEasternMonthDay(): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "numeric",
    day: "numeric",
  }).format(new Date());
}

async function main() {
  const client = new RealClient();

  client.loadSession();

  const today = getEasternMonthDay();

  const games = (await getSchedule()).filter(
    (g) => g.date === today
  );

  if (games.length === 0) {
    console.log("No games today.");
    return;
  }

  const post = await client.postToGroup(
    "🏆 Vote for Game of the Day!\n\nReply below with the matchup you want to win."
  );

  const postId = post.comment.id;

  for (const game of games) {
    await client.replyToComment(
      postId,
      `${game.away} vs ${game.home}`
    );

    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("Finished posting GOTD.");
}

main().catch(console.error);