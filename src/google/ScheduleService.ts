import { readSheet } from "./SheetsClient";

export interface ScheduledGame {
  date: string;
  away: string;
  home: string;
  awayScore: string;
  homeScore: string;
  status: string;
}

export async function getSchedule(): Promise<
  ScheduledGame[]
> {
  const spreadsheetId =
    process.env.SCORES_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error(
      "SCORES_SPREADSHEET_ID is missing"
    );
  }

  const rows = await readSheet(
    spreadsheetId,
    "Schedule!A:F"
  );

  return rows
    .slice(1)
    .filter(
      (row) => row[0] && row[1] && row[2]
    )
    .map((row) => ({
      date: row[0] ?? "",
      away: row[1] ?? "",
      home: row[2] ?? "",
      awayScore: row[3] ?? "",
      homeScore: row[4] ?? "",
      status: row[5] ?? "",
    }));
}