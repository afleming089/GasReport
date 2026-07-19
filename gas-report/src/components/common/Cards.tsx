import React, { Children } from "react";
import { View, Text } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const card = tv({
  slots: {
    wrapper: "border border-solid border-black rounded-lg p-5 gap-2",
    headerGroup: "flex-1 justify-center",
    childrenStyles: "p-2",
  },

  variants: {
    align: {
      centered: {
        headerGroup: "items-center",
      },
      left: {
        headerGroup: "items-left",
      },
    },
  },
  defaultVariants: {
    align: "left",
  },
});

type CardVariants = VariantProps<typeof card>;

// return the prop interface
interface CardProps extends CardVariants {
  title: string;
  subTitle: string | number;
  children?: React.ReactNode;
}

function Card({ title, subTitle, children, ...CardProps }: CardProps) {
  const { childrenStyles, wrapper, headerGroup } = card(CardProps);

  return (
    <View accessibilityLabel="Card" className={wrapper()}>
      <View accessibilityLabel="Header Group" className={headerGroup()}>
        <Text accessibilityLabel="Title" className="text-2xl">
          {title}
        </Text>
        {subTitle && (
          <Text accessibilityLabel="Sub Title" className="text-xl">
            ${subTitle}
          </Text>
        )}
      </View>

      {children && (
        <View className={childrenStyles()} accessibilityLabel="Card Article">
          {children}
        </View>
      )}
    </View>
  );
}
export { Card };
