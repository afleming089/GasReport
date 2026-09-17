/**
 * Displays current gas price and ones from a week ago, a month ago, a year ago, and etc.
 * @module
 */

import { View } from "react-native";
import { Card, Text } from "../common/Common";

import {
  GasPeriodT,
  ComparedGasPeriodT,
} from "../../utility/api/model/endpoints/types/petroleumTypes";

interface PriceSnapshotProps {
  currentPeriod: GasPeriodT;
  comparedGasPeriods: ComparedGasPeriodT[];
}

function PriceSnapshot({
  currentPeriod,
  comparedGasPeriods = [],
}: PriceSnapshotProps) {
  return (
    <View>
      <Text className="text-center mb-3" fontSize="h2">
        Price Snapshot
      </Text>
      <View
        accessibilityLabel="Price Snapshot Group"
        className="flex-row flex-wrap gap-4">
        <View key={0} className="w-full">
          <Card
            align="centered"
            title="Current Week"
            subTitle={`${currentPeriod?.value.toFixed(2)}`}
          />
        </View>
        {comparedGasPeriods.map((period, index) => (
          <View key={index + 1} className="w-full sm:w-[43%] grow">
            <Card
              align="centered"
              title={period?.timeAgo + " ago"}
              subTitle={`${period?.value.toFixed(2)}`}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export { PriceSnapshot, PriceSnapshotProps };
