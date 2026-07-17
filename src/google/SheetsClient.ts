import "dotenv/config";

import { google } from "googleapis";
import fs from "fs";
import path from "path";

const credentials = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "google-service-account.json"),
    "utf8"
  )
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export async function readSheet(
  range: string
): Promise<string[][]> {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SPREADSHEET_ID is missing");
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return (response.data.values as string[][]) ?? [];
}