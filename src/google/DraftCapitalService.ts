import { readSheet } from "./SheetsClient";

const SPREADSHEET_ID = process.env.LEAGUE_SPREADSHEET_ID!;

export interface DraftCapital {
  team: string;
  picks: string[];
}

export async function getDraftCapital(): Promise<DraftCapital[]> {
  const rows = await readSheet(
    SPREADSHEET_ID,
    "'Draft Capital'!A:Z"
  );

  return rows
    .filter(row => row[0])
    .map(row => ({
      team: row[0],
      picks: row.slice(1).filter(Boolean)
    }));
}