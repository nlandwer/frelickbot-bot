import { RealClient } from "./core/RealClient";

export interface Activity {
  id: string;
  type: string;
  text: string;
}

export class ActivityService {
  constructor(private readonly client: RealClient) {}

  async fetchActivities(): Promise<Activity[]> {
    console.log("Fetching activities...");
    return this.client.getActivity();
  }
}