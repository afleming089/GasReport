/**
 * (app) hold authenticated views
 *
 * app holds unauthenticated views
 * @module
 */

import "../../global.css";

import { Link, RouteWrapper } from "@/components/common/Common";
import ValidateTurnstile from "@/utility/validateTurnstile";
import { useState } from "react";
import { useSession } from "../context/AuthContext";

export default function index() {
  const [token, setToken] = useState<string>("");
  const { signIn } = useSession();

  return token === "" ? (
    <ValidateTurnstile setTurnstileToken={setToken} />
  ) : (
    <RouteWrapper accessibilityLabel="Home Group">
      {/* <SignInCard /> */}
      {/* <Link title="Sign-up" href="./sign-up" /> */}
      <Link
        onPress={() => {
          signIn(token);
        }}
        title="Go to Dashboard"
        href="./dashboard"
      />
    </RouteWrapper>
  );
}
