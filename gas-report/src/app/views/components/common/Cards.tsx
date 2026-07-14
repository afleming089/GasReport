import React from "react";
import { View, Text } from "react-native";

interface CardProps {
  variant?: keyof typeof cardVariants;
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const cardVariants = {
  default: {
    headerGroup: "flex-1 items-left justify-center",
  },
  centered: {
    headerGroup: "flex-1 items-center justify-center",
  },
};

function Card({ variant = "default", title, subTitle, children }: CardProps) {
  const styles = cardVariants[variant];

  return (
    <View
      accessibilityLabel="Card"
      className="border border-solid border-black rounded-sm p-5">
      <View accessibilityLabel="Header Group" className={styles.headerGroup}>
        <Text accessibilityLabel="Title" className="text-2xl">
          {title}
        </Text>
        {subTitle && (
          <Text accessibilityLabel="Sub Title" className="text-xl">
            {subTitle}
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
