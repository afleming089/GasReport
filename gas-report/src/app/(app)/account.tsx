import { Text, View } from "react-native";

import { useSession } from "@/context/AuthContext";

export default function Account() {
  // add to a drop down button
  const { signOut } = useSession();
  return (
    <View>
      <Text>Account view</Text>
      <Text
        onPress={() => {
          // The guard in `RootNavigator` redirects back to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
