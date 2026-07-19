import { Header } from "../../components/Header";
import { Stack } from "expo-router";

import { Authenticated as NavigationComponents } from "../../components/header-navigation/links/Links";

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
