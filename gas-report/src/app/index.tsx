import { SignInCard } from "../components/auth/SignInCard";
import {
  Link,
  RouteWrapper,
  Select,
  CustomDropdown,
  Text,
  NavigationDropdown,
} from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <Select
        title="Default option"
        options={[
          "first",
          "second",
          "third",
          "first",
          "second",
          "third",
          "first",
          "second",
          "third",
          "first",
          "second",
          "third",
          "first",
          "second",
          "third",
          "first",
          "second",
          "third",
          "first",
          "second",
          "last",
        ]}
      />
      <CustomDropdown title="Default option 2">
        <Text>d</Text>
      </CustomDropdown>
      <NavigationDropdown title="Account">
        <Link title="Home" href="/about" />
        <Link title="Home" href="/" />
      </NavigationDropdown>
      <SignInCard />
      <Link title="Sign-up" href="./sign-up" />
      <Link title="Go to Dashboard REMOVE" href="./dashboard" />
    </RouteWrapper>
  );
}
