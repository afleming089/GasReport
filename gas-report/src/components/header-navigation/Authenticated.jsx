import { View } from "react-native";
import { Link } from "../common/Common";

function Authenticated() {
  return (
    <View>
      {/* // make a drop down  with profile settings and log out*/}
      <Link title="Account" href="/account" />
    </View>
  );
}

export { Authenticated };
