import { Text } from "react-native";
import { Link, RouteWrapper } from "../components/common/Common";

import "../../global.css";

export default function index() {
  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <Text>Login or home</Text>
      <Link title="Go to Dashboard" href="./dashboard" />
    </RouteWrapper>
  );
}
