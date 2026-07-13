import { Header } from "./views/components/NavigationBars";
import { View, Text } from "react-native";
import Dashboard from "./views/Dashboard";

import "../../global.css";
export default function RootLayout() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Dashboard />
    </View>
  );
}
