import { SignInCard } from "../components/auth/SignInCard";
import {
  Link,
  RouteWrapper,
  Dropdown,
  Text,
} from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <SignInCard />
      <Link title="Sign-up" href="./sign-up" />
      <Link title="Go to Dashboard REMOVE" href="./dashboard" />
      <Dropdown title="Dropdown">
        <Text>Item</Text>
      </Dropdown>
    </RouteWrapper>
  );
}
