/**
 * Sign up view
 *
 * @module
 */

import { SignUpCard } from "../components/auth/SignUpCard";
import { RouteWrapper } from "../components/common/Common";

export default function Signup() {
  return (
    <RouteWrapper accessibilityLabel="Signup Route">
      <SignUpCard />
    </RouteWrapper>
  );
}

export { Signup };
