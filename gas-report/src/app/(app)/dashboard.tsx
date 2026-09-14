/**
 * Dashboard view
 * @module
 */

// framework
import { useState } from "react";

// models
import { DashboardDataT } from "../../models/dashboard/Dashboard";

// components
import {
  RouteWrapper,
  Select,
  Button,
  Alert,
  AlertProps,
} from "../../components/common/Common";
import { OverallSummary } from "../../components/dashboard/OverallSummary";
import { PriceSnapshot } from "../../components/dashboard/PriceSnapshot";
import { PriceTrackerChart } from "../../components/dashboard/PriceTrackerChart";
import useFetch from "@/utility/customHooks/useFetch";
import { View } from "react-native";

export default function Dashboard() {
  const [alertState, setAlertState] = useState<AlertProps | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardDataT | null>({
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

  return (
    <RouteWrapper accessibilityLabel="Dashboard Group">
      <Button
        title="Options"
        onPress={() => {
          setAlertState({
            title: "Select Region and Fuel Grade",
            children: (
              <View className="gap-2">
                <Select
                  title="Select Fuel Type"
                  options={["Regular", "Mid Grade", "Premium", "Diesel"]}
                />
                <Select
                  title="Select Region"
                  options={["Midwest", "North East", "Chicago", "South"]}
                />
              </View>
            ),
            setAlertState,
            buttonsPropsArray: [
              {
                title: "Fetch Data",
                onPress: () => {
                  //handle submit function
                },
              },
            ],
          });
        }}
      />
      {alertState ? <Alert {...alertState} /> : null}
      <OverallSummary
        OverallSummary={dashboardData.overallSummary}
        lastFetch={dashboardData.fetchTime.toDateString()}
      />
      <PriceTrackerChart />
      <PriceSnapshot priceSnapshot={dashboardData.priceSnapShot} />
    </RouteWrapper>
  );
}
