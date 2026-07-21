import { Text } from "../components/common/Common";

import { Link, RouteWrapper } from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <Text fontSize="h2">children</Text>
      <Link title="Go to Dashboard" href="./dashboard" />
    </RouteWrapper>
  );
}
