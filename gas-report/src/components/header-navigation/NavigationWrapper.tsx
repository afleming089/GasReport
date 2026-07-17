import { tv } from "tailwind-variants";
import { View } from "react-native";

interface NavigationWrapper {
  variant?: keyof typeof navigationWrapper;
  children: React.ReactNode;
}

const navigationWrapper = tv({
  //   alignRight: {
  //     wrapper: "flex flex-wrap gap-2 flex-row",
  //   },
  //   alignLeft: {
  //     wrapper: "flex flex-wrap flex-row justify-center items-center gap-2 ",
  //   },
  base: "flex flex-wrap flex-row justify-center items-center gap-2",
});

function NavigationWrapper({ children }: NavigationWrapper) {
  return <View className={navigationWrapper()}>{children}</View>;
}

export { NavigationWrapper };
