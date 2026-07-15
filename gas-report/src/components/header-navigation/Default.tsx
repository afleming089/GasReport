import { View } from "react-native";
import { Link } from "../common/Common";

function Default() {
  return (
    <View>
      <Link title="Home" href="/" />
      <Link title="About" href="/about" />
    </View>
  );
}

export { Default };
