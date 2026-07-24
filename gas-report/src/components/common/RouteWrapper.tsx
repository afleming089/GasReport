import { ScrollView, ScrollViewProps } from "react-native";

interface RouteWrapperProps extends ScrollViewProps {
  accessibilityLabel: string;
  className?: string;
  children: React.ReactNode;
}

function RouteWrapper({
  accessibilityLabel,
  className,
  children,
  ...RouteWrapperProps
}: RouteWrapperProps) {
  return (
    <ScrollView
      accessibilityLabel={accessibilityLabel}
      contentContainerClassName={`${"flex gap-3 p-3 w-full sm:w-[70%] md:w-[53%] mx-auto"} + ${className}`}
      {...RouteWrapperProps}>
      {children}
    </ScrollView>
  );
}

export { RouteWrapper };
