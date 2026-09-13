import { createContext, use, type PropsWithChildren } from "react";

import { Platform } from "react-native";
import { useStorageState } from "../utility/customHooks/useStorageState";
import * as AppIntegrity from "@expo/app-integrity";
import * as Crypto from "expo-crypto";
import { Fetch } from "../utility/api/Fetch";
import { router } from "expo-router";

const AuthContext = createContext<{
  signIn: (token?: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

/**Android Validation */
async function CheckAppIntegrity() {
  const cloudProjectNumber = "your-cloud-project-number";
  await AppIntegrity.prepareIntegrityTokenProviderAsync(cloudProjectNumber);
}

/**Android Validation */
async function RequestIntegrityToken() {
  const requestHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    "A not so secrete token but it okay",
  );
  return await AppIntegrity.requestIntegrityCheckAsync(requestHash);
}

/**Android Validation */
async function SetupAppIntegrityCheck() {
  await CheckAppIntegrity();
  return RequestIntegrityToken();
}

/**Browser Validation */
let turnstileToken: string | null = null;
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (token) => {
          let JWTToken = null;
          let response: any = undefined;

          if (Platform.OS === "web") {
            response = Fetch("http://localhost:8787/api/v1/auth/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ turnstileToken: token }),
            });
          }

          if (Platform.OS === "android") {
            const appIntegrityToken = SetupAppIntegrityCheck();
            response = Fetch("http://localhost:8787/api/v1/auth/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ appIntegrityToken: appIntegrityToken }),
            });
          }

          const result = await response.json;
          console.log(result);

          if (result && result.ok) {
            JWTToken = "response.data.token";
            setSession(JWTToken);
            router.navigate("/(app)/dashboard");
          }
          setSession(null);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
