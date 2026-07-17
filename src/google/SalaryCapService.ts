import { readSheet } from "./SheetsClient";

const SPREADSHEET_ID =
  process.env.SALARY_SPREADSHEET_ID!;

export interface PlayerContract {
  team: string;
  player: string;
  contractYears: number;
  yearsLeft: number;
  totalRax: number;
  raxPerSeason: number;
  currentCapHit: number;
  optionsNotes: string;
  clauses: string;
}

function cleanCell(value: unknown): string {
  return String(value ?? "").trim();
}

function parseNumber(value: unknown): number {
  const cleaned = cleanCell(value)
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : 0;
}

export async function getContracts(): Promise<
  PlayerContract[]
> {
  if (!SPREADSHEET_ID) {
    throw new Error(
      "SALARY_SPREADSHEET_ID is missing"
    );
  }

  const rows = await readSheet(
    SPREADSHEET_ID,
    "'Entire Leage'!A:L"
  );

  return rows
    .slice(1)
    .filter((row) => {
      const team = cleanCell(row[0]);
      const player = cleanCell(row[1]);

      return Boolean(team && player);
    })
    .map((row) => ({
      team: cleanCell(row[0]),
      player: cleanCell(row[1]),

      // Column C
      contractYears: parseNumber(row[2]),

      // Column D
      yearsLeft: parseNumber(row[3]),

      // Column E
      totalRax: parseNumber(row[4]),

      // Column F
      raxPerSeason: parseNumber(row[5]),

      // Column H
      currentCapHit: parseNumber(row[7]),

      // Column I
      optionsNotes: cleanCell(row[8]),

      // Column L
      clauses: cleanCell(row[11]),
    }));
}