import { router } from "expo-router";
import { RouteWrapper, Text } from "../components/common/Common";

import { useSession } from "@/context/AuthContext";

// use the one on index.
// just send sign in route to home page at /
// just use google and yahoo or what ever else to sign up maybe
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
    </RouteWrapper>
  );
}
