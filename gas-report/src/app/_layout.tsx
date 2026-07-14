import { Header } from "./views/components/NavigationBars";
import { View, Text } from "react-native";
import Dashboard from "./views/Dashboard";

import "../../global.css";
export default function RootLayout() {
  return (
    <View>
      <Header />
      <View accessibilityLabel="Body" className="p-5">
        <Dashboard />
      </View>
    </View>
  );
}
