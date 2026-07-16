/**
 * parser.ts
 *
 * Placeholder for input parsing logic.
 * This will eventually parse raw input (e.g. console input, messages,
 * or command strings) into structured data the bot can act on.
 *
 * No real parsing logic is implemented yet.
 */

export interface ParsedInput {
  raw: string;
  command?: string;
  args?: string[];
}

export function parseInput(raw: string): ParsedInput {
  // Placeholder: real parsing logic will go here.
  return { raw };
}
