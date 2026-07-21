import { Text } from "../../components/common/Common";

import { useSession } from "@/context/AuthContext";
import { RouteWrapper } from "../../components/common/Common";

export default function Account() {
  // add to a drop down button
  const { signOut } = useSession();
  return (
    <RouteWrapper accessibilityLabel="Account Group">
      <Text>Account view</Text>
      <Text
        onPress={() => {
          // The guard in `RootNavigator` redirects back to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </RouteWrapper>
  );
}
