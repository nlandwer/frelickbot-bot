import { readSheet } from "./SheetsClient";

const SPREADSHEET_ID = process.env.SCORES_SPREADSHEET_ID!;

export interface PlayerStat {
  date: string;
  team: string;
  player: string;
  score: number;
  rank: number;
  opponent: string;
}

export async function getPlayerStats(): Promise<PlayerStat[]> {
  const rows = await readSheet(
    SPREADSHEET_ID,
    "'Player Stats'!A:F"
  );

  return rows
    .slice(1)
    .filter(row => row[0])
    .map(row => ({
      date: row[0],
      team: row[1],
      player: row[2],
      score: Number(row[3] || 0),
      rank: Number(row[4] || 0),
      opponent: row[5] || ""
    }));
}