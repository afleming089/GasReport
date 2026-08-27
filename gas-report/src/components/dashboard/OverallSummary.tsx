/**
 * Sums up the weekly price and shows change from last week and last month of select fuel type and region.
 *
 * Show time of fetch to.
 * @module
 */

import { View } from "react-native";
import { Card, Line, Text } from "../common/Common";

// model
import { OverallSummaryT } from "../../models/dashboard/OverallSummary";

interface OverallSummaryProps {
  OverallSummary: OverallSummaryT;
  lastFetch: string;
}

function OverallSummary({ OverallSummary, lastFetch }: OverallSummaryProps) {
  const content = [
    { title: "Weekly Change", data: OverallSummary.weeklyChange },
    { title: "Monthly Change", data: OverallSummary.monthlyChange },
    { title: "Last Fetch", data: lastFetch },
  ];

  return (
    <>
      <Card title="Average This Week" subTitle={OverallSummary.periodAverage}>
        {content.map((item, index) => (
          <View
            className="flex flex-row flex-wrap gap-1 justify-between"
            key={index}>
            <Line />
            <Text className="mb-1">{item.title}</Text>
            <Text>{item.data}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

export { OverallSummary, OverallSummaryProps };
