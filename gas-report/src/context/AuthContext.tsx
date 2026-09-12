import { createContext, use, type PropsWithChildren } from "react";

import { Platform } from "react-native";
import { useStorageState } from "../utility/customHooks/useStorageState";
import * as AppIntegrity from "@expo/app-integrity";
import * as Crypto from "expo-crypto";
import useFetch from "../utility/customHooks/useFetch";

const AuthContext = createContext<{
  signIn: () => void;
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

async function CheckAppIntegrity() {
  const cloudProjectNumber = "your-cloud-project-number";
  await AppIntegrity.prepareIntegrityTokenProviderAsync(cloudProjectNumber);
}

async function RequestIntegrityToken() {
  const requestHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    "A not so secrete token but it okay",
  );
  return await AppIntegrity.requestIntegrityCheckAsync(requestHash);
}

async function SetupAppIntegrityCheck() {
  await CheckAppIntegrity();
  return RequestIntegrityToken();
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          let JWTToken = null;

          if (Platform.OS === "web") {
          }

          if (Platform.OS === "android") {
            const appIntegrityToken = SetupAppIntegrityCheck();
            useFetch("http://localhost:8787/api/v1/", {
              method: "POST",
              headers: {},
            });
          }

          setSession("token");
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
