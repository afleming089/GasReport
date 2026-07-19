import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";

const data = [
  { month: "Jan", revenue: 52 },
  { month: "Feb", revenue: 86 },
  { month: "Mar", revenue: 58 },
  { month: "Apr", revenue: 134 },
];

function PriceTrackerChart() {
  return (
    <View className="flex flex-flex-wrap sm:flex-row gap-4 justify-center items-center sm:items-stretch">
      <LineChart
        data={data}
        xKey="month"
        yKey="revenue"
        width={Dimensions.get("window").width * 0.6}
        height={Dimensions.get("window").height * 0.8}
      />
      <View className="grow bg-navyBlack p-2">Options box</View>
    </View>
  );
}

export { PriceTrackerChart };
