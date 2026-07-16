import fs from "fs";
import path from "path";
import { http } from "./http";
import { Session } from "./Session";

export class RealClient {
  private session: Session | null = null;

  constructor() {
    console.log("✓ RealClient initialized");
  }

  loadSession(): void {
    const sessionPath = path.join(process.cwd(), "session.json");

    const file = fs.readFileSync(sessionPath, "utf8");

    this.session = JSON.parse(file);

    console.log("✓ Session loaded");
    console.log(this.session);
  }

  getSession(): Session | null {
    return this.session;
  }

  async getActivity() {
    if (!this.session) {
      throw new Error("No session has been loaded");
    }

    const response = await http.get("/activity", {
      headers: {
        "real-auth-info": this.session.authInfo,
        "real-device-uuid": this.session.deviceUuid,
        "real-request-token": this.session.requestToken,
      },
    });

    console.log(response.data);

    return response.data;
  }
}