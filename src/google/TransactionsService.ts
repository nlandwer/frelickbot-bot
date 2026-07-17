import { readSheet } from "./SheetsClient";

const SPREADSHEET_ID = process.env.LEAGUE_SPREADSHEET_ID!;

export interface Transaction {
  date: string;
  team1: string;
  receive1: string;
  team2: string;
  receive2: string;
}

export async function getTransactions(): Promise<Transaction[]> {
  const rows = await readSheet(
    SPREADSHEET_ID,
    "Transactions!A:E"
  );

  return rows
    .slice(2)
    .filter(row => row[0])
    .map(row => ({
      date: row[0] || "",
      team1: row[1] || "",
      receive1: row[2] || "",
      team2: row[3] || "",
      receive2: row[4] || ""
    }));
}