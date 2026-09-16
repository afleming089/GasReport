/**
 * Dashboard view
 * @module
 */

// framework
import { useEffect, useState } from "react";

// models
import { GraphData } from "../../models/dashboard/Graph";
import { OverallSummaryData } from "../../models/dashboard/OverallSummary";
import { PriceSnapshotData } from "../../models/dashboard/PriceSnapshot";
import { DashboardDataT } from "../../models/dashboard/Dashboard";
import { useSession } from "../../context/AuthContext";

// components
import {
  RouteWrapper,
  Select,
  Button,
  Alert,
  AlertProps,
  Text,
  DefaultLoader,
} from "../../components/common/Common";
import { OverallSummary } from "../../components/dashboard/OverallSummary";
import { PriceSnapshot } from "../../components/dashboard/PriceSnapshot";
import { PriceTrackerChart } from "../../components/dashboard/PriceTrackerChart";
import useFetch from "@/utility/customHooks/useFetch";
import { View } from "react-native";
import { Json } from "io-ts-types";
import { Fetch } from "@/utility/api/Fetch";

export default function Dashboard() {
  const [alertState, setAlertState] = useState<AlertProps | null>(null);
  const [options, setOptions] = useState<Record<string, string>>({
    "fuel-type": "EPMR",
    region: "NUS",
  });

  const { session, signOut } = useSession();

  const [dashboardData, setDashboardData] = useState<any>(null);

  /// TO DO add batching later for one request
  async function handelFetch() {
    /// re auth if session timeout
    if (!session) signOut();

    const today = new Date();
    const referenceDate = today.toISOString().split("T", 1)[0];
    const lastYear = (today.getFullYear() - 1).toString();

    const overallSummary = await Fetch(
      "http://localhost:8787/api/v1/petroleum-periods/compare",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", jwt: session as string },
        model: OverallSummaryData,
        queryParams: {
          location: options["region"],
          fuelType: options["fuel-type"],
          referenceDate: referenceDate,
          priorPeriods: JSON.stringify([
            { unitCount: 1, unit: "week" },
            { unitCount: 1, unit: "month" },
          ]),
        },
      },
    );

    const graph = await Fetch(
      "http://localhost:8787/api/v1/petroleum-periods",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", jwt: session as string },
        model: GraphData,
        queryParams: {
          frequency: "weekly",
          location: options["region"],
          fuelType: options["fuel-type"],
          start: lastYear,
        },
      },
    );

    const priceSnapShot = await Fetch(
      "http://localhost:8787/api/v1/petroleum-periods/compare",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", jwt: session as string },
        model: PriceSnapshotData,
        queryParams: {
          location: options["region"],
          fuelType: options["fuel-type"],
          referenceDate: referenceDate,
          priorPeriods: JSON.stringify([
            { unitCount: 1, unit: "week" },
            { unitCount: 1, unit: "month" },
            { unitCount: 3, unit: "month" },
            { unitCount: 1, unit: "year" },
          ]),
        },
      },
    );

    console.log({
      overallSummary: overallSummary,
      graph: graph,
      priceSnapShot: priceSnapShot,
    });

    setDashboardData({
      overallSummary: overallSummary,
      graph: graph,
      priceSnapShot: priceSnapShot,
    });
  }

  useEffect(() => {
    handelFetch();
  }, []);

  return dashboardData ? (
    <RouteWrapper accessibilityLabel="Dashboard Group">
      <Button
        title="Select Region and Fuel-Grade"

        onPress={() => {
          setAlertState({
            title: "Select Region and Fuel Grade",
            showExitButton: false,
            children: (
              <View className="gap-2">
                <Select
                  title="Select Fuel Type"
                  options={["Regular", "Mid Grade", "Premium", "Diesel"]}
                  setQueryParameters={setOptions}
                  queryParameterKey="fuel-type"
                />
                <Select
                  title="Select Region"
                  options={["Midwest", "North East", "Chicago", "South"]}
                  setQueryParameters={setOptions}
                  queryParameterKey="region"
                />
              </View>
            ),
            setAlertState,
            buttonsPropsArray: [
              {
                title: "Fetch Data",
                onPress: () => {
                  //handle submit function
                  handelFetch();
                  setAlertState(null);
                },
              },
            ],
          });
        }}
      />
      {alertState ? <Alert {...alertState} /> : null}
      <Text
        fontSize="h4"
        color="white"
        className="p-2 flex flex-row rounded-sm bg-navyBlack">
        Fuel-Type: {options["fuel-type"]}
      </Text>
      <Text
        fontSize="h4"
        color="white"
        className="p-2 flex flex-row rounded-sm bg-navyBlack">
        Region: {options["region"]}
      </Text>
      <OverallSummary
        OverallSummary={dashboardData.overallSummary}
        lastFetch={new Date().toISOString()}
      />
      <PriceTrackerChart />
      <PriceSnapshot priceSnapshot={dashboardData.priceSnapShot} />
    </RouteWrapper>
  ) : (
    <DefaultLoader></DefaultLoader>
  );
}
