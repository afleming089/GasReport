/**
 * Chart showing trends overtime. Can select different periods to view in the chart its self.
 *
 * @module
 */

import { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Text } from "../common/Common";
import { LineChart } from "react-native-chart-kit/v2";

import { GasPeriodT } from "../../utility/api/model/endpoints/types/petroleumTypes";

interface PriceTrackerChartProps {
  data: GasPeriodT[];
}

function PriceTrackerChart({ data = [] }: PriceTrackerChartProps) {
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
    <View>
      <Text fontSize="h2" className="mb-2">
        Change Since Last Year
      </Text>
      <View
        ref={ref}
        className="flex sm:flex-row gap-4 justify-center items-center sm:items-stretch aspect-video">
        <LineChart
          showDots={false}
          formatXLabel={(value, index) => {
            const Year_Month = value.toString().split("-");
            return `${Year_Month[0]}-${Year_Month[1]}`;
          }}
          formatYLabel={(value) => {
            return `$${value}.00`;
          }}
          showVerticalGridLines={true}
          showHorizontalGridLines={true}
          preset="graphite"
          data={data}
          xKey="period"
          yKey="value"
          width={chartDimensions.width}
          height={chartDimensions.height}
          curve="monotone"
        />
      </View>
    </View>
  );
}

export { PriceTrackerChart };
