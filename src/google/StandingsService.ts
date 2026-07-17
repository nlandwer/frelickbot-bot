import { readSheet } from "./SheetsClient";

const SPREADSHEET_ID = process.env.LEAGUE_SPREADSHEET_ID!;

export interface Standing {
  division: string;
  team: string;
  gp: number;
  wins: number;
  losses: number;
  gb: string;
  winPct: string;
}

export async function getStandings(): Promise<Standing[]> {
  const rows = await readSheet(SPREADSHEET_ID, "Standings!A:G");

  const standings: Standing[] = [];
  let division = "";

  for (const row of rows) {
    if (!row.length) continue;

    if (row[1] === "North" || row[1] === "South") {
      division = row[1];
      continue;
    }

    if (row[1] === "Team") continue;
    if (!row[1]) continue;

    standings.push({
      division,
      team: row[1].trim(),
      gp: Number(row[2] || 0),
      wins: Number(row[3] || 0),
      losses: Number(row[4] || 0),
      gb: row[5] || "",
      winPct: row[6] || ""
    });
  }

  return standings;
}