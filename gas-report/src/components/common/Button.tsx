import {
  Pressable as NativeButton,
  PressableProps as NativeButtonProps,
  View,
} from "react-native";

import { twJoin } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";
import { Text, TextVariants } from "./Text";
import { useState } from "react";

const button = tv({
  slots: {
    base: "flex rounded-sm px-2 py-3",
    activeColor: "hover:bg-lightSlate, bg-lightSlate",
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
  const { base, activeColor } = button(ButtonProps);
  const [active, setActive] = useState(false);

  return (
    <View
      className={twJoin(className, base(), `${active ? activeColor() : null}`)}>
      <NativeButton
        hitSlop={10}
        onPressIn={() => setActive(true)}
        onPressOut={() => {
          setActive(false);
        }}
        {...ButtonProps}>
        <Text className="text-center" {...textStyles}>
          {title}
        </Text>
      </NativeButton>
    </View>
  );
}

export { Button, ButtonProps };
