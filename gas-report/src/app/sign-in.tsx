import { router } from "expo-router";
import { RouteWrapper, Text } from "../components/common/Common";

import { NotAuthenticated } from "../components/header-navigation/links/Links";

import { useSession } from "@/context/AuthContext";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <RouteWrapper accessibilityLabel="Sign-In Group">
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is successful before navigating.
          router.replace("/");
        }}>
        Sign In
      </Text>
      <NotAuthenticated />
    </RouteWrapper>
  );
}
