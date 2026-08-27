/**
 * About view
 *
 *
 * @module
 */

import { Card, Link, RouteWrapper, Text } from "../components/common/Common";

export default function About() {
  return (
    <RouteWrapper accessibilityLabel="About Group">
      <Card title="About">
        <Text>
          Gas-Report is a React Native application that tracks gas data over
          weekly, monthly, or yearly periods. You can search by selected region
          and fuel grade as well. It uses EIA government data to get the latest
          reports and notifies users of price changes. My main goal with this
          app was to build it with modularity, reusability, and maintainability
          in mind. I believe the code base for this application is very easy to
          understand and work with. The repository is linked below.
        </Text>
      </Card>
      <Link
        title="Gas Report Repository"
        href="https://github.com/afleming089/GasReport"
      />
    </RouteWrapper>
  );
}
