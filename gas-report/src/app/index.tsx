import { SignInCard } from "../components/auth/SignInCard";
import { Link, RouteWrapper, Text } from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper
      className="w-full sm:w-[350px]"
      accessibilityLabel="Home Group">
      <SignInCard />
      <Link
        title="Sign-up"
        href="./sign-up"
        className="text-center"
        border="solid"
      />

      <Link title="Go to Dashboard REMOVE" href="./dashboard" />
    </RouteWrapper>
  );
}
