import { View } from "react-native";
import { RouteWrapper, Card, Link, Text } from "../components/common/Common";

export default function About() {
  const listData = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
  ];

  return (
    <RouteWrapper accessibilityLabel="About Group">
      <View className="flex gap-2 items-center md:w-[70%] lg:w-[400px] m-auto">
        <Card title="About">
          <Text>
            Gas-Report is a React Native application that tracks gas data over
            weekly, monthly, or yearly periods. You can search by selected
            region and fuel grade as well. It uses EIA government data to get
            the latest reports and notifies users of price changes. My main goal
            with this app was to build it with modularity, reusability, and
            maintainability in mind. I believe the code base for this
            application is very easy to understand and work with. The repository
            is linked below.
          </Text>
        </Card>
        <Link
          title="Gas Report Repository"
          href="https://github.com/afleming089/GasReport"
        />
      </View>
    </RouteWrapper>
  );
}
