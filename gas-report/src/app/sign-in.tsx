import { router } from "expo-router";
import { Text, View } from "react-native";

import { NotAuthenticated } from "../components/header-navigation/HeaderNavigation";

import { useSession } from "@/context/AuthContext";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is successful before navigating.
          router.replace("/");
        }}>
        Sign In
      </Text>
      <NotAuthenticated />
    </View>
  );
}
