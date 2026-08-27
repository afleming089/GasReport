/**
 * Authenticated views
 *
 * Include dashboard.tsx and account.tsx
 * @module
 */

import { Stack } from "expo-router";
import { Header } from "../../components/Header";

import { Authenticated as NavigationComponents } from "../../components/header-navigation/links/Links";

/**
 * expo-router Stack with custom header
 */
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <Header>
            <NavigationComponents />
          </Header>
        ),
      }}
    />
  );
}
