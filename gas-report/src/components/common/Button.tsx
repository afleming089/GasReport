import {
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
  View,
} from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  slots: {
    base: "flex rounded-sm",
    color: "",
  },

  variants: {
    color: {
      // slate in tailwind.config.js
      primary: { color: "#45556c" },
      // misty in tailwind.config.js
      secondary: { color: "#d0d6d8)" },
    },
  },

  defaultVariants: {
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends Omit<NativeButtonProps, "color">, ButtonVariants {
  title: string;
  className?: string;
}

function Button({ title, className, ...ButtonProps }: ButtonProps) {
  const { base, color } = button(ButtonProps);

  return (
    <View className={`${className} + ${base()}`}>
      <NativeButton
        color={color()}
        title={title}
        {...ButtonProps}></NativeButton>
    </View>
  );
}

export { Button };
