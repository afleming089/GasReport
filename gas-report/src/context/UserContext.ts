import { User } from "@/models/User";
import { createContext } from "react";

export const UserContext = createContext<User>({
  email: "example@gmail.com",
  sessionToken: "awdwaidnawnfanjnawjd2ed2413d",
  settings: { defaultFuelType: "Regular", defaultRegion: "Midwest" },
});
