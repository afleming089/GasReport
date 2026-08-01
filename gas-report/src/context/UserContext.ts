import { User } from "@/models/User";
import { createContext } from "react";

export const UserContext = createContext<User>({
  email: "example@gmail.com",
  // not real token
  sessionToken: "awdwaidnawnfanjnawjd2ed2413d",
  settings: { defaultFuelType: "Regular", defaultRegion: "Midwest" },
});
