import { useContext } from "react";
import { ReportParametersContext } from "../state/ReportParametersContext";

// native
import { View } from "react-native";

// utility
import useFetch from "../utility/customHooks/useFetch";
import { ApiResponse, FetchConfig } from "../utility/api/api";
// models
import { PetroleumData } from "../models/Petroleum/PetroleumData";

// components
import { Card } from "./components/Cards";
import { Line } from "./components/Line";
import { LineChart } from "react-native-chart-kit/v2";

//remove
import * as t from "io-ts";
const rest = t.type({
  a: t.string,
});

type rest = t.TypeOf<typeof rest>;

function Dashboard() {
  const reportParameters = useContext(ReportParametersContext);
  const gasReport: ApiResponse<rest> = useFetch<rest>(
    "https://api.kanye.rest",
    { type: rest },
  );

  console.log(gasReport);

  return (
    <View>
      <Card title="Average This Week" subTitle="${price}"></Card>
      <Line />
    </View>
  );
}

export default Dashboard;
