import {
  Pressable as NativeButton,
  PressableProps as NativeButtonProps,
} from "react-native";

import { twJoin } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";
import { Text } from "react-native";

const button = tv({
  slots: {
    base: "flex rounded-sm px-2 py-3 hover:bg-lightSlate active:bg-lightSlate",
    text: "text-center text-white",
  },

  variants: {
    bgColor: {
      primary: {
        base: "bg-slate",
      },
      secondary: {
        base: "bg-lightGray",
      },
      hazard: {
        base: "bg-hazard",
      },
    },
  },

  defaultVariants: {
    bgColor: "primary",
    fontSize: "base",
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends NativeButtonProps, ButtonVariants {
  title: string;
  className?: string;
}

function Button({ title, className, ...ButtonProps }: ButtonProps) {
  const { base, text } = button(ButtonProps);

  return (
    <NativeButton
      className={twJoin(className, base())}
      hitSlop={10}
      {...ButtonProps}>
      <Text className={text()}>{title}</Text>
    </NativeButton>
  );
}

export { Button, ButtonProps };
