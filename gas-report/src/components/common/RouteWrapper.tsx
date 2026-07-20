import { ScrollView } from "react-native";

interface RouteWrapperProps {
  accessibilityLabel: string;
  children: React.ReactNode;
}

function RouteWrapper({ accessibilityLabel, children }: RouteWrapperProps) {
  return (
    <ScrollView
      accessibilityLabel={accessibilityLabel}
      contentContainerClassName="flex gap-3 p-3 sm:w-[70%] mx-auto">
      {children}
    </ScrollView>
  );
}

export { RouteWrapper };
