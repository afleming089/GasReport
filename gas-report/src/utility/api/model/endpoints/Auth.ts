import { z } from "zod";

const Auth = z.object({
  sessionToken: z.string(),
});

type AuthT = z.infer<typeof Auth>;

export { Auth, AuthT };
