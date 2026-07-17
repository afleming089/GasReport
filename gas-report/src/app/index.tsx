import { View, Text } from "react-native";
import { Link } from "../components/common/Common";
import "../../global.css";

export default function index() {
  return (
    <View accessibilityLabel="Login">
      <Text>Login or home</Text>
      <Link title="Go to Dashboard" href="./dashboard" />
    </View>
  );
}
