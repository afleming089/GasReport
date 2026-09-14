/**
 * Unauthenticated Layout
 *
 * Includes about.tsx, index.tsx, sign-up.tsx
 * @module
 */

import { Stack } from "expo-router";
import { Header } from "../components/Header";

import { SessionProvider, useSession } from "@/context/AuthContext";
import { SplashScreenController } from "@/utility/splash";

import { NotAuthenticated as NavigationComponents } from "../components/header-navigation/links/Links";
import { useEffect } from "react";

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

/**
 * expo-router Stack with custom header
 */
// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  const { session, signIn } = useSession();

  useEffect(() => {
    signIn();
  }, []);

  return (
    <Stack
      screenOptions={{
        header: () => (
          <Header>
            <NavigationComponents />
          </Header>
        ),
      }}>
      {/* TO DO look at docs again to do safe routing right*/}
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="(app)"
        />
        <Stack.Protected guard={!session}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
}
