import React from "react";
import { View, Text } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const card = tv({
  slots: {
    base: "flex flex-wrap flex-row justify-center items-center gap-2",
    headerGroup: "flex-1 items-left justify-center",
  },

  variants: {
    align: {
      centered: {
        headerGroup: "items-center",
      },
    },
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
  const { headerGroup } = card(CardProps);

  return (
    <View
      accessibilityLabel="Card"
      className="border border-solid border-black rounded-lg p-5">
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
        <View accessibilityLabel="Article" className="m-5">
          {children}
        </View>
      )}
    </View>
  );
}
export { Card };
