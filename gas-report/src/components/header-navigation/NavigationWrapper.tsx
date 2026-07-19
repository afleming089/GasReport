import { tv, type VariantProps } from "tailwind-variants";
import { View } from "react-native";

const navigationWrapper = tv({
  slots: {
    base: "flex-1 flex-wrap flex-row items-center gap-3",
  },
  variants: {
    align: {
      right: {
        base: "justify-end",
      },
      left: {
        base: "justify-left",
      },
    },
  },
  defaultVariants: { align: "left" },
});

type NavigationVariants = VariantProps<typeof navigationWrapper>;

interface NavigationProps extends NavigationVariants {
  children: React.ReactNode;
}

function NavigationWrapper({ children, ...NavigationProps }: NavigationProps) {
  const { base } = navigationWrapper(NavigationProps);

  return <View className={base()}>{children}</View>;
}

export { NavigationWrapper };
