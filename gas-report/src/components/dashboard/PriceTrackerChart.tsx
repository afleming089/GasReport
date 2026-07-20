import { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";

const data = [
  { month: "Jan", revenue: 52 },
  { month: "Feb", revenue: 86 },
  { month: "Mar", revenue: 58 },
  { month: "Apr", revenue: 134 },
];

function PriceTrackerChart() {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  const ref = useRef<any>({});
  useEffect(() => {
    const { width, height } = ref.current.getBoundingClientRect();
    setChartDimensions({ width: width, height: height });
  }, [useWindowDimensions().width]);

  return (
    <View
      ref={ref}
      className="flex sm:flex-row gap-4 justify-center items-center sm:items-stretch aspect-video">
      <LineChart
        preset="graphite"
        data={data}
        xKey="month"
        yKey="revenue"
        width={chartDimensions.width}
        height={chartDimensions.height}
      />
      {/* <View className="grow bg-navyBlack p-2">Options box</View> */}
    </View>
  );
}

export { PriceTrackerChart };
