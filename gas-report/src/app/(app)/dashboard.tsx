/**
 * Dashboard view
 * @module
 */

// framework
import { useState } from "react";
import { View } from "react-native";

// models
import { DashboardDataT } from "../../models/dashboard/Dashboard";

// components
import {
  DefaultLoader,
  RouteWrapper,
  Select,
} from "../../components/common/Common";
import { OverallSummary } from "../../components/dashboard/OverallSummary";
import { PriceSnapshot } from "../../components/dashboard/PriceSnapshot";
import { PriceTrackerChart } from "../../components/dashboard/PriceTrackerChart";
import ValidateTurnsite from "../../utility/validateTurnsite";

export default function Dashboard() {
  const [turnsiteToken, setTurnstileToken] = useState<string>("");

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

  if (!dashboardData) return <DefaultLoader />;

  return (
    <ValidateTurnsite
      onVerify={async (token: string) => {
        setTurnstileToken(token);
        const response = await fetch(
          "http://10.0.2.2:8787/api/v1/petroleum-periods?frequency=monthly&location=NUS&fuelType=EPMP",
          {
            method: "GET", // Works with POST, PUT, DELETE, etc.
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        console.log(data);
      }}
      onError={(err: any) => console.log("Turnstile Error:", err)}
      onExpire={() => setTurnstileToken("")}
    />
  );
  return (
    <RouteWrapper accessibilityLabel="Dashboard Group">
      <View className="h-[82px] z-50">
        <View className="flex gap-3 absolute w-full bg-[#f2f2f2] rounded-sm">
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
