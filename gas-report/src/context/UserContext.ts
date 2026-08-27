import { UserT } from "@/models/User";
import { createContext } from "react";

export const UserContext = createContext<UserT>({
  email: "example@gmail.com",
  sessionToken: "TOKEN",
  settings: { defaultFuelType: "Regular", defaultRegion: "Midwest" },
});
