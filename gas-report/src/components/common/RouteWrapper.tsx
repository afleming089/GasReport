import { ScrollView } from "react-native";

interface RouteWrapperProps {
  accessibilityLabel: string;
  className?: string;
  children: React.ReactNode;
}

function RouteWrapper({
  accessibilityLabel,
  className,
  children,
}: RouteWrapperProps) {
  return (
    <ScrollView
      accessibilityLabel={accessibilityLabel}
      contentContainerClassName={`${"flex gap-3 p-3 sm:w-[70%] mx-auto"} + ${className}`}>
      {children}
    </ScrollView>
  );
}

export { RouteWrapper };
