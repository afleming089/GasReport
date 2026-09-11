/**
 * Dashboard view
 * @module
 */

// framework
import { useEffect, useState } from "react";
import { View } from "react-native";

// models
import { useSession } from "../../context/AuthContext";
import { DashboardDataT } from "../../models/dashboard/Dashboard";

// components
import { RouteWrapper, Select } from "../../components/common/Common";
import { OverallSummary } from "../../components/dashboard/OverallSummary";
import { PriceSnapshot } from "../../components/dashboard/PriceSnapshot";
import { PriceTrackerChart } from "../../components/dashboard/PriceTrackerChart";

export default function Dashboard() {
  const { session } = useSession();

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

  useEffect(() => {
    if (session) {
      console.log(session);
      const response = fetch(
        "https://localhost:8787/api/v1/petroleum-periods?frequency=monthly&location=NUS&fuelType=EPMP&start=2024-01-01&end=2026-01-01",
        {
          method: "GET", // Works with POST, PUT, DELETE, etc.
          headers: {
            token: session,
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response);
    }
  }, [session]);

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
