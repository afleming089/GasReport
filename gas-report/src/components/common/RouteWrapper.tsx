import { ScrollView, ScrollViewProps } from "react-native";

// so bottom is not behind any bezel or navigation bar
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      accessibilityLabel={accessibilityLabel}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      contentContainerClassName={`${"flex gap-3 p-3 w-full sm:w-[70%] md:w-[53%] mx-auto mb-3"} + ${className}`}
      {...RouteWrapperProps}>
      {children}
    </ScrollView>
  );
}

export { RouteWrapper };
