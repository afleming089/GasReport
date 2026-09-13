/**
 * (app) hold authenticated views
 *
 * app holds unauthenticated views
 *
 * Validation handled by Google PlayIntegrity on Android or CORS and Turnstile if
 * user in browser
 * @module
 */

import { RouteWrapper, Text } from "@/components/common/Common";
import { DefaultLoader } from "@/components/common/Loaders";
import { useSession } from "../context/AuthContext";
import "../../global.css";
import { useEffect } from "react";
import ValidateTurnstile from "../utility/validateTurnstile";
import { Platform } from "react-native";

export default function index() {
  const { signIn } = useSession();

  if (Platform.OS !== "web")
    useEffect(() => {
      setTimeout(() => {
        signIn();
      }, 3000);
    }, []);

  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <Text fontSize="h2">Validating Client</Text>
      <Text fontSize="sm">
        Validation handled by Google PlayIntegrity on Android or CORS and
        Turnstile if user in browser
      </Text>
      <ValidateTurnstile />
      <DefaultLoader />
    </RouteWrapper>
  );
}
