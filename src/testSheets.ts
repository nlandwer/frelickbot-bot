import "dotenv/config";
import { getSchedule } from "./google/ScheduleService";

function getEasternMonthDay(): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "numeric",
    day: "numeric",
  }).format(new Date());
}

async function main(): Promise<void> {
  const games = await getSchedule();
  const today = getEasternMonthDay();

  const todaysGames = games.filter((game) => game.date === today);

  console.log(`Today is ${today}`);
  console.log(`Found ${todaysGames.length} games today.`);
  console.log(todaysGames);
}

main().catch((error) => {
  console.error("Schedule test failed:", error);
  process.exitCode = 1;
});