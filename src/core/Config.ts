export class Config {
  static get username(): string {
    const value = process.env.REAL_USERNAME;

    if (!value) {
      throw new Error("REAL_USERNAME is missing from .env");
    }

    return value;
  }

  static get password(): string {
    const value = process.env.REAL_PASSWORD;

    if (!value) {
      throw new Error("REAL_PASSWORD is missing from .env");
    }

    return value;
  }
}