/**
 * Sums up the weekly price and shows change from last week and last month of select fuel type and region.
 *
 * Show time of fetch to.
 * @module
 */

import { View } from "react-native";
import { Card, Line, Text } from "../common/Common";

import {
  GasPeriodT,
  ComparedGasPeriodT,
} from "../../utility/api/model/endpoints/types/petroleumTypes";

interface OverallSummaryProps {
  currentPeriod: GasPeriodT;
  comparedGasPeriods: ComparedGasPeriodT[];
  lastFetch: string;
}

function OverallSummary({
  currentPeriod,
  comparedGasPeriods = [],
  lastFetch,
}: OverallSummaryProps) {
  const signToShow = (priceChange: number) => {
    const sign = Math.sign(priceChange);

    switch (sign) {
      case 1:
        return "+";

      case -1:
        return "-";

      default:
        return "";
    }
  };

  const weeklyChange = `${signToShow(comparedGasPeriods[0]?.priceChange)} $${comparedGasPeriods[0]?.priceChange}`;
  const monthlyChange = `${signToShow(comparedGasPeriods[1]?.priceChange)} $${comparedGasPeriods[1]?.priceChange}`;

  const content = [
    { title: "Since Last Week", data: weeklyChange },
    { title: "Since Last Month", data: monthlyChange },
    { title: "Last Fetch", data: lastFetch },
  ];

  return (
    <>
      <Card
        title="Average This Week"
        subTitle={currentPeriod?.value.toFixed(2)}>
        {content.map((item, index) => (
          <View
            className="flex flex-row flex-wrap gap-1 justify-between"
            key={index}>
            <Line />
            <Text className="mb-1">{item?.title}</Text>
            <Text>{item?.data}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

export { OverallSummary, OverallSummaryProps };
