import { SignInCard } from "../components/auth/SignInCard";
import { Link, RouteWrapper, Text } from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper
      className="w-full sm:w-[400px]"
      accessibilityLabel="Home Group">
      <SignInCard />

      {/* <Link title="Go to Dashboard" href="./dashboard" /> */}
    </RouteWrapper>
  );
}
