import { useContext, useState } from "react";
import { ReportParametersContext } from "../../context/ReportParametersContext";

// native

// utility
import useFetch from "../../utility/customHooks/useFetch";
import { ApiResponse, FetchConfig } from "../../utility/api/api";
// models
import { DashboardData } from "../../models/dashboard/Dashboard";

// components
import { OverallSummary } from "../../components/dashboard/OverallSummary";
import { RouteWrapper, LoadView } from "../../components/common/Common";
import { PriceTrackerChart } from "../../components/dashboard/PriceTrackerChart";
import { Select } from "../../components/common/Common";

//remove
import * as t from "io-ts";
import { PriceSnapshot } from "../../components/dashboard/PriceSnapshot";
import { View } from "react-native";
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
        snapShotTitle: "Last 3 Months",
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
    <RouteWrapper accessibilityLabel="Dashboard Group">
      <View className="h-[100px] z-50">
        <View className="flex gap-3 absolute w-full bg-navyBlack p-3 rounded-sm">
          <Select
            title="Fuel Grade state here"
            options={["Regular", "Mid Grade", "Premium", "Diesel"]}
          />
          <Select
            title="Region location state here"
            options={["Midwest", "North East", "Chicago", "South"]}
          />
        </View>
      </View>

      <OverallSummary
        OverallSummary={dashboardData.overallSummary}
        lastFetch={dashboardData.fetchTime.toDateString()}
      />
      <PriceTrackerChart />
      <PriceSnapshot priceSnapshot={dashboardData.priceSnapShot} />
    </RouteWrapper>
  );
}
