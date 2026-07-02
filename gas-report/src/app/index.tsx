import { Text, View, StyleSheet } from "react-native";
import { Chart } from "./views/components/Charts";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Chart />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
