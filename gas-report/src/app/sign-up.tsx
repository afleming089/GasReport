import { RouteWrapper } from "../components/common/Common";
import { SignUpCard } from "../components/auth/SignUpCard";

export default function Signup() {
  return (
    <RouteWrapper accessibilityLabel="Signup Route">
      <SignUpCard />
    </RouteWrapper>
  );
}

export { Signup };
