/**
 * config.ts
 *
 * Placeholder for bot configuration.
 * This will eventually hold settings such as API keys, endpoints,
 * timing intervals, and other runtime configuration values.
 *
 * No real configuration logic or environment loading is implemented yet.
 */

export interface BotConfig {
  botName: string;
  // Additional configuration fields will be added here later.
}

export const defaultConfig: BotConfig = {
  botName: "FrelickBot",
};

export function loadConfig(): BotConfig {
  // Placeholder: in the future this may read from environment variables
  // or a config file. For now, it just returns the default config.
  return defaultConfig;
}
