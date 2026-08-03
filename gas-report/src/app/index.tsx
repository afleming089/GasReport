import { SignInCard } from "../components/auth/SignInCard";
import {
  Link,
  RouteWrapper,
  CustomDropdown,
  Text,
} from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <CustomDropdown title="Dropdown">
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
      </CustomDropdown>
      <SignInCard />
      <Link title="Sign-up" href="./sign-up" />
      <Link title="Go to Dashboard REMOVE" href="./dashboard" />
    </RouteWrapper>
  );
}
