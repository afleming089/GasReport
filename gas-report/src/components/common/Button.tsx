import {
  Pressable as NativeButton,
  PressableProps as NativeButtonProps,
  View,
} from "react-native";

import { twJoin } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";
import { Text, TextVariants } from "./Text";

const button = tv({
  slots: {
    base: "flex rounded-sm px-2 py-1",
    bgColor: "",
  },

  variants: {
    bgColor: {
      primary: { bgColor: "bg-slate" },
      secondary: { bgColor: "bg-lightGray" },
    },
  },

  defaultVariants: {
    bgColor: "primary",
    fontSize: "base",
  },
});

// default text styles. All text variants can be applied and changed through textStyles
const defaultTextStyles: TextVariants = {
  color: "white",
};

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends NativeButtonProps, ButtonVariants {
  title: string;
  textStyles?: TextVariants;
  className?: string;
}

function Button({
  title,
  className,
  textStyles = defaultTextStyles,
  ...ButtonProps
}: ButtonProps) {
  const { base, bgColor } = button(ButtonProps);

  return (
    <View className={twJoin(className, base(), bgColor())}>
      <NativeButton {...ButtonProps}>
        <Text className="text-center" {...textStyles}>
          {title}
        </Text>
      </NativeButton>
    </View>
  );
}

export { Button, ButtonProps };
