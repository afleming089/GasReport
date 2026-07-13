import { Text, View, StyleSheet } from "react-native";
import { Chart } from "./views/components/Charts";
import Dashboard from "./views/Dashboard";

import "../../global.css"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl text-blue-600">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
