import fs from "fs";
import path from "path";
import { http } from "./http";
import { Session } from "./Session";
import { RequestToken } from "./RequestToken";

export class RealClient {
  async postToGroup(text: string): Promise<unknown> {
  if (!this.session) {
    throw new Error("No session has been loaded");
  }

  const groupId = Number(process.env.REAL_GROUP_ID);
  const turnstileToken = process.env.REAL_TURNSTILE_TOKEN;

  if (!Number.isInteger(groupId) || groupId <= 0) {
    throw new Error("REAL_GROUP_ID is missing or invalid");
  }

  if (!turnstileToken) {
    throw new Error("REAL_TURNSTILE_TOKEN is missing");
  }

  const response = await http.post(
    `/comments/groups/${groupId}`,
    {
      groupId,
      text,
      parentCommentId: null,
    },
    {
      headers: {
        "real-auth-info": this.session.authInfo,
        "real-device-uuid": this.session.deviceUuid,
        "real-request-token": RequestToken.generate(),
        "real-turnstile-token": turnstileToken,
        origin: "https://www.realapp.com",
        referer: "https://www.realapp.com/",
      },
    }
  );

  return response.data;
}
  private session: Session | null = null;

  constructor() {
    console.log("✓ RealClient initialized");
  }

  loadSession(): void {
    const sessionPath = path.join(process.cwd(), "session.json");

    const file = fs.readFileSync(sessionPath, "utf8");

    this.session = JSON.parse(file);

    console.log("✓ Session loaded");
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
       "real-request-token": RequestToken.generate(),
      },
    });

    console.log(response.data);

    return response.data;
  }
}
