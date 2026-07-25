import { useSession } from "@/context/AuthContext";
import { RouteWrapper, Text } from "../../components/common/Common";
import { router } from "expo-router";

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
          router.replace("/");
        }}>
        Sign Out
      </Text>
    </RouteWrapper>
  );
}
