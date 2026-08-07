import { SignInCard } from "../components/auth/SignInCard";
import { Link, RouteWrapper, Select } from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <Select title="Default option" options={["first", "second", "third"]} />

      <SignInCard />
      <Link title="Sign-up" href="./sign-up" />
      <Link title="Go to Dashboard REMOVE" href="./dashboard" />
    </RouteWrapper>
  );
}
