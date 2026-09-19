/**
 * Dashboard view
 * @module
 */

// framework
import { useEffect, useState } from "react";
import { View } from "react-native";

// models
import { OverallSummary } from "../../components/dashboard/OverallSummary";
import { PriceSnapshot } from "../../components/dashboard/PriceSnapshot";
import { PriceTrackerChart } from "../../components/dashboard/PriceTrackerChart";
import { ComparePetroleumPeriods } from "../../utility/api/model/endpoints/ComparePetroleumPeriods";
import { GetPetroleumPeriods } from "../../utility/api/model/endpoints/GetPetroleumPeriods";

import {
  locations,
  locationsCodes,
  fuelType,
  fuelTypeCodes,
} from "../../utility/api/model/endpoints/types/petroleumTypes";

//auth
import { useSession } from "../../context/AuthContext";

import { Fetch } from "@/utility/api/Fetch";

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

export default function Dashboard() {
  const [alertState, setAlertState] = useState<AlertProps | null>(null);
  const [options, setOptions] = useState<Record<string, string>>({
    "fuel-type": "Regular Gasoline",
    region: "Midwest",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { session } = useSession();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [fetchData, setFetchData] = useState<boolean>(true);
  const optionCodes = {
    regionApiCode: locationsCodes[options["region"]],
    fuelTypeApiCode: fuelTypeCodes[options["fuel-type"]],
  };

  /// TO DO add batching later for one request
  async function handelFetch() {
    const today = new Date();
    const referenceDate = today.toISOString().split("T", 1)[0];
    const lastYear = (today.getFullYear() - 1).toString();

    const overallSummary = await Fetch(
      "https://api.aflemingrocks089.workers.dev/api/v1/petroleum-periods/compare",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", jwt: session as string },
        model: ComparePetroleumPeriods,
        queryParams: {
          location: optionCodes.regionApiCode,
          fuelType: optionCodes.fuelTypeApiCode,
          referenceDate: referenceDate,
          priorPeriods: JSON.stringify([
            { unitCount: 1, unit: "week" },
            { unitCount: 1, unit: "month" },
          ]),
        },
      },
    );

    const graph = await Fetch(
      "https://api.aflemingrocks089.workers.dev/api/v1/petroleum-periods",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", jwt: session as string },
        model: GetPetroleumPeriods,
        queryParams: {
          frequency: "weekly",
          location: optionCodes.regionApiCode,
          fuelType: optionCodes.fuelTypeApiCode,
          start: lastYear,
        },
      },
    );

    const priceSnapShot = await Fetch(
      "https://api.aflemingrocks089.workers.dev/api/v1/petroleum-periods/compare",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", jwt: session as string },
        model: ComparePetroleumPeriods,
        queryParams: {
          location: optionCodes.regionApiCode,
          fuelType: optionCodes.fuelTypeApiCode,
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

    setDashboardData({
      overallSummary,
      graph,
      priceSnapShot,
    });

    setIsLoading(false);
  }

  useEffect(() => {
    handelFetch();
  }, [fetchData]);

  return isLoading ? (
    <RouteWrapper accessibilityLabel="Dashboard Group Loader">
      <DefaultLoader></DefaultLoader>
    </RouteWrapper>
  ) : (
    <RouteWrapper accessibilityLabel="Dashboard Group">
      <Button
        title="Select Region and Fuel-Grade"

        onPress={() => {
          setAlertState({
            title: "Select Region and Fuel Grade",
            message: "Diesel Readings not available at state or city level.",
            showExitButton: false,
            children: (
              <View className="gap-2">
                <Select
                  title="Select Fuel Type"
                  options={fuelType}
                  setQueryParameters={setOptions}
                  queryParameterKey="fuel-type"
                />
                <Select
                  title="Select Region"
                  options={locations}
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
                  fetchData ? setFetchData(false) : setFetchData(true);
                  setIsLoading(true);
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
        currentPeriod={dashboardData?.overallSummary?.data?.referencePeriod}
        comparedGasPeriods={
          dashboardData?.overallSummary?.data?.comparedGasPeriods
        }
        lastFetch={new Date().toLocaleTimeString()}
      />
      <PriceTrackerChart data={dashboardData?.graph?.data?.PetroPeriods} />
      <PriceSnapshot
        currentPeriod={dashboardData?.priceSnapShot?.data?.referencePeriod}
        comparedGasPeriods={
          dashboardData?.priceSnapShot?.data?.comparedGasPeriods
        }
      />
    </RouteWrapper>
  );
}
