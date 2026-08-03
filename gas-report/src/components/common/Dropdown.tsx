import { View, Pressable, Text } from "react-native";
import { twJoin } from "tailwind-merge";

import { tv, VariantProps } from "tailwind-variants";

const dropdown = tv({
  slots: {
    base: "bg-lightSlate p-3 flex flex-row rounded-sm",
    text: "text-white text-center",
  },

  variants: {},
  defaultVariants: {},
});

type DropdownVariants = VariantProps<typeof dropdown>;

// return the prop interface
interface DropdownProps extends DropdownVariants {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

function Dropdown({
  title,
  children,
  className,
  ...DropdownVariants
}: DropdownProps) {
  const { base, text } = dropdown(DropdownVariants);

  return (
    <View>
      <Pressable className={twJoin(base(), className)}>
        <Text className={twJoin(text(), "w-full")}>{title}</Text>
        <Text className={twJoin("align-self-end w-[10px]", text())}>v</Text>
      </Pressable>
      <View>{children}</View>
    </View>
  );
}

export { Dropdown };
