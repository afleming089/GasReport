import { Header } from "../../components/Header";
import { Stack } from "expo-router";

import { Authenticated } from "../../components/header-navigation/HeaderNavigation";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <Header>
            <Authenticated />
          </Header>
        ),
      }}
    />
  );
}
