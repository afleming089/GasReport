import { Header } from "../components/Header";
import { ScrollView, View } from "react-native";
import { Stack } from "expo-router";

import {
  Default,
  Auth,
} from "../components/header-navigation/HeaderNavigation";

export default function RootLayout() {
  return (
    <ScrollView>
      <Stack
        screenOptions={{
          header: () => {
            return <Header children={<Default />} />;
          },
        }}>
        <Stack.Screen
          name="dashboard"
          options={{
            header: () => {
              return <Header children={<Auth />} />;
            },
          }}
        />
        <Stack.Screen
          name="account"
          options={{
            header: () => {
              return <Header children={<Auth />} />;
            },
          }}
        />
      </Stack>
    </ScrollView>
  );
}
