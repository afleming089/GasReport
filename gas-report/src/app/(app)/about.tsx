/**
 * About view
 *
 *
 * @module
 */

import { Card, Link, RouteWrapper, Text } from "../../components/common/Common";

export default function About() {
  return (
    <RouteWrapper accessibilityLabel="About Group">
      <Card title="About">
        <Text>
          Gas-Report is a React Native application that tracks gas data over a
          weekly, monthly, or yearly periods. You can search by selected region.
          and fuel grade as well. It uses EIA government data to get the latest.
          reports. My main goal with this app was to build it with modularity,
          reusability, and maintainability in mind. I believe the codebase for
          this application is very easy to understand and could scale well if I
          were to add more features. The front end can be compiled into Android
          and iOS applications, and the backend is hosted on Cloudflare Workers
          with serverless technology. Serverless allows faster cold starts.
          compared to traditional containerized environments. The repository is
          linked below along with code documentation.
        </Text>
      </Card>
      <Link
        title="My Linkedin"
        href="https://www.linkedin.com/in/afleming089/"
      />
      <Link
        title="Gas-Report Documentation"
        href="https://afleming089.github.io/GasReport/"
      />
      <Link
        title="Gas-Report Repository"
        href="https://github.com/afleming089/GasReport"
      />

      <Card title="Results Subject to EIA API Accuracy">
        <Link
          href={"https://www.eia.gov/about/information_quality_guidelines.php"}
          title="EIAs API Quality Guidelines"
        />
      </Card>
    </RouteWrapper>
  );
}
