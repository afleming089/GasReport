import { View, Text } from "react-native";
import { Card, Line } from "./common/Common";

// TO DO add function that compares price of this week to last week and last month
// how much it is up or down in usd.

// would probably want to handle this on backend.
// all in one request and have a model for summaryData, graph data, price snapshot
const summaryData = [
  { title: "Weekly Change", data: "+/-$price" },
  { title: "Monthly Change", data: "+/-$price" },
  { title: "Last Fetch", data: "date" },
];

function OverallSummary() {
  return (
    <>
      <Card title="Average This Week" subTitle="${price}">
        <Line />
        <View>
          <Text>Weekly Change</Text>
          <Text>+/-$price</Text>
        </View>
      </Card>
    </>
  );
}

export { OverallSummary };
