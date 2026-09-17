import { createContext, use, type PropsWithChildren } from "react";

import { Platform } from "react-native";
import { useStorageState } from "../utility/customHooks/useStorageState";
import * as AppIntegrity from "@expo/app-integrity";
import * as Crypto from "expo-crypto";
import { Fetch } from "../utility/api/Fetch";
import { router } from "expo-router";
import { Auth } from "../utility/api/model/endpoints/Auth";

import { useTurnstile } from "react-turnstile";

const AuthContext = createContext<{
  signIn: (turnstileToken?: string) => Promise<void>;
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
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const turnstile = useTurnstile();

  return (
    <AuthContext.Provider
      value={{
        signIn: async (turnstileToken) => {
          let jwt = null;
          let response: any = undefined;

          if (Platform.OS === "web") {
            try {
              response = await Fetch(
                "http://localhost:8787/api/v1/auth/create",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  model: Auth,
                  body: JSON.stringify({ turnstileToken: turnstileToken }),
                },
              );
            } catch (err) {
              console.log(err);
              turnstile.reset();
            }
          }

          if (Platform.OS === "android") {
            const appIntegrityToken = await SetupAppIntegrityCheck();
            response = Fetch("http://localhost:8787/api/v1/auth/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              model: Auth,
              body: JSON.stringify({ appIntegrityToken: appIntegrityToken }),
            });
          }

          if (response.decodedData) {
            jwt = response.decodedData.sessionToken;

            setSession(jwt);
            console.log("Set Session token");
            router.navigate("/(app)/dashboard");
          } else {
            console.log("Failed to set session");
            setSession(null);
          }
        },
        signOut: () => {
          setSession(null);
          router.navigate("/");
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
