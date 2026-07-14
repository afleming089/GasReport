import { View, Text } from "react-native";
import { Card, Line } from "./common/Common";

// model
import { OverallSummary as OverallSummaryModel } from "../../models/dashboard/OverallSummary";

interface OverallSummaryProps {
  OverallSummary: OverallSummaryModel;
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
          <View key={index}>
            <Line />
            <Text>{item.title}</Text>
            <Text>{item.data}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

export { OverallSummary };
