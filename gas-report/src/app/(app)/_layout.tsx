import { Header } from "../../components/Header";
import { ScrollView } from "react-native";
import { Stack } from "expo-router";

import { Authenticated } from "../../components/header-navigation/HeaderNavigation";

export default function RootLayout() {
  return (
    <ScrollView>
      <Stack />
    </ScrollView>
  );
}
