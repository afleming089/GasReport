import { Header } from "../components/Header";
import { Stack } from "expo-router";

import { SessionProvider, useSession } from "@/context/AuthContext";
import { SplashScreenController } from "@/utility/splash";

import { NotAuthenticated as NavigationComponents } from "../components/header-navigation/links/Links";

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack
      screenOptions={{
        header: () => (
          <Header>
            <NavigationComponents />
          </Header>
        ),
      }}>
      {/* TO DO add !! add app screen back to guard */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="(app)"
      />
      <Stack.Protected guard={!!session}></Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="index" />
        <Stack.Screen name="about" />
        <Stack.Screen name="sign-up" />
      </Stack.Protected>
    </Stack>
  );
}
