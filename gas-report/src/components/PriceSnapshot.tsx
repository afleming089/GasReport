import { View, Text } from "react-native";
import { Card } from "./common/Common";
import { PriceSnapshot as PriceSnapshotModel } from "../models/dashboard/PriceSnapshot";

interface PriceSnapshotProps {
  priceSnapshot: PriceSnapshotModel[];
}

function PriceSnapshot({ priceSnapshot }: PriceSnapshotProps) {
  return (
    <View>
      <Text className="text-2xl text-center mb-2">Price Snapshot</Text>
      <View
        accessibilityLabel="Price Snapshot Group"
        className="flex-row flex-wrap gap-4">
        <View key={0} className="w-full">
          <Card
            align="centered"
            title={priceSnapshot[0].snapShotTitle}
            subTitle={
              priceSnapshot[0].petroleumPeriod.value +
              " " +
              priceSnapshot[0].petroleumPeriod.units
            }
          />
        </View>

        {priceSnapshot.slice(1).map((snapshot, index) => (
          <View key={index + 1} className="w-[49%]">
            <Card
              align="centered"
              title={snapshot.snapShotTitle}
              subTitle={
                snapshot.petroleumPeriod.value +
                " " +
                snapshot.petroleumPeriod.units
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export { PriceSnapshot };
