import { View } from "react-native";
import { Text } from "./Text";
import { tv, VariantProps } from "tailwind-variants";

const dropdown = tv({
  slots: { base: "" },

  variants: {},
  defaultVariants: {},
});

type DropdownVariants = VariantProps<typeof dropdown>;

// return the prop interface
interface DropdownProps extends DropdownVariants {
  title: string;
  children?: React.ReactNode;
}

function Dropdown({ title, ...DropdownVariants }: DropdownProps) {
  const { base } = dropdown(DropdownVariants);

  return (
    <View>
      <Text></Text>
    </View>
  );
}

export { Dropdown };
