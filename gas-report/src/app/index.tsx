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
import "../../global.css";
import ValidateTurnstile from "../utility/validateTurnstile";

export default function index() {
  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <Text fontSize="h2">Validating Client</Text>
      <Text fontSize="sm">Refresh page if dashboard session timed out</Text>
      <ValidateTurnstile />
      <DefaultLoader />
    </RouteWrapper>
  );
}
