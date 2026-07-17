import { useContext, useState } from "react";
import { ReportParametersContext } from "../../context/ReportParametersContext";
import { Stack } from "expo-router";
// native
import { View } from "react-native";

// utility
import useFetch from "../../utility/customHooks/useFetch";
import { ApiResponse, FetchConfig } from "../../utility/api/api";
// models
import { DashboardData } from "../../models/dashboard/Dashboard";

// components
import { OverallSummary } from "../../components/OverallSummary";
import { Card, LoadView } from "../../components/common/Common";
import { LineChart } from "react-native-chart-kit/v2";

//remove
import * as t from "io-ts";
import { PriceSnapshot } from "../../components/PriceSnapshot";
const rest = t.type({
  a: t.string,
});

type rest = t.TypeOf<typeof rest>;

export default function Dashboard() {
  // const [dashboardData, useDashboardData] = useState<DashboardData | null>(
  //   null,
  // );

  // remove
  const [dashboardData, useDashboardData] = useState<DashboardData | null>({
    fetchTime: new Date(),
    areaName: "North America",
    productName: "Regular",
    overallSummary: {
      periodAverage: 3.2,
      weeklyChange: "-$2.20",
      monthlyChange: "+$2.20",
    },
    graphData: {
      frequency: "Weekly",
      periods: [{ period: new Date(), value: 3.2, units: "usd" }],
    },
    priceSnapShot: [
      {
        petroleumPeriod: { period: new Date(), value: 3.2, units: "usd" },
        snapShotTitle: "This Week",
      },
      {
        petroleumPeriod: { period: new Date(), value: 3.2, units: "usd" },
        snapShotTitle: "Last Week",
      },
      {
        petroleumPeriod: { period: new Date(), value: 3.2, units: "usd" },
        snapShotTitle: "Last Month",
      },
      {
        petroleumPeriod: { period: new Date(), value: 3.2, units: "usd" },
        snapShotTitle: "Last Year",
      },
    ],
  });

  const reportParameters = useContext(ReportParametersContext);
  // TO DO add back
  // const gasReport: ApiResponse<rest> = useFetch<rest>(
  //   "https://api.kanye.rest",
  //   { type: rest },
  // );

  // console.log(gasReport);

  if (!dashboardData) return <LoadView />;

  return (
    <View accessibilityLabel="Dashboard Group" className="flex gap-4">
      <OverallSummary
        OverallSummary={dashboardData.overallSummary}
        lastFetch={dashboardData.fetchTime.toDateString()}
      />
      {/* <LineChart /> */}
      <PriceSnapshot priceSnapshot={dashboardData.priceSnapShot} />
    </View>
  );
}
